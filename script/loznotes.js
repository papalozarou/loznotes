// loznotes is a notation layer for conveying information about wireframes, mockups and design comps. Originally a fork, this now a complete rewrite of Elliance's excellent Metaframe work (http://github.com/elliance/metaframe).
// ©2013 Loz Gray – Creative Commons Attribution Sharealike 3.0 Unported http://creativecommons.org/licenses/by-sa/3.0/

$(function () {
	// some global variables
	var notes;
	var notesTabControl;
	var notesTabPane;
	
	// defined here for ease
	var title = $(this).attr('title');
	
	// get document URL and parse string from first '?' character, then split by '='
	var subStrings = window.location.search.substring(1).split('=');
	
	// check substring and create notes
	function checkSubstring () {
		// if no substring generate notes
		if (subStrings.length <= 1 || subStrings[1] === 'hidden' || subStrings[1] === 'hide') {
			createNotes();
			if (subStrings.length === 1) {
				$('#note-anchors-display-toggle').attr('checked','checked');
			}
		}
	}
	
	// defines function to create notes and notation pane
	function createNotes () {
		// check if the notations and tab pane already exist, if so remove
		if ($('.notes-tab-pane').length > 0) {
			$('.notes-anchor').add('.notes-tab-control').add('.notes-tab-pane').remove();
		}
		
		// grab all elements with [data-notation]
		notes = $('[data-notation]');
		
		createNotesTab(notes);
		createNoteAnchors(notes);
		
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
			notesAnchors.toggleClass('notes-hide');
		});
	
		// hide note anchors by default 
		if (subStrings[1] === 'hidden' || subStrings[1] === 'hide') {
			$('#notes-anchors-display-toggle').removeAttr('type');
			notesAnchors.addClass('notes-hide');
		}
	}
	
	// create the notes tab
	function createNotesTab (notes) {
		// generate notes tab
		notesTabControl = $('<a/>', {'class': 'notes-tab-control',href: '#'}).appendTo('body');

		// generate notes panel
		notesTabPane = $('<section/>',{'class':'notes-tab-pane'}).appendTo('body');

		// get page title and insert into notes panel
		notesTabPane.html('<h1>' + title + '</h1>');
	
		// generate notes panel static content and insert into notes panel
		var structure = $('<form class="form-notes-display"><input type="checkbox" id="note-anchors-display-toggle" />Show note markers</form><h2>Page Notes</h2>');
		structure.appendTo(notesTabPane);

		// generate notes list container within notes panel
		var notesList = $('<dl/>',{'class':'notes-list'}).appendTo(notesTabPane);

		// number and add the notes to the note list
		for (var i = 0; i < notes.length; i++) {
			notesList.append('<dt class="note-count note-count-' + (i + 1) + '">' + (i + 1) + '</dt>' + '<dd class="note-body note-body-' + (i + 1) + '">' + $(notes[i]).data('notation') + '</dd>');
		}
	}
	
	// create the note anchors
	function createNoteAnchors (notes) {
		// add note numbers to elements with [data-notation]
		for (var i = 0; i < notes.length; i++) {
			$(notes[i]).prepend('<span class="notes-anchor"><figure>' + (i + 1) + '</figure></span>');
		}
	}
	
	checkSubstring();
	
	// if anything is loaded into the page via ajax, re-create the notes
	$(document).ajaxComplete(function () {
		checkSubstring();
	});
});
