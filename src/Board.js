import React from "react";
import { useGame } from "./GameContext";
import Cell from "./Cell";

const Board = () => {
  const { board } = useGame();

  return (
    <div
      className="board"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${board[0]?.length || 0}, 30px)`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            rowIndex={rowIndex}
            colIndex={colIndex}
          />
        ))
      )}
    </div>
  );
};

export default Board;
