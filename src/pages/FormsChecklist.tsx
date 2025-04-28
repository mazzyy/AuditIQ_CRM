import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Icon from '@mui/material/Icon';
import SvgIcon from '@mui/material/SvgIcon';

// Simple icon component that simulates Iconify behavior
interface IconifyProps {
  icon: string;
  width?: number;
  height?: number;
  sx?: object;
}

function Iconify({ icon, sx = {}, ...other }: IconifyProps) {
  const iconMap: Record<string, React.ReactNode> = {
    'eva:search-fill': (
      <SvgIcon {...other} sx={sx}>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </SvgIcon>
    ),
    'eva:grid-fill': (
      <SvgIcon {...other} sx={sx}>
        <path d="M3 3v8h8V3H3zm8 8v8h8v-8h-8zm-8 0v8h8v-8H3zm0-8v8h8V3H3z" />
      </SvgIcon>
    ),
    'eva:list-fill': (
      <SvgIcon {...other} sx={sx}>
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
      </SvgIcon>
    ),
    'eva:monitor-fill': (
      <SvgIcon {...other} sx={sx}>
        <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z" />
      </SvgIcon>
    ),
    'eva:more-vertical-fill': (
      <SvgIcon {...other} sx={sx}>
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </SvgIcon>
    ),
    'mingcute:add-line': (
      <SvgIcon {...other} sx={sx}>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </SvgIcon>
    ),
  };

  return <>{iconMap[icon] || <Icon>{icon}</Icon>}</>;
}

// Define props interface for CompanyCard
interface CompanyCardProps {
  logo: string;
  name: string;
  options?: boolean;
}

// Company card component
const CompanyCard = ({ logo, name, options = false }: CompanyCardProps) => (
  <Card sx={{ 
    width: 200, 
    height: 240, 
    m: 1, 
    display: 'flex', 
    flexDirection: 'column',
    position: 'relative',
    borderRadius: 2,
    boxShadow: 1
  }}>
    <Box 
      sx={{ 
        height: 150, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: logo === '+' ? '#7BC5A0' : logo === 'Z' ? '#4A6CF7' : '#F7A14A',
        color: 'white',
        fontSize: logo === '+' ? 48 : 80,
        fontWeight: 'bold'
      }}
    >
      {logo}
    </Box>
    <Box 
      sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between'
      }}
    >
      <Typography variant="subtitle1">{name}</Typography>
      {options && (
        <IconButton size="small">
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      )}
    </Box>
  </Card>
);

// Mock data for companies
interface Company {
  id: string;
  name: string;
  logo: string;
}

const initialCompanies: Company[] = [
  { id: 'create-new', name: 'Create New', logo: '+' },

];

export function FormsChecklist() {
  const [tabValue, setTabValue] = useState<number>(0);
  const [viewMode, setViewMode] = useState<string>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(initialCompanies);

  // Filter companies based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter(company => 
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [searchQuery, companies]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null) {
      setViewMode(newValue);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#637381', fontWeight: 400 }}>
          Templates {'>'} Forms/checklists {'>'} List
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 600 }}>
        Forms/checklists
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            placeholder="Search"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: 250, mr: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
          
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            size="small"
          >
            <ToggleButton value="grid" sx={{ borderRadius: '4px 0 0 4px' }}>
              <Iconify icon="eva:grid-fill" />
            </ToggleButton>
            <ToggleButton value="list" sx={{ borderRadius: '0 4px 4px 0' }}>
              <Iconify icon="eva:list-fill" />
            </ToggleButton>
          </ToggleButtonGroup>
          
          <Button
            variant="contained"
            color="primary"
            sx={{ bgcolor: '#212B36', '&:hover': { bgcolor: '#1B2429' } }}
          >
            Export
          </Button>
          
          <Button
            variant="contained"
            sx={{ bgcolor: '#7BC5A0', '&:hover': { bgcolor: '#6AB390' } }}
          >
            Add new checkkist
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Iconify icon="eva:monitor-fill" />}
          >
            Learn
          </Button>
        </Box>
      </Box>

      <Card sx={{ mb: 3, p: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': { 
                textTransform: 'none',
                minWidth: 'unset',
                px: 3,
              },
              '& .Mui-selected': {
                color: '#7BC5A0 !important',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#7BC5A0',
              }
            }}
          >
            <Tab label="Companies" />
            <Tab label="Deleted/Archived" />
          </Tabs>
        </Box>
        
        <Box sx={{ p: 3, display: 'flex', flexWrap: 'wrap' }}>
          {filteredCompanies.map(company => (
            <CompanyCard 
              key={company.id}
              logo={company.logo} 
              name={company.name} 
              options={company.logo !== '+'} 
            />
          ))}
          
          {filteredCompanies.length === 0 && (
            <Box sx={{ p: 5, width: '100%', textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No companies match your search criteria
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </>
  );
}