const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to mongo-exercises...'))
    .catch(err => console.log('Error connecting to db...', err));

const schema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = new mongoose.model('Course', schema);

async function getCourses() {
    return await Course
        .find({tags: 'backend', isPublished: true})
        .sort({name: 1})
        .select({name: 1, author: 1});
}

// use separate function to run b/c prev functions role is to simply query courses. this is function to display query results.
async function run() {
    const result = await getCourses();
    console.log(result);
}

run();