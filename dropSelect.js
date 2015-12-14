(function ($) {
    $.fn.dropSelect = function (options) {
        var opts = $.extend({}, $.fn.dropSelect.defaults, options),
            fakeEl;

        // Parse all items that meet the selector
        this.each(function () {
            var original = $(this),
                dropSelect = generate(original),
                width = (opts.width === "auto") ? dropSelect.width : opts.width;

            dropSelect = dropSelect.element;
            // We'll replace the element
            original.replaceWith(dropSelect);
            dropSelect.width(width);
            // Set the onclick handler of the items
            dropSelect.find('div.items a').on("click", function () {
                var $this = $(this),
                    display = $this.html(),
                    value = $this.data('value'),
                    selected = $this.parents().find('.selected');

                if (selected.attr('data-value') === value) {
                    return;
                }

                $this.siblings('.active').each(function () {
                    $(this).removeClass('active');
                });
                $this.addClass('active');
                selected.attr('data-value', value).html(display);
                if (typeof opts.callBack === "function") {
                    // Call the callback if it's set
                    opts.callBack(value);
                }
                // Trigger the change event.
                selected.parent().trigger("change");
            });
        });

        // For cleanup, we'll remove our fake sizing element
        if (fakeEl) {
            fakeEl.remove();
            fakeEl = null;
        }

        // This function will generate the divs used and add the appropriate classes.
        function generate(select) {
            var attrs = getAttrs(select),
                dropSelect = $('<div>'),
                items = $('<div class="items">'),
                selected = $('<div class="selected">'),
                widths = [],
                attr;

            // Add the attributes from the select to the div
            for (attr in attrs) {
                if (!attrs.hasOwnProperty(attr)) {
                    continue;
                }
                dropSelect.attr(attr, attrs[attr]);
            }
            // Add our classname
            dropSelect.addClass(opts.className);

            // Parse all the options.
            select.find('option').each(function (index) {
                var $this = $(this),
                    value = $this.attr('value') || null,
                    name = ((typeof opts.formatter === "function") ? opts.formatter($this.text()) : $this.text()),
                    isSelected = $this.prop('selected'),
                    current = {};

                // We need to check how we handle empties based on the options.
                if (value === null) {
                    if (opts.includeEmpties) {
                        current = $('<a>').html(name);
                    } else if (index !== 0 || !opts.allowFirstEmptyAsInit) {
                        return;
                    }
                } else {
                    current = $('<a>').html(name).attr('data-value', value);
                }

                // Setup our initial selection
                if ((isSelected && opts.setSelected === true) || (opts.forceSelected === value)) {
                    selected.html(name);
                }

                if (current.length) {
                    widths.push(getSize(current.clone()));
                    items.append(current);
                }
            });

            // If nothing is set as selected, the fist item will be auto selected, just like a select box
            if (selected.text() === "") {
                selected
                    .html(items.find(":first-child").html())
                    .attr('data-value', items.find(":first-child").attr('data-value'));
            }
            // Append our items to the div
            dropSelect
                .append(selected)
                .append('<div class="' + opts.arrowClass + '">')
                .append(items);

            // We return 2 things, the element and the calculated width.
            return {
                element: dropSelect,
                width:   Math.max.apply(null, widths)
            };
        }

        // Get the size of the element.
        function getSize(element) {
            if (!fakeEl) {
                fakeEl = $('<span>').hide().appendTo(document.body);
            }
            fakeEl.empty();
            fakeEl.append(element);
            // Easiest way is to multiply the outerwidth by 2, seems to work every time.
            return fakeEl.outerWidth(true) * 2;
        }

        // Get all the attributes of the selectbox, we'll add them back to the item.
        function getAttrs(element) {
            var attributes = {};

            if (element.length) {
                $.each(element[0].attributes, function (index, attr) {
                    attributes[attr.name] = attr.value;
                });
            }

            return attributes;
        }
    };

    // Here we override the val() function to obtain the value or null if not set.
    $.fn.val = function (value) {
        return $(this).find('.selected').attr('data-value') || null;
    };

    // The default options
    $.fn.dropSelect.defaults = {
        className:             "dropSelect", // The class name to use
        arrowClass:            "icon-arrow-down", // The class name for the down arrow
        callBack:              null, // The callback function when an item is selected
        formatter:             null, // A callback to allow user formatting of the inner text
        includeEmpties:        false, // Should all empty items be included
        allowFirstEmptyAsInit: true, // If the first item is empty, include it as initial text
        setSelected:           true, // Match the selected attribute
        forceSelected:         null, // Value of item to force as selected
        width:                 "auto" // The css width or auto for calculated based on item length
    };

}(jQuery));