// insert init's here
var userN, passO, passT;


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

function addUser()
{
	var obj = {user: userN, pass: passW};
	var jsonPayload = JSON.stringify(obj);

	var xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	let url = 'http://www.thebest-group28.xyz/LAMPAPI';

	xhr.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			var jsonObject = JSON.parse( xhr.responseText );
			userId = jsonObject.id;
			if( userId < 1 )
			{		
				document.getElementById("outp").innerHTML = "User already exists";
				return;
			}
		
			firstName = jsonObject.firstName;
			lastName = jsonObject.lastName;

			saveCookie();
			window.location.href = "contactsPage.html";
				
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

	// add user to DB


	// login to user with given credentials

	//else addUser()
	// sign into account?
	// or href into signin page

}
