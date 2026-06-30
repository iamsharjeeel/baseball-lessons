import { Image } from '../components/Image'
import { PhotoFrame } from '../components/PhotoFrame'
import { Section } from '../components/Section'

export function Coaches() {
  return (
    <Section id="coaches" background="light" ariaLabelledby="coaches-heading">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <PhotoFrame aspect="coach" className="rounded-md">
          <Image
            src="/images/coach"
            widths={[480, 720, 960]}
            width={960}
            height={1200}
            alt="An NSEC coach giving hands-on batting stance instruction to a teenage athlete"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
        </PhotoFrame>

        <div>
          <h2
            id="coaches-heading"
            className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-night-black"
          >
            Coached by people who&rsquo;ve actually played at the level your
            athlete is chasing
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-night-black/70 lg:text-lg">
            Our staff brings college and professional playing and coaching
            experience into every single lesson — not just drills out of a
            manual.
          </p>
          <a
            href="https://nacsportscenter.com/coaches/"
            className="mt-8 inline-flex min-h-11 items-center font-body text-base font-semibold text-clay-red underline underline-offset-4 hover:text-[#b33d26]"
          >
            Meet the coaches
          </a>
        </div>
      </div>
    </Section>
  )
}
