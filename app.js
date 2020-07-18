const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const app = express();
const port = 3000;
const dir = __dirname + "/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(dir + "signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userEmail = req.body.inputEmail;
  var data = {
    members: [
      {
        email_address: userEmail,
        status: "Subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us10.api.mailchimp.com/3.0/lists/LIST_ID/";
  const options = {
    method: "POST",
    auth: "mailchimp_API",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(port, function () {
  console.log("Server is running at Port : " + port);
});
