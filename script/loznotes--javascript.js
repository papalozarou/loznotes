// -----------------------------------------------------------------------------
// loznotes is a notation layer for conveying information about wireframes, 
// mockups and design comps. Originally a fork, this now a complete rewrite of 
// Elliance's excellent Metaframe work (http://github.com/elliance/metaframe).
//
// ©2013 Loz Gray – Creative Commons Attribution Sharealike 3.0 Unported 
// http://creativecommons.org/licenses/by-sa/3.0/
//
// Dependancies:
//
// loznotes.css
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
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
		var subStrings = [].slice.call(location.search.substring(1).split('&'));
		
		if (subStrings.indexOf('loznotes=hidden') > -1 || subStrings.indexOf('loznotes=hide') > -1) {
			createNotes();
		
			hideNotes();
			
			interactionAnchors();
			interactionTabControl();
			interactionForm();
		} else if (subStrings.indexOf('loznotes=off') > -1) {
			return false;
		} else {
			createNotes();
		
			interactionAnchors();
			interactionTabControl();
			interactionForm();
			
			// show note anchors by default
			document.querySelector('#loznotes__form__display-toggle').setAttribute('checked','checked');
		}
	}
	
	// create notes and notation pane
	function createNotes() {
		checkExisting();
		
		// grab all elements with [data-notation]
		notes = [].slice.call(document.querySelectorAll('[data-notation]'));

		// check for notation on body, create notes, tab and anchors
		checkBodyNote();
		createNotesTab();
		createNoteAnchors();
		
		// grab inserted note anchors
		notesAnchors = [].slice.call(document.querySelectorAll('.loznotes__anchor'));
	}

	// check if the notations and tab pane already exist, if so remove	
	function checkExisting() {
		if (document.querySelectorAll('.loznotes__tab-pane').length > 0) {
			var loznotes = document.querySelectorAll('.loznotes__anchor','.loznotes__tab-control','.loznotes__tab-pane');
			loznotes.parentNode.removeChild(loznotes);
		}
	}
	
	// check to see if the body has a data-notation	
	function checkBodyNote() {
		if (document.getElementsByTagName('body')[0].hasAttribute('data-notation')) {
			// seperate body note
			bodyNote = notes[0];
			
			// remove body note from array
			notes = notes.splice(1);
		}
	}

	// create the notes tab	
	function createNotesTab() {
		createNotesTabControl();
		
		// create notes tab pane
		notesTabPane = document.createElement('section');
			
		notesTabPane.classList.add('loznotes__tab-pane');
		
		// get page title and insert into notes tab pane
		var notesTabTitle = document.createElement('h1');
			
		notesTabTitle.innerHTML = document.title;
		
		notesTabPane.appendChild(notesTabTitle);
		
		createNotesTabForm();
		
		// create and insert subtitle
		var subTitle = document.createElement('h2');

		subTitle.innerHTML = 'Page Notes';
		
		notesTabPane.appendChild(subTitle);
		
		createNotesTabDescription();
		
		createNotesTabList();
		
		// insert final tab into document
		document.body.appendChild(notesTabPane);
	}

	// create and insert notes tab control
	function createNotesTabControl() {
		notesTabControl = document.createElement('a');
				
		notesTabControl.classList.add('loznotes__tab-control');
		notesTabControl.title = 'Open and close the notation tab pane';
		notesTabControl.href = '#loznotes__tab';
		
		document.body.appendChild(notesTabControl);
	}

	function createNotesTabForm() {
		// create and insert show hide switch/form
		var form = document.createElement('form');
		var input = document.createElement('input');
		var label = document.createTextNode('Show note markers');
		
		form.classList.add('loznotes__form');
		input.setAttribute('type','checkbox');
		input.id = 'loznotes__form__display-toggle';
		
		form.appendChild(input);
		form.appendChild(label);
		
		notesTabPane.appendChild(form);
	}

	// insert body note if present
	function createNotesTabDescription() {
		if (bodyNote) {
			var p = document.createElement('p');
			
			p.classList.add('loznotes__page-description');
			p.innerHTML = bodyNote.getAttribute('data-notation');
			
			notesTabPane.appendChild(p);
		}
	}
	
	// generate notes list container within notes panel
	function createNotesTabList() {
		var notesList = document.createElement('dl');
		
		notesList.classList.add('loznotes__list');
		
		notesTabPane.appendChild(notesList);
		
		for (var i = 0; i < notes.length; i++) {
			var dt = document.createElement('dt');
			var dtClass = 'loznote__count-' + (i + 1);
			var dd = document.createElement('dd');
			var ddClass = 'loznote_body-' + (i + 1);
			
			dt.classList.add('loznote__count');
			dt.classList.add(dtClass);
			dd.classList.add('loznote__body');
			dd.classList.add(ddClass);
			
			dt.innerHTML = i + 1;
			dd.innerHTML = notes[i].getAttribute('data-notation');
			
			notesList.appendChild(dt);
			notesList.appendChild(dd);
		}
	}
	
	// create the note anchors	
	function createNoteAnchors() {
		// add note numbers to elements with [data-notation]
		for (var i = 0; i < notes.length; i++) {
			var noteAnchor = document.createElement('span');
			var figure = document.createElement('figure');
			
			noteAnchor.classList.add('loznotes__anchor');
			figure.innerHTML = i + 1;
			
			noteAnchor.appendChild(figure);
			
			notes[i].parentNode.insertBefore(noteAnchor,notes[i]);
		}
	}
	
	function hideNotes() {
		[].forEach.call(notesAnchors, function (e) {
			e.classList.add('loznotes__anchor--is-hidden');
		});
	}
	
	// note anchor click function
	function interactionAnchors() {
		[].forEach.call(notesAnchors, function(e) {
			e.addEventListener('click', function() {
				toggleClass();
			}, false);
		});
	}
	
	// note tab control click function
	function interactionTabControl() {
		notesTabControl.addEventListener('click', function(e) {
			toggleClass();
		
			e.preventDefault();
		}, false);
	}

	// turn note anchors on or off
	function interactionForm() {
		document.querySelector('#loznotes__form__display-toggle').addEventListener('click', function() {
			[].forEach.call(notesAnchors, function (e) {
				e.classList.toggle('loznotes__anchor--is-hidden');
			});
		}, false);
	}

	// toggle classes
	function toggleClass() {
		notesTabControl.classList.toggle('loznotes__tab-control--is-active');
		notesTabPane.classList.toggle('loznotes__tab-pane--is-active');
	}

	// check ajax status
	function ajaxUpdate(data) {
		if (data.status === 'success') {
			checkSubstring();
		}
	}
	
	checkSubstring();
	
	// if anything is loaded into the page via ajax, re-create the notes
	document.addEventListener('pageUpdated', function() {
		ajaxUpdate(data);
	});
});