var urlBase = 'http://www.thebest-group28.xyz/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";
var jsonObject;

function search_contacts()
{
	// Capture the text from the search bars to use for querying
	var first_name = document.getElementById("first_name_searchbar").value;
	var last_name = document.getElementById("last_name_searchbar").value;

	// Refresh the page so we don't see multiple of the same search
	// location.reload();
    
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
				var index_helper = 0;
								
				for(var i = 0; i < (jsonObject.results.length / 5); i++)
				{
					display_contacts(jsonObject.results[i+1+index_helper], jsonObject.results[i+2+index_helper], jsonObject.results[i+3+index_helper], jsonObject.results[i+4+index_helper]);
					index_helper = index_helper + 4;
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

function display_contacts(f_name, l_name, phone_number, email, address)
{
	// Create a new contact card
	var contact_set = document.getElementById('contact_set');
	var contact_container = document.createElement('div');
	contact_container.className = 'contact_container';
	contact_set.appendChild(contact_container);

	// Create the elements of a contact card
	var contact_name = document.createElement('h2');
	contact_name.className = 'contact_name';
	var edit_button = document.createElement('button');
	edit_button.setAttribute('id', 'edit_contact_button');
	edit_button.onclick = function()
	{
		document.getElementById("myNav2").style.width = "100%";

		var first_name_field = document.getElementById("edit_first_name");
		first_name_field.setAttribute('placeholder', f_name);
	
		var first_name_field = document.getElementById("edit_last_name");
		first_name_field.setAttribute('placeholder', l_name);
	
		var first_name_field = document.getElementById("edit_phone_number");
		first_name_field.setAttribute('placeholder', phone_number);
	
		var first_name_field = document.getElementById("edit_email");
		first_name_field.setAttribute('placeholder', email);

		return;
	}
	edit_button.innerHTML = 'edit';
	contact_name.appendChild(edit_button);
	var contact_image = document.createElement('image');
	var contact_element_1 = document.createElement('div');
	contact_element_1.className = 'contact_element';
	var contact_element_2 = document.createElement('div');
	contact_element_2.className = 'contact_element';
	var contact_element_3 = document.createElement('div');
	contact_element_3.className = 'contact_element';
	var contact_phone_number = document.createElement('h3');
	contact_phone_number.className = 'contact_phone_number';
	var contact_email = document.createElement('h3');
	contact_email.className = 'contact_email';
	var contact_address = document.createElement('h3');
	contact_address.className = 'contact_address';

	// Add text to the elements of the contact card
	var contact_name_text = document.createTextNode(f_name + " " + l_name);
	contact_name.appendChild(contact_name_text);
	var contact_phone_number_text = document.createTextNode(phone_number);
	contact_phone_number.appendChild(contact_phone_number_text);
	var contact_email_text = document.createTextNode(email);
	contact_email.appendChild(contact_email_text);
	var contact_address_text = document.createTextNode("789 leaf village");
	contact_address.appendChild(contact_address_text);
	

	// Add the elements to the contact card
	contact_element_1.appendChild(contact_phone_number);
	contact_element_2.appendChild(contact_email);
	contact_element_3.appendChild(contact_address);
	contact_container.appendChild(contact_name);
	contact_container.appendChild(contact_image);
	contact_container.appendChild(contact_element_1);
	contact_container.appendChild(contact_element_2);
	contact_container.appendChild(contact_element_3);
}

function add_contact()
{
	// Capture the text from the search bars to use for querying
	var add_first_name = document.getElementById("add_first_name").value;
	var add_last_name = document.getElementById("add_last_name").value;
	var add_phone_number = document.getElementById("add_phone_number").value;
	var add_email = document.getElementById("add_email").value;

	// Prepare variables for the API
	var jsonPayload = '{"userId" : "' + userId + '", "first_name" : "' + add_first_name + '", "last_name" : "' + add_last_name + '", "phone_number" : "' + add_phone_number + '", "email" : "' + add_email +'"}';
	console.log("jsonPayLoad: " + jsonPayload);
	var url = urlBase + '/AddContact.' + extension;

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
			
				if(jsonObject.error[0] == "")
				{
					alert("Contact Added");
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
	closeNav()
}

function edit_contact()
{
	close_edit_page()
	
	var index = document.getElementById('contact_index').innerHTML;
	console.log("index is: " + index);

	for(var i = 0; i < (jsonObject.results.length / 5); i++)
	{
		if(jsonObject.results[i] == index)
		{
			break;
		}
	}

	var userId = jsonObject.results[i];
	var first_name = jsonObject.results[i+1];
	var last_name = jsonObject.results[i]+2;
	var phone_number = jsonObject.results[i+3];
	var address = jsonObject.results[i+4];

	// Prepare variables for the API
	var jsonPayload = '{"userId" : "' + userId + '", "first_name" : "' + first_name + '", "last_name" : "' + last_name + '", "phone_number" : "' + phone_number + '", "address" : "' + address + '"}';
	var url = urlBase + '/EditContact.' + extension;

	console.log(jsonPayload)

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
				
				if(jsonObject.error == "")
				{
					alert("Your contact was edited, please refresh the page");
				}
				else
				{
					alert("Something went wrong, please try to edit that contact again");
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		// document.getElementById("editResult").innerHTML = err.message;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
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

function openNav() 
{
	document.getElementById("myNav").style.width = "100%";
}	

function closeNav() 
{
	  document.getElementById("myNav").style.width = "0%";
}

function open_edit_page()
{
	document.getElementById("myNav2").style.width = "100%";

	var first_name_field = document.getElementById("edit_first_name");
	first_name_field.setAttribute('placeholder', 'First Name ...');

	var first_name_field = document.getElementById("edit_last_name");
	first_name_field.setAttribute('placeholder', 'Last Name ...');

	var first_name_field = document.getElementById("edit_phone_number");
	first_name_field.setAttribute('placeholder', 'Phone Number ...');

	var first_name_field = document.getElementById("edit_email");
	first_name_field.setAttribute('placeholder', 'Email ...');
}

function close_edit_page()
{
	document.getElementById("myNav2").style.width = "0%";
}
