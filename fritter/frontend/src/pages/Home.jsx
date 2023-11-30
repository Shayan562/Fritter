import { NavBar } from "../componenets/NavBar.jsx"
import Post from "../componenets/Post.jsx"
import style from './css/Home.module.scss'

export const Home = () =>{
    return (
        <div>
        <NavBar/>
        <div className={style.grid}>
            <div className={style.post}>
                <Post title={'My First Post'} date={'Lol'} body={'My name is Muhammad Rehan Khan'}/>
            </div>
        </div>
        </div>
    )
}