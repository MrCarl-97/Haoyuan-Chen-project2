import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGame } from "./GameContext";

const Header = () => {
  const { setDifficulty, resetGame } = useGame();
  const navigate = useNavigate();

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
    resetGame();
    navigate(`/game/${difficulty}`);
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/rules">Rules</Link>
      <button onClick={() => handleDifficultyChange("easy")}>Easy</button>
      <button onClick={() => handleDifficultyChange("medium")}>Medium</button>
      <button onClick={() => handleDifficultyChange("hard")}>Hard</button>
    </nav>
  );
};

export default Header;
