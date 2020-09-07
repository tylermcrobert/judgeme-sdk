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
exports.getDataFromHTML = exports.fetchReviews = void 0;
var util_1 = require("../util");
/**
 * Gets JS object based on HTML widget
 * @param doc parsed document
 */
var $ = function (querySelector, item) {
    return item.querySelector(querySelector);
};
exports.fetchReviews = function (query) {
    return fetch("https://judge.me/reviews/reviews_for_widget?" + query)
        .then(function (res) { return util_1.handleRes(res); })
        .then(function (res) { return ((res === null || res === void 0 ? void 0 : res.html) ? exports.getDataFromHTML(res.html) : null); });
};
exports.getDataFromHTML = function (html) {
    var doc = util_1.getHtml(html);
    console.log(doc);
    /** Meta */
    var $nextPage = doc.querySelector(".jdgm-paginate__next-page");
    var $lastPage = doc.querySelector(".jdgm-paginate__last-page");
    var meta = {
        lastPage: Number($lastPage === null || $lastPage === void 0 ? void 0 : $lastPage.getAttribute("data-page")) || null,
        nextPage: Number($nextPage === null || $nextPage === void 0 ? void 0 : $nextPage.getAttribute("data-page")) || null,
    };
    /** Reviews  */
    var reviews = Array.from(doc.querySelectorAll(".jdgm-rev")).map(getReviewFromDom);
    return __assign({ reviews: reviews }, meta);
};
var getReviewFromDom = function (reviewDOM) {
    var $body = $(".jdgm-rev__body", reviewDOM);
    var $title = $(".jdgm-rev__title", reviewDOM);
    var $date = $(".jdgm-rev__timestamp", reviewDOM);
    var $formItems = reviewDOM.querySelectorAll(".jdgm-rev__cf-ans");
    var customForm = Array.from($formItems).map(function (item) {
        var _a, _b;
        return ({
            title: ((_a = $(".jdgm-rev__cf-ans__title", item)) === null || _a === void 0 ? void 0 : _a.textContent) || "",
            value: ((_b = $(".jdgm-rev__cf-ans__value", item)) === null || _b === void 0 ? void 0 : _b.textContent) || "",
        });
    }) || [];
    return {
        isVerifiedBuyer: reviewDOM.getAttribute("data-verified-buyer") === "true",
        thumbsUp: Number(reviewDOM.getAttribute("data-thumb-up-count")),
        thumbsDown: Number(reviewDOM.getAttribute("data-thumb-down-count")),
        body: util_1.getText($body),
        title: util_1.getText($title),
        score: Number(util_1.getAttr(reviewDOM, "data-score")),
        date: $date ? $date.getAttribute("data-content") : "",
        imgUrls: Array.from(reviewDOM.querySelectorAll("img"))
            .map(function (imgNode) { return imgNode === null || imgNode === void 0 ? void 0 : imgNode.getAttribute("data-src"); })
            .filter(function (a) { return a; }),
        reviewer: {
            fullName: util_1.getAttr(reviewDOM, "data-fullname"),
            initial: util_1.getAttr(reviewDOM, "data-all-initials"),
            lastInitial: util_1.getAttr(reviewDOM, "data-last-initial"),
        },
        customForm: customForm,
    };
};
