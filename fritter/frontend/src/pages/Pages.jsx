import { NavBar } from "../componenets/NavBar.jsx"
import style from './css/Pages.module.scss'
export const Pages = () =>{
    return(
        <div>
            <NavBar/>
            <div className={style.grid}>
            <div className={style.post}>
                Pages Page 
            </div>
        </div>
        
        </div>
    );

}