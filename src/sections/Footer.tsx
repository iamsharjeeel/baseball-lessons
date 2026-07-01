export function Footer() {
  return (
    <footer className="border-t border-ink-black/10 bg-paper-white py-10 lg:py-12">
      <div className="mx-auto max-w-[var(--max-width-content)] px-4 text-center lg:px-10">
        <p className="font-display text-lg font-bold text-ink-black">
          Newtown Sports &amp; Events Center
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-black/60">
          <a
            href="https://nacsportscenter.com/softball-and-baseball-lessons/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            https://nacsportscenter.com
          </a>
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-black/60">
          <a
            href="https://maps.google.com/?q=207+Penns+Trail,+Newtown,+PA+18940"
            className="hover:text-accent"
          >
            207 Penns Trail, Newtown, PA 18940
          </a>
          <span aria-hidden="true"> · </span>
          <a href="tel:+12672887053" className="hover:text-accent">
            (267) 288-7053
          </a>
        </p>
        <p className="mt-2 text-xs text-ink-black/40">
          HitTrax contact: Ryan Busch —{' '}
          <a href="mailto:Rbusch@newtownathletic.com" className="hover:text-accent">
            Rbusch@newtownathletic.com
          </a>
        </p>
      </div>
    </footer>
  )
}
