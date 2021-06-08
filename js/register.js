// insert init's here
var firstN, lastN, userN, passO, passT;
var urlBase = "LAMPAPI";
var extension = 'php';

function addUser()
{
	// Capture the text from the search bars to use for querying
	var first = document.getElementById("first").value;
	var last = document.getElementById("last").value;
	var user = document.getElementById("user").value;
	var pass = document.getElementById("pass").value;
	var hash = md5(pass);
	

	// Prepare variables for the API
	var jsonPayload = '{"first" : "' + first + '", "last" : "' + last + '", "user" : "' + user + '", "pass" : "' + hash +'"}';
	console.log("jsonPayLoad: " + jsonPayload);
	var url = urlBase + '/Register.' + extension;
	
	console.log("url is: " + url);

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
			
				if(jsonObject.error.length < 1)
				{
					alert("User registered. redirecting to login...");
					window.location.href = "index.html";
				}
				else
				{
					// list server error detailing reasoning for glitch
					document.getElementById("loginResult").innerHTML = jsonObject.error;
				}
			}
		};

		// send data
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
		console.log("We could not add that user at this time");
	}
}

function checkValid()
{

	userN = document.getElementById("user").value;
	passO = document.getElementById("pass").value;
	var hashO = md5(passO);
	passT = document.getElementById("repass").value;
	var hashT = md5(passT);

	if (userN.length * passO.length * passT.length <= 0)
	{
		document.getElementById("outp").innerHTML = "Warning: Please insert value for required fields";
	}

	if (hashO != hashT)
	{
		document.getElementById("outp").innerHTML = "Warning: passwords don't match!";
		return;
	}

	document.getElementById("outp").innerHTML = "";
	addUser();

}
