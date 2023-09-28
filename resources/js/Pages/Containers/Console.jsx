import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Button, TextField, LinearProgress } from "@mui/material";

const socket = io("http://localhost:3000");

function Console({ host, password }) {
  const [sshData, setSshData] = useState("");
  const [sshInput, setSshInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    socket.on("sshReady", () => {
      setConnected(true);
    });

    socket.on("sshData", (data) => {
      setSshData((prevData) => prevData + data);
    });

    socket.on("sshError", (error) => {
      setConnectionError(true);
      console.error("SSH connection error:", error);
    });

    socket.emit("connectSSH", { host, username: "root", password });
  }, [host, password]);

  const handleSSHInputChange = (e) => {
    setSshInput(e.target.value);
  };

  const handleSSHSubmit = (e) => {
    e.preventDefault();

    socket.emit("sshCommand", sshInput);
    setSshInput("");
  };

  return (
    <div>
      {connected ? (
        <form onSubmit={handleSSHSubmit}>
          <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <div className="terminal">
                <pre>{sshData}</pre>
              </div>
              <div class="row">
                <div class="col-sm-10">
                  <TextField
                    style={{ marginTop: "24px" }}
                    type="text"
                    fullWidth
                    label="Command"
                    variant="filled"
                    value={sshInput}
                    onChange={handleSSHInputChange}
                  />
                </div>
                <div class="col-sm-2">
                  <Button
                    style={{ marginTop: "36px" }}
                    variant="contained"
                    type="submit"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div>
          <div class="col-sm-6">
            <LinearProgress />
          </div>
          <p>Connecting...</p>
        </div>
      )}
      {connectionError && <p>Failed to connect to SSH server.</p>}
    </div>
  );
}

export default Console;