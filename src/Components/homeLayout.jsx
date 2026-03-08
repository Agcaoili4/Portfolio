import { TopNav } from './topnav';
import { HeroSection } from './heroSection';
import { AboutSection } from './aboutSection';
import { ProjectsSection } from './projectsSection';
import { ContactSection } from './contactSection';
import { ExperienceSection } from './experienceSection';

export const HomeLayout = () => {
  return (
    <div className="relative w-full bg-[#0a0a0a] text-white min-h-screen">
      <TopNav />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};
