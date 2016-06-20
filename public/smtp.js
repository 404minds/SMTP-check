
var form = document.getElementById('check_form');
form.addEventListener("submit", function(event) {

  event.preventDefault();

  $.ajax({
    url: "http://localhost:3011/check",
    type: 'post',
    dataType: 'json',
    data: $(form).serialize(),
    success: function(result) {
      document.getElementById("log").innerHTML += '<p>'+ result.response +' </p>';
    }
  });
});
