// 通过symbol定义方法名称，保证私有性
const RENDER_TO_DOM = Symbol("rendor to dom");

export class Component {
  constructor() {
    // 不需要有什么行为
    // 取到props
    this.props = Object.create(null);
    this.children = [];
    // 初始化root
    this._root = null;
    // 初始化range
    this._range = null;
  }
  // 把Component的属性存起来
  setAttribute(name, value) {
    this.props[name] = value;
  }
  // 添加子元素
  appendChild(component) {
    this.children.push(component);
  }
  get vdom() {
    return this.render().vdom;
  }
  // 使用[]将Symbol作为函数名
  // 传入的是range
  [RENDER_TO_DOM](range) {
    // 保存range和vdom
    this._range = range;
    // 由于this.vdom是getter，所以会重新调用组件的render方法，返回新的vdom，实现vdom更新
    this._vdom = this.vdom;
    // 渲染旧的vdom
    this._vdom[RENDER_TO_DOM](range);
  }

  update() {
    // 更新为newNode
    let isSameNode = (oldNode, newNode) => {
      // type不同，则为不同节点
      if (oldNode.type !== newNode.type) {
        return false;
      }
      // props不同，则为不同节点
      for (let key in newNode.props) {
        // 属性值要相同
        if (newNode.props[key] !== oldNode.props[key]) {
          return false;
        }
      }
      // props的长度不相同，节点不相同
      if (Object.keys(oldNode.props).length !== Object.keys(newNode.props).length) {
        return false;
      }
      // 文本节点，比对content
      if (newNode.type === '#text') {
        if (newNode.content !== oldNode.content) {
          return false;
        }
      }
      return true;
    }
    // 更新为newNode
    let update = (oldNode, newNode) => {
      // type,props.children
      // #text content
      // 根节点不同，则全部重新渲染
      if (!isSameNode(oldNode, newNode)) {
        // 替换oldNode
        newNode[RENDER_TO_DOM](oldNode._range);
        return;
      }

      newNode._range = oldNode._range;
      // children的处理
      // 因为children属性是实体dom，所以我们要拿到vchildren
      let newChildren = newNode.vchildren;
      let oldChildren = oldNode.vchildren;

      if (!newChildren || !newChildren.length) {
        return;
      }

      // 记录oldChildren的尾部位置
      let tailRange = oldChildren[oldChildren.length - 1]._range;
      // 两个数组一起循环，所以不用 for of循环
      for (let i = 0; i < newChildren.length; i++) {
        let newChild = newChildren[i];
        let oldChild = oldChildren[i];
        if (i < oldChildren.length) {
          update(oldChild, newChild);
        } else {
          // 如果newChild比oldChild元素多，我们需要在newChild进行节点插入
          // 创建一个需要插入的range
          let range = document.createRange();
          range.setStart(tailRange.endContainer, tailRange.endOffset);
          range.setEnd(tailRange.endContainer, tailRange.endOffset);
          newChild[RENDER_TO_DOM](range);
          tailRange = range;
        }
      }
    }
    // 保存新的vdom
    let vdom = this.vdom;
    // 对比vdom
    update(this._vdom, vdom);
    // 重新赋值
    this._vdom = vdom;
  }
  // 定义重绘方法
  // rerender() {
  //   // 保存this._range
  //   let oldRange = this._range;
  //   // 新创建的range没有宽度，但会改变oldRange的宽度
  //   let range = document.createRange();
  //   // 新创建的range在this._range的start处
  //   range.setStart(oldRange.startContainer, oldRange.startOffset);
  //   range.setEnd(oldRange.startContainer, oldRange.startOffset);
  //   this[RENDER_TO_DOM](range);

