metaframe
==========

loznotes is a notation layer for conveying information about wireframes, mockups, and design comps. Originally a fork, this now a complete rewrite of Elliance's Metaframe work (http://github.com/elliance/metaframe).

##About this fork
The original tab handle/button and markers were too big for my usage needs, so this fork began as a means of addressing that as well as stripping the reset and converting the CSS to LESS.

Since then the method of usage has been converted to a data attribute ([data-notation]) instead of a class ('.notation') and attribute ([note]). As part of that work the Javascript/JQuery has been completely re-written.

In addition, switches have been added to enable defaulting to hidden anchors, or not displaying the anchors/notation pane at all.

##Installation & dependancies
You'll need to be using jQuery, which you can download, or version 2.0.2 is included in the js/vendor folder.

To install loznotes simply link to the CSS and JS files in this package from your wireframe, mockup or design comp HTML.

Reference "loznotes.css" inside document's head and "loznotes.js" immediately before the close of the body. The index.html provides an example.

**N.B.** This package now does not include a CSS reset – this has been seperated out to avoid interference with exisiting styles.

##Use
For elements you want to notate, add the following data attribute: **data-notation="[your note here, but without brackets]"**

Metaframe numbers notes automatically, so you only have to keep track of the notes themselves and they are always located on the HTML element.

##Implementation
Let's say you want to annotate a section on your page with the text, "By default, this section will contain the three most recent featured stories." And let's say the display styles for this section are in the CSS pseudoclass called "features". 
Here's what it would look like: 

    <section class="features" data-notation="By default, this section will contain the three most recent featured stories.">

The enclosed index file provides an example of usage. At a later date, when I start using this newer version properly, I'll update with a real world example.

##Switches
A client recently asked me if it were possible to show some wireframes either with the note anchors hidden or notes completely off. So I've done a quick hack to the jQuery to allow for simple switches.

To hide the note anchors by default:
**?notation=hidden**
**?notation=hide**

To turn off note anchors and the notation pane completely:
**?notation=off**

Example usage:

http://mydomain.com/mypage.html?notation=hidden – hides the note anchors by default
http://mydomain.com/mypage.html?notation=hide – hides the note anchors by default

or

http://mydomain.com/mypage.html?notation=off – removes the note anchors and note pane completely

A URL without a switch provide note anchors and the notes pane as normal.

**N.B.**
* The switches wont persist, so you'll need to add them to each URL.
* You can use whatever you want between the '?' and the '=' – the jQuery only tests for the second part (the 'hidden'/'off' bit). So ?wireframe-notations=off would work as well.

##How it works
loznotes.js looks scans the DOM for elements with a [data-notation] attribute, then creates a tab, with a title from the pages header, containing each of these notations.

##Browser support
This has been tested on Mac versions of Chrome (28), Safari (6.0.5), Firefox (14.0.1) and Opera (12.01). It should work in IE9 and above in PC land.

On hand held devices it has been tested on iOS 5-7 Mobile Safari and on Andriod 4.x, both Chrome and Browser. It works of a fashion in the Android 3.2 browser.

You're milage may vary considerably in other browsers.

##Known Issues

There's shouldn't be too many, apart from:

* Adding [data-notation] to img elements will not work.
* On a Nexus 7, running Android 4.x.x Chrome browser, the pane has slight CSS issues.

Any more let me know.

######©2013 Loz Gray - Creative Commons Attribution Sharealike 3.0 Unported http://creativecommons.org/licenses/by-sa/3.0/
