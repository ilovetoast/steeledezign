import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import SeoHead from './components/SeoHead'
import Hero from './components/Hero'
import WorkGrid from './components/WorkGrid'
import Experience from './components/Experience'
import Bio from './components/Bio'
import Contact from './components/Contact'

export default function App() {
  return (
    <HelmetProvider>
      <SeoHead />
      <Layout>
        <section id="hero">
          <Hero />
        </section>
        <section id="work">
          <WorkGrid />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="bio">
          <Bio />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </Layout>
    </HelmetProvider>
  )
}
