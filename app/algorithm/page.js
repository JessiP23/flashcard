'use client';
import React, { useState } from 'react';
import { Container, Box, Card, CardContent, Typography, AppBar, Toolbar, Button } from '@mui/material';
import './flashcard.css';
import dynamic from 'next/dynamic';

const SignedIn = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedIn), { ssr: false });
const SignedOut = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedOut), { ssr: false });
const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });

const FlashcardPage = () => {
  const [showBack, setShowBack] = useState({});

  const flashcards = [
    { question: 'What is the time complexity of the Bubble Sort algorithm?', answer: 'O(n^2)' },
    { question: 'What is the primary advantage of using the Quicksort algorithm?', answer: 'Quicksort is generally faster and more efficient than other sorting algorithms, with an average time complexity of O(n log n).' },
    { question: 'What is the time complexity of the Merge Sort algorithm?', answer: 'O(n log n)' },
    { question: 'What is the difference between a Topological Sort and a Stable Sort algorithm?', answer: "A Topological Sort is used to order nodes in a directed acyclic graph (DAG), while a Stable Sort is used to maintain the relative order of equal elements."},
    { question: 'What is the time complexity of the Binary Search algorithm?', answer: 'O(log n)' },
    { question: 'What is the primary advantage of using the Dynamic Programming approach?', answer: 'Dynamic Programming allows for solving complex problems by breaking them down into smaller subproblems, solving each subproblem only once, and storing the solutions to subproblems to avoid redundant computation.' },
    { question: 'What is the time complexity of the Recursive Fibonacci sequence algorithm?', answer: 'O(2^n)' },
    { question: 'What is the difference between a Greedy algorithm and a Dynamic Programming algorithm? ', answer: 'A Greedy algorithm makes the locally optimal choice at each step, hoping it will lead to a global optimum, while a Dynamic Programming algorithm breaks down the problem into smaller subproblems and solves each subproblem only once.' },
    { question: 'What is the purpose of the Rabin-Karp algorithm?', answer: 'The Rabin-Karp algorithm is used to search for a pattern in a text, using a rolling hash to quickly filter out non-matching positions.' },
    { question: 'What is the primary advantage of using the Heap data structure?', answer: 'Heaps allow for efficient insertion and extraction of the maximum or minimum element, with an average time complexity of O(log n).' },
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

export default FlashcardPage;
