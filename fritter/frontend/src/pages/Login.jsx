
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import style from "./css/Login.module.scss"

export const Login =  () => {
    return (
        <div className={style.container}>
                <form className={style.in}>
                    <div clas>  
                    <TextField
                        id="outlined-password-input"
                        label="Username"
                        type="text"
                        autoComplete="current-password"
                        />
                    </div>
                    <br></br>
                    <div>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        />
                    </div>
                    <br></br>
                    <div className={style.button}>
                    <Button variant="contained">Login</Button>
                    <Button variant="contained">SignUp</Button>
                    </div>
                    
                </form>
        </div>
    )
}