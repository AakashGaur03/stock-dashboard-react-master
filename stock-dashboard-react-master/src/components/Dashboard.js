import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import Overview from "./Overview";
import Details from "./Details";
import Chart from "./Chart";
import Header from "./Header";
import StockContext from "../context/StockContext";
import { fetchStockDetails, fetchQuote ,fetchNewsAboutStocks } from "../utils/api/stock-api";
import NewsComp from "./NewsComp";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);

  const { stockSymbol } = useContext(StockContext);

  const [stockDetails, setStockDetails] = useState({});

  const [quote, setQuote] = useState({});
  const [news, setNews] = useState([]);

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol) || "";
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };
    const updateStockNews = async () => {
      try {
        const result = await fetchNewsAboutStocks(stockSymbol);
        setNews(result);
      } catch (error) {
        setNews({});
        console.log(error);
      }
    };
    updateStockNews();
    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);

  return (
    <div
      className={`gap-6 p-10 font-quicksand ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header name={stockDetails?.name} />
      </div>
      <div className="md:col-span-2 row-span-4">
        <Chart />
      </div>
      <div>
        <Overview
          symbol={stockSymbol}
          price={quote?.pc}
          change={quote?.d}
          changePercent={quote?.dp}
          currency={stockDetails?.currency}
          currencySymbol={stockDetails?.currencySymbol}
        />
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails} />
      </div>
      <div>
      </div>
      <div>
        <NewsComp newsData={news} />
      </div>
    </div>
  );
};

export default Dashboard;
