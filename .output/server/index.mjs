globalThis.__nitro_main__ = import.meta.url;
import { i as serve, r as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { a as toEventHandler, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-11T07:42:32.489Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-11T07:42:32.488Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/miraki-logo.png": {
		"type": "image/png",
		"etag": "\"2e69-0ykH9Wa8XGWYMBNUwe0AoMw++ZY\"",
		"mtime": "2026-08-11T07:42:32.489Z",
		"size": 11881,
		"path": "../public/miraki-logo.png"
	},
	"/assets/Match-C5iZhOv5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1118-kVL8RJJZFTqS0z0nuWHzLyjaWdM\"",
		"mtime": "2026-08-11T07:42:31.671Z",
		"size": 4376,
		"path": "../public/assets/Match-C5iZhOv5.js"
	},
	"/assets/admin.audit-BfnDbFUl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7fc-XwMw8Q3EuIcQNIS6ou/Vb9pupmg\"",
		"mtime": "2026-08-11T07:42:31.671Z",
		"size": 2044,
		"path": "../public/assets/admin.audit-BfnDbFUl.js"
	},
	"/assets/activate-BoIcCOFL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85c-m6xb35tKmW9a2ffV/PA++YHnkwo\"",
		"mtime": "2026-08-11T07:42:31.671Z",
		"size": 2140,
		"path": "../public/assets/activate-BoIcCOFL.js"
	},
	"/assets/admin.customers._customerId.edit-Cluq05x6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1da-CAyQ5PxK1wWBdjT7Z2ej0BovzDI\"",
		"mtime": "2026-08-11T07:42:31.671Z",
		"size": 474,
		"path": "../public/assets/admin.customers._customerId.edit-Cluq05x6.js"
	},
	"/assets/admin.customers._customerId.index-NnLX3MA4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d47-xRROWg6CaFUQ1F94PGeZrHZEpSU\"",
		"mtime": "2026-08-11T07:42:31.671Z",
		"size": 23879,
		"path": "../public/assets/admin.customers._customerId.index-NnLX3MA4.js"
	},
	"/assets/admin.customers.index-CFKgX1lC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"155f-xI1XbB2iaJy0fHvYikaS+wYMwD0\"",
		"mtime": "2026-08-11T07:42:31.672Z",
		"size": 5471,
		"path": "../public/assets/admin.customers.index-CFKgX1lC.js"
	},
	"/assets/admin.customers.new-US0f0X4-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17e-9Ajw89QeDoDK+WJylxGj2NGsIN4\"",
		"mtime": "2026-08-11T07:42:31.672Z",
		"size": 382,
		"path": "../public/assets/admin.customers.new-US0f0X4-.js"
	},
	"/assets/admin.dashboard-Civ_mhQs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-+rzGHoktr6PIisTkeBcWGBVArJU\"",
		"mtime": "2026-08-11T07:42:31.672Z",
		"size": 202,
		"path": "../public/assets/admin.dashboard-Civ_mhQs.js"
	},
	"/assets/admin.projects._projectId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-11T07:42:31.672Z",
		"size": 138,
		"path": "../public/assets/admin.projects._projectId-DY_mZ7yx.js"
	},
	"/assets/admin.notifications-zR9gUC6W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-78pulDvBVJM63n6aZMMoG9XmxcI\"",
		"mtime": "2026-08-11T07:42:31.672Z",
		"size": 240,
		"path": "../public/assets/admin.notifications-zR9gUC6W.js"
	},
	"/assets/admin.projects._projectId.edit-CK0S6Yqu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1db-VJuiR74z8HqAsaP0Kqc4+zKz62o\"",
		"mtime": "2026-08-11T07:42:31.673Z",
		"size": 475,
		"path": "../public/assets/admin.projects._projectId.edit-CK0S6Yqu.js"
	},
	"/assets/admin.clients-CFyOp6h9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"137b-8VT/23W/qeEHq5AspMOq4ZICojo\"",
		"mtime": "2026-08-11T07:42:31.671Z",
		"size": 4987,
		"path": "../public/assets/admin.clients-CFyOp6h9.js"
	},
	"/assets/admin.index-msGGUliC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2754-A+bkyfGr2anUy3nc/XpsdN1lh3Q\"",
		"mtime": "2026-08-11T07:42:31.672Z",
		"size": 10068,
		"path": "../public/assets/admin.index-msGGUliC.js"
	},
	"/assets/admin.projects.new-DhPYE04k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d-aa3Yc43biD3x8AYwVoYjwGswvAU\"",
		"mtime": "2026-08-11T07:42:31.673Z",
		"size": 381,
		"path": "../public/assets/admin.projects.new-DhPYE04k.js"
	},
	"/assets/admin.projects._projectId.index-C354A6dZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"263-5wey4vbLM58aIG0EW/8zUUyBqsY\"",
		"mtime": "2026-08-11T07:42:31.673Z",
		"size": 611,
		"path": "../public/assets/admin.projects._projectId.index-C354A6dZ.js"
	},
	"/assets/admin.projects.index-DaxB8Wwk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d5-GWJxw9NI4E+GTyaV4305G188bZE\"",
		"mtime": "2026-08-11T07:42:31.673Z",
		"size": 6357,
		"path": "../public/assets/admin.projects.index-DaxB8Wwk.js"
	},
	"/assets/admin.reports-DpiMv05j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7d44-knOZNLMDqhsP5xUUFsJ0RLUtpjk\"",
		"mtime": "2026-08-11T07:42:31.674Z",
		"size": 32068,
		"path": "../public/assets/admin.reports-DpiMv05j.js"
	},
	"/assets/admin.team-BVbrwpGM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae7-jW2r+4UT3xsah751aJIGqLU7qAQ\"",
		"mtime": "2026-08-11T07:42:31.674Z",
		"size": 2791,
		"path": "../public/assets/admin.team-BVbrwpGM.js"
	},
	"/assets/admin.tickets._ticketId-rJPq404w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"171-b+IcrPjIkM2/aYh+qtumRG6sXJA\"",
		"mtime": "2026-08-11T07:42:31.674Z",
		"size": 369,
		"path": "../public/assets/admin.tickets._ticketId-rJPq404w.js"
	},
	"/assets/admin.settings-DxmA_wPI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"314c-IekwDJGFsO+a0lUa7inPGcEkGyw\"",
		"mtime": "2026-08-11T07:42:31.674Z",
		"size": 12620,
		"path": "../public/assets/admin.settings-DxmA_wPI.js"
	},
	"/assets/admin.tickets.index-BTLPGsvS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a74-qKkx8Ig0vNeRjJ9hj2VfrNDAmyg\"",
		"mtime": "2026-08-11T07:42:31.675Z",
		"size": 6772,
		"path": "../public/assets/admin.tickets.index-BTLPGsvS.js"
	},
	"/assets/admin.customers._customerId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-11T07:42:31.671Z",
		"size": 138,
		"path": "../public/assets/admin.customers._customerId-DY_mZ7yx.js"
	},
	"/assets/admin.tickets.new-ClFTsPaz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c0-1lDgHwXB7j1zC76sLg5GXD4swOc\"",
		"mtime": "2026-08-11T07:42:31.675Z",
		"size": 448,
		"path": "../public/assets/admin.tickets.new-ClFTsPaz.js"
	},
	"/assets/admin.users._userId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-11T07:42:31.675Z",
		"size": 138,
		"path": "../public/assets/admin.users._userId-DY_mZ7yx.js"
	},
	"/assets/admin.users._userId.edit-yvmdTjub.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c7-wZYM+9CvCO7FBQykvyUmx1mkcOA\"",
		"mtime": "2026-08-11T07:42:31.675Z",
		"size": 455,
		"path": "../public/assets/admin.users._userId.edit-yvmdTjub.js"
	},
	"/assets/admin.users.new-D-UgmjST.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"172-ZCSHD1e4JTwDmnsoLblfozAsXPk\"",
		"mtime": "2026-08-11T07:42:31.675Z",
		"size": 370,
		"path": "../public/assets/admin.users.new-D-UgmjST.js"
	},
	"/assets/admin.users._userId.index-GE6oZcT3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3af3-QvS2DbvrYajok+nfn6y/wHDbC9g\"",
		"mtime": "2026-08-11T07:42:31.675Z",
		"size": 15091,
		"path": "../public/assets/admin.users._userId.index-GE6oZcT3.js"
	},
	"/assets/admin.users.index-BJE1egw4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1916-W0g9ujAypufQReGIjqAc5h2HgsQ\"",
		"mtime": "2026-08-11T07:42:31.675Z",
		"size": 6422,
		"path": "../public/assets/admin.users.index-BJE1egw4.js"
	},
	"/assets/badge-C4zrJUGz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"342-U37jznbBI8MDCL8P4VBDZBsCqts\"",
		"mtime": "2026-08-11T07:42:31.676Z",
		"size": 834,
		"path": "../public/assets/badge-C4zrJUGz.js"
	},
	"/assets/alert-CRZc2gOq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e0-6YgNNrtRW3aBlxBLmu8iWG/uvP8\"",
		"mtime": "2026-08-11T07:42:31.675Z",
		"size": 992,
		"path": "../public/assets/alert-CRZc2gOq.js"
	},
	"/assets/arrow-left-d2doOh2h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-XAuJ1GktBppM6f6ZfSCigy0YAlU\"",
		"mtime": "2026-08-11T07:42:31.676Z",
		"size": 155,
		"path": "../public/assets/arrow-left-d2doOh2h.js"
	},
	"/assets/categories-twC8vvFJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-YvVbSXOdVbofa5jZjay6Zll3niQ\"",
		"mtime": "2026-08-11T07:42:31.676Z",
		"size": 143,
		"path": "../public/assets/categories-twC8vvFJ.js"
	},
	"/assets/button-BIUKS4mI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a96c-66+Y8D6x65xW+3oBIWO1WaUdOn8\"",
		"mtime": "2026-08-11T07:42:31.676Z",
		"size": 108908,
		"path": "../public/assets/button-BIUKS4mI.js"
	},
	"/assets/change-password-MNLB1rP8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c9-55uu+19pQZQSxpNnds59YfKL1uk\"",
		"mtime": "2026-08-11T07:42:31.676Z",
		"size": 2249,
		"path": "../public/assets/change-password-MNLB1rP8.js"
	},
	"/assets/client.dashboard-BfqV59by.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-wMBYjfbqWV5dXYHqKra9f5g8bEI\"",
		"mtime": "2026-08-11T07:42:31.676Z",
		"size": 202,
		"path": "../public/assets/client.dashboard-BfqV59by.js"
	},
	"/assets/create-ticket-form-CPxW5hm0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16d4-PpHKEDUCvj7ZOqBQRxlxZ3tak6Q\"",
		"mtime": "2026-08-11T07:42:31.676Z",
		"size": 5844,
		"path": "../public/assets/create-ticket-form-CPxW5hm0.js"
	},
	"/assets/customer-form-sheet-B_TfBCyc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165e-lGcQF2gLMBht/+qKO+K+83aEEbc\"",
		"mtime": "2026-08-11T07:42:31.676Z",
		"size": 5726,
		"path": "../public/assets/customer-form-sheet-B_TfBCyc.js"
	},
	"/assets/delete-entity-dialog-DBAzG5xl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a8-UBxqN+YA0f8v2v+sygqEDoGg6nE\"",
		"mtime": "2026-08-11T07:42:31.677Z",
		"size": 1192,
		"path": "../public/assets/delete-entity-dialog-DBAzG5xl.js"
	},
	"/assets/dist-DCTHnreb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99d-K/jYW4/nDiwlkpkaHjeWnNguwhc\"",
		"mtime": "2026-08-11T07:42:31.677Z",
		"size": 2461,
		"path": "../public/assets/dist-DCTHnreb.js"
	},
	"/assets/dialog-BJMyavUb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"850-aDwEdJKpTSiQXOZrVWdKRRz54Lg\"",
		"mtime": "2026-08-11T07:42:31.677Z",
		"size": 2128,
		"path": "../public/assets/dialog-BJMyavUb.js"
	},
	"/assets/eye-7zGBLW07.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-1UsPEPh0XJO1IYJf0V2QqWsq/4M\"",
		"mtime": "2026-08-11T07:42:31.677Z",
		"size": 246,
		"path": "../public/assets/eye-7zGBLW07.js"
	},
	"/assets/forgot-password-BPul9PoX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7d-wUtQMX1a0bXJX5XiQkI+ejqYRfg\"",
		"mtime": "2026-08-11T07:42:31.677Z",
		"size": 2941,
		"path": "../public/assets/forgot-password-BPul9PoX.js"
	},
	"/assets/file-upload-field-DNbDZ4h4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae3-MFpftnVEVE9bjDT1o9uhyEr2RPo\"",
		"mtime": "2026-08-11T07:42:31.677Z",
		"size": 2787,
		"path": "../public/assets/file-upload-field-DNbDZ4h4.js"
	},
	"/assets/form-sheet-CrYBnRxd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25c-9QwA5FMZeBSj1yMJfsrmnnp6Twc\"",
		"mtime": "2026-08-11T07:42:31.678Z",
		"size": 604,
		"path": "../public/assets/form-sheet-CrYBnRxd.js"
	},
	"/assets/form-actions-a6OoDTzl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-io/VPBnLsiiVzirxUqXFIGfjyaQ\"",
		"mtime": "2026-08-11T07:42:31.678Z",
		"size": 465,
		"path": "../public/assets/form-actions-a6OoDTzl.js"
	},
	"/assets/form-validation-DR03A00T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e59d-W42ANcPkC2iCCS4ezEwdfYgnI6I\"",
		"mtime": "2026-08-11T07:42:31.678Z",
		"size": 58781,
		"path": "../public/assets/form-validation-DR03A00T.js"
	},
	"/assets/generateCategoricalChart-Dtu0XN6k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"546ec-E1TUsxBJ3fCUp7GjBViABoSwtsw\"",
		"mtime": "2026-08-11T07:42:31.678Z",
		"size": 345836,
		"path": "../public/assets/generateCategoricalChart-Dtu0XN6k.js"
	},
	"/assets/guard-CkNt8cSN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b01-kn5pk43oTWMHRK1wUYS7M/G6dIs\"",
		"mtime": "2026-08-11T07:42:31.678Z",
		"size": 35585,
		"path": "../public/assets/guard-CkNt8cSN.js"
	},
	"/assets/help-B6vfh_gX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a7b-IeJnwkLl+9RwxWWlgmnep2h67XU\"",
		"mtime": "2026-08-11T07:42:31.678Z",
		"size": 6779,
		"path": "../public/assets/help-B6vfh_gX.js"
	},
	"/assets/index-B3bGvi7-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"72a93-T8w5Vzib0N7mIqQbjOeRvkbYFMA\"",
		"mtime": "2026-08-11T07:42:31.670Z",
		"size": 469651,
		"path": "../public/assets/index-B3bGvi7-.js"
	},
	"/assets/internal-user-form-sheet-C7YwHLPW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20f4-33J8jr66XJxFnf8pNgAt2av+hAw\"",
		"mtime": "2026-08-11T07:42:31.678Z",
		"size": 8436,
		"path": "../public/assets/internal-user-form-sheet-C7YwHLPW.js"
	},
	"/assets/internal-users-DAjxsWyC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cd-fvnGfXIUZRvDb1c8ltEF74buscY\"",
		"mtime": "2026-08-11T07:42:31.679Z",
		"size": 1229,
		"path": "../public/assets/internal-users-DAjxsWyC.js"
	},
	"/assets/life-buoy--pOyDf-i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"173-JIOWPyHOapOncVkgoAKZ3Yr46E0\"",
		"mtime": "2026-08-11T07:42:31.679Z",
		"size": 371,
		"path": "../public/assets/life-buoy--pOyDf-i.js"
	},
	"/assets/lock-oAsWmvjG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-Q8ZsryKHMyhizFRBBfK0XldjRC0\"",
		"mtime": "2026-08-11T07:42:31.679Z",
		"size": 196,
		"path": "../public/assets/lock-oAsWmvjG.js"
	},
	"/assets/notifications-panel-DgN0usHP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"575-ohwkdPkOleub8JOQd0tr6pc6Izk\"",
		"mtime": "2026-08-11T07:42:31.679Z",
		"size": 1397,
		"path": "../public/assets/notifications-panel-DgN0usHP.js"
	},
	"/assets/mail-DOkyU1Ke.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb-z1dfpmyfM3Zsl0UnjWnHq3nAUXU\"",
		"mtime": "2026-08-11T07:42:31.679Z",
		"size": 203,
		"path": "../public/assets/mail-DOkyU1Ke.js"
	},
	"/assets/matchContext-DTZFKhir.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-lpFtWSP7wkat+o/AZgvewty03oE\"",
		"mtime": "2026-08-11T07:42:31.679Z",
		"size": 139,
		"path": "../public/assets/matchContext-DTZFKhir.js"
	},
	"/assets/password-BI3tSJKc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d78-logdsJmDoxAyaZIXKmaDY8P50h8\"",
		"mtime": "2026-08-11T07:42:31.680Z",
		"size": 3448,
		"path": "../public/assets/password-BI3tSJKc.js"
	},
	"/assets/portal.index-XKRIF7aO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"940-3j747g79OtAAe5u+92F330zKP6M\"",
		"mtime": "2026-08-11T07:42:31.680Z",
		"size": 2368,
		"path": "../public/assets/portal.index-XKRIF7aO.js"
	},
	"/assets/portal.notifications-vPby5SJv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-JPhhPPbsZo7deVX/DOqeJyPOm90\"",
		"mtime": "2026-08-11T07:42:31.680Z",
		"size": 233,
		"path": "../public/assets/portal.notifications-vPby5SJv.js"
	},
	"/assets/portal.projects._projectId-Cvff0lP2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16d-bdwpAP+EmlBCC9P4KPGbneAwXqA\"",
		"mtime": "2026-08-11T07:42:31.680Z",
		"size": 365,
		"path": "../public/assets/portal.projects._projectId-Cvff0lP2.js"
	},
	"/assets/portal.projects.index-CfiNRZk1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9a-zdho12gxfzF3drzGLs4nlQydTwA\"",
		"mtime": "2026-08-11T07:42:31.680Z",
		"size": 2970,
		"path": "../public/assets/portal.projects.index-CfiNRZk1.js"
	},
	"/assets/org-gZxG9wCP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"155-nUukElS/+l5MluXoVH2Vw/h53fc\"",
		"mtime": "2026-08-11T07:42:31.679Z",
		"size": 341,
		"path": "../public/assets/org-gZxG9wCP.js"
	},
	"/assets/portal.tickets._ticketId-BmQKTIgK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16b-y55xVxZEyvO7Qt2OH2ECkyvGA5A\"",
		"mtime": "2026-08-11T07:42:31.680Z",
		"size": 363,
		"path": "../public/assets/portal.tickets._ticketId-BmQKTIgK.js"
	},
	"/assets/portal.tickets.index-DXLBDxu_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a79-+TG0vjyCggD0GxRcnQEgusvTgtg\"",
		"mtime": "2026-08-11T07:42:31.680Z",
		"size": 2681,
		"path": "../public/assets/portal.tickets.index-DXLBDxu_.js"
	},
	"/assets/portal.tickets.new-C6pzW5-2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b9-ugZ1Vr9QDsFrMcxX66iFd07h7mI\"",
		"mtime": "2026-08-11T07:42:31.681Z",
		"size": 441,
		"path": "../public/assets/portal.tickets.new-C6pzW5-2.js"
	},
	"/assets/primitives-C5j5BySy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2564-d0jYwd/M9KtsKKK+7Gw8QjlMTgQ\"",
		"mtime": "2026-08-11T07:42:31.681Z",
		"size": 9572,
		"path": "../public/assets/primitives-C5j5BySy.js"
	},
	"/assets/profile-CrFMNhYf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12c4-UXWuc01FlWHfZb8y25pG01ts2a4\"",
		"mtime": "2026-08-11T07:42:31.681Z",
		"size": 4804,
		"path": "../public/assets/profile-CrFMNhYf.js"
	},
	"/assets/project-form-sheet-C36aLqLf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b1b-Fm4UlnKZYBwoBchKxvsnwAWS3NQ\"",
		"mtime": "2026-08-11T07:42:31.681Z",
		"size": 6939,
		"path": "../public/assets/project-form-sheet-C36aLqLf.js"
	},
	"/assets/reset-password-xMoMcAwo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9eb-UBOvP9GEJl1s8wffMzByWuOxOeY\"",
		"mtime": "2026-08-11T07:42:31.681Z",
		"size": 2539,
		"path": "../public/assets/reset-password-xMoMcAwo.js"
	},
	"/assets/project-overview-iOZq2cc-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4da1-P4AumwICqEcJgF9pBrnHqoW7Lgo\"",
		"mtime": "2026-08-11T07:42:31.681Z",
		"size": 19873,
		"path": "../public/assets/project-overview-iOZq2cc-.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-11T07:42:31.681Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/routes-C0lrxfRV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2777-Hf+7/g7GSoXu3uc869D2Nd5J/4c\"",
		"mtime": "2026-08-11T07:42:31.682Z",
		"size": 10103,
		"path": "../public/assets/routes-C0lrxfRV.js"
	},
	"/assets/select-DW_z73BP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56c2-nBHmYGHa5qRc5dzRmcPn2gU3nc4\"",
		"mtime": "2026-08-11T07:42:31.682Z",
		"size": 22210,
		"path": "../public/assets/select-DW_z73BP.js"
	},
	"/assets/staff.dashboard-C_y82x8g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-GxaNMQ154Vu3ataNxOIiweakzBA\"",
		"mtime": "2026-08-11T07:42:31.682Z",
		"size": 202,
		"path": "../public/assets/staff.dashboard-C_y82x8g.js"
	},
	"/assets/sla-CXpCC2Mf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"47a-ejQ/FjwswsBz294QhVf13V9apO8\"",
		"mtime": "2026-08-11T07:42:31.682Z",
		"size": 1146,
		"path": "../public/assets/sla-CXpCC2Mf.js"
	},
	"/assets/store-JKD42uVk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19a30-2BzFr6V0yCTxSH9Ptfehu+1vkp4\"",
		"mtime": "2026-08-11T07:42:31.682Z",
		"size": 105008,
		"path": "../public/assets/store-JKD42uVk.js"
	},
	"/assets/switch-B-N-wkop.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10be-H8fcan8HsI1ybsXSIJN+AwZ4z0g\"",
		"mtime": "2026-08-11T07:42:31.682Z",
		"size": 4286,
		"path": "../public/assets/switch-B-N-wkop.js"
	},
	"/assets/styles-DiJF6gbo.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"18353-4zKNas/DbOl2TNo0i0NSGH1a+Do\"",
		"mtime": "2026-08-11T07:42:31.684Z",
		"size": 99155,
		"path": "../public/assets/styles-DiJF6gbo.css"
	},
	"/assets/tabs-D6CvpEl1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"131d-3nUos5nsu3+oCJ/SFXikWvAm6VA\"",
		"mtime": "2026-08-11T07:42:31.683Z",
		"size": 4893,
		"path": "../public/assets/tabs-D6CvpEl1.js"
	},
	"/assets/textarea-DFWPmzjY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"234-wfWk3F+4bBZ1mIoUtTrTaHVDixI\"",
		"mtime": "2026-08-11T07:42:31.683Z",
		"size": 564,
		"path": "../public/assets/textarea-DFWPmzjY.js"
	},
	"/assets/ticket-workspace-C3OPNvaN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"638d-mZBGbT1yM0AnLkQKFbI7rMgyM84\"",
		"mtime": "2026-08-11T07:42:31.683Z",
		"size": 25485,
		"path": "../public/assets/ticket-workspace-C3OPNvaN.js"
	},
	"/assets/unauthorized-C6VtyE7R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ce-cxdbPIFG8KvrzIpTTq3kPVJ+qn4\"",
		"mtime": "2026-08-11T07:42:31.683Z",
		"size": 1230,
		"path": "../public/assets/unauthorized-C6VtyE7R.js"
	},
	"/assets/ticket-form-sheet-CDqlDocO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"240-haCJ060Hmrtb5iDBypGHbi+38Rw\"",
		"mtime": "2026-08-11T07:42:31.683Z",
		"size": 576,
		"path": "../public/assets/ticket-form-sheet-CDqlDocO.js"
	},
	"/assets/useMutation-CHXXJQI4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8cf-QA9ftx6VqssSyxE7XouzZFVUNbI\"",
		"mtime": "2026-08-11T07:42:31.683Z",
		"size": 2255,
		"path": "../public/assets/useMutation-CHXXJQI4.js"
	},
	"/assets/user-BYX11vyD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba-AekLtijFHc7Z06D9cY1HW3az5WU\"",
		"mtime": "2026-08-11T07:42:31.683Z",
		"size": 186,
		"path": "../public/assets/user-BYX11vyD.js"
	},
	"/assets/useStore-Bwb3bsWW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2997-tM3Bn2oYmzvLjMZgSfC/ZEWAcy0\"",
		"mtime": "2026-08-11T07:42:31.683Z",
		"size": 10647,
		"path": "../public/assets/useStore-Bwb3bsWW.js"
	},
	"/assets/user-x-CN6U-kuF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"273-ecGODwFMr8hzRXFWAz17TAZ3DOA\"",
		"mtime": "2026-08-11T07:42:31.683Z",
		"size": 627,
		"path": "../public/assets/user-x-CN6U-kuF.js"
	},
	"/assets/x-D3WnXbAx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-4IghokWUQX7LhW0eym58uIVdH1Y\"",
		"mtime": "2026-08-11T07:42:31.684Z",
		"size": 144,
		"path": "../public/assets/x-D3WnXbAx.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_ngAFbo = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_ngAFbo
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
