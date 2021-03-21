const db = require('../db/models')

const getAttendances = (req, res, next) => {

    db.attendance.findAll({
        include: {
            model: db.user,
            as: 'user'
        }
    })
        .then((atts) => {
            res.json(atts);
        })
        .catch(next)
}

module.exports = {
    getAttendances,
}