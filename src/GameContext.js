import React, { createContext, useState, useContext } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState("easy");
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [revealedCells, setRevealedCells] = useState(0);

  const resetGame = () => {
    const settings = {
      easy: { rows: 8, cols: 8, mines: 10 },
      medium: { rows: 16, cols: 16, mines: 40 },
      hard: { rows: 16, cols: 30, mines: 99 },
    };
    const { rows, cols, mines } = settings[difficulty];
    const newBoard = generateBoard(rows, cols, mines);
    setBoard(newBoard);
    setGameOver(false);
    setWin(false);
    setRevealedCells(0);
  };

  const generateBoard = (rows, cols, mines) => {
    // new board
    const board = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols).fill({ hasMine: false, revealed: false, minesAround: 0 })
      );

    // record the location
    const allPositions = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        allPositions.push([row, col]);
      }
    }

    // bomb location
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const randomIndex = Math.floor(Math.random() * allPositions.length);
      const [row, col] = allPositions.splice(randomIndex, 1)[0];
      board[row][col] = { ...board[row][col], hasMine: true };
      minesPlaced++;
    }

    // how many bomb around the box
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!board[row][col].hasMine) {
          board[row][col].minesAround = calculateMinesAround(board, row, col);
        }
      }
    }

    return board;
  };

  const calculateMinesAround = (board, row, col) => {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      /* cell */ [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    let minesCount = 0;
    for (let [dRow, dCol] of directions) {
      const newRow = row + dRow;
      const newCol = col + dCol;
      if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[0].length &&
        board[newRow][newCol].hasMine
      ) {
        minesCount++;
      }
    }
    return minesCount;
  };

  const revealCell = (row, col) => {
    if (gameOver || !board[row] || !board[row][col] || board[row][col].revealed)
      return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[row][col].revealed = true;

    if (newBoard[row][col].hasMine) {
      setGameOver(true);
    } else {
      setRevealedCells((prev) => prev + 1);

      if (newBoard[row][col].minesAround === 0) {
        const directions = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ];

        directions.forEach(([dRow, dCol]) => {
          const newRow = row + dRow;
          const newCol = col + dCol;

          if (
            newRow >= 0 &&
            newRow < newBoard.length &&
            newCol >= 0 &&
            newCol < newBoard[0].length &&
            !newBoard[newRow][newCol].revealed &&
            !newBoard[newRow][newCol].hasMine
          ) {
            newBoard[newRow][newCol].revealed = true;

            setRevealedCells((prev) => prev + 1);
          }
        });
      }

      const totalCells = board.length * board[0].length;
      const totalSafeCells =
        totalCells - board.flat().filter((cell) => cell.hasMine).length;
      if (revealedCells + 1 === totalSafeCells) {
        setWin(true);
        setGameOver(true);
      }
    }

    setBoard(newBoard);
  };

  return (
    <GameContext.Provider
      value={{
        difficulty,
        setDifficulty,
        board,
        setBoard,
        gameOver,
        setGameOver,
        win,
        setWin,
        resetGame,
        revealCell,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
