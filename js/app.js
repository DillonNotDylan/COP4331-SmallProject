var urlBase = 'http://www.thebest-group28.xyz/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function searchContacts()
{
    var searcher = document.getElementById("searchContacts").values;
    document.getElementById("contactSearchResults").innerHTML = ""

    var contact = "";

    var jsonPayLoad = '{"search" : "' + contact + '", "userId" : ' + userId + '}';
    var url = urlBase + '/ContactSearch.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                document.getElementById()
            }
        }
    }
    catch(err)
    {
        document.getElementById("SearchResults").innerHTML = err.message;
    }
}