import { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/portfolio/Sidebar';
import HeroSection from '../components/portfolio/HeroSection';
import StatsCards from '../components/portfolio/StatsCards';
import About from '../components/portfolio/About';
import TechnicalSkills from '../components/portfolio/TechnicalSkills';
import FeaturedProjects from '../components/portfolio/FeaturedProjects';
import ExperienceTimeline from '../components/portfolio/ExperienceTimeline';
import EducationCertifications from '../components/portfolio/EducationCertifications';
import DataVisualizations from '../components/portfolio/DataVisualizations';
import AIAssistant from '../components/portfolio/AIAssistant';
import ContactSection from '../components/portfolio/ContactSection';
import TechStackGrid from '../components/portfolio/TechStackGrid';
import VoiceAgent from '../components/portfolio/VoiceAgent';
import Footer from '../components/portfolio/Footer';
import FloatingWidget from '../components/portfolio/FloatingWidget';
import WelcomeModal from '../components/portfolio/WelcomeModal';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [openWidget, setOpenWidget] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSection]);

  const handleNav = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-16">
            <HeroSection onNav={handleNav} />
            <StatsCards />
            <About />
            <TechnicalSkills />
            <TechStackGrid />
            <FeaturedProjects />
            <ExperienceTimeline />
            <EducationCertifications />
            <DataVisualizations />
            <AIAssistant />
            <ContactSection />
            <Footer />
          </div>
        );
      case 'about':
        return <About />;
      case 'skills':
        return (
          <div className="space-y-10">
            <TechnicalSkills />
            <TechStackGrid />
          </div>
        );
      case 'projects':
        return <FeaturedProjects />;
      case 'experience':
        return <ExperienceTimeline />;
      case 'certifications':
        return <EducationCertifications />;
      case 'education':
        return <EducationCertifications />;
      case 'visualizations':
        return <DataVisualizations />;
      case 'assistant':
        return <AIAssistant />;
      case 'contact':
        return (
          <>
            <ContactSection />
            <Footer />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden" style={{background:'#0D1117'}}>
      <Sidebar active={activeSection} onNav={handleNav} />
      <main ref={mainRef} className="flex-1 md:ml-[220px] overflow-y-auto">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-8">
          {renderSection()}
        </div>
      </main>
      <FloatingWidget forceOpen={openWidget} />
      <WelcomeModal onOpenWidget={() => setOpenWidget(true)} />
    </div>
  );
}
