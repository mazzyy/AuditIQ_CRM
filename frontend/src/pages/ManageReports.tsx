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

// Define the Report type
interface Report {
  id: string;
  company: string;
  reportName: string;
  location: string;
  date: string;
  submittedBy: string;
  status: 'Completed' | 'In Progress' | 'Pending Review';
  score: string;
}

// Sample data for demonstration
const SAMPLE_REPORTS: Report[] = [
  { 
    id: '6874129', 
    company: 'ztech', 
    reportName: 'Construction Safety Audit', 
    location: 'xyz', 
    date: '23, Apr 2025', 
    submittedBy: 'asheer ali', 
    status: 'Completed', 
    score: '100%' 
  },
  { 
    id: '6872961', 
    company: 'ztech', 
    reportName: 'Food Safety & Hygiene Checklist', 
    location: 'My Site', 
    date: '23, Apr 2025', 
    submittedBy: 'asheer ali', 
    status: 'In Progress', 
    score: '98.42%' 
  },
  { 
    id: '6872345', 
    company: 'techco', 
    reportName: 'Electrical Safety Inspection', 
    location: 'Main Office', 
    date: '22, Apr 2025', 
    submittedBy: 'john doe', 
    status: 'Completed', 
    score: '95.3%' 
  },
  { 
    id: '6871987', 
    company: 'buildcorp', 
    reportName: 'Environmental Compliance', 
    location: 'Site B', 
    date: '21, Apr 2025', 
    submittedBy: 'sara khan', 
    status: 'Pending Review', 
    score: '89.1%' 
  },
  { 
    id: '6871234', 
    company: 'ztech', 
    reportName: 'Fire Safety Assessment', 
    location: 'Building C', 
    date: '20, Apr 2025', 
    submittedBy: 'mike ross', 
    status: 'Completed', 
    score: '97.8%' 
  },
  { 
    id: '6870891', 
    company: 'techco', 
    reportName: 'Equipment Maintenance', 
    location: 'Workshop', 
    date: '19, Apr 2025', 
    submittedBy: 'linda chen', 
    status: 'In Progress', 
    score: '76.5%' 
  },
  { 
    id: '6870456', 
    company: 'buildcorp', 
    reportName: 'OSHA Compliance Check', 
    location: 'Site A', 
    date: '18, Apr 2025', 
    submittedBy: 'robert smith', 
    status: 'Completed', 
    score: '92.7%' 
  },
  { 
    id: '6870123', 
    company: 'ztech', 
    reportName: 'Quality Assurance', 
    location: 'Production Line', 
    date: '17, Apr 2025', 
    submittedBy: 'amina patel', 
    status: 'Completed', 
    score: '99.1%' 
  },
  { 
    id: '6869876', 
    company: 'techco', 
    reportName: 'Hazardous Materials', 
    location: 'Storage Facility', 
    date: '16, Apr 2025', 
    submittedBy: 'james wilson', 
    status: 'Pending Review', 
    score: '84.3%' 
  },
  { 
    id: '6869543', 
    company: 'buildcorp', 
    reportName: 'Worker Safety Training', 
    location: 'Training Center', 
    date: '15, Apr 2025', 
    submittedBy: 'kayla nguyen', 
    status: 'In Progress', 
    score: '91.8%' 
  },
  { 
    id: '6869210', 
    company: 'ztech', 
    reportName: 'Ergonomics Assessment', 
    location: 'Office Space', 
    date: '14, Apr 2025', 
    submittedBy: 'david lee', 
    status: 'Completed', 
    score: '96.5%' 
  }
];

const companies = ['All', 'ztech', 'techco', 'buildcorp'];
const dateRanges = [
  '28, Mar 2025 - 27, Apr 2025',
  '28, Feb 2025 - 27, Mar 2025',
  '28, Jan 2025 - 27, Feb 2025'
];

