const User = require('../models/user.model');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.create = (req, res) => {
    
    if(Object.keys(req.body).length == 0) {
        return res.status(400).send({
            message: "User data can not be empty"
        });
    }

    const user = new User({
        userid: req.body.userid,
        name: req.body.name,
    });

    user.save()
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

exports.all = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.one = (req, res) => {
    User.findOne({ userid: req.params.userid })
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userid
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userid
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userid
        });
    });
};

exports.update = (req, res) => {
    if(Object.keys(req.body).length == 0) {
        return res.status(400).send({
            message: "User data can not be empty"
        });
    }
    User.findOneAndUpdate({ userid: req.params.userid }, 
        { $set: req.body })
        .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userid
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userid
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userid
        });
    });
};

exports.delete = (req, res) => {
    User.findOneAndRemove({ userid: req.params.userid })
    .then(user => {
        if(!user)
            return res.status(404).send({
                message: `No user found with id ${req.params.userid}`
            });
        res.send({ message: 'User deleted successfully'});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userid
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.userid
        });
    });
};