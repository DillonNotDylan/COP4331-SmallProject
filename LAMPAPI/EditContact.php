<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

	// parse input JSON and connect to database
	$inData = json_decode(file_get_contents('php://input'), true);
	$conn = new mysqli("localhost", "small", "password", "smallproject"); 

	$id = $indata['contactId'];
	$fName = $inData['first_name'];
	$lName = $inData['last_name'];
	$pNumber = $inData['phone_number'];
	$addy = $inData['address'];
	$email = $inData['email'];

	// check that we are properly connected
	if ($conn->connect_error) 
		returnWithError($conn->connect_error);

	$argum = "UPDATE ContactList SET FirstName = '$fName', LastName = '$lName', PhoneNumber = '$pNumber', Email = '$email' WHERE ContactID = '$id'";

	if ($conn->query($argum) === TRUE)
		returnWithInfo($fName, $lName, $id);
	else
		returnWithError("Error: couldn't update");
	
	
	

	function returnWithInfo($firstName, $lastName, $id)
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson($retValue);
	}

	function returnWithError($err)
	{
		$retValue = '{"error:"' . $err . '}';
		sendResultInfoAsJson($retValue);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}
?>