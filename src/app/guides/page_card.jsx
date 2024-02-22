import Link from "next/link";
import Image from "next/image";

const PageCard = ({ page, setTab, redBorder, url_force }) => {
  let imgString = "";
  let nameString = "";
  let url = "";
  let imgSrc;
  let tabNum = 0;

  switch (page) {
    case "upload":
      imgString = `file_upload`;
      nameString = `Upload`;
      url = "/";
      break;
    case "expedition":
      imgString = `signpost`;
      nameString = `Expedition`;
      tabNum = 1;
      url = "/expeditions";
      break;
    case "pets":
      imgString = `paw_plus`;
      nameString = `Equip Pets`;
      tabNum = 2;
      url = "/pets";
      break;
    case "farm":
      imgString = `farming`;
      nameString = `Farm`;
      tabNum = 3;
      url = "/farming";
      break;
    case "cards":
      imgString = `badge`;
      nameString = `Cards`;
      tabNum = 4;
      url = "/cards";
      break;
    case "protein":
      imgString = `gear_lightgray`;
      //   imgSrc = gearIcon;
      nameString = `Protein`;
      tabNum = 7;
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
    case 'infinity_corner':
      imgString = 'star';
      nameString = "Infinity Corner";
      url = '/infinity_corner';
      break;
    default:
      imgString = `file_upload`;
      nameString = `Upload`;
      break;
  }
  const disabled = false;

  if (url_force) {
    url = url_force;
  }

  return (
    <Link href={url} style={{ textDecoration: 'none' }}>
      <div
        className={`hover`}
        style={{
          height: "calc(148px - 4px)",
          width: "150px",
          borderRadius: "6px",
          pointerEvents: disabled ? "none" : "",
          opacity: disabled ? "0.3" : "",
          // backgroundColor:'red'
        }}
      >
        <div className={`${redBorder ? 'borderToFadeInAndOutRed' : ''}`}
          style={{
            height: "calc(80% - 12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255, 0.05)",
            // backgroundColor: "blue",
            borderTopRightRadius: "12px",
            borderTopLeftRadius: "12px",
            padding: "6px 6px 6px 6px",
            borderTop: "2px solid rgba(255,255,255,0.8)",
            borderLeft: "2px solid rgba(255,255,255,0.8)",
            borderRight: "2px solid rgba(255,255,255,0.8)"
          }}
        >
          <div
            className={page === 'residue' ? ` inverseX` : ``}
            style={{
              position: "relative",
              height: "calc(100% - 12px)",
              width: "calc(100% - 12px)",
            }}
          >
            <Image
              alt={`navigation item, picture of ${imgString}`}
              src={imgSrc ? imgSrc : `/images/icons/${imgString}.svg`}
              fill
              priority
            />
          </div>
        </div>

        <div className={`${redBorder ? 'borderToFadeInAndOutRed' : ''}`}
          style={{
            height: "calc(20% - 4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "rgba(255,255,255, 0.12)",
            borderBottomRightRadius: "12px",
            borderBottomLeftRadius: "12px",
            borderBottom: "2px solid rgba(255,255,255,0.8)",
            borderLeft: "2px solid rgba(255,255,255,0.8)",
            borderRight: "2px solid rgba(255,255,255,0.8)",
          }}
        >
          <div
            className="importantText"
            style={{
              // marginTop: '6px',
              fontSize: "20px",
            }}
          >
            {nameString}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PageCard;
