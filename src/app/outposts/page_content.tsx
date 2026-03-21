"use client";

import { isMobile } from "mobile-device-detect";
import { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import helper from "../util/helper";
ReactGA.initialize([
  {
    trackingId: "G-GGLPK02VH8",
  },
]);

import OutpostLine from "./OutpostLine";
import TradeRangeSingle from "./TradeRangeSingle";
import TradeRewardSingle from "./TradeRewardSingle";
import TradeSingle from "./TradeSingle";
import { compareOutpostResourceEntries } from "./trade_sort";

import infoIcon from "@images/icons/info_thick.svg";
import MouseOverPopover from "../util/Tooltip";
import DefaultSave from "../util/tempSave.json";
import useLocalStorage from "use-local-storage";
import mathHelper from "../util/math";
import Image from "next/image";
import Link from "next/link";

/**
 * Provides the main outposts planner experience, handling device detection,
 * saved data loading, and rendering the trade lists with helper context.
 */
export default function Outposts() {
  const [mobileMode, setMobileMode] = useState(false);
  useEffect(() => {
    setMobileMode(isMobile);
    if (isMobile) {
      setTimeout(() => {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport instanceof HTMLMetaElement) {
          viewport.content = "initial-scale=0.1";
          viewport.content = "width=1200";
        }
      }, 500);
    }
  }, []);

  const [forceRefresh, setForceRefresh] = useState(1);

  const [clientData, setData] = useLocalStorage("userData", DefaultSave);
  const [data, setRunTimeData] = useState(DefaultSave);

  useEffect(() => {
    setRunTimeData(clientData);
  }, [clientData]);

  //OutpostsCollection -> array
  //Deal -> current deals
  //DealQueue -> future deals

  //deal object:
  const deal_object = {
    BoughtResourceID: 2, //what type the reward is (protein, ore, etc)
    BoughtResourceIDSub: 0, //sub type i.e material number
    BoughtValue: mathHelper.createDecimal(1.0), //How much you gain from the deal

    CostResourceID: 3, //What it costs to buy the deal
    CostResourceIDSub: 0, //sub type for cost
    CostValue: mathHelper.createDecimal(1.0), //cost to buy the deal

    Locked: 1, //if this trade row is unlocked, 1 other 0
    Sealed: 0, //if this trade has been completed (1 yes)
  };

  let costs = helper.getAverageTradeCosts(data);
  let average_cost_map = [...costs.average_cost_map].sort(
    compareOutpostResourceEntries,
  );
  let range_cost_map = [...costs.range_cost_map].sort(
    compareOutpostResourceEntries,
  );
  let average_reward_map = [...costs.average_reward_map].sort(
    compareOutpostResourceEntries,
  );

  return (
    <div
      style={{
        display: "flex",
        // flexDirection: 'column',
        flex: "1",
        backgroundColor: "black",
        position: "relative",
        padding: "12px 12px 3px 12px",
        // overflow: 'hidden'
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          maxHeight: "calc(100vh - 110px)",
        }}
      >
        {/* trades */}
        <div
          className="importantText"
          style={{
            display: "flex",
            // alignSelf: 'flex-start',
            alignItems: "center",
            justifyContent: "center",
            // margin: '6px 12px 0',
            border: "1px solid white",
            borderRadius: "12px",
            width: "683px",
            fontSize: "24px",
            fontWeight: "bold",
            backgroundColor: "rgba(255,255,255, 0.07)",
          }}
        >
          {`Potential Trades`}
          <MouseOverPopover
            tooltip={
              <div style={{ padding: "6px" }}>
                Shows all of your potential upcoming trades
              </div>
            }
          >
            <div
              style={{
                position: "relative",
                marginLeft: "12px",
                width: "24px",
                height: "24px",
              }}
            >
              <Image
                alt="on hover I in a cirlce icon, shows more information on hover"
                fill
                src={infoIcon}
                unoptimized={true}
              />
            </div>
          </MouseOverPopover>
        </div>
        <div
          className="importantText"
          style={{
            display: "flex",
            // flexDirection: 'column',
            gap: "12px",
            alignSelf: "flex-start",
            // alignItems: 'center',
            justifyContent: "center",
            margin: "6px 0 0 0",
            border: "1px solid white",
            borderRadius: "12px",
            width: "660px",
            // fontSize: '24px',
            // fontWeight: 'bold',
            backgroundColor: "rgba(255,255,255, 0.07)",
            padding: "0px 12px 0px 12px",
            maxHeight: "calc(100vh - 90px)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              gap: "36px",
              justifyContent: "center",
              overflow: "auto",
              paddingBottom: "6px",
            }}
          >
            {/* Future Trades */}
            <div style={{ width: "276px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                {`Potential Trade Costs`}
                <MouseOverPopover
                  tooltip={
                    <div style={{ padding: "6px" }}>
                      These are the potential trades you may see next time you
                      reroll your trades
                    </div>
                  }
                >
                  <div
                    style={{
                      position: "relative",
                      marginLeft: "12px",
                      width: "22px",
                      height: "22px",
                      marginTop: "2px",
                    }}
                  >
                    <Image
                      alt="on hover I in a cirlce icon, shows more information on hover"
                      fill
                      src={infoIcon}
                      unoptimized={true}
                    />
                  </div>
                </MouseOverPopover>
              </div>
              {range_cost_map.map((curr_deal, index) => {
                return (
                  <TradeRangeSingle
                    key={index}
                    deal={curr_deal}
                    borderBottom={index === range_cost_map.length - 1}
                  />
                );
              })}

{/* horizontal line */}
              {/* <div
                style={{
                  height: "1px",
                  backgroundColor: "white",
                  margin: "12px 0",
                }}
              /> */}

              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                {`Average Trade Cost`}
              </div>
              {average_cost_map.map((curr_deal, index) => {
                return (
                  <TradeSingle
                    key={index}
                    deal={curr_deal}
                    borderBottom={index === average_cost_map.length - 1}
                  />
                );
              })} */}
            </div>

            {/* Potential Rewards */}
            <div style={{ width: "276px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                {`Average Trade Rewards`}
              </div>
              {average_reward_map.map((curr_deal, index) => {
                return (
                  <TradeRewardSingle
                    key={index}
                    deal={curr_deal}
                    borderBottom={index === average_reward_map.length - 1}
                  />
                );
              })}

              {/* <div id='in_content_flex' style={{ marginRight: '-44px', marginTop: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', }} /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Ad placement */}
      {/* <div style={{ height: '100%', width: '100px', backgroundColor: 'red', marginLeft: '12px' }}/> */}

      {/* outposts */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          maxHeight: "calc(100vh - 102px)",
        }}
      >
        <div
          className="importantText"
          style={{
            display: "flex",
            // alignSelf: 'flex-start',
            alignItems: "center",
            justifyContent: "center",
            // margin: '6px 12px 0',
            border: "1px solid white",
            borderRadius: "12px",
            width: "855px",
            fontSize: "24px",
            fontWeight: "bold",
            backgroundColor: "rgba(255,255,255, 0.07)",
          }}
        >
          {`Time to mine out`}
          <MouseOverPopover
            tooltip={
              <div style={{ padding: "6px" }}>
                Shows how long it will take to mine out any outpost with any
                miner
              </div>
            }
          >
            <div
              style={{
                position: "relative",
                marginLeft: "12px",
                width: "24px",
                height: "24px",
              }}
            >
              <Image
                alt="on hover I in a cirlce icon, shows more information on hover"
                fill
                src={infoIcon}
                unoptimized={true}
              />
            </div>
          </MouseOverPopover>
        </div>
        <div
          className="importantText"
          style={{
            display: "flex",
            flexDirection: "column",
            // gap: '12px',
            alignSelf: "flex-start",
            // alignItems: 'center',
            justifyContent: "center",
            margin: "6px 12px 0",
            border: "1px solid white",
            borderRadius: "12px",
            width: "845px",
            // fontSize: '24px',
            // fontWeight: 'bold',
            backgroundColor: "rgba(255,255,255, 0.07)",
            padding: "6px 6px 6px 6px",
            maxHeight: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
              maxHeight: "100%",
            }}
          >
            {data.OutpostsCollection.map((curr_outpost, index) => {
              return (
                <OutpostLine
                  key={index}
                  data={data}
                  outpost={curr_outpost}
                  borderBottom={true}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div
        id="right_pillar"
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          display: "flex",
          height: "calc(100vh - 36px)",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>
  );
}
