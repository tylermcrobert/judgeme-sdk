"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAverage = void 0;
var util_1 = require("../util");
exports.fetchAverage = function (_a) {
    var external_id = _a.external_id, shop_domain = _a.shop_domain;
    return fetch(util_1.apiLink("/api/v1/widgets/product_review", { external_id: external_id, shop_domain: shop_domain }))
        .then(function (res) { return res.json(); })
        .then(function (res) { return (res.widget ? parseAveragesFromWidget(res.widget) : null); });
};
/**
 * Parses JudgeMe widget HTML
 * @param widgetHtml Widget HTML
 */
function parseAveragesFromWidget(widgetHtml) {
    var doc = util_1.getHtml(widgetHtml);
    var histogram = Array.from(doc.querySelectorAll(".jdgm-histogram__row"))
        .map(function (item) { return ({
        rating: Number(item.getAttribute("data-rating")),
        frequency: Number(item.getAttribute("data-frequency")),
        percentage: Number(item.getAttribute("data-percentage")),
    }); })
        .filter(function (item) { return item.rating; });
    var averageRating = Number(util_1.getAttr(doc, "data-average-rating"));
    var numberOfReviews = Number(util_1.getAttr(doc, "data-number-of-reviews"));
    return {
        histogram: histogram,
        numberOfReviews: numberOfReviews,
        averageRating: averageRating,
    };
}
