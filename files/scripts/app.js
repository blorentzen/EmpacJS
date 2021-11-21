/** EmpacJS Application
* @author Britton Lorentzen <BrittonLorentzen@gmail.com>
*/

window.onload = function() {
	var testData;
	
	// Set up testing multicolumn
	const testMulti = new MultiColumn(3);
	
	// Append to body
	// document.body.append(testModule.returnMarkup());
	document.body.append(testMulti.returnMarkup());

}

/** Function that saves data to the server */
async function saveData(){
	
	// Set up basic hero
	const testModule = new Container();
	
	let testHeadline = new Headline('h1');
	testHeadline.setContent('Testing Headline');
	
	let testPara = new Paragraph();
	testPara.setContent('Testing Paragraph Copy');
	
	testModule.addElement(testHeadline);
	testModule.addElement(testPara);
	
	console.log(testModule.elements);
	// Testing write to the server
	let myPromise = new Promise(function(resolve){
		try{
			$.post( "../files/templates/write_json.php", { 
				json: testModule.returnJSON(), 
				file: 'test.json',
				}
			);
			resolve(console.log('Submission Success.'));
		} catch(e) {
			resolve(console.log('Submission Failed.'));
		}
	})
}

/** Function that gets data from the server */
async function getData(){
	let myPromise = new Promise(function(resolve){
		let newRequest = new XMLHttpRequest();
		newRequest.open('GET', '../files/templates/components/test.json', true);
		newRequest.setRequestHeader('Content-Type', 'application/json');
		newRequest.responseType = 'json';
		newRequest.send();
		
		// Handle the onload event
		newRequest.onload = function(){ testData = newRequest.response; console.log(newRequest.response); }
	})
}