import React, { useState } from "react";
import Heatmap from "./Heatmap";
import data2022 from "./data2022.json";
import data2023 from "./data2023.json";
import data2024 from "./data2024.json";
import "./App.css";

function App() {
  const [selectedYear, setSelectedYear] = useState(2022);

  const getData = () => {
    switch (selectedYear) {
      case 2022:
        return data2022;
      case 2023:
        return data2023;
      case 2024:
        return data2024;
      default:
        return [];
    }
  };

  return (
    <div className="App">
      <h1>Music Listening Heatmap</h1>
      <div className="year-selector">
        {[2022, 2023, 2024].map((year) => (
          <button
            key={year}
            className={selectedYear === year ? "active" : ""}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>
      <Heatmap data={getData()} />
    </div>
  );
}

export default App;
