import React, {Component} from 'react'
import * as types from '../constants/Constants'
import {flatten} from '../utils/helpers'
import {elemClassByValue} from "../utils/helpers"

import './Field.css'

//renders preview box of next piece
class TetrisPreview extends Component {
    render() {
        let nextElementFlattened = flatten(this.props.nextElement);
        return <div className="previewBoard">{nextElementFlattened.map((value, index) => {

            let position = {
                left: `${ types.BLOCK_HEIGHT * (index % 4) }px`,
                top: `${ types.BLOCK_WIDTH * Math.floor(index / 4) }px`
            };

            return <div className={"field " + elemClassByValue(value)} style={position} key={index}></div>
        })}</div>;
    }
}

export default TetrisPreview;
