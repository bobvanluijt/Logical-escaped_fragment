/*  _  __     _          _      _         _                   
   | |/ /    | |        (_)    | |       | |                  
   | ' /_   _| |__  _ __ _  ___| | _____ | | ___   __ _ _   _ 
   |  <| | | | '_ \| '__| |/ __| |/ / _ \| |/ _ \ / _` | | | |
   | . | |_| | |_) | |  | | (__|   | (_) | | (_) | (_| | |_| |
   |_|\_\__,_|_.__/|_|  |_|\___|_|\_\___/|_|\___/ \__, |\__, |
                                                   __/ | __/ |
                                                  |___/ |___/ 

    SEO, excaped fragment and user interaction solution by Bob van Luijt (Kubrickology)
    Read the README.MD for more info: http: https://github.com/kubrickology/Logical-escaped_fragment/blob/master/README.md
    Github: http: https://github.com/kubrickology/Logical-escaped_fragment/
                                                                  */

function getHashtagParameterByName(i){
    //
    // Search for Hastag parameters: example: /#value1=123&value2=456
    //
    var returner;
    var results;
    var findEscapedElement;
	var regex;
    i = typeof i !== 'undefined' ? i : false;
    if(i!==false){
        i = i.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    }
    findEscapedElement = location.search.indexOf('?_escaped_fragment_');
    if(findEscapedElement!='-1'){
        //
        // Search for the escaped element hastag
        //
            esc      = '_escaped_fragment_';
            regex    = new RegExp("[\\?]"+esc+"=([^#]*)");
            results = regex.exec(location.search);
            results  = results[1].split("&");
            returner = new Array();
            results.forEach(function(entry) {
                entry = entry.split("=");
                returner[entry[0]] = entry[1];    
            });
            if(i===false){
                return returner;
            } else {
                return returner[i];
            }
    } else {
        //
        // Search for the hastag
        //
            regex      = new RegExp("[\\#!/&]"+i+"=([^&#]*)");
            results    = regex.exec(location.hash);
            if(i===false){
                results = location.hash.replace("#!","");
                results = results.split("&");
                returner  = new Array();
                results.forEach(function(entry) {
                    entry = entry.split("=");
                    returner[entry[0]] = entry[1];    
                });
                return returner;
            } else {
                if(results===null){
                    return false;
                } else {
                    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                }
            }
    }
}

function __req(i){
    //
    // req = request
    // __req(i) = getHashtagParameterByName(i) but is shorter and more simple.
    //
    return getHashtagParameterByName(i);
}

function checkForHashRefresh(i){
    //
    //checks if the hastag changes.
    //
    if(i!=window.location.hash && window.location.hash.substr(0,2)=='#!'){
        i=window.location.hash;
        if(typeof __update == 'function') { 
            __update();
        } else {
            console.log('Message: No __update() function found in your scripts');
        }
    }
    setTimeout(function(){
        checkForHashRefresh(i);
    }, 100);
}

document.addEventListener("DOMContentLoaded", function(event) { 
    var hashVal = window.location.hash;
    if(typeof __init == 'function') { 
        __init();
    } else {
        console.log('Message: No __init() function found in your scripts');
    }
    setTimeout(function(){
        checkForHashRefresh(window.location.hash);
    }, 100);
});
////
// END OF SCRIPT
////