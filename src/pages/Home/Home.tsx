import React, { useState, useEffect } from "react";
import "./Home.scss";
import logo from "../../assets/resturant.png";
import cover from "../../assets/cover.png";
import "font-awesome/css/font-awesome.min.css";

function HomeScreen(): JSX.Element {
  // const [progress, setProgress] = useState<number>(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 100 ? 0 : prevProgress + 50
  //     );
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div >
      Home
      {/* <img className="cover" src={cover} alt="Logo" />
      <div className="px-6">
        <img className="display" src={logo} alt="Logo" />
        <p className="text-3xl font-sans font-black mt-3">XYZ</p>
        <p className="text-sm">9.00AM-6.00PM • Italiano</p>
        <p className="available text-sm">Serving Now</p>
        <div className="search-bar">
          <div className="search">
            <i className="fa fa-search"></i>
            <input
              type="text"
              className="searchTerm"
              placeholder="What are you looking for?"
            />
          </div>
            <div className="filter">
              <i className="fa fa-exchange"></i>
          </div>
        </div>
        <div className="order">
          <div className="order-header">
          <p className="text-1xl font-sans font-black mt-3">Order the Lunch</p>
          <i className="fa fa-arrow-right"></i>

          </div>

        </div>
      </div> */}
    </div>
  );
}

export default HomeScreen;
