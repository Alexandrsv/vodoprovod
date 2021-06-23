const GENERATE_BOARD = 'board/GENERATE_BOARD'
const ROTATE_PIPE = 'board/ROTATE_PIPE'
const CALCULATE_PATH = 'board/CALCULATE_PATH'


const pipes = [
    {positions: ['─', '│', '─', '│',], flow: [0, 1, 0, 1]},
    {positions: ['┤', '┴', '├', '┬',], flow: [1, 0, 1, 1]},
    {positions: ['└', '┌', '┐', '┘',], flow: [1, 1, 0, 0]},
]

const X = 30
const Y = 10

function getNewBoard() {
    return Array(Y).fill('').map(() => Array(X).fill('').map(() => ({
        type: randInt(0, 2),
        position: randInt(0, 3),
        active: false,
    })))
}

const randInt = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1))

const initialState = {
    board: [[], []],
    pipes: pipes,

}


export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GENERATE_BOARD: {
            return {...state, board: getNewBoard()}
        }
        case ROTATE_PIPE:
            const newBoard = state.board.map(v => [...v])
            const newPosition = (newBoard[action.payload.row][action.payload.column].position + 1) % 4
            newBoard[action.payload.row][action.payload.column].position = newPosition

            const flow = [...pipes[newBoard[action.payload.row][action.payload.column].type].flow] //расчет актуального потока трубы по позиции
            for(let i=0; i<newPosition;i++){
                flow.unshift(flow.pop())
            }
            console.log(flow)

            return {
                ...state,
                board:newBoard,
            }
        case CALCULATE_PATH:
            const newBoard2 = state.board.map(v => [...v])
            newBoard2[0][0].active=true
            return {
                ...state,
                board:newBoard2,
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
    calculatePath: () => ({
        type: CALCULATE_PATH
    }),


}
