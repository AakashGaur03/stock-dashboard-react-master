import React from "react";
import Card from "./Card";

const Overview = ({ currencySymbol,symbol, price, change, changePercent, currency }) => {
  return (
    <Card>
      <span className="text-neutral-400 text-lg xl:text-xl 2xl:text-2xl">
        {symbol}
      </span>
      <div className="w-full flex items-center justify-around">
        <span className="text-2xl xl:text-2xl 2xl:text-3xl flex items-center">
          {currencySymbol}{price}
          <span className="text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2">
            {currency}
          </span>
        </span>
        <span
          className={`text-lg xl:text-xl 2xl:text-2xl ${
            change > 0 ? "text-lime-500" : "text-red-500"
          }`}
        >
          {change} <span>({changePercent}%)</span>
        </span>
      </div>
    </Card>
  );
};

export default Overview;
