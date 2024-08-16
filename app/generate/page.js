'use client'

import { useState } from "react"
import { Container, TextField, Button, Typography, Box, Grid, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card } from "@mui/material"
import { writeBatch, doc, collection, userDocSnap, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useUser } from "@clerk/nextjs"

export default function Generate() {
    const {user} = useUser();
    const [text, setText] = useState('')
    const [flashcards, setFlashcards] = useState([])
    const [setName, setSetName] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [showBack, setShowBack] = useState({});

    const handleOpenDialog = () => setDialogOpen(true)
    const handleCloseDialog = () => setDialogOpen(false)

    const saveFlashcards = async () => {
        if (!user) {
            alert('User not found. Please log in.')
            return;
        }

        if (!setName.trim()) {
            alert('Please enter a name for your flashcard set.')
            return
        }

        try {
            const userDocRef = doc(collection(db, 'users'), user.id)
            const userDocSnap = await getDoc(userDocRef)

            const batch = writeBatch(db)

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data()
                const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
                batch.update(userDocRef, { flashcardSets: updatedSets })
            } else {
                batch.set(userDocRef, {
                    flashcardSets: [{
                        name: setName
                    }]
                })
            }
            const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
            batch.set(setDocRef, {flashcards})

            await batch.commit()

            alert('Flashcards saved successfully!')
            handleCloseDialog()
            setSetName('')
        } catch(error) {
            console.error('Error saving flashcards:', error)
            alert('An error occurred while saving flashcards. Please try again.')
        }
    }

    const handleCardClick = (index) => {
        setShowBack((prevShowBack) => ({ ...prevShowBack, [index]: !prevShowBack[index] }));
    }

    const handleSubmit = async() => {
        // implete api call here
        if (!text.trim()) {
            alert('Please enter some text to generate flashcards.')
            return
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
            setFlashcards(data)
        } catch (error) {
            console.error('Error generating flashcards', error)
            alert('An error occured while generate flashcards. Please try again.')
        }
    }

    return (
        <Container maxWidth='md'>
            <Box sx={{my:4}}>
                <Typography variant="h4" component="h1" gutterBottom>
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
                >
                    Generate Flashcards
                </Button>
                {flashcards.length > 0 && (
                    <Box sx={{ mt:4 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Generated Flashcards
                        </Typography>
                        <Grid container spacing={2}>
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card onClick={() => handleCardClick(index)}>
                                    <CardContent>
              {showBack[index] ? (
                <>
                  <Typography variant="h6">Back:</Typography>
                  <Typography>{flashcard.back}</Typography>
                </>
              ) : (
                <>
                  <Typography variant="h6">Front:</Typography>
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
            </Box>
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
        </Container>
    )
}