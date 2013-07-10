metaframe
==========

Metaframe is an easy-to-use notation layer for conveying the meta-knowledge in wireframes, mockups, and design comps. Modified by Loz Gray, based on Elliance's metaframe http://github.com/elliance/metaframe

##About this fork
The original tab handle/button and markers were too big for my usage needs, so this fork addresses that as well as stripping the reset and converting the CSS to LESS.

The usage has been converted to a data attribute ([data-notation]) instead of a class ('.notation') and attribute ([note]). As part of that work the Javascript/JQuery has been re-written.

##Installation
To install, simply reference the CSS and JS files in this package from your wireframe page HTML. Reference "metaframe.css" inside document's head and "metaframe.js" immediately before the close of the body. The index.html file in this package shows you how it's done.

**N.B.** This does not include a CSS reset – this has been seperated out to avoid interference with exisiting styles.

##Use
For elements you want to notate, add the following data attribute: **data-notation="[your note here, but without brackets]"**

Metaframe number notes automatically, so you only have to keep track of the notes themselves and they are always located on the HTML element.

##Implementation
Let's say you want to annotate a section on your page with the text, "By default, this section will contain the three most recent featured stories." And let's say the display styles for this section are in the CSS pseudoclass called "features". 
Here's what it would look like: 

    <section class="features" data-notation="By default, this section will contain the three most recent featured stories.">

The enclosed index file provides an example of usage. At a later date, when I start using this newer version properly, I'll update with a real world example.

##How it works
Metaframe.js looks through the DOM to find elements with a [data-notation] attribute, then creates a tab containing each of these notations.

##Browser support
This has been tested on Mac versions of Chrome (28), Safari (6.0.5), Firefox (14.0.1) and Opera (12.01). It should work in IE9 and above in PC land.

On hand held devices it has been tested on iOS 5-7 Mobile Safari and on Andriod 4.x, both Chrome and Browser. It works of a fashion in the Android 3.2 browser.

You're milage may vary considerably in other browsers.

##Known Issues

There's shouldn't be too many, apart from:

* Adding [data-notation] to <img> elements will not work.
* On a Nexus 7, running Android 4.x.x Chrome browser, the pane has slight CSS issues.

Any more let me know.

######©2013 Loz Gray - Creative Commons Attribution Sharealike 3.0 Unported http://creativecommons.org/licenses/by-sa/3.0/
