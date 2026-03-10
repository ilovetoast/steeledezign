/**
 * Contact section with Unicorn Forms
 * Docs: https://unicorn-forms.com/docs/embed-forms
 * Success via .uf-form-response or unicornToolz.onSuccess()
 */
import { useEffect, useState, useRef } from 'react'

const inputClass =
  'w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors'

const isNarrowViewport = () => window.matchMedia('(max-width: 1024px)').matches

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  // Hide floating label when contact page (productions + about + form) nears viewport on mobile
  useEffect(() => {
    const el = document.getElementById('contact')
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isNarrowViewport()) return
        const [e] = entries
        document.body.classList.toggle('in-contact-section', e.isIntersecting)
      },
      { root: null, rootMargin: '300px 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (document.querySelector('script[src*="magic-horn"]')) return
    const script = document.createElement('script')
    script.src = 'https://unicorn-forms.on-forge.com/js/magic-horn.js'
    script.defer = true
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    const onSuccess = () => setSubmitted(true)
    window.unicornToolzInit = (t) => t.onSuccess(onSuccess)
    if (window.unicornToolz) window.unicornToolz.onSuccess(onSuccess)
    return () => { delete window.unicornToolzInit }
  }, [])

  return (
    <section className="py-24 px-6 bg-neutral-900 text-white">
      <form
        method="post"
        action="https://mailer.unicorn-forms.com"
        data-unicorn-form="discover"
        className="max-w-md space-y-6 mx-auto"
      >
        <div
          className={`uf-form-response text-center py-8 ${submitted ? 'block' : 'hidden'}`}
          aria-live="polite"
          role="status"
        >
          <p className="text-xl font-light tracking-wide text-white/90">
            Thank you for your message. I&apos;ll get back to you soon.
          </p>
        </div>
        <div className={submitted ? 'hidden' : 'block space-y-6'}>

        {/* Honeypot - hidden from users */}
        <input
          type="text"
          name="website_url"
          defaultValue=""
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px]"
          aria-hidden="true"
        />
        <input type="hidden" name="$to" value="U:V4:aced723a1bb4957c7da46ab14e0b549c036f5241" />
        <input type="hidden" name="$subject" value="Contact Request" />
        <input type="hidden" name="$responseType" value="json" />

        <div>
          <label htmlFor="name" className="block caption mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClass}
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
            required
            className={inputClass}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block caption mb-2">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            className={inputClass}
            placeholder="Subject"
          />
        </div>
        <div>
          <label htmlFor="message" className="block caption mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={`${inputClass} resize-none`}
            placeholder="Your message..."
          />
        </div>
        <div class="g-recaptcha" data-size="normal" data-sitekey="6LfVzIQsAAAAALZI8QX2ZKEh782vkO_RXCSeHXoo"></div>
        <button
          type="submit"
          className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors"
        >
          Send
        </button>
        </div>
      </form>
    </section>
  )
}
