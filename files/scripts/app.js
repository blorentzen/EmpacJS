/** EmpacJS Application
* @author Britton Lorentzen <BrittonLorentzen@gmail.com>
*/

window.onload = function() {
	
	// Set up basic hero
	// const testModule = new Hero();
	
	/* Testing write to the server
	$.post( "../files/templates/write_json.php", { 
		json: JSON.stringify(testModule), 
		file: 'test.json'
		}
	);
	*/
	
	// Set up testing multicolumn
	const testMulti = new MultiColumn(3);
	
	// Append to body
	// document.body.append(testModule.returnMarkup());
	document.body.append(testMulti.returnMarkup());

}