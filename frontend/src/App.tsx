import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ContactsIcon from "@mui/icons-material/Contacts";
import { Outlet, useNavigate } from "react-router-dom";
import { AppProvider } from "@toolpad/core/react-router-dom";
import { createTheme } from "@mui/material/styles";
import logoMidPng from "./assets/it-logo-mid.png";
import { Session, type Navigation } from "@toolpad/core/AppProvider";
import { SessionContext } from "./SessionContext";
import * as agentService from "./services/agentService";
import * as productService from "./services/productService";
import * as customerService from "./services/customerService";
import * as orderService from "./services/orderService";
import Box from "@mui/material/Box";
import CampaignIcon from "@mui/icons-material/Campaign";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const NAVIGATION: Navigation = [
  {
    title: "Manage Reports",
    segment: "manage-reports",
    icon: <ShoppingCartIcon />,
  },
  {
    title: "Setup",
    segment: "manage-reports",
    icon: <NewspaperIcon />,
  },
  {
    title: "Company/Dept",
    segment: "company-depts",
    // Empty box for spacing
    icon: <Box sx={{ width: 24 }} />,
  },
  {
    title: "Locations",
    segment: "locations",
    // Empty box for spacing
    icon: <Box sx={{ width: 24 }} />,
  },
  {
    title: "Forms/Checklists",
    segment: "Forms-Checklist",
    // Empty box for spacing
    icon: <Box sx={{ width: 24 }} />,
  },
  {
    title: "Form Builder",
    segment: "ComingSoon",
    // Empty box for spacing
    icon: <Box sx={{ width: 24 }} />,
  },
  {
    title: "Reports",
    segment: "audit-reports",
    // Empty box for spacing
    icon: <Box sx={{ width: 24 }} />,
  },
  {
    title: "Users",
    segment: "UsersList",
    icon: <NewspaperIcon />,
  },

  // {
  //   title: "Advance",
  //   icon: <ShoppingCartIcon />,
  //   children: [
  //     {
  //       segment: "blogs",
  //       title: "Permissions",
  //       icon: <NewspaperIcon />,
  //     },

  //     {
  //       segment: "agents",
  //       title: "Roles and Hierarchies",
  //       icon: <PeopleAltIcon />,
  //     },
  //     {
  //       segment: "Action Plan Settings",
  //       title: "Contacts",
  //       icon: <ContactsIcon />,
  //     },
  //   ],
  // },
  {
    segment: "Gallery",
    title: "Gallery",
    icon: <ScheduleIcon />,
  },

  {
    segment: "Schedule",
    title: "Schedule",
    icon: <ScheduleIcon />,
  },
  {
    segment: "Broatcast",
    title: "Broatcast",
    icon: <CampaignIcon />,
  },
  {
    kind: "header",
    title: "AI and Analytics",
  },
  {
    kind: "divider",
  },
  {
    segment: "ComingSoon",

    title: "Advanced Analytics",
    icon: <AnalyticsIcon />,
  },
  {
    segment: "kpi",
    title: "KPI and Graphs",
    icon: <LeaderboardIcon />,
  },
  {
    kind: "header",
    title: "Advance Settings",
  },
  {
    kind: "divider",
  },
  {
    segment: "PaymentPage",
    title: "Payments & Plans",
    icon: <NewspaperIcon />,
  },
  {
    segment: "HelpCenter",
    title: "Help Center",
    icon: <PeopleAltIcon />,
  },
];
const logo = <img src={logoMidPng} className="logo" alt="" />;
const BRANDING = {
  title: "Audit IQ",
  logo,
};

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1408,
      xl: 1530,
    },
  },
});

agentService.init();
customerService.init();
productService.init();
orderService.init();

export default function App() {
  const [session, setSession] = React.useState<Session | null>(null);
  const navigate = useNavigate();

  const signIn = React.useCallback(() => {
    navigate("/sign-in");
  }, [navigate]);

  const signOut = React.useCallback(() => {
    // setSession(null);
    navigate("/sign-in");
  }, [navigate]);

  const sessionContextValue = React.useMemo(
    () => ({ session, setSession }),
    [session, setSession]
  );

  return (
    <SessionContext.Provider value={sessionContextValue}>
      <AppProvider
        theme={theme}
        navigation={NAVIGATION}
        branding={BRANDING}
        session={session}
        authentication={{ signIn, signOut }}
      >
        <Outlet />
      </AppProvider>
    </SessionContext.Provider>
  );
}
