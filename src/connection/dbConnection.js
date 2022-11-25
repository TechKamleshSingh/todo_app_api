const { default: mongoose } = require("mongoose");

let Connection;

const Conn = async () =>{
    Connection = await mongoose.connect(process.env.MONGODB_URL);
    return Connection; 
}

// console.log(Conn(process.env.MONGODB_URL));

const DBConnection = async (MONGODB_URL) => {
    try {
        Connection = await mongoose.connect(MONGODB_URL);
        // console.log(connection);
        console.log("DataBase Connection initialized");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected");
})

mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
})

module.exports = {DBConnection, Conn};