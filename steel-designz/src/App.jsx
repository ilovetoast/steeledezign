import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import SeoHead from './components/SeoHead'
import Hero from './components/Hero'
import FeaturedProductions from './components/FeaturedProductions'
import AboutBio from './components/AboutBio'
import Contact from './components/Contact'

export default function App() {
  return (
    <HelmetProvider>
      <SeoHead />
      <Layout>
        <section id="hero">
          <Hero />
        </section>
        <section id="contact" className="contact-page">
          <div id="productions" aria-label="Featured productions">
            <FeaturedProductions />
          </div>
          <div id="about" aria-label="About Andrea Steele">
            <AboutBio />
          </div>
          <Contact />
        </section>
      </Layout>
    </HelmetProvider>
  )
}
