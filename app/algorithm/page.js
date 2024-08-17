'use client';
import React, { useState } from 'react';
import { Container, Box, Card, CardContent, Typography, AppBar, Toolbar, Button } from '@mui/material';
import dynamic from 'next/dynamic';

const SignedIn = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedIn), { ssr: false });
const SignedOut = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedOut), { ssr: false });
const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });

const Algorithm = () => {
  const [showBack, setShowBack] = useState({});

  const flashcards = [
    { question: ' What is the term for the pattern of strong and weak beats in music?', answer: 'Rhythm' },
    { question: 'What is the primary function of a metronome in music?', answer: ' A metronome is a tool that helps musicians keep a steady tempo by producing a click or sound at a specific rate, allowing them to play in time with the desired rhythm.' },
    { question: 'What is the difference between a major and minor key in music?', answer: 'A major key typically has a bright, happy sound, while a minor key has a more somber, melancholic sound. This is due to the specific pattern of whole and half steps used in each key.' },
    { question: 'Who is credited with developing the modern system of musical notation?', answer: "Guido d'Arezzo"},
    { question: 'What is the purpose of a cadence in music?', answer: 'A cadence is a series of chords that conclude a piece of music, providing a sense of finality and resolution. Cadences can be used to signal the end of a section or the entire piece.' },
    { question: 'What is the role of timbre in music?', answer: 'Timbre refers to the unique "tone color" or sound quality of a particular instrument or voice. Timbre is what allows us to distinguish between different instruments or voices, even when playing the same pitch.' },
    { question: 'Which musical term means "very fast" or "very quick"?', answer: 'Presto' },
    { question: 'What is the term for the process of transcribing a piece of music from one instrument or voice to another?', answer: 'Arrangement refers to the process of adapting a piece of music for a different instrument or voice, often involving changes to the melody, harmony, or rhythm.' },
    { question: 'What is the difference between a sonata and a suite?', answer: 'A sonata is a multi-movement work that typically features a fast-slow-fast structure, while a suite is a collection of dances or movements that are often performed in a specific order.' },
    { question: 'What is the role of articulation in music?', answer: 'Articulation refers to the way notes are attacked and released, with different articulations (such as legato or staccato) affecting the overall sound and feel of a piece.' },
  ];

  const handleCardClick = (index) => {
    setShowBack((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Container>
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
        <Box display='flex' flexDirection='column' alignItems="center" mt={4}>
            <Typography variant='h3' sx={{ py: 5 }}>Flashcards</Typography>
            <Box 
                display="flex" 
                flexWrap="wrap" 
                gap={2} 
                justifyContent="center"
            >
            {flashcards.map((card, index) => (
                <Card
                key={index}
                onClick={() => handleCardClick(index)}
                sx={{
                    cursor: 'pointer',
                    boxShadow: 3,
                    transition: '0.3s',
                    '&:hover': { boxShadow: 6 },
                    height: '300px',
                    width: '300px', 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: "40px"
                }}
                >
                    <CardContent
                        sx={{
                        overflowY: 'auto',
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#ddd',
                        variant: 'body1'
                        }}
                    >
                        {showBack[index] ? (
                        <>
                            <Typography py={6} variant="h6" sx={{ textAlign:'center' }}>{card.answer}</Typography>
                        </>
                        ) : (
                        <>
                            
                            <Typography variant="h6" sx={{ textAlign:'center' }}>{card.question}</Typography>
                        </>
                        )}
                    </CardContent>
                </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Algorithm;
