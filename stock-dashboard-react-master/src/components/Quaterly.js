import React from 'react'

const Quaterly = ({details}) => {
    console.log(details.quaterArray, "aadssd");

    let quarters = [];
    let prices = [];
  
    if (details.quaterArray && details.quaterArray.length > 0) {
      quarters = details.quaterArray.map((item) => item.date);
      prices = details.quaterArray.map((item) => item.actual.raw);
    }
  return (
    <div>
      <div className="">
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
      </div>
    </div>
  )
}

export default Quaterly
