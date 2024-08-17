import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {

  return (
    <AppBar position="static">
    <Toolbar
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // Makes the Toolbar take full viewport height for vertical centering
            padding: 0, // Remove any padding
        }}
    >
        <Typography variant="h4" component="h1" gutterBottom>
            Sign In
        </Typography>
        <SignIn />
    </Toolbar>
</AppBar>

  )
}