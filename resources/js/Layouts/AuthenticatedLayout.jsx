import * as React from "react";
import Footer from "@/Components/Footer";
import logo from "@/Components/img/logo.png";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DnsIcon from "@mui/icons-material/Dns";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";

function LogoutListItem() {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      const response = await fetch(route("logout"), {
        method: "POST",
      });

      if (response.ok) {
        window.location.href = "/login";
      } else {
      }
    } catch (error) {}
  };
}
const drawerWidth = 240;

export default function Authenticated({ user, header, children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <img src={logo} />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/dashboard">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/instances/deploy">
                <ListItemIcon>
                  <RocketLaunchIcon />
                </ListItemIcon>
                <ListItemText primary="Deploy instance" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/instances/list">
                <ListItemIcon>
                  <DnsIcon />
                </ListItemIcon>
                <ListItemText primary="List instances" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/account/add">
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Add account" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/account/my">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="My account" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/logout">
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/software">
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Software information" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />

        <div className="min-h-screen bg-gray-100">
          {header && (
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {header}
              </div>
            </header>
          )}

          <main>{children}</main>
          <Footer />
        </div>
      </Box>
    </Box>
  );
}