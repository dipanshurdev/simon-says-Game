import React from "react";

export default function Colors({ color, onClick, flash }) {
  return (
    <div
      onClick={onClick}
      className={`colorCard ${color} ${flash ? "flash" : ""}`}
    ></div>
  );
}
