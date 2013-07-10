// Metaframe is an easy to use annotation layer for converying information about wireframes, mockups and design comps. Modified by Loz Gray
// Based on Elliance's metaframe http://github.com/elliance/metaframe
// ©2013 Loz Gray – Creative Commons Attribution Sharealike 3.0 Unported http://creativecommons.org/licenses/by-sa/3.0/

$(function () {
	// grab all elements with [data-notation]
	var notes = $('[data-notation]');
	
	// generate notes tab
	var notesTabControl = $('<a/>', {'class': 'notes-tab-control',href: '#'}).appendTo('body');
	
	// generate notes panel
	var notesTabPane = $('<section/>',{'class':'notes-tab-pane'}).appendTo('body');

	// get page title and insert into notes panel
	var title = $(this).attr('title');
	notesTabPane.html('<h1>' + title + '</h1>');
	
	// generate notes panel static content and insert into notes panel
	var structure = $('<form class="form-notes-display"><input type="checkbox" id="note-anchors-display-toggle" checked="checked" >Show note markers</form><h2>Page Notes</h2>');
	structure.appendTo(notesTabPane);
	
	// generate notes list container within notes panel
	var notesList = $('<dl/>',{'class':'notes-list'}).appendTo(notesTabPane);
	
	// number and add the notes to the note list
	for (var i = 0; i < notes.length; i++) {
		notesList.append('<dt class="note-count note-count-' + (i + 1) + '">' + (i + 1) + '</dt>' + '<dd class="note-body note-body-' + (i + 1) + '">' + $(notes[i]).data('notation') + '</dd>');
	}
	
	// add note numbers to elements with [data-notation]
	for (i = 0; i < notes.length; i++) {
		$(notes[i]).prepend('<span class="notes-anchor"><figure>' + (i + 1) + '</figure></span>');
	}
	
	// grab inserted note anchors
	var notesAnchors = $('.notes-anchor');
		
	// open tab pane
	$(notesTabControl).add(notesAnchors).click(function (e) {
		notesTabControl.toggleClass('is-open');
		notesTabPane.toggleClass('is-open');
		
		e.preventDefault();
	});
	
	// turn note anchors on or off
	$('#note-anchors-display-toggle').click(function () {
		console.log(notesAnchors);
		notesAnchors.toggleClass('notes-hide');
	});
	
});