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
		"mtime": "2026-08-10T09:27:13.994Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-10T09:27:13.994Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/Match-C5iZhOv5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1118-kVL8RJJZFTqS0z0nuWHzLyjaWdM\"",
		"mtime": "2026-08-10T09:27:13.250Z",
		"size": 4376,
		"path": "../public/assets/Match-C5iZhOv5.js"
	},
	"/assets/admin.audit-kuxfonsn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"819-j92L4ybyF2UO6uP46xTZ6bmoXgU\"",
		"mtime": "2026-08-10T09:27:13.251Z",
		"size": 2073,
		"path": "../public/assets/admin.audit-kuxfonsn.js"
	},
	"/assets/activate-xgtMRQka.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7db-hHzA+yC9IIz/v10GQ/9WyTCmlD4\"",
		"mtime": "2026-08-10T09:27:13.251Z",
		"size": 2011,
		"path": "../public/assets/activate-xgtMRQka.js"
	},
	"/assets/admin.customers._customerId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T09:27:13.251Z",
		"size": 138,
		"path": "../public/assets/admin.customers._customerId-DY_mZ7yx.js"
	},
	"/assets/admin.clients-Bic_dac5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1391-9vULpMKULlSgPSJO/I4k2mWI1Nc\"",
		"mtime": "2026-08-10T09:27:13.251Z",
		"size": 5009,
		"path": "../public/assets/admin.clients-Bic_dac5.js"
	},
	"/assets/admin.customers.new-B8T9Hc1g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"374-fu7Gsf4sB3xfSSqIK/MpJygFY3w\"",
		"mtime": "2026-08-10T09:27:13.252Z",
		"size": 884,
		"path": "../public/assets/admin.customers.new-B8T9Hc1g.js"
	},
	"/assets/admin.customers._customerId.index-DTmc3l38.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3461-oTIXocVO7eu5LHxmbSKokXrWPlQ\"",
		"mtime": "2026-08-10T09:27:13.252Z",
		"size": 13409,
		"path": "../public/assets/admin.customers._customerId.index-DTmc3l38.js"
	},
	"/assets/admin.customers.index-y7a83YmE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10bb-oJr0PsFSvOSb6ri7J2d3WFQxc9o\"",
		"mtime": "2026-08-10T09:27:13.252Z",
		"size": 4283,
		"path": "../public/assets/admin.customers.index-y7a83YmE.js"
	},
	"/assets/admin.dashboard-iIbhGVky.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-IKQvVowC+E/j8dv+BGxJ2zB1png\"",
		"mtime": "2026-08-10T09:27:13.252Z",
		"size": 202,
		"path": "../public/assets/admin.dashboard-iIbhGVky.js"
	},
	"/assets/admin.customers._customerId.edit-DwxWco0H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46d-X/cW2sg/xK7fVfiAIkLn6IDBzVo\"",
		"mtime": "2026-08-10T09:27:13.251Z",
		"size": 1133,
		"path": "../public/assets/admin.customers._customerId.edit-DwxWco0H.js"
	},
	"/assets/admin.projects._projectId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T09:27:13.253Z",
		"size": 138,
		"path": "../public/assets/admin.projects._projectId-DY_mZ7yx.js"
	},
	"/assets/admin.index-DLXapo7L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19c9-LvI1hMtTg5Nx9k1mTgtLLwrr5AQ\"",
		"mtime": "2026-08-10T09:27:13.252Z",
		"size": 6601,
		"path": "../public/assets/admin.index-DLXapo7L.js"
	},
	"/assets/admin.projects._projectId.members-bSEi3tvU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2679-+7IzI8AOdBkHe44Cd7HSJw/jeNw\"",
		"mtime": "2026-08-10T09:27:13.253Z",
		"size": 9849,
		"path": "../public/assets/admin.projects._projectId.members-bSEi3tvU.js"
	},
	"/assets/admin.projects._projectId.index-BXBDk7ay.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"436d-Wy4HDWvBFqK6SSF7Cj4B6BkHIgw\"",
		"mtime": "2026-08-10T09:27:13.253Z",
		"size": 17261,
		"path": "../public/assets/admin.projects._projectId.index-BXBDk7ay.js"
	},
	"/assets/admin.notifications-CcgiwLFQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-LktrqSN/pUfWGh9XMEC9BjEDzSI\"",
		"mtime": "2026-08-10T09:27:13.253Z",
		"size": 240,
		"path": "../public/assets/admin.notifications-CcgiwLFQ.js"
	},
	"/assets/admin.projects.index-IvKeBqci.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bcc-4mhTf8hrK2pZ+Hp1NF+FXxtkX10\"",
		"mtime": "2026-08-10T09:27:13.254Z",
		"size": 7116,
		"path": "../public/assets/admin.projects.index-IvKeBqci.js"
	},
	"/assets/admin.projects._projectId.edit-BV6M1gzQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"582-i9TAxzPGL5krPDxzwrKdgGfd5oQ\"",
		"mtime": "2026-08-10T09:27:13.253Z",
		"size": 1410,
		"path": "../public/assets/admin.projects._projectId.edit-BV6M1gzQ.js"
	},
	"/assets/PieChart-Byq1jzBN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a988-aXP5GOWhJF41k1axl2Aa9tfUmTA\"",
		"mtime": "2026-08-10T09:27:13.250Z",
		"size": 371080,
		"path": "../public/assets/PieChart-Byq1jzBN.js"
	},
	"/assets/admin.reports-B2qBK4Eq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e66-IyYEdBlv9xjE+5mX69u1RDdrR6E\"",
		"mtime": "2026-08-10T09:27:13.254Z",
		"size": 3686,
		"path": "../public/assets/admin.reports-B2qBK4Eq.js"
	},
	"/assets/admin.team-BstbJdKO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad8-qoOq+LaU6LwT988mdWomNh4CBH4\"",
		"mtime": "2026-08-10T09:27:13.254Z",
		"size": 2776,
		"path": "../public/assets/admin.team-BstbJdKO.js"
	},
	"/assets/admin.projects.new-Bgl2euWL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25b-msmkWXiirtTSi2XKsqfgnsNt1yQ\"",
		"mtime": "2026-08-10T09:27:13.254Z",
		"size": 603,
		"path": "../public/assets/admin.projects.new-Bgl2euWL.js"
	},
	"/assets/admin.settings-BLYqEKGo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1473-/dOia/piaPTTjvBz5sv/t90V1ug\"",
		"mtime": "2026-08-10T09:27:13.254Z",
		"size": 5235,
		"path": "../public/assets/admin.settings-BLYqEKGo.js"
	},
	"/assets/admin.tickets._ticketId-35xbsi92.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3407-l0UZiX+iNrWOuZBwa1ar6W4cbc4\"",
		"mtime": "2026-08-10T09:27:13.254Z",
		"size": 13319,
		"path": "../public/assets/admin.tickets._ticketId-35xbsi92.js"
	},
	"/assets/admin.tickets.index-Dh9s2cjJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2655-2C56pNJXBZRr5syz49oV55lslcE\"",
		"mtime": "2026-08-10T09:27:13.255Z",
		"size": 9813,
		"path": "../public/assets/admin.tickets.index-Dh9s2cjJ.js"
	},
	"/assets/admin.tickets.new-kgOSXg3L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191-mVWF7Lh+t6QOc7RphXnzU7jCWcE\"",
		"mtime": "2026-08-10T09:27:13.255Z",
		"size": 401,
		"path": "../public/assets/admin.tickets.new-kgOSXg3L.js"
	},
	"/assets/admin.users._userId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T09:27:13.255Z",
		"size": 138,
		"path": "../public/assets/admin.users._userId-DY_mZ7yx.js"
	},
	"/assets/admin.users._userId.index-CPpP1OT6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1952-J5IGtIel9VlQnOvamKOgaLoaEHY\"",
		"mtime": "2026-08-10T09:27:13.255Z",
		"size": 6482,
		"path": "../public/assets/admin.users._userId.index-CPpP1OT6.js"
	},
	"/assets/admin.users._userId.edit-BAAxzvWb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"455-RctTLw3v2uYI3ftm2+tJ/QyPjMw\"",
		"mtime": "2026-08-10T09:27:13.255Z",
		"size": 1109,
		"path": "../public/assets/admin.users._userId.edit-BAAxzvWb.js"
	},
	"/assets/admin.users.index-Bn8RI1Ks.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174f-gUv2Ufx2Hx9xhiVql6NJLstHJ+A\"",
		"mtime": "2026-08-10T09:27:13.255Z",
		"size": 5967,
		"path": "../public/assets/admin.users.index-Bn8RI1Ks.js"
	},
	"/assets/admin.users.new-DB9iEhER.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"382-wbT3Fjem5GAoPmqSfMr2lx146lE\"",
		"mtime": "2026-08-10T09:27:13.255Z",
		"size": 898,
		"path": "../public/assets/admin.users.new-DB9iEhER.js"
	},
	"/assets/alert-BBjKOMSo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d9-Xul5EpUqhjtJYa68o1a3nHBwtmA\"",
		"mtime": "2026-08-10T09:27:13.255Z",
		"size": 985,
		"path": "../public/assets/alert-BBjKOMSo.js"
	},
	"/assets/arrow-left-D7tmcEyV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-dBzhm6r/5a/Z5EWCiX+eCC+1Q2o\"",
		"mtime": "2026-08-10T09:27:13.256Z",
		"size": 155,
		"path": "../public/assets/arrow-left-D7tmcEyV.js"
	},
	"/assets/badge-DfRAgEn9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"302-BHB16RpSECxdm24XKDhCSGUG/Ug\"",
		"mtime": "2026-08-10T09:27:13.256Z",
		"size": 770,
		"path": "../public/assets/badge-DfRAgEn9.js"
	},
	"/assets/button-DUef3aWA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a9d2-ghhQ4aNKU+FY+NKpM+yxn6wZZ6A\"",
		"mtime": "2026-08-10T09:27:13.256Z",
		"size": 109010,
		"path": "../public/assets/button-DUef3aWA.js"
	},
	"/assets/categories-CF3_Q1ID.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-hTSVdHd5VzSr2MFYVy9gxYAB0pY\"",
		"mtime": "2026-08-10T09:27:13.256Z",
		"size": 143,
		"path": "../public/assets/categories-CF3_Q1ID.js"
	},
	"/assets/change-password-CTNI8APW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"803-TxWEf0G/ZoEnvbmufP+sLOGLOFU\"",
		"mtime": "2026-08-10T09:27:13.256Z",
		"size": 2051,
		"path": "../public/assets/change-password-CTNI8APW.js"
	},
	"/assets/checkbox-DSPZnAtE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1157-vlr9sRF3u+zB8+H2fACqPHpLvGM\"",
		"mtime": "2026-08-10T09:27:13.256Z",
		"size": 4439,
		"path": "../public/assets/checkbox-DSPZnAtE.js"
	},
	"/assets/client.dashboard-CNo809lB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-XIThAsmWKdgLJCPk/sVjvORiy4M\"",
		"mtime": "2026-08-10T09:27:13.257Z",
		"size": 202,
		"path": "../public/assets/client.dashboard-CNo809lB.js"
	},
	"/assets/create-ticket-form-Bx0nZfFV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19e2-b63OPuZoc6w3+Zelw8NkGwqG0eQ\"",
		"mtime": "2026-08-10T09:27:13.257Z",
		"size": 6626,
		"path": "../public/assets/create-ticket-form-Bx0nZfFV.js"
	},
	"/assets/clock-3-CBO62H3m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-0CEPvXKzSWXevVKeI39egM6x5LY\"",
		"mtime": "2026-08-10T09:27:13.257Z",
		"size": 159,
		"path": "../public/assets/clock-3-CBO62H3m.js"
	},
	"/assets/dialog-BD9KtoZW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"827-xxnHTYdO8wVGc7Hx+QCmp1T2FC8\"",
		"mtime": "2026-08-10T09:27:13.257Z",
		"size": 2087,
		"path": "../public/assets/dialog-BD9KtoZW.js"
	},
	"/assets/customer-form-BL1T2RIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa8-UeqH4jtvicdbpN0i+5h64H0sBqU\"",
		"mtime": "2026-08-10T09:27:13.257Z",
		"size": 4008,
		"path": "../public/assets/customer-form-BL1T2RIe.js"
	},
	"/assets/dist-Cp5Q8srC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"220f-Yl5/y05pN2fMxHb50aYruQszFrg\"",
		"mtime": "2026-08-10T09:27:13.257Z",
		"size": 8719,
		"path": "../public/assets/dist-Cp5Q8srC.js"
	},
	"/assets/ellipsis-BMPP5I76.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-YsVvW5wgyysgSn9xgNaKOXZ+6pM\"",
		"mtime": "2026-08-10T09:27:13.258Z",
		"size": 216,
		"path": "../public/assets/ellipsis-BMPP5I76.js"
	},
	"/assets/download-BXmGT1hP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de-ubERz759wwqGKBTNxNmtXU2pTSk\"",
		"mtime": "2026-08-10T09:27:13.258Z",
		"size": 222,
		"path": "../public/assets/download-BXmGT1hP.js"
	},
	"/assets/eye-off-BITBSLnZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a4-UDQAxrHEtiv3fX7/kIkRofPVOQY\"",
		"mtime": "2026-08-10T09:27:13.258Z",
		"size": 420,
		"path": "../public/assets/eye-off-BITBSLnZ.js"
	},
	"/assets/eye-EDhLQoTY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-6ArZX52q/yjbNF9UXQI9K9GSRzI\"",
		"mtime": "2026-08-10T09:27:13.258Z",
		"size": 246,
		"path": "../public/assets/eye-EDhLQoTY.js"
	},
	"/assets/forgot-password-crkY2t-L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"abf-n42QvuWJZhQaU+MCiqHPv41wTsA\"",
		"mtime": "2026-08-10T09:27:13.258Z",
		"size": 2751,
		"path": "../public/assets/forgot-password-crkY2t-L.js"
	},
	"/assets/form-actions-DkA6sc6B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-lMvyTjDHN6gTNbqa0H7aPKcvguI\"",
		"mtime": "2026-08-10T09:27:13.258Z",
		"size": 465,
		"path": "../public/assets/form-actions-DkA6sc6B.js"
	},
	"/assets/help-Do_2DcMY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22ee-8ll/roEMp05kqQ1I3GxltMz7HVU\"",
		"mtime": "2026-08-10T09:27:13.259Z",
		"size": 8942,
		"path": "../public/assets/help-Do_2DcMY.js"
	},
	"/assets/guard-BYh_ZhgI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102fa-ChnFTyimZc6tNCTw0MZ5jUby+js\"",
		"mtime": "2026-08-10T09:27:13.258Z",
		"size": 66298,
		"path": "../public/assets/guard-BYh_ZhgI.js"
	},
	"/assets/internal-user-form-Ch8jyyAA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c78-0OcNqdYw8YzXNm6wyajzbr/MUok\"",
		"mtime": "2026-08-10T09:27:13.259Z",
		"size": 7288,
		"path": "../public/assets/internal-user-form-Ch8jyyAA.js"
	},
	"/assets/internal-users-DuyZFNIm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e6-p92Mm0Hq3j9SLGDNWXaRKX+6oMQ\"",
		"mtime": "2026-08-10T09:27:13.259Z",
		"size": 1254,
		"path": "../public/assets/internal-users-DuyZFNIm.js"
	},
	"/assets/matchContext-DTZFKhir.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-lpFtWSP7wkat+o/AZgvewty03oE\"",
		"mtime": "2026-08-10T09:27:13.260Z",
		"size": 139,
		"path": "../public/assets/matchContext-DTZFKhir.js"
	},
	"/assets/lock-BkLcjD9e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-lTnryLj0s0pDbBPdCoHIKwFKVek\"",
		"mtime": "2026-08-10T09:27:13.259Z",
		"size": 196,
		"path": "../public/assets/lock-BkLcjD9e.js"
	},
	"/assets/paperclip-c1L3F90Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df-l49gla3IgRiymmGs9jit00Il2e4\"",
		"mtime": "2026-08-10T09:27:13.260Z",
		"size": 223,
		"path": "../public/assets/paperclip-c1L3F90Z.js"
	},
	"/assets/notifications-panel-Day-QFSi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58b-rXJ2CsCzu0HpAFpSIMq6hpKu5SM\"",
		"mtime": "2026-08-10T09:27:13.260Z",
		"size": 1419,
		"path": "../public/assets/notifications-panel-Day-QFSi.js"
	},
	"/assets/listing-page-D57NJncI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1229-RYstXzQY/PVdzEMi8qMsfCCnmxg\"",
		"mtime": "2026-08-10T09:27:13.259Z",
		"size": 4649,
		"path": "../public/assets/listing-page-D57NJncI.js"
	},
	"/assets/portal.index-Blo-ITQc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93c-kNz3sgagQFA9mCssmmdSau3geAw\"",
		"mtime": "2026-08-10T09:27:13.261Z",
		"size": 2364,
		"path": "../public/assets/portal.index-Blo-ITQc.js"
	},
	"/assets/org-DEm8oiTJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"155-7TTLPMs59AaAjTS82+/sJLht+iU\"",
		"mtime": "2026-08-10T09:27:13.260Z",
		"size": 341,
		"path": "../public/assets/org-DEm8oiTJ.js"
	},
	"/assets/password-DQWDPn_I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a7-6ht4cNXieHItiNsGzBH4E54UUrQ\"",
		"mtime": "2026-08-10T09:27:13.260Z",
		"size": 2215,
		"path": "../public/assets/password-DQWDPn_I.js"
	},
	"/assets/pencil-B4MdH8kJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a-fNhVF1WLw6B+mzduxhthiaCptLM\"",
		"mtime": "2026-08-10T09:27:13.260Z",
		"size": 266,
		"path": "../public/assets/pencil-B4MdH8kJ.js"
	},
	"/assets/portal.projects._projectId-L3TTJVcu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1041-dPHZYehollYjT9ITNmAC+2ZBwRU\"",
		"mtime": "2026-08-10T09:27:13.261Z",
		"size": 4161,
		"path": "../public/assets/portal.projects._projectId-L3TTJVcu.js"
	},
	"/assets/portal.projects.index-BYIRY8UZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc8-GqJBGrXA0BUHOEsnwDc2hrb+7t8\"",
		"mtime": "2026-08-10T09:27:13.261Z",
		"size": 3016,
		"path": "../public/assets/portal.projects.index-BYIRY8UZ.js"
	},
	"/assets/portal.tickets._ticketId-BjxoqrGj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f15-ik38U4xTcAv8DIGyzH/J/vi0wkM\"",
		"mtime": "2026-08-10T09:27:13.262Z",
		"size": 7957,
		"path": "../public/assets/portal.tickets._ticketId-BjxoqrGj.js"
	},
	"/assets/portal.tickets.index-Cmd_O6jN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b0d-tOTKxQH6H7IMmH8HZx3L4PRgyWI\"",
		"mtime": "2026-08-10T09:27:13.262Z",
		"size": 2829,
		"path": "../public/assets/portal.tickets.index-Cmd_O6jN.js"
	},
	"/assets/input-Cq5wNHCy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a5-Obe1jOFZvLvUqylxrAZUtlHdX7g\"",
		"mtime": "2026-08-10T09:27:13.259Z",
		"size": 677,
		"path": "../public/assets/input-Cq5wNHCy.js"
	},
	"/assets/portal.tickets.new-CKpoVTlX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b9-ujBzhtnJ8aNcssJXseRvk9C0RnU\"",
		"mtime": "2026-08-10T09:27:13.262Z",
		"size": 441,
		"path": "../public/assets/portal.tickets.new-CKpoVTlX.js"
	},
	"/assets/index-MJVLClwU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6cf60-B7muBCwGmkPN7zWnu/vfNqI85uI\"",
		"mtime": "2026-08-10T09:27:13.249Z",
		"size": 446304,
		"path": "../public/assets/index-MJVLClwU.js"
	},
	"/assets/profile-CQNMEt99.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12d6-cURl1oDYeeyrRMM4jY+D5FY72Pk\"",
		"mtime": "2026-08-10T09:27:13.262Z",
		"size": 4822,
		"path": "../public/assets/profile-CQNMEt99.js"
	},
	"/assets/project-activity-1VXNWD6d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ff-aflQgYzKVR7KTkEqYXE4mNwg6cs\"",
		"mtime": "2026-08-10T09:27:13.262Z",
		"size": 1023,
		"path": "../public/assets/project-activity-1VXNWD6d.js"
	},
	"/assets/portal.notifications-BzK-O0vK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-Al2HDXNlbD/RqlMbgtgY7l3XX24\"",
		"mtime": "2026-08-10T09:27:13.261Z",
		"size": 233,
		"path": "../public/assets/portal.notifications-BzK-O0vK.js"
	},
	"/assets/label-B3bT_1wA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ab-jt8xwRHabZClLDcOnCCwLIQ9xnU\"",
		"mtime": "2026-08-10T09:27:13.259Z",
		"size": 683,
		"path": "../public/assets/label-B3bT_1wA.js"
	},
	"/assets/project-form-qu1-t7n5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165c-1QKnKsrGJYgMwzUu2sxDu0AvJiI\"",
		"mtime": "2026-08-10T09:27:13.262Z",
		"size": 5724,
		"path": "../public/assets/project-form-qu1-t7n5.js"
	},
	"/assets/reset-password-DBm-gjKU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f2-aho7OQDOek5bAo8DlIbW6/z9zCA\"",
		"mtime": "2026-08-10T09:27:13.262Z",
		"size": 2290,
		"path": "../public/assets/reset-password-DBm-gjKU.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-10T09:27:13.263Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/projects-8N1MRgtB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"396-OOCj9JmCfQdhLJzqvD7acOOI4DA\"",
		"mtime": "2026-08-10T09:27:13.262Z",
		"size": 918,
		"path": "../public/assets/projects-8N1MRgtB.js"
	},
	"/assets/separator-vUHq-ATL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"43e-DKSXpLH9Cc3W1jo00vtwIR81Dsc\"",
		"mtime": "2026-08-10T09:27:13.263Z",
		"size": 1086,
		"path": "../public/assets/separator-vUHq-ATL.js"
	},
	"/assets/staff.dashboard-DhU25kqL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-v9i8kJljFU0bV0NH5EvhcxwsOQw\"",
		"mtime": "2026-08-10T09:27:13.263Z",
		"size": 202,
		"path": "../public/assets/staff.dashboard-DhU25kqL.js"
	},
	"/assets/routes-WHl_Yu0q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17b1-mB5W7zIzT1apPc1lnAst6K9CGDg\"",
		"mtime": "2026-08-10T09:27:13.263Z",
		"size": 6065,
		"path": "../public/assets/routes-WHl_Yu0q.js"
	},
	"/assets/switch-Bg0iTGoC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10bd-u18XgvWgzlPJU4XPpLtfKrMAfns\"",
		"mtime": "2026-08-10T09:27:13.263Z",
		"size": 4285,
		"path": "../public/assets/switch-Bg0iTGoC.js"
	},
	"/assets/tabs-DUQ27T0e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1326-0Av4/0vj0VbqPkkDpqirHRjhZWw\"",
		"mtime": "2026-08-10T09:27:13.263Z",
		"size": 4902,
		"path": "../public/assets/tabs-DUQ27T0e.js"
	},
	"/assets/textarea-Dgo-N8Ju.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"205-Xw/PyIQ74NB0aSFUEAwbEh+Pfr8\"",
		"mtime": "2026-08-10T09:27:13.264Z",
		"size": 517,
		"path": "../public/assets/textarea-Dgo-N8Ju.js"
	},
	"/assets/styles-DppO7XVp.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1904b-In74QxnwyN4ygCNCrld42lRr/Qk\"",
		"mtime": "2026-08-10T09:27:13.265Z",
		"size": 102475,
		"path": "../public/assets/styles-DppO7XVp.css"
	},
	"/assets/unauthorized-BGSfoIKf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ce-mKI7bfs26S9lvF8xw1gbgzjkHuY\"",
		"mtime": "2026-08-10T09:27:13.264Z",
		"size": 1230,
		"path": "../public/assets/unauthorized-BGSfoIKf.js"
	},
	"/assets/store-0KY2vZri.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"126ee-kObMz6KGVuyF68XU+VPdt7Jj2gU\"",
		"mtime": "2026-08-10T09:27:13.263Z",
		"size": 75502,
		"path": "../public/assets/store-0KY2vZri.js"
	},
	"/assets/useStore-Bwb3bsWW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2997-tM3Bn2oYmzvLjMZgSfC/ZEWAcy0\"",
		"mtime": "2026-08-10T09:27:13.264Z",
		"size": 10647,
		"path": "../public/assets/useStore-Bwb3bsWW.js"
	},
	"/assets/user-x-C4lWjHPm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-k2xEgVraMa9CAhYzJciYAF6YSNM\"",
		"mtime": "2026-08-10T09:27:13.264Z",
		"size": 636,
		"path": "../public/assets/user-x-C4lWjHPm.js"
	},
	"/assets/users-DITKtAnl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"134-hgC4db1VixpBHnmZnX3QgoNChOY\"",
		"mtime": "2026-08-10T09:27:13.264Z",
		"size": 308,
		"path": "../public/assets/users-DITKtAnl.js"
	},
	"/assets/user-CrD1UucP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba-tHXjITm+uPYPcH0dznn4DR4vdT8\"",
		"mtime": "2026-08-10T09:27:13.264Z",
		"size": 186,
		"path": "../public/assets/user-CrD1UucP.js"
	},
	"/assets/useMutation-DvOnqgbK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8cf-Tf3KJzjlYy53+Ea0EKa7rKLXXv4\"",
		"mtime": "2026-08-10T09:27:13.264Z",
		"size": 2255,
		"path": "../public/assets/useMutation-DvOnqgbK.js"
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
