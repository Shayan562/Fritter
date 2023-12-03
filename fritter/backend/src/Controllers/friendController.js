import { addFriends, getFriends, removeFriends } from "../Database/friends.js"

export const friendList = async (req,res)=>{
    res.send(await getFriends(req.headers.id));
}
export const addFriend = async (req,res)=>{
    const {user_id, friend_id}=req.body;
    res.send(await addFriends(user_id,friend_id));
}
export const removeFriend = async (req,res)=>{
    const user_id=req.headers.id;
    const friend_id=req.params.friendid;
    // const {user_id, friend_id}=req.body;
    res.send(await removeFriends(user_id,friend_id));
}