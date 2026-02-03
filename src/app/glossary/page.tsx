import { buildMetadata } from "../util/seo";

export const metadata = buildMetadata({
  title: "Glossary",
  description:
    "Glossary for common Farmer Against Potatoes Idle (FAPI) and Gameplay Planner terms used across tools and guides.",
  path: "/glossary",
});

const TERMS: { term: string; definition: string }[] = [
  {
    term: "FAPI",
    definition: "Farmer Against Potatoes Idle, the game this planner supports.",
  },
  {
    term: "Expeditions",
    definition:
      "A system where you send pet teams on runs for rewards; team bonuses and efficiency matter.",
  },
  {
    term: "Zones",
    definition:
      "Expedition zones/locations you choose to run; different zones have different reward profiles.",
  },
  {
    term: "Tokens",
    definition:
      "A common expedition reward/currency affected by bonuses and time efficiency.",
  },
  {
    term: "Clover",
    definition:
      "A token-related modifier referenced by expedition efficiency calculations.",
  },
  {
    term: "Residue / Milk",
    definition:
      "Progression resources used for upgrades; this site provides planning tools for residue/milk spend.",
  },
  {
    term: "Protein / Assembly",
    definition:
      "Protein and assembly line upgrades; this site helps plan purchases based on weighted priorities.",
  },
  {
    term: "Card Charges",
    definition:
      "A way to power up cards; the cards tool helps decide which cards are most valuable to charge.",
  },
  {
    term: "Infinity Corner",
    definition:
      "A progression upgrade area; the Infinity Corner helper helps plan purchases and bonuses.",
  },
  {
    term: "Outposts",
    definition:
      "A mining/trading system; the outposts helper estimates mining durations and future trades.",
  },
];

export default function GlossaryPage() {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: "black",
        padding: "18px",
        overflowY: "auto",
      }}
    >
      <div className="importantText" style={{ maxWidth: 980 }}>
        <h1 style={{ margin: "0 0 12px 0" }}>Glossary</h1>
        <p style={{ margin: "0 0 18px 0", fontSize: 16, lineHeight: 1.5 }}>
          Definitions for common terms used across the planner and guides.
        </p>

        <dl style={{ margin: 0 }}>
          {TERMS.map((item) => (
            <div key={item.term} style={{ marginBottom: 14 }}>
              <dt style={{ fontWeight: 700, fontSize: 18 }}>{item.term}</dt>
              <dd style={{ margin: "6px 0 0 0", fontSize: 16, lineHeight: 1.5 }}>
                {item.definition}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

