const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();
// Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//seperate js files for handling html and api routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log(`Server is listening port: ${PORT}`);
});