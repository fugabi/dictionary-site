// Search form and related views
// 11/8/14 ADP

var SearchForm = function (){
  // Properties
  this.formElement = document.getElementById('search-form');
  this.boxElement = document.getElementById('search-box');
  this.spinnerElement = document.getElementById('spinner');
  this.errorMessageElement = document.getElementById('error-message');
  this.searchString = null;
  this.firstTwo = null;
  this.onShort = null;
  this.onLong = null;

  // Search form submit handler (do nothing)
  this.formElement.onsubmit = function (){
    return false;
  };

  // Search box input handler
  var searchForm = this;
  this.boxElement.oninput = function (){
    searchForm.boxNodeInputHandler();
  };

  // Hide the spinner and error message
  this.hideSpinner();
  this.hideErrorMessage();

  // Show the form
  this.formElement.style.display = 'block';

  // Focus the search box
  this.boxElement.focus();
};

// Box node input handler
SearchForm.prototype.boxNodeInputHandler = function (){
  // Lower-case the search string
  var searchString = this.boxElement.value.toLowerCase();

  // Set the search string and first two properties
  this.searchString = searchString;
  this.firstTwo = searchString.slice(0, 2);

  // If the search string is two or more characters, call onLong
  // Otherwise, call onShort
  if (searchString.length >= 2) {
    if (typeof this.onLong === 'function') this.onLong(searchString);
  } else {
    if (typeof this.onShort === 'function') this.onShort(searchString);
  }
};

// Cause events to be fired as if the search box content had changed
// (used in onLoad to handle the case of the back button being hit)
SearchForm.prototype.tickle = function (){
  this.boxNodeInputHandler();
};

// Hide spinner
SearchForm.prototype.hideSpinner = function (){
  this.spinnerElement.style.display = 'none';
};

// Show spinner
SearchForm.prototype.showSpinner = function (){
  this.spinnerElement.style.display = 'inline';
};

// Hide error message
SearchForm.prototype.hideErrorMessage = function (){
  this.errorMessageElement.style.display = 'none';
};

SearchForm.prototype.showErrorMessage = function (){
  this.errorMessageElement.style.display = 'block';
};