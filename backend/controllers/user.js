const pool = require("../config/dbConnect");

const insertDatactrl = (req, res) => {
  const { firstName, surName, dob, email, numOfChild, interests } = req.body;
  const fileName = req.file ? req.file.filename : null;
  const newInterests = interests.trim() || null;
  const query =
    "INSERT INTO users_tbl (first_name, sur_name, dob, email, num_of_child, interests, picture) VALUES (?, ?, ?, ?, ?, ?, ?)";
  pool.query(
    query,
    [firstName, surName, dob, email, numOfChild, newInterests, fileName],
    (err) => {
      if (err) {
        console.error("Error submitting form data:", err);
        res.status(500).json({ error: "Error submitting form data" });
        return;
      }
      res.json({ message: "Form data submitted successfully" });
    }
  );
};

module.exports = insertDatactrl;
