const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AttendanceSchema = new Schema({
    userid: Number,
    type: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);