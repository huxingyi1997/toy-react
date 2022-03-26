// 通过symbol定义方法名称，保证私有性
const RENDER_TO_DOM = Symbol("rendor to dom");

class ElementWrapper {
  constructor(type) {
    // 创建根元素
    this.root = document.createElement(type);
  }
  // 配置属性，支持事件绑定
  setAttribute(name, value) {
    // 采用正则，判断name是否为on开头
    if (name.match(/^on([\s\S]+)/)) {
      // [\s\S] 表示全部字符 \s为非空白，\S为空白，两个集合互补
      // 由于此处采用match，所以RegExp.$1将拿到匹配的字符，即on之后的部分
      // RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase())
      // 确保事件名小写，将第一个字母转换为小写
      this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value);
    }
    this.root.setAttribute(name, value);
  }
  // 添加子元素
  // 添加的是component，所以要取出传入的component的root
  appendChild(component) {
    // 在parentElement尾部增加range
    let range = document.createRange();
    // 将range的start节点设置为parentElement，offset为0，说明range将包含parentElement的全部children
    range.setStart(this.root, this.root.childNodes.length);
    // 因为parentElement中会有文本节点和注释节点，所以offset不是parentElement.children.length
    range.setEnd(this.root, this.root.childNodes.length);
    component[RENDER_TO_DOM](range);
  }
  // 增加[RENDER_TO_DOM]方法
  [RENDER_TO_DOM](range) {
    // 首先从文档中移除 Range 包含的内容。
    range.deleteContents();
    // 再将root插入range，完成渲染
    range.insertNode(this.root);
  }
}
// 文本节点不需要设置属性及添加子元素
class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
  // 增加[RENDER_TO_DOM]方法
  [RENDER_TO_DOM](range) {
    // 首先从文档中移除 Range 包含的内容。
    range.deleteContents();
    // 再将root插入range，完成渲染
    range.insertNode(this.root);
  }
}

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
  // 使用[]将Symbol作为函数名
  // 传入的是range
  [RENDER_TO_DOM](range) {
    this._range = range;
    this.render()[RENDER_TO_DOM](range);
  }
  // 定义重绘方法
  rerender() {
    this._range.deleteContents();
    this[RENDER_TO_DOM](this._range);
  }
}

export function createElement(tagType, attributes, ...children) {
  let e;
  if (typeof tagType === 'string') {
    // 如果是小写的tagName，则生成ElementWrapper对象
    e = new ElementWrapper(tagType);
  } else {
    // 如果是组件，则生成对应的组件对象
    e = new tagType;
  }
  // 增加属性
  for (let p in attributes) {
    // 调用元素的setAttribute方法
    e.setAttribute(p, attributes[p]);
  }
  // 增加子节点
  // 扩展运算符将children包装为一个数组
  let insertChildren = (children) => {
    for (let child of children) {
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
        e.appendChild(child);
      }
    }
  }
  insertChildren(children);

  return e;
}

export function render(component, parentElement) {
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
