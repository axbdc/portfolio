import { useEffect, useRef, useState } from 'react';
import { Linkedin, Mail, Phone, ArrowUpRight } from 'lucide-react';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Mail, label: 'Email', href: '#' },
    { icon: Phone, label: 'WhatsApp', href: '#' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Animated gradient blobs */}
      <div className="gradient-blob w-[700px] h-[500px] top-1/4 left-1/3 opacity-50" />
      <div 
        className="gradient-blob w-[400px] h-[400px] bottom-1/4 right-1/4 opacity-40"
        style={{ animationDelay: '-5s' }}
      />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')]" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main heading */}
        <h2 
          className={`hero-title text-6xl md:text-8xl lg:text-9xl mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <span className="gradient-text">THANK</span> YOU
        </h2>
        
        {/* Subtitle */}
        <p 
          className={`text-xl md:text-2xl text-muted-foreground font-body mb-4 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          Lets collaborate or do cooking
        </p>
        
        {/* Highlighted text */}
        <div 
          className={`flex items-center justify-center gap-3 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <span className="px-6 py-2 rounded-full border border-primary/50 font-display italic text-lg gradient-text">
            something great
          </span>
          <span className="text-xl text-muted-foreground">together</span>
        </div>
        
        {/* Social Links */}
        <div 
          className={`flex justify-center gap-4 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              className="social-btn group hoverable relative"
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <link.icon className="w-6 h-6" />
              <ArrowUpRight className="w-4 h-4 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
        
        {/* CTA Button */}
        <div 
          className={`mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <a href="mailto:your@email.com" className="luxury-btn hoverable">
            <span>Get In Touch</span>
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-sm text-muted-foreground">
        <span className="font-display">Your Name</span>
        <span>Made with passion © 2025</span>
      </div>
    </section>
  );
};

export default ContactSection;
