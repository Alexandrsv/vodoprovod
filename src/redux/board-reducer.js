import {calculateBoardPath, getActualFlow, getNewBoard} from "../utils/utils";

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

}


export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GENERATE_BOARD: {
            return {...state, board: calculateBoardPath(getNewBoard(30, 10))};
        }
        case ROTATE_PIPE:
            const {row,column} = action.payload
            const newBoard = state.board.map(v => [...v])
            const newPosition = (newBoard[row][column].position + 1) % 4
            newBoard[row][column].position = newPosition
            console.log(getActualFlow(newBoard[row][column]))
            return {
                ...state,
                board: calculateBoardPath(newBoard, pipes),
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
