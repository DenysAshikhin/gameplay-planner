"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import './App.css';

import DefaultSave from './util/tempSave.json';
import useLocalStorage from "use-local-storage";

import pako from 'pako';
import MouseOverPopover from "./util/Tooltip.jsx";
// import infoIcon from '/images/icons/info_lightgray.svg';
import backgroundImage from '../../public/images/coming_soon.png'
//  /public/images/coming_soon.png';

import ReactGA from "react-ga4";

// const [customPresets, setCustomPresets] = useLocalStorage(`customPresets`, -1);
// const [customPresetsClient, setCustomPresetsClient] = useState(-1);

// useEffect(() => {
//   setCustomPresetsClient(customPresets)
// }, [customPresets])

export default function Home() {

  const [userData, setUserData] = useLocalStorage('userData', DefaultSave);
  const router = useRouter();

  useEffect(() => {


    let timeout = setTimeout(() => {

      ReactGA.send({ hitType: "pageview", page: "/file_upload_", title: "_Landing Page (Upload)" });
    }, 400);
    return () => { clearTimeout(timeout) };
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      const compressedData = new Uint8Array(event.target.result);
      const decompressedData = pako.inflate(compressedData);
      const textDecoder = new TextDecoder('utf-8');
      const decodedString = textDecoder.decode(decompressedData);

      const startPosition = decodedString.indexOf('{');
      const endPosition = decodedString.lastIndexOf('}') + 1;
      const jsonString = decodedString.slice(startPosition, endPosition);

      try {
        const parsedJson = JSON.parse(jsonString);
        setUserData(parsedJson);
        console.log(parsedJson);
        console.log(`trying to redirect`)
        return router.push('/page_selection');
      } catch (error) {
        console.error('Invalid JSON:', error);
      }
    };

    fileReader.readAsArrayBuffer(file);
  };

  const [forceOpen, setForceOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flex: '1',
        backgroundColor: 'rgba(0,0,0,1)',
        position: 'relative',
        paddingLeft: '6px',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >

      <Image
        style={{
          position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '1',
          opacity: '0.3'
        }}
        alt='fullscreen picture of a Farmer Against Potatoes Idle game'
        src={backgroundImage}
        priority={true}
        unoptimized={true}
      />

      {/* <img style={{
        position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '1',
        opacity: '0.3'
      }} alt='fullscreen picture of a Farmer Against Potatoes Idle game'
        src={'/images/coming_soon.png'}
      /> */}
      {/* <div style={{
        position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '1',
        opacity: '0.3'
      }}>
        <Image alt='fullscreen picture of a Farmer Against Potatoes Idle game'
          src={'/images/coming_soon.png'}
          // src={backgroundImage} 
          fill />
      </div> */}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 'calc(0px - 50vh)',
          zIndex: '2'
        }}
      >
        <MouseOverPopover
          forceOpen={forceOpen}
          setForceOpen={setForceOpen}
          tooltip={
            <div
              onMouseEnter={(e) => { if (!forceOpen) setForceOpen(true) }}
              onMouseLeave={(e) => { if (forceOpen) setForceOpen(false) }}
            >
              <h3 style={{ marginTop: '6px', marginBottom: '12px' }}>Your save file can be found at:</h3>
              <div style={{ display: 'flex' }}>
                <div
                  style={{ fontWeight: 'bold', marginRight: '6px' }}>
                  PC:
                </div>
                <div>
                  <div>
                    %APPDATA%\your_username_here\LocalLow\Oni Gaming\Farmer Against Potatoes Idle\fapi-save.txt
                  </div>
                  <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    or you can copy:
                  </div>
                  <div>
                    %APPDATA%\..\LocalLow\Oni Gaming\Farmer Against Potatoes Idle\fapi-save.txt
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: '12px' }}>
                <div
                  style={{ fontWeight: 'bold', marginRight: '6px' }}>
                  Mobile:
                </div>
                <div>
                  /storage/emulated/0/Android/data/com.oninou.FAPI/files/fapi-save.txt
                </div>
              </div>
            </div>
          }>
          <div
            onMouseEnter={(e) => { if (!forceOpen) setForceOpen(true) }}
            onMouseLeave={(e) => { if (forceOpen) setForceOpen(false) }}
            style={{ display: 'flex', alignItems: 'center' }}>
            <div className="mediumImportantText blackTextStroke" style={{ margin: '0 0 0 0', fontSize: '60px', fontWeight: 'bold' }}>Upload save file to view calculator</div>
            <div style={{ position: 'relative', height: '36px', width: '36px', marginLeft: '6px', marginTop: '6px' }}>
              <Image alt='on hover I in a cirlce icon, shows more information on hover' src={'/images/icons/info_lightgray.svg'}
                fill />
            </div>
          </div>
        </MouseOverPopover>
        <div className="mediumImportantText blackTextStroke" style={{ margin: '0 0 0 0', fontSize: '35px', fontWeight: 'bold', textStroke: '' }}>Warning: contains spoilers!</div>

        <div style={{ marginTop: '16px', }}>
          <input style={{
            width: '150px'
          }} type="file" onChange={handleFileUpload} />
        </div>
      </div>
    </div>
  )
}