import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

import { Iconify } from "../components/iconify";
import { RouterLink } from "../routes/components";

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

// Mock report data with updated image paths
const reportTemplates: ReportTemplate[] = [
  {
    id: 1,
    title: "Food Safety & Quality",
    style: "Style 1: Trend Report",
    companies: ["ztech", "acme"],
    image: "/assets/images/cover/cover-1.webp",
  },
  {
    id: 2,
    title: "Construction Quality",
    style: "Style 1: Trend Report",
    companies: ["ztech", "buildco"],
    image: "/assets/images/cover/cover-2.webp",
  },
  {
    id: 3,
    title: "Construction Safety",
    style: "Style 1: Trend Report",
    companies: ["ztech", "buildco"],
    image: "/assets/images/cover/cover-3.webp",
  },
  {
    id: 4,
    title: "Template3",
    style: "Style 1: Trend Report",
    companies: ["ztech"],
    image: "/assets/images/cover/cover-4.webp",
  },
  {
    id: 5,
    title: "Manufacturing Quality",
    style: "Style 2: Monthly Report",
    companies: ["ztech", "acme"],
    image: "/assets/images/cover/cover-5.webp",
  },
  {
    id: 6,
    title: "Healthcare Safety",
    style: "Style 2: Monthly Report",
    companies: ["acme"],
    image: "/assets/images/cover/cover-6.webp",
  },
];

// Available companies
const companies: CompanyOption[] = [
  { value: "ztech", label: "ZTech" },
  { value: "acme", label: "ACME Corp" },
  { value: "buildco", label: "BuildCo" },
];

export function Gallery() {
  const [selectedCompany, setSelectedCompany] = useState<string>("ztech");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter reports based on selected company and search query
  const filteredReports = reportTemplates.filter(
    (report) =>
      report.companies.includes(selectedCompany) &&
      report.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCompanyChange = (event: SelectChangeEvent) => {
    setSelectedCompany(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          component={RouterLink}
          href="/report-styles"
          underline="hover"
          color="inherit"
        >
          Gallery
        </Link>
        <Typography color="text.primary">List</Typography>
      </Breadcrumbs>

      {/* Header and Search */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="h4">Gallery</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            width: { xs: "100%", sm: "auto" },
            alignItems: "center",
          }}
        >
          {/* Search bar */}
          <TextField
            placeholder="Search reports..."
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              minWidth: { xs: "100%", sm: 220 },
              backgroundColor: "white",
              borderRadius: 1,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          {/* Company selector */}
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 0.5,
              minWidth: { xs: "100%", sm: 150 },
            }}
          >
            <Typography variant="body2" sx={{ color: "success.main", mr: 1 }}>
              Company
            </Typography>
            <Select
              value={selectedCompany}
              onChange={handleCompanyChange}
              displayEmpty
              variant="standard"
              disableUnderline
              sx={{ flexGrow: 1 }}
            >
              {companies.map((company) => (
                <MenuItem key={company.value} value={company.value}>
                  {company.label}
                </MenuItem>
              ))}
            </Select>
          </Paper>

          <Button
            variant="outlined"
            startIcon={<Iconify icon="mdi:monitor" />}
            sx={{ borderRadius: 2 }}
          >
            LEARN
          </Button>
        </Box>
      </Box>

      {/* Gallery Grid Layout */}
      <Grid container spacing={3}>
        {filteredReports.map((report) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={report.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  pt: "70%", // Aspect ratio
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={report.image}
                  alt={report.title}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "rgba(255,255,255,0.8)",
                    borderRadius: "50%",
                  }}
                >
                  <IconButton size="small">
                    <Iconify icon="mingcute:edit-line" width={18} />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "white",
                    p: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ textTransform: "uppercase" }}
                  >
                    {companies.find((c) => c.value === selectedCompany)?.label}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ p: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 0.5 }}
                >
                  {report.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.style}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
