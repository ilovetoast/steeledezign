/**
 * SEO meta tags and schema markup
 */
import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://steeldesignz.com'
const DEFAULT_TITLE = 'Andrea Steele Makeup | Makeup Artist Portfolio'
const DEFAULT_DESCRIPTION = 'Professional makeup artist specializing in editorial, commercial, and film production. Portfolio of selected work.'

export default function SeoHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = `${SITE_URL}/og-image.jpg`,
  url = SITE_URL,
}) {
  const schemaPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Andrea Steele',
    url: SITE_URL,
    jobTitle: 'Makeup Artist',
    description,
  }

  const schemaCreativeWork = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    author: { '@id': '#person' },
  }

  const schemaPortfolio = {
    '@context': 'https://schema.org',
    '@type': 'Portfolio',
    name: 'Andrea Steele Makeup Portfolio',
    description: 'Selected makeup work across editorial, commercial, and film.',
    url: SITE_URL,
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Andrea Steele Makeup" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schemaPerson)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(schemaCreativeWork)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(schemaPortfolio)}
      </script>
    </Helmet>
  )
}
