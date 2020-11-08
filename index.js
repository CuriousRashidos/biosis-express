const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

//airtable config
var Airtable = require("airtable");
var base = new Airtable({
  //TODO: put key in environment variable
  apiKey: "keytNjOg371DOg3Mm",
}).base("app2lFfv9F779uihP");

//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/src/public/css"));
//not using this since all images are src-ed from imgur 
app.use("/img", express.static(__dirname + "/src/public/img"));
app.use("/js", express.static(__dirname + "/src/public/js"));

//root
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/views/index.html");
});

// /submit
app.post("/submit", urlencodedParser, async (req, res) => {
  //form data
  const { name, email, phone, message } = req.body;
  //create table
  base("contactDetails").create(
    [
      {
        fields: {
          name,
          email,
          phone,
          message,
        },
      },
    ],

    //debug
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    }
  );
  res.redirect("/");
});

app.listen(9000);
