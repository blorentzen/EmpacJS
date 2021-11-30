/** 
* Custom Modules Library
* @author Britton Lorentzen <brittonlorentzen@gmail.com
*/


/** Class for generating a primary hero module 
* @author Britton Lorentzen <brittonlorentzen@gmail.com
*/
class Hero extends HTMLElement {
	constructor(){
		super();
	}
	connectedCallback() {
		// Set up primary settings
		this.type = 'Hero';
		let mainContainer = new Container();
		mainContainer.addClass('helloWorld');
		
		// Set component based on data
		if(this.getAttribute('data') != undefined){
			mainContainer.addAttribute('contenteditable');
			let dataString = this.getAttribute('data');
			getData(dataString, mainContainer, this).then(function(value){ 
				console.log('Success'); 
				
				// Set focus states
				let newContainer = document.getElementById(value);
				let newHL = newContainer.getElementsByTagName('h1');
				let newP = newContainer.getElementsByTagName('p');
				
				newContainer.addEventListener('focus', function(){ this.classList.add('hasFocus'); });
				newContainer.addEventListener('blur', function(){ this.classList.remove('hasFocus'); });
				
			});
		}
		else {
			this.id = 'heroTest';
			// Set up basic container
			mainContainer.addID();

			// Set up link to documentation
			const mainLink = new Link('https://github.com/blorentz38/EmpacJS', 'Check out documentation');

			// Set up data writing link
			const secondLink = new Link('#', 'Test File Writer');
			let writeLink = secondLink.returnMarkup();
			writeLink.addEventListener('click', function(e){ e.preventDefault(); saveData(); });

			// Set up data reading link
			const thirdLink = new Link('#', 'Test File Reader');
			let readLink = thirdLink.returnMarkup();
			readLink.addEventListener('click', function(e){ e.preventDefault(); getData('test.json'); });

			// Create new headline
			let myHeadline = new Headline('h1');
			myHeadline.setContent('Hello World, EmpacJS is on the way.');

			// Create new headline
			let myParagraph = new Paragraph();
			myParagraph.setContent('This is an experiment space at the moment. More will come eventually.');

			// Add a simple headline element
			mainContainer.addElement(myHeadline.returnMarkup());
			mainContainer.addElement(myParagraph.returnMarkup());
			mainContainer.addElement(mainLink.returnMarkup());
			mainContainer.addElement(writeLink);
			mainContainer.addElement(readLink);

			this.append(mainContainer.returnMarkup());
		}
	}
}

/** Class for generating a multi-column module 
* @author Britton Lorentzen <brittonlorentzen@gmail.com
*/
class MultiColumn extends Container {
	constructor(colNumber){
		super();
		this.type = 'MultiColumn';
		this.id = 'mcTest';
		// Set up containers based on amount of columns needed
		for(let i = 0; i < colNumber; i++){
			let myIndex = i + 1;
			let newContainer = new Container();
			newContainer.setID(this.id + '-column-' + myIndex);
			newContainer.addElement(createHeadline('h2', 'Column ' + myIndex ));
			this.addElement(newContainer.returnMarkup());
		}
	}
}

window.customElements.define('empac-hero', Hero);
window.customElements.define('empac-multicolumn', MultiColumn);