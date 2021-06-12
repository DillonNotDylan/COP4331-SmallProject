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
		$stmt = $conn->prepare("SELECT * FROM ContactList WHERE UserID = ? AND (FirstName LIKE ? OR LastName LIKE ? OR PhoneNumber LIKE ? OR Email LIKE ?) LIMIT ? OFFSET ?");
		$query = "%" . $inData["search"] . "%";
		$stmt->bind_param("sssssss", $inData["userId"], $query, $query, $query, $query, $inData["limit"], $inData["offset"]);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if($searchCount > 0)
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '"' . $row["ContactID"] . '", "' . $row["FirstName"] . '", "' . $row["LastName"] . '", "' . $row["PhoneNumber"] . '", "' . $row["Email"] . '"';
		}
		
		if($searchCount == 0)
		{
			returnWithError("No Records Found");
		}
		else
		{
			returnWithInfo($searchResults);
		}
		
		$stmt->close();
		$conn->close();
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError($err)
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}
	
	function returnWithInfo($searchResults)
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson($retValue);
	}

?>
