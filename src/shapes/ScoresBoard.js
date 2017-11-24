import React from 'react'

//renders score component, plus PAUSED and GAME OVER flags
function ScoresBoard(props) {
  return (
    <div className="scoresPanel">
      <p>Score: {props.scores}</p>
      <p>{props.isPaused ? 'PAUSED' : ''}</p>
      <p>{props.isGameOver ? 'GAME OVER' : ''}</p>
    </div>
  );
}

export default ScoresBoard;