import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Typography, TextField, IconButton, Divider, Button, Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TerminalIcon from "@mui/icons-material/Terminal";
import ApexCharts from "react-apexcharts";
import MemoryIcon from "@mui/icons-material/Memory";
import { useTheme } from "@mui/material/styles";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import AlbumIcon from "@mui/icons-material/Album";
import LanIcon from "@mui/icons-material/Lan";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Console from "./Console";

export default function Manage({ auth, id }) {
  const [value, setValue] = React.useState("1");
  const [containerData, setContainerData] = useState(null);
  const [memoryUsageData, setMemoryUsageData] = useState([]);
  const [cpuUsageData, setCPUUsageData] = useState([]);
  const [diskUsageData, setDiskUsageData] = useState({
    disk_read: [],
    disk_write: [],
  });
  const [trafficData, setTrafficData] = useState({
    traffic_incoming: [],
    traffic_outgoing: [],
  });
  const [vpsStatus, setVpsStatus] = useState(null);
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const [progress, setProgress] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [rootpwd, setRootpwd] = useState("");
  const [host, setHost] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleChangePwd = (e) => {
    const { name, value } = e.target;
  };

  useEffect(() => {
    axios
      .get(`/api/container/${id}`)
      .then((response) => {
        setContainerData(response.data);
        setHost(response.data.ip_address);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleStart = () => {
    setButtonDisabled(true);
    axios
      .post(`/api/container/${id}/start`)
      .then(() => {
        setTimeout(() => {
          setButtonDisabled(false);
        }, 6000);
      })
      .catch((error) => {
        console.error(error);
        setButtonDisabled(false);
      });
  };

  const handleStop = () => {
    setButtonDisabled(true);
    axios
      .post(`/api/container/${id}/start`)
      .then(() => {
        setTimeout(() => {
          setButtonDisabled(false);
        }, 6000);
      })
      .catch((error) => {
        console.error(error);
        setButtonDisabled(false);
      });
  };

  const handleRestart = () => {
    setButtonDisabled(true);
    axios
      .post(`/api/container/${id}/restart`)
      .then(() => {
        setTimeout(() => {
          setButtonDisabled(false);
        }, 6000);
      })
      .catch((error) => {
        console.error(error);
        setButtonDisabled(false);
      });
  };

  useEffect(() => {
    axios
      .post(`/api/container/${id}/show_root`)
      .then((response) => {
        setPassword(response.data.ssh_password);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmitPwd = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/container/${id}/setpwd`, {
        rootpwd: rootpwd,
        id: id,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitNS = () => {
    axios
      .post(`/api/container/${id}/setns`, { id: id })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //Memory
  const fetchMemoryUsage = () => {
    axios
      .get(`/api/container/${id}/memory`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        if (response.data.message) {
          setVpsStatus("powered_off");
        } else {
          setMemoryUsageData((prevData) => {
            const updatedData = [
              ...prevData,
              { x: new Date(), y: response.data.memory_usage },
            ];
            if (updatedData.length > 6) {
              updatedData.shift();
            }
            return updatedData;
          });
          setVpsStatus(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMemoryUsage();

    const interval = setInterval(fetchMemoryUsage, 3000);
    return () => clearInterval(interval);
  }, [id]);

  const chartOptions = {
    chart: {
      type: "area",
      stacked: false,
      height: "auto",
      foreColor: "#333",
      animations: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "solid",
      colors: [primaryColor],
      opacity: 0.8,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
  };

  const chartSeries = [
    {
      name: "Memory Usage (%)",
      data: memoryUsageData,
    },
  ];

  //CPU
  const fetchCPUUsage = () => {
    axios
      .get(`/api/container/${id}/cpu`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        if (response.data.message) {
          setVpsStatus("powered_off");
        } else {
          setCPUUsageData((prevData) => {
            const updatedData = [
              ...prevData,
              { x: new Date(), y: response.data.cpu_usage },
            ];
            if (updatedData.length > 6) {
              updatedData.shift();
            }
            return updatedData;
          });
          setVpsStatus(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCPUUsage();

    const interval = setInterval(fetchCPUUsage, 3000);
    return () => clearInterval(interval);
  }, [id]);

  const chartOptions2 = {
    chart: {
      type: "area",
      stacked: false,
      height: "auto",
      foreColor: "#333",
      animations: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "solid",
      colors: [primaryColor],
      opacity: 0.8,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
  };

  const chartSeries2 = [
    {
      name: "CPU Usage (%)",
      data: cpuUsageData,
    },
  ];

  //Disk
  const fetchDiskUsage = () => {
    axios
      .get(`/api/container/${id}/disk_rw`)
      .then((response) => {
        const { disk_read, disk_write } = response.data;

        setDiskUsageData({
          disk_read: [
            ...diskUsageData.disk_read,
            { x: new Date(), y: disk_read },
          ],
          disk_write: [
            ...diskUsageData.disk_write,
            { x: new Date(), y: disk_write },
          ],
        });

        if (diskUsageData.disk_read.length > 6) {
          diskUsageData.disk_read.shift();
          diskUsageData.disk_write.shift();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const interval = setInterval(fetchDiskUsage, 3000);

    return () => clearInterval(interval);
  }, [id, diskUsageData]);

  const chartOptions3 = {
    chart: {
      type: "area",
      stacked: true,
      height: "auto",
      foreColor: "#333",
      animations: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "solid",
      opacity: 0.8,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
  };

  const chartSeries3 = [
    {
      name: "Disk Read (KB/s)",
      data: diskUsageData.disk_read,
      color: "#7fa81e",
    },
    {
      name: "Disk Write (KB/s)",
      data: diskUsageData.disk_write,
      color: "#f76525",
    },
  ];

  //Traffic
  const fetchTrafficData = () => {
    axios
      .get(`/api/container/${id}/traffic`)
      .then((response) => {
        const { traffic_incoming, traffic_outgoing } = response.data;

        setTrafficData((prevData) => {
          const updatedData = {
            traffic_incoming: [
              ...prevData.traffic_incoming,
              { x: new Date(), y: traffic_incoming },
            ],
            traffic_outgoing: [
              ...prevData.traffic_outgoing,
              { x: new Date(), y: traffic_outgoing },
            ],
          };

          if (updatedData.traffic_incoming.length > 6) {
            updatedData.traffic_incoming.shift();
            updatedData.traffic_outgoing.shift();
          }

          return updatedData;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const interval = setInterval(fetchTrafficData, 3000);

    return () => clearInterval(interval);
  }, [id]);

  const chartOptions4 = {
    chart: {
      type: "area",
      stacked: true,
      height: "auto",
      foreColor: "#333",
      animations: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "solid",
      opacity: 0.8,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
  };

  const chartSeries4 = [
    {
      name: "Traffic Incoming (KB/s)",
      data: trafficData.traffic_incoming,
      color: "#f2183d",
    },
    {
      name: "Traffic Outgoing (KB/s)",
      data: trafficData.traffic_outgoing,
      color: "#e60779",
    },
  ];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-gray-800 leading-tight">
          <div className="row">
            <div className="col-sm-7">
              <p className="font-semibold text-xl">
                {containerData ? containerData.ip_address : "Overview VPS"}
              </p>
            </div>
            <div className="col-sm-5">
              <Button
                onClick={handleStart}
                disabled={buttonDisabled}
                startIcon={<PlayArrowIcon />}
              >
                Start
              </Button>
              <Button
                onClick={handleStop}
                disabled={buttonDisabled}
                startIcon={<StopIcon />}
              >
                Stop
              </Button>
              <Button
                onClick={handleRestart}
                disabled={buttonDisabled}
                startIcon={<RestartAltIcon />}
              >
                Restart
              </Button>
              <Button
                variant="outlined"
                disabled={buttonDisabled}
                startIcon={<TerminalIcon />}
                onClick={() => {
                  setValue("2");
                }}
              >
                Open Console
              </Button>
            </div>
          </div>
        </h2>
      }
    >
      <Head title="Manage VPS" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <Tab label="Overview" value="1" />
                    <Tab label="Console" value="2" />
                    <Tab label="Settings" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  {vpsStatus === "powered_off" ? (
                    <div className="text-center">
                      <p>
                        This VPS is powered off.
                        <Button
                          onClick={handleStart}
                          disabled={buttonDisabled}
                          startIcon={<PlayArrowIcon />}
                        >
                          Start
                        </Button>
                      </p>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-3">
                            <div
                              className="text-center"
                              style={{ padding: "16px" }}
                            >
                              <MemoryIcon
                                sx={{
                                  fontSize: 64,
                                  color: theme.palette.primary.main,
                                }}
                              />
                              <br />
                              {containerData ? containerData.memory : ""} GB RAM
                            </div>
                          </div>
                          <div className="col-sm-9">
                            <ApexCharts
                              options={chartOptions}
                              series={chartSeries}
                              type="area"
                              width="100%"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-3">
                            <div
                              className="text-center"
                              style={{ padding: "16px" }}
                            >
                              <DynamicFormIcon
                                sx={{
                                  fontSize: 64,
                                  color: theme.palette.primary.main,
                                }}
                              />
                              <br />
                              {containerData ? containerData.vcpu : ""} vCPU
                              core(s)
                            </div>
                          </div>
                          <div className="col-sm-9">
                            <ApexCharts
                              options={chartOptions2}
                              series={chartSeries2}
                              type="area"
                              width="100%"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <div
                                className="text-center"
                                style={{ padding: "16px" }}
                              >
                                <AlbumIcon
                                  sx={{
                                    fontSize: 64,
                                    color: theme.palette.primary.main,
                                  }}
                                />
                                <br />
                                HDD read/write
                              </div>
                            </div>
                            <div className="col-sm-9">
                              <ApexCharts
                                options={chartOptions3}
                                series={chartSeries3}
                                type="area"
                                width="100%"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <div
                                className="text-center"
                                style={{ padding: "16px" }}
                              >
                                <LanIcon
                                  sx={{
                                    fontSize: 64,
                                    color: theme.palette.primary.main,
                                  }}
                                />
                                <br />
                                Bandwidth usage <br /> (
                                {containerData ? containerData.ip_address : ""})
                              </div>
                            </div>
                            <div className="col-sm-9">
                              <ApexCharts
                                options={chartOptions4}
                                series={chartSeries4}
                                type="area"
                                width="100%"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabPanel>
                <TabPanel value="2">
                  <Console host={host} password={password} />
                </TabPanel>
                <TabPanel value="3">
                  <div className="py-3">
                    <Typography variant="h6">Root password </Typography>
                    <p>Set new root password for VPS.</p>
                    <br />
                    <form onSubmit={handleSubmitPwd}>
                      <div className="row">
                        <div className="col-sm-6">
                          <TextField
                            variant="filled"
                            label="Root password"
                            id="rootpwd"
                            name="rootpwd"
                            type={passwordVisibility ? "text" : "password"}
                            onChange={(e) => setRootpwd(e.target.value)}
                            fullWidth
                            required
                            inputProps={{ minLength: 9, maxLength: 32 }}
                            InputProps={{
                              endAdornment: (
                                <>
                                  <IconButton
                                    onClick={handlePasswordVisibility}
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </>
                              ),
                            }}
                          />
                        </div>

                        <div className="col-sm-6">
                          <Button
                            type="submit"
                            variant="contained"
                            style={{ marginTop: "8px" }}
                          >
                            Set password
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <Divider />
                  <div className="py-3">
                    <div className="row">
                      <div className="col-sm-6">
                        <Typography variant="h6">Reset nameservers</Typography>
                        <p>
                          The name servers of the VPS are set to the default
                          state. This may affect the VPS's Internet connection.
                        </p>
                        <br />
                      </div>

                      <div className="col-sm-6">
                        <Button
                          variant="contained"
                          style={{ marginTop: "32px" }}
                          onClick={handleSubmitNS}
                        >
                          Reset nameservers
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
