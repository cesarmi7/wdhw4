import React, { useState } from "react";
import "./Heatmap.css";

function Heatmap({ data }) {
  const [tooltip, setTooltip] = useState({ visible: false, content: "", x: 0, y: 0 });

  const generateHeatmap = () => {
    const days = Array.from({ length: 12 }, (_, i) => Array(31).fill(null));
    data.forEach(({ date, songs_played, top_song }) => {
      const [year, month, day] = date.split("-").map(Number);
      days[month - 1][day - 1] = { songs_played, top_song };
    });
    return days;
  };

  const getColor = (count) => {
    if (count > 150) return "#195501";
    if (count > 100) return "#487722";
    if (count > 50) return "#789943";
    if (count > 0) return "#a8bd65";
    return "#ebedf0";
  };

  const showTooltip = (e, content) => {
    const tooltipOffset = 15;
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      content,
      x: rect.left + window.scrollX + tooltipOffset,
      y: rect.top + window.scrollY - tooltipOffset,
    });
  };

  const hideTooltip = () => {
    setTooltip({ visible: false, content: "", x: 0, y: 0 });
  };

  const handleTouch = (e, content) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      content,
      x: rect.left + window.scrollX + 15,
      y: rect.top + window.scrollY - 15,
    });
    e.stopPropagation(); // Evitar que otros elementos reaccionen al toque
  };

  const heatmap = generateHeatmap();

  return (
    <div className="heatmap" onClick={hideTooltip}>
      {heatmap.map((month, monthIndex) => (
        <div key={monthIndex} className="month">
          <h3>{new Date(0, monthIndex).toLocaleString("default", { month: "long" })}</h3>
          <div className="days">
            {month.map((day, dayIndex) => {
              const dayData = day || { songs_played: 0, top_song: "No Data" };
              const tooltipContent = `Date: ${new Date(2023, monthIndex, dayIndex + 1).toISOString().split("T")[0]}
Songs Played: ${dayData.songs_played}
Top Song: ${dayData.top_song}`;
              return (
                <div
                  key={dayIndex}
                  className="day"
                  style={{ backgroundColor: getColor(dayData.songs_played) }}
                  onMouseEnter={(e) => showTooltip(e, tooltipContent)} // Desktop
                  onMouseLeave={hideTooltip} // Desktop
                  onClick={(e) => handleTouch(e, tooltipContent)} // Mobile
                >
                  {dayIndex + 1}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {tooltip.visible && (
        <div
          className="tooltip"
          style={{
            top: `${tooltip.y}px`,
            left: `${tooltip.x}px`,
          }}
        >
          {tooltip.content.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Heatmap;
