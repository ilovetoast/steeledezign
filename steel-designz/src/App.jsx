import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import SeoHead from './components/SeoHead'
import Hero from './components/Hero'
import Contact from './components/Contact'

export default function App() {
  return (
    <HelmetProvider>
      <SeoHead />
      <Layout>
        <section id="hero">
          <Hero />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </Layout>
    </HelmetProvider>
  )
}
