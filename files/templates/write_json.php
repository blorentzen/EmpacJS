<?php

	$json = $_POST["json"];
	$file_name = $_POST["file"];

	/* Check for null */
	if(json_decode($json) != null){
		$open_file = fopen("components/$file_name", "w");
		fwrite($open_file, $json);
		fclose($open_file);
	} else {
	?>
	<script>console.log('Fail')</script>
	<?php
	}

?>