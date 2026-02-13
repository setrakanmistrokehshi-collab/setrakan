import React, {useEffect, useState} from "react";
import { Box, Paper, Typography, Button,/*CircularProgress, Alert*/ } from "@mui/material";
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";


const UserDetails = () => {
    const {id}= useParams();
    const [user, setUser] =useState(null)
    const [loading, setLoading] = useState(true)
    let [error, setError]= useState('')
  const navigate = useNavigate();
  

   useEffect(() => {
    let fetchUsers= async () =>{
      if (!id) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }
      try {
        const res = await
        axios.get(api);
        setUser (res.data);
        console.log(res.data);
      }catch (error){
        console.error(err);
        setError(error);
      }  finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchUsers();
    }
   }, [id]);
   /* let fetchUser = async () => {
        try {
            //Construct the API URL with the specific ID
            const response = await axios.get (`https://students-learning-api.onrender.com/api/auth/${id}`);
            setUser(response);
            console.log(res)
        } catch (error) {
            setError("Failed to fetch user data");
           } finally{  setLoading(false);
        } 
            
    };
    if (id) {
        fetchUser();
    }
   }, [id]

if (loading) return <CircularProgress />
// if (error) return <Alert severity = "error">{error} </Alert>
if (!user) return <Typography> User Not Found </Typography>*/
if (loading) return <Typography> loading...</Typography>;
if (!user) return <Typography> No user data available. </Typography>
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
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,                                   
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          User Details
        </Typography>

        <Typography sx={{ mb: 1 }}>
          <b>ID:{user._id}</b>
        </Typography>
        <Typography sx={{ mb: 1 }}>
          <b>Name: {user.fullName}</b>
        </Typography>
        <Typography sx={{ mb: 1 }}>
          <b>Email: {user.email} </b>
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>Phone:{user. phoneNumber}</b>
        </Typography>

        <Button variant="contained" fullWidth onClick={() => navigate(-1)}>
          Back
        </Button>
      </Paper>
    </Box>
  );
};

export default UserDetails;