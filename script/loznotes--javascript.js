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
// loznotes.css
// -----------------------------------------------------------------------------
var loznotes = (function() {
	var notes,
		bodyNote;
	
	var notesTabControl,
		notesTabPane,
		notesAnchors;
	
	var anchorHidden = 'loznotes__anchor--is-hidden',
		anchorSelected = 'loznotes__anchor--is-selected',
		countSelected = 'loznote__count--is-selected',
		tabControlActive = 'loznotes__tab-control--is-active',
		tabPaneActive = 'loznotes__tab-pane--is-active';
		
		
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
		notesAnchors = [].slice.call(document.querySelectorAll('.loznotes__anchor a'));
	}

	// check if the notations and tab pane already exist, if so remove	
	function checkExisting() {
		if (document.getElementsByClassName('loznotes__tab-pane').length > 0) {
			var existing = [].slice.call(document.querySelectorAll('.loznotes__anchor, .loznotes__tab-control, .loznotes__tab-pane'));

			for (var i = existing.length - 1; i >= 0; i--) {
				existing[i].parentNode.removeChild(existing[i]);
			}
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
		var form = document.createElement('form'),
			input = document.createElement('input'),
			label = document.createTextNode('Show note markers');
	
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
	
		for (var i = 0; i < notes.length; i++) {
			var dt = document.createElement('dt'),
				dtId = 'loznote--' + (i + 1),
				dtClass = 'loznote__count-' + (i + 1),
				dd = document.createElement('dd'),
				ddClass = 'loznote_body-' + (i + 1);
		
			dt.id = dtId;
			dt.classList.add('loznote__count');
			dt.classList.add(dtClass);
			dd.classList.add('loznote__body');
			dd.classList.add(ddClass);
		
			dt.innerHTML = i + 1;
			dd.innerHTML = notes[i].getAttribute('data-notation');
		
			notesList.appendChild(dt);
			notesList.appendChild(dd);
		}
	
		notesTabPane.appendChild(notesList);
	}

	// create the note anchors	
	function createNoteAnchors() {
		// add note numbers to elements with [data-notation]
		for (var i = 0; i < notes.length; i++) {
			var figure = document.createElement('figure'),
				noteAnchor = document.createElement('a'),
				noteAnchorHref = '#loznote--' + (i + 1);
		
			figure.classList.add('loznotes__anchor');
			noteAnchor.innerHTML = i + 1;
			noteAnchor.href = noteAnchorHref;
		
			figure.appendChild(noteAnchor);
		
			// inserts note as first child of element with [data-notation]
			if (notes[i].firstChild) {
				notes[i].insertBefore(figure,notes[i].firstChild);
			} else {
				notes[i].appendChild(figure);
			}
		}
	}

	function hideNotes() {
		[].forEach.call(notesAnchors, function(e) {
			e.parentNode.classList.add(anchorHidden);
		});
	}

	// note anchor click function
	function interactionAnchors() {
		[].forEach.call(notesAnchors, function(e) {
			e.addEventListener('click', function(e) {
				e.preventDefault();

				addRemoveClasses(this);
			}, false);
		});
	}

	// note tab control click function
	function interactionTabControl() {
		notesTabControl.addEventListener('click', function(e) {
			var current = checkCurrentAnchor();
			
			// if there is a currently selected anchor, remove class from anchor and corresponding count
			if (current[0]) {
				removeClass(current[0],current[1]);
			}
		
			toggleTabClass();
		
			// reset scrollTop in case opened at anchor
			notesTabPane.scrollTop = 0;
		
			e.preventDefault();
		}, false);
	}

	// turn note anchors on or off
	function interactionForm() {
		document.getElementById('loznotes__form__display-toggle').addEventListener('click', function() {
			[].forEach.call(notesAnchors, function (e) {
				e.parentNode.classList.toggle(anchorHidden);
			});
		}, false);
	}
	
	// check for currently selected anchor
	function checkCurrentAnchor() {
		var currentAnchorParent = document.getElementsByClassName(anchorSelected)[0],
			currentAnchorHash;
	
		// if there is currently selected anchor, grab it's hash value
		if (currentAnchorParent) {
			currentAnchorHash = currentAnchorParent.getElementsByTagName('a')[0].hash;
		}
	
		// return array of both variables
		return [currentAnchorParent, currentAnchorHash];
	}

	// sorts out highlight classes for note anchors and counts
	function addRemoveClasses(newAnchor) {
		var current = checkCurrentAnchor();
	
		// get new anchor parent node
		var newAnchorParent = newAnchor.parentNode,
			newAnchorHash = newAnchor.hash;
	
		// test to see if there is a current anchor or not
		if (current[0]) {
			// if there is, decide if the clicked anchor is already selected or not
			if (newAnchorParent.classList.contains(anchorSelected)) {
				removeClass(newAnchorParent,newAnchorHash);
			
				closeTab();
			
				// reset scrollTop of tab
				notesTabPane.scrollTop = 0;
			} else {
				removeClass(current[0],current[1]);
			
				addClass(newAnchorParent,newAnchorHash);
			
				openTab();
			
				scrollToAnchor(newAnchorHash);
			}
		} else {
			addClass(newAnchorParent,newAnchorHash);
		
			openTab();
		
			scrollToAnchor(newAnchorHash);
		}
	}

	// add classes to anchor and count
	function addClass(anchorParent,anchorHash) {
		anchorParent.classList.add(anchorSelected);
		
		// remove hash from anchorHash so can use getElementById instead of slower querySelector
		anchorHash = anchorHash.substring(1);
		document.getElementById(anchorHash).classList.add(countSelected);
	}

	// remove classes from anchor and count
	function removeClass(anchorParent,anchorHash) {
		anchorParent.classList.remove(anchorSelected);
		
		// remove hash from anchorHash so can use getElementById instead of slower querySelector
		anchorHash = anchorHash.substring(1);
		document.getElementById(anchorHash).classList.remove(countSelected);
	}

	// simple function to open tab
	function openTab() {
		notesTabControl.classList.add(tabControlActive);
		notesTabPane.classList.add(tabPaneActive);
	}

	// simple function to close tab
	function closeTab() {
		notesTabControl.classList.remove(tabControlActive);
		notesTabPane.classList.remove(tabPaneActive);
	}

	// toggle classes for tab
	function toggleTabClass() {
		notesTabControl.classList.toggle(tabControlActive);
		notesTabPane.classList.toggle(tabPaneActive);
	}

	// checks the hash of the clicked note anchor and scrolls accordingly
	function scrollToAnchor(theHash) {
		if (theHash === '#loznote--1') {
			notesTabPane.scrollTop = 0;
		} else {
			// using querySelector here instead of getElementById as variable contains '#'
			notesTabPane.scrollTop = document.querySelector(theHash).offsetTop - 20;
		}
	}
	
	// check if readyState is complete
	function checkReadyState() {
		if (this.readyState === 4) {
			// for some reason this doesn't update unless it's wrapped in a function in setTimout
			var checkAgain = setTimeout(function() {
				loznotes.checkSubstring();
			},1);
		}
	}
		
	return {
		// check substring and create notes	
		checkSubstring: function() {
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
		},
		
		// hook in to ajax requests to update notes
		ajaxListener: function() {
			// store open request;
			var oldSend = XMLHttpRequest.prototype.send;
		
			XMLHttpRequest.prototype.send = function() {
				this.addEventListener("readystatechange", checkReadyState);
			
				// run the real open
				oldSend.apply(this,arguments);
			};
		}
	};
})();

document.addEventListener('DOMContentLoaded',loznotes.checkSubstring);

loznotes.ajaxListener();