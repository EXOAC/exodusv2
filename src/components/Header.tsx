// Header.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import type { ProductCardProps, Status } from '../types';
import ProductCard from './ProductCard/ProductCard';
import MobileMenu from './mobile/MobileMenu';
import { useProducts } from '../context/ProductsContext';
import { useAuth } from '../lib/auth/AuthProvider';
import { UserMenu } from './auth/UserMenu';

interface ProductFromServer {
  href: string;
  name: string;
  description: string;
  status: string; // ← сервер возвращает просто string
  image: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isProductsOpen, setIsProductsOpen } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Список товаров, которые уже приведены к ProductCardProps
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

  // Загрузка товаров
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoadingProducts(true);
        const response = await axios.get<ProductFromServer[]>('/api/products');
        // Преобразуем каждый товар:
        const mapped = response.data.map((prod) => ({
          href: prod.href,
          name: prod.name,
          description: prod.description || '',
          // здесь делаем каст: prod.status as Status
          // но лучше убедиться, что сервер возвращает допустимые строки
          status: prod.status as Status,
          image: prod.image,
        }));
        setProducts(mapped);
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsProductsOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname, setIsProductsOpen]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsProductsOpen(false);
    setIsMenuOpen(false);
  };

  const scrollProducts = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = window.innerWidth < 768 ? 300 : 400;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const targetScroll =
      direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/20 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  src="https://imgur.com/iC4dzF4.png"
                  alt="Logo"
                  className="h-10 w-10"
                />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/')
                    ? 'text-orange-500 bg-orange-500/10 border border-orange-500/20'
                    : 'text-white/90 hover:text-orange-500'
                }`}
              >
                Home
              </Link>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className={`group flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                  isProductsOpen
                    ? 'text-orange-500 bg-orange-500/10 border border-orange-500/20'
                    : 'text-white/90 hover:text-orange-500'
                }`}
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isProductsOpen ? 'rotate-180 text-orange-500' : 'group-hover:translate-x-0.5'
                  }`}
                />
              </button>
              <Link
                to="/status"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/status')
                    ? 'text-orange-500 bg-orange-500/10 border border-orange-500/20'
                    : 'text-white/90 hover:text-orange-500'
                }`}
              >
                Status
              </Link>
              {user ? (
                // Если пользователь залогинен
                <UserMenu />
              ) : (
                // Если нет
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActive('/login')
                      ? 'text-orange-500 bg-orange-500/10 border border-orange-500/20'
                      : 'text-white/90 hover:text-orange-500'
                  }`}
                >
                  Sign In
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Products Dropdown */}
        <div
          className={`fixed inset-x-0 top-20 z-40 transition-all duration-300 ${
            isProductsOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 ${
              isProductsOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsProductsOpen(false)}
          />

          {/* Content Container */}
          <div
            className={`relative bg-black/30 backdrop-blur-xl border-t border-white/10 transform transition-all duration-300 ${
              isProductsOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}
          >
            <div className="relative py-6">
              {/* Products Grid */}
              <div className="max-w-[95%] mx-auto">
                <div className="relative">
                  {/* Scroll Buttons */}
                  <button
                    onClick={() => scrollProducts('left')}
                    className="absolute -left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/90 hover:bg-black/70 hover:border-orange-500/30 transition-all duration-300 z-50"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => scrollProducts('right')}
                    className="absolute -right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/90 hover:bg-black/70 hover:border-orange-500/30 transition-all duration-300 z-50"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Scrollable Container */}
                  <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto scrollbar-hide smooth-scroll"
                  >
                    <div className="flex gap-3 pb-4" style={{ width: 'max-content' }}>
                      {loadingProducts && (
                        <div className="text-white/90">Loading products...</div>
                      )}

                      {!loadingProducts && products.map((prod) => (
                        <div
                          key={prod.href}
                          className="w-[300px] md:w-[340px] flex-shrink-0"
                          onClick={() => handleNavigation(prod.href)}
                        >
                          <ProductCard {...prod} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MobileMenu ... */}
      <MobileMenu
        isOpen={isMenuOpen}
        isProductsOpen={isProductsOpen}
        onToggleProducts={() => setIsProductsOpen(!isProductsOpen)}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
