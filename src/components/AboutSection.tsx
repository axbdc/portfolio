import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'Photoshop', color: '#31A8FF' },
    { name: 'Illustrator', color: '#FF9A00' },
    { name: 'After Effects', color: '#9999FF' },
    { name: 'Premiere Pro', color: '#9999FF' },
    { name: 'Figma', color: '#F24E1E' },
    { name: 'CapCut', color: '#00F2EA' },
  ];

  const experience = [
    { year: '2020 - 2023', company: 'Creative Agency', role: 'Junior Designer' },
    { year: '2023 - 2024', company: 'Design Studio', role: 'Graphic Designer' },
    { year: '2024 - Present', company: 'Freelance', role: 'Creative Director' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative min-h-screen py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="gradient-blob w-[500px] h-[500px] -left-64 top-1/4 opacity-40" />
      <div className="gradient-blob w-[400px] h-[400px] -right-32 bottom-1/4 opacity-30" style={{ animationDelay: '-3s' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Avatar */}
          <div 
            className={`flex flex-col items-center lg:items-start transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <p className="text-muted-foreground font-body mb-2">Hello, I am</p>
            <h2 className="hero-title text-5xl md:text-7xl mb-8">Your Name</h2>
            
            {/* Avatar placeholder with frame */}
            <div className="relative w-64 h-72 md:w-80 md:h-96">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-foreground/80 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-foreground/80 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-foreground/80 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-foreground/80 rounded-br-lg" />
              
              {/* Avatar icon */}
              <div className="absolute inset-8 flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="w-full h-full text-foreground/60"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Right side - Info */}
          <div 
            className={`space-y-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            {/* About Me */}
            <div>
              <h3 className="section-title text-3xl md:text-4xl mb-4">About Me</h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                Curioso e apaixonado, sempre me interessei pela forma como os visuais 
                podem moldar a maneira como as pessoas sentem e pensam. Com o tempo, 
                essa curiosidade levou-me ao design gráfico — um campo onde a 
                criatividade encontra a resolução de problemas. Adoro explorar como 
                cores, tipografia e layout podem comunicar ideias e emoções de forma 
                clara e bela.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Education */}
              <div className="glass-card p-6">
                <h4 className="font-display font-bold text-xl mb-4">Education</h4>
                <p className="text-sm text-muted-foreground">2023 - Present</p>
                <p className="font-medium">University Name</p>
              </div>
              
              {/* Work Experience */}
              <div className="glass-card p-6">
                <h4 className="font-display font-bold text-xl mb-4">Work Experience</h4>
                <ul className="space-y-3">
                  {experience.map((exp, index) => (
                    <li key={index} className="text-sm">
                      <span className="text-muted-foreground">{exp.year}</span>
                      <p className="font-medium">{exp.company} - {exp.role}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Skills */}
            <div>
              <h4 className="font-display font-bold text-xl mb-4">Skills</h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="skill-badge hoverable"
                    style={{ 
                      borderLeft: `3px solid ${skill.color}`,
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="social-btn hoverable">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="social-btn hoverable">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="social-btn hoverable">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
