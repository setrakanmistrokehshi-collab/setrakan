// HotelsPage.js
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
  Badge as MuiBadge
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WifiIcon from "@mui/icons-material/Wifi";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ImageWithFallback({ src, alt, sx }) {
  const [imgSrc, setImgSrc] = useState(src);
  const fallback = "https://via.placeholder.com/800x450?text=Image+not+available";
  return (
    <CardMedia
      component="img"
      image={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      sx={sx}
    />
  );
}

/* --- Data (same as your TS version) --- */
const allHotels = [
  {
    id: 1,
    name: "Shangri-La Colombo",
    description:
      "Luxury waterfront hotel in the heart of Colombo with stunning ocean views and world-class amenities",
    image:
      "https://images.unsplash.com/photo-1732272106767-9dc0a3af6404?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwc3JpJTIwbGFua2F8ZW58MXx8fHwxNzU1OTQ3NzgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Colombo",
    rating: 4.8,
    price: 280,
    originalPrice: 350,
    amenities: ["Free WiFi", "Pool", "Restaurant", "Parking", "Spa", "Gym"],
    category: "Luxury",
    type: "City Hotel",
    reviews: 1247,
  },
  {
    id: 2,
    name: "Heritance Tea Factory",
    description:
      "Unique hotel converted from a colonial tea factory in the cool mountains of Nuwara Eliya",
    image:
      "https://images.unsplash.com/photo-1544015759-237f87d55ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMHRlYSUyMHBsYW50YXRpb258ZW58MXx8fHwxNzU1Nzg2ODY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Nuwara Eliya",
    rating: 4.7,
    price: 180,
    originalPrice: 220,
    amenities: ["Mountain Views", "Restaurant", "Spa", "Tours", "Free WiFi"],
    category: "Heritage",
    type: "Mountain Resort",
    reviews: 892,
  },
  {
    id: 3,
    name: "Cape Weligama Resort",
    description:
      "Clifftop resort with private villas overlooking the Indian Ocean and pristine beaches",
    image:
      "https://images.unsplash.com/photo-1743592322694-4ccb9c78b3bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMHNyaSUyMGxhbmthJTIwc3Vuc2V0fGVufDF8fHx8MTc1NTk0Nzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Weligama",
    rating: 4.9,
    price: 450,
    originalPrice: 550,
    amenities: ["Private Beach", "Infinity Pool", "Spa", "Butler Service", "Fine Dining"],
    category: "Resort",
    type: "Beach Resort",
    reviews: 634,
  },
  {
    id: 4,
    name: "Amangalla Galle",
    description:
      "Historic luxury hotel within the UNESCO World Heritage site of Galle Fort",
    image:
      "https://images.unsplash.com/photo-1689075309597-65efe4f6347b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBzcmklMjBsYW5rYSUyMHBvb2x8ZW58MXx8fHwxNzU1OTQ3NzgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Galle",
    rating: 4.9,
    price: 520,
    originalPrice: 600,
    amenities: ["Historic Architecture", "Pool", "Spa", "Restaurant", "Library"],
    category: "Luxury",
    type: "Heritage Hotel",
    reviews: 456,
  },
  {
    id: 5,
    name: "Cinnamon Lodge Habarana",
    description:
      "Eco-friendly resort surrounded by lush gardens and wildlife, perfect for safari adventures",
    image:
      "https://images.unsplash.com/photo-1715431789876-acc2751a95be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMGJlYWNoJTIwdHJvcGljYWx8ZW58MXx8fHwxNzU1Nzg2ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Habarana",
    rating: 4.5,
    price: 150,
    originalPrice: 180,
    amenities: ["Safari Tours", "Pool", "Restaurant", "Wildlife Viewing", "Garden Views"],
    category: "Eco Resort",
    type: "Wildlife Lodge",
    reviews: 1089,
  },
  {
    id: 6,
    name: "The Fortress Koggala",
    description:
      "Contemporary beachfront resort with minimalist design and spectacular ocean views",
    image:
      "https://images.unsplash.com/photo-1674556275226-47b6b393d623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhzcmklMjBsYW5rYSUyMGVsZXBoYW50JTIwd2lsZGxpZmV8ZW58MXx8fHwxNzU1Nzg2ODY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Koggala",
    rating: 4.6,
    price: 320,
    originalPrice: 400,
    amenities: ["Beach Access", "Pool", "Spa", "Yoga Classes", "Water Sports"],
    category: "Boutique",
    type: "Beach Resort",
    reviews: 723,
  },
];

const amenityIcons = {
  "Free WiFi": WifiIcon,
  Pool: PoolIcon,
  Restaurant: RestaurantIcon,
  Parking: DirectionsCarIcon,
  "Mountain Views": LocationOnIcon,
  Spa: StarIcon,
  Tours: LocationOnIcon,
  "Private Beach": BeachAccessIcon,
  "Infinity Pool": PoolIcon,
  "Butler Service": StarIcon,
  "Fine Dining": RestaurantIcon,
  "Historic Architecture": LocationOnIcon,
  Library: LocalCafeIcon,
  "Safari Tours": LocationOnIcon,
  "Wildlife Viewing": LocationOnIcon,
  "Garden Views": LocationOnIcon,
  "Beach Access": BeachAccessIcon,
  "Yoga Classes": FitnessCenterIcon,
  "Water Sports": BeachAccessIcon,
  Gym: FitnessCenterIcon,
};

/* --- Component --- */
export default function HotelsPage({ onNavigate = () => {} }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const filteredHotels = useMemo(() => {
    return allHotels.filter((hotel) => {
      const matchesSearch =
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter === "all" || hotel.location === locationFilter;
      const matchesCategory = categoryFilter === "all" || hotel.category === categoryFilter;
      const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
      return matchesSearch && matchesLocation && matchesCategory && matchesPrice;
    });
  }, [searchTerm, locationFilter, categoryFilter, priceRange]);

  const sortedHotels = useMemo(() => {
    const copy = [...filteredHotels];
    switch (sortBy) {
      case "price-low":
        return copy.sort((a, b) => a.price - b.price);
      case "price-high":
        return copy.sort((a, b) => b.price - a.price);
      case "rating":
        return copy.sort((a, b) => b.rating - a.rating);
      case "name":
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return copy;
    }
  }, [filteredHotels, sortBy]);

  const resetFilters = () => {
    setLocationFilter("all");
    setCategoryFilter("all");
    setPriceRange([0, 600]);
    setSearchTerm("");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f7fafc" }}>
      {/* Header */}
      <Box sx={{ backgroundColor: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <Box sx={{ maxWidth: 1280, mx: "auto", px: 3, py: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="text"
              color="success"
              onClick={() => onNavigate("home")}
            >
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
                Hotels & Resorts in Sri Lanka
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {sortedHotels.length} properties found • From luxury resorts to boutique hotels
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, lg: 0 }, alignItems: "center" }}>
              <TextField
                placeholder="Search hotels or locations..."
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
          {/* Filters sidebar */}
          <Grid item xs={12} lg={3} sx={{ display: { xs: showFilters ? "block" : "none", lg: "block" } }}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Filters
              </Typography>

              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={locationFilter}
                    label="Location"
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <MenuItem value="all">All locations</MenuItem>
                    <MenuItem value="Colombo">Colombo</MenuItem>
                    <MenuItem value="Galle">Galle</MenuItem>
                    <MenuItem value="Kandy">Kandy</MenuItem>
                    <MenuItem value="Nuwara Eliya">Nuwara Eliya</MenuItem>
                    <MenuItem value="Weligama">Weligama</MenuItem>
                    <MenuItem value="Habarana">Habarana</MenuItem>
                    <MenuItem value="Koggala">Koggala</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    label="Category"
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <MenuItem value="all">All categories</MenuItem>
                    <MenuItem value="Luxury">Luxury</MenuItem>
                    <MenuItem value="Resort">Resort</MenuItem>
                    <MenuItem value="Heritage">Heritage</MenuItem>
                    <MenuItem value="Boutique">Boutique</MenuItem>
                    <MenuItem value="Eco Resort">Eco Resort</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={(e, newVal) => setPriceRange(newVal)}
                  min={0}
                  max={600}
                  step={10}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Button variant="outlined" fullWidth onClick={resetFilters}>
                Clear All Filters
              </Button>
            </Card>
          </Grid>

          {/* Results */}
          <Grid item xs={12} lg={9}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {sortedHotels.length} results
              </Typography>

              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Sort by</InputLabel>
                <Select value={sortBy} label="Sort by" onChange={(e) => setSortBy(e.target.value)}>
                  <MenuItem value="rating">Best Rating</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="name">Name: A to Z</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Grid container spacing={2}>
              {sortedHotels.map((hotel) => {
                return (
                  <Grid key={hotel.id} item xs={12} md={6}>
                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                      <Box sx={{ position: "relative" }}>
                        <ImageWithFallback
                          src={hotel.image}
                          alt={hotel.name}
                          sx={{ height: 200, objectFit: "cover" }}
                        />
                        <Box sx={{ position: "absolute", top: 8, left: 8 }}>
                          <Chip label={hotel.category} sx={{ bgcolor: "rgba(255,255,255,0.9)" }} />
                        </Box>
                        <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              bgcolor: "rgba(255,255,255,0.9)",
                              px: 1,
                              py: 0.3,
                              borderRadius: 2,
                            }}
                          >
                            <StarIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
                            <Typography variant="caption">{hotel.rating}</Typography>
                          </Box>
                          <IconButton size="small" sx={{ bgcolor: "rgba(255,255,255,0.9)" }}>
                            <FavoriteBorderIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        {hotel.originalPrice > hotel.price && (
                          <Box sx={{ position: "absolute", bottom: 8, left: 8 }}>
                            <Chip label={`Save $${hotel.originalPrice - hotel.price}`} color="error" />
                          </Box>
                        )}
                      </Box>

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                              {hotel.name}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", mt: 0.5 }}>
                              <LocationOnIcon fontSize="small" />
                              <Typography variant="body2">{hotel.location}</Typography>
                              <Typography variant="caption" sx={{ color: "text.disabled", ml: 1 }}>
                                • {hotel.type}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ textAlign: "right" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "flex-end" }}>
                              {hotel.originalPrice > hotel.price && (
                                <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                                  ${hotel.originalPrice}
                                </Typography>
                              )}
                              <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
                                ${hotel.price}
                              </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              per night
                            </Typography>
                          </Box>
                        </Box>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                          {hotel.description}
                        </Typography>

                        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                          {hotel.amenities.slice(0, 5).map((amenity) => {
                            const Icon = amenityIcons[amenity] || StarIcon;
                            return (
                              <Chip
                                key={amenity}
                                label={amenity}
                                size="small"
                                icon={<Icon fontSize="small" />}
                                sx={{ bgcolor: "#f1f5f9", mr: 0.5, mb: 0.5 }}
                              />
                            );
                          })}
                          {hotel.amenities.length > 5 && (
                            <Typography variant="caption" color="text.secondary" sx={{ alignSelf: "center" }}>
                              +{hotel.amenities.length - 5} more
                            </Typography>
                          )}
                        </Stack>
                      </CardContent>

                      <CardActions sx={{ justifyContent: "space-between", px: 2, py: 1 }}>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "text.secondary" }}>
                          <StarIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
                          <Typography variant="body2">{hotel.rating}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            ({hotel.reviews} reviews)
                          </Typography>
                        </Box>

                        <Button variant="contained" color="success">
                          Book Now
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            {sortedHotels.length === 0 && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <LocationOnIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No hotels found matching your criteria
                </Typography>
                <Button variant="outlined" onClick={resetFilters}>
                  Clear all filters
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
