function js(url) {
    if (!document.getElementById(url))
        document.write("\<script id='" + url + "' src='" + url + "'\>\<\/script\>");
}

function css(url) {
    if (!document.getElementById(url))
        document.write("\<link rel='stylesheet' id='" + url + "' href='" + url + "'\>");
}

function hash(hash_string, params=null){
    var hash_query = hash_string;
    
    if (params != null){
        hash_query += "?" + Object.keys(params).map(function(key) {
            return key + '=' + params[key]
        }).join('&');
    }

    if(window.location.hash.slice(1) == hash_query)
        hashChange();
    else
        window.location.hash = hash_query;
}

function checkFunction(function_name) {
    try {
        hash_func = eval(function_name)
        if (typeof hash_func == "function")
            return hash_func;
    } catch (e) {}

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
