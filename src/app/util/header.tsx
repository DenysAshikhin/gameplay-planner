import Image from "next/image";

import Link from 'next/link';
import HeaderRedirect from './header_redirect';

import potatoesImg from '@images/potatoes.png'
import farmerImg from '@images/farmer2.png'

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
        src={farmerImg}
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
        src={potatoesImg}
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
      <div
        className="importantText"
        style={{ marginLeft: 'auto', zIndex:'3' }}
      >
        <Link href={`https://www.gameplayplanner.com/privacy_policy.html`} style={{ textDecoration: 'none' }}>
          <div
            className="importantText hover">

            {`Privacy`}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
