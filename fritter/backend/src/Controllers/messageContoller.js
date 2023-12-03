import { getMsgs, sendMsg } from "../Database/messages.js";

export const getMessages = async(req, res) => {
  //find messages sent and received by the user
  //sort by descending time and then print left and right(sent/received)
  const senderId=req.headers.id;
  const receiverId=req.params.id;
  const msgs=await getMsgs(senderId,receiverId);
  res.send(msgs);
};
export const sendMessage =async (req, res) => {
  //write msgs to data base
  const {sender_id,receiver_id,content}=req.body;
  await sendMsg(sender_id,receiver_id,content);
  res.send({message:'sent'});
};

// module.exports = { getMessages, sendMessage };
// 