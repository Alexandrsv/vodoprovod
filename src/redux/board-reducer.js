import {calculateBoardPath, getNewBoard} from "../utils/utils";

const GENERATE_BOARD = 'board/GENERATE_BOARD'
const ROTATE_PIPE = 'board/ROTATE_PIPE'


export const pipes = [
    {positions: ['─', '│', '─', '│',], flow: [0, 1, 0, 1]},
    {positions: ['┤', '┴', '├', '┬',], flow: [1, 0, 1, 1]},
    {positions: ['└', '┌', '┐', '┘',], flow: [1, 1, 0, 0]},
]


const initialState = {
    board: [[], []],
    pipes: pipes,
    isWin: false

}


export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GENERATE_BOARD: {
            return {...state, board: calculateBoardPath(getNewBoard(30, 10)), isWin: false};
        }
        case ROTATE_PIPE:
            const {row, column} = action.payload
            let newBoard = state.board.map(v => [...v])
            const newPosition = (newBoard[row][column].position + 1) % 4
            newBoard[row][column].position = newPosition
            newBoard = calculateBoardPath(newBoard, pipes)
            const isWin = newBoard[newBoard.length - 1][newBoard[0].length - 1].active
            return {
                ...state,
                board: newBoard,
                isWin
            }
        default:
            return state
    }
}

export const boardActions = {
    generateBoard: () => ({
        type: GENERATE_BOARD,
    }),
    rotatePipe: (row, column) => ({
        type: ROTATE_PIPE, payload: {row, column}
    }),

}
