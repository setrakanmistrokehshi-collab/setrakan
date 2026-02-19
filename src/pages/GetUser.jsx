import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const GetUser = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [deleteDialog, setDeleteDialog] = useState({ open: false, userId: null, userName: "" });
  const [viewUser, setViewUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  const API_BASE = import.meta.env.VITE_API_URL || "https://students-learning-api.onrender.com";

  // Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/users`);
        setUsers(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Search when user clicks button or presses Enter
  const handleSearch = () => {
    setAppliedSearch(searchTerm);
    setPage(0);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Processed & Sorted Users
  const processedUsers = useMemo(() => {
    let result = users.filter((user) =>
      `${user.firstName || ""} ${user.lastName || ""} ${user.email || ""}`
        .toLowerCase()
        .includes(appliedSearch.toLowerCase())
    );

    // Sorting
    switch (sortBy) {
      case "name-az":
        result.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
        break;
      case "name-za":
        result.sort((a, b) => `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`));
        break;
      case "email-az":
        result.sort((a, b) => (a.email || "").localeCompare(b.email || ""));
        break;
      case "email-za":
        result.sort((a, b) => (b.email || "").localeCompare(a.email || ""));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      default:
        break;
    }
    return result;
  }, [users, appliedSearch, sortBy]);

  const paginatedUsers = processedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const exportToCSV = () => {
    const headers = ["First Name", "Last Name", "Email"];
    const rows = processedUsers.map((u) => [u.firstName || "", u.lastName || "", u.email || ""]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `users_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/users/delete/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setDeleteDialog({ open: false, userId: null, userName: "" });
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 10 }} />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        "&::before": { content: '""', position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.75)" },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2, p: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
            <Typography variant="h4" fontWeight="bold" color="white">
              All Registered Users
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button variant="contained" startIcon={<DownloadIcon />} onClick={exportToCSV}>
                Export CSV
              </Button>
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/register")}>
                Add New User
              </Button>
            </Stack>
          </Box>

          {/* Search + Sort */}
          <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
            <TextField
              fullWidth
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1, minWidth: 280 }}
            />

            <Button variant="contained" onClick={handleSearch} sx={{ px: 5 }}>
              Search
            </Button>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="name-az">Name A–Z</MenuItem>
                <MenuItem value="name-za">Name Z–A</MenuItem>
                <MenuItem value="email-az">Email A–Z</MenuItem>
                <MenuItem value="email-za">Email Z–A</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <Paper elevation={8} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "#0d47a1" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Avatar</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Full Name</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user._id} hover>
                      <TableCell>
                        <Avatar sx={{ bgcolor: "#1976d2" }}>
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </Avatar>
                      </TableCell>
                      <TableCell>{user.firstName} {user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton color="info" onClick={() => setViewUser(user)}>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton color="primary" onClick={() => navigate(`/users/edit/${user._id}`)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => setDeleteDialog({ open: true, userId: user._id, userName: `${user.firstName} ${user.lastName}` })}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={processedUsers.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </Paper>
        </Container>
      </Box>

      {/* View User Modal */}
      {viewUser && (
        <Dialog open onClose={() => setViewUser(null)} maxWidth="sm" fullWidth>
          <DialogTitle>User Details</DialogTitle>
          <DialogContent>
            <Typography><strong>Name:</strong> {viewUser.firstName} {viewUser.lastName}</Typography>
            <Typography><strong>Email:</strong> {viewUser.email}</Typography>
            {viewUser.phoneNumber && <Typography><strong>Phone:</strong> {viewUser.phoneNumber}</Typography>}
            {viewUser.address && <Typography><strong>Address:</strong> {viewUser.address}</Typography>}
            {viewUser.country && <Typography><strong>Country:</strong> {viewUser.country}</Typography>}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewUser(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, userId: null, userName: "" })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{deleteDialog.userName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, userId: null, userName: "" })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => handleDelete(deleteDialog.userId)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GetUser;