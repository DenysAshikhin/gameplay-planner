import type { Metadata } from "next";

export const SITE_URL = "https://www.gameplayplanner.com";
export const SITE_NAME = "Farmer Against Potatoes Idle Planner";

export const OG_IMAGE_PATH = "/opengraph-image";
export const TWITTER_IMAGE_PATH = "/twitter-image";

export const CONTACT_DISCORD_URL = "https://discord.gg/pt8a9Y3mSv";
export const CONTACT_GITHUB_ISSUES_URL =
  "https://github.com/DenysAshikhin/gameplay-planner/issues";

export const STATUS_STATEMENT =
  "Unofficial community tool for Farmer Against Potatoes Idle (FAPI). The game's creator is aware of and approves this tool.";

export const DEFAULT_DESCRIPTION =
  "Farmer Against Potatoes Idle (FAPI) community gameplay planner with calculators and guides for expeditions, pets/team building, zones, farming, cards/charges, protein assembly, residue, contagion, outposts, and Infinity Corner.";

export const DEFAULT_KEYWORDS = [
  "Farmer Against Potatoes Idle",
  "FAPI",
  "gameplay planner",
  "idle game planner",
  "expeditions",
  "expedition team",
  "pets",
  "pet team",
  "zones",
  "farming",
  "cards",
  "card charge",
  "protein",
  "assembly",
  "residue",
  "contagion",
  "outposts",
  "infinity corner",
  "guide",
  "calculator",
];

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path: string;
};

export function buildMetadata({
  title,
  description,
  path,
}: BuildMetadataInput): Metadata {
  const canonicalUrl = new URL(path, SITE_URL);
  const resolvedDescription = description || DEFAULT_DESCRIPTION;
  const pageTitle = title || undefined;
  const brandedTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  const openGraphImageUrl = new URL(OG_IMAGE_PATH, SITE_URL);
  const twitterImageUrl = new URL(TWITTER_IMAGE_PATH, SITE_URL);

  return {
    metadataBase: new URL(SITE_URL),
    title: pageTitle,
    description: resolvedDescription,
    applicationName: SITE_NAME,
    keywords: DEFAULT_KEYWORDS,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: brandedTitle,
      description: resolvedDescription,
      images: [
        {
          url: openGraphImageUrl,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description: resolvedDescription,
      images: [twitterImageUrl],
    },
  };
}
