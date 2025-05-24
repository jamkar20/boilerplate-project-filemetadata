var express = require("express");
var cors = require("cors");
var multer = require("multer");
require("dotenv").config();

var upload = multer({ storage: multer.memoryStorage() });

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  const fixedName = Buffer.from(req.file.originalname, 'latin1').toString('utf8');

  return res.json({
    name: fixedName,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
