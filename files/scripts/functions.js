// Functions for Empac Design
// Built by Britton Lorentzen, 2022

// Function that toggles the navigation menu
function toggleNav(){
    
    // Grab navigation elements
    let theToggle = document.querySelector('.nav-bar .toggle');
    let theDrawer = document.querySelector('nav');
	
    //Set the status
    theToggle.classList.toggle('active');
	theDrawer.classList.toggle('active');
	
	// Set accessibility
	if(theDrawer.getAttribute('aria-hidden') == 'true'){
		theDrawer.setAttribute('aria-hidden', false);
		theDrawer.querySelectorAll('a').forEach((button) => {
			button.setAttribute('tabindex', 0);
		});
		//document.querySelector('body').style.overflow = 'hidden';
	} else {
		theDrawer.setAttribute('aria-hidden', true);
		theDrawer.querySelectorAll('a').forEach((button) => {
			button.setAttribute('tabindex', -1);
		});
		//document.querySelector('body').style.overflow = 'auto';
	}
	
}

// Functions that handle modal opening/closing
function openModal(theModal){
	let modalContent = theModal.querySelector('.modal-content');
	if(!theModal.classList.contains('active')){
		theModal.style.display = 'flex';
		modalContent.appendChild(generateModalLoader());
		modalContent.appendChild(returnBookingScript());
		setTimeout(() => { 
			theModal.classList.toggle('active');
			if(theModal.querySelector('iframe') != null){
				modalContent.querySelector('iframe').onload = () => {
					modalContent.querySelector('.modal-loader').classList.toggle('inactive');
					setTimeout(() => {
						modalContent.querySelector('.modal-loader').style.display = 'none';
					}, 1000)
				}
			}
		}, 1000);
	} 
	theModal.addEventListener('click', (e) => {
		let myBoundary = theModal.querySelector('.modal-window').getBoundingClientRect();
		let xPos = e.clientX;
		let yPos = e.clientY;
		
		if(xPos < myBoundary.left || xPos > myBoundary.right || yPos < myBoundary.top || yPos > myBoundary.bottom){
			closeModal(theModal);
		}
	});
}

function closeModal(theModal){
	if(theModal.classList.contains('active')){
		theModal.classList.toggle('active');
			setTimeout(() => {
				theModal.style.display = 'none';
				theModal.querySelector('.modal-content').innerHTML = '';
			}, 500);
	}
	theModal.removeEventListener('click', () => {});
}

// Return script for opening booking widget
function returnBookingScript(){
	let bookingScript = document.createElement('script');
	bookingScript.src = 'https://square.site/appointments/buyer/widget/jlt65laivd7hjw/APR42P6AQZCD5.js';
	return bookingScript;
}

// Function that generates a loader for modals
function generateModalLoader(){
	let myLoader = document.createElement('div');
	myLoader.classList.add('modal-loader');
	myLoader.appendChild(document.createElement('span'));
		
	let img = document.createElement('img');
	img.setAttribute('alt', 'empac');
	img.setAttribute('size', 'small');
	img.src = '/files/images/icons/company/black/empac-emblem.svg';

	myLoader.appendChild(img);
	
	return myLoader;
}

// Create intersection listener
function createIntersection(){
	// Set threshold for listener
	let myLimit;
	if(window.innerWidth < 640){ myLimit = 0.05; }
	if(window.innerWidth >= 640){ myLimit = 0.1; }
	
	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if(entry.isIntersecting){
				entry.target.classList.toggle('active');
				observer.unobserve(entry.target);
			}
		});
	}, {rootMargin: "0px", threshold: myLimit});

	return observer;
}

// Function that sets event listeners for the inputs
function setFormListeners(){
    let myInputs = document.getElementsByClassName('custom-input');
    for(let i=0; i < myInputs.length; i++){
        let myValue = myInputs[i].getElementsByTagName('input');
        myValue[0].addEventListener('change', function(){
            let myId = '' + myValue[0].id;
            let myTest = document.getElementById(myId);
            if(myTest.value != ''){ 
				myTest.parentNode.classList = 'active custom-input'; 
				if(myTest.classList.contains('error')){ myTest.classList.remove('error'); }
			}
            else if(myTest.value == '') { myTest.parentNode.classList = 'custom-input'; }
        })
    }
}

