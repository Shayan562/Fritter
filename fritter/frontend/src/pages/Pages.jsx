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
import { useNavigate } from 'react-router-dom';
import style from './css/Pages.module.scss'

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


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pages(props) {
  const navigate=useNavigate();
  const userID=props.userID;

  const [joinedPageData,setJoinedPageData]=React.useState([]);
  const [explorePageData, setExplorePageData]=React.useState([]);
  const redirectToPage = (pageID) => {
    // console.log(pageID);
    navigate("/community", {
        state: {
            pageID: `${pageID}`
        },
    });
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token=sessionStorage.getItem('token');
        const id=sessionStorage.getItem('id');
        console.log(id);
        // http://localhost:5000/pages/joined for pages
        const res = await axios.get("http://localhost:5000/pages/joined"
        , {
          headers: {
            token:`${token}`,
            id:`${id}`,
          },
        }
        );
          setJoinedPageData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Invoke the async function
    // Cleanup function (if needed)
    return () => {
    };
  }, []);


React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token=sessionStorage.getItem('token');
        const id=sessionStorage.getItem('id');
        console.log(id);
        // http://localhost:5000/pages/joined for pages
        const res = await axios.get("http://localhost:5000/pages/explore"
        , {
          headers: {
            token:`${token}`,
            id:`${id}`,
          },
        }
        );
        setExplorePageData(res.data);
          // setExplorePageData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Invoke the async function
    // Cleanup function (if needed)
    return () => {
    };
  }, []);

  return (
    <div>
        <NavBar/>
    <ThemeProvider theme={defaultTheme}>
      {/* Users Pages */}
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
              Your Pages
            </Typography>
          </Container>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {joinedPageData?.map((page) => (
              <Grid item key={page.page_id} xs={12} sm={6} md={4}>
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
                      {page.title}
                    </Typography> 
                  </CardContent>
                  <CardActions>
                    <Button size="Large" onClick={()=>{redirectToPage(page.page_id)}}>View Page</Button>
                    <Button size='Large'>Leave</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* New Page */}
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
              Explore Pages
            </Typography>
          </Container>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {explorePageData?.map((page) => (
              <Grid item key={page.page_id} xs={12} sm={6} md={4}>
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
                      {page.title}
                    </Typography> 
                  </CardContent>
                  <CardActions>
                    <Button size="Large" onClick={()=>{redirectToPage(page.page_id)}}>View Page</Button>
                    <Button size="Large">Join</Button>
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
// import { NavBar } from "../componenets/NavBar.jsx"
// import style from './css/Pages.module.scss'
// export const Pages = () =>{
//     return(
//         <div>
//             <NavBar/>
//             <div className={style.grid}>
//             <div className={style.post}>
//                 Pages Page 
//             </div>
//         </div>
        
//         </div>
//     );

// }