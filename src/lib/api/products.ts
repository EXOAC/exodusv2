import axios from 'axios';

export async function fetchProducts() {
  const response = await axios.get('/api/products');
  return response.data;
}

export async function createProduct(product: any) {
  const response = await axios.post('/api/products', product);
  return response.data;
}
