const express = require('express');
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");


const PORT = process.env.PORT || 3001;
//give access to database file

const app = express();

app.use(express.urlencoded({ extended:true })); 

app.use(express.json());

app.use(express.static('public'));

app.use(apiRoutes);
app.use(htmlRoutes);


app.listen(PORT, () => {
    console.log(`API Server now at http://localhost:${PORT}`);
});