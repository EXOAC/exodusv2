import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ExternalRedirect from './ExternalRedirect';

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ExternalLink({ href, children, className = '', ...props }: ExternalLinkProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRedirecting(true);
  };

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </a>

      <AnimatePresence>
        {isRedirecting && (
          <ExternalRedirect 
            url={href} 
            onClose={() => setIsRedirecting(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}