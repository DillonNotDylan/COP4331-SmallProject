// insert init's here
var firstN, lastN, userN, passO, passT;
var urlBase = "http:/www.thebest-group28.xyz/LAMPAPI/test.php"


function addUser()
{
	// Capture the text from the search bars to use for querying
	var first = document.getElementById("first").value;
	var last = document.getElementById("last").value;
	var user = document.getElementById("user").value;
	var pass = document.getElementById("pass").value;
	var hash = md5(pass);
	var repass = document.getElementById("repass").value;
	var rehash = md5(repass);

	// Prepare variables for the API
	var jsonPayload = '{"first" : "' + first + '", "last" : "' + last + '", "user" : "' + user + '", "pass" : "' + pass +'"}';
	console.log("jsonPayLoad: " + jsonPayload);
	var url = urlBase + '/Register.' + extension;

	// Attempt a connection to the API
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText ); // Response from the API
			
				if(jsonObject.error[0] == "")
				{
					alert("User registered");
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function checkValid()
{

	userN = document.getElementById("user").value;
	passO = document.getElementById("pass").value;
	var hashO = md5(passO);
	passT = document.getElementById("repass").value;
	var hashT = md5(passT);

	if (hashO != hashT)
	{
		document.getElementById("outp").innerHTML = "Warning: passwords don't match!";
		return;
	}

	document.getElementById("outp").innerHTML = "";
	addUser();
}
