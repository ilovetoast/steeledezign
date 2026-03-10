/**
 * Featured productions - makeup department credits
 * Professional grid of film/TV credits with IMDb links
 */
import { useState } from 'react'
import { FEATURED_PRODUCTIONS } from '../data/featuredProductions'

function ProductionCard({ title, year, role, imdbId, url, poster }) {
  const [posterFailed, setPosterFailed] = useState(false)
  const showPoster = poster && !posterFailed
  const href = url || (imdbId ? `https://www.imdb.com/title/${imdbId}/` : null)

  return (
    <a
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label={href ? `${title} (${year}) - ${role}` : undefined}
    >
      <div className="aspect-[2/3] bg-neutral-800/80 rounded overflow-hidden border border-neutral-700/50 group-hover:border-neutral-600 transition-colors relative flex flex-col">
        {showPoster && (
          <>
            <img
              src={poster}
              alt={`${title} poster`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={() => setPosterFailed(true)}
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 to-transparent">
              <span className="text-white text-sm font-light block">{title}</span>
              <span className="text-neutral-400 text-xs">{year} · {role}</span>
            </div>
          </>
        )}
        {(!poster || posterFailed) && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
            <span className="text-white font-light text-sm leading-tight">{title}</span>
            <span className="text-neutral-500 text-xs mt-2">{year}</span>
            <span className="text-neutral-600 text-[10px] mt-1 uppercase tracking-wider">
              {role}
            </span>
          </div>
        )}
      </div>
    </a>
  )
}

export default function FeaturedProductions() {
  return (
    <section className="py-16 px-6 bg-neutral-950/50 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-sm font-medium tracking-[0.3em] uppercase text-neutral-400 mb-12">
          Makeup Department
        </h2>
        <p className="text-center text-neutral-500 text-sm max-w-2xl mx-auto mb-16">
          Select film and television credits
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {FEATURED_PRODUCTIONS.map((prod) => (
            <ProductionCard key={prod.imdbId || prod.title} {...prod} />
          ))}
        </div>
      </div>
    </section>
  )
}
