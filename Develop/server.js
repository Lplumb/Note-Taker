// Dependencies

const express = require('express');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

app.use(require("./routes/api"))
app.use(require("./routes/html"))
// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
