/** EmpacJS Application
* @author Britton Lorentzen <BrittonLorentzen@gmail.com>
*/

window.onload = function() {
	
	// Set up basic hero
	const testModule = new Hero();
	
	// Set up testing multicolumn
	const testMulti = new MultiColumn(3);
	
	// Append to body
	document.body.append(testModule.returnMarkup());
	document.body.append(testMulti.returnMarkup());

}