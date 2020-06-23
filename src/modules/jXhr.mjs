const cout = console.log;
const cerr = console.error;


// @desc A bit simplified version when no data needs to be sent with request
export function sendXhr(method, url, respType = "text", descr = "sendXhr function") {
  return sendXhrData(method, url, null, respType, descr);
}


// @desc Main function with all parameters
export function sendXhrData(method, url, data, respType = "text", descr = "sendXhr function") {
  let httpPromise;

  function httpReq(resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.open(method, url);
/* 
    if (method === "POST") {
      xhr.setRequestHeader("Content-Type", "application/json"); // may be neccessary for some servers
    }
*/

    xhr.responseType = respType; // if respType set to "json" then xhr will automatically use JSON.parse() on it later to convert it to JS object

    xhr.addEventListener("load", handleLoad);
    xhr.addEventListener("error", handleError);
    // other possible events: loadstart, loadend, progress, abort

    function handleLoad(ev) {
      console.group(descr);
      cout(`jXhr: ${ev.type} event here`);
      cout(`jXhr: ${ev.loaded} bytes loaded"`);
      console.groupEnd(descr);

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
        // here we could do for example: resolve(JSON.parse(xhr.response));
      } else {
        reject(xhr.response); // reject with full response content to use later
        // 'reject' does not abort code flow (like return or break)
        cerr(xhr.status); // may be for example: 401
      }
    }

    function handleError(ev) {
      // serious error like timeout or unreachable URL or no internet connection
      reject(new Error("jXhr: failed to send request!"));
      console.group(descr);
      cout(ev);
      cerr("jXhr: status " + xhr.status);
      console.groupEnd(descr);
    }

    // xhr.send(JSON.stringify(data)); // stringify not needed when respType==json
    xhr.send(data);
  }

  httpPromise = new Promise(httpReq);
  return httpPromise; // function has to return type Promise to work with 'await'
}


cout("jXhr.mjs here");
