/**
 * Short bio + headshot - union makeup artist, Los Angeles
 */
import { IMDB_PROFILE_URL } from '../data/featuredProductions'
import headshotImg from '../assets/images/production/andrea-headshot.jpg'

const BIO =
  'Andrea Steele is a Los Angeles–based union makeup artist with credits across major film and television. Her work spans dramatic features, episodic series, and commercial productions.'

export default function AboutBio() {
  return (
    <section className="py-16 px-6 bg-neutral-900 text-white">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-10 items-center">
        <a
          href={IMDB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 relative block"
          aria-label="View Andrea Steele on IMDb"
        >
          <img
            src={headshotImg}
            alt="Andrea Steele - Union Makeup Artist Los Angeles"
            className="w-40 h-40 sm:w-48 sm:h-48 rounded object-cover border border-neutral-700"
          />
        </a>
        <div className="text-center sm:text-left">
          <h2 className="text-sm font-medium tracking-[0.3em] uppercase text-neutral-400 mb-4">
            About
          </h2>
          <p className="text-neutral-300 font-light leading-relaxed">{BIO}</p>
          <a
            href={IMDB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-sm tracking-wider uppercase text-neutral-500 hover:text-white transition-colors"
          >
            View full credits on IMDb →
          </a>
        </div>
      </div>
    </section>
  )
}
