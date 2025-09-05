import CTASection from "~/components/site/cta_section";
import FeatureSection from "~/components/site/feature_section";
import HeroSection from "~/components/site/hero_section";
import SiteHeader from "~/components/site/site_header";

export function meta() {
  return [
    { title: "CIS Thomasville" },
    { name: "description", content: "Communities in Schools of Thomasville" },
  ];
}

export default function Landing() {
  return <>
    <SiteHeader />
    <HeroSection />
    <FeatureSection />
    <CTASection />
  </>;
}
