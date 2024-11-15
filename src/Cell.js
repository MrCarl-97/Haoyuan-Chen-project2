import React from "react";
import { useGame } from "./GameContext";

const Cell = ({ cell, rowIndex, colIndex }) => {
  const { revealCell, gameOver } = useGame();

  const handleClick = () => {
    if (!gameOver) {
      revealCell(rowIndex, colIndex);
    }
  };

  return (
    <button
      className={`cell ${cell.revealed ? "revealed" : ""}`}
      onClick={handleClick}
    >
      {cell.revealed && (cell.hasMine ? "X" : cell.minesAround || "0")}
    </button>
  );
};

export default Cell;
