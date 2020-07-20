# OMDb-search ![version](https://img.shields.io/badge/version-1.0-orange.svg) ![Minified](https://img.shields.io/badge/minified%20JS-5%20kb-green)

JavaScript demo of asynchronous XHR and the free OMDb API (Open Movie Database).

* No dependencies, vanilla JavaScript + HTML5.
* It uses JavaScript modules so it won't work offline in a browser. Start a live-server or copy it directly to a server and open the index.html file.

### OMDb API key
You will need your own OMDb API key, get it from https://www.omdbapi.com/apikey.aspx

***

<details>
<summary><strong>SCREENSHOT</strong></summary>

[see here](./omdb-search-demo__2020-06-25.png)
</details>

<details>
<summary><strong>TROUBLESHOOTING</strong></summary>

You may get one of those errors in the browser console and the script won't run:

<code>Loading module from “xxxxxxx/modules/main.mjs” was blocked because of a disallowed MIME type (“”).</code>

<code>Failed to load module script: The server responded with a non-JavaScript MIME type of "". Strict MIME type checking is enforced for module scripts per HTML spec.</code>

In such cases the server does not know the MIME type of JavaScript modules. A simple renaming to .js (instead of .mjs) won't help. If you are running an Apache server put this into your .htaccess file:
```apache
RewriteEngine on

AddType text/javascript js mjs
```
</details>
