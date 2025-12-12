import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="gradient-blob w-[600px] h-[600px] top-1/4 left-1/4" />
      <div 
        className="gradient-blob w-[500px] h-[500px] top-1/3 right-1/4"
        style={{ animationDelay: '-4s' }}
      />
      <div 
        className="gradient-blob w-[400px] h-[400px] bottom-1/4 left-1/3"
        style={{ animationDelay: '-2s' }}
      />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')]" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 
          className={`hero-title transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          PORTFOLIO<span className="gradient-text">.</span>
        </h1>
        
        <p 
          className={`mt-6 text-lg md:text-xl text-muted-foreground max-w-lg mx-auto font-body transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Designer criativo focado em experiências visuais únicas e memoráveis
        </p>
        
        <div 
          className={`mt-10 flex flex-wrap gap-4 justify-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <a href="#about" className="luxury-btn hoverable">
            <span>Descobrir Mais</span>
          </a>
          <a href="#contact" className="outline-btn hoverable">
            Contactar
          </a>
        </div>
      </div>
      
      {/* Footer info */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-sm text-muted-foreground">
        <span className="font-display">Your Name</span>
        <span>© 2025</span>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-foreground rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
