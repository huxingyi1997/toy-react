import {createElement, Component, render} from './toy-react.js'

class MyComponent extends Component{
  render() {
    return <div>
      <h1>myComponent</h1>
      {this.children}
    </div>
  }
}


render(<MyComponent id="a" class="c">
  <div>abc</div>
  <div></div>
  <div></div>
</MyComponent>, document.body);