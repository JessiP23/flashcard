'use client';
import React, { useState } from 'react';
import { Container, Box, Card, CardContent, Typography, AppBar, Toolbar, Button } from '@mui/material';
import dynamic from 'next/dynamic';

const SignedIn = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedIn), { ssr: false });
const SignedOut = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedOut), { ssr: false });
const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });

const FlashcardPage = () => {
  const [showBack, setShowBack] = useState({});

  const flashcards = [
    { question: 'What is the definition of a variable in algebra?', answer: 'A symbol that represents a value that can change.' },
    { question: 'What is the difference between an expression and an equation?', answer: 'An expression is a group of numbers, variables, and operations, while an equation is a statement that says two expressions are equal.' },
    { question: 'What is a coefficient in an algebraic expression?', answer: 'A coefficient is a number that multiplies a variable or a product of variables.' },
    { question: 'What is a monomial?', answer: "A monomial is an algebraic expression with only one term."},
    { question: 'What is the difference between a linear and quadratic equation?', answer: 'A linear equation has a degree of 1, while a quadratic equation has a degree of 2' },
    { question: 'Factor the expression x^2 + 5x + 6', answer: '(x + 3)(x + 2)' },
    { question: 'Solve for y in the equation 4y - 2 = 16', answer: 'y=5' },
    { question: `Factor the expression : x^2 + 5x + 6 `, answer: `Step 1: Look for two numbers whose product is 6 and whose sum is 5  (2 and 3)
        Step 2: Write the factored expression (x+2)(x+3)
        ` },
    { question: `Solve the inequality
        2x - 3 > 5`, answer:`Step 1: Add 3 to both sides 2x - 3 + 3 > 5 + 3 2x > 8
        Step 2: Divide both sides by 2 x > 4` },
    { question: 'What is the range of a function?', answer: 'The set of all possible output values for a function.' },
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
