import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TextField,
  TableContainer,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  IconButton,
  Menu,
  Chip,
  ChipProps,
  InputAdornment,
  Breadcrumbs,
  SelectChangeEvent
} from '@mui/material';

// Material UI Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ComputerIcon from '@mui/icons-material/Computer';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';

// Define the Location type
interface Location {
  id: string;
  name: string;
  company: string;
  fullAddress: string;
  tags: string[];
}

// Sample location data for demonstration
const SAMPLE_LOCATIONS: Location[] = [
  { 
    id: '1001', 
    name: 'My Site', 
    company: 'apptech', 
    fullAddress: '123 Main St, Boston, MA 02115', 
    tags: ['Office', 'HQ'] 
  },
  { 
    id: '1002', 
    name: 'Warehouse', 
    company: 'apptech', 
    fullAddress: '456 Storage Ave, Boston, MA 02116', 
    tags: ['Warehouse', 'Storage'] 
  },
  { 
    id: '1003', 
    name: 'East Branch', 
    company: 'apptech', 
    fullAddress: '789 East St, Cambridge, MA 02139', 
    tags: ['Office', 'Branch'] 
  },
  { 
    id: '1004', 
    name: 'West Facility', 
    company: 'techco', 
    fullAddress: '101 West Blvd, Somerville, MA 02143', 
    tags: ['Manufacturing'] 
  },
  { 
    id: '1005', 
    name: 'South Campus', 
    company: 'buildcorp', 
    fullAddress: '202 South Ave, Quincy, MA 02169', 
    tags: ['Training', 'Office'] 
  }
];

const companies = ['All', 'apptech', 'techco', 'buildcorp'];
const locationTags = ['All', 'Office', 'HQ', 'Warehouse', 'Storage', 'Branch', 'Manufacturing', 'Training'];

export default function LocationList() {
  const [tab, setTab] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('apptech');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Filter locations based on search, company, and tags
  const filteredLocations = SAMPLE_LOCATIONS.filter((location) => {
    // Filter by search query
    const matchesSearch = 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.fullAddress.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by company
    const matchesCompany = selectedCompany === 'All' || location.company === selectedCompany;
    
    // Filter by tag
    const matchesTag = selectedTag === 'All' || location.tags.includes(selectedTag);
    
    return matchesSearch && matchesCompany && matchesTag;
  });

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCompanyChange = (event: SelectChangeEvent) => {
    setSelectedCompany(event.target.value);
  };

  const handleTagChange = (event: SelectChangeEvent) => {
    setSelectedTag(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h5" sx={{ mb: 3 }}>Location List</Typography>

      {/* Search and Filter Bar */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2, 
          mb: 3, 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <TextField
          placeholder="Search"
          size="small"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="company-select-label">Company</InputLabel>
          <Select
            labelId="company-select-label"
            value={selectedCompany}
            label="Company"
            onChange={handleCompanyChange}
          >
            {companies.map((company) => (
              <MenuItem key={company} value={company}>{company}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ ml: { xs: 0, sm: 'auto' }, display: 'flex', gap: 1 }}>
          <IconButton size="small" sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <DownloadIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <UploadIcon fontSize="small" />
          </IconButton>
          <Button variant="outlined" size="small">
            Download Template
          </Button>
          <Button variant="outlined" size="small">
            Import (Beta)
          </Button>
          <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}>
            Add
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<ComputerIcon />} 
            size="small"
          >
            Learn
          </Button>
        </Box>
      </Box>

      {/* Location Tags Filter */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
          Location Tags:
        </Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            value={selectedTag}
            onChange={handleTagChange}
            displayEmpty
          >
            {locationTags.map((tag) => (
              <MenuItem key={tag} value={tag}>{tag}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton size="small">
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Locations" />
          <Tab label="Deleted/Archived" />
        </Tabs>
      </Box>

      {/* Table */}
      <Paper elevation={1}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  Location
                  <IconButton size="small" sx={{ ml: 0.5 }}>
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  Company/Dept
                  <IconButton size="small" sx={{ ml: 0.5 }}>
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  Full Address
                  <IconButton size="small" sx={{ ml: 0.5 }}>
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Tags</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLocations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((location) => (
                  <TableRow key={location.id} hover>
                    <TableCell>{location.name}</TableCell>
                    <TableCell>{location.company}</TableCell>
                    <TableCell>{location.fullAddress}</TableCell>
                    <TableCell>
                      {location.tags.map((tag) => (
                        <Chip 
                          key={tag} 
                          label={tag} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }} 
                        />
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredLocations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      No locations found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          alignItems: 'center', 
          px: 2, 
          py: 1.5,
          borderTop: '1px solid #e0e0e0'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredLocations.length)} of {filteredLocations.length}
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => setPage(0)} 
              disabled={page === 0}
            >
              <FirstPageIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => setPage(page - 1)} 
              disabled={page === 0}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ mx: 1 }}>
              Page {page + 1} of {Math.max(1, Math.ceil(filteredLocations.length / rowsPerPage))}
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => setPage(page + 1)} 
              disabled={page >= Math.ceil(filteredLocations.length / rowsPerPage) - 1}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => setPage(Math.ceil(filteredLocations.length / rowsPerPage) - 1)} 
              disabled={page >= Math.ceil(filteredLocations.length / rowsPerPage) - 1}
            >
              <LastPageIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}