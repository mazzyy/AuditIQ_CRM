import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function ComingSoon() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animatedElements, setAnimatedElements] = useState({
    header: false,
    subheader: false,
    card: false,
    form: false,
    countdown: false
  });

  // Simulated launch date (3 months from now)
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 3);
  
  // State for countdown
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Progress bar animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Staggered animations for elements
  useEffect(() => {
    const animationTimers = [
      setTimeout(() => setAnimatedElements(prev => ({ ...prev, header: true })), 300),
      setTimeout(() => setAnimatedElements(prev => ({ ...prev, subheader: true })), 800),
      setTimeout(() => setAnimatedElements(prev => ({ ...prev, card: true })), 1200),
      setTimeout(() => setAnimatedElements(prev => ({ ...prev, form: true })), 1600),
      setTimeout(() => setAnimatedElements(prev => ({ ...prev, countdown: true })), 2000)
    ];

    return () => {
      animationTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setNotificationOpen(true);
      setEmail('');
    }, 1500);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotificationOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 5, textAlign: 'center' }}>
        <Fade in={animatedElements.header} timeout={1000}>
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Something Amazing Is Coming Soon
          </Typography>
        </Fade>
        
        <Fade in={animatedElements.subheader} timeout={1000}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            We're working hard to bring you the best experience. Stay tuned!
          </Typography>
        </Fade>
      </Box>

      <Fade in={animatedElements.card} timeout={1000}>
        <Card 
          sx={{ 
            p: 4, 
            mb: 4,
            borderRadius: 2,
            boxShadow: '0 8px 24px -4px rgba(145, 158, 171, 0.12)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              height: 5
            }} 
          />
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <AccessTimeIcon 
                  sx={{ 
                    fontSize: 80, 
                    color: 'primary.main', 
                    mb: 3,
                    animation: 'pulse 2s infinite ease-in-out',
                    '@keyframes pulse': {
                      '0%': {
                        transform: 'scale(1)',
                        opacity: 1
                      },
                      '50%': {
                        transform: 'scale(1.05)',
                        opacity: 0.8
                      },
                      '100%': {
                        transform: 'scale(1)',
                        opacity: 1
                      }
                    }
                  }} 
                />
                
                <Typography variant="h5" gutterBottom>
                  Launching In
                </Typography>
                
                <Fade in={animatedElements.countdown} timeout={1000}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-around',
                      my: 3
                    }}
                  >
                    {[
                      { label: 'Days', value: countdown.days },
                      { label: 'Hours', value: countdown.hours },
                      { label: 'Minutes', value: countdown.minutes },
                      { label: 'Seconds', value: countdown.seconds }
                    ].map((item, index) => (
                      <Box 
                        key={index}
                        sx={{ 
                          textAlign: 'center',
                          p: 1,
                          borderRadius: 1,
                          bgcolor: 'rgba(33, 150, 243, 0.1)',
                          minWidth: 60
                        }}
                      >
                        <Typography 
                          variant="h4" 
                          sx={{ fontWeight: 'bold', color: 'primary.main' }}
                        >
                          {item.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Fade>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Fade in={animatedElements.form} timeout={1000}>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Get Notified When We Launch
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Be the first to know when Its launch. Subscribe for updates.
                  </Typography>
                  
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      type="email"
                      sx={{ mb: 2 }}
                    />
                    
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={isSubmitting}
                      sx={{ 
                        py: 1.5,
                        position: 'relative',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 16px -4px rgba(33, 150, 243, 0.4)'
                        },
                        transition: 'transform 0.3s, box-shadow 0.3s'
                      }}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        <>
                          <MarkEmailReadIcon sx={{ mr: 1 }} />
                          Notify Me
                        </>
                      )}
                    </Button>
                  </form>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Card>
      </Fade>

      <Fade in={true} timeout={2000}>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ 
              '&:hover': { transform: 'translateX(-4px)' },
              transition: 'transform 0.3s'
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Fade>

      <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Thanks! We'll notify you when we launch.
        </Alert>
      </Snackbar>
    </Container>
  );
}