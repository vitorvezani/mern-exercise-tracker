module.exports = (err, req, res, next) => {
  if (err.name === 'MongoError') {
    let error = "Database error"
    let status = 400
    if(err.code === 11000) { // duplicated key
      error = 'Unique field(s) already used: ' + Object.keys(err.keyPattern).join(', ')
    }
    return res.status(status).json({ code: err.code, error });
  } else if (err.name === 'UnauthorizedError') {
    return res.status(err.status).json({ code: err.code, error: err.message });
  } else {
    console.error(`Error not threated correctly: ${err.name}`)
  }
  next()
}