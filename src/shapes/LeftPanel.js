import React from 'react';
import TetrisPreview from "./TetrisPreview";
import ScoresBoard from "./ScoresBoard"
import TetrisUsage from "./TetrisUsage"

import './Field.css'

export default function LeftPanel(props) {
    return (
        <div className="leftPanel">
            <TetrisPreview nextElement={props.nextElement}/>
            <ScoresBoard isGameOver={props.isGameOver} scores={props.scores}/>
            <TetrisUsage isPaused={props.isPaused}/>
        </div>
    );
}