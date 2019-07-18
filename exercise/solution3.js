const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to mongo-exercises...'))
    .catch(err => console.log('Error connecting to db', err));

const schema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', schema);

async function getCourses() {
    return await Course
        .find({isPublished: true})
        .or([{ price: { $gte: 15 }}, { name: /.*by.*/ }])
        .sort('-price')
        .select('name author price');
}

async function run() {
    const result = await getCourses();
    console.log(result);
}

run();