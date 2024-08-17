'use client'

import dynamic from 'next/dynamic';
import { AppBar, Toolbar, Typography, Button, Box, Grid, CssBaseline, Container } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './page.css'
import Image from 'next/image';
import saas from './public/images/saas.jpg'
import saas1 from './public/images/saas1.jpg'
import saas2 from './public/images/saas2.jpg'
import image from './public/images/image.jpg'
import image1 from './public/images/image1.jpg'
import image2 from './public/images/image2.jpg'
import music from './public/images/music.jpg'
import artificial from './public/images/artificial.jpg'
import algorithm from './public/images/algorithm.jpg'
import algebra from './public/images/algebra.jpg'
import biology from './public/images/biology.jpg'
import war from './public/images/war.jpg'
import Link from 'next/link';


// Dynamically import Clerk components
const SignedIn = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedIn), { ssr: false });
const SignedOut = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedOut), { ssr: false });
const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcards
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/generate">Generate</Button>
          <Button color="inherit" href="/saved">Saved</Button>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
          </SignedOut>
        </Toolbar>
      </AppBar>

      <Box className="hero-section">
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ py: 8 }}>
            <Typography variant="h2" component="h1" color="secondary" gutterBottom>
              Welcome to Flashcard SaaS
            </Typography>
            <Typography variant="h5" component="h2" color="secondary" gutterBottom>
              The easiest way to create flashcards from your text.
            </Typography>
            <Box mt={4}>
              <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} href="/generate">
                Get Started
              </Button>
              <Button variant="outlined" color="secondary" sx={{ mt: 2 }} href="/learn-more">
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container>
      <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Image src={image} alt="Feature 1" width={300} height={300} style={{ marginBottom: '16px' }} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Image src={image1} alt="Feature 1" width={300} height={300} style={{ marginBottom: '16px' }}/>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Image src={image2} alt="Feature 1" width={300} height={300} style={{ marginBottom: '16px' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" sx={{ py: 25 }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', py: 15 }} gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Image src={saas} alt="Feature 1" width={300} height={300} style={{ marginBottom: '16px' }} />
              <Typography variant="h6">Easy to Use</Typography>
              <Typography>Simple interface to create flashcards quickly.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Image src={saas1} alt="Feature 1" width={300} height={300} style={{ marginBottom: '16px' }}/>
              <Typography variant="h6">AI-Powered</Typography>
              <Typography>Leverage AI to generate flashcards effortlessly.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Image src={saas2} alt="Feature 1" width={300} height={300} style={{ marginBottom: '16px' }} />
              <Typography variant="h6">Cross-Platform</Typography>
              <Typography>Access your flashcards anywhere, anytime.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container>
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', py: 15 }} gutterBottom>
          Explore existing Flashcard sets
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Link href='/algorithm'>
              <Box textAlign="center" style={{ cursor: 'pointer' }}>
                <Image src={algorithm} alt="Feature 1" width={300} height={300} style={{ marginBottom: '16px' }} />
                <Typography variant="h6">Algorithm</Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link href='/artificial'>
              <Box textAlign="center" style={{ cursor: 'pointer' }}>
                <Image src={artificial} alt="Feature 1" width={300} height={300} style={{ marginBottom: '16px' }}/>
                <Typography variant="h6">Artificial Intelligence</Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link href='/music-flashcard'>
              <Box textAlign="center" style={{ cursor: 'pointer' }}>
                <Image src={music} alt="Feature 1" width={300} height={300} style={{ marginBottom: '16px' }} />
                <Typography variant="h6">Music</Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link href='/algebra'>
              <Box textAlign="center" style={{ cursor:'pointer' }}>
                <Image src={algebra} alt="Feature 1" width={300} height={300} style={{ marginBottom: '16px' }} />
                <Typography variant="h6">Algebra</Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link href='/biology'>
              <Box textAlign="center" style={{ cursor: 'pointer' }}>
                <Image src={biology} alt="Feature 1" width={300} height={300} style={{ marginBottom: '16px' }} />
                <Typography variant="h6">Biology</Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link href='/worldwar'>
              <Box textAlign="center" style={{cursor:'pointer'}}>
                <Image src={war} alt="Feature 1" width={300} height={300} style={{ marginBottom: '16px' }} />
                <Typography variant="h6">World War II</Typography>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ p: 2, backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', textAlign: 'center' }}>
        <Typography variant="h6" component="p">© 2024 Flashcard SaaS. All rights reserved.</Typography>
      </Box>
    </ThemeProvider>
  );
}
