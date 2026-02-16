import React, { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Chip,
  Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
//import AccessTimeIcon from "@mui/icons-material/AccessTimeIcon";
import GroupIcon from "@mui/icons-material/Group";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

// Fallback for image errors
function ImageWithFallback({ src, alt, sx }) {
  const [imgSrc, setImgSrc] = useState(src);
  const fallback = "https://via.placeholder.com/800x450?text=Setrakan+Tech+Hub";
  return (
    <CardMedia
      component="img"
      image={imgSrc || fallback}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      sx={sx}
    />
  );
}

/* --- Services Data --- */
const allServices = [
  {
    id: 1,
    name: "Daily Co-Working Pass",
    description: "Full-day access to our modern co-working space with high-speed internet, coffee, and meeting rooms.",
    image: "https://www.coworkbooking.com/images/1600!0/kapacita/8589/hub-one-fcmb-leadspace-2-.jpg",
    price: 5000,
    originalPrice: 7000,
    features: ["High-Speed WiFi", "Ergonomic Desk", "Free Coffee", "Printing", "Meeting Room Access"],
    category: "Co-Working",
    duration: "1 Day",
    reviews: 342,
  },
  {
    id: 2,
    name: "Monthly Co-Working Membership",
    description: "Unlimited access to dedicated or hot desks, plus member events and priority booking.",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*argyt6o6otOxYmMWPVMbnQ.jpeg",
    price: 45000,
    originalPrice: 60000,
    features: ["Dedicated Desk Option", "24/7 Access", "Locker", "Networking Events", "Mentor Sessions"],
    category: "Co-Working",
    duration: "1 Month",
    reviews: 189,
  },
  {
    id: 3,
    name: "Startup Incubation Program",
    description: "6-month intensive program with mentorship, funding connections, office space, and legal support.",
    image: "https://static.youthop.com/uploads/2026/01/mentorship-program-at-qualcomm-2026.jpg",
    price: 1200000,
    originalPrice: 1500000,
    features: ["Expert Mentorship", "Investor Pitching", "Dedicated Office", "Legal & Accounting Support", "Demo Day"],
    category: "Incubation",
    duration: "6 Months",
    reviews: 67,
  },
  {
    id: 4,
    name: "Web Development Bootcamp",
    description: "Intensive 8-week course covering React, Node.js, and full-stack development with real projects.",
    image: "https://africa-school-bucket3.s3.amazonaws.com/static/img/school/2022/01/28/techstudioacademy.jpg",
    price: 80000,
    originalPrice: 100000,
    features: ["Live Classes", "Project-Based", "Certificate", "Job Placement Assistance", "Lifetime Access"],
    category: "Training",
    duration: "8 Weeks",
    reviews: 456,
  },
  {
    id: 5,
    name: "Custom Software Development",
    description: "Tailored web/mobile apps, ERP systems, or digital transformation solutions for your business.",
    image: "https://www.nerdbug.io/_next/image?url=%2Fsoftware-dev-bg.png&w=3840&q=75",
    price: 2500000,
    originalPrice: null,
    features: ["Requirements Analysis", "Agile Development", "Post-Launch Support", "Scalable Architecture", "UI/UX Design"],
    category: "Custom Solutions",
    duration: "Project-Based",
    reviews: 98,
  },
  {
    id:   6,
    name: "Tech Networking Event Ticket",
    description: "Join monthly meetups, pitch nights, and hackathons with Lagos' top tech leaders and investors.",
    image: "https://s.yimg.com/ny/api/res/1.2/c2CrFNBIcyFASet4TKIHmA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://media.zenfs.com/en/globenewswire.com/536053b493ad7c7e319de8e257c247ab",
    price: 15000,
    originalPrice: 20000,
    features: ["Keynote Speakers", "Networking", "Food & Drinks", "Startup Pitches", "Swag Bag"],
    category: "Events",
    duration: "1 Event",
    reviews: 512,
  },
];

/* --- Icons for features --- */
const featureIcons = {
  "High-Speed WiFi": <WifiIcon fontSize="small" />,
  "Ergonomic Desk": <GroupIcon fontSize="small" />,
  "Free Coffee": <LocalCafeIcon fontSize="small" />,
  "Expert Mentorship": <SchoolIcon fontSize="small" />,
  "Investor Pitching": <EventIcon fontSize="small" />,
  "Live Classes": <CodeIcon fontSize="small" />,
  "Project-Based": <CodeIcon fontSize="small" />,
};

export default function ServicesPage({ onNavigate = () => {} }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  // Replace with your real contacts
  const whatsappNumber = "2348012345678";
  const email = "info@setrakan.com";

  const filteredServices = useMemo(() => {
    return allServices.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
      const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, categoryFilter, priceRange]);

  const sortedServices = useMemo(() => {
    const copy = [...filteredServices];
    switch (sortBy) {
      case "price-low":
        return copy.sort((a, b) => a.price - b.price);
      case "price-high":
        return copy.sort((a, b) => b.price - a.price);
      case "popular":
        return copy.sort((a, b) => b.reviews - a.reviews);
      default:
        return copy;
    }
  }, [filteredServices, sortBy]);

  const handleBook = (serviceName) => {
    const message = encodeURIComponent(`Hi, I'm interested in booking: ${serviceName}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const handleContact = () => {
    window.open(`mailto:${email}?subject=Inquiry%20about%20Setrakan%20Services`, "_blank");
  };

  const resetFilters = () => {
    setCategoryFilter("all");
    setPriceRange([0, 3000000]);
    setSearchTerm("");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f7fafc" }}>
      {/* Header */}
      <Box sx={{ backgroundColor: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <Box sx={{ maxWidth: 1280, mx: "auto", px: 3, py: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Button startIcon={<ArrowBackIcon />} variant="text" onClick={() => onNavigate("home")}>
              Back to Home
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              alignItems: { lg: "center" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight={700}>
                Setrakan Tech Hub Services
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {sortedServices.length} services available • Co-working, Training, Incubation & More in Lagos
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, lg: 0 }, alignItems: "center" }}>
              <TextField
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ width: 320 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters((s) => !s)}
                sx={{ display: { lg: "none" } }}
              >
                Filters
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1280, mx: "auto", px: 3, py: 4 }}>
        <Grid container spacing={3}>
          {/* Filters Sidebar */}
          <Grid item xs={12} lg={3} sx={{ display: { xs: showFilters ? "block" : "none", lg: "block" } }}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>

              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select value={categoryFilter} label="Category" onChange={(e) => setCategoryFilter(e.target.value)}>
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="Co-Working">Co-Working</MenuItem>
                  <MenuItem value="Incubation">Incubation</MenuItem>
                  <MenuItem value="Training">Training</MenuItem>
                  <MenuItem value="Custom Solutions">Custom Solutions</MenuItem>
                  <MenuItem value="Events">Events</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Price Range: ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={(e, newVal) => setPriceRange(newVal)}
                  min={0}
                  max={3000000}
                  step={10000}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `₦${v.toLocaleString()}`}
                />
              </Box>

              <Button variant="outlined" fullWidth onClick={resetFilters}>
                Clear Filters
              </Button>
            </Card>
          </Grid>

          {/* Services Grid */}
          <Grid item xs={12} lg={9}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {sortedServices.length} services
              </Typography>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Sort by</InputLabel>
                <Select value={sortBy} label="Sort by" onChange={(e) => setSortBy(e.target.value)}>
                  <MenuItem value="popular">Most Popular</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Grid container spacing={3}>
              {sortedServices.map((service) => (
                <Grid item xs={12} md={6} key={service.id}>
                  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <ImageWithFallback
                      src={service.image}
                      alt={service.name}
                      sx={{ height: 220, objectFit: "cover" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 1 }}>
                        <Box>
                          <Typography variant="h6" fontWeight={700}>{service.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{service.duration}</Typography>
                        </Box>
                        <Chip label={service.category} size="small" color="primary" />
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {service.description}
                      </Typography>

                      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                        {service.features.slice(0, 5).map((feature) => (
                          <Chip
                            key={feature}
                            label={feature}
                            size="small"
                            icon={featureIcons[feature] || null}
                            sx={{ bgcolor: "#e3f2fd" }}
                          />
                        ))}
                        {service.features.length > 5 && (
                          <Typography variant="caption" color="text.secondary" sx={{ alignSelf: "center" }}>
                            +{service.features.length - 5} more
                          </Typography>
                        )}
                      </Stack>

                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box>
                          {service.originalPrice && (
                            <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                              ₦{service.originalPrice.toLocaleString()}
                            </Typography>
                          )}
                          <Typography variant="h6" color="primary" fontWeight={700}>
                            ₦{service.price.toLocaleString()}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {service.reviews} reviews
                        </Typography>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ justifyContent: "space-between", px: 2, py: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<WhatsAppIcon />}
                        onClick={() => handleBook(service.name)}
                        sx={{ flexGrow: 1, mr: 1 }}
                      >
                        Book via WhatsApp
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<EmailIcon />}
                        onClick={handleContact}
                      >
                        Contact
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

              {sortedServices.length === 0 && (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    No services found matching your criteria
                  </Typography>
                  <Button variant="outlined" sx={{ mt: 2 }} onClick={resetFilters}>
                    Clear Filters
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      );
    }