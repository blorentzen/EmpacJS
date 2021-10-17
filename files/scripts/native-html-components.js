/** Native HTML Components Library
* @author Britton Lorentzen <BrittonLorentzen@gmail.com>
*/

/** Function for creating a standard headline
* @author Britton Lorentzen <BrittonLorentzen@gmail.com>
*/
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

/** Function for creating a standard paragraph 
* @author Britton Lorentzen <BrittonLorentzen@gmail.com>
*/
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