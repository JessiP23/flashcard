'use client';
import React, { useState } from 'react';
import { Container, Box, Card, CardContent, Typography, AppBar, Toolbar, Button } from '@mui/material';
import dynamic from 'next/dynamic';

const SignedIn = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedIn), { ssr: false });
const SignedOut = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedOut), { ssr: false });
const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });

const Artificial = () => {
  const [showBack, setShowBack] = useState({});

  const flashcards = [
    { question: 'What is the primary function of AI in flashcard generation?', answer: ' To create flashcards automatically from input sources such as PDF files, notes, and images.' },
    { question: 'What is the name of the AI-powered quiz generator that can transform any content into a quiz?', answer: 'To create machines that can think and learn like humans.' },
    { question: 'What is the name of the AI system that can recognize and respond to voice commands', answer: 'Virtual assistant' },
    { question: 'What is the primary application of deep learning in artificial intelligence?', answer: " Image and speech recognition."},
    { question: 'What is the primary benefit of using artificial intelligence in business?', answer: 'Increased efficiency and productivity.' },
    { question: 'What is the term for the use of artificial intelligence to automate decision-making processes?', answer: 'Decision support system' },
    { question: 'What is the name of the first computer program that could simulate a conversation with a human?', answer: 'ELIZA' },
    { question: 'What is the name of the first computer program that could simulate a conversation with a human?', answer: 'To create intelligent machines that can perform any intellectual task that a human can, with the ability to reason, learn, and apply knowledge across a wide range of tasks and domains.' },
    { question: 'What is the role of reinforcement learning in artificial intelligence? ', answer: 'Reinforcement learning is a type of machine learning that involves training AI agents to make decisions based on rewards or penalties, with the goal of maximizing rewards and achieving optimal performance in complex, dynamic environments.' },
    { question: 'What is the term for the use of artificial intelligence to create artificial environments and simulations?', answer: 'Virtual Reality' },
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
                        width: '100%',
                        py: '40px',
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

export default Artificial;
