import { createImage, updateImage } from "../Database/images.js";
import { addPagePostEntry } from "../Database/pagePosts.js";
import { getPostsFeed, getPostsProfile ,createPost, getPostsPageWithValidation, deletePost, updatePost, getPostID} from "../Database/post.js";

export const feed =async (req, res) => {
  // res.send(req.Headers.id);

  // res.send(await getPostsFeed(req.headers.id));
  res.send(await getPostsFeed(req.headers.id));

  //get list of posts one can view
  //can be by user or page
  //search those post by time descending and return
  // res.send("all posts");
};
export const profile =async (req, res) => {
  //verify if user can get the post and open post
  console.log(req.headers.id);
  res.send(await getPostsProfile(req.headers.id));
  // res.send("post: " + req.params.id);
};
export const page= async (req, res)=>{
  // console.log(req.headers.id,req.params.pageid);
  res.send(await getPostsPageWithValidation(req.headers.id,req.params.pageid))
}
export const newPost = async (req, res) => {
  const {creator_id,content,link, page}=req.body;
  // console.log(content);
  // console.log({creator_id,content});
  await createPost({creator_id,content});
  const post=await getPostID(creator_id,content);
  await createImage({user_id:creator_id,post_id:post,link})
  console.log(page);
  if(page!=null && page!=undefined){
    await addPagePostEntry(page,post);
  }
  res.send({message:"Post Created"});
  // res.send(await getPostID(creator_id,content));
  // res.send());
};
export const editPost = async (req, res) => {
  const {content,updateContent,updateImg}=req.body;
  if(updateImg){
    const {link}=req.body;
    await updateImage(req.headers.id,req.params.postid,['link'],[link]);
  }
  if(updateContent){
    // res.send([content]);
    const post=req.params.postid;
    await updatePost(post,['content'],[content]);
  }
  
  res.send("Post updated");
};
export const delPost = async (req, res) => {
  res.send(await deletePost(req.params.postid));
};


