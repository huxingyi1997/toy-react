"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElement = createElement;
exports.render = render;
exports.Component = void 0;

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// 通过symbol定义方法名称，保证私有性
var RENDER_TO_DOM = Symbol("rendor to dom");

var Component =
/*#__PURE__*/
function () {
  function Component() {
    _classCallCheck(this, Component);

    // 不需要有什么行为
    // 取到props
    this.props = Object.create(null);
    this.children = []; // 初始化root

    this._root = null; // 初始化range

    this._range = null;
  } // 把Component的属性存起来


  _createClass(Component, [{
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this.props[name] = value;
    } // 添加子元素

  }, {
    key: "appendChild",
    value: function appendChild(component) {
      this.children.push(component);
    }
  }, {
    key: RENDER_TO_DOM,
    // 使用[]将Symbol作为函数名
    // 传入的是range
    value: function value(range) {
      // 保存range和vdom
      this._range = range; // 由于this.vdom是getter，所以会重新调用组件的render方法，返回新的vdom，实现vdom更新

      this._vdom = this.vdom; // 渲染旧的vdom

      this._vdom[RENDER_TO_DOM](range);
    }
  }, {
    key: "update",
    value: function update() {
      // 更新为newNode
      var isSameNode = function isSameNode(oldNode, newNode) {
        // type不同，则为不同节点
        if (oldNode.type !== newNode.type) {
          return false;
        } // props不同，则为不同节点


        for (var name in newNode.props) {
          // 属性值要相同
          if (newNode.props[name] !== oldNode.props[name]) {
            return false;
          }
        } // props的长度不相同，节点不相同


        if (Object.keys(oldNode.props).length > Object.keys(newNode.props).length) {
          return false;
        } // 文本节点，比对content


        if (newNode.type === '#text') {
          if (newNode.content !== oldNode.content) {
            return false;
          }
        }

        return true;
      }; // 更新为newNode


      var update = function update(oldNode, newNode) {
        // type,props.children
        // #text content
        // 根节点不同，则全部重新渲染
        if (!isSameNode(oldNode, newNode)) {
          // 替换oldNode
          newNode[RENDER_TO_DOM][oldNode._range];
          return;
        }

        newNode._range = oldNode._range; // children的处理
        // 因为children属性是实体dom，所以我们要拿到vchildren

        var newChildren = newNode.vchildren;
        var oldChildren = oldNode.vchildren;

        if (!newChildren || !newChildren.length) {
          return;
        } // 记录oldChildren的尾部位置


        var tailRange = oldChildren[oldChildren.length - 1]._range; // 两个数组一起循环，所以不用 for of循环

        for (var i = 0; i < newChildren.length; i++) {
          var newChild = newChildren[i];
          var oldChild = oldChildren[i];

          if (i < oldChildren.length) {
            update(oldChild, newChild);
          } else {
            // 如果newChild比oldChild元素多，我们需要在newChild进行节点插入
            // 创建一个需要插入的range
            var range = document.createRange();
            range.setStart(tailRange.endContainer, tailRange.endOffset);
            range.setEnd(tailRange.endContainer, tailRange.endOffset);
            newChild[RENDER_TO_DOM](range);
            tailRange = range;
          }
        }
      }; // 保存新的vdom


      var vdom = this.vdom; // 对比vdom

      update(this._vdom, vdom); // 重新赋值

      this._vdom = vdom;
    } // 定义重绘方法
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

  }, {
    key: "setState",
    value: function setState(newState) {
      // state为null时的处理
      if (this.state === null || _typeof(this.state) !== 'object') {
        this.state = newState;
        this.rerender();
        return;
      } // 采用递归的方式访问state


      var merge = function merge(oldState, newState) {
        for (var p in newState) {
          if (oldState[p] === null || _typeof(oldState[p]) !== 'object') {
            oldState[p] = newState[p];
          } else {
            // 如果oldSate的p属性为对象，那么就递归调用merge，实现深拷贝
            merge(oldState[p], newState[p]);
          }
        }
      };

      merge(this.state, newState);
      this.update();
    }
  }, {
    key: "vdom",
    get: function get() {
      return this.render().vdom;
    }
  }]);

  return Component;
}();

exports.Component = Component;

