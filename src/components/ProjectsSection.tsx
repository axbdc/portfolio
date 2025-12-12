import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 1, title: 'Social Media', number: '01' },
    { id: 2, title: 'Poster & Banner', number: '02' },
    { id: 3, title: 'Motion Graphic', number: '03' },
    { id: 4, title: 'Other Projects', number: '04' },
  ];

  const projects = [
    { id: 1, title: 'Brand Identity', category: 'Branding', gradient: 'from-purple-600 to-blue-600' },
    { id: 2, title: 'Social Campaign', category: 'Social Media', gradient: 'from-pink-600 to-purple-600' },
    { id: 3, title: 'Motion Design', category: 'Animation', gradient: 'from-blue-600 to-cyan-600' },
    { id: 4, title: 'UI/UX Design', category: 'Digital', gradient: 'from-orange-600 to-pink-600' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative min-h-screen py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="gradient-blob w-[600px] h-[600px] left-1/2 -translate-x-1/2 top-0 opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Table of Content */}
        <div 
          className={`mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="hero-title text-5xl md:text-7xl">
                TABLE <span className="text-muted-foreground font-normal">OF</span>
                <br />CONTENT
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat, index) => (
                <a 
                  key={cat.id}
                  href="#"
                  className={`glass-card p-6 hoverable transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {cat.title}
                  </p>
                  <p className="font-display font-bold text-4xl md:text-5xl">{cat.number}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Projects Grid */}
        <div 
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center">
              <span className="font-display font-bold text-background">L</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-xl">Project Title</h3>
              <p className="text-sm text-muted-foreground">Description project</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {projects.map((project, index) => (
              <a 
                key={project.id}
                href="#"
                className={`project-card aspect-square flex items-end p-4 hoverable relative overflow-hidden group ${
                  index === projects.length - 1 ? 'row-span-2' : ''
                }`}
                style={{ transitionDelay: `${700 + index * 100}ms` }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                
                {/* Icon placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-xl bg-foreground/10" />
                </div>
                
                {/* Arrow */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                
                {/* Title */}
                <div className="relative z-10">
                  <p className="text-xs text-muted-foreground">{project.category}</p>
                  <p className="font-display font-medium text-sm">{project.title}</p>
                </div>
              </a>
            ))}
            
            {/* Additional placeholder cards */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={`placeholder-${i}`}
                className="project-card aspect-square bg-muted/10 hoverable"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
