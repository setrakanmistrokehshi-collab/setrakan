import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Grid, // ← Stable Grid (no Unstable_Grid2)
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

// Simple Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 3 }}>
          <Alert severity="error" sx={{ maxWidth: 500 }}>
            Something went wrong. Please refresh the page.
          </Alert>
        </Box>
      );
    }
    return this.props.children;
  }
}

const Registration = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{10,15}$/;

  const countries = [
    "Nigeria",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "India",
    "South Africa",
    "Kenya",
    "Ghana",
    "Brazil",
    "Japan",
    "China",
    "Mexico",
    "Other",
  ];

  const validateForm = () => {
    const errors = [];

    if (!firstName.trim()) errors.push("First Name is required");
    if (!lastName.trim()) errors.push("Last Name is required");
    if (!email.trim()) {
      errors.push("Email is required");
    } else if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email address");
    }
    if (!password) {
      errors.push("Password is required");
    } else if (password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }
    if (!country) errors.push("Country is required");
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      errors.push("Please enter a valid phone number (10-15 digits, optional +)");
    }

    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setServerError("");
    setValidationErrors([]);
    setSuccess(false);

    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    const formData = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      country,
    };

    setLoading(true);
    try {
      const api = await axios.post(
        "https://students-learning-api.onrender.com/register/auth",
        formData
      );
      console.log("Success:", api.data);
      setSuccess(true);
      setTimeout(() => navigate("/Login"), 2000);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        "Registration failed ().";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage =
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  return (
    <ErrorBoundary>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: { xs: "scroll", md: "fixed" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 1, sm: 2 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Paper
            elevation={12}
            sx={{
              p: { xs: 3, sm: 4 },
              width: { xs: "95vw", sm: "90vw", md: 540 },
              maxWidth: 540,
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.96)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                mb: 3,
                color: "#0d47a1",
                textAlign: "center",
                fontSize: { xs: "1.6rem", sm: "1.875rem" },
              }}
            >
              Create Account
            </Typography>

            {/* Validation Summary */}
            {validationErrors.length > 0 && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Please fix the following errors:
                </Typography>
                <List dense disablePadding>
                  {validationErrors.map((err, index) => (
                    <ListItem key={index} sx={{ py: 0.2 }}>
                      <ListItemText primary={`• ${err}`} />
                    </ListItem>
                  ))}
                </List>
              </Alert>
            )}

            {serverError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {serverError}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Registration successful! Redirecting to login...
              </Alert>
            )}

            <Box component="form" onSubmit={handleRegister}>
              <Grid container spacing={{ xs: 2, sm: 2.5 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    error={validationErrors.some(e => e.includes("First Name"))}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    error={validationErrors.some(e => e.includes("Last Name"))}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    error={validationErrors.some(e => e.includes("email"))}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    error={validationErrors.some(e => e.includes("Password"))}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    error={validationErrors.some(e => e.includes("phone"))}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Country *</InputLabel>
                    <Select
                      value={country}
                      label="Country *"
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      error={validationErrors.some(e => e.includes("Country"))}
                      MenuProps={{ disablePortal: true }}
                    >
                      {countries.map((c) => (
                        <MenuItem key={c} value={c}>{c}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.8,
                  fontWeight: "bold",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  background: "linear-gradient(135deg, #1976d2, #0d47a1)",
                  boxShadow: "0 6px 25px rgba(13, 71, 161, 0.4)",
                  "&:hover": { background: "linear-gradient(135deg, #1565c0, #0d47a1)" },
                }}
              >
                {loading ? <CircularProgress size={28} color="inherit" /> : "Register"}
              </Button>
            </Box>

            <Typography sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?{" "}
              <Link to="/Login" style={{ color: "#1976d2", fontWeight: 600, textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    </ErrorBoundary>
  );
};

export default Registration;