import { addMember, removeMember } from "../Database/members.js";
import { createPage, deletePage, exploreRandom, getPage, getPagesUserHasJoined, updatePage } from "../Database/page.js";
import { getPostsPageWithValidation } from "../Database/post.js";

export const pagesForUser = async (req,res)=>{
  const userid=req.headers.id;
  // console.log(userid);
  const pages= await getPagesUserHasJoined(userid);
  res.send(pages);
}

export const explorePages = async (req,res)=>{
  const userid=req.headers.id;
  const pages=await exploreRandom(userid)
  res.send(pages);
}

export const pageInfo = async (req, res) => {
  const page = await getPage(req.params.pageid);
  res.send(page);
};
export const pageComplete = async (req, res) => {
  const page = await getPage(req.params.pageid);
  const posts = await getPostsPageWithValidation(req.params.pageid);
  res.send({ pageInfo:page,posts:posts });
};
export const findPage = async (req, res) => {
//   const comments = await getComments(req.params.postid);
  res.send({message:"not found"});
  //   res.send(await getPostsFeed(req.headers.id));
};
export const newPage = async (req, res) => {
    const { creator_id, title } = req.body;
    await createPage({creator_id, title});
    res.send({ message: "created" });
};
export const editPage = async (req, res) => {
  const page=(req.params.pageid);
  const {title}=req.body
  await updatePage(page,['title'],[title]);
  res.send({message:'updated'});
};
export const delPage = async (req, res) => {
  const page = req.params.pageid;
  await deletePage(page);
  res.send({ message: "deleted" });
};
export const joinPage = async (req, res) => {
  const page = req.params.pageid;
  await addMember(req.headers.id,page,'member');
  res.send({ message: "joined" });
};
export const leavePage = async (req, res) => {
  const page = req.params.pageid;
  await removeMember(req.headers.id,page);
  res.send({ message: "left" });
};
