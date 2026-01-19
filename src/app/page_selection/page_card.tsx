import Link from "next/link";
import Image from "next/image";
import './page.css';

/**
 * Renders a navigation card for the planner selection screen with icon and
 * optional red emphasis border for highlighted destinations.
 *
 * @param {{ page: string, highlightClass?: string }} props - Destination metadata and styling flags.
 * @returns {JSX.Element} Link-wrapped card element.
 */
const PageCard = ({ page, highlightClass }: { page: string, highlightClass?: string }) => {
  let imgString = "";
  let nameString = "";
  let url = "";
  let imgSrc;

  switch (page) {
    case "upload":
      imgString = `file_upload`;
      nameString = `Upload`;
      url = "/";
      break;
    case "expedition":
      imgString = `signpost`;
      nameString = `Expedition`;
      url = "/expeditions";
      break;
    case "pets":
      imgString = `paw_plus`;
      nameString = `Equip Pets`;
      url = "/pets";
      break;
    case "farm":
      imgString = `farming`;
      nameString = `Farm`;
      url = "/farming";
      break;
    case "cards":
      imgString = `badge`;
      nameString = `Cards`;
      url = "/cards";
      break;
    case "protein":
      imgString = `gear_lightgray`;
      //   imgSrc = gearIcon;
      nameString = `Protein`;
      url = "/protein";
      break;
    case "donation":
      imgString = `donation-cropped`;
      nameString = 'Donations';
      url = "/donation"
      break;
    case "gratitude":
      imgString = `heart`;
      nameString = 'Gratitude';
      url = "/gratitude"
      break;
    case "residue":
      imgString = 'milk';
      nameString = 'Residue';
      url = '/residue';
      break;
    case 'text_guide':
      imgString = 'handbook';
      nameString = 'Text Guide';
      url = 'https://docs.google.com/document/d/1Asp6H0GHY3_MDGIsrehQv-oJ2BwGDTB-_7LIToA0hWw/';
      break;
    case 'infinity_corner':
      imgString = 'star';
      nameString = "Infinity Corner";
      url = '/infinity_corner';
      break;
    case 'guides':
      imgString = 'paper_scroll';
      nameString = "Guides";
      url = '/guides';
      break;
    case 'outposts':
      imgString = 'pickaxe';
      nameString = "Outposts";
      url = '/outposts';
      break;
    case 'contagion':
      imgString = 'contagion';
      nameString = "Contagion";
      url = '/contagion';
      break;
    case 'zones':
      imgString = 'sword_shield';
      nameString = "Zones";
      url = '/zones';
      break;
    default:
      imgString = `file_upload`;
      nameString = `Upload`;
      break;
  }
  const disabled = false;
  return (
    <Link
      href={url}
      target={page === 'text_guide' ? '_blank' : undefined}
      className={['card', disabled && 'disabled', highlightClass].filter(Boolean).join(' ')}
      >
      <div className="card__icon">
          <Image
            className={`${page === 'residue' ? ' inverseX' : ''}`}
            alt={`navigation item, picture of ${imgString}`}
            src={imgSrc ? imgSrc : `/images/icons/${imgString}.svg`}
            width="120"
            height="100"
            priority
          />
      </div>

      <div className="card__title importantText">
        {nameString}
      </div>
    </Link>
  );
};

export default PageCard;
