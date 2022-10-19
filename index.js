// Step 1: Import the required dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Step 2: Import the config.env file and declare Database string
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE;

// Step 3: Connect to MongoDB database server
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log('DATABASE connections seccessful!'));

// Step 4: Create a new Mongoose Schema object
const carSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  brand: {
    type: String,
  },
  engineCC: {
    type: Number,
  },
  model: {
    type: String,
  },
  torque: {
    type: Number,
  },
});

// Step 5: Create a new folder for a respective schema object
const Car = mongoose.model('Car', carSchema);

// Step 5: Create a new data
const createData = async (req, res, next) => {
  const newCar = await Car.create({
    name: 'panamera',
    brand: 'porsche',
    model: 'sedan',
    engineCC: 3750,
    torque: 257,
  });
  console.log(newCar);
  console.log('Successfully created🎉');
};

// Step 6: Invoke the function to create a new data on the MongoDB
createData();

// Step 7: Catch error if anything goes wrong and return the error message
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
});
