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
    { question: 'What is the basic unit of life? ', answer: 'Cell' },
    { question: 'What is the process by which cells become specialized to perform specific functions?', answer: 'Differentiation' },
    { question: 'What is the scientific study of the classification, identification, and naming of organisms?', answer: 'Taxonomy' },
    { question: 'What is the process by which plants make their own food?', answer: "Photosynthesis"},
    { question: 'What is the structure and function of the cell membrane?', answer: `The cell membrane, also known as the plasma membrane, is a thin layer of lipid and protein molecules that surrounds every cell. Its structure is semi-permeable, allowing certain substances to pass through while keeping others out. The cell membrane's main functions are to:

Regulate what enters and leaves the cell
Provide mechanical support and maintain cell shape
Act as a barrier against external substances
Aid in cell signaling and communication` },
    { question: 'What is the difference between mitosis and meiosis, and when do they occur?', answer: 'Mitosis is the process of cell division that results in two daughter cells with the same number of chromosomes as the parent cell. Meiosis, on the other hand, is the process of cell division that occurs in reproductive cells (gametes) and results in four daughter cells with half the number of chromosomes as the parent cell. Mitosis occurs in somatic cells, while meiosis occurs in reproductive cells.' },
    { question: 'What is the process of gene expression, and how is it regulated?', answer: `Gene expression is the process by which the information encoded in a gene's DNA is converted into a functional product, such as a protein. This process involves transcription (creating a messenger RNA copy of the DNA) and translation (building a protein from the RNA sequence). Gene expression is regulated through various mechanisms, including:

Transcriptional regulation (controlling gene transcription)
Post-transcriptional regulation (controlling RNA processing and translation)
Epigenetic regulation (influencing gene expression without altering the DNA sequence)` },
    { question: ` What is the process of fermentation, and what are its applications? `, answer: `Fermentation is a metabolic process in which microorganisms, such as yeast or bacteria, convert organic compounds into energy in the absence of oxygen. This process has various applications, including:

Food production (e.g., bread, beer, yogurt)
Biofuel production
Pharmaceutical production
Waste management
        ` },
    { question: `What is the concept of biodiversity, and why is it important?`, answer:`Biodiversity refers to the variety of different species of plants, animals, and microorganisms that live in an ecosystem or on Earth as a whole. It is important because it:

Maintains ecosystem services, such as pollination and pest control
Provides a source of new medicines and other valuable resources
Supports food security and sustainable agriculture
Enhances ecosystem resilience to environmental changes` },
    { question: 'What is the scientific study of the behavior of organisms?', answer: 'Ethology' },
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
