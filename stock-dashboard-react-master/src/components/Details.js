import React, { useContext } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";

const Details = ({ details }) => {
  const { darkMode } = useContext(ThemeContext);

  const detailsList = {
    name: "Name",
    country: "Country",
    currency: "Currency",
    exchange: "Exchange",
    // ipo: "IPO Date",
    marketCapitalization: "Market Capitalization",
    finnhubIndustry: "Industry",
  };
  const detailsList2 = {
    peRatio: "P/E ratio",
    pbRatio: "P/B ratio",
    RSI: "Rsi ",
    FibRess: "Fib resistance ",
    FTWeekHigh: "52 weeks high low",
    SuppRess: "Support/ resistance",
  };

  const convertToBillion = (number) => {
    console.log(number, "number");
    return (number / 1000000000).toFixed(2);
  };

  return (
    <Card>
      <div className="row">
        <div className="col-lg-6">
          <ul
            className={`flex flex-col justify-between divide-y-1 p-8 ${
              darkMode ? "divide-gray-800" : null
            }`}
          >
            {Object.keys(detailsList).map((item) => {
              const value = details[item];
              return (
                <li
                  key={item}
                  className="flex-1 flex justify-between items-center"
                >
                  <span>{detailsList[item]}</span>
                  <span className="font-bold">
                    {value !== undefined && value !== null
                      ? item === "marketCapitalization"
                        ? `${convertToBillion(value)}B`
                        : value
                      : "No data at current moment"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-lg-6">
          <ul
            className={`flex flex-col justify-between divide-y-1 p-8 ${
              darkMode ? "divide-gray-800" : null
            }`}
          >
            {Object.keys(detailsList2).map((item) => {
              const value = details[item];
              return (
                <li
                  key={item}
                  className="flex-1 flex justify-between items-center"
                >
                  <span>{detailsList2[item]}</span>
                  <span className="font-bold">
                    {value !== undefined && value !== null
                      ? value
                      : "No data at current moment"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default Details;
