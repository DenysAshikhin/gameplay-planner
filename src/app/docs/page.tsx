import { buildMetadata } from "../util/seo";

export const metadata = buildMetadata({
  title: "Docs",
  description:
    "Documentation for the Farmer Against Potatoes Idle (FAPI) community planner (Gameplay Planner): what each tool does and when to use it.",
  path: "/docs",
});

export default function DocsPage() {
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
        <h1 style={{ margin: "0 0 12px 0" }}>Docs</h1>
        <p style={{ margin: "0 0 18px 0", fontSize: 18 }}>
          Gameplay Planner is a community tool for{" "}
          <strong>Farmer Against Potatoes Idle (FAPI)</strong>. Use it to import
          your save and get calculators, comparisons, and planning helpers for
          key game systems.
        </p>

        <h2 style={{ margin: "18px 0 8px 0" }}>Tools</h2>
        <ul style={{ marginTop: 0, fontSize: 16, lineHeight: 1.5 }}>
          <li>
            <strong>Expeditions</strong> (<code>/expeditions</code>): build and
            compare expedition teams, filter/whitelist bonuses, and plan token
            efficiency.
          </li>
          <li>
            <strong>Zones</strong> (<code>/zones</code>): plan which expedition
            zones to run based on your teams and rewards.
          </li>
          <li>
            <strong>Pets</strong> (<code>/pets</code>): team builder and combo
            planning with bonus filtering and presets.
          </li>
          <li>
            <strong>Cards</strong> (<code>/cards</code>): card charging and
            prioritization helpers.
          </li>
          <li>
            <strong>Farming</strong> (<code>/farming</code>): plant placement
            and production planning.
          </li>
          <li>
            <strong>Protein</strong> (<code>/protein</code>): protein + assembly
            line planning.
          </li>
          <li>
            <strong>Residue</strong> (<code>/residue</code>): residue/milk
            planning.
          </li>
          <li>
            <strong>Contagion</strong> (<code>/contagion</code>): contagion /
            grasshopper helper.
          </li>
          <li>
            <strong>Outposts</strong> (<code>/outposts</code>): trading and
            mining duration planning.
          </li>
          <li>
            <strong>Infinity Corner</strong> (<code>/infinity_corner</code>):
            upgrades and bonus planning.
          </li>
          <li>
            <strong>Guides</strong> (<code>/guides</code>): tutorials and
            explanations for multiple systems.
          </li>
        </ul>

        <h2 style={{ margin: "18px 0 8px 0" }}>When to use what</h2>
        <ul style={{ marginTop: 0, fontSize: 16, lineHeight: 1.5 }}>
          <li>
            If you&apos;re asking: What expedition team should I run? -{" "}
            <code>/expeditions</code> and <code>/zones</code>.
          </li>
          <li>
            If you&apos;re asking: Which pets matter for my next push? -{" "}
            <code>/pets</code>.
          </li>
          <li>
            If you&apos;re asking: What should I spend my charges/resources on? -{" "}
            <code>/cards</code>, <code>/protein</code>, <code>/residue</code>.
          </li>
          <li>
            If you&apos;re asking: How do I optimize farming? -{" "}
            <code>/farming</code> and <code>/contagion</code>.
          </li>
        </ul>
      </div>
    </div>
  );
}
