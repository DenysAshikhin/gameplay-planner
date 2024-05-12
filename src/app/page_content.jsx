"use client"

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { isMobile } from 'mobile-device-detect';
import buffer from './util/buffer.js';
import zlib from './util/index.js';
import './App.css';

import DefaultSave from './util/tempSave.json';
import useLocalStorage from "use-local-storage";

import pako from 'pako';
import MouseOverPopover from "./util/Tooltip.jsx";
// import infoIcon from '/images/icons/info_lightgray.svg';
import backgroundImage from '../../public/images/coming_soon.png'
//  /public/images/coming_soon.png';

// import { GoogleAdSense } from "nextjs-google-adsense";
import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
ReactGA.initialize([{ trackingId: "G-GGLPK02VH8" }]);

export default function Home() {

  const [userData, setUserData] = useLocalStorage('userData', DefaultSave);
  const router = useRouter();
  const stringInputRef = useRef(null);

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
      let jsonString = decodedString.slice(startPosition, endPosition);

      let infIndex = jsonString.indexOf('Infinity');

      while (infIndex > 0) {
        jsonString = jsonString.replaceAll('Infinity', '-999');
        infIndex = jsonString.indexOf('Infinity');
      }

      let NAN_INDEX = jsonString.indexOf('NaN');

      while (NAN_INDEX > 0) {
        jsonString = jsonString.replaceAll('NaN', '-999');
        NAN_INDEX = jsonString.indexOf('NaN');
      }


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

  const aPressed = useRef(false);
  const sPressed = useRef(false);
  const dPressed = useRef(false);
  const fileFlushed = useRef(false);

  useEffect(() => {
    const callback = (event) => {

      switch (event.code) {
        case 'KeyA':
          aPressed.current = true;
          break;
        case 'KeyS':
          sPressed.current = true;
          break;
        case 'KeyD':
          dPressed.current = true;
          break;
        default:
          break;
      }

      if (aPressed.current && sPressed.current && dPressed.current && !fileFlushed.current) {
        console.log('flush file');
        fileFlushed.current = true;

        // create file in browser
        const fileName = "fapi_save_planner";
        const json = JSON.stringify(userData, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);

        // create "a" HTLM element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".txt";
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      }
    };

    const releaseCallback = (event) => {
      switch (event.code) {
        case 'KeyA':
          aPressed.current = false;
          break;
        case 'KeyS':
          sPressed.current = false;
          break;
        case 'KeyD':
          dPressed.current = false;
          break;
        default:
          break;
      }

      if (!aPressed.current && !sPressed.current && !dPressed.current && fileFlushed.current) {
        fileFlushed.current = false;
      }
    }

    document.addEventListener('keydown', callback);
    document.addEventListener('keyup', releaseCallback);
    return () => {
      document.removeEventListener('keydown', callback);
      document.removeEventListener('keyup', releaseCallback);
    };
  }, [userData]);

  const [mobileMode, setMobileMode] = useState(false);
  useEffect(() => {
    setMobileMode(isMobile);
  }, []);


  const calc_future_state = function (plants, time) {

    let timeIncrease = 1; //how many seconds at a time we will skip forward
    let currentTime = 0; // how much time we have skipped forward in total

    let futurePlants = JSON.parse(JSON.stringify(plants)); // make a deep copy of plants to keep seperate from the passed copy and not edit it by accident
    let HP_produced = 0;

    function coolTimeThing(time, j) {
      let a = 1
      for (let i = 0; i < j; i++) {
        a *= time + i
      }
      return a
    }

    // keep looping until we run out of given time
    while (currentTime < time) {

      /** here I would have my logic to determine how far to skip in time, let's assume a constant 10seconds for now */
      timeIncrease = 10;

      //we can either loop from first plant to last, or opposite order, you can change this of course
      for (let i = 0; i < futurePlants.length; i++) {
        // when i=0, produce hp, when i>0 produce plant i
        let currentMultiplier = 1;
        // you probably are using somehting like Decimal.js to make numbers not cause issues
        // in which case replace 1 with whatever initates the object
        for (let j = 1; i + j <= futurePlants.length; j++) {
          currentMultiplier *= futurePlants[i - 1 + j].multiplier / j;
          if (i === 0) {
            HP_produced += futurePlants[i - 1 + j].amount * currentMultiplier * coolTimeThing(timeIncrease, j);
          } else { // 
            futurePlants[i - 1].amount += futurePlants[i - 1 + j].amount * currentMultiplier * coolTimeThing(timeIncrease, j);
          }
        }
      }

      // Update production values to reflect the new amounts
      for (let i = 0; i < futurePlants.length; i++) {
        futurePlants[i].production = futurePlants[i].amount * futurePlants[i].multiplier
      }
      currentTime += timeIncrease;
    }
    return { plants: futurePlants, HP_produced: HP_produced }
  }

  let plants_original = [{ amount: 1, production: 1, multiplier: 1 }, { amount: 1, production: 1, multiplier: 2 },];
  let result = calc_future_state(plants_original, 10);
  console.log(result);


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

      {/* <GoogleAdSense publisherId="pub-1393057374484862" /> */}
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: mobileMode ? '-20vh' : 'calc(0px - 50vh)',
          zIndex: '2'
        }}
      >
        <MouseOverPopover
          forceOpen={forceOpen}
          setForceOpen={setForceOpen}
          forceXPlacement={'right'}
          tooltip={
            <div
              onMouseEnter={(e) => { if (!forceOpen) setForceOpen(true) }}
              onMouseLeave={(e) => { if (forceOpen) setForceOpen(false) }}
            >
              <h3 style={{ marginTop: '6px', marginBottom: '12px' }}>Your save file can be found at:</h3>


              <div style={{ display: 'flex', marginTop: '12px', marginBottom: '24px' }}>
                <div
                  style={{ fontWeight: 'bold', marginRight: '6px', color: "darkred" }}>
                  All Platforms:
                </div>
                <div>
                  enter:
                </div>
                <div style={{ fontWeight: 'bold', color: "darkred", margin: "0 6px" }}>
                  {`"copysave"`}
                </div>
                <div>
                  in the reward code box (found in settings, gift box icon)
                </div>
              </div>

              <div style={{ display: 'flex' }}>

                <div
                  style={{ fontWeight: 'bold', marginRight: '6px' }}>
                  PC:
                </div>
                <div>
                  <div>
                    %LOCALAPPDATA%Low\Oni Gaming\Farmer Against Potatoes Idle\fapi-save.txt
                  </div>
                  <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    or you can copy:
                  </div>
                  <div>
                    %LOCALAPPDATA%Low\Oni Gaming\Farmer Against Potatoes Idle
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: '12px' }}>
                <div
                  style={{ fontWeight: 'bold', marginRight: '6px' }}>
                  Android:
                </div>
                <div>
                  /storage/emulated/0/Android/data/com.oninou.FAPI/files/fapi-save.txt
                </div>
              </div>
            </div>
          }>
          <div className="mediumImportantText blackTextStroke" style={{ margin: '0 0 0 0', fontSize: '60px', fontWeight: 'bold' }}>Upload save file to view calculator</div>
          <div
            onMouseEnter={(e) => { if (!forceOpen) setForceOpen(true) }}
            onMouseLeave={(e) => { if (forceOpen) setForceOpen(false) }}
            style={{ display: 'flex', alignItems: 'center' }}>
            <div className='elementToFadeInAndOut' style={{ position: 'relative', height: '36px', width: '36px', marginLeft: '6px', marginTop: '6px' }}>
              <Image alt='on hover I in a cirlce icon, shows more information on hover' src={'/images/icons/info_lightgray.svg'}
                fill />
            </div>
          </div>
        </MouseOverPopover>
        <div className="mediumImportantText blackTextStroke" style={{ margin: '0 0 0 0', fontSize: '35px', fontWeight: 'bold', textStroke: '' }}>Warning: contains spoilers!</div>

        <div style={{ marginTop: '16px' }}>
          <input style={{ display: 'none' }} id='chooseFileButton' aria-label='save file upload button' type="file" title="" accept=".txt" onChange={handleFileUpload} />
          <button style={{ fontSize: '1.3rem' }} onClick={(e) => { chooseFileButton.click(); return false; }}>Choose File</button>
        </div>
        <div style={{ marginTop: '16px' }}>
          <input type="string" id='stringSave' ref={stringInputRef} placeholder={'Paste save string here'} style={{ marginRight: '12px' }} />
          <button style={{ fontSize: '1.3rem' }}
            onClick={async (e) => {

              let incomingString = stringInputRef.current.value;
              try {



                zlib.gzip(incomingString, function (error, result) {
                  if (error) throw error;
                  console.log(result.toString());
                  let data = result;

                  zlib.unzip(new buffer(data), function (error, result) {
                    if (error) throw error;
                    console.log(result.toString());
                  })
                });
                incomingString = atob(incomingString);
                const startPosition = incomingString.indexOf('{');
                const endPosition = incomingString.lastIndexOf('}') + 1;
                let jsonString = incomingString.slice(startPosition, endPosition);

                let infIndex = jsonString.indexOf('Infinity');

                while (infIndex > 0) {
                  jsonString = jsonString.replaceAll('Infinity', '-999');
                  infIndex = jsonString.indexOf('Infinity');
                }

                let NAN_INDEX = jsonString.indexOf('NaN');

                while (NAN_INDEX > 0) {
                  jsonString = jsonString.replaceAll('NaN', '-999');
                  NAN_INDEX = jsonString.indexOf('NaN');
                }

                try {
                  const parsedJson = JSON.parse(jsonString);
                  setUserData(parsedJson);
                  console.log(parsedJson);
                  console.log(`trying to redirect`)
                  return router.push('/page_selection');
                } catch (error) {
                  console.error('Invalid JSON:', error);
                }
              }
              catch (err) {
                console.log(err);
                console.log(`caught error reading string save`)
              }
            }}>
            Load
          </button>
        </div>
      </div>
      <div id='right_pillar' style={{ position: 'absolute', top: '0', right: '0', display: 'flex', height: 'calc(100vh - 36px)', justifyContent: 'center', alignItems: 'center', }} />
    </div>
  )
}