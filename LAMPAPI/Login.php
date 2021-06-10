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
		$stmt = $conn->prepare("SELECT UserID, FirstName, LastName, Password FROM Users WHERE Username = ?");
		$stmt->bind_param("s", $inData["login"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if ($row = $result->fetch_assoc())
		{
			if ($row["Password"] == $inData["password"])
			{
				$id = $row['UserID'];
				$stmt->close();
				$stmt = $conn->prepare("UPDATE Users SET DateLastLoggedIn = now() WHERE UserID = '$id'");
				$stmt->execute();
				$stmt->close();
				returnWithInfo($row['FirstName'], $row['LastName'], $row['UserID']);
			}
			else
			{
				returnWithError("Password Invalid" . "ROW: " . $row["Password"] . "*********" . "inData: " . $inData["password"]);
			}
		}
		else
		{
			returnWithError("Invalid Username");
		}

		$stmt->close();
		$conn->close();
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithInfo($firstName, $lastName, $id)
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson($retValue);
	}

	function returnWithError($err)
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}

?>
