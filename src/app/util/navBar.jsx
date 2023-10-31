import Image from "next/image";
import Link from "next/link";

const NavBar = ({}) => {
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
            marginBottom: "12px",
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
      <Link href="/new" alt="navigation to expeditions page">
        <div
          className="navItem"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              position: "relative",
              margin: "12px 0",
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
    </div>
  );
};

export default NavBar;
