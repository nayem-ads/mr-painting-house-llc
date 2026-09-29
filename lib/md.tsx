import React from "react";

// Minimal Markdown renderer for migrated blog posts: ## headings, paragraphs, - lists, **bold**.
function inline(s: string, k: string) {
  const parts = s.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => (p.startsWith("**") ? <strong key={k + i}>{p.slice(2, -2)}</strong> : <React.Fragment key={k + i}>{p}</React.Fragment>));
}

export function Markdown({ md }: { md: string }) {
  const blocks = md.replace(/\r/g, "").split(/\n{2,}/);
  const out: React.ReactNode[] = [];
  blocks.forEach((b, i) => {
    const lines = b.split("\n").filter((l) => l.trim());
    if (!lines.length) return;
    if (/^#{1,6}\s/.test(lines[0]) && lines.length === 1) {
      const level = lines[0].match(/^#+/)![0].length;
      const text = lines[0].replace(/^#+\s*/, "");
      out.push(level <= 2 ? <h2 key={i}>{inline(text, "h" + i)}</h2> : <h3 key={i}>{inline(text, "h" + i)}</h3>);
    } else if (lines.every((l) => /^\s*([-*]|\d+\.)\s/.test(l))) {
      out.push(<ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\s*([-*]|\d+\.)\s/, ""), i + "l" + j)}</li>)}</ul>);
    } else {
      lines.forEach((l, j) => {
        if (/^#{1,6}\s/.test(l)) out.push(<h2 key={i + "-" + j}>{inline(l.replace(/^#+\s*/, ""), "h" + i + j)}</h2>);
        else if (/^\s*[-*]\s/.test(l)) out.push(<ul key={i + "-" + j}><li>{inline(l.replace(/^\s*[-*]\s/, ""), "u" + i + j)}</li></ul>);
        else out.push(<p key={i + "-" + j}>{inline(l, "p" + i + j)}</p>);
      });
    }
  });
  return <>{out}</>;
}
