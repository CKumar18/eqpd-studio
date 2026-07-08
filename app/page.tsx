import Hero from "@/sections/home/Hero";
import TechStack from "@/sections/home/TechStack";
import Services from "@/sections/home/Services";
import FeaturedProjects from "@/sections/home/FeaturedProjects";
import WorkflowProcess from "@/sections/home/WorkflowProcess";
import Testimonials from "@/sections/home/Testimonials";
import CallToAction from "@/sections/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechStack />
      <Services />
      <FeaturedProjects />
      <WorkflowProcess />
      <Testimonials />
      <CallToAction />
    </>
  );
}
