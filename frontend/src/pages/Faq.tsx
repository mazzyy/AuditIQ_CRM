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

export function Faq() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Dummy FAQ questions
  const faqs = [
    {
      id: 'panel1',
      question: 'What services do you offer?',
      answer: 'We offer a comprehensive range of services including software development, consulting, and technical support for businesses of all sizes.'
    },
    {
      id: 'panel2',
      question: 'How can I get started with your platform?',
      answer: 'Getting started is easy! Simply create an account, explore our documentation, and contact our support team if you need any assistance.'
    },
    {
      id: 'panel3',
      question: 'What are your business hours?',
      answer: 'Our support team is available Monday through Friday from 9:00 AM to 6:00 PM EST. Emergency support is available 24/7.'
    },
    {
      id: 'panel4',
      question: 'Do you offer custom solutions?',
      answer: 'Yes, we specialize in creating custom solutions tailored to your specific business needs. Contact our team to discuss your requirements.'
    }
  ];

  // Contact support information
  const supportInfo = {
    email: 'support@company.com',
    phone: '+1 (555) 123-4567',
    hours: 'Monday - Friday: 9:00 AM - 6:00 PM EST'
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
   

      {/* FAQs Section */}
      <Box id="faqs" sx={{ mb: 8 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Frequently Asked Questions
        </Typography>
        <Card>
          <Box sx={{ p: 3 }}>
            {faqs.map((faq) => (
              <Accordion
                key={faq.id}
                expanded={expanded === faq.id}
                onChange={handleChange(faq.id)}
                sx={{ mb: 1 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${faq.id}-content`}
                  id={`${faq.id}-header`}
                >
                  <Typography variant="subtitle1">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Card>
      </Box>

     
      
    </>
  );
}