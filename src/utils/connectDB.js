const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true, 
        });
        console.log('Connected to DB')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

