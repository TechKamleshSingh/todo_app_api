require('dotenv').config()
const express = require('express');
const { default: mongoose } = require('mongoose');
const { DBConnection } = require('./connection/dbConnection');
const Task = require('./models/Task');
const userRouter = require('./routes/users');
const taskRouter = require('./routes/task');
const cors = require('cors')
const PORT = process.env.PORT || 8080;
const app = express();

app.get('/', (req, res) => {
  res.send("Server Starts!!!")

})


//middleware
app.use(cors());
app.use(express.json());
app.use('/user', userRouter)
app.use('/task', taskRouter)




app.listen(PORT, () => {
  DBConnection(process.env.MONGODB_URL);
  console.log(`Listening on Port ${PORT}`);
});


