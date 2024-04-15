import axios from "axios";
const basePath = "https://finnhub.io/api/v1";
export const searchSymbol = async (query) => {
  if(!query) query="APPL"

  console.log(query);
  const options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/auto-complete",
    params: {
      q: `${query}`,
      region: "IN",
    },
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response);
    return response.data.quotes;
  } catch (error) {
    console.error(error);
  }
};

export const fetchStockDetails = async (stockSymbol) => {
  if(!stockSymbol) stockSymbol="AAPL"
  const options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/stock/v2/get-summary",
    params: {
      symbol: `${stockSymbol}`,
      region: "US",
    },
    headers: {
      "X-RapidAPI-Key": "",
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
        totalRevenue:response.data.financialData.totalRevenue.fmt,
        pbRatio:response.data.defaultKeyStatistics.priceToBook.fmt,
        TotalCash:response.data.financialData.totalCash.fmt,
        regularMarketVolume:response.data.price.regularMarketVolume.fmt,
        FTWeekLow:parseFloat(response.data.summaryDetail.fiftyTwoWeekLow.fmt.replace(/,/g, '')).toFixed(2), 
        FTWeekHigh:parseFloat(response.data.summaryDetail.fiftyTwoWeekHigh.fmt.replace(/,/g, '')).toFixed(2), 
        debtToEquity:response.data.financialData.debtToEquity.fmt,
        weburl: "https://www.apple.com/",
      };
      if (data) return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchQuote = async (stockSymbol) => {
  if(!stockSymbol) stockSymbol="AAPL"

  if(!stockSymbol) stockSymbol="AAPL"
  const options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/stock/v2/get-summary",
    params: {
      symbol: `${stockSymbol}`,
      region: "US",
    },
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response);
    if (response) {
      let data = {
        d: parseFloat(response.data.price.regularMarketChange.fmt.replace(/,/g, '')).toFixed(2),
        dp: parseFloat(response.data.price.regularMarketChangePercent.fmt.replace(/,/g, '')).toFixed(2),
        h: parseFloat(response.data.price.regularMarketDayHigh.fmt.replace(/,/g, '')).toFixed(2),
        l: parseFloat(response.data.price.regularMarketDayLow.fmt.replace(/,/g, '')).toFixed(2),
        o: parseFloat(response.data.price.regularMarketOpen.fmt.replace(/,/g, '')).toFixed(2),
        pc: parseFloat(response.data.price.regularMarketPrice.fmt.replace(/,/g, '')).toFixed(2),
        c: parseFloat(response.data.price.regularMarketPreviousClose.fmt.replace(/,/g, '')).toFixed(2),

      };
      if (data) return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchHistoricalData = async (
  stockSymbol,
  resolution,
  from,
  to
) => {
  if(!stockSymbol) stockSymbol="AAPL"
  const options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/stock/v3/get-chart",
    params: {
      interval: `${resolution}`,
      symbol: `${stockSymbol}`,
      range: "5y",
      region: "US",
      includePrePost: "false",
      useYfid: "true",
      includeAdjustedClose: "true",
      events: "capitalGain,div,split",
    },
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    const chartData = response.data.chart.result[0];

    const dates = chartData.timestamp;
    const values = chartData.indicators.quote[0].close;

    const formattedData = dates.map((timestamp, index) => ({
      date: dates[index], // Convert Unix timestamp to JavaScript Date object
      value: values[index],
    }));

    return formattedData;

  } catch (error) {
    console.error(error);
  }
};
export const fetchNewsAboutStocks = async (
  stockSymbol,
  resolution,
  from,
  to
) => {
  if(!stockSymbol) stockSymbol="AAPL"
  const options = {
    method: 'POST',
    url: 'https://yh-finance.p.rapidapi.com/news/v2/list',
    params: {
      region: 'US',
      snippetCount: '28',
      s: `${stockSymbol}`
    },
    headers: {
      'content-type': 'text/plain',
      'X-RapidAPI-Key': '94d5879a35msh63d070accbd04e3p13e33ejsnb6869afe3816',
      'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
    },
    data: ''
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
