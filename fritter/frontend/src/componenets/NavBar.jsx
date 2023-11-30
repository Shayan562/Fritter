import style from './css/NavBar.module.scss'
import {  useNavigate } from "react-router-dom";
import { AppBar, Toolbar , Typography, Stack, Button } from "@mui/material"

export const  NavBar = () =>{
   const navigate=useNavigate();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                    <div className={style.logo}>
                    <a href='http://localhost:3000/Home'>Fritter</a>
                    </div>
                </Typography>
                <Stack direction='row' spacing='2' >
                    <Button onClick={()=>{ navigate("/profile");}} color="inherit">Profile</Button>
                    <Button onClick={()=>{ navigate("/pages");}} color="inherit">Pages</Button>
                    <Button onClick={()=>{ navigate("/friends");}} color="inherit">Friends</Button>
                </Stack>

            </Toolbar>

        </AppBar>
    )
}