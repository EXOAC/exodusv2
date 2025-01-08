import { products } from '../data/products';

interface UpdateProductImageParams {
  productId: string;
  imageUrl: string;
}

export function isValidImgurUrl(url: string): boolean {
  const imgurPattern = /^https?:\/\/(?:i\.)?imgur\.com\/[a-zA-Z0-9]{7}(?:\.[a-zA-Z]{3,4})?$/;
  return imgurPattern.test(url);
}

export function updateProductImage({ productId, imageUrl }: UpdateProductImageParams): boolean {
  try {
    // Validate Imgur URL
    if (!isValidImgurUrl(imageUrl)) {
      console.error('Invalid Imgur URL format');
      return false;
    }

    // Find product index
    const productIndex = products.findIndex(
      product => product.href === `/products/${productId}`
    );

    if (productIndex === -1) {
      console.error(`Product with ID ${productId} not found`);
      return false;
    }

    // Update product image
    products[productIndex] = {
      ...products[productIndex],
      image: imageUrl
    };

    return true;
  } catch (error) {
    console.error('Error updating product image:', error);
    return false;
  }
}