var urlBase = 'http://www.thebest-group28.xyz/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function search_contacts()
{
	// Capture the text from the search bars to use for querying
	var first_name = document.getElementById("first_name_searchbar").value;
	var last_name = document.getElementById("last_name_searchbar").value;
    
	// FOR TESTING ONLY (NOT SECURE): Display the search bar entries in the console for debugging 
	console.log("UID: " + userId + " / First: " + first_name + " / Last: " + last_name);

	// Prepare variables for the API
	var jsonPayload = '{"userId" : "' + userId + '", "first_name" : "' + first_name + '", "last_name" : "' + last_name + '"}';
	var url = urlBase + '/SearchContacts.' + extension;

	// Attempt a connection to the API
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			// If we successfully connect, retrieve the information from the APIs query
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText ); // This JSON object is the response from the API
				
				var num_items = jsonObject.results.length;

				console.log("That query resulted in "+num_items+" pieces of information for that contact.");
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}
