<?php
	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	$query = $conn->prepare('SELECT `d`.`id` AS `departmentID`, `d`.`name` AS `departmentName`, `l`.`id` AS `locationID`, `l`.`name` AS `locationName` FROM `department` `d` LEFT JOIN `location` `l` ON (`l`.`id` = `d`.`locationID`) WHERE `d`.`name` LIKE ? OR `l`.`name` LIKE ? ORDER BY `d`.`name`, `l`.`name`');

	$likeText = "%" . $_POST['txt'] . "%";

	$query->bind_param("ss", $likeText, $likeText);

	$query->execute();
	
	if (false === $query) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
    
	$result = $query->get_result();

	$found = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($found, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['found'] = $found;
	
	mysqli_close($conn);

	echo json_encode($output); 

?>