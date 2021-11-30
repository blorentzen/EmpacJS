/** EmpacJS Application
* @author Britton Lorentzen <BrittonLorentzen@gmail.com>
*/

window.onload = function() {
	
	// Set up testing multicolumn
	const testMulti = new MultiColumn(3);
	
	// Append to body
	// document.body.append(testModule.returnMarkup());
	document.body.append(testMulti.returnMarkup());

}

/** Function that saves data to the server */
async function saveData(){
	
	// Grab current component variables
	let myEditedComp = document.getElementById('testModule');
	
	// Set up basic hero
	const testModule = new Container();
	testModule.setID('testModule');
	
	let testHeadline = new Headline('h1');
	testHeadline.setContent(myEditedComp.getElementsByTagName('h1')[0].innerHTML);
	
	let testPara = new Paragraph();
	testPara.setContent(myEditedComp.getElementsByTagName('p')[0].innerHTML);
	
	testModule.addElement(testHeadline);
	testModule.addElement(testPara);
	
	// Testing write to the server
	let myPromise = new Promise(function(resolve){
		try{
			$.post( "../files/templates/write_json.php", { 
				json: testModule.returnJSON(), 
				file: 'test.json',
				}
			);
			resolve(window.alert('The file has been rewritten. Refresh the page to see new content.'));
		} catch(e) {
			resolve(console.log('Submission Failed.'));
		}
	})
}

/** Function that gets data from the server */
async function getData(theData, theComponent, theObject){
	return new Promise(function(resolve){
		let newRequest = new XMLHttpRequest();
		newRequest.open('GET', '../files/templates/components/' + theData, true);
		newRequest.setRequestHeader('Content-Type', 'application/json');
		newRequest.responseType = 'json';

		// Handle the onload event
		newRequest.onload = function(){ 
			let tempData = newRequest.response;
			// Attach ID to new component instance
			if(tempData.id != undefined){ theComponent.setID(tempData.id); } else { theComponent.addID(); };
			for(let e = 0; e < tempData.elements.length; e++){
				let newElement = handleData(tempData.elements[e]);
				theComponent.addElement(newElement);
			};
			theObject.append(theComponent.returnMarkup());
			resolve( tempData.id );
		}

		// Send Request
		newRequest.send();
	});
}

/** Function that handles data driven components */
function handleData(theData){
	let newChild;
	if(theData.type == 'Headline'){
		newChild = new Headline(theData.tag);
		newChild.setContent(theData.content);
	} else if (theData.type == 'Paragraph'){
		newChild = new Paragraph();
		newChild.setContent(theData.content);
	}
	return newChild.returnMarkup();
}