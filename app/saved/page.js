'use client'

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, AppBar, Toolbar } from "@mui/material";
import { getFirestore, collection, getDoc, doc, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { db } from "../../firebase";

const SignedIn = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedIn), { ssr: false });
const SignedOut = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedOut), { ssr: false });
const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });

export default function Saved() {
    const { user, isSignedIn, isLoaded } = useUser();
    const [flashcardSets, setFlashcardSets] = useState([]);
    const [selectedSetId, setSelectedSetId] = useState(null);
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    
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
        <Container maxWidth="100vw" sx={{ py: 4 }}>
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
            <Typography variant="h4" component="h1" sx={{ py: 10, textAlign: 'center' }} gutterBottom>
                Saved Flashcards
            </Typography>
            {flashcardSets.length === 0 ? (
                <Typography variant="h6">No flashcards saved yet.</Typography>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2} sx={{ overflowY: 'auto', padding: 2 }}>
                        {flashcardSets.map((set) => (
                            <Typography
                                key={set.id}
                                variant="body1"
                                component="div"
                                sx={{
                                    cursor: 'pointer',
                                    marginBottom: 2,
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    backgroundColor: 'primary.main',
                                    color: 'background.paper',
                                    textAlign: 'center',
                                    boxShadow: 3,
                                    transition: 'background-color 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                        boxShadow: 6,
                                    },
                                    '&:active': {
                                        backgroundColor: 'primary.dark',
                                        boxShadow: 3,
                                    }
                                }}
                                onClick={() => setSelectedSetId(selectedSetId === set.id ? null : set.id)}
                            >
                                {set.id}
                            </Typography>
                        ))}
                    </Grid>

                    <Grid item xs={12} md={10} sx={{ padding: 2 }}>
                        {selectedSetId && (
                            <Grid container spacing={2}>
                                {flashcardSets.find(set => set.id === selectedSetId)?.flashcards?.map((flashcard, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            sx={{
                                                boxShadow: 3,
                                                transition: '0.3s',
                                                '&:hover': { boxShadow: 6 },
                                                borderRadius: 2,
                                                cursor: 'pointer',
                                                height: 200,
                                                width: '100%',
                                                overflowY: 'auto',
                                            }}
                                            onClick={() => setExpandedCardIndex(expandedCardIndex === index ? null : index)}
                                        >
                                            <CardContent
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '100%',
                                                    overflowY: 'auto',
                                                    padding: 2,
                                                }}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ fontWeight: 'bold', color: 'darkblue', textAlign: 'center' }}
                                                >
                                                    {expandedCardIndex === index ? flashcard.back : flashcard.front}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            )}
        </Container>
    );
}
