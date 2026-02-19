import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Stack,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL ;

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE}/api/users/${id}`);
        setUser(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(
          err.response?.status === 404
            ? "User not found"
            : "Failed to load user details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Alert
          severity="error"
          sx={{
            maxWidth: { xs: "100%", sm: 500 },
            width: "100%",
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          {error || "User not found"}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: { xs: "scroll", md: "fixed" }, // scroll on mobile for performance
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => navigate("/users")}
          sx={{
            color: "white",
            mb: { xs: 3, sm: 4 },
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          Back to Users List
        </Button>

        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 5, md: 6 },
            borderRadius: { xs: 3, sm: 4 },
            background: "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(12px)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            color="primary"
            sx={{ fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" } }}
          >
            User Profile
          </Typography>

          <Divider sx={{ my: { xs: 2, sm: 3 } }} />

          <Stack
            spacing={{ xs: 2, sm: 2.5 }}
            alignItems="center"
            sx={{ textAlign: "left", maxWidth: "100%" }}
          >
            <Typography variant="h6" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
              <strong>ID:</strong> {user._id}
            </Typography>

            <Typography variant="h6" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
              <strong>Full Name:</strong> {user.firstName} {user.lastName}
            </Typography>

            <Typography variant="h6" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
              <strong>Email:</strong> {user.email}
            </Typography>

            {user.phoneNumber && (
              <Typography variant="h6" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                <strong>Phone:</strong> {user.phoneNumber}
              </Typography>
            )}

            {user.address && (
              <Typography variant="h6" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                <strong>Address:</strong> {user.address}
              </Typography>
            )}

            {user.country && (
              <Typography variant="h6" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                <strong>Country:</strong> {user.country}
              </Typography>
            )}
          </Stack>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => navigate("/users")}
            sx={{
              mt: { xs: 4, sm: 5 },
              py: { xs: 1.5, sm: 1.8 },
              fontSize: { xs: "1rem", sm: "1.1rem" },
            }}
          >
            Back to Users List
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserDetails;