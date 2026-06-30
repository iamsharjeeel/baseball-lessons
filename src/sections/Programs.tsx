import { PrimaryButton } from '../components/PrimaryButton'
import { PlaceholderTag } from '../components/PlaceholderTag'
import { Section } from '../components/Section'

const PRICE_NOTE = 'PLACEHOLDER — confirm real price with David before launch'

const PROGRAMS = [
  {
    name: 'Free Evaluation',
    price: '$0',
    placeholder: false,
    description: 'Start here if you\u2019re not sure what your athlete needs yet.',
    cta: 'Book My Free Evaluation',
    featured: false,
  },
  {
    name: 'Single Lesson',
    price: '$65',
    placeholder: true,
    description: 'One-on-one session, any skill focus.',
    cta: 'Book a Lesson',
    featured: false,
  },
  {
    name: '4-Lesson Package',
    price: '$240',
    placeholder: true,
    priceNote: '$60/lesson, buy 4 get 1 free',
    description: 'Buy 4, get 1 free. Best for consistent progress.',
    cta: 'Book My Free Evaluation',
    featured: true,
  },
]

export function Programs() {
  return (
    <Section id="programs" background="light" ariaLabelledby="programs-heading">
      <h2
        id="programs-heading"
        className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-night-black"
      >
        Pick your starting point
      </h2>

      <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {PROGRAMS.map((program) => (
          <div
            key={program.name}
            className={`flex flex-col rounded-md bg-paper-white p-8 shadow-sm ring-1 ring-steel-300/30 ${
              program.featured ? 'border-t-4 border-clay-red' : ''
            }`}
          >
            <h3 className="font-display text-xl font-bold tracking-tight text-night-black">
              {program.name}
            </h3>
            <p className="mt-4 flex items-baseline font-data text-4xl font-bold text-clay-red">
              {program.price}
              {program.placeholder && <PlaceholderTag note={PRICE_NOTE} />}
            </p>
            {program.priceNote && (
              <p className="mt-1 text-sm text-night-black/60">{program.priceNote}</p>
            )}
            <p className="mt-4 text-base leading-relaxed text-night-black/70">
              {program.description}
            </p>
            <div className="mt-8">
              <PrimaryButton className="w-full">{program.cta}</PrimaryButton>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
