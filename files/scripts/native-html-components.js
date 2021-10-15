// Native HTML Components Library by blorentz

function createHeadline(theType, theText){
	// Check headline type
	if(theType == 'h1' || theType == 'h2' || theType == 'h3' || theType == 'h4' || theType == 'h5' || theType == 'h6'){
		let myHeadline = document.createElement(theType);
		
		// Check for null text
		if(theText != null){
			let myContent = document.createTextNode(theText);
			myHeadline.appendChild(myContent);
		}
		return myHeadline;
	} else {
		console.log('Not a proper headline type being passed.');
	}
}

function createParagraph(theText){
	let myPara = document.createElement('p');
	
	// Check for null text
	if(theText != null){
		let myContent = document.createTextNode(theText);
		myPara.appendChild(myContent);
		return myPara;
	} else {
		console.log('Text is missing in function arguments.');
	}
}