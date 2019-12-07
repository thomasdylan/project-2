$(document).ready(function() {
  var email = $("#email");
  var password = $("#password");
  var loginForm = $("#login");

  $(loginForm).on("submit", handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing an email or password
    if (!email.val().trim() || !password.val().trim()) {
      return;
    } else {
      submitLogin(login);
    }
  }

  function submitLogin() {
    $.ajax({
      method: "POST",
      url: "/api/login",
      email: email,
      password: password
    }).then(function() {
      window.location.href = "/post";
    });
  }
});
