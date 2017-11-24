import React from 'react';
import LeftPanel from "./LeftPanel";
import GamePanel from "./GamePanel";

import './Field.css'

export function TetrisBoard (props) {
    return (
        <div className="app">
                <LeftPanel
                    nextElement={props.nextElement}
                    isGameOver={props.isGameOver}
                    scores={props.scores}
                    isPaused={props.isPaused}
                />


            <div className="rightPanel">
                <GamePanel fields={props.fields}/>
            </div>
        </div>
    );
}