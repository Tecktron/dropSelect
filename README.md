# dropSelect jQuery Plugin

This is a CSS 3/jQuery plugin for making a div based dropdown select box.
All styling is done with CSS. Usage is simple: `$('#mySelectElement').dropSlected()` you're ready to go.
It takes an optional object of options:

+ className - Specify the class name to use (defaults to "dropSelect")
+ arrowClass - The class name for the down arrow (defaults to "icon-arrow-down")
+ callBack: A callback function when an item is selected (defaults to null)
+ formatter: A callback to allow user formatting of the inner text (defaults to null)
+ includeEmpties: Set to true to include all empty (no value) items (defaults to false)
+ allowFirstEmptyAsInit: If the first item has no value, include it as initial text (defaults to true)
+ setSelected: When set to true, the selected item in the select box will be matched (defaults to true)
+ forceSelected: If given a value, will make that item selected over anything else (defaults to null)
+ width: The width in your favorite css unit (defaults to "auto", a calculated value based on the longest item length)

Please see the `demo.html` for a full working example.

If you run into any problems, open an issue or fix it and make a pull request.
