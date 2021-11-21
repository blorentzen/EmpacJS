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

async function saveData(){
	
	// Set up basic hero
	const testModule = new Container();
	testModule.addElement(createHeadline('h1', 'Testing Headline'));
	testModule.addElement(createParagraph('Testing Paragraph Copy'));
	
	console.log(testModule.elements);
	// Testing write to the server
	let myPromise = new Promise(function(resolve){
		try{
			$.post( "../files/templates/write_json.php", { 
				json: JSON.stringify(testModule), 
				file: 'test.json',
				}
			);
			resolve(console.log('Submission Success.'));
		} catch(e) {
			resolve(console.log('Submission Failed.'));
		}
	})
}

async function getData(){
	let myPromise = new Promise(function(resolve){
		let newRequest = new XMLHttpRequest();
		newRequest.open('GET', '../files/templates/components/test.json', true);
		newRequest.setRequestHeader('Content-Type', 'application/json');
		newRequest.responseType = 'json';
		newRequest.send();
		
		// Handle the onload event
		newRequest.onload = function(){ console.log(newRequest.response); }
	})
}