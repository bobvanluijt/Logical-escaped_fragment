Logical escaped_fragment for SEO and UX
========================

<h4>Summary:</h4>
This code is created to help you create heavy based AJAX pages, that Google can crawl. Especially on eCommerce websites SEO is one of the most important things. This plugin calls two functions. `__init()` (= replacement for `$(document).ready()`) and `__update()`. By using those two function your website can be completly AJAX, but Google sees what it needs to see to correctly index the page.<br>
Read the Explanation details below for more indept information

Based on: https://developers.google.com/webmasters/ajax-crawling/<br>
Based on: fact that Google executes `$(document).ready()` or any equivalent DOM ready loader.<br>
<i>Note: This solution is 100% JS. It doesn't need a lib like jQuery</i><br>

<h4>Explanation:</h4>
Everytime the Google crawler hits your escaped_fragment website. It will translate `url.html#!key=value` into `url.html?_escaped_fragment_=key=value` this is done, so you can execute something to fill data that otherwise would be filled through JS or AJAX.

url.html#!key=value website: `<div class="helloWorld"></div>` -> AJAX call -> `<div class="helloWorld">I'm the data that comes from this call</div>`
If Googles crawler would visit this website, it would find `<div class="helloWorld"></div>` and no content.

Therefor the solution of the escaped_fragment was created, Google would automatically go to:<br>
url.html?_escaped_fragment_=key=value website: `<div class="helloWorld">Now you should have the same content as above, but without the AJAX call</div>`

The problem here is that it can get quite complicated to do this on heavy AJAX website.

For some time know, the Google crawler also executes the: `$(document).ready()`

Now we have enough ingredients to make a AJAX based website that can be crawled.

<h4>How does it work:</h4>
When you add the minified script from this repo to your pages. It will look for `#!` or it will look for the `?_escaped_fragment_=`. You don't have to do <i>anything</i> server side. It can be a complete static page.

When it's done it looks through your script for a function called ``__init()``.<br><b>Everything you do within `__init()` AJAX call, update DIV's etc. Will be indexed by Google.</b>

When you change the escaped hashtag (`#!`) the script calls ``__update()``.<br><b>everything that is done within ``__update()`` will not be indexed by Google.</b><br>
<i>However</i> you can call ``__init()`` inside ``__update()`` if you do that, you can be 100% sure that your page will be indexed properly when the correct `?_escaped_fragment_=` url is visited by the crawler.

<h4>Examples:</h4>
Please visit: http://kubrickolo.gy/SEO-AJAX-example/url1.html#!value1=123&value2=456 (or run this page from your own server)

On this page you can find 2 excisiting (statis) files: url1.html and url2.html. But you can generate 4* pages.
1) http://kubrickolo.gy/SEO-AJAX-example/url1.html#!value1=123&value2=456
2) http://kubrickolo.gy/SEO-AJAX-example/url1.html#!value1=somethingCompletelyDifferent
3) http://kubrickolo.gy/SEO-AJAX-example/url2.html#!value1=abc&value2=def
4) http://kubrickolo.gy/SEO-AJAX-example/url2.html#!value1=somethingCompletelyDifferent
*) Change the values by adding or removing, changing names etc, for example, try: http://kubrickolo.gy/SEO-AJAX-example/url1.html#!value1=hello%20world&value2=WhatDoYouThinkOfThis&SomethingDifferent=HiAgain

<h4>Usable function list:</h4>
`__req(i)`<br>
req = request, you can request a string with a key and value.<br>
example I: url `#!key=val` and/or `?_escaped_fragment_=key=val` is requested for usage with: `__req('key')`<br>
example II: when you call `__req()` you will get an array with all keys and values.<br>
Note: no output will return `false`

<h4>Function-you-can-use list:</h4>
`__init()`<br>
This is your <b>replacement</b> for `$(document).ready()` (or any equivalent)<br>
Example: http://kubrickolo.gy/SEO-AJAX-example/url1.html#!value1=abc&value2=def<br>
Note: Always use this on any page.

`__update()`<br>
This function is called when the hashtag changes. Everything beyond this point will not be indexed by the crawler. However, calling `__init()` within this function assures you of a complete indexable page.<br>
Example: http://kubrickolo.gy/SEO-AJAX-example/url2.html#!value1=abc&value2=def

Example II: scenario how you might use this in an eCommerce solution.<br>
You have two pages: `myurl.com/#!page=product&sku=book` and `myurl.com/#!page=shoppingcart`<br>
Your code might look like this:
```javascript
function __init(){
	$.get('/ajax.php?page='+__req('page'), function(data){
		$('someDIV').html(data);
	});
}

function __update(){
	//
	// I run when the # url is changed
	//
	doSomeFancyThingOnThePage('no SEO needed here');
	__init();
}
```

So when you are on `myurl.com/#!page=product&sku=book` and you add something to the cart, the url changes to `myurl.com/#!page=shoppingcart`,  `__update()` is called, a fancy animation is started, and `__init()` is called again. You are now on the shopping cart page.<br>

Google is now able to index <i>both</i> page.

<h4>I only believe it when I see images:</h4>
![Before AJAX](https://raw.githubusercontent.com/kubrickology/Logical-escaped_fragment/master/imageExamples/url1.png)
<b>No new page is called</b><br>
![After AJAX](https://raw.githubusercontent.com/kubrickology/Logical-escaped_fragment/master/imageExamples/url1_after_AJAX.png)
