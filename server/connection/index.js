const mongoose = require('mongoose');

const db = "mongodb://localhost:27017/beauty";
mongoose.Promise = global.Promise;
mongoose.connect(db, {useNewUrlParser : true});
mongoose.connection
    .once("open", () => console.log("connected"))

