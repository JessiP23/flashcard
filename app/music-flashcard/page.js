'use client';
import React, { useState } from 'react';
import { Container, Box, Card, CardContent, Typography } from '@mui/material';
import './flashcard.css';

const FlashcardPage = () => {
  const [showBack, setShowBack] = useState({});

  const flashcards = [
    { question: 'Question 1', answer: 'Answer 1' },
    { question: 'Question 2', answer: 'Answer 2' },
    { question: 'Question 3', answer: 'Answer 3' },
    { question: 'Question 4', answer: 'Answer 1' },
    { question: 'Question 5', answer: 'Answer 2' },
    { question: 'Question 6', answer: 'Answer 3' },
    { question: 'Question 7', answer: 'Answer 1' },
    { question: 'Question 8', answer: 'Answer 2' },
    { question: 'Question 9', answer: 'Answer 3' },
    { question: 'Question 10', answer: 'Answer 3' },
  ];

  const handleCardClick = (index) => {
    setShowBack((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Container>
      <Box display='flex' flexDirection='column' alignItems="center" mt={4}>
        <Typography sx={{ py: 5 }}>Flashcards</Typography>
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
                }}
              >
                {showBack[index] ? (
                  <>
                    <Typography variant="h6" sx={{ mb: 1 }}>Answer</Typography>
                    <Typography variant="body1">{card.answer}</Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" sx={{ mb: 1 }}>Question</Typography>
                    <Typography variant="body1">{card.question}</Typography>
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
