import React, { createContext, useContext, useState } from 'react';

interface ProductsContextType {
  isProductsOpen: boolean;
  setIsProductsOpen: (open: boolean) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <ProductsContext.Provider value={{ isProductsOpen, setIsProductsOpen }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}