const express = require("express");
const app = express();
const router = require("./routes/user");
const multer = require("multer");

const upload = multer({ dest: "uploads" });

app.use("/api", upload.single("picture"), router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
