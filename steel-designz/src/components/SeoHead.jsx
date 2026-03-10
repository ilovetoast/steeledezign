/**
 * SEO meta tags and schema markup
 * Andrea Steele - Union makeup artist, Los Angeles
 * IMDb: https://www.imdb.com/name/nm4988249/
 */
import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://steeldesignz.com'
const DEFAULT_TITLE = 'Andrea Steele Makeup | Union Makeup Artist Los Angeles'
const DEFAULT_DESCRIPTION =
  'Andrea Steele is a Los Angeles–based union makeup artist known for Oppenheimer, Westworld, and The Gorge. Specializing in makeup department for film and television.'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`
const IMDB_URL = 'https://www.imdb.com/name/nm4988249/'

export default function SeoHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
}) {
  const schemaPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Andrea Steele',
    url: SITE_URL,
    jobTitle: 'Makeup Artist',
    description: 'Union makeup artist in Los Angeles. Makeup department credits include Oppenheimer, Westworld, and The Gorge.',
    image: image,
    sameAs: [IMDB_URL],
    knowsAbout: ['Makeup Artistry', 'Film Makeup', 'Television Makeup', 'Editorial Makeup'],
    areaServed: { '@type': 'Place', name: 'Los Angeles, California' },
  }

  const schemaCreativeWork = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    author: { '@type': 'Person', name: 'Andrea Steele' },
  }

  const schemaPortfolio = {
    '@context': 'https://schema.org',
    '@type': 'Portfolio',
    name: 'Andrea Steele Makeup Portfolio',
    description: 'Makeup department work for film and television. Credits include Oppenheimer, Westworld, The Gorge, Judy Justice, and Cooper\'s Bar.',
    url: SITE_URL,
    author: { '@type': 'Person', name: 'Andrea Steele' },
  }

  const schemaWebPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: url,
    mainEntity: { '@id': '#person' },
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Keywords */}
      <meta
        name="keywords"
        content="Andrea Steele, makeup artist, Los Angeles, union makeup artist, film makeup, television makeup, Oppenheimer, Westworld, The Gorge, makeup department, IATSE, Hollywood makeup"
      />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Andrea Steele" />
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Los Angeles" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Andrea Steele - Union Makeup Artist Los Angeles" />
      <meta property="og:site_name" content="Andrea Steele Makeup" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Andrea Steele - Union Makeup Artist Los Angeles" />

      {/* Schema */}
      <script type="application/ld+json">{JSON.stringify(schemaPerson)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaCreativeWork)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaPortfolio)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaWebPage)}</script>
    </Helmet>
  )
}
