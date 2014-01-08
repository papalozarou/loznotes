// -----------------------------------------------------------------------------
// loznotes is a notation layer for conveying information about wireframes, 
// mockups and design comps. Originally a fork, this now a complete rewrite of 
// Elliance's excellent Metaframe work (http://github.com/elliance/metaframe).
//
// ©2013-2014 Loz Gray – Creative Commons Attribution Sharealike 3.0 Unported 
// http://creativecommons.org/licenses/by-sa/3.0/
//
// Dependancies:
//
// jquery 2.x.x
// loznotes.css
// -----------------------------------------------------------------------------
$(function () {
	// some global variables
	var notes;
	var bodyNote;

	var notesTabControl;
	var notesTabPane;
	var notesAnchors;

	// check substring and create notes	
	function checkSubstring() {
		// get document URL and parse strings from first '?' character, 
		// then split by '&'
		var subStrings = window.location.search.substring(1).split('&');
	
		// check for switches
		if ($.inArray('loznotes=hidden',subStrings) > -1 || $.inArray('loznotes=hide',subStrings) > -1) {
			createNotes();
		
			hideNotes();
		
			interactionAnchors();
			interactionTabControl();
			interactionForm();
		} else if ($.inArray('loznotes=off',subStrings) > -1) {
			return false;
		} else {
			createNotes();

			interactionAnchors();
			interactionTabControl();
			interactionForm();
		
			// show note anchors by default
			$('#loznotes__form__display-toggle').attr('checked','checked');
		}
	}

	// create notes and notation pane
	function createNotes() {
		checkExisting();
	
		// grab all elements with [data-notation]
		notes = $('[data-notation]');
	
		// check for notation on body, create notes, tab and anchors
		checkBodyNote();
		createNotesTab();
		createNoteAnchors();
	
		// grab inserted note anchors
		notesAnchors = $('.loznotes__anchor a');
	}

	// check if the notations and tab pane already exist, if so remove	
	function checkExisting() {
		if ($('.loznotes__tab-pane').length > 0) {
			$('.loznotes__anchor').add('.loznotes__tab-control').add('.loznotes__tab-pane').remove();
		}
	}

	// check to see if the body has a data-notation	
	function checkBodyNote() {
		if ($('body').data('notation')) {
			// seperate body note
			bodyNote = $(notes[0]);
		
			// remove body note from array
			notes = notes.splice(1);
		}
	}

	function createNotesTab() {
		createNotesTabControl();
	
		// create and insert notes tab pane
		notesTabPane = $('<section/>',{'class':'loznotes__tab-pane'}).appendTo('body');
	
		// get page title and insert into notes panel
		notesTabPane.html('<h1>' + document.title + '</h1>');
	
		createNotesTabForm();
		createNotesTabDescription();
		createNotesTabList();
	}

	// create and insert notes tab control
	function createNotesTabControl() {
		notesTabControl = $('<a/>', {'class': 'loznotes__tab-control',href: '#'}).appendTo('body');
	}

	function createNotesTabForm() {
		// generate notes panel static content and insert into notes panel
		var structure = $('<form class="loznotes__form"><input type="checkbox" id="loznotes__form__display-toggle" />Show note markers</form><h2>Page Notes</h2>');
		structure.appendTo(notesTabPane);
	}

	// insert body note if present
	function createNotesTabDescription() {
		if (bodyNote) {
			notesTabPane.append('<p class="loznotes__page-description">' + bodyNote.data('notation') + '</p>');
		}
	}

	// generate notes list container within notes panel
	function createNotesTabList() {
		var notesList = $('<dl/>',{'class':'loznotes__list'}).appendTo(notesTabPane);
	
		// number and add the notes to the note list
		for (var i = 0; i < notes.length; i++) {
			notesList.append('<dt id= "loznote--' + (i + 1) + '" class="loznote__count loznote__count-' + (i + 1) + '">' + (i + 1) + '</dt>' + '<dd class="loznote__body loznote__body-' + (i + 1) + '">' + $(notes[i]).data('notation') + '</dd>');
		}
	}
	
	// create the note anchors
	function createNoteAnchors () {
		// add note numbers to elements with [data-notation]
		for (var i = 0; i < notes.length; i++) {
			$(notes[i]).prepend('<figure class="loznotes__anchor"><a href="#loznote--' + (i + 1) + '">' + (i + 1) + '</a></figure>');
		}
	}

	// hhide note anchors by default
	function hideNotes() {
		notesAnchors.parent().addClass('loznotes__anchor--is-hidden');
	}
	
	// note anchor click function
	function interactionAnchors(){
		// open tab pane
		$(notesAnchors).click(function (e) {
			toggleClass();

			// don't scroll within tab if first note is clicked/tapped	
			if (this.hash == '#loznote--1') {
				notesTabPane.scrollTop(0);
			} else {
				notesTabPane.scrollTop($(this.hash).position().top - 20);
			}
			
			e.preventDefault();
		});
	}

	// note tab control click function
	function interactionTabControl(){
		// open tab pane
		$(notesTabControl).click(function (e) {
			toggleClass();
			
			// reset scroll top in case opened at anchor
			notesTabPane.scrollTop(0);

			e.preventDefault();
		});
	}

	// turn note anchors on or off
	function interactionForm(){
		$('#loznotes__form__display-toggle').click(function () {
			notesAnchors.parent().toggleClass('loznotes__anchor--is-hidden');
		});
	}
	
	function toggleClass(){
		notesTabControl.toggleClass('loznotes__tab-control--is-active');
		notesTabPane.toggleClass('loznotes__tab-pane--is-active');
	}

	checkSubstring();

	// if anything is loaded into the page via ajax, re-create the notes
	$(document).ajaxComplete(function () {
		checkSubstring();
	});
});
