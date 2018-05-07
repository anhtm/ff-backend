// helper functions
let sendResult = (res, result) => {
  res.status(200).json(result);
};

let sendError = (res, result) => {
  res.status(500).json(result);
};

module.exports = {
  sendResult,
  sendError
};
