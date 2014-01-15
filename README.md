loznotes
==========

loznotes is a notation layer for conveying information about wireframes, mockups and design comps. Originally a fork, this now a complete rewrite of Elliance's excellent Metaframe work (http://github.com/elliance/metaframe).

##About this fork
The original tab handle/button and markers were too big for my usage needs, so this fork began as a means of addressing that as well as stripping the reset and converting the CSS to LESS.

Since then the method of usage has been converted to a data attribute ([data-notation]) instead of a class ('.notation') and attribute ([note]). As part of that work the Javascript/JQuery has been completely re-written.

In addition, switches have been added to enable defaulting to hidden anchors, or not displaying the anchors/notation pane at all.

##Installation & dependancies
There are now two versions of loznotes to use, a vanilla javascript version and a jquery version.

To use loznotes, add a link to "loznotes.css" inside your documents head and a link to the relevant jQuery/javascript file before the close of the body tag.

If you decided to use the jQuery version, you'll need to include jQuery (http://jquery.com/download/) before referencing the "loznotes--jquery.min.js". Version 2.0.2 is included in the js/vendor folder for convenience.

The two .png files will need to be placed into your image folder – 'loznotes.less' contains a variable, **@path--images**, to change the path to these images.

The index.html provides an example.

**N.B.** This package does not include a CSS reset – this has been seperated out to avoid interference with exisiting styles.

##Usage
Just add the data attribute **data-notation="[your note here, but without brackets]"** to any element that you would like to annotate.

For example, let's say you want to annotate a section on your page with the text, "By default, this section will contain the three most recent featured stories." And let's say the display styles for this section are in the CSS pseudoclass called "features".  Here's what that would look like: 

    <section class="features" data-notation="By default, this section will contain the three most recent featured stories.">

loznotes numbers notes automatically, so you only have to keep track of the notes themselves and they are always located on the HTML element.

In addition to annotating elements, you can also add a page description on the body element:

    <body data-notation="This is an example of a page description.">

The **data-notation** attribute seems to allow simple inline HTML (strong, em) – I've not tested this extensively though.

When content is pulled in through ajax calls there is an event listener on the document that will trigger the notes pane and anchors to be re-initialised, adding any new notes.

The enclosed index.html file provides more examples of usage and there is now [a live example from a recent client project](http://artfund-getinvolved-2013.lab7.co.uk/).

If you'd like to change the red colour, or the highlight color, "loznotes.less" contains two colour variables, **@color--brand** and **@color--highlight**, which you can change to whatever you need.

##Switches
It is now possible to hide the note anchors by default, or turn the notes off completely, via switches.

To hide the note anchors by default:

**?loznotes=hidden**
**?loznotes=hide**

To turn off note anchors and the notation pane completely:

**?loznotes=off**

Example usage:

http://mydomain.com/mypage.html?loznotes=hidden – hides the note anchors by default
http://mydomain.com/mypage.html?loznotes=hide – hides the note anchors by default

or

http://mydomain.com/mypage.html?loznotes=off – removes the note anchors and note pane completely

A URL without a switch provided will display note anchors and the notes pane as normal. Also these switches will now work with Codekit's cachebuster query string.

**N.B.** The switches wont persist, so you'll need to add them to each URL.

##How it works
loznotes scans the DOM for elements with a [data-notation] attribute, then creates a numbered note anchor and a tab (with a title taken from the page's title attribute) containing each of the notations.

##Browser support
This has been tested on Mac versions of Chrome (28), Safari (6.0.5), Firefox (14.0.1) and Opera (12.01). It should work in IE9 (jquery version only) and above (javascript version) in PC land.

On hand held devices it has been tested on iOS 5-7 Mobile Safari and on Andriod 4.x, in both Chrome and the default browser. It works of a fashion in the Android 3.2 browser.

There's a weird bug with the vanilla Javascript version in Chrome on iOS that stops the tab from staying open – I'm trying to fix this.

You're milage may vary considerably in other browsers.

##Known Issues

There shouldn't be too many, apart from:

* Adding [data-notation] to img elements will not work.
* Adding [data-notation] to child elements within a table, such as tr, th and td also causes problems. Adding to the table element itself works okay.
* On a Nexus 7, running Android 4.x.x Chrome browser, the pane has slight CSS issues.

Any more let me know.

######©2013 Loz Gray - Creative Commons Attribution Sharealike 3.0 Unported http://creativecommons.org/licenses/by-sa/3.0/
