import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  IconButton,
  Button,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import "font-logos/assets/font-logos.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import MemoryIcon from "@mui/icons-material/Memory";
import AlbumIcon from "@mui/icons-material/Album";
import BuildIcon from "@mui/icons-material/Build";
import { styled } from "@mui/material/styles";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const OSList = styled("div")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "36px",
}));

export default function List({ auth }) {
  const [deployments, setDeployments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("/api/deployments")
      .then((response) => {
        setDeployments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCopyIP = (ipAddress) => {
    const textArea = document.createElement("textarea");
    textArea.value = ipAddress;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  const filteredDeployments = deployments.filter((deployment) =>
    deployment.ip_address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          List instances
        </h2>
      }
    >
      <Head title="List instances" />
      <Container>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div>
                <div className="py-3 col-sm-4">
                  <TextField
                    label="Search by IPv4 address..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="filled"
                    fullWidth
                  />
                </div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Container ID</TableCell>
                          <TableCell>IPv4 address</TableCell>
                          <TableCell>Resources</TableCell>
                          <TableCell>Operating system</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredDeployments
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((deployment) => (
                            <TableRow key={deployment.id}>
                              <TableCell>
                                {deployment.container_id || "N/A"}
                              </TableCell>
                              <TableCell>
                                {deployment.ip_address || "N/A"}
                                <IconButton
                                  color="primary"
                                  onClick={() =>
                                    handleCopyIP(deployment.ip_address)
                                  }
                                >
                                  <ContentCopyIcon />
                                </IconButton>
                              </TableCell>
                              <TableCell>
                                <DynamicFormIcon /> {deployment.vcpu || "N/A"}{" "}
                                vCPU cores, <MemoryIcon />{" "}
                                {deployment.memory || "N/A"} GB RAM,{" "}
                                <AlbumIcon />{" "}
                                {deployment.disk_size || "N/A"} GB Disk
                              </TableCell>
                              <TableCell
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <OSList style={{ marginRight: "8px" }}>
                                  {getIconForTemplate(deployment.template)}
                                </OSList>
                                {deployment.template || "N/A"}
                              </TableCell>
                              <TableCell>
                                <Button
                                  align="center"
                                  variant="text"
                                  href={`/instances/${deployment.id}/manage`}
                                  startIcon={<BuildIcon />}
                                >
                                  Manage
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredDeployments.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </div>
          </div>
        </div>
      </Container>
    </AuthenticatedLayout>
  );
}

function getIconForTemplate(template) {
  if (template.includes("centos")) {
    return <i className="fl-centos"></i>;
  }
  if (template.includes("debian")) {
    return <i className="fl-debian"></i>;
  }
  if (template.includes("ubuntu")) {
    return <i className="fl-ubuntu"></i>;
  }
  if (template.includes("rocky")) {
    return <i className="fl-rocky"></i>;
  }
  if (template.includes("almalinux")) {
    return <i className="fl-almalinux"></i>;
  }
  if (template.includes("fedora")) {
    return <i className="fl-fedora"></i>;
  }
  if (template.includes("rhel")) {
    return <i className="fl-redhat"></i>;
  }
  if (template.includes("almalinux")) {
    return <i className="fl-almalinux"></i>;
  } else {
    return "Other Linux distro";
  }

  return null;
}
