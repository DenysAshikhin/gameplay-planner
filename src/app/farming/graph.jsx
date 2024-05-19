"use client";

import helper from "../util/helper.js";
import mathHelper from "../util/math.js";
import { memo } from "react";
import Image from 'next/image';
import redIcon from '@images/icons/info_red.svg'
import MouseOverPopover from "../util/Tooltip";



import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";


function Graph({
  graphObjects,
  runningGraphObjects,
  yScale,
  expDiff,
  expDiffFry,
  showCalc,
  bestPic,
  displayPicPerc,
  calcDone,
  calcAFK,
  showHP,
  showFries,
  tooManyAuto
}) {
  let showRunning = false;
  if (!!runningGraphObjects?.runningProd?.prod && !calcDone && !calcAFK) {
    showRunning = true;
  }

  return (
    <>
      {tooManyAuto && (
        <div style={{ position: 'absolute', top: '16px', left: '125px', zIndex: '2' }}>


          <MouseOverPopover extraClasses={'suggestionHolder'} key={'popover_too_many_auto'} tooltip={
            <div style={{ padding: '6px' }}>
              You have assigned more autos total than `Unlocked Autos` value!
            </div>
          }>
            <div className='elementToFadeInAndOut' style={{ height: '24px', width: '24px', marginTop: '-4px', position: 'relative' }}>
              <Image
                alt='prestige star, yellow star in a red/orange circle'
                fill
                src={redIcon}
                unoptimized={true}
              />
            </div>
          </MouseOverPopover>




        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {showHP && (
            <XAxis
              dataKey="time"
              xAxisId="mainTime"
              name="time in seconds"
              tickFormatter={(e, index) => {
                return helper.secondsToString(e);
              }}
              minTickGap={7}
            />
          )}
          {showHP && (
            <YAxis
              yAxisId="potatoes"
              scale={yScale}
              domain={["auto", "auto"]}

              tickFormatter={(e, index, payload) => {
                let temp = mathHelper.createDecimal(e);
                temp.exponent += expDiff;
                return temp.toPrecision(3).toString();
              }}
              width={82}
            // dx={25}
            >
              <Label
                value="Total HP Made"
                position="insideLeft"
                angle={-90}
                style={{ textAnchor: "middle" }}
                dx={-15}
              />
            </YAxis>
          )}
          {showFries && (
            <YAxis
              yAxisId="originalFry"
              orientation={showHP ? "right" : "left"}
              scale={yScale}
              domain={["auto", "auto"]}
              tickFormatter={(e, index, payload) => {
                let temp = mathHelper.createDecimal(e);
                temp.exponent += expDiffFry;
                return temp.toPrecision(3).toString();
              }}
              width={82}
            >
              <Label
                value="Total Fries Made"
                position="insideLeft"
                angle={-90}
                style={{ textAnchor: "middle" }}
                dx={showHP ? 85 : -15}
              />
            </YAxis>
          )}
          <Tooltip
            formatter={(value, name, props) => {
              return [
                props.payload.originalProduction
                  ? props.payload.originalProduction.toPrecision(3).toString()
                  : props.payload.originalFry.toPrecision(3).toString(),
                name,
              ];
            }}
            labelFormatter={(label, payload) => {
              return helper.secondsToString(label);
            }}
          />
          <Legend />

          {showCalc && (
            <>
              {/* {calcStep && ( */}
              <>
                {bestPic > 0 && showHP && (
                  <>
                    <XAxis
                      dataKey="time"
                      hide={true}
                      xAxisId={"bestPIC"}
                      name="time in seconds"
                      key="pic_x_axis"
                    />
                    <Line
                      type="monotone"
                      xAxisId={"bestPIC"}
                      yAxisId="potatoes"
                      data={graphObjects.bestPic}
                      dataKey="production"
                      // dataKey="value2"
                      name={`Most PIC HP`}
                      stroke="orange"
                      activeDot={{ r: 8 }}
                      key="pic_line"
                    />
                  </>
                )}
                {displayPicPerc && (
                  <>
                    <XAxis
                      dataKey="time"
                      hide={true}
                      xAxisId={"bestPICPerc"}
                      name="time in seconds"
                    />
                    <Line
                      type="monotone"
                      xAxisId={"bestPICPerc"}
                      yAxisId="potatoes"
                      data={graphObjects.bestPicPerc}
                      dataKey="production"
                      // dataKey="value2"
                      name={`Most PIC %`}
                      // stroke="#8884d8"
                      stroke="cyan"
                      activeDot={{ r: 8 }}
                    />
                  </>
                )}
              </>

              {showHP && (
                <>
                  {graphObjects.top10Potatoes.map((val, index) => {
                    if (index > 0) return <></>;
                    return (
                      <XAxis
                        key={`xAxis_best_pot${index}`}
                        dataKey="time"
                        hide={true}
                        xAxisId={"potatoXAxis" + index}
                        name="time in secondss"
                      />
                    );
                  })}

                  {graphObjects.top10Potatoes.map((val, index) => {
                    if (index > 0) return <></>;
                    return (
                      <Line
                        key={`line${index}`}
                        type="monotone"
                        xAxisId={"potatoXAxis" + index}
                        yAxisId="potatoes"
                        data={val.data}
                        dataKey="production"
                        // dataKey="value2"
                        name={`Best Production HP`}
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}


          {showCalc && showFries &&
            (
              <>
                {graphObjects.top10Fries.map((val, index) => {
                  if (index > 0) return <></>;
                  return (
                    <XAxis
                      key={`xAxis${index}_fries1`}
                      dataKey="time"
                      hide={true}
                      xAxisId={"fryXAxis1" + index}
                      name="time in seconds"
                    />
                  );
                })}

                {graphObjects.top10Fries.map((val, index) => {
                  if (index > 0) return <></>;
                  return (
                    <Line
                      key={`line_top_fry_${index}`}
                      type="monotone"
                      xAxisId={"fryXAxis1" + index}
                      yAxisId="originalFry"
                      data={val.data}
                      // data={graphObjects.customProduction.dataPointsFries}
                      // dataKey={graphObjects.customProduction.dataPointsFries.originalFry ? "originalFry" : 'fries'}
                      dataKey={val.data[0]?.fries ? "fries" : 'originalFry'}
                      // dataKey="originalFry"
                      // dataKey="value2"
                      name={`Best Production Fries`}
                      stroke="#524f82"
                      // stroke="red"
                      activeDot={{ r: 8 }}
                    />
                  );
                })}
              </>
            )}

          {showRunning && false && (
            <>
              <XAxis
                dataKey="time"
                hide={true}
                xAxisId={"runningProd"}
                name="time in seconds"
              />
              <Line
                type="monotone"
                xAxisId={"runningProd"}
                yAxisId="potatoes"
                data={
                  runningGraphObjects.runningProd.result.result.dataPointsPotatoes
                }
                dataKey="production"
                // dataKey="value2"
                name={`Best Current Production`}
                // stroke="#8884d8"
                stroke="cyan"
                activeDot={{ r: 8 }}
              />
            </>
          )}


          {/* custom selection */}
          {showHP && (
            <Line
              type="monotone"
              xAxisId="mainTime"
              yAxisId="potatoes"
              data={graphObjects.customProduction.dataPointsPotatoes}
              dataKey="production"
              // dataKey="custom"
              name="Currently selected production HP"
              stroke="#82ca9d"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          )}

          {/* custom selection */}
          {showFries && (
            <>
              <XAxis
                dataKey="time"
                xAxisId="fry_axis_current"
                name="time in seconds"
                hide={showHP ? true : false}
                minTickGap={7}
                tickFormatter={(e, index) => {
                  return helper.secondsToString(e);
                }}
              />

              <Line
                type="monotone"
                xAxisId="fry_axis_current"
                yAxisId="originalFry"
                data={graphObjects.customProduction.dataPointsFries}
                dataKey={graphObjects.customProduction.dataPointsFries.originalFry ? "originalFry" : 'fries'}
                // dataKey="custom"
                name="Currently selected production Fries"
                stroke="#4e795e"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
export default memo(Graph, function (prev, current) {
  let isEqual = true;

  //to avoid checking every single datapoint, we can be a bit smarter
  //if the graph was recalulcated, or calculating, update graph
  if (prev.showCalc !== current.showCalc) return false;

  //Otherwise, if the user's total potatoes changed (meaning they updated something else) update graph
  if (!!prev.graphObjects.customProduction.totalPotatoes) {
    if (
      prev.graphObjects.customProduction.totalPotatoes.notEquals(
        current.graphObjects.customProduction.totalPotatoes
      )
    ) {
      return false;
    }
  }

  if (prev.showFries !== current.showFries) return false;
  else if (prev.showHP !== current.showHP) return false;
  else if (prev.tooManyAuto !== current.tooManyAuto) return false;

  //or if the y-axis scale is changed
  else if (prev.yScale !== current.yScale) return false;
  else if (current?.runningGraphObjects?.runningProd?.prod) {
    if (!prev?.runningGraphObjects?.runningProd?.prod) return false;
    if (
      prev.runningGraphObjects.runningProd.prod.notEquals(
        current.runningGraphObjects.runningProd.prod
      )
    ) {
      return false;
    }
  }
  return isEqual;
});
