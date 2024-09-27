'use client';
import dynamic from 'next/dynamic';

import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Grid, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card, AppBar, Toolbar } from "@mui/material";
import { writeBatch, doc, collection, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const SignedIn = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedIn), { ssr: false });
const SignedOut = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignedOut), { ssr: false });
const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });

export default function Generate() {
    const { user, isSignedIn, isLoaded } = useUser();
    const [text, setText] = useState('');
    const [flashcards, setFlashcards] = useState([]);
    const [setName, setSetName] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showBack, setShowBack] = useState({});

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);

    const saveFlashcards = async () => {
        if (!user) {
            alert('User not found. Please log in.');
            return;
        }

        if (!setName.trim()) {
            alert('Please enter a name for your flashcard set.');
            return;
        }

        try {
            const userDocRef = doc(collection(db, 'users'), user.id);
            const userDocSnap = await getDoc(userDocRef);

            const batch = writeBatch(db);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                const updatedSets = [...(userData.flashcardSets || []), { name: setName }];
                batch.update(userDocRef, { flashcardSets: updatedSets });
            } else {
                batch.set(userDocRef, {
                    flashcardSets: [{ name: setName }]
                });
            }
            const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName);
            batch.set(setDocRef, { flashcards });

            await batch.commit();

            alert('Flashcards saved successfully!');
            handleCloseDialog();
            setSetName('');
        } catch (error) {
            console.error('Error saving flashcards:', error);
            alert('An error occurred while saving flashcards. Please try again.');
        }
    };

    if (!isLoaded) {
        return null;
    }

    const handleCardClick = (index) => {
        setShowBack((prevShowBack) => ({ ...prevShowBack, [index]: !prevShowBack[index] }));
    };

    const handleSubmit = async () => {
        if (!text.trim()) {
            alert('Please enter some text to generate flashcards.');
            return;
        }
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) {
                throw new Error('Failed to generate flashcards');
            }
            const data = await response.json();
            setFlashcards(data);
        } catch (error) {
            console.error('Error generating flashcards', error);
            alert('An error occurred while generating flashcards. Please try again.');
        }
    };

    if (isSignedIn) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
                <Container maxWidth="md" sx={{ py: 4, flexGrow: 1 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
                        Generate Flashcards
                    </Typography>
                    <TextField
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        label="Enter Text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{
                            mb: 2,
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white"
                                },
                                "&:hover fieldset": {
                                    borderColor: "white"
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "white"
                                }
                            },
                            "& .MuiInputLabel-root": {
                                color: "white"
                            },
                            "& .MuiOutlinedInput-input": {
                                color: "white"
                            }
                        }}
                        color="secondary"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        fullWidth
                        sx={{ mb: 4 }}
                    >
                        Generate Flashcards
                    </Button>
                    {flashcards.length > 0 && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Generated Flashcards
                            </Typography>
                            <Grid container spacing={2}>
                                {flashcards.map((flashcard, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            onClick={() => handleCardClick(index)}
                                            sx={{ cursor: 'pointer', boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 }, height: '200px', width: '100%', display: 'flex', flexDirection:'column' }}
                                        >
                                            <CardContent sx={{ overflowY: 'auto', flexGrow: 1 }}>
                                                {showBack[index] ? (
                                                    <>
                                                        <Typography variant="h6"></Typography>
                                                        <Typography>{flashcard.back}</Typography>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Typography variant="h6"></Typography>
                                                        <Typography>{flashcard.front}</Typography>
                                                    </>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            {flashcards.length > 0 && (
                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                                        Save Flashcards
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    )}
                </Container>
                <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>Save Flashcard Set</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your flashcard set.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Set Name"
                            type="text"
                            fullWidth
                            value={setName}
                            onChange={(e) => setSetName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={saveFlashcards} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="text-center p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-cyan-800">You are not logged in</h1>
                <p className="text-lg mb-6 text-cyan-700">Please log in to access this page.</p>
                <Link href="/">
                    <Button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
                        Go to Home
                    </Button>
                </Link>
            </div>
        </main>
    );
}
