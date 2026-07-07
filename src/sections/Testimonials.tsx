import { DarkSection } from '../components/DarkSection'
import { FadeUp } from '../components/motion/FadeUp'

const TESTIMONIALS = [
  {
    quote: "Great baseball facility. Plenty of tunnels for pitching and hitting plus room for an entire infield practice.",
    author: "Scott Molson",
    role: "Baseball Parent & Coach",
  },
  {
    quote: "A fantastic indoor space. The cages allow our teams to run through our hitting drills as well as go live when we want. Overall, it has been a great place for training through the years.",
    author: "Dave Bodick",
    role: "Director, Newtown Rock Softball",
  },
  {
    quote: "A state-of-the-art training and fitness center, and a great community center for families in Lower Bucks County.",
    author: "Timothy Rodgers",
    role: "Local Parent",
  },
]

export function Testimonials() {
  return (
    <DarkSection id="testimonials" ariaLabelledby="testimonials-heading">
      <FadeUp>
        <div className="text-center">
          <p className="mb-4 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-6 bg-accent" />
            Testimonials
            <span className="h-px w-6 bg-accent" />
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-paper-white"
          >
            What parents &amp; coaches are saying
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16 lg:gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-md bg-paper-white p-8"
            >
              <p className="font-body text-base italic leading-relaxed text-ink-black/80">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-steel-300/25 pt-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-paper-white">
                    {t.author.charAt(0)}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-ink-black">
                      {t.author}
                    </p>
                    <p className="font-body text-xs text-steel-300">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeUp>
    </DarkSection>
  )
}
