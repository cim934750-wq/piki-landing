import ErrorBoundary from '@/components/shared/ErrorBoundary'
import ScrollProgress from '@/components/landing/ScrollProgress'
import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import PainSection from '@/components/landing/PainSection'
import TargetSection from '@/components/landing/TargetSection'
import SystemSection from '@/components/landing/SystemSection'
import ServicesSection from '@/components/landing/ServicesSection'
import ComparisonSection from '@/components/landing/ComparisonSection'
import ProcessSection from '@/components/landing/ProcessSection'
import MetricsSection from '@/components/landing/MetricsSection'
import PricingSection from '@/components/landing/PricingSection'
import GuaranteeSection from '@/components/landing/GuaranteeSection'
import FaqSection from '@/components/landing/FaqSection'
import ContactSection from '@/components/landing/ContactSection'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>
      <PainSection />
      <TargetSection />
      <SystemSection />
      <ServicesSection />
      <ComparisonSection />
      <ProcessSection />
      <MetricsSection />
      <PricingSection />
      <GuaranteeSection />
      <FaqSection />
      <ErrorBoundary>
        <ContactSection />
      </ErrorBoundary>
      <Footer />
    </>
  )
}
