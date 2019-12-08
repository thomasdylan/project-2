$(document).ready(function() {
  // eslint-disable-next-line prettier/prettier
  var userName = $("#userName");
  // eslint-disable-next-line prettier/prettier
  var password = $("#password");
  var loginForm = $("#login");

  $(loginForm).on("submit", handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing an userName or password
    if (!userName.val().trim() || !password.val().trim()) {
      return;
    } else {
      console.log("Clicked no errors.");
      submitLogin();
      console.log("hit submitLogin");
    }
  }

  function submitLogin() {
    $.ajax({
      method: "POST",
      url: "/api/login",
      email: email,
      password: password
    });
    console.log("ran");
  }
});
