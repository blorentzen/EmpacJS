/** Import components
import { Container } from '/files/js/components/standard/components.js';
**/

/** Import Methods **/
import { getData } from '/files/scripts/app.js';
import { handleData } from '/files/scripts/app.js';

/** Class for generating an Empac Loader
* @author Britton Lorentzen <brittonlorentzen@gmail.com
*/
export class EmpacLoader extends HTMLElement {
	constructor(){
		super();
	}
	connectedCallback() {
	
		// Set up primary container
		let container = document.createElement('div');
		container.classList.add('primary-loader');
		container.appendChild(document.createElement('span'));
		
		let img = document.createElement('img');
		img.setAttribute('alt', 'empac');
		img.setAttribute('size', 'small');
		img.src = '/files/images/icons/company/black/empac-emblem.svg';
		
		container.appendChild(img);
		
		this.appendChild(container);
		
	}
}

/** Class for generating a primary content module 
* @author Britton Lorentzen <brittonlorentzen@gmail.com
*/
export class EmpacModule extends HTMLElement {
	constructor(){
		super();
	}
	connectedCallback() {
		// Set component based on data
		let newData;
		
		if(this.getAttribute('data') != undefined){
			let dataString = this.getAttribute('data');
			let dataType = this.getAttribute('data-type');
			getData(dataString, dataType).then(function(value){ 
				newData = value;
			}).finally(() => { this.append(handleData(newData)); });
		}
	}
}

/** Class for generating a primary content module 
* @author Britton Lorentzen <brittonlorentzen@gmail.com
*/
export class EmpacContent extends HTMLElement {
	constructor(){
		super();
	}
	connectedCallback() {
		// Set component based on data
		let newData;
		
		if(this.getAttribute('data') != undefined){
			let dataString = this.getAttribute('data');
			let dataType = this.getAttribute('data-type');
			let subType = this.getAttribute('data-subtype');
			getData(dataString, dataType).then(function(value){ 
				newData = value;
			}).finally(() => { this.append(handleData(newData[subType])); });
		}
	}
}