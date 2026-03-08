import { TopNav } from './topnav';
import { HeroSection } from './heroSection';
import { AboutSection } from './aboutSection';
import { ProjectsSection } from './projectsSection';
import { ContactSection } from './contactSection';

export const HomeLayout = () => {
  return (
    <div className="relative bg-[#0a0a0a] text-white min-h-screen">
      <TopNav />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};
