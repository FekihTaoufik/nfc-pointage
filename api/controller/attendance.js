const db = require('../db/models')

const getAttendances = (req, res, next) => {
    db.attendance.findAll()
        .then((atts) => {
            res.json(atts);
        })
        .catch((err) => {
            next(err)
        })
}

module.exports = {
    getAttendances,
}