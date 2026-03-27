import { TopNav } from './topnav';
import { HeroSection } from './heroSection';
import { AboutSection } from './aboutSection';
import { ProjectsSection } from './projectsSection';
import { ContactSection } from './contactSection';
import { ExperienceSection } from './experienceSection';

export const HomeLayout = () => {
  return (
    <div className="relative w-full min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', transition: 'background-color 0.35s ease, color 0.35s ease' }}>
      <TopNav />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};
