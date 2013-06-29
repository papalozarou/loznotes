metaframe
==========

Metaframe is an easy-to-use notation layer for conveying the meta-knowledge in wireframes, mockups, and design comps. Made and shared with love by the folks at Elliance.

##About this fork
The original tab handle/button and markers were too big for my usage needs, so this fork addresses that as well as stripping the reset and converting the CSS to LESS.

##Installation
To install, simply reference the CSS and JS files in this package from your wireframe page HTML. Reference "metaframe.css" inside document's head and "metaframe-[version].js" immediately before the close of the body. The example.html file in this package shows you how it's done.

**N.B.** This does not include a CSS reset – this has been seperated out.

##Use
Get ready because this is stupid simple. For the element you want to notate, add the following attributes to the HTML tag:
class="notation" note="[your note here, but without the brackets]". You don't have to add numbers to the notes. Metaframe numbers notes automatically, so you only have to keep track of the notes themselves, and they're always located in the HTML element's tag.

##Implementation
Let's say you want to annotate a section on your page with the text, "By default, this section will contain the three most recent featured stories." And let's say the display styles for this section are in the CSS pseudoclass called "features". 
Here's what it would look like: 

    <section class="features notation" note="By default, this section will contain the three most recent featured stories.">

And here's what it looks like in a real, live web page: http://metaframe.elliance.com/example/

##How it works
Metaframe crawls the DOM looking for instances of the class, "notation" and, when it finds one, it uses magic to add the subsequent contents of "notes" to the panel overlay.

##Known Issues
Mama mia! Metaframe's not a-workin so well in IE6 or earlier!

######©2013 Elliance, Inc. http://elliance.com - Creative Commons Attribution Sharealike 3.0 Unported http://creativecommons.org/licenses/by-sa/3.0/
