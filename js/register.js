// insert init's here
var userN, passO, passT;
let url = "http:/www.thebest-group28.xyz/LAMPAPI/test.php"


function addUser()
{
	var obj = {user: userN, pass: passO};
	var jsonPayload = JSON.stringify(obj);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.responseType = 'json';

	xhr.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			var jsonObject = JSON.parse( xhr.responseText );
			document.getElementById("outp").innerHTML = "finished";	
		}
	};
	
	xhr.send(jsonPayload);

}

function checkValid()
{

	userN = document.getElementById("user").value;
	passO = document.getElementById("pass").value;
	passT = document.getElementById("repass").value;

	

	if (passO != passT)
	{
		document.getElementById("outp").innerHTML = "Warning: passwords don't match!";
		return;
	}

	document.getElementById("outp").innerHTML = "";
	addUser();

	// add user to DB


	// login to user with given credentials

	//else addUser()
	// sign into account?
	// or href into signin page

}
