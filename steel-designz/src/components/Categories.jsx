/**
 * Categories section - portfolio categories
 * Phase 2 will link to category galleries
 */
import { categories } from '../data/categories'

export default function Categories() {
  return (
    <section className="py-24 px-6 bg-neutral-950 text-white">
      <p className="section-label mb-4">Browse</p>
      <h2 className="category-title mb-16">Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {categories.map((cat) => (
          <article
            key={cat.id}
            className="group cursor-pointer border-b border-neutral-800 pb-8 hover:border-neutral-600 transition-colors"
          >
            <h3 className="category-title text-2xl md:text-3xl group-hover:opacity-80 transition-opacity">
              {cat.title}
            </h3>
            <p className="body-text mt-2 opacity-70">{cat.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
