import React from "react";
import { useGame } from "./GameContext";

const GameOverMessage = () => {
  const { gameOver, win } = useGame();

  if (!gameOver) return null;

  return (
    <div className="game-over-message">
      {win ? "Game Over, You Win!" : "Game Over, You Lost!"}
    </div>
  );
};

export default GameOverMessage;
