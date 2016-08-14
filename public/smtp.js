var form = document.getElementById('check_form');
form.addEventListener("submit", function(event) {

  event.preventDefault();

  $.ajax({
    url: "/check",
    type: 'post',
    dataType: 'json',
    data: $(form).serialize(),
    complete: function(jqXHR, textStatus) {
      var logEl = document.getElementById("log");
      $('.log_box').show();
      if (jqXHR.status !== 201) {
        var data = jqXHR.responseJSON;
        logEl.innerHTML += '<p class="error">Verification of SMTP credentials failed.';
        if (data.code) logEl.innerHTML += '<p>Code: ' + data.code + '</p>';
        if (data.responseCode) logEl.innerHTML += '<p>Response Code: ' + data.responseCode + '</p>';
        if (data.hostname) logEl.innerHTML += '<p>Hostname: ' + data.hostname + '</p>';
        if (data.host) logEl.innerHTML += '<p>Host: ' + data.host + '</p>';
        if (data.response) logEl.innerHTML += '<p>Response: ' + data.response + '</p>';
        if (data.reason) logEl.innerHTML += '<p>Reason: ' + data.reason + '</p>';
      } else {
        logEl.innerHTML += '<p>Success! Your SMTP credentials are correct.</p>';
        $('#sendMail').show();
      }
    }
  });
});

$('#sendMail').click(function() {
  $.ajax({
    url: "http://localhost:3011/sendMail",
    type: 'post',
    dataType: 'json',
    data: $(form).serialize(),
    complete: function(jqXHR, textStatus) {
      var logEl = document.getElementById("log");
      if (jqXHR.status !== 201) {
        var data = jqXHR.responseJSON;
        logEl.innerHTML += '<p class="error">Unable to send test mail</p>';
      } else {
        logEl.innerHTML += '<p>Congratulations! Test mail sent successfully.</p>';
      }
    }
  });
});

$('.eraser').click(function() {
  $("#log").empty();
})
