import React, {useState} from 'react';
import s from './Board.module.css'

const pipes = [
    {positions: ['─', '│', '─', '│',]},
    {positions: ['┤', '┴', '├', '┬',]},
    {positions: ['└', '┌', '┐', '┘',]},
]

const X = 30
const Y = 10

const randInt = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1))

const initialState = Array(Y).fill('').map(() => Array(X).fill('').map(() => ({
    type: randInt(0, 2),
    position: randInt(0, 3),
    active: false
})))

const Board = () => {
    const [state, setState] = useState(initialState)

    const handleClick = (row, column) => {
        const newState = state.map(v => [...v])
        newState[row][column].position = (newState[row][column].position + 1) % 4
        setState(newState)
    }
    return (
        <div className="Blocks">
            {state.map((v, row) => {
                return <div key={row}>{v.map((v, column) => {
                    return <span className={`${s.Block} ${v.active && s.Active}`}
                                 key={column}
                                 onClick={() => handleClick(row, column)}>{pipes[v.type].positions[v.position]}</span>
                })}</div>
            })}

        </div>
    );
};

export default Board;
