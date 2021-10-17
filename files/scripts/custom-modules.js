/** 
* Custom Modules Library
* @author Britton Lorentzen <brittonlorentzen@gmail.com
*/


/** Class for generating a primary hero module 
* @author Britton Lorentzen <brittonlorentzen@gmail.com
*/
class Hero extends Container {
	constructor(){
		super();
		this.type = 'Hero';
		this.id = 'heroTest';
		// Set up basic container
		const mainContainer = new Container();
		mainContainer.setID('helloWorld');
		mainContainer.addClass('helloWorld');

		// Set up link to documentation
		const mainLink = new Link('https://github.com/blorentz38/EmpacJS', 'Check out documentation');

		// Add a simple headline element
		mainContainer.addElement(createHeadline('h1', 'Hello World, EmpacJS is on the way.'));
		mainContainer.addElement(createParagraph('This is an experiment space at the moment. More will come eventually.'));
		mainContainer.addElement(mainLink.returnMarkup());
		
		this.addElement(mainContainer.returnMarkup());
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