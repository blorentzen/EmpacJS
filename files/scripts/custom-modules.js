// Custom Modules Library by blorentz

/* Class for generating a primary container */
class Hero extends Container {
	constructor(){
		super();
		this.type = 'Hero';
		this.id = 'heroTest';
		// Set up basic container
		const mainContainer = new Container();
		mainContainer.setID('helloWorld');
		mainContainer.addClass('helloWorld');

		// Set up basic button
		const mainButton = new Button('Test Button');
		const mainLink = new Link('#', 'Test Link');

		// Add a simple headline element
		mainContainer.addElement(createHeadline('h1', 'Hello World, EmpacJS is on the way.'));
		mainContainer.addElement(createParagraph('This is an experiment space at the moment. More will come eventually.'));
		mainContainer.addElement(mainButton.returnMarkup());
		mainContainer.addElement(mainLink.returnMarkup());
		
		this.addElement(mainContainer.returnMarkup());
	}
}

window.customElements.define('empac-hero', Hero);