// Custom Components Library by blorentz

/* Class for generating a primary container */
class Container {
	constructor(){
		// Set main attributes
		this.type = 'Container';
		this.id;
		this.classList = [];
		this.attributes = [];
		this.elements = [];
	}
	
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
			for (let k = 0; k < this.elements.length; k++){ theElement.appendChild(this.elements[k]); }
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
}

/* Class for generating a button*/
class Button extends Container {
	constructor(){
		super();
		this.type = 'Button';
		this.innerText;
	}
	
	setText(theText){
		this.innerText = document.createTextNode(theText.toString());
	}
	
	returnMarkup(){
		let newContainer = document.createElement('button');
		if(this.id != undefined){newContainer.setAttribute('id', this.id)}
		this.setClasses(newContainer);
		this.setAttributes(newContainer);
		this.setElements(newContainer);
		return newContainer;
	}
}

window.customElements.define('empac-container', Container);
window.customElements.define('empac-button', Button);