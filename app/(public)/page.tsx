import { Hero } from "@/components/sections/Hero"
import { SignatureShowcase } from "@/components/sections/SignatureShowcase"
import { Capabilities } from "@/components/sections/Capabilities"
import { ProjectGallery } from "@/components/sections/ProjectGallery"
import { ProductPortfolio } from "@/components/sections/ProductPortfolio"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { EnquiryForm } from "@/components/sections/EnquiryForm"

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <SignatureShowcase />
        <Capabilities />
        <ProjectGallery />
        <ProductPortfolio />
        <HowItWorks />
        <EnquiryForm />
      </main>
    </>
  )
}
