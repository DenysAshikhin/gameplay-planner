import Image from "next/image";
import Link from "next/link";

import file_upload from "@images/icons/file_upload.svg";
import signpost from "@images/icons/signpost.svg";
import paw_plus from "@images/icons/paw_plus.svg";
import badge from "@images/icons/badge.svg";
import farming from "@images/icons/farming.svg";
import contagion from "@images/icons/contagion.svg";
import gear_lightgray from "@images/icons/gear_lightgray.svg";
import star from "@images/icons/star.svg";
import pickaxe from "@images/icons/pickaxe.svg";
import paper_scroll from "@images/icons/paper_scroll.svg";
import heart from "@images/icons/heart.svg";
import milk from "@images/icons/milk.svg";
import sword_shield from "@images/icons/sword_shield.svg";

/**
 * Renders the global navigation bar for the gameplay planner, linking to each
 * major section of the site with iconography for quick recognition.
 *
 * @returns {JSX.Element} Vertical navigation column of route links.
 */
const NavBar = ({ }) => {
    return (
    <div
      style={{
        width: "53px",
        height: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        position: "relative",
        backgroundColor: "#1F1B24",
      }}
    >
      {/* Landing/Upload Page */}
      <Link href="/" title="navigation to home (file/save uploade) page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // margin: "16px 0",
          }}
        >
          <div style={{ width: "38px", height: "38px", position: "relative" }}>
            <Image
              alt="file uploade icon page navigation to cards page"
              fill
              src={file_upload}
            />
          </div>
        </div>
      </Link>

      {/* Expedition Page */}
      <Link href="/expeditions" title="navigation to expeditions page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // margin: "16px 0",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              position: "relative",
            }}
          >
            <Image
              alt="signpost icon page navigation to expeditions page"
              fill
              src={signpost}
            />
          </div>
        </div>
      </Link>

      {/* Zones */}
      <Link href="/zones" title="navigation to zones (expedition) page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // margin: "16px 0",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              position: "relative",
            }}
          >
            <Image
              alt="shield through a sword icon page navigation to expeditions 2 page"
              fill
              src={sword_shield}
            />
          </div>
        </div>
      </Link>

      {/* Pets Page */}
      <Link
        href="/pets"
        title="navigation to pets (combos and team builder) page"
      >
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // margin: "16px 0",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              position: "relative",
            }}
          >
            <Image
              alt="dog paw icon page navigation to pet page"
              fill
              src={paw_plus}
            />
          </div>
        </div>
      </Link>


      {/* Cards Page */}
      <Link href="/cards" title="navigation to cards page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // margin: "16px 0",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              position: "relative",
            }}
          >
            <Image
              alt="personal badge icon page navigation to cards page"
              fill
              src={badge}
            />

          </div>
        </div>
      </Link>


      {/* Farming Page */}
      <Link href="/farming" title="navigation to farming page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // margin: "16px 0",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              position: "relative",
            }}
          >
            <Image
              alt="farming icon page navigation to farming"
              fill
              src={farming}
            />
          </div>
        </div>
      </Link>

      {/* Contagion Page */}
      <Link href="/contagion" title="navigation to contagion (grasshopper) page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // margin: "16px 0",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              position: "relative",
            }}
          >
            <Image
              alt="navigation to contagion (grasshopper) page"
              fill
              src={contagion}
            />
          </div>
        </div>
      </Link>

      {/* Protein/assembly Page */}
      <Link href="/protein" title="navigation to protein (assemblies) page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // margin: "16px 0",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              position: "relative",
            }}
          >
            <Image
              alt="mechanical gear icon page navigation to protein page"
              fill
              src={gear_lightgray}
            />
          </div>
        </div>
      </Link>


      {/* Residue Page */}
      <Link href="/residue" title="navigation to residue (milk) page">
        <div
          className="navItem inverseX"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // margin: "16px 0",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              position: "relative",
            }}
          >
            <Image
              alt="milk carton navigation to residue page"
              fill
              src={milk}
            />
          </div>
        </div>
      </Link>

      {/* Infinity Corner Page */}
      <Link href="/infinity_corner" title="navigation to infinity corner page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // margin: "16px 0",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              position: "relative",
            }}
          >
            <Image
              alt="star shape navigation to infinity corner page"
              fill
              src={star}
            />
          </div>
        </div>
      </Link>

      {/* Outposts Page */}
      <Link href="/outposts" title="navigation to outposts page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // margin: "16px 0",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              position: "relative",
            }}
          >
            <Image
              alt="star shape navigation to outposts page"
              fill
              src={pickaxe}
            />
          </div>
        </div>
      </Link>

      {/* Guides Page */}
      <Link href="/guides" title="navigation to guides page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // margin: "16px 0",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              position: "relative",
            }}
          >
            <Image
              alt="vertical paper scroll navigation to guides page"
              fill
              src={paper_scroll}
            />
          </div>
        </div>
      </Link>

      {/* Donation Redirect */}
      <Link href="/gratitude" title="navigation to donate">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // margin: "16px 0",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              position: "relative",
            }}
          >
            <Image
              alt="light gray heart icon navigation to gratiuity and discord link"
              fill
              src={heart}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
