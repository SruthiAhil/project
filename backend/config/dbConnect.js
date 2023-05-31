const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Root123#",
  database: "user_details_db",
});
const getConnectionAsync = util.promisify(pool.getConnection).bind(pool);

const dbConnect = async () => {
  try {
    const connection = await getConnectionAsync();
    console.log("Connected to MySQL database");
    connection.release();
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  }
};

dbConnect();

module.exports = pool;
