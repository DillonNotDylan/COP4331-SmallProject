var urlBase = 'http://www.thebest-group28.xyz/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";
var jsonObject;
var searchObject;
var offset = 0;
var limit = 6;

var edit_first = "";
var edit_last = "";
var edit_phone = "";
var edit_email = "";
var edit_id = "";

function search_contacts()
{
	// Capture the text from the search bars to use for querying
	document.getElementById('contact_set').innerHTML = "";
	
	var search = document.getElementById("first_name_searchbar").value;
	
	offset = 0;

	// Refresh the page so we don't see multiple of the same search
	// location.reload();
    
	// FOR TESTING ONLY (NOT SECURE): Display the search bar entries in the console for debugging 
	console.log("NEW SEARCH INITIATED...");
	console.log("UID: " + userId + " | Search: " + search + " | Limit: " + limit + " | Offset: " + offset );

	// Prepare variables for the API
	var jsonPayloadPre = {
		"userId": userId,
		"search": search,
		"limit": limit,
		"offset": offset
	};

	var jsonPayload = JSON.stringify(jsonPayloadPre);
	
	//'{"userId" : "' + userId + '", "search" : "' + search + '"}';
	var url = urlBase + '/SearchContacts.' + extension;
	// Attempt a connection to the API
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
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
				
				searchObject = jsonObject;
				
				console.log("UPDATING OFFSET...");
				console.log("UID: " + userId + " | Search: " + search + " | Limit: " + limit + " | Offset: " + offset );

				console.log(jsonObject.results);

				if (jsonObject.results == undefined) 
				{
					document.getElementById("load").style.display = "none";
					return;
				}
				
				getAll();
				
				// if ((jsonObject.results.length / 5) < 6)
				// {
				// 	document.getElementById("load").style.display = "none";
				// }
				// else
				// {
				// 	document.getElementById("load").style.display = "";
				// }

				for(var i = 0; i < (jsonObject.results.length / 5); i++)
				{
					var id = jsonObject.results[i+0+index_helper];
					if (document.getElementById("contact"+id) != undefined)
						continue;
					display_contacts(jsonObject.results[i+1+index_helper], jsonObject.results[i+2+index_helper], jsonObject.results[i+3+index_helper], jsonObject.results[i+4+index_helper], jsonObject.results[i+0+index_helper], i);
					index_helper = index_helper + 4;
				}

				if ((jsonObject.results.length / 5) < limit)
				{
					document.getElementById("load").style.display = "none";
				}
				else
				{
					document.getElementById("load").style.display = "block";
					document.getElementById("load").style.margin = "20px auto";
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


function load_more()
{
	offset += limit;
	load_contacts(offset, limit);
	
	if (searchObject == null)
	{
		document.getElementById("load").style.display = "none";
	}
}

function load_contacts(offset , limit)
{
	// Capture the text from the search bars to use for querying
	var search = document.getElementById("first_name_searchbar").value;
	
	// Refresh the page so we don't see multiple of the same search
	// location.reload();
    
	// FOR TESTING ONLY (NOT SECURE): Display the search bar entries in the console for debugging 
	console.log("LOADING MORE CONTACTS...");
	console.log("UID: " + userId + " | Search: " + search + " | Limit: " + limit + " | Offset: " + offset );

	// Prepare variables for the API
	var jsonPayloadPre = {
		"userId": userId,
		"search": search,
		"limit": limit,
		"offset": offset
	};

	var jsonPayload = JSON.stringify(jsonPayloadPre);
	
	//'{"userId" : "' + userId + '", "search" : "' + search + '"}';
	var url = urlBase + '/SearchContacts.' + extension;
	// Attempt a connection to the API
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
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
				
				searchObject = jsonObject;
				// offset += limit;
				console.log("CONTACTS SUCCESSFULLY LOADED...");
				console.log("UID: " + userId + " | Search: " + search + " | Limit: " + limit + " | Offset: " + offset );

				console.log(jsonObject.results);

				if (jsonObject.results == undefined) 
				{
					document.getElementById("load").style.display = "none";
					return;
				}

				// if ((jsonObject.results.length / 5) < 6)
				// {
				// 	document.getElementById("load").style.display = "none";
				// }
				// else
				// {
				// 	document.getElementById("load").style.display = "";
				// }
					
				for(var i = 0; i < (jsonObject.results.length / 5); i++)
				{
					display_contacts(jsonObject.results[i+1+index_helper], jsonObject.results[i+2+index_helper], jsonObject.results[i+3+index_helper], jsonObject.results[i+4+index_helper], jsonObject.results[i+0+index_helper], i);
					index_helper = index_helper + 4;
				}

				if ((jsonObject.results.length / 5) < limit)
				{
					document.getElementById("load").style.display = "none";
				}
				else
				{
					document.getElementById("load").style.display = "block";
					document.getElementById("load").style.margin = "20px auto";
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

function display_contacts(f_name, l_name, phone_number, email, id, container_number)
{

	// Create a new contact card
	edit_first = f_name;
	edit_last = l_name;
	edit_phone = phone_number;
	edit_email = email;
	edit_id = id;

	
	var contact_container = document.createElement('div');
	contact_container.setAttribute('id', 'contact'+ id.toString());
	contact_container.className = 'contact_container';
	contact_set.appendChild(contact_container);

	// Create the elements of a contact card
	var contact_name = document.createElement('h2');
	contact_name.className = 'contact_name';
	contact_name.setAttribute('id', 'contact_name'+ id.toString());
	var contact_image = document.createElement('image');
	contact_image.setAttribute('source', src='images/default-user-image.png');
	contact_image.className = 'contact_image';
	var contact_element_1 = document.createElement('div');
	contact_element_1.className = 'contact_element';
	var contact_element_2 = document.createElement('div');
	contact_element_2.className = 'contact_element';
	var contact_element_3 = document.createElement('div');
	contact_element_3.className = 'contact_element';
	var edit_delete_div = document.createElement('div');
	edit_delete_div.className = 'edit_delete_div';
	var contact_phone_number = document.createElement('h3');
	contact_phone_number.className = 'contact_phone_number';
	contact_phone_number.setAttribute('id', 'contact_phone_number'+ id.toString());
	contact_phone_number.innerHTML = '<span class="material-icons md-36">phone</span>: ';

	var contact_email = document.createElement('h3');
	contact_email.className = 'contact_email';
	contact_email.setAttribute('id', 'contact_email'+ id.toString());
	contact_email.innerHTML = '<a href = "mailto:' +email+'"><span class="material-icons md-36">mail_outline</span></a>: ';
	var contact_address = document.createElement('h3');
	contact_address.className = 'contact_address';
	contact_address.setAttribute('id', 'contact_address'+ id.toString());
	var contactId = document.createElement('p');
	contactId.setAttribute('id', 'contact_index'+ id.toString());
	contactId.style.display = 'none';
	contactId.innerHTML = id;
	var containerId = document.createElement('p');
	containerId.setAttribute('id', 'container_index');
	containerId.style.display = 'none';
	containerId.innerHTML = container_number;

	// Add text to the elements of the contact card
	var contact_name_text = document.createTextNode(f_name + " " + l_name);
	contact_name.appendChild(contact_name_text);
	var contact_phone_number_text = document.createTextNode(phone_number);
	contact_phone_number.appendChild(contact_phone_number_text);
	var contact_email_text = document.createTextNode(email);
	contact_email.appendChild(contact_email_text);

	// Add buttons
	var edit_button = document.createElement('button');
	edit_button.setAttribute('id', 'edit_contact_button' + id.toString());
	edit_button.setAttribute('class', 'edit_contact_button');
	edit_button.onclick = function()
	{
		document.getElementById("myNav2").style.width = "100%";

		var name= document.getElementById("contact_name"+ id.toString()).innerHTML;
		var first = name.substr(0,name.indexOf(' ')); 
		var last = name.substr(name.indexOf(' ')+1);
		var first_name_field = document.getElementById("edit_first_name");
		
		first_name_field.value = first;
		//first_name_field.setAttribute('id', 'edit_first_name'+ id.toString());
	
		var last_name_field = document.getElementById("edit_last_name");
		
		last_name_field.value = last;

		//first_name_field.setAttribute('id', 'edit_last_name'+ id.toString());
	
		var phone_number_field = document.getElementById("edit_phone_number");
		
		phone_number_field.value = document.getElementById("contact_phone_number"+ id.toString()).childNodes[2].nodeValue;
		console.log("contact_phone_number"+ id.toString());
		//first_name_field.setAttribute('id', 'edit_phone_number'+ id.toString());
	
		var email_field = document.getElementById("edit_email");
		email_field.value = document.getElementById("contact_email"+ id.toString()).childNodes[2].nodeValue;
		//first_name_field.setAttribute('id', 'edit_email'+ id.toString());
		
		var index_field = document.getElementById("edit_index");
		index_field.value = document.getElementById("contact_index"+ id.toString()).innerHTML;
		//first_name_field.setAttribute('id', 'edit_index'+ id.toString());
				
		return;
	}
	edit_button.innerHTML = '<span id = "editicon" class="material-icons md-46" >edit</span>';
	edit_delete_div.appendChild(edit_button);
	
	var delete_button = document.createElement('button');
	delete_button.setAttribute('id', 'delete_contact_button');
	delete_button.onclick = function()
	{
		if(confirm("Are you sure you want to delete this contact?"))
			delete_contact(id);
		return;
	}
	delete_button.innerHTML = '<span id = "deleteicon" class="material-icons md-46">delete_outline</span>';
	edit_delete_div.appendChild(delete_button);

	// Add the elements to the contact card
	contact_element_1.appendChild(contact_phone_number);
	contact_element_2.appendChild(contact_email);
	contact_element_3.appendChild(contact_address);
	contact_container.appendChild(contact_name);
	contact_container.appendChild(contact_image);
	contact_container.appendChild(contact_element_1);
	contact_container.appendChild(contact_element_2);
	contact_container.appendChild(contact_element_3);
	contact_container.appendChild(contactId);
	contact_container.appendChild(containerId);
	contact_container.appendChild(edit_delete_div);
}

function add_contact()
{
	// Capture the text from the search bars to use for querying
	var add_first_name = document.getElementById("add_first_name").value;
	var add_last_name = document.getElementById("add_last_name").value;
	var add_phone_number = document.getElementById("add_phone_number").value;
	var add_email = document.getElementById("add_email").value;

	if (add_first_name == "" || add_last_name == "" || add_phone_number == "" || add_email == "")
	{
		alert("Please fill out fields");
		return;
	}

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
			
				if(jsonObject.error == "")
				{
					
					search_contacts();
					console.log(userId.toString());
					alert("Contact Added Successfully");
				}
				else
				{
					alert("That contact already exists in your contact list!");
					console.log(userId.toString());
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
	var contactId = document.getElementById("edit_index").value;
	var first_name = document.getElementById("edit_first_name").value;
	var last_name = document.getElementById("edit_last_name").value;
	var phone_number = document.getElementById("edit_phone_number").value;
	var email = document.getElementById("edit_email").value;
	
	
	// Prepare variables for the API
	var jsonPayload = '{"userId" : "' + userId + '", "contactId" : "' + contactId + '", "first_name" : "' + first_name + '", "last_name" : "' + last_name + '", "phone_number" : "' + phone_number + '", "email" : "' + email + '"}';
	var url = urlBase + '/EditContact.' + extension;
	
	close_edit_page()
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
					console.log("Editing ContactID: " + contactId.toString()); // for testing
					document.getElementById('contact_name' + contactId.toString()).innerHTML = first_name + ' ' + last_name;
					document.getElementById('contact_phone_number' + contactId.toString()).innerHTML = '<span class="material-icons md-36">phone</span>:	' + phone_number;
					document.getElementById('contact_email' + contactId.toString()).innerHTML = '<a href = "mailto:' +email+ '"><span class="material-icons md-36">mail_outline</span></a>:	' + email;
					// document.getElementById("edit_index").value =  "";
					// document.getElementById("edit_first_name").value = "";
					// document.getElementById("edit_last_name").value = "";
					// document.getElementById("edit_phone_number").value = "";
					// document.getElementById("edit_email").value = "";
				}
				else
				{
					alert("Something went wrong, please try to edit that contact again");
					console.log(jsonObject.error);
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

function delete_contact(id)
{
	// close_edit_page()
	console.log("contactId is: " + id);

	// Prepare variables for the API
	var jsonPayload = '{"contactId" : "' + id  + '"}';
	var url = urlBase + '/DeleteContact.' + extension;

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
					
					//alert("Your contact was deleted, please refresh the page");
					document.getElementById('contact'+ id.toString()).remove();
				}
				else
				{
					alert("Something went wrong, please try to delete that contact again");
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
	document.getElementById("add_first_name").value = "";
	document.getElementById("add_last_name").value = "";
	document.getElementById("add_phone_number").value = "";
	document.getElementById("add_email").value = "";
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
	
	var first_name_field = document.getElementById("edit_index");
	first_name_field.setAttribute('value', 'edit_index');
}

function close_edit_page()
{
	document.getElementById("myNav2").style.width = "0%";
	console.log(searchObject);
}

function createCSV(inpJson)
{
	const bar = document.getElementById('search_container');
	// check if node already created, then remove
	if (bar.childNodes.length > 3)
		bar.removeChild(bar.childNodes[3]);
	
	// create string
	var file = "";
	
	// format of csv = {last, first, phone, email} id is ignored
	for (var i = 0; i < inpJson.length; i += 5)
	{
		file += inpJson[i + 1] + ", " + inpJson[i + 2] + ", ";
		file += inpJson[i + 3] + ", " + inpJson[i + 4] + "\n";
	}
	
	// create chunk for text file
	var blob = new Blob([file], {type:'text/plain'});
	var url = URL.createObjectURL(blob);
	var link = document.createElement('a');
	link.setAttribute('download', "contacts.csv");
	link.setAttribute('class', "csv_link");
	link.href = url;
	link.innerText = "Download a copy";
	bar.appendChild(link);
}

function getAll()
{
	var search = document.getElementById("first_name_searchbar").value;
	var jsonPayloadPre = {
		"userId": userId,
		"search": search,
		"limit": 100,
		"offset": 0
	};
	
	var jsonPayload = JSON.stringify(jsonPayloadPre);
	
	//'{"userId" : "' + userId + '", "search" : "' + search + '"}';
	var url = urlBase + '/SearchContacts.' + extension;
	// Attempt a connection to the API
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try
	{
		xhr.onreadystatechange = function()
		{
			// If we successfully connect, retrieve the information from the APIs query
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText ); // This JSON object is the response from the API
				
				searchObject = jsonObject;
				// offset += limit;
				console.log("CONTACTS SUCCESSFULLY LOADED...");
				console.log("UID: " + userId + " | Search: " + search + " | Limit: " + limit + " | Offset: " + offset );
				console.log(jsonObject.results);

				if (jsonObject.results == undefined) 
				{
					if (document.getElementById('search_container').childNodes.length > 3)
						bar.removeChild(bar.childNodes[3]);
					return;
				}
				createCSV(jsonObject.results);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
}
