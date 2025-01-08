import React from 'react';
import { Link } from 'react-router-dom';
import ExternalLink from './ui/ExternalLink';
import { useProducts } from '../context/ProductsContext';

export default function Footer() {
  const { setIsProductsOpen } = useProducts();

  const quickLinks = [
    { name: 'Products', action: () => setIsProductsOpen(true) },
    { name: 'About Us', href: '/about' },
    { name: 'Support', href: '/support' },
    { name: 'EPVP', href: 'https://www.elitepvpers.com/forum/members/7403927-exodus-.html' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refund-policy' },
  ];

  return (
    <footer className="relative z-10 border-t border-orange-500/20 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img 
              src="https://imgur.com/iC4dzF4.png" 
              alt="Exodus Production" 
              className="h-10 w-auto object-contain"
            />
            <p className="text-white/60 text-sm max-w-xs">
              Elevating your gaming experience with cutting-edge technology and unmatched performance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href ? (
                    link.href.startsWith('http') ? (
                      <ExternalLink 
                        href={link.href}
                        className="text-white/60 hover:text-orange-500 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </ExternalLink>
                    ) : (
                      <Link 
                        to={link.href}
                        className="text-white/60 hover:text-orange-500 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </Link>
                    )
                  ) : (
                    <button
                      onClick={link.action}
                      className="text-white/60 hover:text-orange-500 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-white/60 hover:text-orange-500 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-center text-white/40 text-sm">
            © {new Date().getFullYear()} Exodus. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}