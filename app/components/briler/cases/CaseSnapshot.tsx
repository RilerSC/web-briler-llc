import Reveal from "../Reveal";

type SnapItem = { k: string; v: string };

export default function CaseSnapshot({ items }: { items: SnapItem[] }) {
  return (
    <div className="snap">
      <Reveal>
        <dl className="wrap snap__row">
          {items.map((item) => (
            <div key={item.k}>
              <dt>{item.k}</dt>
              <dd>{item.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}
