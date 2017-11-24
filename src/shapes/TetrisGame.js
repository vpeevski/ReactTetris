import React, {Component} from 'react';
import * as constants from "../constants/Constants"
import {TetrisBoard} from "./TetrisBoard";

class TetrisGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGameOver: false,
            scores: 0,
            isPaused: false,
            fields: this.initFields(),
            fallingElement: this.randomElement(),
            nextElement: this.randomElement(),
            elementX: constants.NUM_COLS / 2 - 2,
            elementY: 0
        };

        this.keyHandler = this.keyHandler.bind(this)
    }

    initFields() {
        let matrix = [];
        for (var i = 0; i < 20; i++) {
            let row = [];
            for (var j = 0; j < 10; j++) {
                row[j] = 0;
            }
            matrix[i] = row;
        }

        return matrix;
    }

    render() {
        const newFields = this.applyElementOnBoard(this.state.fields, this.state.fallingElement, this.state.elementX, this.state.elementY);
        return (
            <TetrisBoard
                fields={newFields}
                nextElement={this.state.nextElement}
                isGameOver={this.state.isGameOver}
                scores={this.state.scores}
                isPaused={this.state.isPaused}
            />
        );
    };

    //on component mount, add event listener and start game

    componentDidMount() {
        window.addEventListener('keydown', this.keyHandler);
        this.intervalHandler = setInterval(
            () => this.tick(),
            constants.TICK_MS
        );
    };

    tick() {
        if (this.state.isGameOver) {
            return false;
        }
        ;

        if (this.intersects(this.state.fields, this.state.fallingElement, this.state.elementY + 1, this.state.elementX)) {
            this.setState({
                elementY: 0,
                elementX: constants.NUM_COLS / 2 - 2,
                fields: this.applyElementOnBoard(this.state.fields, this.state.fallingElement, this.state.elementX, this.state.elementY),
                fallingElement: this.state.nextElement,
                nextElement: this.randomElement()
            });

            let newFields = this.killRows(this.state.fields);

            if (newFields.numRowsKilled) {
                this.setState((prevState, props) => ({
                    scores: prevState.scores += this.scoresByKilledRows(newFields.numRowsKilled),
                    fields: newFields.rows,
                }));
            }
            ;

            // check for Game Over
            if (this.intersects(this.state.fields, this.state.nextElement, 0, constants.NUM_COLS / 2 - 2)) {
                this.setState({
                    isGameOver: true,
                });
            }

        } else {
            this.setState({
                elementY: this.state.elementY + 1
            });
        }

    };

    //checks for intersection with sides, bottom
    intersects(rows, piece, y, x) {
        for (let i = 0; i < 4; i++)
            for (let j = 0; j < 4; j++)
                if (piece[i][j]) {
                    if (y + i >= 20 || x + j < 0 || x + j >= 10 || this.state.fields[y + i][x + j]) {
                        return true;
                    }
                }
        return false;
    };

    keyHandler(k) {
        if (k.shiftKey || k.altKey || k.metaKey)
            return;

        if (k.keyCode === constants.KEY_LEFT && !this.state.isPaused) {
            this.moveLeft();
            k.preventDefault();
        } else if (k.keyCode === constants.KEY_RIGHT && !this.state.isPaused) {
            this.moveRight();
            k.preventDefault();
        } else if (k.keyCode === constants.KEY_UP && !this.state.isPaused) {
            this.rotate();
            k.preventDefault();
        } else if (k.keyCode === constants.KEY_DOWN && !this.state.isPaused) {
            this.fallDown();
            k.preventDefault();
        } else if (k.keyCode === constants.KEY_SPACE && !this.state.isPaused) {
            this.reset();
        } else if (k.keyCode === constants.KEY_P) {
            this.pause();
        }
        else {
            return;
        }
    };


    randomElement() {
        return constants.pieces[Math.floor(Math.random() * constants.pieces.length)];
    }

    applyElementOnBoard(fields, element, x, y) {
        let newFields = this.fieldsCopy(fields);
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (element[row][col]) {
                    newFields[row + y][col + x] = element[row][col];
                }
            }
        }

        return newFields;
    }

    fieldsCopy(fields) {
        let newFields = [];
        for (let row = 0; row < 20; row++) {
            newFields[row] = fields[row].slice();
        }

        return newFields;
    }

    moveLeft() {
        if (!this.intersects(this.state.fields, this.state.fallingElement, this.state.elementY, this.state.elementX - 1)) {
            this.setState((prevState, props) => ({
                elementX: prevState.elementX -= 1
            }));
        }
        ;
    }

    moveRight() {
        if (!this.intersects(this.state.fields, this.state.fallingElement, this.state.elementY, this.state.elementX + 1)) {
            this.setState((prevState, props) => ({
                pieceX: prevState.elementX += 1
            }));
        }
        ;
    };

    rotate() {
        const newElement = this.rotateElement(this.state.fallingElement);
        if (!this.intersects(this.state.fields, newElement, this.state.elementY, this.state.elementX))
            this.setState({
                fallingElement: newElement,
            });
    };

    rotateElement(element) {
        return [
            [element[0][3], element[1][3], element[2][3], element[3][3]],
            [element[0][2], element[1][2], element[2][2], element[3][2]],
            [element[0][1], element[1][1], element[2][1], element[3][1]],
            [element[0][0], element[1][0], element[2][0], element[3][0]]
        ];
    };

    fallDown() {
        while (!this.intersects(this.state.fields, this.state.fallingElement, this.state.elementY + 1, this.state.elementX)) {
            this.setState((prevState, props) => ({
                pieceY: prevState.elementY += 1
            }));
        }
        ;
    };

    killRows(rows) {
        const newRows = [];
        let k = constants.NUM_ROWS;
        for (let i = constants.NUM_ROWS; i-- > 0;) {
            for (let j = 0; j < constants.NUM_COLS; j++) {
                if (!rows[i][j]) {
                    newRows[--k] = rows[i].slice();
                    break;
                }
            }
        }
        for (let i = 0; i < k; i++) {
            newRows[i] = [];
            for (let j = 0; j < constants.NUM_COLS; j++)
                newRows[i][j] = 0;
        }
        return {
            'rows': newRows,
            'numRowsKilled': k,
        };
    };

    reset() {
        this.setState({
            isGameOver: false,
            scores: 0,
            fields: this.initFields(),
            fallingElement: this.randomElement(),
            nextElement: this.randomElement(),
            elementX: constants.NUM_COLS / 2 - 2,
            elementY: 0
        });
        clearInterval(this.intervalHandler);
        this.componentDidMount();
    }

    pause() {
        this.setState({
            isPaused: !this.state.isPaused,
        });
        if (this.state.isPaused) {
            clearInterval(this.intervalHandler);
        } else {
            this.componentDidMount();
        }
    }

    scoresByKilledRows(rowsNum) {
        let points = 0;
        switch (rowsNum) {
            case 1: {
                points = 20;
                break;
            }
            case 2: {
                points = 60;
                break;
            }

            case 3: {
                points = 100;
                break;
            }

            case 4: {
                points = 200;
                break;
            }

            default: {
                points = 0;
            }
        }
        return points;
    }
}

export default TetrisGame;