import { TopNav } from './topnav';
import { HeroSection } from './heroSection';
import { AboutSection } from './aboutSection';
import { ProjectsSection } from './projectsSection';
import { ContactSection } from './contactSection';
import { ExperienceSection } from './experienceSection';

const SectionMarker = ({ number }) => (
  <div className="section-marker" aria-hidden="true">
    <span className="section-marker-line" />
    <span className="section-marker-num">{number}</span>
  </div>
);

export const HomeLayout = () => {
  return (
    <div className="relative w-full min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', transition: 'background-color 0.35s ease, color 0.35s ease' }}>
      <TopNav />
      <HeroSection />
      <div className="relative">
        <SectionMarker number="01" />
        <AboutSection />
      </div>
      <div className="relative">
        <SectionMarker number="02" />
        <ExperienceSection />
      </div>
      <div className="relative">
        <SectionMarker number="03" />
        <ProjectsSection />
      </div>
      <div className="relative">
        <SectionMarker number="04" />
        <ContactSection />
      </div>
    </div>
  );
};
