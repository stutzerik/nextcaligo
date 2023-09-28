import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Button,
  Slider,
  Grid,
  Typography,
  ListItemIcon,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import debian from "../../Components/img/debian.png";
import centos from "../../Components/img/centos.png";
import ubuntu from "../../Components/img/ubuntu.png";
import fedora from "../../Components/img/fedora.png";
import scientific from "../../Components/img/scientific.png";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const initialValues = {
  template: "",
  hostname: "",
  password: "",
  ip_address: "",
  vcpu: 1,
  memory: 1,
  disk_size: 5,
  swap: 256,
  autopower: true,
  networkprotection: true,
};

function generatePassword() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const passwordLength = 12;
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}

export default function Deploy({ auth }) {
  const [formValues, setFormValues] = useState(initialValues);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [autopower, setAutopower] = useState(true);
  const [networkprotection, setNetworkProtection] = useState(true);
  const [positiveAlertOpen, setPositiveAlertOpen] = useState(false);
  const [negativeAlertOpen, setNegativeAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleAutopowerChange = () => {
    setFormValues({ ...formValues, autopower: !formValues.autopower });
  };

  const handleNetworkProtectionChange = () => {
    setFormValues({
      ...formValues,
      networkprotection: !formValues.networkprotection,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/deploy", formValues)
      .then((response) => {
        setPositiveAlertOpen(true);
        setAlertMessage(
          "VPS successfully created. It may take a minute to install the system."
        );
        console.log(response.data);
      })
      .catch((error) => {
        setNegativeAlertOpen(true);
        setAlertMessage(
          "An error occurred while executing the command. Try, again!"
        );
        console.error(error);
      });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Deploy instance
        </h2>
      }
    >
      <Head title="Deploy instance" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <form onSubmit={handleSubmit}>
                <Snackbar
                  open={positiveAlertOpen}
                  autoHideDuration={6000}
                  onClose={() => setPositiveAlertOpen(false)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Alert severity="success" variant="filled">
                    {alertMessage}
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={negativeAlertOpen}
                  autoHideDuration={6000}
                  onClose={() => setNegativeAlertOpen(false)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Alert severity="error" variant="filled">
                    {alertMessage}
                  </Alert>
                </Snackbar>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl
                      variant="filled"
                      style={{ marginBottom: "16px", width: "100%" }}
                      required
                    >
                      <InputLabel id="oslistlabel">Operating system</InputLabel>
                      <Select
                        labelId="oslistlabel"
                        id="template"
                        name="template"
                        onChange={handleChange}
                      >
                        <MenuItem value="debian-7.0-x86_64">
                          <ListItemIcon>
                            <img src={debian} />
                          </ListItemIcon>
                          Debian 7 Wheezy
                        </MenuItem>
                        <MenuItem value="debian-8.0-x86_64">
                          <ListItemIcon>
                            <img src={debian} />
                          </ListItemIcon>
                          Debian 8 Jessie
                        </MenuItem>
                        <MenuItem value="debian-9.0-x86_64">
                          <ListItemIcon>
                            <img src={debian} />
                          </ListItemIcon>
                          Debian 9 Stretch
                        </MenuItem>
                        <MenuItem value="debian-10.0-x86_64">
                          <ListItemIcon>
                            <img src={debian} />
                          </ListItemIcon>
                          Debian 10 Buster
                        </MenuItem>
                        <MenuItem value="centos-7-x86_64">
                          <ListItemIcon>
                            <img src={centos} />
                          </ListItemIcon>
                          CentOS 7.9
                        </MenuItem>
                        <MenuItem value="centos-8.stream-x86_64">
                          <ListItemIcon>
                            <img src={centos} />
                          </ListItemIcon>
                          CentOS 8 Stream
                        </MenuItem>
                        <MenuItem value="ubuntu-16.04-x86_64">
                          <ListItemIcon>
                            <img src={ubuntu} />
                          </ListItemIcon>
                          Ubuntu 16.04 LTS
                        </MenuItem>
                        <MenuItem value="ubuntu-18.04-x86_64">
                          <ListItemIcon>
                            <img src={ubuntu} />
                          </ListItemIcon>
                          Ubuntu 18.04 LTS
                        </MenuItem>
                        <MenuItem value="ubuntu-22.04-x86_64">
                          <ListItemIcon>
                            <img src={ubuntu} />
                          </ListItemIcon>
                          Ubuntu 22.04 LTS
                        </MenuItem>
                        <MenuItem value="fedora-23-x86_64">
                          <ListItemIcon>
                            <img src={fedora} />
                          </ListItemIcon>
                          Fedora 23
                        </MenuItem>
                        <MenuItem value="fedora-32-x86_64">
                          <ListItemIcon>
                            <img src={fedora} />
                          </ListItemIcon>
                          Fedora 32
                        </MenuItem>
                        <MenuItem value="scientific-6-x86_64">
                          <ListItemIcon>
                            <img src={scientific} />
                          </ListItemIcon>
                          Scientific 6
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="filled"
                      label="Hostname"
                      id="hostname"
                      name="hostname"
                      value={formValues.hostname}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="filled"
                      label="Root password"
                      id="password"
                      name="password"
                      type={passwordVisibility ? "text" : "password"}
                      value={formValues.password}
                      onChange={handleChange}
                      fullWidth
                      required
                      inputProps={{ minLength: 9, maxLength: 32 }}
                      InputProps={{
                        endAdornment: (
                          <>
                            <IconButton onClick={handlePasswordVisibility}>
                              <VisibilityIcon />
                            </IconButton>
                            <Button
                              onClick={() => {
                                const newPassword = generatePassword();
                                setFormValues({
                                  ...formValues,
                                  password: newPassword,
                                });
                              }}
                            >
                              Generate
                            </Button>
                          </>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="filled"
                      label="IPv4 address"
                      id="ip_address"
                      name="ip_address"
                      value={formValues.ip_address}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">vCPU core(s)</Typography>
                    <Slider
                      name="vcpu"
                      value={formValues.vcpu}
                      onChange={(_, newValue) =>
                        setFormValues({ ...formValues, vcpu: newValue })
                      }
                      min={1}
                      max={8}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value} cores`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Memory (in GB)</Typography>
                    <Slider
                      name="memory"
                      value={formValues.memory}
                      onChange={(_, newValue) =>
                        setFormValues({ ...formValues, memory: newValue })
                      }
                      min={1}
                      max={24}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value} GB`}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Swap (in MB)</Typography>
                    <Slider
                      name="swap"
                      value={formValues.swap}
                      onChange={(_, newValue) =>
                        setFormValues({ ...formValues, swap: newValue })
                      }
                      min={256}
                      max={2048}
                      step={256}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value} MB`}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1">
                      Disk Size (in GB)
                    </Typography>
                    <Slider
                      name="disk_size"
                      value={formValues.disk_size}
                      onChange={(_, newValue) =>
                        setFormValues({ ...formValues, disk_size: newValue })
                      }
                      min={5}
                      max={1000}
                      step={5}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value} GB`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formValues.autopower}
                          onChange={handleAutopowerChange}
                          name="autopower"
                        />
                      }
                      label="Auto start VPS if hardware powered on"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formValues.networkprotection}
                          onChange={handleNetworkProtectionChange}
                          name="networkprotection"
                        />
                      }
                      label="Enable default network protection"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" size="large" type="submit">
                      Deploy instance
                    </Button>
                    <br />
                    <i>Wait a few seconds after pressing the button.</i>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}