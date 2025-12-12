import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-4 bg-background/80 backdrop-blur-lg border-b border-border/50' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display font-bold text-xl hoverable">
          PORTFOLIO<span className="gradient-text">.</span>
        </a>
        
        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              className="nav-link hoverable"
            >
              {link.label}
            </a>
          ))}
        </div>
        
        {/* CTA */}
        <a 
          href="#contact" 
          className="outline-btn text-sm py-2 px-4 hoverable"
        >
          Let's Talk
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
