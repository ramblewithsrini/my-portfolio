import Reveal from "./Reveal";
import { profile } from "@/data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="px-5 pb-16 sm:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-accent-2 via-[#4b3bd6] to-[#1b1640] px-8 py-20 text-center sm:px-16 sm:py-28">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <p className="type-eyebrow relative text-white/70">
          Contact
        </p>
        <h2 className="relative mt-4 type-display">
          Let&apos;s talk.
        </h2>
        <p className="relative mx-auto mt-6 max-w-xl text-lg text-white/75">
          I&apos;m based in {profile.location}. Whether it&apos;s a leadership
          role, an advisory engagement or a transformation that needs shaping —
          my inbox is open.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="relative mt-10 inline-block rounded-full bg-accent px-8 py-4 font-display text-lg font-bold text-background transition-transform hover:scale-105"
        >
          {profile.email}
        </a>
        <div className="relative mt-8 flex justify-center gap-6">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              {s.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