  //   // 重设oldRange的start节点，跳过插入的range
  //   oldRange.setStart(range.endContainer, range.endOffset);
  //   // 清除oldRange的内容
  //   oldRange.deleteContents();
  // }
  // Component的setState方法
  setState(newState) {
    // state为null时的处理
    if (this.state === null || typeof this.state !== 'object') {
      this.state = newState;
      // this.rerender();
      this.update();
      return;
    }
    // 采用递归的方式访问state
    let merge = (oldState, newState) => {
      for (let key in newState) {
        if (oldState[key] === null || typeof oldState[key] !== 'object') {
          oldState[key] = newState[key];
        } else {
          // 如果oldSate的p属性为对象，那么就递归调用merge，实现深拷贝
          merge(oldState[key], newState[key]);
        }
      }
    }
    merge(this.state, newState);
    this.update();
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    super(type);
    this.type = type;
    // 创建根元素
    // 删除setAtrribute和appendChild方法之后
    // this.root = document.createElement(type);
  }
  // 基于VDOM操作，删除setAtrribute和appendChild方法
  // // 配置属性，支持事件绑定
  // setAttribute(name, value) {
  //   // 采用正则，判断name是否为on开头
  //   if (name.match(/^on([\s\S]+)/)) {
  //     // [\s\S] 表示全部字符 \s为非空白，\S为空白，两个集合互补
  //     // 由于此处采用match，所以RegExp.$1将拿到匹配的字符，即on之后的部分
  //     // RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase())
  //     // 确保事件名小写，将第一个字母转换为小写
  //     this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value);
  //   } else if (name === 'className') { // 配置属性
  //     this.root.setAttribute('class', value);
  //   } else {
  //     this.root.setAttribute(name, value);
  //   }
  // }
  // // 添加子元素
  // // 添加的是component，所以要取出传入的component的root
  // appendChild(component) {
  //   // 在parentElement尾部增加range
  //   let range = document.createRange();
  //   // 将range的start节点设置为parentElement，offset为0，说明range将包含parentElement的全部children
  //   range.setStart(this.root, this.root.childNodes.length);
  //   // 因为parentElement中会有文本节点和注释节点，所以offset不是parentElement.children.length
  //   range.setEnd(this.root, this.root.childNodes.length);
  //   component[RENDER_TO_DOM](range);
  // }
  get vdom() {
    this.vchildren = this.children.map(child => child.vdom);
    return this;
    // {
    //   type: this.type,
    //   props: this.props,
    //   // 拿到每个child的<vdom></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>
    //   children: this.children.map(child => child.vdom)
    // }
  }
  // 增加[RENDER_TO_DOM]方法
  [RENDER_TO_DOM](range) {
    this._range = range;
    // 通过replaceContent代替初始时range.deleteContents()
    // 首先从文档中移除 Range 包含的内容。
    // range.deleteContents();
    // 创建实体dom，root
    let root = document.createElement(this.type);
    // props内容抄写，setAttribute逻辑的实现
    for (let name in this.props) {
      let value = this.props[name];
      // 采用正则，判断name是否为on开头
      if (name.match(/^on([\s\S]+)/)) {
        // [\s\S] 表示全部字符 \s为非空白，\S为空白，两个集合互补
        // 由于此处采用match，所以RegExp.$1将拿到匹配的字符，即on之后的部分
        // RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase())
        // 确保事件名小写，将第一个字母转换为小写
        root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value);
      } else if (name === 'className') { // 配置属性
        root.setAttribute('class', value);
      } else {
        root.setAttribute(name, value);
      }
    }

    if (!this.vchildren)
      this.vchildren = this.children.map(child => child.vdom);
    // children的处理
    for (let child of this.vchildren) {
      // 在parentElement尾部增加range
      let childRange = document.createRange();
      // 将range的start节点设置为parentElement，offset为0，说明range将包含parentElement的全部children
      childRange.setStart(root, root.childNodes.length);
      // 因为parentElement中会有文本节点和注释节点，所以offset不是parentElement.children.length
      childRange.setEnd(root, root.childNodes.length);
      child[RENDER_TO_DOM](childRange);
    }
    // 完成root的挂载
    // 再将root插入range，完成渲染
    // 挂载 root
    // range.insertNode(root);
    replaceContent(range, root);
  }
}
// 文本节点不需要设置属性及添加子元素
class TextWrapper extends Component {
  constructor(content) {
    super(content);
    this.type = '#text';
    this.content = content;
    this.root = document.createTextNode(content);
  }
  get vdom() {
    return this;
    // {
    //   type: "#text",
    //   content: this.content
    // }
  }
  // 增加[RENDER_TO_DOM]方法
  [RENDER_TO_DOM](range) {
    this._range = range;
    let root = document.createTextNode(this.content);
    // 首先从文档中移除 Range 包含的内容。
    // range.deleteContents();
    // 再将root插入range，完成渲染
    // range.insertNode(this.root);
    replaceContent(range, root);
  }
}

function replaceContent(range, node) {
  // 将node插入range，此时node在range的最前位置
  range.insertNode(node);
  // range挪到node之后
  range.setStartAfter(node);
  // 清空range
  range.deleteContents();
  // 重设range的位置
  range.setStartBefore(node);
  range.setEndAfter(node);
}

export class ToyReact {
  static createElement(tagType, attributes, ...children) {
    let element;
    if (typeof tagType === 'string') {
      // 如果是小写的tagName，则生成ElementWrapper对象
      element = new ElementWrapper(tagType);
    } else {
      // 如果是组件，则生成对应的组件对象
      element = new tagType;
    }
    // 增加属性
    for (let name in attributes) {
      // 调用元素的setAttribute方法
      element.setAttribute(name, attributes[name]);
    }
    // 增加子节点
    // 扩展运算符将children包装为一个数组
    let insertChildren = (children) => {
      for (let child of children) {
        // 如果child为null，不做任何处理
        if (child === null) {
          continue;
        }
        // 将child创建为文本节点，如果child是文本节点
        if (typeof child === 'string') {
          child = new TextWrapper(child);
        }
        // 当child是数组的时候，即component中的children，需要展开child
        if (typeof child === 'object' && child instanceof Array) {
          // 递归调用
          insertChildren(child);
        } else {
          // 调用元素的appendChild方法
          element.appendChild(child);
        }
      }
    }
    insertChildren(children);
    return element;
  }

  static render(component, parentElement) {
    // 在parentElement尾部增加range
    let range = document.createRange();
    // 将range的start节点设置为parentElement，offset为0，说明range将包含parentElement的全部children
    range.setStart(parentElement, 0);
    // 因为parentElement中会有文本节点和注释节点，所以offset不是parentElement.children.length
    range.setEnd(parentElement, parentElement.childNodes.length);
    // 清空range
    range.deleteContents();
    // 调用[RENDER_TO_DOM]方法
    component[RENDER_TO_DOM](range);
  }
}
