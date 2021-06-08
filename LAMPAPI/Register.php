<?php

	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

	$inData = json_decode(file_get_contents('php://input'), true);

	$conn = new mysqli("localhost", "small", "password", "smallproject");
	
	if ($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
	else
	{
		// get number of entries with current user
		$first = $conn->prepare("SELECT * FROM Users WHERE Username = ?");
		$first->bind_param("s", $inData["user"]);
		$first->execute();
		$first->store_result();

		// if user Exists, return and stop
		if ($first->num_rows != 0)
		{
				returnWithError("User Already Exists");
				return;
		}
		$first->close();
				
		// otherwise continue and add to table
		$stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Username, Password) VALUES (?, ?, ?, ?)");
		$stmt->bind_param("ssss", $inData["first"], $inData["last"], $inData["user"], $inData["pass"]);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError($err)
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}
	
?>