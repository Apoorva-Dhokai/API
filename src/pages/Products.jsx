import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Grid, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, TextField, Box, Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: theme.shadows[4],
      backgroundColor: '#a9a9a9',
    }
  },
  cardContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
  },
}));

const Products = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [inputPriceRange, setInputPriceRange] = useState({ min: '', max: '' });
  const [availability, setAvailability] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchCategoriesAndCompanies = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:5000/categories');
        setCategories(categoriesResponse.data);

        const companiesResponse = await axios.get('http://localhost:5000/companies');
        setCompanies(companiesResponse.data);
      } 
      catch (error) {
        console.error('Error fetching categories and companies:', error);
      }
    };

    fetchCategoriesAndCompanies();
  }, []);

  const fetchProducts = async () => {
    let url = 'http://localhost:5000/products';

    const params = {};
    if (company) params.company = company;
    if (category) params.category = category;
    if (priceRange.min) params.minPrice = priceRange.min;
    if (priceRange.max) params.maxPrice = priceRange.max;
    if (availability) params.availability = availability;
    if (sort) {
      const [sortField, sortOrder] = sort.split(':');
      params._sort = sortField;
      params._order = sortOrder;
    }

    try {
      const response = await axios.get(url, { params });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, company, rating, priceRange, availability, sort]);

  const handlePriceRangeSubmit = () => {
    setPriceRange(inputPriceRange);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handlePriceRangeSubmit();
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Company</InputLabel>
              <Select value={company} onChange={(e) => setCompany(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {companies.map((comp) => (
                  <MenuItem key={comp.id} value={comp.name}>{comp.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="1">1 Star</MenuItem>
                <MenuItem value="2">2 Stars</MenuItem>
                <MenuItem value="3">3 Stars</MenuItem>
                <MenuItem value="4">4 Stars</MenuItem>
                <MenuItem value="5">5 Stars</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Min Price"
              value={inputPriceRange.min}
              onChange={(e) => setInputPriceRange({ ...inputPriceRange, min: e.target.value })}
              onKeyDown={handleKeyDown}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Max Price"
              value={inputPriceRange.max}
              onChange={(e) => setInputPriceRange({ ...inputPriceRange, max: e.target.value })}
              onKeyDown={handleKeyDown}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>
              <Select value={availability} onChange={(e) => setAvailability(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="yes">In Stock</MenuItem>
                <MenuItem value="no">Out of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="price:asc">Price (Low to High)</MenuItem>
                <MenuItem value="price:desc">Price (High to Low)</MenuItem>
                <MenuItem value="rating:asc">Rating (Low to High)</MenuItem>
                <MenuItem value="rating:desc">Rating (High to Low)</MenuItem>
                <MenuItem value="discount:asc">Discount (Low to High)</MenuItem>
                <MenuItem value="discount:desc">Discount (High to Low)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" onClick={handlePriceRangeSubmit}>
              Apply Price Range
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h6" gutterBottom>{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">{product.company}</Typography>
                <Typography variant="body2">Category: {product.category}</Typography>
                <Typography variant="body2">Price: ₹{product.price}</Typography>
                <Typography variant="body2">Rating: {product.rating}</Typography>
                <Typography variant="body2">Discount: {product.discount}%</Typography>
                <Typography variant="body2">Availability: {product.availability}</Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <Button variant="contained" component={Link} to={`/product/${product.id}`}>
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;