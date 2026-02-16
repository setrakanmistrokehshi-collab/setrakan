import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const BASE_URL_URL = import.meta.env.VITE_BASE_URL;

  // 1. Load current user data when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Try these endpoints one by one — use the one that works for your backend
        // Option A: Most common pattern
        // const res = await axios.get(`${BASE_URL}/api/auth/${id}`);
        
        // Option B: If your edit route supports GET
        const res = await axios.get(`${BASE_URL_URL}/auth/edit/${id}`);
        
        // Option C: If it's /users or something else
        // const res = await axios.get(`${BASE_URL}/users/${id}`);

        const user = res.data;
        setFirstName(user.firstName || user.firstname || "");
        setLastName(user.lastName || user.lastname || "");
        setEmail(user.email || "");
        setError(null);
      } catch (err) {
        console.error("Failed to load user:", err);
        setError("Could not load user details. Maybe the ID is wrong?");
      } finally {
        setPageLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      firstName,
      lastName,
      email,
      // Add password or other fields here ONLY if your backend expects them
    };

    try {
      const url = `${BASE_URL_URL}/auth/edit/${id}`;
      // Alternative URLs to try if this one fails:
      // const url = `${BASE_URL}/api/auth/update/${id}`;
      // const url = `${BASE_URL}/users/${id}`;

      const res = await axios.put(url, payload, {
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      console.log("Update response:", res.data);

      setSuccess(true);
      setTimeout(() => {
        navigate(-1); // or navigate("/users") or wherever your list is
      }, 1800);
    } catch (err) {
      console.error("Update failed:", err);
      const msg = err.response?.data?.message || err.message || "Update failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <CircularProgress sx={{ mt: 8, display: "block", mx: "auto" }} />;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 420, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" align="center">
          Update User
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            User updated successfully! Redirecting...
          </Alert>
        )}

        <form onSubmit={handleUpdate}>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
          />

          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={loading}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1.5 }}
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateUser;