import React, { useState, useEffect } from "react";
import { useForm } from "../components/form/use-form";
import Input from "../components/controls/Input";
import Select from "../components/controls/Select";
import * as service from "../services/agentService";
import ButtonGenerator from "../components/controls/Button";
import { Form, useNavigate, useLoaderData } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { 
  Alert, 
  FormControl, 
  Snackbar, 
  Stack, 
  Typography, 
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import { useRouter } from "../routes/hooks/use-router";
import Slide, { SlideProps } from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import { TransitionProps } from '@mui/material/transitions';

// Define types to fix the TODO placeholders
interface Agent {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  status: string;
  avatarUrl: string;
  role: string;
  company: string;
  isVerified: boolean;
  location?: string;
  description?: string;
  date?: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  city?: string;
  state?: string;
  role?: string;
  status?: string;
  description?: string;
  date?: string;
  [key: string]: string | undefined;
}

const initialFieldValues: Agent = {
  id: "",
  name: "",
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  city: "",
  state: "",
  status: "",
  avatarUrl: "",
  role: "",
  company: "",
  isVerified: false,
  description: "",
  date: ""
};

// Companies data
const companies = ['All', 'ztech', 'techco', 'buildcorp'];

// Dummy locations data for each company
const companyLocations = {
  'All': ['All Locations', 'Global HQ', 'Regional Office'],
  'ztech': ['San Francisco', 'New York', 'London', 'Tokyo'],
  'techco': ['Austin', 'Chicago', 'Berlin', 'Singapore'],
  'buildcorp': ['Denver', 'Seattle', 'Sydney', 'Toronto']
};

function slideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export default function BroadcastForm() {
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [locations, setLocations] = useState<string[]>(companyLocations['All']);
  const [selectedLocation, setSelectedLocation] = useState<string>(companyLocations['All'][0]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  const agent = useLoaderData() as Agent | null;
  const router = useRouter();
  const navigate = useNavigate();
  
  const [notice, setNotice] = useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Fade,
  });

  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, agent || undefined) as {
    values: Agent;
    errors: FormErrors;
    setErrors: (errors: FormErrors) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | { name: string; value: unknown }>) => void;
    resetForm: () => void;
  };

  // Update locations when company changes
  useEffect(() => {
    setLocations(companyLocations[selectedCompany as keyof typeof companyLocations] || []);
    setSelectedLocation(companyLocations[selectedCompany as keyof typeof companyLocations]?.[0] || '');
  }, [selectedCompany]);

  // Set initial date if agent has a date
  useEffect(() => {
    if (agent && agent.date) {
      setSelectedDate(agent.date);
    }
  }, [agent]);

  const handleCompanyChange = (event: SelectChangeEvent) => {
    setSelectedCompany(event.target.value);
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    setSelectedLocation(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  // Custom handler for description textarea
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    values.description = value;
    // You can add validation here if needed
  };

  const validateOnSubmit = () => {
    let temp: FormErrors = {};
    temp.firstName = values.firstName ? "" : "Mandatory Field";
    temp.email = /$^|.+@.+..+/.test(values.email) ? "" : "Email is not Valid";
    temp.mobile = values.mobile.length > 9 ? "" : "Min 10 numbers required";
    temp.city = values.city ? "" : "Mandatory Field";
    temp.state = values.state ? "" : "Mandatory Field";
    temp.role = values.role ? "" : "Mandatory Field";
    temp.status = values.status ? "" : "Mandatory Field";
    temp.description = values.description ? "" : "Please provide a description";
    temp.date = selectedDate ? "" : "Please select a date";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateOnSubmit()) {
      values.name = values.firstName;
      values.company = selectedCompany;
      values.location = selectedLocation;
      values.date = selectedDate;

      console.log(values);
      service.addItem(values);
      navigate('/agents', { replace: true });
    }
  };

  const handleUpdate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateOnSubmit()) {
      values.name = values.firstName;
      values.company = selectedCompany;
      values.location = selectedLocation;
      values.date = selectedDate;
      
      service.updateItem(values);
      
      setNotice({
        open: true,
        Transition: slideTransition
      });
      
      setTimeout(() => { 
        navigate('/agents', { replace: true }); 
      }, 1000);
    }
  };

  const goBack = (e: React.SyntheticEvent) => {
    router.back();
  };

  const handleClose = () => {
    setNotice({
      ...notice,
      open: false,
    });
  };

  return (
    <Paper sx={{ px: 5, py: 5 }}>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Schedule Audit
      </Typography>
      <Form onSubmit={agent ? handleUpdate : handleSubmit}>
        <Grid container rowSpacing={2} columnSpacing={4}>
          
          <Grid item xs={12} md={6} lg={6}>
            <FormControl sx={{ minWidth: 250, width: '100%' }}>
              <InputLabel id="company-select-label">Company</InputLabel>
              <MuiSelect
                labelId="company-select-label"
                value={selectedCompany}
                label="Company"
                onChange={handleCompanyChange}>
                {companies.map((company) => (
                  <MenuItem key={company} value={company}>{company}</MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6} lg={6}>
            <FormControl sx={{ minWidth: 250, width: '100%' }}>
              <InputLabel id="location-select-label">Location</InputLabel>
              <MuiSelect
                labelId="location-select-label"
                value={selectedLocation}
                label="Location"
                onChange={handleLocationChange}>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>{location}</MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <TextField
                id="date-input"
                label="Date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                sx={{ minWidth: 250, width: '100%' }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date || ""}
                required
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                value={values.description}
                onChange={handleDescriptionChange}
                variant="outlined"
                error={!!errors.description}
                helperText={errors.description || ""}
                required
              />
            </FormControl>
          </Grid>
        </Grid>
        
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            px: 10,
            mt: 3
          }}
        >
          {agent ? 
            <ButtonGenerator text="Update" type="submit" /> :
            <ButtonGenerator text="Submit" type="submit" />
          }
          {agent ? 
            <ButtonGenerator text="Back" color="default" onClick={goBack} /> :
            <ButtonGenerator text="Reset" color="default" onClick={resetForm} />
          }
        </Stack>
      </Form>
      
      <Snackbar
        open={notice.open}
        TransitionComponent={notice.Transition}
        message="Operation is done successfully"
        key={notice.Transition.name}
        autoHideDuration={1000}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Operation is done successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export function agentLoader({ params }: { params: { id: string } }) {
  const agent = service.getItemById(params.id);
  if (!agent) throw new Response("/not-found", { status: 404 });
  return agent;
}