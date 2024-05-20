
        (function(){
      emailjs.init("Cpwb20MTIFpK0WDSt"); // replace with your actual user ID
    })();
  
    function sendEmails() {
      var senderEmail = document.getElementById("senderEmail").value;
      var message = document.getElementById("message").value;
      var subject = document.getElementById("subject").value;
      
      var validEmails = [];
      var invalidEmails = [];
  
      // Read contents of CSV file
      var file = document.getElementById("csvFile").files[0];
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event) {
        var csv = event.target.result;
        var lines = csv.split('\n');
        for (var i = 0; i < lines.length; i++) {
          var email = lines[i].trim();
          var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/
  ;
          if (emailRegex.test(email)) {
            validEmails.push(email);
          } else {
            invalidEmails.push(email);
          }
        }
  
       
  
        // Send email to valid email addresses
        for (var j = 0; j < validEmails.length; j++) {
          var templateParams = {
            to_name: validEmails[j],
            from_name: senderEmail,
            message_html: message,
            subject_html: subject
          };
          
          emailjs.send('service_5aw59qk', 'template_fnziqhc', templateParams)
            .then(function(response) {
              console.log("SUCCESS", response);
            }, function(error) {
              console.log("FAILED", error);
            });
        }
  
        alert("Emails sent to valid email addresses.");
      };
    }
  
    /*Thinking*/
    var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 1) || 1000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];
  
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  
  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
  var that = this;
  var delta = 300 - Math.random() * 100;
  
  if (this.isDeleting) { delta /= 2; }
  
  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }
  
  setTimeout(function() {
    that.tick();
  }, delta);
  };
  
  window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
  };
      document.getElementById("csvFile").addEventListener("change", function() {
          var validEmails = [];
          var invalidEmails = [];
  
          // Read contents of CSV file
          var file = document.getElementById("csvFile").files[0];
          var reader = new FileReader();
          reader.readAsText(file);
          reader.onload = function(event) {
              var csv = event.target.result;
              var lines = csv.split('\n');
              for (var i = 1; i < lines.length; i++) { // Start loop from index 1
                  var email = lines[i].trim();
                  if (email !== "") { // Skip empty lines
                      var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
                      if (emailRegex.test(email)) {
                          validEmails.push(email);
                      } else {
                          invalidEmails.push(email);
                      }
                  }
              }
  
              // Display valid and invalid emails
              document.getElementById("validEmails").innerHTML = validEmails.join("<br><br>");
              document.getElementById("invalidEmails").innerHTML = invalidEmails.join("<br><br>");
              document.getElementById("validEmailCount").innerText = "(" + validEmails.length + ")";
              document.getElementById("invalidEmailCount").innerText = "(" + invalidEmails.length + ")";
          };
      });