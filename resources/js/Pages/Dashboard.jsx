import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ApexCharts from "react-apexcharts";
import MemoryIcon from "@mui/icons-material/Memory";
import { useTheme } from "@mui/material/styles";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import AlbumIcon from "@mui/icons-material/Album";
import LanIcon from "@mui/icons-material/Lan";

export default function Manage({ auth, id }) {
  const [value, setValue] = React.useState("1");
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
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  //Memory
  const fetchMemoryUsage = () => {
    axios
      .get(`/api/server/memory`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
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
      .get(`/api/server/cpu`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
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
      .get(`/api/server/disk_rw`)
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
      .get(`/api/server/traffic`)
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
          <p className="font-semibold text-xl">Dashboard</p>
        </h2>
      }
    >
      <Head title="Manage VPS" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg py-3">
            <div className="row">
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-sm-3">
                    <div className="text-center" style={{ padding: "16px" }}>
                      <MemoryIcon
                        sx={{
                          fontSize: 64,
                          color: theme.palette.primary.main,
                        }}
                      />
                      <br />
                      Memory usage
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
                    <div className="text-center" style={{ padding: "16px" }}>
                      <DynamicFormIcon
                        sx={{
                          fontSize: 64,
                          color: theme.palette.primary.main,
                        }}
                      />
                      <br />
                      CPU usage
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
                      <div className="text-center" style={{ padding: "16px" }}>
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
                      <div className="text-center" style={{ padding: "16px" }}>
                        <LanIcon
                          sx={{
                            fontSize: 64,
                            color: theme.palette.primary.main,
                          }}
                        />
                        <br />
                        Bandwidth usage
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
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}