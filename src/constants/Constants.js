export const NUM_ROWS = 20 //num of rows
export const NUM_COLS = 10 //num of columns
export const TICK_MS = 800 //time between board updates
export const BLOCK_WIDTH = 30
export const BLOCK_HEIGHT = 30

//array of tetris pieces
export const pieces =
  [[[0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]], //square
   [[0, 0, 2, 0],
    [0, 0, 2, 0],
    [0, 0, 2, 0],
    [0, 0, 2, 0]], //bar
   [[0, 0, 3, 0],
    [0, 3, 3, 0],
    [0, 0, 3, 0],
    [0, 0, 0, 0]], //T piece
   [[0, 0, 0, 0],
    [0, 0, 4, 4],
    [0, 4, 4, 0],
    [0, 0, 0, 0]], //S piece
   [[0, 0, 0, 0],
    [0, 5, 5, 0],
    [0, 0, 5, 5],
    [0, 0, 0, 0]], //Z piece
   [[0, 0, 6, 0],
    [0, 0, 6, 0],
    [0, 6, 6, 0],
    [0, 0, 0, 0]], //J piece
   [[0, 7, 0, 0],
    [0, 7, 0, 0],
    [0, 7, 7, 0],
    [0, 0, 0, 0]]] //L piece

//mapping keys to keycodes
export const KEY_SPACE = 32
export const KEY_LEFT = 37
export const KEY_UP = 38
export const KEY_RIGHT = 39
export const KEY_DOWN = 40
export const KEY_P = 80