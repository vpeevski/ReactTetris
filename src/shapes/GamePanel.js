import React, { Component } from 'react';
import './Field.css'
import {flatten} from "../utils/helpers";
import * as constants from "../constants/Constants";
import {elemClassByValue} from "../utils/helpers"


class GamePanel extends Component {

    render() {
        let flattened = flatten(this.props.fields);
        return <div>{flattened.map( (value, index) => {
            return <div style={ {
                left : `${ constants.BLOCK_WIDTH * (index % constants.NUM_COLS) }px`,
                top : `${ constants.BLOCK_HEIGHT * Math.floor(index / constants.NUM_COLS) }px`,
            }} className={"field " + elemClassByValue(value)} key={index}/>
        })}</div>;
    }

}

export default GamePanel;