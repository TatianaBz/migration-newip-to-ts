/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/app/app.js":
/*!***********************************!*\
  !*** ./src/components/app/app.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _controller_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controller/controller */ "./src/components/controller/controller.js");
/* harmony import */ var _view_appView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/appView */ "./src/components/view/appView.js");


class App {
  constructor() {
    this.controller = new _controller_controller__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.view = new _view_appView__WEBPACK_IMPORTED_MODULE_1__.AppView();
  }
  start() {
    document.querySelector('.sources').addEventListener('click', e => this.controller.getNews(e, data => this.view.drawNews(data)));
    this.controller.getSources(data => this.view.drawSources(data));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/components/controller/appLoader.js":
/*!************************************************!*\
  !*** ./src/components/controller/appLoader.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader */ "./src/components/controller/loader.js");

class AppLoader extends _loader__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super("https://newsapi.org/v2/", {
      apiKey: "bdb9f59aef754244bedf2ddd480ebf85" // получите свой ключ https://newsapi.org/
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppLoader);

/***/ }),

/***/ "./src/components/controller/controller.js":
/*!*************************************************!*\
  !*** ./src/components/controller/controller.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _appLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appLoader */ "./src/components/controller/appLoader.js");

class AppController extends _appLoader__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getSources(callback) {
    super.getResp({
      endpoint: 'sources'
    }, callback);
  }
  getNews(e, callback) {
    let target = e.target;
    const newsContainer = e.currentTarget;
    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp({
            endpoint: 'everything',
            options: {
              sources: sourceId
            }
          }, callback);
        }
        return;
      }
      target = target.parentNode;
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppController);

/***/ }),

/***/ "./src/components/controller/loader.js":
/*!*********************************************!*\
  !*** ./src/components/controller/loader.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Loader {
  constructor(baseLink, options) {
    this.baseLink = baseLink;
    this.options = options;
  }
  getResp(_ref) {
    let {
      endpoint,
      options = {}
    } = _ref;
    let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {
      console.error('No callback for GET response');
    };
    this.load('GET', endpoint, callback, options);
  }
  errorHandler(res) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }
    return res;
  }
  makeUrl(options, endpoint) {
    const urlOptions = {
      ...this.options,
      ...options
    };
    let url = `${this.baseLink}${endpoint}?`;
    Object.keys(urlOptions).forEach(key => {
      url += `${key}=${urlOptions[key]}&`;
    });
    return url.slice(0, -1);
  }
  load(method, endpoint, callback) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    fetch(this.makeUrl(options, endpoint), {
      method
    }).then(this.errorHandler).then(res => res.json()).then(data => callback(data)).catch(err => console.error(err));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);

/***/ }),

/***/ "./src/components/view/appView.js":
/*!****************************************!*\
  !*** ./src/components/view/appView.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppView: () => (/* binding */ AppView),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _news_news__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./news/news */ "./src/components/view/news/news.js");
/* harmony import */ var _sources_sources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sources/sources */ "./src/components/view/sources/sources.js");


class AppView {
  constructor() {
    this.news = new _news_news__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.sources = new _sources_sources__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  drawNews(data) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }
  drawSources(data) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppView);

/***/ }),

/***/ "./src/components/view/news/news.js":
/*!******************************************!*\
  !*** ./src/components/view/news/news.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _news_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./news.css */ "./src/components/view/news/news.css");

class News {
  draw(data) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp');
    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true);
      if (idx % 2) newsClone.querySelector('.news__item').classList.add('alt');
      newsClone.querySelector('.news__meta-photo').style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      newsClone.querySelector('.news__meta-author').textContent = item.author || item.source.name;
      newsClone.querySelector('.news__meta-date').textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
      newsClone.querySelector('.news__description-title').textContent = item.title;
      newsClone.querySelector('.news__description-source').textContent = item.source.name;
      newsClone.querySelector('.news__description-content').textContent = item.description;
      newsClone.querySelector('.news__read-more a').setAttribute('href', item.url);
      fragment.append(newsClone);
    });
    document.querySelector('.news').innerHTML = '';
    document.querySelector('.news').appendChild(fragment);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (News);

/***/ }),

/***/ "./src/components/view/sources/sources.js":
/*!************************************************!*\
  !*** ./src/components/view/sources/sources.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sources_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sources.css */ "./src/components/view/sources/sources.css");

class Sources {
  draw(data) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp');
    data.forEach(item => {
      const sourceClone = sourceItemTemp.content.cloneNode(true);
      sourceClone.querySelector('.source__item-name').textContent = item.name;
      sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);
      fragment.append(sourceClone);
    });
    document.querySelector('.sources').append(fragment);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sources);

/***/ }),

/***/ "./src/components/view/news/news.css":
/*!*******************************************!*\
  !*** ./src/components/view/news/news.css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/view/sources/sources.css":
/*!*************************************************!*\
  !*** ./src/components/view/sources/sources.css ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/global.css":
/*!************************!*\
  !*** ./src/global.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_app_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/app/app */ "./src/components/app/app.js");
/* harmony import */ var _global_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.css */ "./src/global.css");


const app = new _components_app_app__WEBPACK_IMPORTED_MODULE_0__["default"]();
app.start();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map