import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-24 font-body relative overflow-hidden">
      
      {/* Header Text */}
      <div className="text-center z-10 relative mt-8">
        <p className="uppercase tracking-[0.2em] font-bold text-[11px] text-foreground mb-6">
          Innovate Unafraid
        </p>
        <h1 className="text-6xl md:text-7xl font-heading text-foreground leading-[1.1] mb-2 tracking-tight">
          Security, Safety, and Trust
        </h1>
        <h2 className="text-6xl md:text-7xl font-heading text-foreground italic mb-10 tracking-tight">
          for the AI Era
        </h2>

        <Link 
          to="/dashboard"
          className="inline-block bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 shadow-lg border border-foreground hover:bg-primary/90 transition-colors"
          style={{ boxShadow: '2px 3px 0px 0px rgba(0,0,0,1)' }}
        >
          Get a Demo
        </Link>
      </div>

      {/* Illustration Area (Mocked or Placeholder) */}
      <div className="relative w-full max-w-5xl mt-12 flex-1 flex flex-col justify-end min-h-[400px]">
        {/* Placeholder for the user's illustration */}
        <div className="absolute inset-0 bg-secondary/30 border-2 border-dashed border-foreground/20 rounded-xl flex items-center justify-center -z-10 mx-4">
          <p className="text-muted-foreground font-mono text-sm">Save your illustration as public/landing-illustration.png and uncomment the image tag below!</p>
        </div>
        
        {/* <img 
          src="/landing-illustration.png" 
          alt="River Illustration" 
          className="w-full h-auto object-contain pointer-events-none"
        /> */}

        {/* Footer Text */}
        <div className="w-full text-center border-y border-foreground/20 py-4 mt-auto bg-muted/50 backdrop-blur-sm relative z-20">
          <p className="uppercase tracking-[0.15em] font-bold text-[10px] text-foreground">
            Trusted by the world's biggest enterprises & foundation model labs
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
