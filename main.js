import {createElement, Component, render} from './toy-react.js'

class MyComponent extends Component{
  constructor() {
    // 执行Component的构造函数
    super();
    this.state = {
      a: 1,
      b: 2
    }
  }
  render() {
    return <div>
      <h1>my component</h1>
      <button onClick={() => {
        this.state.a++;
        this.rerender();
      }}>add</button>
      <span>{this.state.a.toString()}</span>
      <span>{this.state.b.toString()}</span>
      {this.children}
    </div>
  }
}

render(<MyComponent id="a" class="c">
  <div>abc</div>
  <div></div>
  <div></div>
</MyComponent>, document.body);
