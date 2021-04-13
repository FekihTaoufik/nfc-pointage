const { notFound, badRequest, unauthorized } = require('@hapi/boom')
const { validator, wrapAsync: wa } = require('express-server-app')
const _ = require('lodash')
const moment = require('moment')
moment.locale('fr')
const db = require('../db/models')
const { Op } = require('sequelize')

const createDemoSession = async (req, res, next) => {
  const { roomId, groupId, teacherId } = req.body

  const startDateTime = moment()
  const endDateTime = moment().add(3, 'hours')

  if (!roomId) throw(badRequest('Room id not correctly defined'))

  const foundRoom = await db.room.findOne({ where: { id: roomId } })

  if (!foundRoom) throw(notFound('Room not found'))

  const createdSession = await db.session.create({
    id : _.random(1000,99999999),
    name: `Demo session starting from ${startDateTime} until ${endDateTime}`,
    teacherId: teacherId || 1,
    groupId: groupId || 1,
    roomId: roomId,
    startedAt: startDateTime,
    endedAt: endDateTime,
  }, {
    include:[{
      model: db.user,
      as: 'Teacher'
  },
  {
      model: db.room,
      as: 'Room'
  },
  {
      model: db.group,
      as: 'Group'
  },
],
  })

  res.json(createdSession)
}
const getAttendanceForSession = async (req, res, next) => {
  const { sessionId, userId } = req.params

  
  if (!sessionId) throw(badRequest('Session id not correctly defined'))
  const user = await db.user.findOne({
    where: {id: userId}
  })
  if (user.role !=='TEACHER') {
    throw unauthorized('Seul un professeur peut accéder à la liste des présences.');
  }
  const foundSession = await db.session.findOne({
    where: { id: sessionId },
    include: [
      {
        model: db.group,
        as: 'Group',
        include: {
          attributes:['id','firstName','lastName','role'],
          model: db.user,
          as: 'Users',

        },
      },
      {
        model: db.attendance,
        as: 'Attendances',
      },
    ],
  })

  if (!foundSession) throw(notFound('Session not found'))
  let attendances = foundSession.dataValues.Attendances
  let attendants = foundSession.dataValues.Group.dataValues.Users

  attendants = attendants.map(a=>{
    a = a.dataValues
    a.present = false
    a.joined_at = null
    a.left_at = null


    let presence = attendances.find(o=>o.dataValues.userId === a.id)
    if(presence){
           a.present = true
    a.joined_at = presence.startedAt
    a.left_at = presence.endedAt
    }
    return a
  })
 res.json(attendants)
}
module.exports = {
  createDemoSession,
  getAttendanceForSession,
}
