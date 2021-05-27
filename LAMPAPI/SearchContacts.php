<?php

    $inData = getRequestInfo();

    $searchResults = "";

    $searchCount = 0;

    $conn = new mysql("local", "small", "password", "smallproject");

    if($conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }
    else
    {
        $stmt = $conn->prepare("SELECT * FROM Users WHERE FirstName = ? AND LastName = ?");
		$stmt->bind_param("ss", $inData["first_name"], $inData["last_name"]); // The JSON params sent from Javascript
		$stmt->execute();
		$result = $stmt->get_result();

        if($searchCount == 0)
        {
            returnWithError("There are no contacts in your list that go by that name.");
        }
        else
        {
            returnWithInfo($searchResults);
        }

        $stmt->close();
        $conn->close();
    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');

        echo $obj;
    }

    function returnWithError($err)
    {
        $retValue = '{"id":0, "firstName":"", "lastName":"", "error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($searchResults)
    {
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson($retValue);
    }

?>
