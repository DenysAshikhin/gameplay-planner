"use client";

import helper from "../util/helper.js";
import MouseOverPopover from "../util/Tooltip.jsx";
import ReactGA from "react-ga4";
import { memo, useState, useEffect, useMemo } from "react";
import Image from "next/image";

import P1 from '../../../public/images/farming/plants/P1.png'
import P2 from '../../../public/images/farming/plants/P2.png'
import P3 from '../../../public/images/farming/plants/P3.png'
import P4 from '../../../public/images/farming/plants/P4.png'
import P5 from '../../../public/images/farming/plants/P5.png'
import P6 from '../../../public/images/farming/plants/P6.png'
import P7 from '../../../public/images/farming/plants/P7.png'
import P8 from '../../../public/images/farming/plants/P8.png'
import P9 from '../../../public/images/farming/plants/P9.png'
import PrestigeStar from '../../../public/images/icons/prestige_star.png'
import UpArrow from '../../../public/images/icons/up_arrow.svg';
import InfoIcon from '../../../public/images/icons/info_white.svg'

// import P1 from '../../../public/images/farming/plants/P1.png'



const FarmingPlant = ({ data }) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  let plant = data.plant;

  let index = data.index;
  let useFutureValues = data.useFutureValues;
  let modifiers = data.modifiers;
  let fake = data.fake;
  let plantAutos = data.plantAutos;
  let setPlantAutos = data.setPlantAutos;

  if (plantAutos && modifiers) {
    modifiers.numAuto = plantAutos[index];
  }

  if (fake) {
    plant = { created: 1 };
    index = 0;
    useFutureValues = true;
  }
  if (!hydrated && false) {
    plant.growthTime = 111;
    plant.perHarvest = 222;
    plant.created = 333;
    plant.totalMade = 444;
    plant.futureMult = 555;
    plant.nextPrestige = 665;
    plant.timeToPrestige = 776;
    plant.timeToLevel = 888;
    plant.production = 999;
    modifiers.numAuto = 1;
  }

  let img;
  switch (index + 1) {
    case 1:
      img = P1;
      break;
    case 2:
      img = P2;
      break;
    case 3:
      img = P3;
      break;
    case 4:
      img = P4;
      break;
    case 5:
      img = P5;
      break;
    case 6:
      img = P6;
      break;
    case 7:
      img = P7;
      break;
    case 8:
      img = P8;
      break;
    case 9:
      img = P9;
      break;
    default:
      break;
  }


  let plantTitle = `P${index + 1}`;
  let harvestTime = `${helper.secondsToStringWithS(plant.growthTime)}`;
  let harvestAmount = `${plant.perHarvest.toExponential(2)}`;
  let totalHarvest = `${plant.created.toExponential(2)}`;
  let totalMade = `${plant.totalMade.toExponential(2)}`;
  // let outMult = ` (x${helper.roundTwoDecimal(useFutureValues ? plant.futureMult : plant.currMult)})`;
  let outMult = ` (x${plant.futureMult.toPrecision(3).toString()})`;

  let pic = `${plant.prestige}`;
  let futurePic = `${plant.nextPrestige}`;
  let picTime =
    useFutureValues && !fake
      ? `${plant.timeToPrestige > 3600
        ? helper.secondsToString(plant.timeToPrestige)
        : helper.secondsToStringWithS(plant.timeToPrestige)
      }`
      : ``;
  let rank = `${plant.Rank}`;
  let originalRank = `${plant.originalRank}`;
  let rankTime = `${plant.timeToLevel > 3600
    ? helper.secondsToString(plant.timeToLevel)
    : helper.secondsToStringWithS(plant.timeToLevel)
    }`;
  let totalProd = !fake ? `${plant.production.toExponential(2)}` : ``;

  if (fake) {
    plantTitle = `Plant`;
    harvestTime = `Harvest Time`;
    harvestAmount = `Harvest Amount`;
    totalHarvest = `Total Harvested`;
    outMult = `Output Multiplier`;
    pic = `Current Pic`;
    futurePic = `Future Pic`;
    originalRank = `Initial Rank`;
    picTime = useFutureValues ? `Time to next PIC + 'Hours to calculate'` : ``;
    rank = `Rank`;
    rankTime = `Time to Rank`;
  }

  return (
    <div
      style={{
        border: "1px solid black",
        margin: "6px 3px",
        padding: "0 0 0 0",
        display: "flex",
        height: "179px",
        width: 'auto',
        backgroundColor: "white",
        // maxHeight:'128px'
      }}
    >
      <div style={{ height: "185px", width: "185px", position: "relative" }}>

        {/* <img style={{
          height: "214px",
          width: "214px",
          position: "absolute",
          bottom: "0",
          left: "0",
          zIndex: "1",
        }}
          alt={`in game plant #${index + 1} image`}
          src={`/images/farming/plants/P${index + 1}.png`}
        /> */}

        <div
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            bottom: "0",
            left: "0",
            zIndex: "1",
          }}
        />
        <Image
          alt={`in game plant #${index + 1} image`}
          // src={`/images/farming/plants/P${index + 1}.png`}
          src={img}
          fill
          unoptimized={true}
          priority
        />
        <div />

        <div
          style={{
            zIndex: 2,
            background: "black",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            padding: "0 1px 0 1px",
            color: "white",
            top: "0%",
            left: fake ? `35%` : "43%",
            display: "flex",
            position: "absolute",
          }}
        >
          {plantTitle}
        </div>

        <div
          style={{
            zIndex: 2,
            background: "black",
            borderRadius: "6px",
            fontSize: "12px",
            padding: "0 1px 0 1px",
            color: "white",
            top: "12%",
            left: "2%",
            display: "flex",
            position: "absolute",
          }}
        >
          {harvestTime}
        </div>

        <div
          style={{
            zIndex: 2,
            background: "black",
            borderRadius: "6px",
            padding: "0 1px 0 1px",
            color: "white",
            top: "1%",
            right: "1%",
            display: "flex",
            position: "absolute",
          }}
        >
          <MouseOverPopover
          opacity='0.905'
            tooltip={
              <div>
                {/* Harvest Amount */}
                <div style={{ display: 'flex', }}>
                  <div style={{ marginRight: '6px' }}>
                    Harvest Amount
                  </div>
                  <div>
                    {harvestAmount}
                  </div>
                </div>

                {/* output mult */}
                <div style={{ display: 'flex', }}>
                  <div style={{ marginRight: '6px' }}>
                    Output multiplier
                  </div>
                  <div>
                    {totalProd + ` ` + outMult}
                  </div>
                </div>

                {/* Harvest Amount */}
                <div style={{ display: 'flex', }}>
                  <div style={{ marginRight: '6px' }}>
                    Total Harvest
                  </div>
                  <div>
                    {totalMade + ` (${totalHarvest})`}
                  </div>
                </div>
              </div>
            }
          >
            <div
              style={{
                height: "28px",
                width: "28px",
                zIndex: "-1",
                position: "relative",
              }}
            >
              <Image
                fill
                alt="Letter i in a circle, hover for more information"
                src={InfoIcon}
                unoptimized={true}
              />
            </div>
          </MouseOverPopover>
        </div>

        {/* Harvest Amount */}
        {/* <div
          style={{
            zIndex: 2,
            background: "black",
            borderRadius: "6px",
            padding: "0 1px 0 1px",
            color: "white",
            top: "1%",
            right: "1%",
            display: "flex",
            position: "absolute",
          }}
        >
          <MouseOverPopover
            tooltip={
              <div>
                <div>Harvest Amount</div>
              </div>
            }
          >
            <div style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
              {harvestAmount}
            </div>
          </MouseOverPopover>
        </div> */}

        {/* output mult */}
        {/* <div
          style={{
            zIndex: 2,
            background: "black",
            borderRadius: "6px",
            fontSize: "12px",
            padding: "0 1px 0 1px",
            color: "white",
            top: "10%",
            right: "3%",
            display: "flex",
            position: "absolute",
          }}
        >
          <MouseOverPopover
            tooltip={
              <div>
                <div>Output multiplier</div>
              </div>
            }
          >
            <div style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
              {totalProd + ` ` + outMult}
            </div>
          </MouseOverPopover>
        </div> */}

        {/* total harvest */}
        {/* <div
          style={{
            zIndex: 2,
            background: "black",
            borderRadius: "6px",
            fontSize: "12px",
            padding: "0 1px 0 1px",
            color: "white",
            top: "20%",
            right: "1%",
            display: "flex",
            position: "absolute",
          }}
        >
          <MouseOverPopover
            tooltip={
              <div>
                <div>Total Harvest</div>
              </div>
            }
          >
            <div style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
              {totalMade + ` (${totalHarvest})`}
            </div>
          </MouseOverPopover>
        </div> */}

        {/* Rank */}
        <div
          style={{
            zIndex: 2,
            fontSize: "10px",
            padding: "0 1px 0 1px",
            color: "white",
            bottom: "18%",
            left: "18%",
            display: "flex",
            position: "absolute",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  background: "black",
                  borderRadius: "6px",
                  padding: "0 3px 0 3px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {originalRank}
              </div>

              <div
                style={{
                  height: "16px",
                  width: "12px",
                  zIndex: "1",
                  transform: "rotate(90deg)",
                  margin: "0 3px 0 0",
                  position: "relative",
                }}
              >
                <Image
                  alt="arrow pointing up"
                  src={UpArrow}
                  style={{ width: '100%', height: '100%' }}
                  unoptimized={true}
                />
              </div>
              <div
                style={{
                  background: "black",
                  borderRadius: "6px",
                  padding: "0 3px 0 3px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {rank}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "10px",
                margin: "0 3px",
              }}
            >
              <div
                style={{
                  height: "16px",
                  width: "24px",
                  zIndex: "1",
                  position: "relative",
                }}
              >
                <Image
                  alt="arrow pointing up"
                  src={UpArrow}
                  height={16}
                  width={24}
                  // style={{
                  //   zIndex: "1",
                  //   position: "relative",
                  // }}
                  // fill
                  unoptimized={true}
                />
              </div>
            </div>
            <div
              style={{
                background: "black",
                borderRadius: "6px",
                fontSize: "12px",
                padding: "0 1px 0 1px",
                color: "white",
                display: "flex",
                alignItems: "center",
                padding: "0 3px 0 3px",
              }}
            >
              {rankTime}
            </div>
          </div>
        </div>

        {/* PIC */}
        <div
          style={{
            zIndex: 2,
            fontSize: "12px",
            padding: "0 1px 0 1px",
            color: "white",
            bottom: "30%",
            left: "0%",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            position: "absolute",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Current PIC */}
            <MouseOverPopover
              tooltip={
                <div>
                  <div>PIC Level</div>
                </div>
              }
            >
              <div style={{ display: "flex", alignItems: "center" }}>


                {/* <img
                  style={{
                    height: "16px",
                    width: "16px",
                    zIndex: "-1",
                    position: "relative",
                  }}
                  alt="yellow star in an red/orange filled circle, in game prestige icon"
                  src={PrestigeStar}
                /> */}

                <div
                  style={{
                    height: "16px",
                    width: "16px",
                    zIndex: "-1",
                    position: "relative",
                  }}
                >
                  <Image
                    fill
                    alt="yellow star in an red/orange filled circle, in game prestige icon"
                    src={PrestigeStar}
                    unoptimized={true}
                  />
                </div>

                <div
                  style={{
                    background: "black",
                    borderRadius: "6px",
                    padding: "0 3px 0 3px",
                  }}
                >
                  {pic}
                </div>

                <div
                  style={{
                    height: "16px",
                    width: "16px",
                    zIndex: "1",
                    transform: "rotate(90deg)",
                    margin: "0 3px 0 6px",
                    position: "relative",
                  }}
                >
                  <Image
                    alt="yellow filled arrow point up with a red trim"
                    src={`/images/icons/up_arrow_yellow.svg`}
                    fill
                    unoptimized={true}
                  />
                </div>
              </div>
            </MouseOverPopover>

            {/* Future PIC */}
            <MouseOverPopover
              tooltip={
                <div>
                  <div>Future PIC Level</div>
                </div>
              }
            >
              <div style={{ display: "flex", alignItems: "center" }}>

                {/* <img
                  style={{
                    height: "16px",
                    width: "16px",
                    zIndex: "-1",
                    position: "relative",
                  }}
                  alt="yellow star in an red/orange filled circle, in game prestige icon"
                  src={PrestigeStar}
                /> */}

                <div
                  style={{
                    height: "16px",
                    width: "16px",
                    zIndex: "-1",
                    position: "relative",
                  }}
                >
                  <Image
                    alt="yellow star in an red/orange filled circle, in game prestige icon"
                    src={PrestigeStar}
                    fill
                    unoptimized={true}
                  />
                </div>

                <div
                  style={{
                    background: "black",
                    borderRadius: "6px",
                    padding: "0 3px 0 3px",
                  }}
                >
                  {futurePic}
                </div>
              </div>
            </MouseOverPopover>

            {useFutureValues && (
              <MouseOverPopover
                tooltip={
                  <div>
                    <div>
                      Time to reach next PIC threshold (after your `hours to
                      calculate` above)
                    </div>
                  </div>
                }
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      height: "16px",
                      width: "16px",
                      zIndex: "1",
                      position: "relative",
                    }}
                  >
                    <Image
                      alt="yellow filled arrow point up with a red trim"
                      src={`/images/icons/up_arrow_yellow.svg`}
                      fill
                      unoptimized={true}
                    />
                  </div>

                  <div
                    style={{
                      background: "black",
                      borderRadius: "6px",
                      fontSize: "12px",
                      padding: "0 1px 0 1px",
                      color: "white",
                      display: "flex",
                      padding: "0 3px 0 3px",
                    }}
                  >
                    {picTime}
                  </div>
                </div>
              </MouseOverPopover>
            )}
          </div>
        </div>

        {/* Num Auto */}
        {!fake && useFutureValues && (
          <div
            style={{
              fontSize: "12px",
              marginTop: "0px",
              height: "12px",
              padding: "0 1px 0 1px",
              color: "black",
              bottom: "11px",
              left: "1%",
              display: "flex",
              position: "absolute",
              zIndex: "2",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: fake ? "" : "center",
                fontSize: "12px",
                fontFamily: "sans-serif",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <MouseOverPopover
                  tooltip={
                    <div>
                      How many autos will be running for this plant for `Hours
                      to calculate` duration
                    </div>
                  }
                >
                  <div>Num Autos</div>
                </MouseOverPopover>

                <input
                  style={{
                    // width: '48px'
                    // , WebkitAppearance: 'none'
                    height: "12px",
                    width: "36px",
                  }}
                  type="number"
                  className="prepNumber"
                  value={plantAutos[index]}
                  onChange={(e) => {
                    try {
                      let x = Number(e.target.value);
                      x = Math.floor(x);
                      if (x < 0 || x > 12) {
                        return;
                      }
                      ReactGA.event({
                        category: "farming_interaction",
                        action: `changed_plant_${index}_auto`,
                        label: `${x}`,
                        value: x,
                      });
                      setPlantAutos((cur) => {
                        let temp = [...cur];
                        temp[index] = x;
                        return temp;
                      });
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                  placeholder={plantAutos[index] + ""}
                  min="0"
                  max="12"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(FarmingPlant, function (prev, curr) {
  if (prev.data.fake !== curr.data.fake) return false;
  // if (curr.data.fake) return true;
  if (prev.data.index !== curr.data.index) return false;
  //No need to check modifier values since if those are diff, plant values are diff as well

  if (
    prev.data.plantAutos[prev.data.index] !==
    curr.data.plantAutos[prev.data.index]
  )
    return false;
  if (prev.data.plant?.timeToLevel !== curr.data?.plant?.timeToLevel)
    return false;
  if (!prev.data.plant?.production.equals(curr.data?.plant?.production)) {
    return false;
  }
  return true; //Nothing changed
});
