"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getText = exports.getAttr = exports.getHtml = exports.handleRes = exports.apiLink = void 0;
var querystring_1 = require("querystring");
exports.apiLink = function (route, payload) {
    return "/api/reviews?" + querystring_1.default.stringify(__assign(__assign({}, payload), { route: route }));
};
/**
 * Handle Fetch response
 * @param res Response object
 */
exports.handleRes = function (res) {
    if (res.ok) {
        return res.json();
    }
    console.error(res.statusText);
    return null;
};
/**
 * Get Parsed HTML from HTML string
 * @param htmlStr Html String
 */
exports.getHtml = function (htmlStr) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlStr, 'text/html');
    return doc;
};
/**
 * Search for attribute and fetch its value
 * @param doc Source document or Element
 * @param attr Attribute to fetch
 */
exports.getAttr = function (doc, attr) {
    var node = doc.querySelector("[" + attr + "]");
    return node ? node.getAttribute(attr) : undefined;
};
/**
 * Extract text from unknown element
 * @param el Element to get text from
 */
exports.getText = function (el) { return (el ? el.textContent || '' : ''); };
