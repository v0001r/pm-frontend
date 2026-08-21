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
	"/miraki-logo.png": {
		"type": "image/png",
		"etag": "\"2e69-0ykH9Wa8XGWYMBNUwe0AoMw++ZY\"",
		"mtime": "2026-08-18T14:33:32.260Z",
		"size": 11881,
		"path": "../public/miraki-logo.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-18T14:33:32.260Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/Match-C5iZhOv5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1118-kVL8RJJZFTqS0z0nuWHzLyjaWdM\"",
		"mtime": "2026-08-18T14:33:31.404Z",
		"size": 4376,
		"path": "../public/assets/Match-C5iZhOv5.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-18T14:33:32.260Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/activate-ChbrxUMp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c01-SIR5gA5o5PG1pW2FSWQ7qLERaas\"",
		"mtime": "2026-08-18T14:33:31.404Z",
		"size": 3073,
		"path": "../public/assets/activate-ChbrxUMp.js"
	},
	"/assets/admin.clients-BPfFRrgF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"139a-y2ZQxxTMP0jc7B80XLlSpAeOG7o\"",
		"mtime": "2026-08-18T14:33:31.404Z",
		"size": 5018,
		"path": "../public/assets/admin.clients-BPfFRrgF.js"
	},
	"/assets/admin.customers._customerId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-18T14:33:31.405Z",
		"size": 138,
		"path": "../public/assets/admin.customers._customerId-DY_mZ7yx.js"
	},
	"/assets/admin.audit-DXslgvxt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7fc-WIyX62AZNskNNY2Y/IkXSoZS7uI\"",
		"mtime": "2026-08-18T14:33:31.404Z",
		"size": 2044,
		"path": "../public/assets/admin.audit-DXslgvxt.js"
	},
	"/assets/admin.customers._customerId.edit-BuIsQzzK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1da-VQ95V3Hs0jy6FQiqQpUPPVmaVM4\"",
		"mtime": "2026-08-18T14:33:31.405Z",
		"size": 474,
		"path": "../public/assets/admin.customers._customerId.edit-BuIsQzzK.js"
	},
	"/assets/admin.customers.index-BxV8cxKZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"157e-udpyyY38N4nZo0IRhDGNNkSQbLA\"",
		"mtime": "2026-08-18T14:33:31.405Z",
		"size": 5502,
		"path": "../public/assets/admin.customers.index-BxV8cxKZ.js"
	},
	"/assets/admin.customers.new-ChV9IiIM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17e-XH0ucTMKCOyH/eiIoDZAjbN+h/Q\"",
		"mtime": "2026-08-18T14:33:31.405Z",
		"size": 382,
		"path": "../public/assets/admin.customers.new-ChV9IiIM.js"
	},
	"/assets/admin.customers._customerId.index-wWhNrmSu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60f9-F87ejkYtXQKdD9G9O2AA+7guOEQ\"",
		"mtime": "2026-08-18T14:33:31.405Z",
		"size": 24825,
		"path": "../public/assets/admin.customers._customerId.index-wWhNrmSu.js"
	},
	"/assets/admin.dashboard-FhWF0gcs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-i39x3S3m+cS2QDzj69SPcRG/kXo\"",
		"mtime": "2026-08-18T14:33:31.406Z",
		"size": 202,
		"path": "../public/assets/admin.dashboard-FhWF0gcs.js"
	},
	"/assets/admin.notifications-BBI5drxr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-YUCqSKOiXFQO6h44tb2Sy1Ob8uY\"",
		"mtime": "2026-08-18T14:33:31.406Z",
		"size": 240,
		"path": "../public/assets/admin.notifications-BBI5drxr.js"
	},
	"/assets/admin.projects._projectId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-18T14:33:31.406Z",
		"size": 138,
		"path": "../public/assets/admin.projects._projectId-DY_mZ7yx.js"
	},
	"/assets/admin.projects._projectId.index-CAe3nORf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"263-kYA2TCzMuYWfA8EKPcOOnBmG4Rk\"",
		"mtime": "2026-08-18T14:33:31.407Z",
		"size": 611,
		"path": "../public/assets/admin.projects._projectId.index-CAe3nORf.js"
	},
	"/assets/admin.index-CuRgNTZl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"279f-Wn2QbdcaMwWRE4DXsDN7PXo0SEk\"",
		"mtime": "2026-08-18T14:33:31.406Z",
		"size": 10143,
		"path": "../public/assets/admin.index-CuRgNTZl.js"
	},
	"/assets/admin.projects.index-wOLXvn1O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196e-e4aFT3AozCVMBJfCraQZ0fTVY8w\"",
		"mtime": "2026-08-18T14:33:31.407Z",
		"size": 6510,
		"path": "../public/assets/admin.projects.index-wOLXvn1O.js"
	},
	"/assets/admin.projects.new-BWTaeQdB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d-1orxpwZ5/Ac/Ap62rRtpAZ8bBww\"",
		"mtime": "2026-08-18T14:33:31.407Z",
		"size": 381,
		"path": "../public/assets/admin.projects.new-BWTaeQdB.js"
	},
	"/assets/admin.reports-Bntq6MQt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7d8a-lsJwq0BAevdSjIX7wsVVnZHZuXE\"",
		"mtime": "2026-08-18T14:33:31.407Z",
		"size": 32138,
		"path": "../public/assets/admin.reports-Bntq6MQt.js"
	},
	"/assets/admin.projects._projectId.edit-BcWtaquP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1db-br6MWauZXLXRysuHRunzt/YT5kk\"",
		"mtime": "2026-08-18T14:33:31.407Z",
		"size": 475,
		"path": "../public/assets/admin.projects._projectId.edit-BcWtaquP.js"
	},
	"/assets/admin.team-DXlEAvla.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b06-hn0nwi8JzEgB1vbv37ll7XeGzEU\"",
		"mtime": "2026-08-18T14:33:31.407Z",
		"size": 2822,
		"path": "../public/assets/admin.team-DXlEAvla.js"
	},
	"/assets/admin.settings-WqnHLvPm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3160-kKdkoz9k9WRaN/GTz0g2JKtyi1w\"",
		"mtime": "2026-08-18T14:33:31.407Z",
		"size": 12640,
		"path": "../public/assets/admin.settings-WqnHLvPm.js"
	},
	"/assets/admin.tickets.index-BtODj_R5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a93-6hCcPAZOeAb1M3K8OnyhwLk3vOE\"",
		"mtime": "2026-08-18T14:33:31.407Z",
		"size": 6803,
		"path": "../public/assets/admin.tickets.index-BtODj_R5.js"
	},
	"/assets/admin.tickets._ticketId-CiueIYaJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"171-xUQlXzd132kIFpsuSmKO/aJ2fMU\"",
		"mtime": "2026-08-18T14:33:31.407Z",
		"size": 369,
		"path": "../public/assets/admin.tickets._ticketId-CiueIYaJ.js"
	},
	"/assets/admin.tickets.new-s3P4XdtD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c0-se33orZULW6RHt5ouXn9jft5vmI\"",
		"mtime": "2026-08-18T14:33:31.407Z",
		"size": 448,
		"path": "../public/assets/admin.tickets.new-s3P4XdtD.js"
	},
	"/assets/admin.users._userId.edit-BXOXZNLl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c7-gcSKakt5lWeY6veJjXgrCw0Khs0\"",
		"mtime": "2026-08-18T14:33:31.408Z",
		"size": 455,
		"path": "../public/assets/admin.users._userId.edit-BXOXZNLl.js"
	},
	"/assets/admin.users.index-BK9KPiGQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"171f-gfVtb3g3wteMQAoWe9/Ye9f2Fys\"",
		"mtime": "2026-08-18T14:33:31.408Z",
		"size": 5919,
		"path": "../public/assets/admin.users.index-BK9KPiGQ.js"
	},
	"/assets/admin.users.new-_vT6GBGb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"172-P15TxMuwpshiR50Kpg+2JF4Cwuo\"",
		"mtime": "2026-08-18T14:33:31.408Z",
		"size": 370,
		"path": "../public/assets/admin.users.new-_vT6GBGb.js"
	},
	"/assets/alert-D_02Bl6F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e0-CL/XEULZ6fh0E+ZMQoYmGj72iyo\"",
		"mtime": "2026-08-18T14:33:31.408Z",
		"size": 992,
		"path": "../public/assets/alert-D_02Bl6F.js"
	},
	"/assets/arrow-left-wgjWCLVh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-pNo15FOGek1wQdLvSeTIqNaYn/o\"",
		"mtime": "2026-08-18T14:33:31.409Z",
		"size": 155,
		"path": "../public/assets/arrow-left-wgjWCLVh.js"
	},
	"/assets/admin.users._userId.index-CUU1eyxL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3cad-Y5L0tGvSbIvdpAWo5Fa3Bvn14vc\"",
		"mtime": "2026-08-18T14:33:31.408Z",
		"size": 15533,
		"path": "../public/assets/admin.users._userId.index-CUU1eyxL.js"
	},
	"/assets/badge-DDJ1sip7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"342-zGwEN1NFCTF9n2WW/wbrFTtaiTg\"",
		"mtime": "2026-08-18T14:33:31.409Z",
		"size": 834,
		"path": "../public/assets/badge-DDJ1sip7.js"
	},
	"/assets/categories-D-TVeHaZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-LZp0fA/dbBweEZBhZkRh7L56Qq4\"",
		"mtime": "2026-08-18T14:33:31.410Z",
		"size": 143,
		"path": "../public/assets/categories-D-TVeHaZ.js"
	},
	"/assets/change-password-BzIfyQmj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d4-YmBxTo/msBBSaW6LepKtr1067k8\"",
		"mtime": "2026-08-18T14:33:31.410Z",
		"size": 2260,
		"path": "../public/assets/change-password-BzIfyQmj.js"
	},
	"/assets/client.dashboard-BAE8uVJM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-O0xA/YXClfRzT0RtSnlGbHNfCHY\"",
		"mtime": "2026-08-18T14:33:31.410Z",
		"size": 202,
		"path": "../public/assets/client.dashboard-BAE8uVJM.js"
	},
	"/assets/create-ticket-form-DtWjg9cM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16f3-9/J00q2kbkM+gfQewlyM8Jdkmxw\"",
		"mtime": "2026-08-18T14:33:31.410Z",
		"size": 5875,
		"path": "../public/assets/create-ticket-form-DtWjg9cM.js"
	},
	"/assets/command-BsfYDmCE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33cf-xKG+kS0RkhL/ZwFG75j3iyLfMYE\"",
		"mtime": "2026-08-18T14:33:31.410Z",
		"size": 13263,
		"path": "../public/assets/command-BsfYDmCE.js"
	},
	"/assets/delete-entity-dialog-njYt1Rai.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a8-CZMzvDSu9fpCS1NzZtdNbAva/ro\"",
		"mtime": "2026-08-18T14:33:31.410Z",
		"size": 1192,
		"path": "../public/assets/delete-entity-dialog-njYt1Rai.js"
	},
	"/assets/customer-form-sheet-Cm_OqsK7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2187-+V1GwjphzE+FSCzSoW6RWFoW4Ew\"",
		"mtime": "2026-08-18T14:33:31.410Z",
		"size": 8583,
		"path": "../public/assets/customer-form-sheet-Cm_OqsK7.js"
	},
	"/assets/dialog-DnOwzpc8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"850-C3djLzP42NoskIdoko+mJZhd5oc\"",
		"mtime": "2026-08-18T14:33:31.410Z",
		"size": 2128,
		"path": "../public/assets/dialog-DnOwzpc8.js"
	},
	"/assets/eye-Cd0V-X3e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-lENRdHMQk3EE8gGOPIIoOPOG+do\"",
		"mtime": "2026-08-18T14:33:31.411Z",
		"size": 246,
		"path": "../public/assets/eye-Cd0V-X3e.js"
	},
	"/assets/dist-BsBA-Bl4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99d-JaZdEw4U1Wd2f10lYC21KnCnGdU\"",
		"mtime": "2026-08-18T14:33:31.411Z",
		"size": 2461,
		"path": "../public/assets/dist-BsBA-Bl4.js"
	},
	"/assets/forgot-password-B7Flw5G4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c15-vDV8OsDlMnL1vdkF4pCKTZCdHSc\"",
		"mtime": "2026-08-18T14:33:31.411Z",
		"size": 3093,
		"path": "../public/assets/forgot-password-B7Flw5G4.js"
	},
	"/assets/file-upload-field-C29emfup.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca7-9QxoRhSgxFjUjH5QcSVnWyxpuBk\"",
		"mtime": "2026-08-18T14:33:31.411Z",
		"size": 3239,
		"path": "../public/assets/file-upload-field-C29emfup.js"
	},
	"/assets/admin.users._userId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-18T14:33:31.408Z",
		"size": 138,
		"path": "../public/assets/admin.users._userId-DY_mZ7yx.js"
	},
	"/assets/dist-Bm3RecHD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f3b-RU/5q3vauhn9cU5zk9yhia+4Ko8\"",
		"mtime": "2026-08-18T14:33:31.411Z",
		"size": 32571,
		"path": "../public/assets/dist-Bm3RecHD.js"
	},
	"/assets/form-sheet-Bng-luNb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25c-LMioUq/N3Z7O+1H2WsKWWNzoRMY\"",
		"mtime": "2026-08-18T14:33:31.411Z",
		"size": 604,
		"path": "../public/assets/form-sheet-Bng-luNb.js"
	},
	"/assets/button-CIquMOOB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae40-/ExHFvmjnawydnCCAZfzFkGhGoI\"",
		"mtime": "2026-08-18T14:33:31.409Z",
		"size": 110144,
		"path": "../public/assets/button-CIquMOOB.js"
	},
	"/assets/form-actions-BlXASzeT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-iHk1PoC0RqRyTsdIUlgaRCORnYY\"",
		"mtime": "2026-08-18T14:33:31.411Z",
		"size": 465,
		"path": "../public/assets/form-actions-BlXASzeT.js"
	},
	"/assets/form-validation-aJ_l_5Xq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10c32-MEhwUMBcD93yP4sQrQlmWC4A/A8\"",
		"mtime": "2026-08-18T14:33:31.411Z",
		"size": 68658,
		"path": "../public/assets/form-validation-aJ_l_5Xq.js"
	},
	"/assets/guard-Bg1dq-FX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8de5-9f9nUH7v86++SAGysLEq1xNGVqI\"",
		"mtime": "2026-08-18T14:33:31.412Z",
		"size": 36325,
		"path": "../public/assets/guard-Bg1dq-FX.js"
	},
	"/assets/help-CgfaafQM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a80-bGkezfEgymkBoV0acuJan+W8NZQ\"",
		"mtime": "2026-08-18T14:33:31.412Z",
		"size": 6784,
		"path": "../public/assets/help-CgfaafQM.js"
	},
	"/assets/generateCategoricalChart-Dqa-5RsO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"546ec-kPHnKLxTYXhW1vrE2QfnkKf/xBc\"",
		"mtime": "2026-08-18T14:33:31.411Z",
		"size": 345836,
		"path": "../public/assets/generateCategoricalChart-Dqa-5RsO.js"
	},
	"/assets/internal-users-BqsAC_Bg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cd-IBDqh6pyxqLvWrvJlfxRRok7Lwg\"",
		"mtime": "2026-08-18T14:33:31.412Z",
		"size": 1229,
		"path": "../public/assets/internal-users-BqsAC_Bg.js"
	},
	"/assets/life-buoy-BAbz8aby.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"173-+eXowqfr1jJTH+V6NAsk8X/eBTk\"",
		"mtime": "2026-08-18T14:33:31.412Z",
		"size": 371,
		"path": "../public/assets/life-buoy-BAbz8aby.js"
	},
	"/assets/loader-circle-CmEtqSQe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86-UH1h/TpMw1kkTQuAxYV+cU+Ccys\"",
		"mtime": "2026-08-18T14:33:31.412Z",
		"size": 134,
		"path": "../public/assets/loader-circle-CmEtqSQe.js"
	},
	"/assets/lock-FFcEhn0L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-tJrOPV2/wDW/dgSpr3+UhOmUvt4\"",
		"mtime": "2026-08-18T14:33:31.412Z",
		"size": 196,
		"path": "../public/assets/lock-FFcEhn0L.js"
	},
	"/assets/mail-DkVnpg9G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb-xkV6FCl4Tnl6aqs5eAknZwVWYi0\"",
		"mtime": "2026-08-18T14:33:31.412Z",
		"size": 203,
		"path": "../public/assets/mail-DkVnpg9G.js"
	},
	"/assets/matchContext-DTZFKhir.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-lpFtWSP7wkat+o/AZgvewty03oE\"",
		"mtime": "2026-08-18T14:33:31.412Z",
		"size": 139,
		"path": "../public/assets/matchContext-DTZFKhir.js"
	},
	"/assets/notifications-panel-dMBwPy9c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56e-OoDoa97P0ATFtpN3J8jX97R2py0\"",
		"mtime": "2026-08-18T14:33:31.412Z",
		"size": 1390,
		"path": "../public/assets/notifications-panel-dMBwPy9c.js"
	},
	"/assets/org-CMOBkfu4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"155-WOLhKgoSpLOgIOZeShdfJaJLhnI\"",
		"mtime": "2026-08-18T14:33:31.412Z",
		"size": 341,
		"path": "../public/assets/org-CMOBkfu4.js"
	},
	"/assets/portal.index-rU0JyaFu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"95f-mCKdrZHg32iDQHQbVZB2r6C93M4\"",
		"mtime": "2026-08-18T14:33:31.412Z",
		"size": 2399,
		"path": "../public/assets/portal.index-rU0JyaFu.js"
	},
	"/assets/portal.notifications-DxXggvGj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-ataMGXhZqmQiXTdf6CZct5x6qR4\"",
		"mtime": "2026-08-18T14:33:31.412Z",
		"size": 233,
		"path": "../public/assets/portal.notifications-DxXggvGj.js"
	},
	"/assets/portal.projects._projectId-BZpAcKl7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16d-AF7Vic8ws6iyeWXNJk5V6uVFEMI\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 365,
		"path": "../public/assets/portal.projects._projectId-BZpAcKl7.js"
	},
	"/assets/portal.projects.index-BYza7yMj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bb8-HT8+yifexFBFqgIU3onkMPqf/+I\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 3e3,
		"path": "../public/assets/portal.projects.index-BYza7yMj.js"
	},
	"/assets/portal.tickets._ticketId-BMtlsQiN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16b-sJWnGS0+vRkIEmxTsRalMWziJO8\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 363,
		"path": "../public/assets/portal.tickets._ticketId-BMtlsQiN.js"
	},
	"/assets/portal.tickets.index-DTHe6jkS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a98-dOsrS7aCsfDbbPiYya7eyz6EgRc\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 2712,
		"path": "../public/assets/portal.tickets.index-DTHe6jkS.js"
	},
	"/assets/portal.tickets.new-CE4lvNIC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b9-1c+8IbtGKP7NLYedkB/8JuKk6zk\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 441,
		"path": "../public/assets/portal.tickets.new-CE4lvNIC.js"
	},
	"/assets/primitives-CAwNqYv3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2565-O2ULEeWqIka7+u/FZoLOfZ80jWo\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 9573,
		"path": "../public/assets/primitives-CAwNqYv3.js"
	},
	"/assets/index-BQd7dZt5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a777-KdhPEDhXkeckR6ziE4FlwWwVq2A\"",
		"mtime": "2026-08-18T14:33:31.403Z",
		"size": 436087,
		"path": "../public/assets/index-BQd7dZt5.js"
	},
	"/assets/profile-BFzAZy5G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1400-V3M1wLfgeU5xEjqbWrmwzoenhhI\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 5120,
		"path": "../public/assets/profile-BFzAZy5G.js"
	},
	"/assets/project-form-sheet-DdO6SiiS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2182-3sJqrIKCvcxHnmiYkhLng+pGmAA\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 8578,
		"path": "../public/assets/project-form-sheet-DdO6SiiS.js"
	},
	"/assets/reset-password-ipMPvDXD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9ef-9XUf2vEylH83lbWyHAjV4+19Tbg\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 2543,
		"path": "../public/assets/reset-password-ipMPvDXD.js"
	},
	"/assets/project-overview-DEVmuk_O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4dc7-d5BMwqka58thWWT48PKYjY1kKJc\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 19911,
		"path": "../public/assets/project-overview-DEVmuk_O.js"
	},
	"/assets/routes-BOdC0MJQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"273f-ml6igds457IWRuwEvbMOuWK3xDE\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 10047,
		"path": "../public/assets/routes-BOdC0MJQ.js"
	},
	"/assets/sla-D6FSQ-kR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"47a-MLt5FFLrPBukuzWLcAKD+MQXkQk\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 1146,
		"path": "../public/assets/sla-D6FSQ-kR.js"
	},
	"/assets/staff.dashboard-CfTHyBjg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-WuXZoCplT2LptlTE1Sd0SiQmFx8\"",
		"mtime": "2026-08-18T14:33:31.414Z",
		"size": 202,
		"path": "../public/assets/staff.dashboard-CfTHyBjg.js"
	},
	"/assets/store-Cfr5IopU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19a32-rRdn/9VxMD4QpMXbfTGLoGUsAm4\"",
		"mtime": "2026-08-18T14:33:31.414Z",
		"size": 105010,
		"path": "../public/assets/store-Cfr5IopU.js"
	},
	"/assets/switch-CY3t2glm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10c3-injSMpIknMQGRIb8bsAWuFgPCNo\"",
		"mtime": "2026-08-18T14:33:31.414Z",
		"size": 4291,
		"path": "../public/assets/switch-CY3t2glm.js"
	},
	"/assets/ticket-form-sheet-DpyXRQkD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"231-cPfNHCdu9L88305guPDNsCcn4Cs\"",
		"mtime": "2026-08-18T14:33:31.414Z",
		"size": 561,
		"path": "../public/assets/ticket-form-sheet-DpyXRQkD.js"
	},
	"/assets/styles-DQ-hH3xd.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"18355-7nAGnncBEP0WnRUE68oAsMI60QY\"",
		"mtime": "2026-08-18T14:33:31.415Z",
		"size": 99157,
		"path": "../public/assets/styles-DQ-hH3xd.css"
	},
	"/assets/textarea-CEasAZU0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"234-U7L2KnbYug2zlWftTGohtTnEv9I\"",
		"mtime": "2026-08-18T14:33:31.414Z",
		"size": 564,
		"path": "../public/assets/textarea-CEasAZU0.js"
	},
	"/assets/use-zod-form-DTY8h-o4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"560-wgUhu5bivVdMJy9JJjZzA9g2R6U\"",
		"mtime": "2026-08-18T14:33:31.414Z",
		"size": 1376,
		"path": "../public/assets/use-zod-form-DTY8h-o4.js"
	},
	"/assets/useMutation-DaEtdYLX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8cf-jDfcbzKU8dPTjHNQmeXc54slA6M\"",
		"mtime": "2026-08-18T14:33:31.414Z",
		"size": 2255,
		"path": "../public/assets/useMutation-DaEtdYLX.js"
	},
	"/assets/select-1CPGhLCB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56c8-0Ixsh4vub0H5kfwxKBNgSriEmCk\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 22216,
		"path": "../public/assets/select-1CPGhLCB.js"
	},
	"/assets/useStore-Bwb3bsWW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2997-tM3Bn2oYmzvLjMZgSfC/ZEWAcy0\"",
		"mtime": "2026-08-18T14:33:31.414Z",
		"size": 10647,
		"path": "../public/assets/useStore-Bwb3bsWW.js"
	},
	"/assets/tabs-CzZEaTvj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"131d-4Q/tBTWBTxwrM79r7zmt/K2QFHg\"",
		"mtime": "2026-08-18T14:33:31.414Z",
		"size": 4893,
		"path": "../public/assets/tabs-CzZEaTvj.js"
	},
	"/assets/unauthorized-Tz5rPRVa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ce-DbISqMQboPCzRC8QNIwGNw89Sp0\"",
		"mtime": "2026-08-18T14:33:31.414Z",
		"size": 1230,
		"path": "../public/assets/unauthorized-Tz5rPRVa.js"
	},
	"/assets/ticket-workspace-1_BTdUoF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"63b6-/ypZb8LA8CX0Ga5RusWUZvymkcE\"",
		"mtime": "2026-08-18T14:33:31.414Z",
		"size": 25526,
		"path": "../public/assets/ticket-workspace-1_BTdUoF.js"
	},
	"/assets/user-DD9kzz6-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba-BuNRpaSwzrKhxnbpuEbMjNj3nWM\"",
		"mtime": "2026-08-18T14:33:31.414Z",
		"size": 186,
		"path": "../public/assets/user-DD9kzz6-.js"
	},
	"/assets/user-activation-BkeO02lj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"341a-6eWtLK/qxBHmo8ZW3BKhif1gFlQ\"",
		"mtime": "2026-08-18T14:33:31.415Z",
		"size": 13338,
		"path": "../public/assets/user-activation-BkeO02lj.js"
	},
	"/assets/user-x-nQjqp34m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"273-pqYBeHyub6zu4xjkLk537eVrwDI\"",
		"mtime": "2026-08-18T14:33:31.415Z",
		"size": 627,
		"path": "../public/assets/user-x-nQjqp34m.js"
	},
	"/assets/x-BItQntqQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-gcJ1iadDjN9MYJN07oeq+l77MME\"",
		"mtime": "2026-08-18T14:33:31.415Z",
		"size": 144,
		"path": "../public/assets/x-BItQntqQ.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-18T14:33:31.413Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
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
