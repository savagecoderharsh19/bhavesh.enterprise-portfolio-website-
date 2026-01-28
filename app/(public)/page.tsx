import { Hero } from "@/components/sections/Hero"
import { SignatureShowcase } from "@/components/sections/SignatureShowcase"
import { Capabilities } from "@/components/sections/Capabilities"
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
        <ProductPortfolio />
        <HowItWorks />
        <EnquiryForm />
      </main>
    </>
  )
}
