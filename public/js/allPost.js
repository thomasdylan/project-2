function getPost() {
  $.get("/api/post", function(data) {
    console.log("This page is worthless ", data);
  });
}

getPost();
