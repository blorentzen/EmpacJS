// EmpacJS Application by blorentz

window.onload = function() {
	
	// Set up basic container
	const testContainer = new Container();
	testContainer.setID('helloWorld');
	testContainer.addClass('helloWorld');
	
	// Set up basic button
	const testButton = new Button();
	testButton.setText('Test Button');
	
	// Add a simple headline element
	testContainer.addElement(createHeadline('h1', 'Hello World, EmpacJS is on the way.'));
	testContainer.addElement(createParagraph('This is an experiment space at the moment. More will come eventually.'));
	testContainer.addElement(testButton.returnMarkup());
	
	// Append to body
	document.body.append(testContainer.returnMarkup());
}