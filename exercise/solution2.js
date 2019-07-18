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
        .or([{ tags: 'frontend' }, { tags: 'backend' }])
        // .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
        .sort({price: -1})
        .select({name: 1, author: 1});
}

async function run() {
    const result = await getCourses();
    console.log(result);
}

run();