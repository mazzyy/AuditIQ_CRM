import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Iconify } from '../components/iconify';

export function ContactUs() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Dummy FAQ questions
  
  // Contact support information
  const supportInfo = {
    email: 'support@company.com',
    phone: '+1 (555) 123-4567',
    hours: 'Monday - Friday: 9:00 AM - 6:00 PM EST'
  };



  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We're dedicated to providing exceptional service and innovative solutions to help your business succeed.
        </Typography>
      </Box>

  
  

      {/* Contact Support Section */}
      <Box id="contact-support" sx={{ mb: 8 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Contact Support
        </Typography>
        <Card>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle1">Email</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {supportInfo.email}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle1">Phone</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {supportInfo.phone}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Iconify icon="mdi:clock-outline" sx={{ mr: 2, color: 'primary.main', width: 24, height: 24 }} />
                  <Box>
                    <Typography variant="subtitle1">Business Hours</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {supportInfo.hours}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              
            </Grid>
          </Box>
        </Card>
      </Box>

      
    </>
  );
}