import { createElement, Component, render } from './toy-react.js'

// Square 组件渲染了一个单独的 <button>
class Square extends Component {
  // 添加一个构造函数，用来初始化 state
  // constructor(props) {
  //   // 每次你定义其子类的构造函数时，都需要调用 super 方法。因此，在所有含有构造函数的的 React 组件中，构造函数必须以 super(props) 开头。
  //   super(props);
  //   this.state = {
  //     value: null,
  //   };
  // }
  // 父组件引入后，Square组件不需要再保存游戏的 state

  render() {
    return (
      //   <button className="square" onClick={function() {alert('click'); }}>
      // 为了避免 this 造成的困扰，我们在这里使用箭头函数 来进行事件处理
      //   <button className="square" onClick={() => alert("click")}>
      // 次在组件中调用 setState 时，React 都会自动更新其子组件
      // <button className="square" onClick={() => this.setState({ value: "X" })}>
      // 接收父组件参数
      <button className="square" onClick={() => this.props.onClick()}>
        {/* 参数 */}
        {/* 原本是固定参数 */}
        {/* {this.props.value} */}
        {/* 改为变化参数 */}
        {/* {this.state.value} */}
        {/* 使用父组件参数 */}
        {this.props.value}
      </button>
    );
  }
}

// Board 组件渲染了 9 个方块
class Board extends Component {
  // 将Board中的数据转移至Game父组件
  // // 为 Board 组件添加构造函数，将 Board 组件的初始状态设置为长度为 9 的空值数组
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     // 将 “X” 默认设置为先手棋
  //     xIsNext: true,
  //   };
  // }

  // 移至Game组件
  // 点击事件
  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   // 当有玩家胜出时，或者某个 Square 已经被填充时，该函数不做任何处理直接返回
  //   if (calculateWinner(squares) || squares[i]) return;
  //   // 根据xIsNext判断
  //   squares[i] = this.state.xIsNext ? "X" : "O";
  //   this.setState({
  //     squares: squares,
  //     // 翻转xIsNext
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  renderSquare(i) {
    // return <Square />;
    // 增加参数，修改一下 Square 的点击事件监听函数
    return (
      <Square
        // value={this.state.squares[i]}
        // onClick={() => this.handleClick(i)}
        // 从 Game 组件中接收 squares 和 onClick 这两个 props。
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // 移到Game组件
    // // // 状态变化
    // // const status = "Next player: " +  (this.state.xIsNext ? "X" : "O");
    // // 计算胜者
    // const winner = calculateWinner(this.state.squares);
    // // 状态
    // let status;
    // // 判断是否获胜
    // if (winner) {
    //   status = '胜者：' + winner;
    // } else {
    //   status = "下一步: " +  (this.state.xIsNext ? "X" : "O");
    // }

    return (
      <div>
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

// Game 组件渲染了含有默认值的一个棋盘
class Game extends Component {
  // 点击事件
  handleClick(i) {
    // 历史,丢弃stepNumber后的数据
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // 当前状态
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // 当有玩家胜出时，或者某个 Square 已经被填充时，该函数不做任何处理直接返回
    if (calculateWinner(squares) || squares[i]) return;
    // 根据xIsNext判断
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      // squares: squares,
      // 更新时间步
      stepNumber: history.length,
      // 翻转xIsNext
      xIsNext: !this.state.xIsNext,
    });
  }

  // 更新状态 stepNumber
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  // 为 Game 组件添加构造函数，保存历史步骤列表
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      // 步数
      stepNumber: 0,
      // 将 “X” 默认设置为先手棋
      xIsNext: true,
    };
  }

  render() {
    // // 状态变化，从子组件提升到父组件
    // 历史
    const history = this.state.history;
    // 当前状态，将代码从始终根据最后一次移动渲染修改为根据当前 stepNumber 渲染
    const current = history[this.state.stepNumber];
    // 计算胜者
    const winner = calculateWinner(current.squares);

    // 历史步骤映射为代表按钮的 React 元素，然后可以展示出一个按钮的列表，点击这些按钮，可以“跳转”到对应的历史步骤。
    const moves = history.map((step, move) => {
      const desc = move ? "跳转至第" + move + "步" : "游戏重新开始";
      return (
        // 组件的 key 值并不需要在全局都保证唯一，只需要在当前的同一级元素之前保证唯一即可
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    // 状态
    let status;
    // 判断是否获胜
    if (winner) {
      status = "胜者：" + winner;
    } else {
      status = "下一步: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            // 绑定参数和事件
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

render(<Game />, document.getElementById("root"));

// 判断胜者
function calculateWinner(squares) {
  // 获胜的序号
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
    // 有人获胜
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
