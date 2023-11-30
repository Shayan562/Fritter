import { NavBar } from "../componenets/NavBar.jsx"
import style from './css/Friends.module.scss'

export const Friends = () =>{
    return (
        <div>
            <NavBar/>
            <div className={style.grid}>
            <div className={style.post}>
                Friends Page
            </div>
            </div>
        </div>
    );

}