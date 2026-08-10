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
		"mtime": "2026-08-10T10:59:04.566Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-10T10:59:04.566Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/activate-Bw8K3RS4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7db-j54mstwrAsTkasuTNs/p2kM3SFI\"",
		"mtime": "2026-08-10T10:59:03.838Z",
		"size": 2011,
		"path": "../public/assets/activate-Bw8K3RS4.js"
	},
	"/assets/PieChart-Byq1jzBN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a988-aXP5GOWhJF41k1axl2Aa9tfUmTA\"",
		"mtime": "2026-08-10T10:59:03.838Z",
		"size": 371080,
		"path": "../public/assets/PieChart-Byq1jzBN.js"
	},
	"/assets/Match-C5iZhOv5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1118-kVL8RJJZFTqS0z0nuWHzLyjaWdM\"",
		"mtime": "2026-08-10T10:59:03.838Z",
		"size": 4376,
		"path": "../public/assets/Match-C5iZhOv5.js"
	},
	"/assets/admin.audit-Bgv8AMJL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"81a-Pidhv5A4kk5ftuGy1ZXvwKZP8G8\"",
		"mtime": "2026-08-10T10:59:03.838Z",
		"size": 2074,
		"path": "../public/assets/admin.audit-Bgv8AMJL.js"
	},
	"/assets/admin.customers._customerId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T10:59:03.839Z",
		"size": 138,
		"path": "../public/assets/admin.customers._customerId-DY_mZ7yx.js"
	},
	"/assets/admin.clients-D9GbLetk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1392-153SDxWQ08LCvdawYy8hodpgqPE\"",
		"mtime": "2026-08-10T10:59:03.838Z",
		"size": 5010,
		"path": "../public/assets/admin.clients-D9GbLetk.js"
	},
	"/assets/admin.customers._customerId.index-5oSt1dDO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3440-12K7jMIXhwKTmJUTj7jUcugTB0E\"",
		"mtime": "2026-08-10T10:59:03.839Z",
		"size": 13376,
		"path": "../public/assets/admin.customers._customerId.index-5oSt1dDO.js"
	},
	"/assets/admin.customers._customerId.edit-C1SZ0k6E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46d-M77hQVcixOdBVFWguR7K0CIRXUo\"",
		"mtime": "2026-08-10T10:59:03.839Z",
		"size": 1133,
		"path": "../public/assets/admin.customers._customerId.edit-C1SZ0k6E.js"
	},
	"/assets/admin.dashboard-DM0Bsugz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-fF0k6MWUQ5tq0C4BRVdjukjsM9k\"",
		"mtime": "2026-08-10T10:59:03.840Z",
		"size": 202,
		"path": "../public/assets/admin.dashboard-DM0Bsugz.js"
	},
	"/assets/admin.customers.new-CVufZCcG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"374-XBWZC5zTyaQbQbkQMGUWtef/cPE\"",
		"mtime": "2026-08-10T10:59:03.839Z",
		"size": 884,
		"path": "../public/assets/admin.customers.new-CVufZCcG.js"
	},
	"/assets/admin.index-KOuPiCdw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19cb-jbs+5iZ5ORKfKfEQ5tjeKBGHYuA\"",
		"mtime": "2026-08-10T10:59:03.840Z",
		"size": 6603,
		"path": "../public/assets/admin.index-KOuPiCdw.js"
	},
	"/assets/admin.customers.index-DzzRh1Iu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e2-SN+MtFa/Gi/ANx2ddygvH545Gho\"",
		"mtime": "2026-08-10T10:59:03.839Z",
		"size": 4322,
		"path": "../public/assets/admin.customers.index-DzzRh1Iu.js"
	},
	"/assets/admin.projects._projectId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T10:59:03.840Z",
		"size": 138,
		"path": "../public/assets/admin.projects._projectId-DY_mZ7yx.js"
	},
	"/assets/admin.notifications-CPJZCL2L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-gDNrTITECkbr8COp9QmVU0U7LaY\"",
		"mtime": "2026-08-10T10:59:03.840Z",
		"size": 240,
		"path": "../public/assets/admin.notifications-CPJZCL2L.js"
	},
	"/assets/admin.projects._projectId.index-C8U6cRYy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4746-/ETzpEfaIuKgJsKTk8X/90RQcH0\"",
		"mtime": "2026-08-10T10:59:03.840Z",
		"size": 18246,
		"path": "../public/assets/admin.projects._projectId.index-C8U6cRYy.js"
	},
	"/assets/admin.projects._projectId.edit-BwGIMsHh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"582-gYD6VQ/Rglpx5ToUtwH7eRCtapA\"",
		"mtime": "2026-08-10T10:59:03.840Z",
		"size": 1410,
		"path": "../public/assets/admin.projects._projectId.edit-BwGIMsHh.js"
	},
	"/assets/admin.projects.index-CfRt9AXL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14d6-W3WjdujlEWFgI7MvaGXyQhLDtQs\"",
		"mtime": "2026-08-10T10:59:03.840Z",
		"size": 5334,
		"path": "../public/assets/admin.projects.index-CfRt9AXL.js"
	},
	"/assets/admin.reports-BJ-9bM2L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eeb-ECVByPyJvyawV22YRF5/tHi/xFY\"",
		"mtime": "2026-08-10T10:59:03.841Z",
		"size": 3819,
		"path": "../public/assets/admin.reports-BJ-9bM2L.js"
	},
	"/assets/admin.projects.new-BlfWAlvq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25b-9Es6TWNhwiJ3L60iu19zUk2Ab+k\"",
		"mtime": "2026-08-10T10:59:03.841Z",
		"size": 603,
		"path": "../public/assets/admin.projects.new-BlfWAlvq.js"
	},
	"/assets/admin.team-Ci2Cbsc4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad9-t3sCkV+uFF61ziuJ8CiJIpBvlG8\"",
		"mtime": "2026-08-10T10:59:03.841Z",
		"size": 2777,
		"path": "../public/assets/admin.team-Ci2Cbsc4.js"
	},
	"/assets/admin.settings-DZD8bZqA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1474-Tf13qXdmbcnlFioBi5BPuahGYMQ\"",
		"mtime": "2026-08-10T10:59:03.841Z",
		"size": 5236,
		"path": "../public/assets/admin.settings-DZD8bZqA.js"
	},
	"/assets/admin.tickets.index-X3Naf6O9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1afe-UP6dEqt6cmIhC4Vjr4fGM+1FAMc\"",
		"mtime": "2026-08-10T10:59:03.841Z",
		"size": 6910,
		"path": "../public/assets/admin.tickets.index-X3Naf6O9.js"
	},
	"/assets/admin.tickets._ticketId-02XdThe6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c14-Ykr21g8m0ZnfSyZMuWUA1In84BA\"",
		"mtime": "2026-08-10T10:59:03.841Z",
		"size": 23572,
		"path": "../public/assets/admin.tickets._ticketId-02XdThe6.js"
	},
	"/assets/admin.tickets.new-Dn5dR2nT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191-HjBOFRB4mH7nS5v32LkQfXhGu8o\"",
		"mtime": "2026-08-10T10:59:03.841Z",
		"size": 401,
		"path": "../public/assets/admin.tickets.new-Dn5dR2nT.js"
	},
	"/assets/admin.users._userId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T10:59:03.842Z",
		"size": 138,
		"path": "../public/assets/admin.users._userId-DY_mZ7yx.js"
	},
	"/assets/admin.users._userId.edit-ndUQCZnk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"455-447sNK6B2NhcLqoa6kNVwbTLX8o\"",
		"mtime": "2026-08-10T10:59:03.842Z",
		"size": 1109,
		"path": "../public/assets/admin.users._userId.edit-ndUQCZnk.js"
	},
	"/assets/admin.users.new-C_MSUN5L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"382-gF+R3ZNvFkSPLI5k03Uwusqhwd8\"",
		"mtime": "2026-08-10T10:59:03.842Z",
		"size": 898,
		"path": "../public/assets/admin.users.new-C_MSUN5L.js"
	},
	"/assets/alert-BBjKOMSo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d9-Xul5EpUqhjtJYa68o1a3nHBwtmA\"",
		"mtime": "2026-08-10T10:59:03.842Z",
		"size": 985,
		"path": "../public/assets/alert-BBjKOMSo.js"
	},
	"/assets/arrow-left-D7tmcEyV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-dBzhm6r/5a/Z5EWCiX+eCC+1Q2o\"",
		"mtime": "2026-08-10T10:59:03.842Z",
		"size": 155,
		"path": "../public/assets/arrow-left-D7tmcEyV.js"
	},
	"/assets/badge-DfRAgEn9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"302-BHB16RpSECxdm24XKDhCSGUG/Ug\"",
		"mtime": "2026-08-10T10:59:03.843Z",
		"size": 770,
		"path": "../public/assets/badge-DfRAgEn9.js"
	},
	"/assets/admin.users._userId.index-CZrM9glE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a79-/QvNbHiOPXz4aCmEY7xgCVQyfE0\"",
		"mtime": "2026-08-10T10:59:03.842Z",
		"size": 6777,
		"path": "../public/assets/admin.users._userId.index-CZrM9glE.js"
	},
	"/assets/categories-CF3_Q1ID.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-hTSVdHd5VzSr2MFYVy9gxYAB0pY\"",
		"mtime": "2026-08-10T10:59:03.843Z",
		"size": 143,
		"path": "../public/assets/categories-CF3_Q1ID.js"
	},
	"/assets/client.dashboard-CrsiiUQV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-u4AzhVr1/zeOq1v9N5qUhzxqZ9Q\"",
		"mtime": "2026-08-10T10:59:03.843Z",
		"size": 202,
		"path": "../public/assets/client.dashboard-CrsiiUQV.js"
	},
	"/assets/change-password-CPubrCcZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"803-6l4N0iObdGTe1186TeTYLKzHK04\"",
		"mtime": "2026-08-10T10:59:03.843Z",
		"size": 2051,
		"path": "../public/assets/change-password-CPubrCcZ.js"
	},
	"/assets/clock-3-CBO62H3m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-0CEPvXKzSWXevVKeI39egM6x5LY\"",
		"mtime": "2026-08-10T10:59:03.843Z",
		"size": 159,
		"path": "../public/assets/clock-3-CBO62H3m.js"
	},
	"/assets/create-ticket-form-Claa8bJz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2a-Yq5f3uTdQsVVYxTMM2kVAVFziws\"",
		"mtime": "2026-08-10T10:59:03.843Z",
		"size": 6698,
		"path": "../public/assets/create-ticket-form-Claa8bJz.js"
	},
	"/assets/customer-form-B4wBFbI-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa8-l9wSxbFZiNWu2fv8HITaqi90cHk\"",
		"mtime": "2026-08-10T10:59:03.844Z",
		"size": 4008,
		"path": "../public/assets/customer-form-B4wBFbI-.js"
	},
	"/assets/dialog-D6VtrlIy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"827-UE5oHLpIRpL/JKM4Vs72Ha6fcU0\"",
		"mtime": "2026-08-10T10:59:03.844Z",
		"size": 2087,
		"path": "../public/assets/dialog-D6VtrlIy.js"
	},
	"/assets/dist-C_wTk-qb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"997-AD2hPOzgL+QbCmJ/gz0ZtYrld/U\"",
		"mtime": "2026-08-10T10:59:03.844Z",
		"size": 2455,
		"path": "../public/assets/dist-C_wTk-qb.js"
	},
	"/assets/dist-BEw6EzKV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"226a-5I0zuXjeE5E+IZaS7/3TMHNlnIE\"",
		"mtime": "2026-08-10T10:59:03.844Z",
		"size": 8810,
		"path": "../public/assets/dist-BEw6EzKV.js"
	},
	"/assets/eye-EDhLQoTY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-6ArZX52q/yjbNF9UXQI9K9GSRzI\"",
		"mtime": "2026-08-10T10:59:03.844Z",
		"size": 246,
		"path": "../public/assets/eye-EDhLQoTY.js"
	},
	"/assets/forgot-password-CIhMvVxo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"abf-D559wHAAVbya1/IbglsTOw3jSiU\"",
		"mtime": "2026-08-10T10:59:03.844Z",
		"size": 2751,
		"path": "../public/assets/forgot-password-CIhMvVxo.js"
	},
	"/assets/form-actions-DkA6sc6B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-lMvyTjDHN6gTNbqa0H7aPKcvguI\"",
		"mtime": "2026-08-10T10:59:03.845Z",
		"size": 465,
		"path": "../public/assets/form-actions-DkA6sc6B.js"
	},
	"/assets/button-DUef3aWA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a9d2-ghhQ4aNKU+FY+NKpM+yxn6wZZ6A\"",
		"mtime": "2026-08-10T10:59:03.843Z",
		"size": 109010,
		"path": "../public/assets/button-DUef3aWA.js"
	},
	"/assets/guard-JJyKLJDG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0c3-6IUT7NKj5jLEW/QMMx7PpOOta/Q\"",
		"mtime": "2026-08-10T10:59:03.845Z",
		"size": 41155,
		"path": "../public/assets/guard-JJyKLJDG.js"
	},
	"/assets/help-ClnxiW6D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a82-P46Hj9CPTzNC9YpqnCO2YEi3clQ\"",
		"mtime": "2026-08-10T10:59:03.845Z",
		"size": 6786,
		"path": "../public/assets/help-ClnxiW6D.js"
	},
	"/assets/eye-off-BITBSLnZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a4-UDQAxrHEtiv3fX7/kIkRofPVOQY\"",
		"mtime": "2026-08-10T10:59:03.844Z",
		"size": 420,
		"path": "../public/assets/eye-off-BITBSLnZ.js"
	},
	"/assets/admin.users.index-BQXScN6v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15db-cviOfggXX8YHUd4aKOeMv3FW7cs\"",
		"mtime": "2026-08-10T10:59:03.842Z",
		"size": 5595,
		"path": "../public/assets/admin.users.index-BQXScN6v.js"
	},
	"/assets/input-Cq5wNHCy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a5-Obe1jOFZvLvUqylxrAZUtlHdX7g\"",
		"mtime": "2026-08-10T10:59:03.845Z",
		"size": 677,
		"path": "../public/assets/input-Cq5wNHCy.js"
	},
	"/assets/internal-user-form-D-TGkQ-o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c78-P892+SKr4S5ZQKSqGi9NVP1yg18\"",
		"mtime": "2026-08-10T10:59:03.845Z",
		"size": 7288,
		"path": "../public/assets/internal-user-form-D-TGkQ-o.js"
	},
	"/assets/internal-users-DuyZFNIm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e6-p92Mm0Hq3j9SLGDNWXaRKX+6oMQ\"",
		"mtime": "2026-08-10T10:59:03.846Z",
		"size": 1254,
		"path": "../public/assets/internal-users-DuyZFNIm.js"
	},
	"/assets/label-CBraRrc9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ab-HHPgV2Nawluyl/ZIOm5p3tVWZK8\"",
		"mtime": "2026-08-10T10:59:03.846Z",
		"size": 683,
		"path": "../public/assets/label-CBraRrc9.js"
	},
	"/assets/listing-page-R6BoN7Cd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1446-Xa1hS1CS5BsMAzQfAetOsH+sBDU\"",
		"mtime": "2026-08-10T10:59:03.846Z",
		"size": 5190,
		"path": "../public/assets/listing-page-R6BoN7Cd.js"
	},
	"/assets/matchContext-DTZFKhir.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-lpFtWSP7wkat+o/AZgvewty03oE\"",
		"mtime": "2026-08-10T10:59:03.846Z",
		"size": 139,
		"path": "../public/assets/matchContext-DTZFKhir.js"
	},
	"/assets/lock-BkLcjD9e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-lTnryLj0s0pDbBPdCoHIKwFKVek\"",
		"mtime": "2026-08-10T10:59:03.846Z",
		"size": 196,
		"path": "../public/assets/lock-BkLcjD9e.js"
	},
	"/assets/org-DEm8oiTJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"155-7TTLPMs59AaAjTS82+/sJLht+iU\"",
		"mtime": "2026-08-10T10:59:03.847Z",
		"size": 341,
		"path": "../public/assets/org-DEm8oiTJ.js"
	},
	"/assets/paperclip-c1L3F90Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df-l49gla3IgRiymmGs9jit00Il2e4\"",
		"mtime": "2026-08-10T10:59:03.847Z",
		"size": 223,
		"path": "../public/assets/paperclip-c1L3F90Z.js"
	},
	"/assets/notifications-panel-_JsiC5xe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58b-qId24DFNWEUX6cyxuDKW9cpKTxE\"",
		"mtime": "2026-08-10T10:59:03.847Z",
		"size": 1419,
		"path": "../public/assets/notifications-panel-_JsiC5xe.js"
	},
	"/assets/pencil-B4MdH8kJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a-fNhVF1WLw6B+mzduxhthiaCptLM\"",
		"mtime": "2026-08-10T10:59:03.847Z",
		"size": 266,
		"path": "../public/assets/pencil-B4MdH8kJ.js"
	},
	"/assets/portal.notifications-Cg8d-5Yp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-9ObksIIB7N2MHjeDc2kgn6zAd9A\"",
		"mtime": "2026-08-10T10:59:03.848Z",
		"size": 233,
		"path": "../public/assets/portal.notifications-Cg8d-5Yp.js"
	},
	"/assets/portal.index-BJBZYbBv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93e-Q65LMu3X1EexWvGBs8aqJsobiRs\"",
		"mtime": "2026-08-10T10:59:03.847Z",
		"size": 2366,
		"path": "../public/assets/portal.index-BJBZYbBv.js"
	},
	"/assets/index-BFtdpMMT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6d73e-Xgd5nVVqQlW2Lcflv/CMGC9nzAk\"",
		"mtime": "2026-08-10T10:59:03.838Z",
		"size": 448318,
		"path": "../public/assets/index-BFtdpMMT.js"
	},
	"/assets/portal.tickets._ticketId-D6FP8pRj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1a-FXh94meBmVHKJKnjVDC6Ba2HSVc\"",
		"mtime": "2026-08-10T10:59:03.848Z",
		"size": 7962,
		"path": "../public/assets/portal.tickets._ticketId-D6FP8pRj.js"
	},
	"/assets/portal.projects.index-CgPybHqG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bdc-FOhxotB/U8Bd1F9ked5quWxG9e8\"",
		"mtime": "2026-08-10T10:59:03.848Z",
		"size": 3036,
		"path": "../public/assets/portal.projects.index-CgPybHqG.js"
	},
	"/assets/portal.projects._projectId-BL4DIQ0T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"119a-lQV0pKn1nt9asOaw9xVIg1Vwr8A\"",
		"mtime": "2026-08-10T10:59:03.848Z",
		"size": 4506,
		"path": "../public/assets/portal.projects._projectId-BL4DIQ0T.js"
	},
	"/assets/password-b5dhodsr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a7-tSmR2LOCXQAujpqCpSGbfYAwbxA\"",
		"mtime": "2026-08-10T10:59:03.847Z",
		"size": 2215,
		"path": "../public/assets/password-b5dhodsr.js"
	},
	"/assets/portal.tickets.new-BV2eWgIw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b9-I3aT1dwhf5/lV/tBKt93ISiDSvM\"",
		"mtime": "2026-08-10T10:59:03.848Z",
		"size": 441,
		"path": "../public/assets/portal.tickets.new-BV2eWgIw.js"
	},
	"/assets/portal.tickets.index-CRazFDlS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae6-NFTEn6nywGh1gsf4V/ig/vliEhU\"",
		"mtime": "2026-08-10T10:59:03.848Z",
		"size": 2790,
		"path": "../public/assets/portal.tickets.index-CRazFDlS.js"
	},
	"/assets/profile-D4GfkoPI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12d6-TEkqi4qzqopJQjqK5bm7BSudnOI\"",
		"mtime": "2026-08-10T10:59:03.849Z",
		"size": 4822,
		"path": "../public/assets/profile-D4GfkoPI.js"
	},
	"/assets/project-activity-BGynwIx0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26d-HvNiRyC8xi7W25Gqd2hB0A/0fIs\"",
		"mtime": "2026-08-10T10:59:03.849Z",
		"size": 621,
		"path": "../public/assets/project-activity-BGynwIx0.js"
	},
	"/assets/project-form-BYWYpcbJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165c-y8rsl5GjwB+Kadq4LG5ueriV/9Y\"",
		"mtime": "2026-08-10T10:59:03.849Z",
		"size": 5724,
		"path": "../public/assets/project-form-BYWYpcbJ.js"
	},
	"/assets/projects-8N1MRgtB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"396-OOCj9JmCfQdhLJzqvD7acOOI4DA\"",
		"mtime": "2026-08-10T10:59:03.849Z",
		"size": 918,
		"path": "../public/assets/projects-8N1MRgtB.js"
	},
	"/assets/reset-password-vMlPGNHf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f2-FH+rcBBkskqZ5zrb3cPBSqmcE1E\"",
		"mtime": "2026-08-10T10:59:03.849Z",
		"size": 2290,
		"path": "../public/assets/reset-password-vMlPGNHf.js"
	},
	"/assets/routes-D3wX0Ghm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2943-jFN52IIg30xxMjOufB1HAfsW3/c\"",
		"mtime": "2026-08-10T10:59:03.849Z",
		"size": 10563,
		"path": "../public/assets/routes-D3wX0Ghm.js"
	},
	"/assets/separator-aX9vDvYA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"43e-lpRukMhTfsaj4FnP71jjErZMKjE\"",
		"mtime": "2026-08-10T10:59:03.850Z",
		"size": 1086,
		"path": "../public/assets/separator-aX9vDvYA.js"
	},
	"/assets/staff.dashboard-uTxWxl0T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-Jp0fiHG3uNWPRo43/y8TFjXOyjw\"",
		"mtime": "2026-08-10T10:59:03.850Z",
		"size": 202,
		"path": "../public/assets/staff.dashboard-uTxWxl0T.js"
	},
	"/assets/store-xvcaGxyC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1853e-rWyKe/YJ5Uwkt8AxFDKay5LDbbs\"",
		"mtime": "2026-08-10T10:59:03.850Z",
		"size": 99646,
		"path": "../public/assets/store-xvcaGxyC.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-10T10:59:03.849Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/switch-JxzkmNsF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10bd-DBDG/fIA9TCsKK3QtIj6+DlqTkI\"",
		"mtime": "2026-08-10T10:59:03.850Z",
		"size": 4285,
		"path": "../public/assets/switch-JxzkmNsF.js"
	},
	"/assets/tabs-DemWbhfr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1305-c9dDnSzbs6os9NmAEO6Aq5keSpM\"",
		"mtime": "2026-08-10T10:59:03.850Z",
		"size": 4869,
		"path": "../public/assets/tabs-DemWbhfr.js"
	},
	"/assets/textarea-Dgo-N8Ju.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"205-Xw/PyIQ74NB0aSFUEAwbEh+Pfr8\"",
		"mtime": "2026-08-10T10:59:03.850Z",
		"size": 517,
		"path": "../public/assets/textarea-Dgo-N8Ju.js"
	},
	"/assets/styles-DTh4w-09.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"18a8a-LXzvFt7bWZ189RAEeEJQb6M2ovA\"",
		"mtime": "2026-08-10T10:59:03.851Z",
		"size": 101002,
		"path": "../public/assets/styles-DTh4w-09.css"
	},
	"/assets/unauthorized-BGSfoIKf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ce-mKI7bfs26S9lvF8xw1gbgzjkHuY\"",
		"mtime": "2026-08-10T10:59:03.850Z",
		"size": 1230,
		"path": "../public/assets/unauthorized-BGSfoIKf.js"
	},
	"/assets/useStore-Bwb3bsWW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2997-tM3Bn2oYmzvLjMZgSfC/ZEWAcy0\"",
		"mtime": "2026-08-10T10:59:03.851Z",
		"size": 10647,
		"path": "../public/assets/useStore-Bwb3bsWW.js"
	},
	"/assets/user-x-C4lWjHPm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-k2xEgVraMa9CAhYzJciYAF6YSNM\"",
		"mtime": "2026-08-10T10:59:03.851Z",
		"size": 636,
		"path": "../public/assets/user-x-C4lWjHPm.js"
	},
	"/assets/useMutation-h8nwLm87.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8cf-/DdbyGjk2J4voOIbqvH9b0ytYaE\"",
		"mtime": "2026-08-10T10:59:03.851Z",
		"size": 2255,
		"path": "../public/assets/useMutation-h8nwLm87.js"
	},
	"/assets/users-CBPkJQBy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb-IYaUA1yXMCoQjb5z+lD0GgJIpkg\"",
		"mtime": "2026-08-10T10:59:03.851Z",
		"size": 235,
		"path": "../public/assets/users-CBPkJQBy.js"
	},
	"/assets/user-CrD1UucP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba-tHXjITm+uPYPcH0dznn4DR4vdT8\"",
		"mtime": "2026-08-10T10:59:03.851Z",
		"size": 186,
		"path": "../public/assets/user-CrD1UucP.js"
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
