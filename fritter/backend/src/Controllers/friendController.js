import { addFriends, getFriends, notFriends, removeFriends } from "../Database/friends.js"

export const suggested = async (req,res)=>{
    // console.log(req.headers.id);
    res.send(await notFriends(req.headers.id));
}

export const friendList = async (req,res)=>{
    // console.log(req.headers.id);
    res.send(await getFriends(req.headers.id));
}
export const addFriend = async (req,res)=>{
    const {user_id, friend_id}=req.body;
    res.send(await addFriends(user_id,friend_id));
}
export const unFriend = async (req,res)=>{
    const user_id=req.headers.id;
    const friend_id=req.params.friendid;
    // const {user_id, friend_id}=req.body;
    res.send(await removeFriends(user_id,friend_id));
}