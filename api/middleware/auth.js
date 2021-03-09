const isAuthenticatedAdmin = (req, res, next) => {
  if (req.user && req.user.email && req.user.isAdmin) {
    return next()
  }
  return res.status(401).send("You don't have admin access")
}
const isAuthenticatedStudent = (req, res, next) => {
  if (req.user && req.user.email && !req.user.isAdmin && !req.user.isTeacher) {
    return next()
  }
  return res.status(401).send("You don't have student access")
}
const isAuthenticatedTeacher = (req, res, next) => {
  if (req.user && req.user.email && req.user.isTeacher && !req.user.isAdmin) {
    return next()
  }
  return res.status(401).send("You don't have teacher access")
}

const isAuthenticatedTeacherOrStudent = (req, res, next) => {
  if (
    req.user &&
    req.user.email &&
    (req.user.isTeacher || req.user.isStudent)
  ) {
    return next()
  }
  return res.status(401).send("You don't have teacher/student access")
}

module.exports = {
  isAuthenticatedAdmin,
  isAuthenticatedStudent,
  isAuthenticatedTeacher,
  isAuthenticatedTeacherOrStudent,
}
