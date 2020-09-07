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
exports.JudgeMeController = void 0;
var querystring_1 = require("querystring");
var FetchReviewController_1 = require("./lib/FetchReviewController");
var util_1 = require("./lib/util");
/**
 * Handles JudgeMe widget api
 */
var JudgeMeController = /** @class */ (function () {
    function JudgeMeController(storeInfo) {
        var _this = this;
        /**
         * All the ways reviews can be sorted
         */
        this.sortMethods = [
            { name: "Most Recent", key: "most-recent" },
            { name: "Highest Rating", key: "highest-rating" },
            { name: "Lowest Rating", key: "lowest-rating" },
            { name: "With Pictures", key: "with-pictures" },
            { name: "Pictures First", key: "pictures-first" },
            { name: "Videos First", key: "videos-first" },
            { name: "Most Helpful", key: "most-helpful" },
        ];
        this.product = function (id) { return new ProductController(_this, id); };
        this.storeInfo = storeInfo;
    }
    return JudgeMeController;
}());
exports.JudgeMeController = JudgeMeController;
var ProductController = /** @class */ (function () {
    function ProductController(judgeMe, id) {
        var _this = this;
        /**
         * Get a collection of reveiws
         * @param params Settings for review
         */
        this.getReviews = function () {
            return new FetchReviewController_1.FetchReviewController(__assign(__assign({ product_id: _this.id }, _this.judgeMe.storeInfo), { per_page: 5 }));
        };
        this.judgeMe = judgeMe;
        this.id = id;
    }
    /**
     * Get product review questions
     */
    ProductController.prototype.getReviewQuestions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, params;
            return __generator(this, function (_a) {
                url = "https://judge.me/api/cf_answers/form_data_for_widget?";
                params = {
                    url: this.judgeMe.storeInfo.shop_domain,
                    shop_domain: this.judgeMe.storeInfo.shop_domain,
                    platform: this.judgeMe.storeInfo.platform,
                    product_id: this.id,
                };
                return [2 /*return*/, fetch("" + url + querystring_1.default.stringify(params)).then(util_1.handleRes)];
            });
        });
    };
    ProductController.prototype.postReview = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = __assign(__assign({}, payload), { id: this.id, platform: this.judgeMe.storeInfo.platform, url: this.judgeMe.storeInfo.shop_domain });
                return [2 /*return*/, fetch("https://judge.me/api/v1/reviews?" + querystring_1.default.stringify(params), {
                        method: "POST",
                    }).then(util_1.handleRes)];
            });
        });
    };
    return ProductController;
}());
