import { useState } from 'react';

export default function Player({ initialName, symbol, isActive }) {

    const [ isEditing, setIsEditing ] = useState(false);
    const [ playerName, setPlayerName] = useState(initialName);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
    }

    function handleNameChange(event) {
        setPlayerName(event.target.value);
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {!isEditing && <span className="player-name">{playerName}</span>}
              {isEditing && <input type='text' required value={playerName} onChange={handleNameChange}/>}
              <span className="player-symol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}