const mongoose = require("mongoose");

const mongooseConnect = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/bin-tracker")
    .then(()=>{
        console.log("\u001b[1;34m⚡[server]: " + `\u001b[0mConnected to MongoDB`)
    })
    .catch((err)=>{
        console.log("\u001b[1;34m⚡[server]: " + `\u001b[0mError connecting to mongodb: `, err)
    })
}

module.exports = mongooseConnect