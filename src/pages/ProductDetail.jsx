import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="h6">{product.company}</Typography>
          <Typography variant="body2">Category: {product.category}</Typography>
          <Typography variant="body2">Price: {product.price}</Typography>
          <Typography variant="body2">Rating: {product.rating}</Typography>
          <Typography variant="body2">Discount: {product.discount}%</Typography>
          <Typography variant="body2">Availability: {product.availability}</Typography>
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Button variant="contained" component={Link} to="/" sx={{ marginTop: 2 }}>
          Back to Products
        </Button>
      </Box>
    </Container>
  );
};

export default ProductDetail;