export default function ManageReports() {
  const [tab, setTab] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [dateRange, setDateRange] = useState<string>(dateRanges[0]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Filter reports based on search, company, and date
  const filteredReports = SAMPLE_REPORTS.filter((report) => {
    // Filter by search query
    const matchesSearch = 
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by company
    const matchesCompany = selectedCompany === 'All' || report.company === selectedCompany;
    
    return matchesSearch && matchesCompany;
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

  const handleAddFilter = () => {
    handleCloseMenu();
  };

  const handleCompanyChange = (event: SelectChangeEvent) => {
    setSelectedCompany(event.target.value);
  };

  const handleDateRangeChange = (event: SelectChangeEvent) => {
    setDateRange(event.target.value);
  };

  const getStatusChip = (status: Report['status']) => {
    let color: ChipProps['color'] = 'default';
    
    switch(status) {
      case 'Completed':
        color = 'success';
        break;
      case 'In Progress':
        color = 'warning';
        break;
      case 'Pending Review':
        color = 'info';
        break;
      default:
        color = 'default';
    }
    
    return <Chip label={status} color={color} size="small" />;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Typography color="text.primary">Manage Reports</Typography>
        <Typography color="text.secondary">List</Typography>
      </Breadcrumbs>

      {/* Filters and Controls */}
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
          <InputLabel id="company-select-label">Company:</InputLabel>
          <Select
            labelId="company-select-label"
            value={selectedCompany}
            label="Company:"
            onChange={handleCompanyChange}
          >
            {companies.map((company) => (
              <MenuItem key={company} value={company}>{company}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 250 }}>
          <InputLabel id="date-range-label">Dates:</InputLabel>
          <Select
            labelId="date-range-label"
            value={dateRange}
            label="Dates:"
            onChange={handleDateRangeChange}
          >
            {dateRanges.map((range) => (
              <MenuItem key={range} value={range}>{range}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button 
          variant="outlined" 
          startIcon={<FilterListIcon />}
          onClick={handleOpenMenu}
          sx={{ ml: { xs: 0, sm: 2 } }}
          size="small"
        >
          Add Filter
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleAddFilter}>Status</MenuItem>
          <MenuItem onClick={handleAddFilter}>Score</MenuItem>
          <MenuItem onClick={handleAddFilter}>Location</MenuItem>
        </Menu>

        <Box sx={{ ml: { xs: 0, sm: 'auto' }, mt: { xs: 2, sm: 0 }, display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<ComputerIcon />} size="small">
            Learn
          </Button>
          <Button variant="outlined" size="small">Today</Button>
          <Button variant="contained" size="small">Last 30 days</Button>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Reports" />
          <Tab label="Archive/Delete" />
        </Tabs>
      </Box>

      {/* Table */}
      <Paper elevation={1}>
        <TableContainer>
          <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Report Ref</TableCell>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Company/Dept</TableCell>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Report Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Submitted by</TableCell>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Score</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}></TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {filteredReports
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((report) => (
                  <TableRow key={report.id} hover>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.company}</TableCell>
                    <TableCell>{report.reportName}</TableCell>
                    <TableCell>{report.location}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.submittedBy}</TableCell>
                    <TableCell>{getStatusChip(report.status)}</TableCell>
                    <TableCell>{report.score}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredReports.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      No reports found
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
          justifyContent: 'space-between', 
          alignItems: 'center', 
          px: 2, 
          py: 1.5,
          borderTop: '1px solid #e0e0e0'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Number of items per page
            </Typography>
            <Select
              value={rowsPerPage.toString()}
              onChange={(e: SelectChangeEvent) => setRowsPerPage(parseInt(e.target.value, 10))}
              size="small"
              sx={{ width: 80 }}
            >
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="25">25</MenuItem>
            </Select>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredReports.length)} of {filteredReports.length}
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
              Page {page + 1} of {Math.max(1, Math.ceil(filteredReports.length / rowsPerPage))}
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => setPage(page + 1)} 
              disabled={page >= Math.ceil(filteredReports.length / rowsPerPage) - 1}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => setPage(Math.ceil(filteredReports.length / rowsPerPage) - 1)} 
              disabled={page >= Math.ceil(filteredReports.length / rowsPerPage) - 1}
            >
              <LastPageIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}