import Image from "next/image";

import HeaderRedirect from './header_redirect.jsx';
import potatoesImg from '../../../public/images/potatoes.png'
import farmerImg from '../../../public/images/farmer2.png'


const Header = ({ }) => {
  return (
    <div
      className="header hover"
      style={{
        height: "36px",
        display: "flex",
        flex: "1",
        alignItems: "center",
        padding: "0 0 0 3px",
        margin: "0 0 0 0",
      }}

    >

      <HeaderRedirect />
      {/* <img
        style={{ height: "31px", width: "156px", position: "relative" }}
        alt='in game font spelling "Farmer"'
        src={"/images/farmer2.png"}
      /> */}
      <div style={{ height: "31px", width: "156px", position: "relative" }}>
        <Image
          alt='in game font spelling "Farmer"'
          src={farmerImg}
          fill
          unoptimized={true}
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
      {/* <img
        style={{ height: "31px", width: "192px", position: "relative" }}
        alt='in game font spelling "Potatoes"'
        src={"/images/potatoes.png"}
      /> */}

      <div style={{ height: "31px", width: "192px", position: "relative" }}>
        <Image
          alt='in game font spelling "Potatoes"'
          src={potatoesImg}
          fill
          unoptimized={true}
        />
      </div>
      <div
        className="dobra importantText"
        style={{
          marginLeft: "6px",
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        Idle gameplay planner
      </div>
    </div>
  );
};

export default Header;