var ElementWrapper =
/*#__PURE__*/
function (_Component) {
  _inherits(ElementWrapper, _Component);

  function ElementWrapper(type) {
    var _this;

    _classCallCheck(this, ElementWrapper);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ElementWrapper).call(this, type));
    _this.type = type; // 创建根元素
    // 删除setAtrribute和appendChild方法之后
    // this.root = document.createElement(type);

    return _this;
  } // 基于VDOM操作，删除setAtrribute和appendChild方法
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


  _createClass(ElementWrapper, [{
    key: RENDER_TO_DOM,
    // 增加[RENDER_TO_DOM]方法
    value: function value(range) {
      this._range = range; // 通过replaceContent代替初始时range.deleteContents()
      // 首先从文档中移除 Range 包含的内容。
      // range.deleteContents();
      // 创建实体dom，root

      var root = document.createElement(this.type); // props内容抄写，setAttribute逻辑的实现

      for (var name in this.props) {
        var value = this.props[name]; // 采用正则，判断name是否为on开头

        if (name.match(/^on([\s\S]+)/)) {
          // [\s\S] 表示全部字符 \s为非空白，\S为空白，两个集合互补
          // 由于此处采用match，所以RegExp.$1将拿到匹配的字符，即on之后的部分
          // RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase())
          // 确保事件名小写，将第一个字母转换为小写
          root.addEventListener(RegExp.$1.replace(/^[\s\S]/, function (c) {
            return c.toLowerCase();
          }), value);
        } else if (name === 'className') {
          // 配置属性
          root.setAttribute('class', value);
        } else {
          root.setAttribute(name, value);
        }
      }

      if (!this.vchildren) this.vchildren = this.children.map(function (child) {
        return child.vdom;
      }); // children的处理

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.vchildren[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;
          // 在parentElement尾部增加range
          var childRange = document.createRange(); // 将range的start节点设置为parentElement，offset为0，说明range将包含parentElement的全部children

          childRange.setStart(root, root.childNodes.length); // 因为parentElement中会有文本节点和注释节点，所以offset不是parentElement.children.length

          childRange.setEnd(root, root.childNodes.length);
          child[RENDER_TO_DOM](childRange);
        } // 完成root的挂载
        // 再将root插入range，完成渲染
        // 挂载 root
        // range.insertNode(root);

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      replaceContent(range, root);
    }
  }, {
    key: "vdom",
    get: function get() {
      this.vchildren = this.children.map(function (child) {
        return child.vdom;
      });
      return this; // {
      //   type: this.type,
      //   props: this.props,
      //   // 拿到每个child的<vdom></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>m></vdom>
      //   children: this.children.map(child => child.vdom)
      // }
    }
  }]);

  return ElementWrapper;
}(Component); // 文本节点不需要设置属性及添加子元素


var TextWrapper =
/*#__PURE__*/
function (_Component2) {
  _inherits(TextWrapper, _Component2);

  function TextWrapper(content) {
    var _this2;

    _classCallCheck(this, TextWrapper);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(TextWrapper).call(this, content));
    _this2.type = '#text';
    _this2.content = content; // this.root = document.createTextNode(content);

    return _this2;
  }

  _createClass(TextWrapper, [{
    key: RENDER_TO_DOM,
    // 增加[RENDER_TO_DOM]方法
    value: function value(range) {
      this._range = range;
      var root = document.createTextNode(this.content); // 首先从文档中移除 Range 包含的内容。
      // range.deleteContents();
      // 再将root插入range，完成渲染
      // range.insertNode(this.root);

      replaceContent(range, root);
    }
  }, {
    key: "vdom",
    get: function get() {
      return this; // {
      //   type: "#text",
      //   content: this.content
      // }
    }
  }]);

  return TextWrapper;
}(Component);

function replaceContent(range, node) {
  // 将node插入range，此时node在range的最前位置
  range.insertNode(node); // range挪到node之后

  range.setStartAfter(node); // 清空range

  range.deleteContents(); // 重设range的位置

  range.setStartBefore(node);
  range.setEndAfter(node);
}

function createElement(tagType, attributes) {
  var e;

  if (typeof tagType === 'string') {
    // 如果是小写的tagName，则生成ElementWrapper对象
    e = new ElementWrapper(tagType);
  } else {
    // 如果是组件，则生成对应的组件对象
    e = new tagType();
  } // 增加属性


  for (var p in attributes) {
    // 调用元素的setAttribute方法
    e.setAttribute(p, attributes[p]);
  } // 增加子节点
  // 扩展运算符将children包装为一个数组


  var insertChildren = function insertChildren(children) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var child = _step2.value;

        // 如果child为null，不做任何处理
        if (child === null) {
          continue;
        } // 将child创建为文本节点，如果child是文本节点


        if (typeof child === 'string') {
          child = new TextWrapper(child);
        } // 当child是数组的时候，即component中的children，需要展开child


        if (_typeof(child) === 'object' && child instanceof Array) {
          // 递归调用
          insertChildren(child);
        } else {
          // 调用元素的appendChild方法
          e.appendChild(child);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  };

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  insertChildren(children);
  return e;
}

function render(component, parentElement) {
  // 在parentElement尾部增加range
  var range = document.createRange(); // 将range的start节点设置为parentElement，offset为0，说明range将包含parentElement的全部children

  range.setStart(parentElement, 0); // 因为parentElement中会有文本节点和注释节点，所以offset不是parentElement.children.length

  range.setEnd(parentElement, parentElement.childNodes.length); // 清空range

  range.deleteContents(); // 调用[RENDER_TO_DOM]方法

  component[RENDER_TO_DOM](range);
}