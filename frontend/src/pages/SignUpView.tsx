'use client';
import * as React from 'react';
import { SignInPage } from '@toolpad/core/SignInPage';
import type { Session } from '@toolpad/core/AppProvider';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../SessionContext';

const fakeAsyncSignUp = async (formData: any): Promise<Session> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Sign up form data:', JSON.stringify(formData));
      const email = formData.get('email');
      const password = formData.get('password');

      if (email && password) {
        resolve({
          user: {
            name: formData.get('name') || 'New User',
            email: email,
            image: 'https://avatars.githubusercontent.com/u/12345678',
          },
        });
      } else {
        reject(new Error('Email and password are required.'));
      }
    }, 1000);
  });
};

const fakeGoogleSignUp = async (): Promise<Session> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          name: 'Google New User',
          email: 'newgoogleuser@example.com',
          image: 'https://avatars.githubusercontent.com/u/00000001',
        },
      });
    }, 1000);
  });
};

export default function SignUpView() {
  const { setSession } = useSession();
  const navigate = useNavigate();

  return (
    <SignInPage
      providers={[
        { id: 'credentials', name: 'Credentials' },
        { id: 'google', name: 'Google' },
      ]}
      signIn={async (provider, formData, callbackUrl) => {
        try {
          let session: Session | null = null;

          if (provider.id === 'credentials') {
            session = await fakeAsyncSignUp(formData);
          } else if (provider.id === 'google') {
            session = await fakeGoogleSignUp();
          }

          if (session) {
            setSession(session);
            navigate(callbackUrl || '/', { replace: true });
            return {};
          }
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : 'An error occurred',
          };
        }
        return {};
      }}
      title="Sign Up"
      subtitle="Create a new account using your email or Google"
    />
  );
}
