import Converter from "@/components/Converter";
import HeroSection from "@/components/HeroSection";
import ProSection from "@/components/ProSection";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <HeroSection />
      <Converter />
      <ProSection />
    </div>
  );
}
