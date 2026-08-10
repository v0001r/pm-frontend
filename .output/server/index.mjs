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
		"mtime": "2026-08-10T12:13:35.663Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-10T12:13:35.664Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/Match-C5iZhOv5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1118-kVL8RJJZFTqS0z0nuWHzLyjaWdM\"",
		"mtime": "2026-08-10T12:13:34.957Z",
		"size": 4376,
		"path": "../public/assets/Match-C5iZhOv5.js"
	},
	"/assets/admin.clients-mRqLhYET.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1392-zQ83PUQMcOsIxTYmjIlvBU/LQm8\"",
		"mtime": "2026-08-10T12:13:34.958Z",
		"size": 5010,
		"path": "../public/assets/admin.clients-mRqLhYET.js"
	},
	"/miraki-logo.png": {
		"type": "image/png",
		"etag": "\"2e69-0ykH9Wa8XGWYMBNUwe0AoMw++ZY\"",
		"mtime": "2026-08-10T12:13:35.664Z",
		"size": 11881,
		"path": "../public/miraki-logo.png"
	},
	"/assets/admin.customers._customerId.edit-Xgy8AJd9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"475-vIG2VLaZYoJBhdqxsD/Hmm30aYc\"",
		"mtime": "2026-08-10T12:13:34.963Z",
		"size": 1141,
		"path": "../public/assets/admin.customers._customerId.edit-Xgy8AJd9.js"
	},
	"/assets/activate-98ocCR2Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"859-0Gc3RIl0foR+r6+f/YhAqYFQAXU\"",
		"mtime": "2026-08-10T12:13:34.957Z",
		"size": 2137,
		"path": "../public/assets/activate-98ocCR2Y.js"
	},
	"/assets/admin.audit-Cx8IALqO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"815-4cRUP67owEjJYJYAYjQsvNNeAJ0\"",
		"mtime": "2026-08-10T12:13:34.958Z",
		"size": 2069,
		"path": "../public/assets/admin.audit-Cx8IALqO.js"
	},
	"/assets/admin.customers._customerId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T12:13:34.958Z",
		"size": 138,
		"path": "../public/assets/admin.customers._customerId-DY_mZ7yx.js"
	},
	"/assets/admin.customers.new-BLxQ0Xzp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37c-SoxYuSvFNc4VG7i/ErLO/Yi2DNQ\"",
		"mtime": "2026-08-10T12:13:34.963Z",
		"size": 892,
		"path": "../public/assets/admin.customers.new-BLxQ0Xzp.js"
	},
	"/assets/admin.dashboard-D4IgVUv-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-MtnMSRwN4ov9dGxbbanuCHrY7yY\"",
		"mtime": "2026-08-10T12:13:34.965Z",
		"size": 202,
		"path": "../public/assets/admin.dashboard-D4IgVUv-.js"
	},
	"/assets/admin.customers.index-QMm3BPUn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e2-d1d1RugT40uDp4/AhBXylgnBZy0\"",
		"mtime": "2026-08-10T12:13:34.963Z",
		"size": 4322,
		"path": "../public/assets/admin.customers.index-QMm3BPUn.js"
	},
	"/assets/admin.index-B4AYpglI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d1-JuFXXsz5EuhKtEHZJJKlstVJ45o\"",
		"mtime": "2026-08-10T12:13:34.968Z",
		"size": 6609,
		"path": "../public/assets/admin.index-B4AYpglI.js"
	},
	"/assets/admin.customers._customerId.index-BS6P3UvS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3757-vl7VqWkII3H9U/cI1fcuYiKQHdA\"",
		"mtime": "2026-08-10T12:13:34.963Z",
		"size": 14167,
		"path": "../public/assets/admin.customers._customerId.index-BS6P3UvS.js"
	},
	"/assets/admin.notifications-NftY5Ni4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-3VrfsH3UbPBFYpthvmbxfCMnXSE\"",
		"mtime": "2026-08-10T12:13:34.968Z",
		"size": 240,
		"path": "../public/assets/admin.notifications-NftY5Ni4.js"
	},
	"/assets/admin.projects._projectId.index-CbEXbnJw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"173-za5pyEeUzoLEnZN6Q3IfNOq9gWQ\"",
		"mtime": "2026-08-10T12:13:34.969Z",
		"size": 371,
		"path": "../public/assets/admin.projects._projectId.index-CbEXbnJw.js"
	},
	"/assets/admin.projects.index-DQ0Wm32m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14d8-JNYfvmR1NJqk6n+v8kqR+tcrNbs\"",
		"mtime": "2026-08-10T12:13:34.969Z",
		"size": 5336,
		"path": "../public/assets/admin.projects.index-DQ0Wm32m.js"
	},
	"/assets/admin.reports-BHmDaSQq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eeb-fK2vQZMtKQDOPgm99jW7SYkK+Ko\"",
		"mtime": "2026-08-10T12:13:34.971Z",
		"size": 3819,
		"path": "../public/assets/admin.reports-BHmDaSQq.js"
	},
	"/assets/admin.team-Ce4s9o0W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad9-e5XdH+0qCahb/CBQCTFaD68m+2Q\"",
		"mtime": "2026-08-10T12:13:34.971Z",
		"size": 2777,
		"path": "../public/assets/admin.team-Ce4s9o0W.js"
	},
	"/assets/admin.projects.new-BI8_EF0C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"263-1js2QVXScS/qnEIww13O4cQgCN4\"",
		"mtime": "2026-08-10T12:13:34.969Z",
		"size": 611,
		"path": "../public/assets/admin.projects.new-BI8_EF0C.js"
	},
	"/assets/admin.projects._projectId.edit-Cr-WVVxB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"587-Qf1eLVfba/zKlM6GOaRg7CGvE44\"",
		"mtime": "2026-08-10T12:13:34.969Z",
		"size": 1415,
		"path": "../public/assets/admin.projects._projectId.edit-Cr-WVVxB.js"
	},
	"/assets/admin.projects._projectId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T12:13:34.969Z",
		"size": 138,
		"path": "../public/assets/admin.projects._projectId-DY_mZ7yx.js"
	},
	"/assets/admin.tickets._ticketId-2AutxJxy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"171-m4vALzDBVdzKgANN7iISbpHYMvo\"",
		"mtime": "2026-08-10T12:13:34.972Z",
		"size": 369,
		"path": "../public/assets/admin.tickets._ticketId-2AutxJxy.js"
	},
	"/assets/admin.settings-BZtK6xNi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1474-rFG1jpGN7sAsCX31RBcDQm8csrs\"",
		"mtime": "2026-08-10T12:13:34.971Z",
		"size": 5236,
		"path": "../public/assets/admin.settings-BZtK6xNi.js"
	},
	"/assets/PieChart-DTgJYYTq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a988-Cc8quIEjELEuOntUlWnsHmVmjv8\"",
		"mtime": "2026-08-10T12:13:34.957Z",
		"size": 371080,
		"path": "../public/assets/PieChart-DTgJYYTq.js"
	},
	"/assets/admin.tickets.index-Djd05bQH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ad3-GdzzybtvIR/DF+CKKXqPWTZx5oc\"",
		"mtime": "2026-08-10T12:13:34.972Z",
		"size": 6867,
		"path": "../public/assets/admin.tickets.index-Djd05bQH.js"
	},
	"/assets/admin.tickets.new-xyY8G0Vz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191-+51ngdUlyegJe/vySrKCkxQ6yXQ\"",
		"mtime": "2026-08-10T12:13:34.974Z",
		"size": 401,
		"path": "../public/assets/admin.tickets.new-xyY8G0Vz.js"
	},
	"/assets/admin.users._userId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T12:13:34.975Z",
		"size": 138,
		"path": "../public/assets/admin.users._userId-DY_mZ7yx.js"
	},
	"/assets/admin.users._userId.edit-DMYP3UCg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"455-c4+2VBrxLDfhQx9OUx2GdJCgyS0\"",
		"mtime": "2026-08-10T12:13:34.975Z",
		"size": 1109,
		"path": "../public/assets/admin.users._userId.edit-DMYP3UCg.js"
	},
	"/assets/admin.users.index-Bqh4MNP6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15db-0Vsg6e7a/2lkrhhH319PNed6rNI\"",
		"mtime": "2026-08-10T12:13:34.976Z",
		"size": 5595,
		"path": "../public/assets/admin.users.index-Bqh4MNP6.js"
	},
	"/assets/alert-CpfBUclX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d9-y6ZeX+qoBrAQpCcArcf7w/MBZYk\"",
		"mtime": "2026-08-10T12:13:34.978Z",
		"size": 985,
		"path": "../public/assets/alert-CpfBUclX.js"
	},
	"/assets/admin.users.new-xaoxmnXt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"382-yGVEDz3zVcaCCse9LqKNZlOkMio\"",
		"mtime": "2026-08-10T12:13:34.978Z",
		"size": 898,
		"path": "../public/assets/admin.users.new-xaoxmnXt.js"
	},
	"/assets/button-DZcdxMSz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a96e-i3HQvEkYjAul6Kc41bdBV+grtIY\"",
		"mtime": "2026-08-10T12:13:34.981Z",
		"size": 108910,
		"path": "../public/assets/button-DZcdxMSz.js"
	},
	"/assets/arrow-left-CUFpx9I5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-Kj1fPFlbcrezUUQicx8TMp8i0lk\"",
		"mtime": "2026-08-10T12:13:34.980Z",
		"size": 155,
		"path": "../public/assets/arrow-left-CUFpx9I5.js"
	},
	"/assets/badge-urbeYOud.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"342-Nbj1UG4ytiY2ONaJNEcutoWFLwA\"",
		"mtime": "2026-08-10T12:13:34.981Z",
		"size": 834,
		"path": "../public/assets/badge-urbeYOud.js"
	},
	"/assets/admin.users._userId.index-BayJG5sF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c96-DEoT4A9+YDqQRsvA8pxwtZmYWkA\"",
		"mtime": "2026-08-10T12:13:34.976Z",
		"size": 7318,
		"path": "../public/assets/admin.users._userId.index-BayJG5sF.js"
	},
	"/assets/clock-3-Bfc92wZ1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-3s9RLY0lp7nHcxtXZcwj8Y16mzo\"",
		"mtime": "2026-08-10T12:13:34.982Z",
		"size": 159,
		"path": "../public/assets/clock-3-Bfc92wZ1.js"
	},
	"/assets/categories-mSmb2gKC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-Ciuhq6DijO4qXPWzGvTkWJh9JaI\"",
		"mtime": "2026-08-10T12:13:34.981Z",
		"size": 143,
		"path": "../public/assets/categories-mSmb2gKC.js"
	},
	"/assets/client.dashboard-qIYGmgCg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-8Jhb9gL6FGBqJARUya9b1Reoj4Q\"",
		"mtime": "2026-08-10T12:13:34.982Z",
		"size": 202,
		"path": "../public/assets/client.dashboard-qIYGmgCg.js"
	},
	"/assets/dist-DB0D2Skk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"219c-c29SJvZ8OdNCE8i5XWZB3ysqFus\"",
		"mtime": "2026-08-10T12:13:34.983Z",
		"size": 8604,
		"path": "../public/assets/dist-DB0D2Skk.js"
	},
	"/assets/dialog-B6A6IaXp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a5-/IshTOa+r1j6Hxw7EHumQMsoHAQ\"",
		"mtime": "2026-08-10T12:13:34.983Z",
		"size": 2469,
		"path": "../public/assets/dialog-B6A6IaXp.js"
	},
	"/assets/customer-form-RpReCQkc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110b-N3l68pCD/mIuBN4mTOjf8cDptxQ\"",
		"mtime": "2026-08-10T12:13:34.983Z",
		"size": 4363,
		"path": "../public/assets/customer-form-RpReCQkc.js"
	},
	"/assets/dist-BzAqGbeR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"997-ehEz4IpcH8ad5VBp/FNhxP1r1tU\"",
		"mtime": "2026-08-10T12:13:34.983Z",
		"size": 2455,
		"path": "../public/assets/dist-BzAqGbeR.js"
	},
	"/assets/create-ticket-form-CvuGVRCS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2c-EIJ8rmnRCOpD7ckMTbDdNlwv+k8\"",
		"mtime": "2026-08-10T12:13:34.982Z",
		"size": 6700,
		"path": "../public/assets/create-ticket-form-CvuGVRCS.js"
	},
	"/assets/forgot-password-B__oJayE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6c-Fj7f4Zpv97jOOcVy9fFsc4WH4gk\"",
		"mtime": "2026-08-10T12:13:34.983Z",
		"size": 2924,
		"path": "../public/assets/forgot-password-B__oJayE.js"
	},
	"/assets/form-actions-kW4G9Fe4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-dfe1BE5lVoGeJ7ZaLhthjb1uoFY\"",
		"mtime": "2026-08-10T12:13:34.983Z",
		"size": 465,
		"path": "../public/assets/form-actions-kW4G9Fe4.js"
	},
	"/assets/guard-woxs3yvE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9fea-7R7V4KrUtEufKoL6Y7bcmtagl2E\"",
		"mtime": "2026-08-10T12:13:34.984Z",
		"size": 40938,
		"path": "../public/assets/guard-woxs3yvE.js"
	},
	"/assets/eye-CB-zBs96.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-TTqOOwvRG7l6bHx7MtaAKcmclhA\"",
		"mtime": "2026-08-10T12:13:34.983Z",
		"size": 246,
		"path": "../public/assets/eye-CB-zBs96.js"
	},
	"/assets/change-password-gRPE7h2t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c0-Q15MIXm8CSYz+I5jNY43xKl7e0E\"",
		"mtime": "2026-08-10T12:13:34.982Z",
		"size": 2240,
		"path": "../public/assets/change-password-gRPE7h2t.js"
	},
	"/assets/form-validation-BlS6JgjE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e59d-w9harcnXUX/Dygt/JNemht78P8w\"",
		"mtime": "2026-08-10T12:13:34.984Z",
		"size": 58781,
		"path": "../public/assets/form-validation-BlS6JgjE.js"
	},
	"/assets/help-BqBGbybo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a82-+bBLvEyjAH6wsepqDp+30ENB/Ww\"",
		"mtime": "2026-08-10T12:13:34.984Z",
		"size": 6786,
		"path": "../public/assets/help-BqBGbybo.js"
	},
	"/assets/internal-users-COxULkQW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e6-7xgXORbCO0ihxkqr+6EbPsqoyQc\"",
		"mtime": "2026-08-10T12:13:34.984Z",
		"size": 1254,
		"path": "../public/assets/internal-users-COxULkQW.js"
	},
	"/assets/life-buoy-DF18raJ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"173-EF9lA5XwcZ6n9ShyeCsl4LrWuUg\"",
		"mtime": "2026-08-10T12:13:34.985Z",
		"size": 371,
		"path": "../public/assets/life-buoy-DF18raJ-.js"
	},
	"/assets/internal-user-form-CWw9BQEG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d9b-CH4Jz6FwDUwUZKxjwhxxZeGElp0\"",
		"mtime": "2026-08-10T12:13:34.984Z",
		"size": 7579,
		"path": "../public/assets/internal-user-form-CWw9BQEG.js"
	},
	"/assets/listing-page-DYNa5zc7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1395-wAFQe865ZelV9bMBW7Ry21AcvZY\"",
		"mtime": "2026-08-10T12:13:34.985Z",
		"size": 5013,
		"path": "../public/assets/listing-page-DYNa5zc7.js"
	},
	"/assets/input-DQ9rQj0w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f4-g8TRmfYk1EpxfzzADc4jmshcAfU\"",
		"mtime": "2026-08-10T12:13:34.984Z",
		"size": 756,
		"path": "../public/assets/input-DQ9rQj0w.js"
	},
	"/assets/matchContext-DTZFKhir.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-lpFtWSP7wkat+o/AZgvewty03oE\"",
		"mtime": "2026-08-10T12:13:34.985Z",
		"size": 139,
		"path": "../public/assets/matchContext-DTZFKhir.js"
	},
	"/assets/notifications-panel-FCJPqkew.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58b-yzimOEcrC65cWs0F3lmYQS37GNg\"",
		"mtime": "2026-08-10T12:13:34.985Z",
		"size": 1419,
		"path": "../public/assets/notifications-panel-FCJPqkew.js"
	},
	"/assets/org-BN32BdN7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"155-FLkGj/oCo+du2LyXN2pNsGqlflU\"",
		"mtime": "2026-08-10T12:13:34.985Z",
		"size": 341,
		"path": "../public/assets/org-BN32BdN7.js"
	},
	"/assets/label-aK6Wohke.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf-6MafJ8pjfptqGXQ3yNdRksgdrBM\"",
		"mtime": "2026-08-10T12:13:34.984Z",
		"size": 703,
		"path": "../public/assets/label-aK6Wohke.js"
	},
	"/assets/lock-TU4h0s3-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-IPjECCn4dBcvIqm3DMQoGWOpQK0\"",
		"mtime": "2026-08-10T12:13:34.985Z",
		"size": 196,
		"path": "../public/assets/lock-TU4h0s3-.js"
	},
	"/assets/paperclip-D-x5APLs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df-ILcqiSSi0tjf5arWdrh6FxKbBpE\"",
		"mtime": "2026-08-10T12:13:34.985Z",
		"size": 223,
		"path": "../public/assets/paperclip-D-x5APLs.js"
	},
	"/assets/index-DQ_ov_Bq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6d81c-Ysxi8/wGDJsJpSkBsHzY6/ApoF4\"",
		"mtime": "2026-08-10T12:13:34.957Z",
		"size": 448540,
		"path": "../public/assets/index-DQ_ov_Bq.js"
	},
	"/assets/portal.index-D023u8Ac.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93e-VYMQNm/P5pamTxNUeSDq/N2Qcss\"",
		"mtime": "2026-08-10T12:13:34.986Z",
		"size": 2366,
		"path": "../public/assets/portal.index-D023u8Ac.js"
	},
	"/assets/portal.notifications-BBeSid4A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-hy8YDUX/K3jfLVoAZXfUoi1uL30\"",
		"mtime": "2026-08-10T12:13:34.986Z",
		"size": 233,
		"path": "../public/assets/portal.notifications-BBeSid4A.js"
	},
	"/assets/portal.projects._projectId-JEO5PX2v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16d-cEyfVq6O6WBWYjxcXey9xCaTfOs\"",
		"mtime": "2026-08-10T12:13:34.986Z",
		"size": 365,
		"path": "../public/assets/portal.projects._projectId-JEO5PX2v.js"
	},
	"/assets/portal.projects.index-COCKybAO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bdc-qzz7kDMM04j3TS0X3db4c111E8o\"",
		"mtime": "2026-08-10T12:13:34.986Z",
		"size": 3036,
		"path": "../public/assets/portal.projects.index-COCKybAO.js"
	},
	"/assets/portal.tickets._ticketId-BQ7cky6l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16b-gCOe5466b9FSfMx1actgwRznCuY\"",
		"mtime": "2026-08-10T12:13:34.986Z",
		"size": 363,
		"path": "../public/assets/portal.tickets._ticketId-BQ7cky6l.js"
	},
	"/assets/pencil-ANNZgt_T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a-xPWq4Jvn5C6O+2Z5zq9uzzgOPkU\"",
		"mtime": "2026-08-10T12:13:34.986Z",
		"size": 266,
		"path": "../public/assets/pencil-ANNZgt_T.js"
	},
	"/assets/password-Dl8nlZ38.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4f-CFD9+Q2zEz3x9jslHIHazXEaWKo\"",
		"mtime": "2026-08-10T12:13:34.986Z",
		"size": 3151,
		"path": "../public/assets/password-Dl8nlZ38.js"
	},
	"/assets/portal.tickets.index-CyDlJ7Qk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"abe-z642/X+Pg/R62KAhgamrMn+rT2I\"",
		"mtime": "2026-08-10T12:13:34.987Z",
		"size": 2750,
		"path": "../public/assets/portal.tickets.index-CyDlJ7Qk.js"
	},
	"/assets/portal.tickets.new-Cjzx1MFF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b9-m6UoHbH484UXp/+ykRKY5r5rmmU\"",
		"mtime": "2026-08-10T12:13:34.987Z",
		"size": 441,
		"path": "../public/assets/portal.tickets.new-Cjzx1MFF.js"
	},
	"/assets/project-form-BudDhAQs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1649-t/y2OF4N3p46KmQfpUUnrtZcNEY\"",
		"mtime": "2026-08-10T12:13:34.987Z",
		"size": 5705,
		"path": "../public/assets/project-form-BudDhAQs.js"
	},
	"/assets/profile-DeHHd2g6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12db-irWprjM7nDSFAOpJFK/LymRpFQk\"",
		"mtime": "2026-08-10T12:13:34.987Z",
		"size": 4827,
		"path": "../public/assets/profile-DeHHd2g6.js"
	},
	"/assets/project-overview-DsRG_I7V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a71-y/HjUc6ORHboS1lHJIryLWeRoK0\"",
		"mtime": "2026-08-10T12:13:34.987Z",
		"size": 19057,
		"path": "../public/assets/project-overview-DsRG_I7V.js"
	},
	"/assets/reset-password-DM3_dgSX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d3-PVQ8dtfw34suQK0SdfcoCWubf34\"",
		"mtime": "2026-08-10T12:13:34.988Z",
		"size": 2515,
		"path": "../public/assets/reset-password-DM3_dgSX.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-10T12:13:34.988Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/projects-D6gGOWKx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"396-HjVXuPiny0KbeejaBCJFxE8le6c\"",
		"mtime": "2026-08-10T12:13:34.988Z",
		"size": 918,
		"path": "../public/assets/projects-D6gGOWKx.js"
	},
	"/assets/styles-DuNGUZEX.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1718b-XPyXSf821CCIjfzwrhtoYwqIVPU\"",
		"mtime": "2026-08-10T12:13:34.990Z",
		"size": 94603,
		"path": "../public/assets/styles-DuNGUZEX.css"
	},
	"/assets/switch-D3y1OOLY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10bd-k7EMuPDrP4AwNsfTMGmeqUkoI8A\"",
		"mtime": "2026-08-10T12:13:34.988Z",
		"size": 4285,
		"path": "../public/assets/switch-D3y1OOLY.js"
	},
	"/assets/staff.dashboard-C25C0tVG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-vfs4LJ5hyuWWqkTG3kJqU1PgIxY\"",
		"mtime": "2026-08-10T12:13:34.988Z",
		"size": 202,
		"path": "../public/assets/staff.dashboard-C25C0tVG.js"
	},
	"/assets/routes-B31bOKcd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2775-puyDigb1+T5+NRKICHGfFRT2JgQ\"",
		"mtime": "2026-08-10T12:13:34.988Z",
		"size": 10101,
		"path": "../public/assets/routes-B31bOKcd.js"
	},
	"/assets/store-BPQLz9DA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18503-baxi5TytWSku7iebIefzsyYVcRw\"",
		"mtime": "2026-08-10T12:13:34.988Z",
		"size": 99587,
		"path": "../public/assets/store-BPQLz9DA.js"
	},
	"/assets/tabs-05MYCqvH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1317-YfgJRQtvg8+Vdx7hhxRcnrv1ONs\"",
		"mtime": "2026-08-10T12:13:34.989Z",
		"size": 4887,
		"path": "../public/assets/tabs-05MYCqvH.js"
	},
	"/assets/textarea-CRMOtmsV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"239-vTmUj3JbKNsaThUJOvLePCux82o\"",
		"mtime": "2026-08-10T12:13:34.989Z",
		"size": 569,
		"path": "../public/assets/textarea-CRMOtmsV.js"
	},
	"/assets/useMutation-Dd1-ME0V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8cf-wgg028MDXGZhphk6utWcBiRIMKY\"",
		"mtime": "2026-08-10T12:13:34.989Z",
		"size": 2255,
		"path": "../public/assets/useMutation-Dd1-ME0V.js"
	},
	"/assets/ticket-workspace-Cac8qMlf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61a6-LoVxWk9sZVcxWIJUBG/ULC9WxQU\"",
		"mtime": "2026-08-10T12:13:34.989Z",
		"size": 24998,
		"path": "../public/assets/ticket-workspace-Cac8qMlf.js"
	},
	"/assets/unauthorized-Lvr7MiCh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ce-j2Vxyv4UmK1Arsm/ElgHiWeaABI\"",
		"mtime": "2026-08-10T12:13:34.989Z",
		"size": 1230,
		"path": "../public/assets/unauthorized-Lvr7MiCh.js"
	},
	"/assets/useStore-Bwb3bsWW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2997-tM3Bn2oYmzvLjMZgSfC/ZEWAcy0\"",
		"mtime": "2026-08-10T12:13:34.989Z",
		"size": 10647,
		"path": "../public/assets/useStore-Bwb3bsWW.js"
	},
	"/assets/user-D1zkh9es.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba-0g3sFap1HN85NdPb5sSxbzN/4gQ\"",
		"mtime": "2026-08-10T12:13:34.989Z",
		"size": 186,
		"path": "../public/assets/user-D1zkh9es.js"
	},
	"/assets/user-x-CtZpz3Tn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-Rd6cz/fAEWKC/IB3aOOjWaa+Y/U\"",
		"mtime": "2026-08-10T12:13:34.989Z",
		"size": 636,
		"path": "../public/assets/user-x-CtZpz3Tn.js"
	},
	"/assets/users-DeSJUzl9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb-93oaqe8Hbo9HNBDwIEcIK9Can2U\"",
		"mtime": "2026-08-10T12:13:34.990Z",
		"size": 235,
		"path": "../public/assets/users-DeSJUzl9.js"
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
