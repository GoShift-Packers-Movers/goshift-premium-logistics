import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import ServicesPage from "./pages/Services";
import ServiceDetailsPage from "./pages/ServiceDetails";
import CityServicePage from "./pages/CityService";
import GalleryPage from "./pages/Gallery";
import BlogListPage from "./pages/BlogList";
import BlogPostPage from "./pages/BlogPost";
import OffersPage from "./pages/Offers";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PricingPage from "./pages/Pricing";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import TermsOfServicePage from "./pages/TermsOfService";
import RefundPolicyPage from "./pages/RefundPolicy";
import CookiePolicyPage from "./pages/CookiePolicy";
import ServiceCitySeoPage from "./pages/ServiceCitySeoPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailsPage />} />
          <Route path="/city/:citySlug" element={<CityServicePage />} />
          {/* SEO city + service landings */}
          <Route
            path="/packers-movers-ahmedabad"
            element={<ServiceCitySeoPage pageKey="packers-movers-ahmedabad" />}
          />
          <Route
            path="/mini-truck-mumbai"
            element={<ServiceCitySeoPage pageKey="mini-truck-mumbai" />}
          />
          <Route
            path="/intercity-transport-delhi"
            element={<ServiceCitySeoPage pageKey="intercity-transport-delhi" />}
          />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ChatbotWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
