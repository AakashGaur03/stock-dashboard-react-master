import React, { useContext } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";
import Table from "react-bootstrap/Table";
const Details = ({ details }) => {
  const { darkMode } = useContext(ThemeContext);

  console.log(details.quaterArray, "aadssd");

  let quarters = [];
  let prices = [];

  if (details.quaterArray && details.quaterArray.length > 0) {
    quarters = details.quaterArray.map((item) => item.date);
    prices = details.quaterArray.map((item) => item.actual.raw);
  }

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
    pbRatio: "P/B ratio",
    FTWeekHigh: "52 weeks high",
    FTWeekLow: "52 weeks Low",
    // regularMarketVolume: "Regular Market Volume",
    TotalCash: "Total Cash ",
    totalRevenue: "Total Revenue",
    debtToEquity: "Debt To Equity",
  };

  const convertToBillion = (number) => {
    console.log(number, "number");
    return (number / 1000000000).toFixed(2);
  };

  return (
    <>
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

      {details.quaterArray && (
        <>
          <h2 className="text-center my-3"> Quaterly Results</h2>
          <Table border="1">
            <thead className={`${darkMode ? "darkModeClass" : "lightModeClass"}`}>
              <tr>
                <th className={`${darkMode ? "darkModeClass" : "lightModeClass"} text-center`}></th>
                {quarters.map((quarter, index) => (
                  <th className={`${darkMode ? "darkModeClass" : "lightModeClass"} text-center`} key={index}>
                    {quarter}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${darkMode ? "darkModeClass" : "lightModeClass"} text-center`}></td>
                {prices.map((price, index) => (
                  <td className={`${darkMode ? "darkModeClass" : "lightModeClass"} text-center`} key={index}>
                    {price}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </>
      )}

      {/* <div className="circle-container">
        {quarters.map((quarter, index) => (
          <div
            key={index}
            className={
              index === quarters.length - 1
                ? "liCirlceClassEnd"
                : "liCirlceClass"
            }
          >
            <span className="quater">{quarter}</span>
            <span className="circleClass"></span>
            <span className="price">{prices[index]}</span>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default Details;
