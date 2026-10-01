import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12 flex items-baseline gap-4">
      <span className="font-display text-sm font-medium text-accent">{index}</span>
      <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
        {title}
      </h2>
    </Reveal>
  );
}
