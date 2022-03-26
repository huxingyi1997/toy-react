/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _toy_react_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toy-react.js */ \"./toy-react.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, \"prototype\", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\nvar MyComponent = /*#__PURE__*/function (_Component) {\n  _inherits(MyComponent, _Component);\n\n  var _super = _createSuper(MyComponent);\n\n  function MyComponent() {\n    var _this;\n\n    _classCallCheck(this, MyComponent);\n\n    // 执行Component的构造函数\n    _this = _super.call(this);\n    _this.state = {\n      a: 1,\n      b: 2\n    };\n    return _this;\n  }\n\n  _createClass(MyComponent, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      return (0,_toy_react_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", null, (0,_toy_react_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"h1\", null, \"my component\"), (0,_toy_react_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"button\", {\n        onClick: function onClick() {\n          _this2.state.a++;\n\n          _this2.rerender();\n        }\n      }, \"add\"), (0,_toy_react_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"span\", null, this.state.a.toString()), (0,_toy_react_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"span\", null, this.state.b.toString()), this.children);\n    }\n  }]);\n\n  return MyComponent;\n}(_toy_react_js__WEBPACK_IMPORTED_MODULE_0__.Component);\n\n(0,_toy_react_js__WEBPACK_IMPORTED_MODULE_0__.render)((0,_toy_react_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(MyComponent, {\n  id: \"a\",\n  \"class\": \"c\"\n}, (0,_toy_react_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", null, \"abc\"), (0,_toy_react_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", null), (0,_toy_react_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", null)), document.body);\n\n//# sourceURL=webpack://toy_react/./main.js?");

/***/ }),

/***/ "./toy-react.js":
/*!**********************!*\
  !*** ./toy-react.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => (/* binding */ Component),\n/* harmony export */   \"createElement\": () => (/* binding */ createElement),\n/* harmony export */   \"render\": () => (/* binding */ render)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n// 通过symbol定义方法名称，保证私有性\nvar RENDER_TO_DOM = Symbol(\"rendor to dom\");\n\nvar ElementWrapper = /*#__PURE__*/function () {\n  function ElementWrapper(type) {\n    _classCallCheck(this, ElementWrapper);\n\n    // 创建根元素\n    this.root = document.createElement(type);\n  } // 配置属性，支持事件绑定\n\n\n  _createClass(ElementWrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // 采用正则，判断name是否为on开头\n      if (name.match(/^on([\\s\\S]+)/)) {\n        // [\\s\\S] 表示全部字符 \\s为非空白，\\S为空白，两个集合互补\n        // 由于此处采用match，所以RegExp.$1将拿到匹配的字符，即on之后的部分\n        // RegExp.$1.replace(/^[\\s\\S]/, c => c.toLowerCase())\n        // 确保事件名小写，将第一个字母转换为小写\n        this.root.addEventListener(RegExp.$1.replace(/^[\\s\\S]/, function (c) {\n          return c.toLowerCase();\n        }), value);\n      }\n\n      this.root.setAttribute(name, value);\n    } // 添加子元素\n    // 添加的是component，所以要取出传入的component的root\n\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(component) {\n      // 在parentElement尾部增加range\n      var range = document.createRange(); // 将range的start节点设置为parentElement，offset为0，说明range将包含parentElement的全部children\n\n      range.setStart(this.root, this.root.childNodes.length); // 因为parentElement中会有文本节点和注释节点，所以offset不是parentElement.children.length\n\n      range.setEnd(this.root, this.root.childNodes.length);\n      component[RENDER_TO_DOM](range);\n    } // 增加[RENDER_TO_DOM]方法\n\n  }, {\n    key: RENDER_TO_DOM,\n    value: function value(range) {\n      // 首先从文档中移除 Range 包含的内容。\n      range.deleteContents(); // 再将root插入range，完成渲染\n\n      range.insertNode(this.root);\n    }\n  }]);\n\n  return ElementWrapper;\n}(); // 文本节点不需要设置属性及添加子元素\n\n\nvar TextWrapper = /*#__PURE__*/function () {\n  function TextWrapper(content) {\n    _classCallCheck(this, TextWrapper);\n\n    this.root = document.createTextNode(content);\n  } // 增加[RENDER_TO_DOM]方法\n\n\n  _createClass(TextWrapper, [{\n    key: RENDER_TO_DOM,\n    value: function value(range) {\n      // 首先从文档中移除 Range 包含的内容。\n      range.deleteContents(); // 再将root插入range，完成渲染\n\n      range.insertNode(this.root);\n    }\n  }]);\n\n  return TextWrapper;\n}();\n\nvar Component = /*#__PURE__*/function () {\n  function Component() {\n    _classCallCheck(this, Component);\n\n    // 不需要有什么行为\n    // 取到props\n    this.props = Object.create(null);\n    this.children = []; // 初始化root\n\n    this._root = null; // 初始化range\n\n    this._range = null;\n  } // 把Component的属性存起来\n\n\n  _createClass(Component, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this.props[name] = value;\n    } // 添加子元素\n\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(component) {\n      this.children.push(component);\n    } // 使用[]将Symbol作为函数名\n    // 传入的是range\n\n  }, {\n    key: RENDER_TO_DOM,\n    value: function value(range) {\n      this._range = range;\n      this.render()[RENDER_TO_DOM](range);\n    } // 定义重绘方法\n\n  }, {\n    key: \"rerender\",\n    value: function rerender() {\n      this._range.deleteContents();\n\n      this[RENDER_TO_DOM](this._range);\n    }\n  }]);\n\n  return Component;\n}();\nfunction createElement(tagType, attributes) {\n  var e;\n\n  if (typeof tagType === 'string') {\n    // 如果是小写的tagName，则生成ElementWrapper对象\n    e = new ElementWrapper(tagType);\n  } else {\n    // 如果是组件，则生成对应的组件对象\n    e = new tagType();\n  } // 增加属性\n\n\n  for (var p in attributes) {\n    // 调用元素的setAttribute方法\n    e.setAttribute(p, attributes[p]);\n  } // 增加子节点\n  // 扩展运算符将children包装为一个数组\n\n\n  var insertChildren = function insertChildren(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        // 将child创建为文本节点，如果child是文本节点\n        if (typeof child === 'string') {\n          child = new TextWrapper(child);\n        } // 当child是数组的时候，即component中的children，需要展开child\n\n\n        if (_typeof(child) === 'object' && child instanceof Array) {\n          // 递归调用\n          insertChildren(child);\n        } else {\n          // 调用元素的appendChild方法\n          e.appendChild(child);\n        }\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  insertChildren(children);\n  return e;\n}\nfunction render(component, parentElement) {\n  // 在parentElement尾部增加range\n  var range = document.createRange(); // 将range的start节点设置为parentElement，offset为0，说明range将包含parentElement的全部children\n\n  range.setStart(parentElement, 0); // 因为parentElement中会有文本节点和注释节点，所以offset不是parentElement.children.length\n\n  range.setEnd(parentElement, parentElement.childNodes.length); // 清空range\n\n  range.deleteContents(); // 调用[RENDER_TO_DOM]方法\n\n  component[RENDER_TO_DOM](range);\n}\n\n//# sourceURL=webpack://toy_react/./toy-react.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;