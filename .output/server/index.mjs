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
		"mtime": "2026-08-10T12:11:12.172Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/miraki-logo.png": {
		"type": "image/png",
		"etag": "\"2e69-0ykH9Wa8XGWYMBNUwe0AoMw++ZY\"",
		"mtime": "2026-08-10T12:11:12.172Z",
		"size": 11881,
		"path": "../public/miraki-logo.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-10T12:11:12.171Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/Match-C5iZhOv5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1118-kVL8RJJZFTqS0z0nuWHzLyjaWdM\"",
		"mtime": "2026-08-10T12:11:10.896Z",
		"size": 4376,
		"path": "../public/assets/Match-C5iZhOv5.js"
	},
	"/assets/activate-1tSg3Zaa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"859-IVk3RRerR8r0t0vosabfjfaeaC4\"",
		"mtime": "2026-08-10T12:11:10.897Z",
		"size": 2137,
		"path": "../public/assets/activate-1tSg3Zaa.js"
	},
	"/assets/admin.audit-CqE-0Fq5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"815-Ans0R2dfhA4Oyc2rHYMfW8sDmug\"",
		"mtime": "2026-08-10T12:11:10.897Z",
		"size": 2069,
		"path": "../public/assets/admin.audit-CqE-0Fq5.js"
	},
	"/assets/admin.clients-A0PIf2a9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1392-cw+W46PIKH9h+JiD6gg0Ozc7OWk\"",
		"mtime": "2026-08-10T12:11:10.897Z",
		"size": 5010,
		"path": "../public/assets/admin.clients-A0PIf2a9.js"
	},
	"/assets/admin.customers._customerId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T12:11:10.897Z",
		"size": 138,
		"path": "../public/assets/admin.customers._customerId-DY_mZ7yx.js"
	},
	"/assets/admin.customers._customerId.edit-2pRkv5Df.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"475-nz7GsF6yLw0eO2xyhLj9tB0yRRg\"",
		"mtime": "2026-08-10T12:11:10.897Z",
		"size": 1141,
		"path": "../public/assets/admin.customers._customerId.edit-2pRkv5Df.js"
	},
	"/assets/admin.customers.index-CMdC_Q9P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e2-mtD03cBh6JKs1K3IaDVhB3AYw6E\"",
		"mtime": "2026-08-10T12:11:10.897Z",
		"size": 4322,
		"path": "../public/assets/admin.customers.index-CMdC_Q9P.js"
	},
	"/assets/admin.customers._customerId.index-Bf_W5jVV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3757-bcM5WRji9Zq3/wWyUFp1j3McyTo\"",
		"mtime": "2026-08-10T12:11:10.897Z",
		"size": 14167,
		"path": "../public/assets/admin.customers._customerId.index-Bf_W5jVV.js"
	},
	"/assets/PieChart-DTgJYYTq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a988-Cc8quIEjELEuOntUlWnsHmVmjv8\"",
		"mtime": "2026-08-10T12:11:10.896Z",
		"size": 371080,
		"path": "../public/assets/PieChart-DTgJYYTq.js"
	},
	"/assets/admin.customers.new-BFAGu7b2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37c-i5soLYRafDWm/FK+0/mcGWCEs9Y\"",
		"mtime": "2026-08-10T12:11:10.898Z",
		"size": 892,
		"path": "../public/assets/admin.customers.new-BFAGu7b2.js"
	},
	"/assets/admin.dashboard-D2Ebv6l1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-Cu9UoiPPImVovwm6rqyDdnRDOXo\"",
		"mtime": "2026-08-10T12:11:10.898Z",
		"size": 202,
		"path": "../public/assets/admin.dashboard-D2Ebv6l1.js"
	},
	"/assets/admin.index-CHWfJX98.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d1-kyyrH03Q4rsDUxZWdFVKnc4kaAs\"",
		"mtime": "2026-08-10T12:11:10.898Z",
		"size": 6609,
		"path": "../public/assets/admin.index-CHWfJX98.js"
	},
	"/assets/admin.notifications-B3Jsk6iU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-ZZpafzIedgnGejVz88Ok2EYAFzY\"",
		"mtime": "2026-08-10T12:11:10.898Z",
		"size": 240,
		"path": "../public/assets/admin.notifications-B3Jsk6iU.js"
	},
	"/assets/admin.projects._projectId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T12:11:10.898Z",
		"size": 138,
		"path": "../public/assets/admin.projects._projectId-DY_mZ7yx.js"
	},
	"/assets/admin.projects._projectId.edit-CMMh4PSy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"587-2uWj2hrLesuTsp3+FiJqgvKPxSw\"",
		"mtime": "2026-08-10T12:11:10.898Z",
		"size": 1415,
		"path": "../public/assets/admin.projects._projectId.edit-CMMh4PSy.js"
	},
	"/assets/admin.projects.index-aJkdcW-G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14d8-aaICRt3sbOm8NZCI9zNZjp0mom8\"",
		"mtime": "2026-08-10T12:11:10.899Z",
		"size": 5336,
		"path": "../public/assets/admin.projects.index-aJkdcW-G.js"
	},
	"/assets/admin.projects.new-CRxp-QgU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"263-aVoP1e48ZOgJKckHSdSJFwBALNw\"",
		"mtime": "2026-08-10T12:11:10.899Z",
		"size": 611,
		"path": "../public/assets/admin.projects.new-CRxp-QgU.js"
	},
	"/assets/admin.projects._projectId.index-hUpO30wW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4614-BIo490HqHUoqvAvP/L7y85JN08M\"",
		"mtime": "2026-08-10T12:11:10.898Z",
		"size": 17940,
		"path": "../public/assets/admin.projects._projectId.index-hUpO30wW.js"
	},
	"/assets/admin.settings-DMtLdQND.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1474-XTVVsnFmkDPnn2LZvFZobZAhnB8\"",
		"mtime": "2026-08-10T12:11:10.899Z",
		"size": 5236,
		"path": "../public/assets/admin.settings-DMtLdQND.js"
	},
	"/assets/admin.reports-DUmDn6m2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eeb-L3lz9F67T7lsPisWTHO4B4jVxB8\"",
		"mtime": "2026-08-10T12:11:10.899Z",
		"size": 3819,
		"path": "../public/assets/admin.reports-DUmDn6m2.js"
	},
	"/assets/admin.team-C43xpWqQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad9-rkgKDq0MeeZ61rHlivryXUJxXQM\"",
		"mtime": "2026-08-10T12:11:10.899Z",
		"size": 2777,
		"path": "../public/assets/admin.team-C43xpWqQ.js"
	},
	"/assets/admin.tickets._ticketId-Bd6BXcID.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"171-UKHJv9F6Yxii/8eX/CruIRaiVRI\"",
		"mtime": "2026-08-10T12:11:10.899Z",
		"size": 369,
		"path": "../public/assets/admin.tickets._ticketId-Bd6BXcID.js"
	},
	"/assets/admin.tickets.index-DVdJoB0-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ad3-+zqYe0ySvH1Yp1QOmPZISi25Qv0\"",
		"mtime": "2026-08-10T12:11:10.900Z",
		"size": 6867,
		"path": "../public/assets/admin.tickets.index-DVdJoB0-.js"
	},
	"/assets/admin.tickets.new-CYg4x3sm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191-D1AYSAB1d53BS0sSHBMGqLMlm+k\"",
		"mtime": "2026-08-10T12:11:10.900Z",
		"size": 401,
		"path": "../public/assets/admin.tickets.new-CYg4x3sm.js"
	},
	"/assets/admin.users._userId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T12:11:10.900Z",
		"size": 138,
		"path": "../public/assets/admin.users._userId-DY_mZ7yx.js"
	},
	"/assets/admin.users._userId.edit-DeFn4Aem.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"455-XHxSW597Xf5x2TaU3QTsK04WQVo\"",
		"mtime": "2026-08-10T12:11:10.900Z",
		"size": 1109,
		"path": "../public/assets/admin.users._userId.edit-DeFn4Aem.js"
	},
	"/assets/admin.users._userId.index-DtG3G42g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c96-lkCG7aXJihJ4V7R6kJracYt8ZGc\"",
		"mtime": "2026-08-10T12:11:10.901Z",
		"size": 7318,
		"path": "../public/assets/admin.users._userId.index-DtG3G42g.js"
	},
	"/assets/admin.users.index-D5-Wfym3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15db-aClTksFWnFIphEpZXing8ALLkrA\"",
		"mtime": "2026-08-10T12:11:10.901Z",
		"size": 5595,
		"path": "../public/assets/admin.users.index-D5-Wfym3.js"
	},
	"/assets/admin.users.new-CZplOmJI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"382-GwIqsyHoS5Zg1DPT6dP6waouIuA\"",
		"mtime": "2026-08-10T12:11:10.901Z",
		"size": 898,
		"path": "../public/assets/admin.users.new-CZplOmJI.js"
	},
	"/assets/alert-CpfBUclX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d9-y6ZeX+qoBrAQpCcArcf7w/MBZYk\"",
		"mtime": "2026-08-10T12:11:10.901Z",
		"size": 985,
		"path": "../public/assets/alert-CpfBUclX.js"
	},
	"/assets/badge-urbeYOud.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"342-Nbj1UG4ytiY2ONaJNEcutoWFLwA\"",
		"mtime": "2026-08-10T12:11:10.901Z",
		"size": 834,
		"path": "../public/assets/badge-urbeYOud.js"
	},
	"/assets/arrow-left-CUFpx9I5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-Kj1fPFlbcrezUUQicx8TMp8i0lk\"",
		"mtime": "2026-08-10T12:11:10.901Z",
		"size": 155,
		"path": "../public/assets/arrow-left-CUFpx9I5.js"
	},
	"/assets/categories-mSmb2gKC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-Ciuhq6DijO4qXPWzGvTkWJh9JaI\"",
		"mtime": "2026-08-10T12:11:10.902Z",
		"size": 143,
		"path": "../public/assets/categories-mSmb2gKC.js"
	},
	"/assets/button-DZcdxMSz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a96e-i3HQvEkYjAul6Kc41bdBV+grtIY\"",
		"mtime": "2026-08-10T12:11:10.902Z",
		"size": 108910,
		"path": "../public/assets/button-DZcdxMSz.js"
	},
	"/assets/change-password-D2-2WmBL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c0-nszpJ+rbtqgttSH5oBnLA6fYSyo\"",
		"mtime": "2026-08-10T12:11:10.902Z",
		"size": 2240,
		"path": "../public/assets/change-password-D2-2WmBL.js"
	},
	"/assets/client.dashboard-vTtZKnIo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-DprZyMduhTs7zv8vmPAUO0wjUKs\"",
		"mtime": "2026-08-10T12:11:10.902Z",
		"size": 202,
		"path": "../public/assets/client.dashboard-vTtZKnIo.js"
	},
	"/assets/clock-3-Bfc92wZ1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-3s9RLY0lp7nHcxtXZcwj8Y16mzo\"",
		"mtime": "2026-08-10T12:11:10.902Z",
		"size": 159,
		"path": "../public/assets/clock-3-Bfc92wZ1.js"
	},
	"/assets/create-ticket-form-DaOQ7TqS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2c-VN/PbkTaKjgnYL7DFzzRSacWDi4\"",
		"mtime": "2026-08-10T12:11:10.903Z",
		"size": 6700,
		"path": "../public/assets/create-ticket-form-DaOQ7TqS.js"
	},
	"/assets/customer-form-RpReCQkc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110b-N3l68pCD/mIuBN4mTOjf8cDptxQ\"",
		"mtime": "2026-08-10T12:11:10.903Z",
		"size": 4363,
		"path": "../public/assets/customer-form-RpReCQkc.js"
	},
	"/assets/dialog-B6A6IaXp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a5-/IshTOa+r1j6Hxw7EHumQMsoHAQ\"",
		"mtime": "2026-08-10T12:11:10.903Z",
		"size": 2469,
		"path": "../public/assets/dialog-B6A6IaXp.js"
	},
	"/assets/dist-BzAqGbeR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"997-ehEz4IpcH8ad5VBp/FNhxP1r1tU\"",
		"mtime": "2026-08-10T12:11:10.903Z",
		"size": 2455,
		"path": "../public/assets/dist-BzAqGbeR.js"
	},
	"/assets/dist-DB0D2Skk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"219c-c29SJvZ8OdNCE8i5XWZB3ysqFus\"",
		"mtime": "2026-08-10T12:11:10.903Z",
		"size": 8604,
		"path": "../public/assets/dist-DB0D2Skk.js"
	},
	"/assets/eye-CB-zBs96.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-TTqOOwvRG7l6bHx7MtaAKcmclhA\"",
		"mtime": "2026-08-10T12:11:10.903Z",
		"size": 246,
		"path": "../public/assets/eye-CB-zBs96.js"
	},
	"/assets/forgot-password-DjibvV6x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6c-I9u2G/3wI3Nd4SUeOHscgJfBEng\"",
		"mtime": "2026-08-10T12:11:10.904Z",
		"size": 2924,
		"path": "../public/assets/forgot-password-DjibvV6x.js"
	},
	"/assets/form-actions-kW4G9Fe4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-dfe1BE5lVoGeJ7ZaLhthjb1uoFY\"",
		"mtime": "2026-08-10T12:11:10.904Z",
		"size": 465,
		"path": "../public/assets/form-actions-kW4G9Fe4.js"
	},
	"/assets/form-validation-BlS6JgjE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e59d-w9harcnXUX/Dygt/JNemht78P8w\"",
		"mtime": "2026-08-10T12:11:10.904Z",
		"size": 58781,
		"path": "../public/assets/form-validation-BlS6JgjE.js"
	},
	"/assets/guard-woxs3yvE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9fea-7R7V4KrUtEufKoL6Y7bcmtagl2E\"",
		"mtime": "2026-08-10T12:11:10.904Z",
		"size": 40938,
		"path": "../public/assets/guard-woxs3yvE.js"
	},
	"/assets/help-BqBGbybo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a82-+bBLvEyjAH6wsepqDp+30ENB/Ww\"",
		"mtime": "2026-08-10T12:11:10.904Z",
		"size": 6786,
		"path": "../public/assets/help-BqBGbybo.js"
	},
	"/assets/input-DQ9rQj0w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f4-g8TRmfYk1EpxfzzADc4jmshcAfU\"",
		"mtime": "2026-08-10T12:11:10.904Z",
		"size": 756,
		"path": "../public/assets/input-DQ9rQj0w.js"
	},
	"/assets/internal-users-COxULkQW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e6-7xgXORbCO0ihxkqr+6EbPsqoyQc\"",
		"mtime": "2026-08-10T12:11:10.905Z",
		"size": 1254,
		"path": "../public/assets/internal-users-COxULkQW.js"
	},
	"/assets/label-aK6Wohke.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf-6MafJ8pjfptqGXQ3yNdRksgdrBM\"",
		"mtime": "2026-08-10T12:11:10.905Z",
		"size": 703,
		"path": "../public/assets/label-aK6Wohke.js"
	},
	"/assets/listing-page-lpcyn63p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1395-o1puyTago/rOlzcwUDd/7g/LoGQ\"",
		"mtime": "2026-08-10T12:11:10.905Z",
		"size": 5013,
		"path": "../public/assets/listing-page-lpcyn63p.js"
	},
	"/assets/life-buoy-DF18raJ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"173-EF9lA5XwcZ6n9ShyeCsl4LrWuUg\"",
		"mtime": "2026-08-10T12:11:10.905Z",
		"size": 371,
		"path": "../public/assets/life-buoy-DF18raJ-.js"
	},
	"/assets/lock-TU4h0s3-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-IPjECCn4dBcvIqm3DMQoGWOpQK0\"",
		"mtime": "2026-08-10T12:11:10.905Z",
		"size": 196,
		"path": "../public/assets/lock-TU4h0s3-.js"
	},
	"/assets/notifications-panel-DkyXediA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58b-FjMDQx8MeH6NnSp3FQIJGlv6m/c\"",
		"mtime": "2026-08-10T12:11:10.905Z",
		"size": 1419,
		"path": "../public/assets/notifications-panel-DkyXediA.js"
	},
	"/assets/matchContext-DTZFKhir.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-lpFtWSP7wkat+o/AZgvewty03oE\"",
		"mtime": "2026-08-10T12:11:10.905Z",
		"size": 139,
		"path": "../public/assets/matchContext-DTZFKhir.js"
	},
	"/assets/org-BN32BdN7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"155-FLkGj/oCo+du2LyXN2pNsGqlflU\"",
		"mtime": "2026-08-10T12:11:10.905Z",
		"size": 341,
		"path": "../public/assets/org-BN32BdN7.js"
	},
	"/assets/paperclip-D-x5APLs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df-ILcqiSSi0tjf5arWdrh6FxKbBpE\"",
		"mtime": "2026-08-10T12:11:10.906Z",
		"size": 223,
		"path": "../public/assets/paperclip-D-x5APLs.js"
	},
	"/assets/index-my2fjg5Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6d809-rZdq5Ngv7BzwPn0xzJFNNtjK0ck\"",
		"mtime": "2026-08-10T12:11:10.896Z",
		"size": 448521,
		"path": "../public/assets/index-my2fjg5Z.js"
	},
	"/assets/password-Dl8nlZ38.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4f-CFD9+Q2zEz3x9jslHIHazXEaWKo\"",
		"mtime": "2026-08-10T12:11:10.906Z",
		"size": 3151,
		"path": "../public/assets/password-Dl8nlZ38.js"
	},
	"/assets/internal-user-form-DUS-3gHY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d9b-5lCp3pM9uHoHu1VWduilsd/2qxs\"",
		"mtime": "2026-08-10T12:11:10.904Z",
		"size": 7579,
		"path": "../public/assets/internal-user-form-DUS-3gHY.js"
	},
	"/assets/pencil-ANNZgt_T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a-xPWq4Jvn5C6O+2Z5zq9uzzgOPkU\"",
		"mtime": "2026-08-10T12:11:10.906Z",
		"size": 266,
		"path": "../public/assets/pencil-ANNZgt_T.js"
	},
	"/assets/portal.index-C-YSEe44.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93e-LePvdeevdSdCsjLInNxNWNqk2to\"",
		"mtime": "2026-08-10T12:11:10.906Z",
		"size": 2366,
		"path": "../public/assets/portal.index-C-YSEe44.js"
	},
	"/assets/portal.projects._projectId-pTCwR8cw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"119a-fkyFDy9q8oa8jXGbIGCQUxTfLHM\"",
		"mtime": "2026-08-10T12:11:10.906Z",
		"size": 4506,
		"path": "../public/assets/portal.projects._projectId-pTCwR8cw.js"
	},
	"/assets/portal.notifications-D0gd0DAH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-OY5hOnyKNrVqB6qsBAcUAOdKmh4\"",
		"mtime": "2026-08-10T12:11:10.906Z",
		"size": 233,
		"path": "../public/assets/portal.notifications-D0gd0DAH.js"
	},
	"/assets/portal.projects.index-fCKuCEGa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bdc-iBNcCznnasxgzOC/GdD94oQ/B7w\"",
		"mtime": "2026-08-10T12:11:10.906Z",
		"size": 3036,
		"path": "../public/assets/portal.projects.index-fCKuCEGa.js"
	},
	"/assets/portal.tickets._ticketId-ixwWaus5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16b-kyUXR/mDJZQpPopsjnHtV3fAko8\"",
		"mtime": "2026-08-10T12:11:10.907Z",
		"size": 363,
		"path": "../public/assets/portal.tickets._ticketId-ixwWaus5.js"
	},
	"/assets/portal.tickets.index-DdIuaDJD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"abe-8/p/z5vMoRQqTcQCrfxHXslfrnE\"",
		"mtime": "2026-08-10T12:11:10.907Z",
		"size": 2750,
		"path": "../public/assets/portal.tickets.index-DdIuaDJD.js"
	},
	"/assets/portal.tickets.new-Czoumj7K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b9-NVS3Rl01zXfxZHVFpyEcWrN/dV0\"",
		"mtime": "2026-08-10T12:11:10.907Z",
		"size": 441,
		"path": "../public/assets/portal.tickets.new-Czoumj7K.js"
	},
	"/assets/profile-Bl0iHqtq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12db-Vnnrf+4+oRDSdkLG6QqYEAoy1FU\"",
		"mtime": "2026-08-10T12:11:10.907Z",
		"size": 4827,
		"path": "../public/assets/profile-Bl0iHqtq.js"
	},
	"/assets/project-activity-BGynwIx0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26d-HvNiRyC8xi7W25Gqd2hB0A/0fIs\"",
		"mtime": "2026-08-10T12:11:10.907Z",
		"size": 621,
		"path": "../public/assets/project-activity-BGynwIx0.js"
	},
	"/assets/project-form-ymhovBFl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1649-lAEQ6LO3kVzbwHHqUUXrIkaRsVc\"",
		"mtime": "2026-08-10T12:11:10.907Z",
		"size": 5705,
		"path": "../public/assets/project-form-ymhovBFl.js"
	},
	"/assets/projects-D6gGOWKx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"396-HjVXuPiny0KbeejaBCJFxE8le6c\"",
		"mtime": "2026-08-10T12:11:10.907Z",
		"size": 918,
		"path": "../public/assets/projects-D6gGOWKx.js"
	},
	"/assets/reset-password-R5Y0b6AW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d3-Ei9mpolopQM9f4+kXZhHEfzVTI0\"",
		"mtime": "2026-08-10T12:11:10.907Z",
		"size": 2515,
		"path": "../public/assets/reset-password-R5Y0b6AW.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-10T12:11:10.908Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/routes-BGEzBgeH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2775-IgVaTffRFXn1dggp/Z8HZWVJ6R8\"",
		"mtime": "2026-08-10T12:11:10.908Z",
		"size": 10101,
		"path": "../public/assets/routes-BGEzBgeH.js"
	},
	"/assets/staff.dashboard-CHByBw6u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-Q6kMyyNcNB8BhfC7wgzjNf03WoM\"",
		"mtime": "2026-08-10T12:11:10.908Z",
		"size": 202,
		"path": "../public/assets/staff.dashboard-CHByBw6u.js"
	},
	"/assets/store-BPQLz9DA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18503-baxi5TytWSku7iebIefzsyYVcRw\"",
		"mtime": "2026-08-10T12:11:10.908Z",
		"size": 99587,
		"path": "../public/assets/store-BPQLz9DA.js"
	},
	"/assets/switch-D3y1OOLY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10bd-k7EMuPDrP4AwNsfTMGmeqUkoI8A\"",
		"mtime": "2026-08-10T12:11:10.908Z",
		"size": 4285,
		"path": "../public/assets/switch-D3y1OOLY.js"
	},
	"/assets/textarea-CRMOtmsV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"239-vTmUj3JbKNsaThUJOvLePCux82o\"",
		"mtime": "2026-08-10T12:11:10.908Z",
		"size": 569,
		"path": "../public/assets/textarea-CRMOtmsV.js"
	},
	"/assets/tabs-05MYCqvH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1317-YfgJRQtvg8+Vdx7hhxRcnrv1ONs\"",
		"mtime": "2026-08-10T12:11:10.908Z",
		"size": 4887,
		"path": "../public/assets/tabs-05MYCqvH.js"
	},
	"/assets/styles-Bky33tTV.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"171ff-MaLNX9uy84FykUyGhCMDF9FlaQI\"",
		"mtime": "2026-08-10T12:11:10.910Z",
		"size": 94719,
		"path": "../public/assets/styles-Bky33tTV.css"
	},
	"/assets/unauthorized-Lvr7MiCh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ce-j2Vxyv4UmK1Arsm/ElgHiWeaABI\"",
		"mtime": "2026-08-10T12:11:10.909Z",
		"size": 1230,
		"path": "../public/assets/unauthorized-Lvr7MiCh.js"
	},
	"/assets/useMutation-BoUhyB1m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8cf-C2dZzePVwQ5Nz2tG9rMZZinw9XM\"",
		"mtime": "2026-08-10T12:11:10.909Z",
		"size": 2255,
		"path": "../public/assets/useMutation-BoUhyB1m.js"
	},
	"/assets/useStore-Bwb3bsWW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2997-tM3Bn2oYmzvLjMZgSfC/ZEWAcy0\"",
		"mtime": "2026-08-10T12:11:10.909Z",
		"size": 10647,
		"path": "../public/assets/useStore-Bwb3bsWW.js"
	},
	"/assets/user-D1zkh9es.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba-0g3sFap1HN85NdPb5sSxbzN/4gQ\"",
		"mtime": "2026-08-10T12:11:10.909Z",
		"size": 186,
		"path": "../public/assets/user-D1zkh9es.js"
	},
	"/assets/user-x-CtZpz3Tn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-Rd6cz/fAEWKC/IB3aOOjWaa+Y/U\"",
		"mtime": "2026-08-10T12:11:10.909Z",
		"size": 636,
		"path": "../public/assets/user-x-CtZpz3Tn.js"
	},
	"/assets/users-DeSJUzl9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb-93oaqe8Hbo9HNBDwIEcIK9Can2U\"",
		"mtime": "2026-08-10T12:11:10.909Z",
		"size": 235,
		"path": "../public/assets/users-DeSJUzl9.js"
	},
	"/assets/ticket-workspace-CIT8umKZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61a6-4/9IquvbFceFJIWuVALcdoG/wM8\"",
		"mtime": "2026-08-10T12:11:10.909Z",
		"size": 24998,
		"path": "../public/assets/ticket-workspace-CIT8umKZ.js"
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
