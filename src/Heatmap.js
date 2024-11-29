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

  const getGifForSongsPlayed = (songsPlayed) => {
    if (songsPlayed > 150) {
      return "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExejc2d2oyd3hqYXR0Z200OWhuaHRkMXpkOG1raXJybjF4M2dxY2t6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VJxNm7zrm3K4E/giphy.webp"; // Very high activity
    } else if (songsPlayed > 100) {
      return "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTZsYTV6OGcxbzR1bGhwN2Fid2EzNzlzNWc2N2w4OTI2MHhsbHMxZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4oMoIbIQrvCjm/giphy.webp"; // High activity
    } else if (songsPlayed > 50) {
      return "https://64.media.tumblr.com/0e96916f16d4eb58663de979fe08ef44/tumblr_inline_nzazjyuuLK1t91gva_500.gifv"; // Moderate activity
    } else if (songsPlayed > 0) {
      return "https://64.media.tumblr.com/8b156a49fd9d807c9e495f29d8aeda60/tumblr_onsyjpH9591qcbwpgo2_250.gifv"; // Low activity
    } else {
      return "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDFuZWt3ajAwaDA5c3h5MWFpdXk2dGRzNmh1aHpmdWxzMHZ2bmNyZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RkhqXObfsfyhWwh4jL/giphy.webp"; // No activity
    }
  
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

  const heatmap = generateHeatmap();

  return (
    <div className="heatmap" onClick={hideTooltip}>
      {heatmap.map((month, monthIndex) => (
        <div key={monthIndex} className="month">
          <h3>{new Date(0, monthIndex).toLocaleString("default", { month: "long" })}</h3>
          <div className="days">
            {month.map((day, dayIndex) => {
              const dayData = day || { songs_played: 0, top_song: "No Data" };
              const tooltipContent = (
                <>
                  <div>Date: {new Date(2023, monthIndex, dayIndex + 1).toISOString().split("T")[0]}</div>
                  <div>Number of Songs Played: {dayData.songs_played}</div>
                  <div>Top Song: {dayData.top_song}</div>
                  {dayData.songs_played > 0 && (
                    <img
                      src={getGifForSongsPlayed(dayData.songs_played)}
                      alt="Activity GIF"
                      style={{ maxWidth: "100px", marginTop: "10px", borderRadius: "5px" }}
                    />
                  )}
                </>
              );
              return (
                <div
                  key={dayIndex}
                  className="day"
                  style={{ backgroundColor: getColor(dayData.songs_played) }}
                  onMouseEnter={(e) => showTooltip(e, tooltipContent)}
                  onMouseLeave={hideTooltip}
                  onClick={(e) => showTooltip(e, tooltipContent)} // Mobile support
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
          {tooltip.content}
        </div>
      )}
    </div>
  );
}

export default Heatmap;
