/**
 * Contact section with Unicorn Forms
 */
import { useEffect } from 'react'

const inputClass =
  'w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors'

export default function Contact() {
  useEffect(() => {
    if (document.querySelector('script[src*="magic-horn"]')) return
    const script = document.createElement('script')
    script.src = 'https://unicorn-forms.on-forge.com/js/magic-horn.js'
    script.defer = true
    document.body.appendChild(script)
  }, [])

  return (
    <section className="py-24 px-6 bg-neutral-900 text-white">
      <form
        method="post"
        action="https://mailer.unicorn-forms.com"
        data-unicorn-form="discover"
        className="max-w-md space-y-6 mx-auto"
      >
        <div className="uf-form-response hidden" aria-live="polite">
          Thank you for your message
        </div>

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
