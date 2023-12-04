import { CreatePost } from "../componenets/CreatePost";
import { NavBar } from "../componenets/NavBar";
import Post from "../componenets/Post";
import style from './css/PageView.module.scss'

export const PageView = () =>{
    return (
        <div>
            <NavBar/>
            <div className={style.heading}>
                <h1>Page Heading here</h1>
            </div>
            <div className={style.newpost}>
                <CreatePost/>
            </div>
            <div className={style.post}>
                <Post/>
            </div>

        </div>
    );
}