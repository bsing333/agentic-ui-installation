
import { useState, useEffect } from "react";
import InteractiveBackground from "@/components/InteractiveBackground";
import AgenticSurvey from "@/components/AgenticSurvey";

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Introduce a small delay to allow for smooth animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <InteractiveBackground />
      
      <div className={`container max-w-6xl px-4 py-8 z-10 transition-all duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-10">
          <h1 className="font-camera text-5xl md:text-7xl text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-violet-500 text-transparent bg-clip-text">Agentic UI</span> Experience
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
            Share your thoughts on the evolving relationship between humans and AI interfaces
          </p>
        </div>
        
        <div className="flex justify-center w-full mt-8">
          <AgenticSurvey />
        </div>
        
        <footer className="mt-20 text-center text-white/50 text-sm">
          <p>Interactive Web Installation &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
