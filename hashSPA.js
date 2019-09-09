function getJS(url) {
    if (!document.getElementById(url))
        document.write("\<script id='" + url + "' src='" + url + "'\>\<\/script\>");
}

function getCSS(url) {
    if (!document.getElementById(url))
        document.write("\<link rel='stylesheet' id='" + url + "' href='" + url + "'\>");
}

function setHash(string){
    if(window.location.hash.slice(1) == string)
        hashChange();
    else
        window.location.hash = string;
}

function overwriteElement(elem, html){
    var div = document.createElement('div');
    div.innerHTML = html.trim();
    div.firstChild;

    var parent = elem.parentNode;
    parent.insertBefore(div.firstChild, elem);
    parent.removeChild(elem);
}

function checkFunction(function_name) {
    try {
        hash_func = eval(function_name)
        if (typeof hash_func == "function")
            return hash_func;
    } catch {}

    console.log(function_name + " is not function.");
    return false;
}

function hashChange(){
    var hash_string = window.location.hash.slice(1).split('?');
    var hash_name = hash_string[0];

    hash_func = checkFunction(hash_name);

    if (hash_func) {
        if (hash_string.length == 1) {
            hash_func();
        } else {
            var hash_params = JSON.parse('{"' + decodeURI(hash_string[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
            hash_func(hash_params);
        }
    }
}

window.addEventListener('hashchange', hashChange);
