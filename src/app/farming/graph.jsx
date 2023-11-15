"use client";

import helper from "../util/helper.js";
import mathHelper from "../util/math.js";
import { memo } from "react";
import Image from 'next/image';
import redIcon from '../../../public/images/icons/info_red.svg'
import MouseOverPopover from "../util/Tooltip.jsx";



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
        <div style={{ position: 'absolute', top: '16px', left: '125px' }}>


          <MouseOverPopover extraClasses={'suggestionHolder'} key={'popover_too_many_auto'} tooltip={
            <div style={{ padding: '6px' }}>
              You have assigned more autos total than `Unlocked Atuso` value!
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
              width={95}
            >
              <Label
                value="Total HP Made"
                position="insideLeft"
                angle={-90}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
          )}
          {showFries && (
            <YAxis
              yAxisId="fries"
              orientation={showHP ? "right" : "left"}
              // scale={yScale}
              scale={"linear"}
              domain={["auto", "auto"]}
              tickFormatter={(e, index, payload) => {
                let temp = mathHelper.createDecimal(e);
                temp.exponent += expDiffFry;
                return temp.toPrecision(3).toString();
              }}
            // width={95}
            >
              <Label
                value="Total Fries Made"
                position="insideLeft"
                angle={-90}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
          )}
          <Tooltip
            formatter={(value, name, props) => {
              return [
                props.payload.originalProduction
                  ? props.payload.originalProduction.toPrecision(3).toString()
                  : props.payload.fries.toPrecision(3).toString(),
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
              {/* <Line
                        type="monotone"
                        xAxisId={"mainTime"}
                        yAxisId="potatoes"
                        dataKey="value2"
                        name={`Top ${1} production`}
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        type="monotone"
                        xAxisId={"mainTime"}
                        yAxisId="potatoes"
                        dataKey="value11"
                        name={`Top ${10} production`}
                        stroke="red"
                        activeDot={{ r: 8 }}
            /> */}

              {/* {calcStep && ( */}
              <>
                {bestPic > 0 && showHP && (
                  <>
                    <XAxis
                      dataKey="time"
                      hide={true}
                      xAxisId={"bestPIC"}
                      name="time in seconds"
                    />
                    <Line
                      type="monotone"
                      xAxisId={"bestPIC"}
                      // xAxisId={"mainTime"}
                      yAxisId="potatoes"
                      data={graphObjects.bestPic}
                      dataKey="production"
                      // dataKey="value2"
                      name={`Most PIC HP`}
                      stroke="orange"
                      activeDot={{ r: 8 }}
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
                      // xAxisId={"mainTime"}
                      yAxisId="potatoes"
                      data={graphObjects.bestPicPerc}
                      dataKey="production"
                      // dataKey="value2"
                      name={`Most PIC %`}
                      // stroke="#8884d8"
                      stroke="red"
                      activeDot={{ r: 8 }}
                    />
                  </>
                )}
              </>

              {showHP && (
                <>
                  {graphObjects.top10Potatoes.map((val, index) => {
                    if (index > 0) return;
                    return (
                      <XAxis
                        key={`xAxis${index}`}
                        dataKey="time"
                        hide={true}
                        xAxisId={"potatoXAxis" + index}
                        name="time in seconds"
                      />
                    );
                  })}

                  {graphObjects.top10Potatoes.map((val, index) => {
                    if (index > 0) return;
                    return (
                      <Line
                        key={`line${index}`}
                        type="monotone"
                        xAxisId={"potatoXAxis" + index}
                        // xAxisId={"mainTime"}
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

              {showFries && (
                <>
                  {graphObjects.top10Fries.map((val, index) => {
                    if (index > 0) return;
                    return (
                      <XAxis
                        key={`xAxis${index}_fries`}
                        dataKey="time"
                        hide={true}
                        xAxisId={"fryXAxis" + index}
                        name="time in seconds"
                      />
                    );
                  })}

                  {graphObjects.top10Fries.map((val, index) => {
                    if (index > 0) return;
                    return (
                      <Line
                        key={`line${index}`}
                        type="monotone"
                        xAxisId={"fryXAxis" + index}
                        // xAxisId={"mainTime"}
                        yAxisId="fries"
                        data={val.data}
                        dataKey="fries"
                        // dataKey="value2"
                        name={`Best Production Fries`}
                        stroke="#524f82"
                        activeDot={{ r: 8 }}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}

          {showRunning && (
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
                // xAxisId={"mainTime"}
                yAxisId="potatoes"
                data={
                  runningGraphObjects.runningProd.result.result.dataPointsPotatoes
                }
                dataKey="production"
                // dataKey="value2"
                name={`Best Current Production`}
                // stroke="#8884d8"
                stroke="red"
                activeDot={{ r: 8 }}
              />
            </>
          )}

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
                yAxisId="fries"
                data={graphObjects.customProduction.dataPointsFries}
                dataKey="fries"
                // dataKey="custom"
                name="Currently selected production Fries"
                stroke="#4e795e"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </>
          )}
          {/* {customLines.length > 0 && (
                customLines.map((e, index) => {
                    return (
                        <Line
                            type="monotone"
                            xAxisId="mainTime"
                            yAxisId="potatoes"
                            data={e}
                            dataKey="production"
                            name={`Custom Line ${index}`}
                            stroke="#8884d8"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                        />
                    )
                })
            )} *
{/*bestPlantCombo.top10DataPointsPotatoes.map((val, index) => {
                    return (<XAxis dataKey="time" hide={true} xAxisId={"fryXAxis" + index} name="time in seconds"/>)})
                }
                {bestPlantCombo.top10DataPointsFries.map((val, index) => {
                    return (
                        <Line
                            type="monotone"
                            xAxisId={"fryXAxis" + index}
                            yAxisId="fries"
                            data={val.data}
                            dataKey="fries"
                            name={`Top ${index + 1} fries`}
                            stroke="#82ca9d"
                            activeDot={{ r: 5 }}
                        />
                    )})
                    */}
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
  else if (prev.showFries !== current.showFries) return false;
  else if (prev.showHP !== current.showHP) return false;
  else if (prev.tooManyAuto !== current.tooManyAuto) return false;
  //Otherwise, if the user's total potatoes changed (meaning they updated something else) update graph
  else if (
    prev.graphObjects.customProduction.totalPotatoes.notEquals(
      current.graphObjects.customProduction.totalPotatoes
    )
  ) {
    return false;
  }
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
