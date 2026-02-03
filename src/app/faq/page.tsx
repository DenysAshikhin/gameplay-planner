import { buildMetadata, CONTACT_DISCORD_URL, CONTACT_GITHUB_ISSUES_URL, STATUS_STATEMENT } from "../util/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "FAQ for the Farmer Against Potatoes Idle (FAPI) community planner: save import, troubleshooting, and privacy notes.",
  path: "/faq",
});

export default function FaqPage() {
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
        <h1 style={{ margin: "0 0 12px 0" }}>FAQ</h1>

        <h2 style={{ margin: "18px 0 8px 0" }}>What is this site?</h2>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5 }}>
          Gameplay Planner is one of the three main community utilities for{" "}
          <strong>Farmer Against Potatoes Idle (FAPI)</strong> (alongside a
          written Google Doc and a Google Sheet). {STATUS_STATEMENT}
        </p>

        <h2 style={{ margin: "18px 0 8px 0" }}>How do I use it?</h2>
        <ol style={{ marginTop: 0, fontSize: 16, lineHeight: 1.5 }}>
          <li>
            Go to <code>/</code> and import your save.
          </li>
          <li>
            Use <code>/page_selection</code> to pick a tool.
          </li>
          <li>
            Use tool-specific pages like <code>/expeditions</code>,{" "}
            <code>/pets</code>, <code>/cards</code>, etc.
          </li>
        </ol>

        <h2 style={{ margin: "18px 0 8px 0" }}>Do you store my save?</h2>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5 }}>
          The planner is designed to work by processing your save data in the
          browser for calculations and recommendations. The site may use typical
          website services (for example analytics or ads).
        </p>

        <h2 style={{ margin: "18px 0 8px 0" }}>Something looks wrong / I found a bug</h2>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5 }}>
          The fastest way to get help is Discord or opening a GitHub issue.
        </p>
        <ul style={{ marginTop: 8, fontSize: 16, lineHeight: 1.5 }}>
          <li>
            Discord: <code>{CONTACT_DISCORD_URL}</code>
          </li>
          <li>
            GitHub issues: <code>{CONTACT_GITHUB_ISSUES_URL}</code>
          </li>
        </ul>
      </div>
    </div>
  );
}

