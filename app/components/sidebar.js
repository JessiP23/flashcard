'use client'

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, List, ListItem, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";

const Sidebar = () => {

    const [isClient, setIsClient] = useState(false);
    const {signOut} = useClerk()

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Box sx={{ width: '16.66%', backgroundColor: '#f5f5f5', p: 2, boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
        <Typography variant="h6" gutterBottom>
          Flashcard SaaS
        </Typography>
        <List className="mt-4">
          <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none'  }}>
            <Toolbar>
              {isClient && (
                <>
                  <SignedOut>
                    <Button href='/sign-in'>Login</Button>
                    <Button href='/sign-up'>Sign Up</Button>
                  </SignedOut>
                  <SignedIn>
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
                  <UserButton className="w-full h-full" />
                </div>  
                  </SignedIn>
                </>
              )}
            </Toolbar>
          </AppBar>
          <ListItem button className="pl-7 mt-5">
            <Button href="/" className="text-lg">Home</Button>
          </ListItem>
          <ListItem button className="pl-7 mt-5">
            <Button href="/generate" className="text-lg">Generate</Button>
          </ListItem>
          <ListItem button className="pl-7 mt-5">
            <Button href="/saved" className="text-lg">Saved</Button>
          </ListItem>
          <ListItem button className="pl-7 mt-5">
            <Button href="/" onClick={() => signOut({ redirectUrl: '/' })} className="text-lg">Logout</Button>
          </ListItem>
        </List>
      </Box>
    )
}


export default Sidebar;
