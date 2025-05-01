'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Tabs,
  Tab,
  Alert,
  Paper,
  Avatar,
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../SessionContext';
import type { Session } from '@toolpad/core/AppProvider';

// Replace with your real logo URL & brand name
const LOGO_URL = 'https://via.placeholder.com/80';
const BRAND_NAME = 'AduitIQ';

// Simulated Sign-In function
const fakeAsyncGetSession = async (formData: FormData): Promise<Session> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Sign In:', JSON.stringify(Object.fromEntries(formData)));
      if (formData.get('password') !== '') {
        resolve({
          user: {
            name: 'Harry Ho',
            email: (formData.get('email') as string) || '',
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      }
      reject(new Error('Incorrect credentials.'));
    }, 1000);
  });
};

// Simulated Register function
const fakeAsyncRegister = async (formData: FormData): Promise<Session> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Register:', JSON.stringify(Object.fromEntries(formData)));
      if (formData.get('password') !== '') {
        resolve({
          user: {
            name: (formData.get('name') as string) || 'New User',
            email: (formData.get('email') as string) || '',
            image: 'https://avatars.githubusercontent.com/u/00000000',
          },
        });
      }
      reject(new Error('Registration failed.'));
    }, 1000);
  });
};

// Simulated Google Sign-In function
const fakeGoogleSignIn = async (): Promise<Session> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          name: 'Google User',
          email: 'googleuser@example.com',
          image: 'https://avatars.githubusercontent.com/u/00000000',
        },
      });
    }, 1000);
  });
};

export default function AuthView() {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [error, setError] = useState<string | null>(null);
  const { setSession } = useSession();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      let session: Session;
      if (mode === 'signin') {
        session = await fakeAsyncGetSession(formData);
      } else {
        session = await fakeAsyncRegister(formData);
      }
      setSession(session);  // ✅ TS-safe now
      navigate('/', { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      const session = await fakeGoogleSignIn();
      setSession(session);
      navigate('/', { replace: true });
    } catch {
      setError('Google sign-in failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        {/* Logo + Brand */}
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ mb: 3 }}>
          <Avatar src={LOGO_URL} sx={{ width: 80, height: 80, mb: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            {BRAND_NAME}
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={mode}
          onChange={(_, newValue) => {
            setMode(newValue);
            setError(null);
          }}
          variant="fullWidth"
          sx={{ marginBottom: 3 }}
        >
          <Tab label="Sign In" value="signin" />
          <Tab label="Register" value="register" />
        </Tabs>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {mode === 'register' && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {mode === 'signin' ? 'Sign In' : 'Register'}
          </Button>
        </Box>

        <Typography align="center" sx={{ mt: 2, mb: 1 }}>
          OR
        </Typography>

        {/* Google Sign In */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
        >
          {mode === 'signin' ? 'Sign in with Google' : 'Register with Google'}
        </Button>
      </Paper>
    </Container>
  );
}
