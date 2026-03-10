/**
 * Footer - minimal
 */
export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-neutral-950 text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="nav-text opacity-70">© {new Date().getFullYear()} Andrea Steele Makeup</p>
      </div>
    </footer>
  )
}
