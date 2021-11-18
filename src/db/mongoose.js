const mongoose = require('mongoose');


mongoose.connect(process.env.mongodburl, {
    useNewUrlParser: true,
})
.then(() => console.log('Connected to DB.'))
.catch(() => console.log('Failed to connect.'));

