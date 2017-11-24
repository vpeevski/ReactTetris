import React from 'react'

//renders control instructions
function TetrisUsage(props) {
  return (
    <div className="usagePanel">
      <table>
        <tbody>
        <tr><th>Arrows:</th><td>Move</td></tr>
          <tr><th>Space:</th><td>Restart</td></tr>
          <tr><th>p:</th><td>{props.isPaused ? "Resume" : "Pause"}</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default TetrisUsage;