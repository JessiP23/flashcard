'use client'

import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, CardHeader, CardActions } from "@mui/material";
import { getFirestore, collection, getDoc, doc, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { db } from "../../firebase";

export default function Saved() {
    const { user, isSignedIn, isLoaded } = useUser();
    const [flashcardSets, setFlashcardSets] = useState([]);
    
    useEffect(() => {
        if (isSignedIn && user) {
            const fetchFlashcardSets = async () => {
                try {
                    const userDocRef = doc(db, 'users', user.id);
                    const flashcardSetsCollection = collection(userDocRef, 'flashcardSets');
                    const querySnapshot = await getDocs(flashcardSetsCollection);
                    
                    const sets = [];
                    for (const docSnap of querySnapshot.docs) {
                        const setDocRef = doc(db, 'users', user.id, 'flashcardSets', docSnap.id);
                        const setDoc = await getDoc(setDocRef);
                        const data = setDoc.data();
                        sets.push({ id: docSnap.id, ...data });
                    }
                    
                    setFlashcardSets(sets);
                } catch (error) {
                    console.error('Error fetching flashcard sets:', error);
                }
            };

            fetchFlashcardSets();
        }
    }, [isSignedIn, user]);

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return (
            <main className="flex items-center justify-center min-h-screen bg-gray-800">
                <div className="text-center p-6 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-4 text-cyan-800">You are not logged in</h1>
                    <p className="text-lg mb-6 text-cyan-700">Please log in to access this page.</p>
                    <Button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
                        Go to Home
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Saved Flashcards
            </Typography>
            {flashcardSets.length === 0 ? (
                <Typography variant="h6">No flashcards saved yet.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {flashcardSets.map((set) => (
                        <Grid item xs={12} sm={6} md={4} key={set.id}>
                            <Card sx={{ boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 }, borderRadius: 2 }}>
                                <CardHeader
                                    title={set.id} 
                                    sx={{ backgroundColor: 'lightblue', textAlign: 'center' }}
                                />
                                <CardContent sx={{ overflowY: 'auto', flexGrow: 1 }}>
                                    {set.flashcards && set.flashcards.map((flashcard, index) => (
                                        <div key={index} style={{ marginBottom: '10px' }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'darkblue' }}>
                                                {flashcard.front}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'grey', fontStyle: 'italic' }}>
                                                {flashcard.back}
                                            </Typography>
                                        </div>
                                    ))}
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">Edit</Button>
                                    <Button size="small" color="error">Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
