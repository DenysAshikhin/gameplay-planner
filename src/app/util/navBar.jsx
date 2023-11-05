import Image from "next/image";
import Link from "next/link";

import BlinkingDot from './Dot.jsx';

const NavBar = ({ }) => {
  return (
    <div
      style={{
        width: "53px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        backgroundColor: "#1F1B24",
      }}
    >
      {/* Landing/Upload Page */}
      <Link href="/" alt="navigation to home (file/save uploade) page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "16px 0",
          }}
        >
          <div style={{ width: "38px", height: "38px", position: "relative" }}>
            <Image
              alt="file uploade icon page navigation to cards page"
              fill
              src={`/images/icons/file_upload.svg`}
            />
          </div>
        </div>
      </Link>

      {/* Expedition Page */}
      <Link href="/expeditions" alt="navigation to expeditions page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "16px 0",
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
              src={`/images/icons/signpost.svg`}
            />
          </div>
        </div>
      </Link>

      {/* Pets Page */}
      <Link
        href="/pets"
        alt="navigation to pets (combos and team builder) page"
      >
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "16px 0",
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
              src={`/images/icons/paw_plus.svg`}
            />
          </div>
        </div>
      </Link>

      {/* Farming Page */}
      <Link href="/farming" alt="navigation to farming page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "16px 0",
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
              src={`/images/icons/farming.svg`}
            />
          </div>
        </div>
      </Link>

      {/* Cards Page */}
      <Link href="/cards" alt="navigation to cards page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "16px 0",
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
              src={`/images/icons/badge.svg`}
            />

          </div>
        </div>
      </Link>

      {/* Protein/assembly Page */}
      <Link href="/protein" alt="navigation to protein (assemblies) page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "16px 0",
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
              src={`/images/icons/gear_lightgray.svg`}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
