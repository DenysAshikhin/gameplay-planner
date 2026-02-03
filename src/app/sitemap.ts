import type { MetadataRoute } from "next";
import { SITE_URL } from "./util/seo";

const APP_PATHS = [
  "/",
  "/page_selection",
  "/expeditions",
  "/zones",
  "/pets",
  "/private_pets",
  "/cards",
  "/farming",
  "/contagion",
  "/protein",
  "/residue",
  "/infinity_corner",
  "/outposts",
  "/guides",
  "/guides/expedition_pets_guide",
  "/guides/expedition_pets_explanation",
  "/guides/pets_guide",
  "/guides/pets_explanation",
  "/guides/farming_guide",
  "/guides/farming_explanation",
  "/guides/cards_guide",
  "/guides/cards_explanation",
  "/about",
  "/gratitude",
  "/docs",
  "/faq",
  "/glossary",
];

const STATIC_HTML_PATHS = [
  "/privacy_policy.html",
  "/terms_of_use.html",
  "/cookie_policy.html",
  "/disclaimer.html",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [...APP_PATHS, ...STATIC_HTML_PATHS].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
  }));
}

