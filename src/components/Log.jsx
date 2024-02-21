export default function Log({ turns }) {
    return (
        <ol id="log">
            {turns.map(t => {
                const label = `Player ${t.player} row ${t.square.row} col ${t.square.col}`;
                const _key = t.square.row + '_' + t.square.col;
                return <li key={_key}>{label}</li>
            })}
        </ol>
    );
}