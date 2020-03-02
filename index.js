import React from 'react';
import ReactDOM from 'react-dom';
import '../../../../my-app/src/index.css';

class Square extends React.Component {
  render() {
    return (
        <button
            className="square"
            onClick={() => this.props.onClick()}
        >
          {this.props.value}
        </button>
    );
  }
}
function Square2(props) {
  return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
        <Square2
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
    );
  }
}
history = [
  // Before first move
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // After first move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // After second move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  //After third move
  {
    squares: [
      null, 'X', null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  //After forth move
  {
    squares: [
      null, 'X', null,
      null, 'X', 'O',
      null, null, 'O',
    ]
  },
  //After fifth move
  {
    squares: [
      null, 'X', null,
      null, 'X', 'O',
      null, 'X', 'O',
    ]
  },
]

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }
  render() {
    return (
        React.createElement("div", { className: "game" },
            React.createElement("div", { className: "game-board" },
                React.createElement(Board, null)),

            React.createElement("div", { className: "game-info" },
                React.createElement("div", null),
                React.createElement("ol", null))));



  }}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


ReactDOM.render(
    React.createElement(Game, null),
    document.getElementById('root'));