// Index request model
// 11/8/14 ADP

var IndexRequest = function (){
  // Properties
  this.xhr = new XMLHttpRequest();
  this.running = false;
  this.firstTwo = null;
  this.onBegin = null;
  this.onDone = null;
  this.onSuccess = null;
  this.onNotFound = null;
  this.onError = null;

  // Set up XHR
  var indexRequest = this;
  this.xhr.onreadystatechange = function (){
    if (indexRequest.xhr.readyState === 1) indexRequest.xhrOpenHandler();  // OPENED
    if (indexRequest.xhr.readyState === 4) indexRequest.xhrDoneHandler();  // DONE
  };
};

// XHR open handler
IndexRequest.prototype.xhrOpenHandler = function (){
  this.running = true;
  if (typeof this.onBegin === "function") this.onBegin();
};

// XHR done handler
IndexRequest.prototype.xhrDoneHandler = function(){
  this.running = false;

  if (typeof this.onDone === 'function') this.onDone();

  if (this.xhr.status === 200){
    if (typeof this.onSuccess === 'function') this.onSuccess(this.xhr.response);
  } else if (this.xhr.status === 404){
    if (typeof this.onNotFound === 'function') this.onNotFound();
  } else {
    if (typeof this.onError === 'function') this.onError();
  }
};

// Initiate a request
IndexRequest.prototype.get = function (firstTwo){
  // If a request is already running for these first two characters, do nothing.
  if (this.running && this.firstTwo == firstTwo) return;

  this.firstTwo = firstTwo;
  this.xhr.open('get', 'indices/' + encodeURIComponent(firstTwo) + '.html');
  this.xhr.responseType = 'document';
  this.xhr.send();
};