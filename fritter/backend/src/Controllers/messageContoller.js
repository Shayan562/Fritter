const getMessages = (req, res) => {
  //find messages sent and received by the user
  //sort by descending time and then print left and right(sent/received)
  const id=req.headers.id;
  res.send(`Get All Msgs for ${id} to ${req.params.id}`);
};
const sendMessage = (req, res) => {
  //write msgs to data base
  const msg=req.body;
  res.send(msg);
};

module.exports = { getMessages, sendMessage };
