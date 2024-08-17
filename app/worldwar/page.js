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
    { question: 'What event marked the beginning of World War II? ', answer: 'The invasion of Poland by Germany on September 1, 1939' },
    { question: 'What was the code name for the Allied invasion of Normandy?', answer: 'Operation Overlord.' },
    { question: 'What was the Holocaust?', answer: 'The Holocaust was the systematic, state-sponsored persecution and murder of six million Jews and millions of others by the Nazi regime and its collaborators.' },
    { question: 'How did the United States enter World War II?', answer: "The United States entered World War II after Japan's attack on Pearl Harbor on December 7, 1941, which led to a declaration of war against Japan, and shortly after, Germany and Italy declared war on the U.S."},
    { question: 'What were the main causes of World War II?', answer: `The main causes of World War II include the Treaty of Versailles, the rise of fascism and militarism in Europe and Asia, the failure of appeasement, and the aggression of Axis powers.` },
    { question: 'How did the role of women change during World War II?', answer: "During World War II, the role of women expanded significantly as they took on jobs traditionally held by men, who were away fighting. Women worked in factories producing war materials, served in auxiliary military roles, and supported the war effort in various capacities. This shift challenged traditional gender roles and laid the groundwork for the post-war women's rights movement." },
    { question: 'What was the significance of the Battle of Midway?', answer: `It was a turning point in the Pacific Theater, favoring the Allies.` },
    { question: `What was the significance of the Battle of Stalingrad?`, answer: `The Battle of Stalingrad was a major turning point on the Eastern Front, where the Soviet Union successfully defended the city and began to push back the German forces.
        ` },
    { question: `What was the significance of the Potsdam Conference in 1945?`, answer:`The Potsdam Conference, held in July-August 1945, was significant as it was the last meeting of the Allied leaders during World War II. At Potsdam, the leaders discussed the administration of defeated Germany, the demilitarization and denazification of Germany, the borders of post-war Europe, and the terms of Japan's surrender. The conference also highlighted emerging tensions between the Soviet Union and Western Allies, setting the stage for the Cold War.` },
    { question: 'What was the main purpose of the Yalta Conference?', answer: 'To discuss the post-war reorganization of Europe.' },
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
                        padding: '20px',
                        width: '100%',
                        height: '100%', 
                        boxSizing: 'border-box', 
                        backgroundColor: '#ddd',
                        wordBreak: 'break-word', 
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888',
                            borderRadius: '10px',
                        },
                        }}
                    >
                        <Typography
                        variant="h6"
                        sx={{
                            textAlign: 'center',
                            overflowY: 'auto',
                            maxHeight: '100%', 
                            paddingRight: '10px', 
                        }}
                        >
                        {showBack[index] ? card.answer : card.question}
                        </Typography>
                    </CardContent>
                </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default FlashcardPage;
