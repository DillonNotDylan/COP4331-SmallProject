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

		$firstName = $inData["first_name"];
		$lastName = $inData["last_name"];
		$phoneNumber = $inData["phone_number"];
		$email = $inData["email"];
		$contactId = $inData["contactId"];

		$stmt = $conn->prepare("UPDATE ContactList SET FirstName='$firstName', LastName='$lastName', PhoneNumber='$phoneNumber', Email='$email' WHERE ContactID='$contactId'");
		// $stmt->bind_param("sssss", $inData["first_name"], $inData["last_name"], $inData["phone_number"], $inData["email"], $inData["contactId"]);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("debug check");
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
