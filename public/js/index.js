// Get references to page elements
var $reviewText = $("#example-text");
var $reviewDescription = $("#review-description");
var $submitBtn = $("#submit");
var $reviewList = $("#review-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveReview: function(review) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/reviews",
      data: JSON.stringify(review)
    });
  },
  getReviews: function() {
    return $.ajax({
      url: "api/reviews",
      type: "GET"
    });
  },
  deleteReviews: function(id) {
    return $.ajax({
      url: "api/reviews/" + id,
      type: "DELETE"
    });
  }
};

// refreshReviews gets new reviews from the db and repopulates the list
var refreshReviews = function() {
  API.getReviews().then(function(data) {
    var $reviews = data.map(function(review) {
      var $a = $("<a>")
        .text(review.text)
        .attr("href", "/review/" + review.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": review.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $reviewList.empty();
    $reviewList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var review = {
    text: $reviewText.val().trim(),
    description: $reviewDescription.val().trim()
  };

  if (!(review.text && review.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
