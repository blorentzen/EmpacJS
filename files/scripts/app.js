// App for creating Custom Empac Modules
// Built by Britton Lorentzen, 2022

import { EmpacLoader } from '/files/scripts/modules.js';

// Data Driven Components
import { EmpacModule } from '/files/scripts/modules.js';

// Functions to make custom modules render
// Handlers for different elements
// Handle container
function handleContainer(theData){
	let newElement;
	if(theData.tag != undefined){ newElement = document.createElement(theData.tag) }
	else { newElement = document.createElement('div') };
	if(theData.id != undefined){ newElement.id = theData.id; };

	// Handle inner elements
	if(theData.elements != undefined){
		theData.elements.forEach((el) =>{
			newElement.append(handleData(el));
		});
	};
	return newElement;
}

// Handle headline
function handleHeadline(theData){
	let newElement;
	newElement = document.createElement(theData.tag);
	newElement.setAttribute('size', theData.size);
	newElement.innerHTML = theData.content;
	return newElement;
}

// Handle text
function handleText(theData){
	let newElement;
	newElement = document.createElement(theData.tag);
	newElement.innerHTML = theData.content;
	return newElement;
}

// Handle image
function handleImage(theData){
	let newElement;
	newElement = document.createElement('img');
	newElement.setAttribute('alt', theData.alt);
	newElement.setAttribute('size', theData.size);
	newElement.src = theData.src;
	return newElement;
}

// Handle link
function handleLink(theData){
	let newElement;
	newElement = document.createElement('a');
	if(theData.target != undefined){ newElement.setAttribute('target', theData.target); };
	if(theData.href != undefined){ newElement.setAttribute('href', theData.href); };
	if(theData.tabindex != undefined){ newElement.setAttribute('tabindex', theData.tabindex); };

	// If link has subtype, set it up accordingly
	if(theData.subtype != undefined){
		if(theData.subtype == 'social'){
			// Add social image to button
			let socialButton = document.createElement('img');
			socialButton.classList.add('social');
			socialButton.src = '/files/images/icons/social/' + theData.color + '/' + theData.network + '.svg';
			newElement.append(socialButton);

			// Add remaining styling/attributes
			newElement.setAttribute('aria-label', theData.network);
		} else if(theData.subtype == 'image'){
			let img = document.createElement('img');
			img.setAttribute('alt', theData.aria_label);
			img.src = theData.src;
			newElement.append(img);
		}
	}
	else {
		newElement.setAttribute('aria-label', theData.aria_label);
		newElement.innerHTML = theData.content;
	};
	return newElement;
}

// Handle button
function handleButton(theData){
	let newElement;
	if(theData.subtype != undefined){
		if(theData.subtype == 'navToggle'){
			newElement = document.createElement('div');
			newElement.classList.add('toggle');
			newElement.append(document.createElement('span'));
			newElement.append(document.createElement('span'));
			newElement.setAttribute('tabindex', 0);
		}
	}
	else {
		newElement = document.createElement('button');
		newElement.innerHTML = theData.content;
		newElement.setAttribute('aria-label', theData.aria_label);
	}
	return newElement;
}

// Create elements based on data input
function createElement(theData){
	let newElement;
	if(theData.type == 'container'){ newElement = handleContainer(theData); };
	if(theData.type == 'headline'){ newElement = handleHeadline(theData); };
	if(theData.type == 'text'){ newElement = handleText(theData);	};
	if(theData.type == 'image'){ newElement = handleImage(theData); };
	if(theData.type == 'link'){ newElement = handleLink(theData); };
	if(theData.type == 'button'){ newElement = handleButton(theData); };
	return newElement;
}

/** Function that gets data from the server */
export async function getData(theData, theType){
	let url = '/files/json/';
	if(theType != undefined){ url += theType; url += '/'; }
	else { url += 'modules/'; };
	url += theData;
	url += '.json';
	let request = new Request(url);
	let response = await fetch(request);
	return await response.json();
}

/** Function that handles data driven components */
export function handleData(theData){
	// Create new element
	let newElement = createElement(theData);
	
	// Handle attributes
	if(theData.attributes != undefined){
		theData.attributes.forEach((attr) => {
			if(attr.key != undefined){
				newElement.setAttribute(attr.key, attr.value);
			}
			else { newElement.setAttribute(attr, true); };
		});
	};

	// Handle classes
	if(theData.classList != undefined){
		theData.classList.forEach((newClass) => {
			newElement.classList.add(newClass);
		});
	};

	// Handle properties
	if(theData.properties != undefined){
		theData.properties.forEach((prop) => {
			newElement.style.setProperty(prop.key, prop.value);
		});
	};
	
	// Set the element with type
	newElement.setAttribute('ejs-type', theData.type);
	
	// Return new element
	return newElement;
}

/** Define custom components **/
window.customElements.define('ejs-loader', EmpacLoader);
window.customElements.define('ejs-module', EmpacModule);
