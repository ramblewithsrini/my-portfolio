import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  title,
}: {
  index?: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12 flex items-baseline gap-4">
      {index && <span className="font-display text-sm font-medium text-accent">{index}</span>}
      <h2 className="type-title">
        {title}
      </h2>
    </Reveal>
  );
}
