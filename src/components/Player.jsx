import { useState } from 'react';

export default function Player({ name, symbol }) {

    const [ isEditing, setIsEditing ] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
    }

    return (
        <li>
            <span className="player">
              {!isEditing && <span className="player-name">{name}</span>}
              {isEditing && <input type='text' required value={name}/>}
              <span className="player-symol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}