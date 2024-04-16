// import React, { useContext, useEffect, useState } from "react";
// import ChartFilter from "./ChartFilter";
// import Card from "./Card";
// import {
//   Area,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   AreaChart,
//   Tooltip,
// } from "recharts";
// import ThemeContext from "../context/ThemeContext";
// import StockContext from "../context/StockContext";
// import { fetchHistoricalData } from "../utils/api/stock-api";
// import {
//   createDate,
//   convertDateToUnixTimestamp,
//   convertUnixTimestampToDate,
// } from "../utils/helpers/date-helper";
// import { chartConfig } from "../constants/config";

// const Chart = () => {
//   const [filter, setFilter] = useState("1W");

//   const { darkMode } = useContext(ThemeContext);

//   const { stockSymbol } = useContext(StockContext);

//   const [data, setData] = useState([]);
//   const [yAxisDomain, setYAxisDomain] = useState([0, 1]); // Initial domain for Y-axis

//   const formatData = (data) => {
//     return data.map(item => ({
//       date: convertUnixTimestampToDate(item.date),
//       value: item.value.toFixed(2), // Format close price to 2 decimal places
//     }));
//   };

//   useEffect(() => {
//     const getDateRange = () => {
//       const { days, weeks, months, years } = chartConfig[filter];

//       const endDate = new Date();
//       const startDate = createDate(endDate, -days, -weeks, -months, -years);

//       const startTimestampUnix = convertDateToUnixTimestamp(startDate);
//       const endTimestampUnix = convertDateToUnixTimestamp(endDate);
//       return { startTimestampUnix, endTimestampUnix };
//     };

//     const updateChartData = async () => {
//       try {
//         const { startTimestampUnix, endTimestampUnix } = getDateRange();
//         const resolution = chartConfig[filter].resolution;
//         const result = await fetchHistoricalData(
//           stockSymbol,
//           resolution,
//           startTimestampUnix,
//           endTimestampUnix
//         );
//         setData(formatData(result));

//         // Calculate minimum and maximum values for Y-axis domain
//         const values = result.map(item => item.value);
//         const minValue = Math.min(...values);
//         const maxValue = Math.max(...values);
//         setYAxisDomain([minValue, maxValue]);
//       } catch (error) {
//         setData([]);
//         console.log(error);
//       }
//     };

//     updateChartData();
//   }, [stockSymbol, filter]);

//   const formatYAxisTick = (tick) => {
//     return tick.toFixed(2); // Format tick to 2 decimal places
//   };
//   return (
//     <Card>
//       <ul className="flex absolute top-2 right-2 z-40">
//         {Object.keys(chartConfig).map((item) => (
//           <li key={item}>
//             <ChartFilter
//               text={item}
//               active={filter === item}
//               onClick={() => {
//                 setFilter(item);
//               }}
//             />
//           </li>
//         ))}
//       </ul>
//       <ResponsiveContainer height={400}>
//         <AreaChart data={data}>
//           <defs>
//             <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
//               <stop
//                 offset="5%"
//                 stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
//                 stopOpacity={0.8}
//               />
//               <stop
//                 offset="95%"
//                 stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
//                 stopOpacity={0}
//               />
//             </linearGradient>
//           </defs>
//           <Tooltip
//             contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
//             itemStyle={darkMode ? { color: "#818cf8" } : null}
//           />
//           <Area
//             type="monotone"
//             dataKey="value"
//             stroke="#312e81"
//             fill="url(#chartColor)"
//             fillOpacity={1}
//             strokeWidth={0.5}
//           />
//           <XAxis dataKey="date" />
//           <YAxis domain={yAxisDomain}
//           tickFormatter={formatYAxisTick} />
//         </AreaChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// };

// export default Chart;

import React, { useContext, useEffect, useState } from "react";
import ChartFilter from "./ChartFilter";
import Card from "./Card";
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
} from "recharts";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { fetchHistoricalData } from "../utils/api/stock-api";
import {
  createDate,
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
} from "../utils/helpers/date-helper";
import { chartConfig } from "../constants/config";

const Chart = () => {
  const [filter, setFilter] = useState("1W");
  const [loading, setLoading] = useState(false); // State for loading indicator

  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const [data, setData] = useState([]);
  const [yAxisDomain, setYAxisDomain] = useState([0, 1]);

  const formatData = (data) => {
    return data.map(item => ({
      date: convertUnixTimestampToDate(item.date),
      value: item.value.toFixed(2),
    }));
  };

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];
      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);
      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);
      return { startTimestampUnix, endTimestampUnix };
    };

    const updateChartData = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[filter].resolution;
        const result = await fetchHistoricalData(
          stockSymbol,
          resolution,
          startTimestampUnix,
          endTimestampUnix
        );
        setData(formatData(result));
        const values = result.map(item => item.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        setYAxisDomain([minValue, maxValue]);
      } catch (error) {
        setData([]);
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    updateChartData();
  }, [stockSymbol, filter]);

  const formatYAxisTick = (tick) => {
    return tick.toFixed(2);
  };

  return (
    <Card>
      {loading && ( // Show spinner when loading is true
        <div className="spinner-border spinnerClass" role="status">
        </div>
      )}
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item);
              }}
            />
          </li>
        ))}
      </ul>
      <ResponsiveContainer height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fill="url(#chartColor)"
            fillOpacity={1}
            strokeWidth={0.5}
          />
          <XAxis dataKey="date" />
          <YAxis domain={yAxisDomain} tickFormatter={formatYAxisTick} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
