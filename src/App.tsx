import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
import SitemapPage from "./pages/SitemapPage";

const ChatbotWidget = lazy(() => import("@/components/ChatbotWidget"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetailsPage />} />
                <Route path="/city/:citySlug" element={<CityServicePage />} />
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
                <Route path="/sitemap" element={<SitemapPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
          </main>
          <Footer />
          <Suspense fallback={null}>
            <ChatbotWidget />
          </Suspense>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
