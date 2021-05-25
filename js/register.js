// insert init's here


function userExists(user)
{
	// create request with only user
	var obj = {login: user};
	var jsonPayload = JSON.stringify(obj);

	var xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	let url = "LAMPAPI/test.php";

	// start connection
	xhr.open("POST", url, true);

	// state change indicating recieved request
	xhr.onreadystatechange = function()
	{
		// succesfully sent
		if (this.readyState == 4 && this.status == 200)
		{
			var jsonObject = JSON.parse( xhr.responseText );

			var lName = jsonObject.login;
			document.getElementById("outp").innerHTML() = lName;
		}
		else
		{
			// error out: error code try again	
			return 1;
		}
	};

	// actually send JSON
	xhr.send(jsonPayload);

	return 0;
}

function checkValid()
{
	var userN, passO, passT;

	userN = document.getElementById("user").value;
	passO = document.getElementById("pass").value;
	passT = document.getElementById("repass").value;

	

	if (passO != passT)
	{
		document.getElementById("outp").innerHTML() = "Warning: passowrds don't match!";
		return;
	}

	
	if (userExists(userN) != 0)
		return;

	//else addUser()
	// sign into account?
	// or href into signin page

}