import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useGame } from "./GameContext";
import Board from "./Board";
import Header from "./Header";
import Rules from "./Rules";
import GameOverMessage from "./GameOverMessage";

function App() {
  const { resetGame } = useGame();

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Welcome to the Minesweeper</h1>} />
        <Route path="/game/:difficulty" element={<Board />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
      <GameOverMessage />
    </Router>
  );
}

export default App;
