const mongoose = require('mongoose');

const connectDatabase = async (url) => {
    mongoose.set('strictQuery', false);

    const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
        }

    const response = await mongoose.connect(url, dbOptions)
    if(response){
        console.log("MongoDB running at " + url)
    }
}

module.exports = connectDatabase;