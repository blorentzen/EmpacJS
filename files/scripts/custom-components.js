// Custom Components Library by blorentz

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
	
	addClass(newClass){ 
		if (newClass != undefined){ this.classList.push(newClass.toString()) }
	}
	
	removeClass(theClass){
		if (theClass != undefined){
			if(this.classList.includes(theClass)){
				let myIndex = this.classList.indexOf(theClass);
				this.classList.splice(myIndex, 1);
			}
		}
	}
	
	addAttribute(theAttr){
		if (theAttr != undefined){ this.attributes.push(theAttr.toString()) }
	}
	
	removeAttribute(theAttr){
		if (theAttr != undefined){
			if(this.attributes.includes(theAttr)){
				let myIndex = this.attributes.indexOf(theAttr);
				this.attributes.splice(myIndex, 1);
			}
		}
	}
	
	addElement(theEl){
		if (theEl != undefined){ this.elements.push(theEl) }
	}
	
	returnMarkup(){
		let newContainer = document.createElement('div');
		if(this.id != undefined){newContainer.setAttribute('id', this.id)}
		
		// Add classes to main container
		if(this.classList.length > 0){
			for (let i=0; i < this.classList.length; i++){
				newContainer.classList.add(this.classList[i])
			}
		}
		
		// Add attributes to main container
		if(this.attributes.length > 0){
			for (let j = 0; j < this.attributes.length; j++) {
				newContainer.setAttribute(this.attributes[j], true);
			}
		}
		
		// Add elements to main container
		if(this.elements.length > 0){
			for (let k = 0; k < this.elements.length; k++){
				newContainer.appendChild(this.elements[k]);
			}
		}
		
		return newContainer;
	}
	
}

window.customElements.define('empac-container', Container);