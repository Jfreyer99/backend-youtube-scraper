const mongoose = require('mongoose');

const connectDatabase = async (url) => {
    mongoose.set('strictQuery', false);
    const response = await mongoose.connect(url)
    if(response){
        console.log("MongoDB running at " + url)
    }
}

module.exports = connectDatabase;