import Image from "next/image";

const Header = ({}) => {
  return (
    <div
      className="header"
      style={{
        height: "36px",
        display: "flex",
        flex: "1",
        alignItems: "center",
        padding: "0 0 0 3px",
        margin: "0 0 0 0",
      }}
    >
      <div style={{ height: "31px", width: "156px", position: "relative" }}>
        <Image
          alt='in game font spelling "Farmer"'
          src={"/images/farmer2.png"}
          fill
        />
      </div>

      <div
        className="dobra importantText"
        style={{
          margin: "0 6px",
        }}
      >
        Against
      </div>
      <div style={{ height: "31px", width: "192px", position: "relative" }}>
        <Image
          alt='in game font spelling "Potatoes"'
          src={"/images/potatoes.png"}
          fill
        />
      </div>
      <div
        className="dobra importantText"
        style={{
          marginLeft: "6px",
        }}
      >
        Idle gameplay planner
      </div>
    </div>
  );
};

export default Header;
