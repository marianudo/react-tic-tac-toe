import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";

import { useState } from 'react';

import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
};

function deriveActivePlayer(gameTurns) {
  let activePlayer = 'X';
  if (gameTurns.length > 0) {
    // We pick the last turn, and set the active player to the other one
    const lastTurn = gameTurns[0];
    const lastPlayer = lastTurn.player;
    activePlayer = lastPlayer === 'X' ? 'O' : 'X';
  }
  return activePlayer;
}

function deriveWinner(gameBoard, playerNames) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerNames[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  // Derive if there's a winner from the gameTurns state
  // This is doing event sourcing for each click
  // NOTE: to prevent a bug that shows up when clicking the restart button on the GameOver overlay
  // we create a deep copy of the initialGameBoard value
  let gameBoard = [...INITIAL_GAME_BOARD].map(array => [...array]);

  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  // OUR STATE
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });

  // Derive the activePlayer state from the gameTurns one
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, playerNames);

  const hasDraw = gameTurns.length === 9 && !winner;

  // Handle click on a board cell
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      // Derived from another state, to prevent using the state irself inside this other state
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, player: currentPlayer }, 
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  // Handle game restart after winner or draw
  function handleRestart() {
    setGameTurns([]);
  }

  // Handle player name editing
  function handlePlayerNameChange(symbol, newName) {
    setPlayerNames(oldPlayerNames => ({
      ...oldPlayerNames,
      [symbol]: newName
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
