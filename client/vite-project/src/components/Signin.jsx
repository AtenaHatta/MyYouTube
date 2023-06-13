import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Sign in:', email, password);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Sign In
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSignIn} fullWidth>
        Sign In
      </Button>
    </Container>
  );
};

export default SignInForm;
