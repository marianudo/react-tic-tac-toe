import { useState } from 'react';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({ onSelectSquare, turns }) {
    // Derive state from the turns array.
    // This is doing event sourcing for each click
    let gameBoard = initialGameBoard;

    for (const turn of turns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard(previousBoard => {
    //         // We must update in an immutable way
    //         const updatedBoard = [...previousBoard].map(innerArray => [...innerArray]); // Shallow copy for the 2 dims array
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                    <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol}>
                            {playerSymbol}
                        </button>
                    </li>))}
                </ol>
            </li>)}
        </ol>
    );
}