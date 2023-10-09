const express = require('express');
const app = express();
const port = 3000;
const web = require('./route/web')
const dotenv = require('dotenv')
const connectdb = require('./db/connectDb')




dotenv.config({ path: ".env" })
connectdb();

app.use(express.json())

//route load
app.use('/api', web) 




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
