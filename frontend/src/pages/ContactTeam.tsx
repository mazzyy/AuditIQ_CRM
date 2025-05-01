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

export function ContactTeam() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

 
  

  // Contact team information
  const teamMembers = [
    {
      name: 'Jane Smith',
      role: 'Customer Success Manager',
      email: 'jane.smith@company.com',
      phone: '+1 (555) 987-6543'
    },
    {
      name: 'John Doe',
      role: 'Technical Support Lead',
      email: 'john.doe@company.com',
      phone: '+1 (555) 456-7890'
    },
    {
      name: 'Sarah Johnson',
      role: 'Sales Representative',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 234-5678'
    }
  ];

  return (
    <>
      
    
      {/* Contact Team Section */}
      <Box id="contact-team" sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Contact Team
        </Typography>
        <Grid container spacing={3}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {member.role}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, color: 'text.secondary', width: 20, height: 20 }} />
                    <Typography variant="body2">{member.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon sx={{ mr: 1, color: 'text.secondary', width: 20, height: 20 }} />
                    <Typography variant="body2">{member.phone}</Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}