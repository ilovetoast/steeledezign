/**
 * SEO meta tags and schema markup
 * Andrea Steele - Union makeup artist, Los Angeles
 * IMDb: https://www.imdb.com/name/nm4988249/
 */
import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://steeldesignz.com'
const DEFAULT_TITLE = 'Andrea Steele Makeup | Union Makeup Artist Los Angeles'
const DEFAULT_DESCRIPTION =
  'Los Angeles–based union makeup artist with film and television department credits (including Oppenheimer, Westworld, and The Gorge). Also available for commercial, editorial, and bridal or event makeup—commissioned work with an on-set, production-minded approach.'
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
    description:
      'Union makeup artist in Los Angeles. Department credits on major film and television; commissioned work includes commercial, editorial, and bridal or event makeup.',
    image: image,
    sameAs: [IMDB_URL],
    knowsAbout: [
      'Makeup Artistry',
      'Film Makeup',
      'Television Makeup',
      'Commercial Makeup',
      'Editorial Makeup',
      'Bridal Makeup',
      'Event Makeup',
    ],
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
    description:
      'Portfolio spanning union film and television, commercial and editorial work, and select bridal and private-event commissions. Representative credits include Oppenheimer, Westworld, The Gorge, and Cooper\'s Bar.',
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
        content="Andrea Steele, makeup artist, Los Angeles, union makeup artist, film makeup, television makeup, commercial makeup, editorial makeup, wedding makeup, bridal makeup, Oppenheimer, Westworld, The Gorge, makeup department, IATSE, Hollywood makeup"
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
