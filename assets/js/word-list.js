// Word list view
// 11/8/14 ADP

var WordList = function (){
  this.originalElement = document.getElementById('word-list');
  this.element = this.originalElement;
  this.firstTwo = null;
  this.wordElements = [];
  this.words = [];
};

// Replace word list element.
WordList.prototype.replaceElement = function (newElement){
  // Replace the element with an empty clone of the new element
  var emptyClone = newElement.cloneNode(false);
  this.element.parentElement.replaceChild(emptyClone, this.element);
  this.element = emptyClone;

  // Get the first two characters from the new element
  this.firstTwo = this.element.dataset.firstTwo;

  // Get the word elements from the new element
  this.wordElements = Array.prototype.slice.call(newElement.children);

  // Get the words from the word elements
  this.words = this.wordElements.map(function (wordElement){
    return wordElement.children[0].innerHTML;
  });
};

// Reset element, optionally tagging it with a new firstTwo
// (that option is used when an index is not found)
WordList.prototype.resetElement = function (firstTwo){
  var newElement = this.originalElement.cloneNode();
  newElement.dataset.firstTwo = firstTwo;
  this.replaceElement(newElement);
};

// Filter the word list to show only words starting with the filter string
WordList.prototype.filterWords = function (filterString){
  // Make an empty clone of the element
  var newElement = this.element.cloneNode(false);

  // Clone any matching word elements and put them in the new element
  var found = 0, maxFound = 100;
  for (var i = 0; i < this.words.length && found < maxFound; i++){
    if (this.words[i].indexOf(filterString) == 0){
      newElement.appendChild(this.wordElements[i].cloneNode(true));
      found++;
    }
  }

  // Replace the word list element with the new one
  this.element.parentElement.replaceChild(newElement, this.element);
  this.element = newElement;
};

// Replace the word list element with an empty clone of itself
WordList.prototype.hideAllWords = function (){
  var emptyClone = this.element.cloneNode(false);
  this.element.parentElement.replaceChild(emptyClone, this.element);
  this.element = emptyClone;
};