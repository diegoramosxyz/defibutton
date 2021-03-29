export default function SmallCard({
  value,
  caption,
}: {
  value: string;
  caption: string;
}) {
  return (
    <figure className="border-2 p-3">
      <p className="text-2xl text-center font-semibold">{value}</p>
      <figcaption className="mt-3">{caption}</figcaption>
    </figure>
  );
}
