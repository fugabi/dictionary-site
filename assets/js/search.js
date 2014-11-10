// Search controller  
// 11/8/14 ADP
//
// Sets up the search form, word list, and index request.
//
// Quick indices are stored on the server as separate HTML files containing all
// words that start with the same two characters (first-two).  The word list is
// initially empty.  Once the search string has at least two characters in it,
// the appropriate index is retrieved and used to replace the word list. As the
// search string changes or when a new index is received, the word list is
// filtered.  If an index is not found (no words start with those two letters),
// an empty word list is produced.  If the search string is reduced to less than
// two letters, all of the words are hidden, but the index is not discarded
// until a new one is received.

window.onload = function (){
  // Word list
  var wordList = new WordList();

  // Index request
  var indexRequest = new IndexRequest();

  indexRequest.onBegin = function (){
    // When the request begins, show the spinner and hide the error message 
    // if it's visible
    searchForm.showSpinner();
    searchForm.hideErrorMessage();
  };

  indexRequest.onDone = function (){
    // When the request is done, hide the spinner
    searchForm.hideSpinner();
  }

  indexRequest.onNotFound = function (){
    // If the request failed because the file was not found, reset the word
    // list element and tag it with the first two characters of the index
    wordList.resetElement(indexRequest.firstTwo);
  };

  indexRequest.onError = function (){
    // Reset the word list and show the error message
    wordList.resetElement();
    searchForm.showErrorMessage();
  }

  indexRequest.onSuccess = function (indexDocument){
    // Find the new word list element and adopt it into the main document
    var newWordListElement = indexDocument.getElementById('word-list');
    newWordListElement = document.adoptNode(newWordListElement);

    // Replace the current word list element with it
    wordList.replaceElement(newWordListElement);

    // Filter the word list
    wordList.filterWords(searchForm.searchString);
  };

  // Search form
  var searchForm = new SearchForm();
  
  searchForm.onShort = function (){
    wordList.hideAllWords();
  };

  searchForm.onLong = function (searchString){
    // If the first two characters of the search string match the first two
    // of the word list, filter the word list with the search string.  
    // Otherwise, request the correct word list.
    if (wordList.firstTwo == searchForm.firstTwo){
      wordList.filterWords(searchString);
    } else {
      wordList.hideAllWords();
      indexRequest.get(searchForm.firstTwo);
    }
  };

  // Cause the search form to fire events as if input had been received
  // (useful if there is already text in the search box, as when using
  //  the back button)
  searchForm.tickle();
};