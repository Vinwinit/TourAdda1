
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { Pool } = require('pg');

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Your existing routes...
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

const pool = new Pool({
  user: 'vinwinit',
  host: 'localhost',
  database: 'postgres',
  password: 'hello',
  port: 5432,
});




app.post('/submit', async (req, res) => {
  const { first_name, last_name, email, message } = req.body;
  
  
  try {
    const result = await pool.query(
      'INSERT INTO formdata (first_name, last_name, email, message) VALUES ($1, $2, $3, $4)',
      [first_name, last_name, email, message]
    );

    console.log('Form data submitted:', result.rows[0]);
    res.send('Form data submitted successfully!');
    
  } catch (error) {
    console.error('Error submitting form data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Your existing listener code...
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