// Function that sets up recaptcha
function setupForm(){
    $("#myForm").submit(function (event){
        // Get the form data
        let myFormData = {
            formName: $("#formName").val(),
            formEmail: $("#formEmail").val(),
            formPhone: $("#formPhone").val(),
            formMessage: $("#formMessage").val()
        };
        
        grecaptcha.ready(function () {
           grecaptcha.execute('6Lf7C7cfAAAAAP9-uY0oKPJ51Ugkn5k3_Vn9EWl0', { action: 'contact' }).then(function (token) {
               // Assign the recaptcha token
               myFormData.formToken = token;
               
               // Make Call
               $.ajax({
                    type: "POST",
                    url: "../files/php/contact_new.php",
                    data: myFormData,
                    dataType: "json",
                    encode: true,
                }).done(function(data){ 
                   if(data.success){ 
                       console.log('Form Sent Successfully');
                       $("#myForm").fadeOut(500, 'linear', function(){ showFormSuccess(data.name) });
                   } else {
                       console.log('Error Occurred');
                       showFormErrors(data.errors);
                       console.log(data);
                   }
                });
           });
        });

        event.preventDefault();
    });
}

// Function that shows form success
function showFormSuccess(theName){
    let mySection = document.getElementById('formSection');
    let newSection = document.createElement('div');
    newSection.classList = 'form-success margin-2x';
    
    // Split name
    let myNewName = theName.split(' ');
    
    // Build new html
    let myHTML = '<p class="large">Thank you for your message ';
    myHTML += myNewName[0];
    myHTML += "! We'll be in touch with you soon.</p>";
    
    // Set new HTML
    newSection.innerHTML = myHTML;
    mySection.appendChild(newSection);
    $(".form-success").fadeIn();
};

// Function that indicates error on form submission
function showFormErrors(theErrors){
    // Alert the user of an error
    window.alert('Looks like a field is missing. Make sure to fill out all the required fields before submitting your message.');
    
    // Get the required fields
    let myName = document.getElementById('formName');
    let myEmail = document.getElementById('formEmail');
    let myPhone = document.getElementById('formPhone');
    let myMessage = document.getElementById('formMessage');
    
    //Check fields
    checkFormError(theErrors.errName, myName);
    checkFormError(theErrors.errEmail, myEmail);
    checkFormError(theErrors.errPhone, myPhone);
    checkFormError(theErrors.errMessage, myMessage);
}

// Function that checks for the error
function checkFormError(theError, theInput){
    if(theError){ theInput.classList = 'error'; }
    else { theInput.classList = ''; }
}

// Function that handles the play/pause of a video
function playVideo(theVideoSection){
    let myButton = theVideoSection.querySelector('[video-button]');
    let myVideo = theVideoSection.querySelector('video');
    if(myVideo.paused){ 
        myVideo.play(); 
		myVideo.setAttribute('controls', true);
		theVideoSection.classList.toggle('active');
		setTimeout(() => { myButton.style.display = 'none' }, 275);
    }
}

// Function that returns CSS properties and values as an array
function getCSSProps(theEl){
	let propList = [];
	let myContainer = document.getElementById(theEl);
	for(let i = 0; i < myContainer.style.length; i++){
		let newObj = {};
		let style = myContainer.style[i];
		newObj.key = style;
		newObj.value = myContainer.style.getPropertyValue(style);
		propList.push(newObj);
	}
	return propList;
}

// Function that returns tag attributes and calues as an array
function getTagAttributes(theEl){
	let attrList = [];
	let myContainer = document.getElementById(theEl);
	let myAttrs = myContainer.getAttributeNames();
	for(let i = 0; i < myAttrs.length; i++){
		let newObj = {};
		newObj.key = myAttrs[i];
		newObj.value = myContainer.getAttribute(myAttrs[i]);
		attrList.push(newObj);
	}
	return attrList;
}

// Function that retrieves code for samples
async function retrieveCode(theSample, theType){
	let url = '/files/json/';
	if(theType != undefined){ url += theType; url += '/'; }
	else { url += 'modules/'; };
	url += theSample;
	url += '.json';
	let request = new Request(url);
	let response = await fetch(request);
	return await response.json();
}

// Function that grabs code samples to display
function displayCode(theSection){
	let mySample = theSection.getAttribute('sample');
	let fetchData;
	retrieveCode(mySample).then(function(value){ 
		fetchData = value;
	}).finally(() => { 
		let textWrapper = document.createElement('span');
		textWrapper.innerText += JSON.stringify(fetchData);
		theSection.append(textWrapper);
		
		// Format Code
		formatCode(theSection);
	});
}

