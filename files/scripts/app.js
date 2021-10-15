// EmpacJS Application by blorentz

window.onload = function() {
	
	// Set up basic container
	const testContainer = new Container();
	testContainer.setID('helloWorld');
	testContainer.addClass('helloWorld');
	
	// Add a simple headline element
	testContainer.addElement(createHeadline('h1', 'Hello World, EmpacJS is on the way.'));
	
	// Append to body
	document.body.append(testContainer.returnMarkup());
}