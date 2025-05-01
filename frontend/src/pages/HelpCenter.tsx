import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export function HelpCenter() {
  const navigate = useNavigate();

  const handleNavigation = (path: string): void => {
    navigate(path);
  };

  return (
    <>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Help Center
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to our Help Center. How can we assist you today?
        </Typography>
      </Box>

      <Container maxWidth="md">
        <Grid container spacing={4} justifyContent="center">
          {/* FAQs Button Card */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                p: 3, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px -4px rgba(145, 158, 171, 0.12)'
                }
              }}
            >
              <QuestionAnswerIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Frequently Asked Questions
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                Find answers to common questions about our services, platform, and policies.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                fullWidth
                onClick={() => handleNavigation('/Faq')}
              >
                View FAQs
              </Button>
            </Card>
          </Grid>

          {/* Contact Support Button Card */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                p: 3, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px -4px rgba(145, 158, 171, 0.12)'
                }
              }}
            >
              <SupportAgentIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Contact Support
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                Need technical assistance? Our support team is ready to help with any issues.
              </Typography>
              <Button 
                variant="contained"
                size="large"
                fullWidth
                onClick={() => handleNavigation('/ContactUs')}
              >
                Get Support
              </Button>
            </Card>
          </Grid>

          {/* Contact Team Button Card */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                p: 3, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px -4px rgba(145, 158, 171, 0.12)'
                }
              }}
            >
              <PeopleAltIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Contact Team
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                Connect with our team members for inquiries about partnerships or business.
              </Typography>
              <Button 
                variant="contained"
                size="large"
                fullWidth
                onClick={() => handleNavigation('/ContactTeam')}
              >
                Meet The Team
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Additional help resources section could be added here */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Can't find what you're looking for? Email us at <strong>support@company.com</strong>
        </Typography>
      </Box>
    </>
  );
}