import React, {useEffect,} from 'react';
import s from './Board.module.css'
import {useDispatch, useSelector} from "react-redux";
import {boardActions,} from "../redux/board-reducer";



const Board = () => {
    const board = useSelector(state => state.boardReducer.board)
    const pipes = useSelector(state => state.boardReducer.pipes)

    const dispatch = useDispatch()

    // console.log(board)

    useEffect(() => {
        dispatch(boardActions.generateBoard())
        dispatch(boardActions.calculatePath())
    }, [dispatch])

    const  handleClick= (row, column) => {
        dispatch(boardActions.rotatePipe(row, column))
        dispatch(boardActions.calculatePath())
    }

    return (
        <div className={s.Blocks}>
            {board.length > 5 && board.map((v, row) => {
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
