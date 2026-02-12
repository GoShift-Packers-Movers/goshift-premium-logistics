import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = lazy(() => import("./pages/Index"));
const ServicesPage = lazy(() => import("./pages/Services"));
const ServiceDetailsPage = lazy(() => import("./pages/ServiceDetails"));
const CityServicePage = lazy(() => import("./pages/CityService"));
const GalleryPage = lazy(() => import("./pages/Gallery"));
const BlogListPage = lazy(() => import("./pages/BlogList"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const OffersPage = lazy(() => import("./pages/Offers"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PricingPage = lazy(() => import("./pages/Pricing"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfService"));
const RefundPolicyPage = lazy(() => import("./pages/RefundPolicy"));
const CookiePolicyPage = lazy(() => import("./pages/CookiePolicy"));
const ServiceCitySeoPage = lazy(() => import("./pages/ServiceCitySeoPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const ChatbotWidget = lazy(() => import("@/components/ChatbotWidget"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={null}>
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
            <Route path="/sitemap" element={<SitemapPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <Suspense fallback={null}>
          <ChatbotWidget />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
