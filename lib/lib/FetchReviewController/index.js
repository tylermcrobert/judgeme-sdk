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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchReviewController = void 0;
var fetchReviews_1 = require("./fetchReviews");
var fetchAverage_1 = require("./fetchAverage");
var querystring_1 = require("querystring");
var FetchReviewController = /** @class */ (function () {
    function FetchReviewController(storeInfo) {
        this.options = storeInfo;
        this.averages = null;
    }
    /**
     * Fetches histogram averages
     */
    FetchReviewController.prototype.fetchReviewsAverage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var averages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.averages)
                            return [2 /*return*/, this.averages];
                        return [4 /*yield*/, fetchAverage_1.fetchAverage({
                                external_id: this.options.product_id,
                                shop_domain: this.options.shop_domain,
                            })];
                    case 1:
                        averages = _a.sent();
                        this.averages = averages;
                        return [2 /*return*/, averages];
                }
            });
        });
    };
    /**
     * Fetch Reviews
     */
    FetchReviewController.prototype.fetch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, averages, reviewData, combinedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = querystring_1.default.stringify(this.options);
                        return [4 /*yield*/, this.fetchReviewsAverage()];
                    case 1:
                        averages = _a.sent();
                        return [4 /*yield*/, fetchReviews_1.fetchReviews(query)];
                    case 2:
                        reviewData = _a.sent();
                        combinedData = { averages: averages, reviewData: reviewData };
                        return [2 /*return*/, combinedData];
                }
            });
        });
    };
    /**
     * Sort results
     * @param method Sorting method
     */
    FetchReviewController.prototype.sortBy = function (method) {
        var getSorting = function () {
            switch (method) {
                case "most-recent":
                    return {
                        sort_by: "",
                        sort_dir: "",
                    };
                case "highest-rating":
                    return {
                        sort_by: "rating",
                        sort_dir: "desc",
                    };
                case "lowest-rating":
                    return {
                        sort_by: "rating",
                        sort_dir: "asc",
                    };
                case "with-pictures":
                    return {
                        sort_by: "with_pictures",
                        sort_dir: "",
                    };
                case "pictures-first":
                    return {
                        sort_by: "pictures_first",
                        sort_dir: "",
                    };
                case "videos-first":
                    return {
                        sort_by: "videos_first",
                        sort_dir: "",
                    };
                case "most-helpful":
                    return {
                        sort_by: "most_helpful",
                        sort_dir: "",
                    };
                default:
                    return {
                        sort_by: "",
                        sort_dir: "",
                    };
            }
        };
        var sortOptions = getSorting();
        this.options = __assign(__assign({}, this.options), sortOptions);
        return this;
    };
    FetchReviewController.prototype.page = function (number) {
        this.options = __assign(__assign({}, this.options), { page: number });
        return this;
    };
    FetchReviewController.prototype.search = function (q) {
        this.options = __assign(__assign({}, this.options), { search: q || "" });
        return this;
    };
    FetchReviewController.prototype.perPage = function (num) {
        this.options = __assign(__assign({}, this.options), { per_page: num || this.options.per_page });
        return this;
    };
    return FetchReviewController;
}());
exports.FetchReviewController = FetchReviewController;
