const apiAuth = require('./jwt')
const {
  isAuthenticatedAdmin,
  isAuthenticatedStudent,
  isAuthenticatedTeacher,
  isAuthenticatedTeacherOrStudent,
} = require('./auth')
module.exports = {
  apiAuth,
  isAuthenticatedAdmin,
  isAuthenticatedStudent,
  isAuthenticatedTeacher,
  isAuthenticatedTeacherOrStudent,
}
