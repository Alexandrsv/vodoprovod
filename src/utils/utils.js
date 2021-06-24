import {pipes} from "../redux/board-reducer";

export function getNewBoard(X, Y) {
    return Array(Y).fill('').map(() => Array(X).fill('').map(() => ({
        type: randInt(0, 2),
        position: randInt(0, 3),
        active: false,
    })))
}

export const getActualFlow = (pipe) => { // Получить актуальный поток для трубы в соответствии с положением
    const flow = [...pipes[pipe.type].flow];
    for (let i = 0; i < pipe.position; i++) {
        flow.unshift(flow.pop())
    }
    return flow
}
const getConnected = (board, coords) => { //Вернуть координаты законнекченных труб
    let coordsConnectedPipes = []
    const isConnected = (x1, y1, f1, x2, y2, f2) => {
        if (x2 < 0 || x2 > board[0].length - 1 || y2 < 0 || y2 > board.length - 1) return false
        return !!getActualFlow(board[y1][x1])[f1] && !!getActualFlow(board[y2][x2])[f2]
    }
    if (isConnected(coords.x, coords.y, 1, coords.x + 1, coords.y, 3)) {
        coordsConnectedPipes.push([coords.x + 1, coords.y])
    }
    if (isConnected(coords.x, coords.y, 3, coords.x - 1, coords.y, 1)) {
        coordsConnectedPipes.push([coords.x - 1, coords.y])
    }
    if (isConnected(coords.x, coords.y, 2, coords.x, coords.y + 1, 0)) {
        coordsConnectedPipes.push([coords.x, coords.y + 1])
    }
    if (isConnected(coords.x, coords.y, 0, coords.x, coords.y - 1, 2)) {
        coordsConnectedPipes.push([coords.x, coords.y - 1])
    }

    return coordsConnectedPipes
}
export const calculateBoardPath = (board) => {
    board = board.map(row => row.map(p => ({...p, active: false}))) //Убрать законнекченность со всех труб
    board[0][0].active = true
    let allConnectedCoords = [[0, 0]]
    let getAllConnectedCoords = (x, y) => {
        const coords = getConnected(board, {x: x, y: y})
        console.log('coords', coords)
        if (coords.length > 0) {
            coords.forEach(c => {
                if (!allConnectedCoords.some(value => value.join() === c.join())) {
                    allConnectedCoords.push(c)
                    console.log('c', c, allConnectedCoords)
                    getAllConnectedCoords(c[0], c[1])
                }
            })
        }
    }
    getAllConnectedCoords(0, 0)
    console.log('allConnectedCoords', allConnectedCoords)
    allConnectedCoords.forEach(coords => {
        board[coords[1]][coords[0]].active = true
    })
    return board
}
const randInt = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1))
