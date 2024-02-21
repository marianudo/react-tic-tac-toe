import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";

import { useState } from 'react';

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

function App() {
  const [gameTurns, setGameTurns] = useState([])

  // Derive the activePlayer state from the gameTurns one
  const activePlayer = deriveActivePlayer(gameTurns);

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} 
                   turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
