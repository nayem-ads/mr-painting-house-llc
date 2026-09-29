"use client";
import { useState } from "react";

type Item = { title: string; city: string; date?: string; description: string; image: string | null; kind: string };

export function ShowcaseGrid({ items }: { items: Item[] }) {
  const kinds = ["All", "Exterior", "Interior", "Cabinets"];
  const [k, setK] = useState("All");
  const shown = items.filter((i) => k === "All" || i.kind === k);
  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {kinds.map((x) => <button key={x} aria-pressed={k === x} onClick={() => setK(x)}>{x} {x === "All" ? `(${items.length})` : `(${items.filter((i) => i.kind === x).length})`}</button>)}
      </div>
      <div className="grid-cards">
        {shown.map((p) => (
          <article className="pcard" key={p.title + p.city}>
            {p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : null}
            <div><span className="meta">{p.city}{p.date ? " — " + p.date : ""}</span><h3>{p.title}</h3><p>{p.description}</p></div>
          </article>
        ))}
      </div>
    </>
  );
}
