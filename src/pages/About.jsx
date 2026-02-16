import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Optional background or hero image (replace with your own)
const heroBg = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

const About = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        pb: 8,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "60vh", md: "70vh" },
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: "2.5rem", md: "4rem" } }}
            >
              Setrakan Tech Hub Solution
            </Typography>
            <Typography
              variant="h5"
              sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
            >
              Empowering Innovation, Driving Digital Transformation in Lagos and Beyond
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => navigate("/contact")} // or your contact/register page
              sx={{
                py: 1.5,
                px: 5,
                fontSize: "1.2rem",
                background: "linear-gradient(135deg, #1976d2, #0d47a1)",
              }}
            >
              Join the Movement
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: -8, position: "relative", zIndex: 2 }}>
        <Grid container spacing={6}>
          {/* Who We Are */}
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 5, borderRadius: 4 }}>
              <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                Who We Are
              </Typography>
              <Divider sx={{ mb: 3, width: "80px", borderWidth: 3 }} />
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                Setrakan Tech Hub Solution is a dynamic technology and innovation ecosystem based in the heart of Lagos, Nigeria — Africa's fastest-growing tech capital.
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                Founded with a vision to bridge the gap between ideas and impactful solutions, we are more than just a workspace. We are a community that nurtures startups, empowers developers, connects entrepreneurs with investors, and delivers cutting-edge tech solutions to businesses across industries.
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                In a city that ranked as the world's fastest-growing tech ecosystem in 2025, Setrakan stands at the forefront — turning local talent into global opportunities.
              </Typography>
            </Paper>
          </Grid>

          {/* Our Mission & Vision */}
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 5, borderRadius: 4, height: "100%" }}>
              <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                Mission & Vision
              </Typography>
              <Divider sx={{ mb: 3, width: "80px", borderWidth: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                To provide accessible tools, mentorship, infrastructure, and networks that enable African innovators to build scalable, sustainable technology solutions that solve real-world problems.
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph>
                To become West Africa's leading tech hub — a vibrant epicenter where creativity meets execution, diversity fuels innovation, and technology becomes the engine of economic and social progress.
              </Typography>
            </Paper>
          </Grid>

          {/* What We Offer */}
          <Grid item xs={12}>
            <Paper elevation={6} sx={{ p: 5, borderRadius: 4 }}>
              <Typography variant="h4" align="center" gutterBottom color="primary" fontWeight="bold">
                What We Offer
              </Typography>
              <Divider sx={{ mb: 5, width: "120px", mx: "auto", borderWidth: 3 }} />

              <Grid container spacing={4}>
                {[
                  {
                    title: "Co-Working & Innovation Spaces",
                    desc: "Modern, high-speed internet-equipped spaces designed for collaboration, focus, and creativity.",
                  },
                  {
                    title: "Startup Incubation & Acceleration",
                    desc: "Programs that guide early-stage ventures from idea to product-market fit with mentorship and funding connections.",
                  },
                  {
                    title: "Tech Training & Workshops",
                    desc: "Hands-on sessions in AI, web/mobile development, cloud computing, UI/UX, and digital skills for youth and professionals.",
                  },
                  {
                    title: "Custom Tech Solutions",
                    desc: "End-to-end development services — from app/web development to AI integration and digital transformation consulting.",
                  },
                  {
                    title: "Community & Networking Events",
                    desc: "Hackathons, meetups, pitch nights, and investor demo days to foster connections and collaboration.",
                  },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                      sx={{
                        p: 3,
                        border: "1px solid #e0e0e0",
                        borderRadius: 3,
                        height: "100%",
                        transition: "all 0.3s",
                        "&:hover": { boxShadow: 6, transform: "translateY(-8px)" },
                      }}
                    >
                      <Typography variant="h6" gutterBottom color="primary">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          mt: 10,
          py: 8,
          background: "linear-gradient(135deg, #0d47a1, #1976d2)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Ready to Shape the Future with Us?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Whether you're a startup founder, developer, student, or business looking for tech solutions — Setrakan Tech Hub Solution is your partner in Lagos.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white",
              color: "#0d47a1",
              px: 6,
              py: 1.8,
              fontSize: "1.2rem",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
            onClick={() => navigate("/contact")}
          >
            Get in Touch Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default About;