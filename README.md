# OMDb-search
JavaScript demo of asynchronous XHR and the free OMDb API (Open Movie Database).

No dependencies, vanilla JavaScript + HTML5.

It uses JavaScript modules so it won't work offline in a browser. Start a live-server or copy it directly to a server and open the index.html file.

You will need your own OMDb API key, get it from https://www.omdbapi.com/apikey.aspx


TROUBLESHOOTING

You may get one of those errors in the browser console and the script won't run:

Loading module from “xxxxxxx/modules/main.mjs” was blocked because of a disallowed MIME type (“”).

Failed to load module script: The server responded with a non-JavaScript MIME type of "". Strict MIME type checking is enforced for module scripts per HTML spec.

In such cases a simple renaming to .js (instead of .mjs) won't help. If you are running an Apache server just use the .htaccess file from this repository and place it to the same folder like the index.html file. Some server admins simply forget to configure Apache to use JavaScript modules out-of-the-box.
