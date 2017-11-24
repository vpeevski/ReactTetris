import React, { Component } from 'react';
import TetrisGame from './shapes/TetrisGame'

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          left: 400,
          top: 0
      };
  };

  render() {
    return (
        <div >
            <TetrisGame  />
        </div>
      
    );
  }
}
 
export default App;