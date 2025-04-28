import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';

import { Iconify } from '../components/iconify';
import { RouterLink } from '../routes/components';

// Define type for report template
interface ReportTemplate {
  id: number;
  title: string;
  style: string;
  companies: string[];
  image: string;
}

// Define type for company option
interface CompanyOption {
  value: string;
  label: string;
}

// Mock report data
const reportTemplates: ReportTemplate[] = [
  {
    id: 1,
    title: 'Food Safety & Quality',
    style: 'Style 1: Trend Report',
    companies: ['ztech', 'acme'],
    image: '/public/assets/template.svg'
  },
  {
    id: 2,
    title: 'Construction Quality',
    style: 'Style 1: Trend Report',
    companies: ['ztech', 'buildco'],
    image: 'public/assets/template.svg'
  },
  {
    id: 3,
    title: 'Construction Safety',
    style: 'Style 1: Trend Report',
    companies: ['ztech', 'buildco'],
    image: 'public/assets/template.svg'
  },
  {
    id: 4,
    title: 'Template3',
    style: 'Style 1: Trend Report',
    companies: ['ztech'],
    image: 'public/assets/template.svg'
  }
];

// Available companies
const companies: CompanyOption[] = [
  { value: 'ztech', label: 'ztech' },
  { value: 'acme', label: 'acme' },
  { value: 'buildco', label: 'buildco' }
];

export function AuditReports() {
  const [selectedCompany, setSelectedCompany] = useState<string>('ztech');

  // Filter reports based on selected company
  const filteredReports = reportTemplates.filter(report => 
    report.companies.includes(selectedCompany)
  );

  // Use the correct event type from MUI
  const handleCompanyChange = (event: SelectChangeEvent) => {
    setSelectedCompany(event.target.value);
  };

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} href="/templates" underline="hover" color="inherit">
          Templates
        </Link>
        <Link component={RouterLink} href="/report-styles" underline="hover" color="inherit">
          Reports
        </Link>
        <Typography color="text.primary">List</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <Typography variant="h4" flexGrow={1}>
          Reports
        </Typography>
        
        {/* Company selector */}
        <Box sx={{ minWidth: 150, mr: 2, backgroundColor: 'white', borderRadius: 1, display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
          <Typography variant="body2" sx={{ color: 'success.main', mr: 1 }}>
            Company
          </Typography>
          <Select
            value={selectedCompany}
            onChange={handleCompanyChange}
            displayEmpty
            variant="standard"
            disableUnderline
            sx={{ minWidth: 100 }}
          >
            {companies.map((company) => (
              <MenuItem key={company.value} value={company.value}>
                {company.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
        
        <Button
          variant="outlined"
          startIcon={<Iconify icon="mdi:monitor" />}
          sx={{ borderRadius: 2 }}
        >
          Learn
        </Button>
      </Box>

      {/* Report Template Grid */}
      <Grid container spacing={3}>
        {filteredReports.map((report) => (
          <Grid item xs={12} sm={6} md={3} key={report.id}>
            <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box 
                component="img"
                src={report.image}
                alt={report.title}
                sx={{ 
                  width: '100%', 
                  height: 180, 
                  objectFit: 'contain',
                  mb: 2
                }}
              />
              <Box sx={{ mt: 'auto' }}>
                <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                  <Box>
                    <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold' }}>
                      {report.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {report.style}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <Iconify icon="mingcute:edit-line" width={20} />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}