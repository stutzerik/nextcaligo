import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer" className="py-4 bg-gray-100"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          {new Date().getFullYear()} {" - "}
          <Link href="https://nextcaligo.cloud">
            NextCaligo VPS Control Panel
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}