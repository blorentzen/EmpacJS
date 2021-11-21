/** Custom Components Library
* @author Britton Lorentzen <BrittonLorentzen@gmail.com>
*/

/** Class for generating a headline
 * @author Britton Lorentzen <BrittonLorentzen@gmail.com>
 */
class Headline {
	constructor(theTag){
		this.type = 'Headline';
		this.tag = theTag;
		this.content;
	}
	
	setTag(newTag){ this.tag = newTag; }
	setContent(theContent){ this.content = theContent; }
	
	returnMarkup(){
		let newHeadline = document.createElement(this.tag);
		newHeadline.innerText = this.content;
		return newHeadline;
	}
}

/** Class for generating a paragraph
 * @author Britton Lorentzen <BrittonLorentzen@gmail.com>
 */
class Paragraph {
	constructor(){
		this.type = 'Paragraph';
		this.content;
	}
	
	setContent(theContent){ this.content = theContent; }
	
	returnMarkup(){
		let newCopy = document.createElement('p');
		newCopy.innerText = this.content;
		return newCopy;
	}
}

/** Class for generating a primary container 
* @author Britton Lorentzen <BrittonLorentzen@gmail.com>
*/
class Container {
	constructor(){
		// Set main attributes
		this.type = 'Container';
		this.id;
		this.classList = [];
		this.attributes = [];
		this.elements = [];
	}
	
	setType(theType){ this.type = theType }
	setID(newID){ if(newID != undefined){ this.id = newID.toString() } }
	addClass(newClass){  if (newClass != undefined){ this.classList.push(newClass.toString()) } }
	
	removeClass(theClass){
		if(this.classList.includes(theClass)){
			let myIndex = this.classList.indexOf(theClass);
			this.classList.splice(myIndex, 1);
		}
	}
	
	addAttribute(theAttr){ if (theAttr != undefined){ this.attributes.push(theAttr.toString()) } }
	
	removeAttribute(theAttr){
		if(this.attributes.includes(theAttr)){
			let myIndex = this.attributes.indexOf(theAttr);
			this.attributes.splice(myIndex, 1);
		}
	}
	
	addElement(theEl){
		if (theEl != undefined){ this.elements.push(theEl) }
	}
	
	setClasses(theElement){
		if(this.classList.length > 0){
			for (let i=0; i < this.classList.length; i++){ theElement.classList.add(this.classList[i]) }
		}
	}
	
	setAttributes(theElement){
		if(this.attributes.length > 0){
			for (let j = 0; j < this.attributes.length; j++) { theElement.setAttribute(this.attributes[j], true); }
		}
	}
	
	setElements(theElement){
		if(this.elements.length > 0){
			for (let k = 0; k < this.elements.length; k++){ theElement.append(this.elements[k]); }
		}
	}
	
	returnMarkup(){
		let newContainer = document.createElement('div');
		if(this.id != undefined){newContainer.setAttribute('id', this.id)}
		this.setClasses(newContainer);
		this.setAttributes(newContainer);
		this.setElements(newContainer);
		return newContainer;
	}
	
	returnJSON(){ return JSON.stringify(this); }
}

/** Class for generating a button
* @author Britton Lorentzen <BrittonLorentzen@gmail.com>
*/
class Button extends Container {
	constructor(theText){
		super();
		if (theText != undefined){ this.innerText = theText ; }
		else { this.innerText = 'Button'; }
	}
	
	setText(theText){ this.innerText = theText; }
	
	returnMarkup(){
		let newButton = document.createElement('button');
		newButton.appendChild(document.createTextNode(this.innerText));
		
		if(this.id != undefined){newButton.setAttribute('id', this.id)}
		this.setClasses(newButton);
		this.setAttributes(newButton);
		this.setElements(newButton);
		return newButton;
	}
}

/** Class for generating a link 
* @author Britton Lorentzen <BrittonLorentzen@gmail.com>
*/
class Link extends Button {
	constructor(theHref, theText){
		super(theText);
		if (theHref != undefined){ this.href = theHref; }
		else { this.href = '#' }
		this.tabindex = 0;
		this.target = '_blank';
		this.aria = {};
		this.aria.label;
	}
	
	setHref(theHref){
		if (theHref != undefined){ this.href = theHref; }
	}
	
	setTabIndex(theIndex){
		if (theIndex != undefined){ this.tabindex = theIndex; }
	}
	
	setTarget(theTarget){
		if (theTarget != undefined){ this.target = theTarget; }
	}
	
	returnMarkup(){
		let newLink = document.createElement('a');
		newLink.appendChild(document.createTextNode(this.innerText));
		
		if(this.id != undefined){newLink.setAttribute('id', this.id)}
		if(this.href != undefined){newLink.setAttribute('href', this.href)}
		if(this.aria.label != undefined){newLink.setAttribute('href', this.aria.label)}
		newLink.setAttribute('tabindex', this.tabindex.toString());
		newLink.setAttribute('target', this.target);
		
		this.setClasses(newLink);
		this.setAttributes(newLink);
		this.setElements(newLink);
		return newLink;
	}
}

window.customElements.define('empac-container', Container);
window.customElements.define('empac-button', Button);
window.customElements.define('empac-link', Link);