// Function that formats the code
function formatCode(theSection){
	// Formatting by character
	theSection.innerHTML = theSection.innerHTML.replaceAll('{', '<br> {');
	theSection.innerHTML = theSection.innerHTML.replaceAll(',', ', ');
	
	// Formatting by simple attributes
	theSection.innerHTML = theSection.innerHTML.replaceAll('"key"', '<span class="key">"key"</span>');
	theSection.innerHTML = theSection.innerHTML.replaceAll('"value"', '<span class="key">"value"</span>');
	
	theSection.innerHTML = theSection.innerHTML.replaceAll('"type"', '<br><span class="key">"type"</span>');
	theSection.innerHTML = theSection.innerHTML.replaceAll('"id"', '<br><span class="key">"id"</span>');
	theSection.innerHTML = theSection.innerHTML.replaceAll('"tag"', '<br><span class="key">"tag"</span>');
	theSection.innerHTML = theSection.innerHTML.replaceAll('"size"', '<br><span class="key">"size"</span>');
	theSection.innerHTML = theSection.innerHTML.replaceAll('"content"', '<br><span class="key">"content"</span>');
	
	// Formatting by objects and arrays
	theSection.innerHTML = theSection.innerHTML.replaceAll('"classList"', '<br><br><span class="key">"classList"</span>');
	theSection.innerHTML = theSection.innerHTML.replaceAll('"attributes"', '<br><br><span class="key">"attributes"</span>');
	theSection.innerHTML = theSection.innerHTML.replaceAll('"properties"', '<br><br><span class="key">"properties"</span>');
	theSection.innerHTML = theSection.innerHTML.replaceAll('"elements"', '<br><br><span class="key">"elements"</span>');
};

// Function that sets up the gallery
function setupGallery(theGallery){
	let myGalleryImage = theGallery.querySelector('[gallery-display]');
	let myGalleryButtons = theGallery.querySelectorAll('[gallery-collection] button');
	myGalleryButtons.forEach( button => {
		let myImage = button.getAttribute('gallery-image');
		button.style.setProperty("--gallery-image", "url(\"" + myImage + "\")");
		button.addEventListener('click', () => {
			updateGalleryImage(myImage, myGalleryImage);
			myGalleryButtons.forEach( button => { button.classList = ''; })
			button.classList.add('active');
		});
	});
	// Set up initial state
	myGalleryButtons[0].classList.add('active');
	updateGalleryImage(myGalleryButtons[0].getAttribute('gallery-image'), myGalleryImage);
};

//Function that updates the gallery image
function updateGalleryImage(theImage, theGallery){
	theGallery.querySelector('img').src = theImage;
}

// Function that sets up YouTube Embed
function setupYTPlayer(thePlayer){
	
}

// Set the document up
window.onload = () => {
	
	// Display code samples
	document.querySelectorAll('code').forEach(el => { displayCode(el); });
	
	// Turn on videos
	document.querySelectorAll('[video-player]').forEach(vid => {
		vid.querySelector('[video-button]').addEventListener('click', () => { playVideo(vid); });
	});
	
	setTimeout(() => {
		let mySpinner = document.querySelector('.primary-loader');
		let navBar = document.querySelector('.nav-bar');
		let headerModule = document.querySelector('.header-module');
		
		document.querySelectorAll('[gallery]').forEach(gallery => { setupGallery(gallery); });

		mySpinner.classList.add('inactive');
		setTimeout(() => { 
			mySpinner.style.display = 'none'; 
			navBar.style.position = 'sticky';
		}, 1000);

		navBar.classList.add('active');
		setTimeout(() => { headerModule.classList.add('active'); }, 750);

		/*
		document.querySelector('.nav-bar .toggle').addEventListener('click', toggleNav);
		document.querySelector('.nav-bar .toggle').addEventListener('keyup', (e) => { if(e.keyCode === 13){ toggleNav(); } });
		*/
		
		// Set up observer for drop fade
		setTimeout(() => {
			let myFadeObserver = createIntersection();
			document.querySelectorAll('[anim-drop-fade]').forEach(el => { myFadeObserver.observe(el)} );
		}, 1000);

		// If buttons are present, attach listeners to them
		let myButtons = document.querySelectorAll('button[data-button-type]');
		myButtons.forEach(btn => {
			// Set modal openers
			if(btn.getAttribute('data-button-type') == 'modal-open'){
				btn.addEventListener('click', () => {
					openModal(
						document.querySelector('[data-modal-for=' + btn.getAttribute('data-button-for') + ']'), 
						document.querySelector('[data-modal-for=' + btn.getAttribute('data-button-for') + ']')
					);
				})
			}

			// Set modal closers
			if(btn.getAttribute('data-button-type') == 'modal-close'){
				btn.addEventListener('click', () => {
					closeModal(document.querySelector('[data-modal-for=' + btn.getAttribute('data-button-for') + ']'));
				})
			}
		})
	}, 1000);
	
}


