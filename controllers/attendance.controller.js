const Attendance = require('../models/attendance.model');
const moment = require('moment');

exports.set = (req, res) => {

    if (Object.keys(req.body).length == 0) {
        return res.status(400).send({
            message: "Invalid Entry"
        });
    }

    Attendance.findOne({ userid: req.body.userid })
        .then(attendanceData => {
            type = 'in';
            if (attendanceData && attendanceData.timestamp < new Date())
                type = 'out';

            const attendance = new Attendance({
                userid: req.body.userid,
                type: type,
                timestamp: new Date()
            });

            attendance.save()
                .then(user => {
                    res.send(user);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while setting the User Attendance."
                    });
                });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while setting the User Attendance."
            });
        });
}

exports.get = (req, res) => {

if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
        message: "Invalid Entry"
    });
}

Attendance.find({ userid: req.body.userid, timestamp: {
    $lt : moment(req.body.timestamp).add(1, 'days').toISOString(),
    $gte: moment(req.body.timestamp).toISOString()
 } })
    .then(attendanceData => {
     res.send({attendanceData: attendanceData});
    })
}