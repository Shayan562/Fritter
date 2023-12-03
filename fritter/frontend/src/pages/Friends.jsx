import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavBar } from "../componenets/NavBar.jsx"
import axios from 'axios'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Fritter
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Friends() {

const [data,setData]=React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token=sessionStorage.getItem('token');
        const id=sessionStorage.getItem('id');
        console.log(id);
        const res = await axios.get("http://localhost:5000/friends/"
        , {
          headers: {
            token:`${token}`,
            id:`${id}`,
            
            // userDetails,
            // id:userDetails.user_id
          },
        }
        );
        // setData(res.data);
        // console.log(res.data);
        // if(res.data){
        //   setFlag(true);
        // }
          // console.log(res.data);
          setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
fetchData(); // Invoke the async function

    // Cleanup function (if needed)
    return () => {
      // Perform cleanup here if necessary
    };
  }, []);

  return (
    <div>
        <NavBar/>
    <ThemeProvider theme={defaultTheme}>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
          >
        </Box>
        <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Connect With Friends
            </Typography>
          </Container>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Full Name
                    </Typography>
                    <Typography>
                      UserID
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="Large">Message</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
          >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
    </div>
  );
}

// import style from './css/Friends.module.scss'

// export const Friends = () =>{
//     return (
//         <div>
//             <NavBar/>
//             <div className={style.grid}>
//             <div className={style.post}>
//                 Friends Page
//             </div>
//             </div>
//         </div>
//     );

//}