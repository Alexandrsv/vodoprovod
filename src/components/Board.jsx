import React, {useEffect,} from 'react';
import s from './Board.module.css'
import {useDispatch, useSelector} from "react-redux";
import {boardActions} from "../redux/board-reducer";


const Board = () => {
    const {board, pipes, isWin} = useSelector(state => state.boardReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(boardActions.generateBoard())
    }, [dispatch])


    const handleClick = (row, column) => {
        dispatch(boardActions.rotatePipe(row, column))
    }

    const createNewBoard = () => {
        dispatch(boardActions.generateBoard())
    }
    return (
        <div>
            <h1 style={{visibility: isWin ? 'visible' : 'hidden'}}>Победа!</h1>
            <div className={s.Blocks}>
                {board.length > 5 && board.map((v, row) => {
                    return <div key={row}>{v.map((v, column) => {
                        return <span className={`${s.Block} ${v.active && s.Active}`}
                                     key={column}
                                     onClick={() => handleClick(row, column)}>{pipes[v.type].positions[v.position]}</span>
                    })}</div>
                })}

            </div>
            <button style={{marginTop: '20px'}} onClick={createNewBoard}>Создать новую доску</button>
        </div>
    );
};

export default Board;
