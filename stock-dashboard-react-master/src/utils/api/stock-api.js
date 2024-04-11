import axios from "axios";
const basePath = "https://finnhub.io/api/v1";

/**
 * Searches best stock matches based on a user's query
 * @param {string} query - The user's query, e.g. 'fb'
 * @returns {Promise<Object[]>} Response array of best stock matches
 */
export const searchSymbol = async (query) => {
  if(!query) query="APPL"

  // const url = `${basePath}/search?q=${query}&token=cne00d9r01qml3k1vbfgcne00d9r01qml3k1vbg0`;
  // const response = await fetch(url);

  // if (!response.ok) {
  //   const message = `An error has occured: ${response.status}`;
  //   throw new Error(message);
  // }

  // return await response.json();
  console.log(query);
  const options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/auto-complete",
    params: {
      q: `${query}`,
      region: "IN",
    },
    headers: {
      "X-RapidAPI-Key": "bb3721361emshddcfed580ee75dap16315bjsn1b92129b04d2",
      "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response);
    // if (!response.ok) {
    //   const message = `An error has occured: ${response.status}`;
    //   throw new Error(message);
    // }
    return response.data.quotes;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetches the details of a given company
 * @param {string} stockSymbol - Symbol of the company, e.g. 'FB'
 * @returns {Promise<Object>} Response object
 */
export const fetchStockDetails = async (stockSymbol) => {
  // const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=cne00d9r01qml3k1vbfgcne00d9r01qml3k1vbg0`;
  // const response = await fetch(url);
  if(!stockSymbol) stockSymbol="AAPL"
  const options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/stock/v2/get-summary",
    params: {
      symbol: `${stockSymbol}`,
      region: "US",
    },
    headers: {
      "X-RapidAPI-Key": "bb3721361emshddcfed580ee75dap16315bjsn1b92129b04d2",
      "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response);
    if (response) {
      let data = {
        country: response.data.summaryProfile.country,
        currency: response.data.price.currency,
        currencySymbol: response.data.price.currencySymbol,
        estimateCurrency: response.data.currency,
        exchange: response.data.price.exchangeName,
        finnhubIndustry: response.data.summaryProfile.sector,
        ipo: "1980-12-12",
        logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png",
        marketCapitalization: response.data.summaryDetail.marketCap.raw,
        name: response.data.quoteType.longName,
        phone: response.data.summaryProfile.phone,
        shareOutstanding: 15441.88,
        ticker: response.data.quoteType.symbol,
        weburl: "https://www.apple.com/",
      };
      if (data) return data;
    }
  } catch (error) {
    console.error(error);
  }
  // try {
  //   const response = await axios.request(options);
  //   console.log(response.data,"ChartDATA");
  // return await response.data;

  // } catch (error) {
  //   console.error(error);
  // }
};

// export const fetchStockDetails = async (stockSymbol) => {
//   const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=cne00d9r01qml3k1vbfgcne00d9r01qml3k1vbg0`;
//   const response = await fetch(url);
//   // const options = {
//   //   method: "GET",
//   //   url: "https://yh-finance.p.rapidapi.com/stock/v3/get-chart",
//   //   params: {
//   //     interval: "1mo",
//   //     symbol: "AMRN",
//   //     range: "5y",
//   //     region: "US",
//   //     includePrePost: "false",
//   //     useYfid: "true",
//   //     includeAdjustedClose: "true",
//   //     events: "capitalGain,div,split",
//   //   },
//   //   headers: {
//   //     "X-RapidAPI-Key": "bb3721361emshddcfed580ee75dap16315bjsn1b92129b04d2",
//   //     "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
//   //   },
//   // };

//   if (!response.ok) {
//     const message = `An error has occured: ${response.status}`;
//     throw new Error(message);
//   }

//   return await response.json();
//   // try {
//   //   const response = await axios.request(options);
//   //   console.log(response.data,"ChartDATA");
//   // return await response.data;

//   // } catch (error) {
//   //   console.error(error);
//   // }
// };
/**
 * Fetches the latest quote of a given stock
 * @param {string} stockSymbol - Symbol of the company, e.g. 'FB'
 * @returns {Promise<Object>} Response object
 */
export const fetchQuote = async (stockSymbol) => {
  if(!stockSymbol) stockSymbol="AAPL"
  const url = `${basePath}/quote?symbol=${stockSymbol}&token=cne00d9r01qml3k1vbfgcne00d9r01qml3k1vbg0`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
  
};

/**
 * Fetches historical data of a stock (to be displayed on a chart)
 * @param {string} stockSymbol - Symbol of the company, e.g. 'FB'
 * @param {string} resolution - Resolution of timestamps. Supported resolution includes: 1, 5, 15, 30, 60, D, W, M
 * @param {number} from - UNIX timestamp (seconds elapsed since January 1st, 1970 at UTC). Interval initial value.
 * @param {number} to - UNIX timestamp (seconds elapsed since January 1st, 1970 at UTC). Interval end value.
 * @returns {Promise<Object>} Response object
 */
export const fetchHistoricalData = async (
  stockSymbol,
  resolution,
  from,
  to
) => {
  if(!stockSymbol) stockSymbol="AAPL"

  const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=cne00d9r01qml3k1vbfgcne00d9r01qml3k1vbg0`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();

};
