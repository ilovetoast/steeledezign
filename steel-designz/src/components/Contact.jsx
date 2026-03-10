/**
 * Contact section with form
 * No backend - console logs submission
 */
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submission:', formData)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section className="py-24 px-6 bg-neutral-900 text-white">
      <p className="section-label mb-4 text-center">Get in Touch</p>
      <h2 className="category-title mb-16 text-center">Contact</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-md space-y-6 mx-auto"
      >
        <div>
          <label htmlFor="name" className="block caption mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block caption mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block caption mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
            placeholder="Your message..."
          />
        </div>
        <button
          type="submit"
          className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors"
        >
          Send
        </button>
      </form>
    </section>
  )
}
