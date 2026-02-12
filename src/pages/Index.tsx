import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import { Seo } from "@/components/Seo";

const Index = () => {
  return (
    <>
      <Seo
        title="Packers and Movers, Truck Transport & House Shifting Services"
        description="GoShift offers reliable packers and movers, truck transport and house shifting services with trained crews, transparent pricing and live tracking across major Indian cities."
        canonical="/"
        type="website"
      />
      <main className="bg-background">
        <HeroSection />
        <ServicesSection />
        <WhyChooseUs />
        <Testimonials />
        <FAQSection />
        <CTASection />
      </main>
    </>
  );
};

export default Index;
