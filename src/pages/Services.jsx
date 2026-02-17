import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

const sampleImages = [
  "https://uicookies.com/wp-content/uploads/2019/10/free-bootstrap-personal-website-template-1000x750.jpg",
  "https://colorlib.com/wp/wp-content/uploads/sites/2/amike-personal-website-template.jpg",
  "https://assets.justinmind.com/wp-content/uploads/2020/02/website-mockup-design-jesica.png",
  "https://a.storyblok.com/f/165154/1280x720/4a7d02d6e0/01_ecommerce-website-examples.jpg/m/",
  "https://s3-alpha.figma.com/hub/file/6289295399/79cb2639-6844-4824-bdc1-dce9cc794403-cover.png",
  "https://img.freepik.com/free-vector/business-landing-page-template_52683-28749.jpg",
  "https://catchthemes.com/wp-content/uploads/2019/08/clean-enterprise-free-business-wordpress-theme.jpg",
  "https://mediamodifier.com/blog/wp-content/uploads/2020/07/05-website-portfolio-screen-mockup.jpg",
  "https://unbounce.com/photos/40-LP-examples-of-2023-horizontal.jpg",
];

export default function WebDevServices() {
  const navigate = useNavigate();

  const whatsappUrl = import.meta.env.VITE_WHATSAPP_URL || "";
  const emailUrl = import.meta.env.VITE_EMAIL_URL || "";

  const packages = [
    {
      title: "Basic Personal / Landing Page",
      description: "Perfect for individuals, freelancers, or simple business presence. One-page or 3-5 page site with modern design.",
      priceUSD: "$200 – $600",
      priceNGN: "₦300,000 – ₦960,000",
      features: ["Responsive Design", "Contact Form", "SEO Basics", "1 Week Delivery", "1 Revision Round"],
      bestFor: "Personal portfolios, landing pages, small businesses",
    },
    {
      title: "Professional Portfolio / Blog",
      description: "Showcase your work or brand with style. Custom design, blog functionality, and enhanced features.",
      priceUSD: "$400 – $1,500",
      priceNGN: "₦680,000 – ₦2,400,000",
      features: ["Custom Design", "Blog/CMS", "Gallery", "Advanced SEO", "Social Integration", "2–3 Weeks Delivery"],
      bestFor: "Creatives, bloggers, professionals",
    },
    {
      title: "E-Commerce Online Store",
      description: "Fully functional shop with payment integration.",
      priceUSD: "$1,500 – $3,000",
      priceNGN: "₦2,400,000 – ₦4,800,000",
      features: ["Product Catalog", "Paystack/Flutterwave", "Cart & Checkout", "Admin Dashboard", "SSL & Security", "3–5 Weeks Delivery"],
      bestFor: "Retail businesses",
    },
    {
      title: "Enterprise / Corporate Portal",
      description: "Scalable and secure platform for large organizations.",
      priceUSD: "$3,000+ (Custom Quote)",
      priceNGN: "₦4,800,000+ (Custom Quote)",
      features: ["Custom Backend", "User Login", "API Integrations", "Advanced Security", "Ongoing Support", "6+ Weeks Delivery"],
      bestFor: "Corporates & SaaS companies",
    },
  ];

  const handleContact = (type) => {
    if (type === "whatsapp") {
      window.open(`${whatsappUrl}`, "website-development-inquiry");
    } else {
      window.open(`mailto:${emailUrl}?subject=Website%20Development%20Inquiry`, "website-development-inquiry");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Back Button */}
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Button startIcon={<ArrowBackIcon />} variant="text" onClick={() => navigate("/")} sx={{ fontWeight: 600 }}>
          Back to Home
        </Button>
      </Container>

      {/* Hero */}
      <Box sx={{ background: "linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)", color: "white", py: { xs: 10, md: 14 }, textAlign: "center" }}>
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight="bold" sx={{ fontSize: { xs: "2.4rem", md: "3.8rem" } }}>
            Professional Website Development
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 900, mx: "auto", my: 4 }}>
            From stunning personal sites to powerful enterprise platforms — built by Setrakan Tech Hub in Lagos.
          </Typography>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Starting from <strong>$200</strong> / <strong>₦300,000</strong>
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="center">
            <Button variant="contained" size="large" startIcon={<WhatsAppIcon />} onClick={() => handleContact("whatsapp")} sx={{ bgcolor: "#25D366" }}>
              Get Quote on WhatsApp
            </Button>
            <Button variant="outlined" size="large" startIcon={<EmailIcon />} onClick={() => handleContact("email")} sx={{ borderColor: "white", color: "white" }}>
              Email Us
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Sample Websites */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom color="primary">
          See What We Can Build For You
        </Typography>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {sampleImages.map((img, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card elevation={6} sx={{ borderRadius: 3, overflow: "hidden" }}>
                <CardMedia component="img" image={img} sx={{ height: 260, objectFit: "cover" }} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Packages - Description & Centered Features */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom color="primary">
          Choose Your Perfect Package
        </Typography>

        <Grid container spacing={4}>
          {packages.map((pkg) => (
            <Grid item xs={12} md={6} key={pkg.title}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 4 }}>
                <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 4 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {pkg.title}
                  </Typography>

                  <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.8, my: 3, color: "text.secondary" }}>
                    {pkg.description}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 3 }}>
                    Best for: {pkg.bestFor}
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  {/* Centered Features - Icon & Text Closely Aligned */}
                  <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                    What’s Included:
                  </Typography>

                  <List sx={{ textAlign: "center" }}>
                    {pkg.features.map((f) => (
                      <ListItem 
                        key={f} 
                        disablePadding 
                        sx={{ 
                          py: 0.8, 
                          justifyContent: "center",
                          gap: 0.1  // ← This controls spacing between icon and text
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: "36" }}>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={f} 
                          sx={{ textAlign: "left", flex: "none" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

                <Box sx={{ p: 3, bgcolor: "primary.50", textAlign: "center" }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {pkg.priceUSD}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {pkg.priceNGN}
                  </Typography>
                </Box>

                <CardActions sx={{ p: 3 }}>
                  <Button fullWidth variant="contained" startIcon={<WhatsAppIcon />} onClick={() => handleContact("whatsapp")}>
                    Get This Package
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Final CTA */}
      <Box sx={{ py: 10, textAlign: "center", bgcolor: "#f0f4f8" }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Launch Your Dream Website?
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="center" sx={{ mt: 4 }}>
            <Button variant="contained" size="large" startIcon={<WhatsAppIcon />} onClick={() => handleContact("whatsapp")} sx={{ bgcolor: "#25D366" }}>
              Start via WhatsApp
            </Button>
            <Button variant="outlined" size="large" startIcon={<EmailIcon />} onClick={() => handleContact("email")}>
              Send Email Inquiry
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}