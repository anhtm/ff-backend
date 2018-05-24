// helper functions
let sendJSONResult = (res, statusCode, result = null) => {
  return res.status(statusCode).json(result);
};

let sendResult = (res, statusCode, result = null) => {
  return res.status(statusCode).send(result);
};

module.exports = {
  sendJSONResult,
  sendResult
};

/*
400: bad request
404: not found
500: server
*/
