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
		"mtime": "2026-08-10T14:02:55.950Z",
		"size": 11881,
		"path": "../public/miraki-logo.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-10T14:02:55.950Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-10T14:02:55.950Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/Match-C5iZhOv5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1118-kVL8RJJZFTqS0z0nuWHzLyjaWdM\"",
		"mtime": "2026-08-10T14:02:55.263Z",
		"size": 4376,
		"path": "../public/assets/Match-C5iZhOv5.js"
	},
	"/assets/activate-xePOyKCd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"871-dRLXu2J2TvDvx2KsFseGzhgd6O0\"",
		"mtime": "2026-08-10T14:02:55.264Z",
		"size": 2161,
		"path": "../public/assets/activate-xePOyKCd.js"
	},
	"/assets/admin.audit-rpZcO9IF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"817-HshUSnsy4T1S4TRnonr7ntPbuCI\"",
		"mtime": "2026-08-10T14:02:55.264Z",
		"size": 2071,
		"path": "../public/assets/admin.audit-rpZcO9IF.js"
	},
	"/assets/admin.clients-C2TSNfAF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1396-AvCtoxsACS2OUJvNzR1zzAUCrGQ\"",
		"mtime": "2026-08-10T14:02:55.264Z",
		"size": 5014,
		"path": "../public/assets/admin.clients-C2TSNfAF.js"
	},
	"/assets/admin.customers._customerId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T14:02:55.264Z",
		"size": 138,
		"path": "../public/assets/admin.customers._customerId-DY_mZ7yx.js"
	},
	"/assets/admin.customers._customerId.edit-Dq9kquL-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d4-ft6CFqGclj1Jlq5qBFatWeLGNdk\"",
		"mtime": "2026-08-10T14:02:55.264Z",
		"size": 468,
		"path": "../public/assets/admin.customers._customerId.edit-Dq9kquL-.js"
	},
	"/assets/admin.customers._customerId.index-BYGxvzNZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e33-1vKLPNAyEUelBrwbM8TPE1m5w9Y\"",
		"mtime": "2026-08-10T14:02:55.264Z",
		"size": 24115,
		"path": "../public/assets/admin.customers._customerId.index-BYGxvzNZ.js"
	},
	"/assets/admin.customers.index-DdqRWiWZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"124e-WA+lE7CigW5UYOAeFkdIQ41zxEg\"",
		"mtime": "2026-08-10T14:02:55.265Z",
		"size": 4686,
		"path": "../public/assets/admin.customers.index-DdqRWiWZ.js"
	},
	"/assets/admin.customers.new-DPCm2peX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"178-ESIzkLroKywyjexSsohak3p/UgY\"",
		"mtime": "2026-08-10T14:02:55.265Z",
		"size": 376,
		"path": "../public/assets/admin.customers.new-DPCm2peX.js"
	},
	"/assets/admin.index-Br0BqUtO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d3-hxCAuUpzEZQIvOv1koQYAfaJpDc\"",
		"mtime": "2026-08-10T14:02:55.265Z",
		"size": 6611,
		"path": "../public/assets/admin.index-Br0BqUtO.js"
	},
	"/assets/admin.notifications-_3imV4Co.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-ioV0w7sS0OSq2xARoP3Ka1BXhZ0\"",
		"mtime": "2026-08-10T14:02:55.265Z",
		"size": 240,
		"path": "../public/assets/admin.notifications-_3imV4Co.js"
	},
	"/assets/admin.projects._projectId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T14:02:55.265Z",
		"size": 138,
		"path": "../public/assets/admin.projects._projectId-DY_mZ7yx.js"
	},
	"/assets/admin.projects._projectId.edit-eg5NNpxK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d5-4V2LVZYUDVthjlch3snMQJfRZLM\"",
		"mtime": "2026-08-10T14:02:55.266Z",
		"size": 469,
		"path": "../public/assets/admin.projects._projectId.edit-eg5NNpxK.js"
	},
	"/assets/admin.projects._projectId.index-1B8FAneH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25d-8gDRfMhA8caeM8hwLynbGNhMYGE\"",
		"mtime": "2026-08-10T14:02:55.266Z",
		"size": 605,
		"path": "../public/assets/admin.projects._projectId.index-1B8FAneH.js"
	},
	"/assets/admin.projects.index-kUVF9oQj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161e-bYuQc6ZacSone1dMinzjTV1vH/Y\"",
		"mtime": "2026-08-10T14:02:55.266Z",
		"size": 5662,
		"path": "../public/assets/admin.projects.index-kUVF9oQj.js"
	},
	"/assets/admin.dashboard-BqG-lyEO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-M1xBL8+CWOFLjBQeWRWUGQbk9Rw\"",
		"mtime": "2026-08-10T14:02:55.265Z",
		"size": 202,
		"path": "../public/assets/admin.dashboard-BqG-lyEO.js"
	},
	"/assets/admin.projects.new-CCbiOgcr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"177-dLZToiILHUMKDPt49I+LtVYvHzo\"",
		"mtime": "2026-08-10T14:02:55.266Z",
		"size": 375,
		"path": "../public/assets/admin.projects.new-CCbiOgcr.js"
	},
	"/assets/PieChart-DTgJYYTq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a988-Cc8quIEjELEuOntUlWnsHmVmjv8\"",
		"mtime": "2026-08-10T14:02:55.264Z",
		"size": 371080,
		"path": "../public/assets/PieChart-DTgJYYTq.js"
	},
	"/assets/admin.reports-Dy12Hns9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eec-zaOB6oN6cCyivGmeicrnP0c4nYY\"",
		"mtime": "2026-08-10T14:02:55.266Z",
		"size": 3820,
		"path": "../public/assets/admin.reports-Dy12Hns9.js"
	},
	"/assets/admin.settings-CZwZN1Ua.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29a6-oIvsMKP/GQKVNXhiX8JO+2hsVkc\"",
		"mtime": "2026-08-10T14:02:55.266Z",
		"size": 10662,
		"path": "../public/assets/admin.settings-CZwZN1Ua.js"
	},
	"/assets/admin.team-DSPtal1b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"adc-f/RSbnK/797h4klVraCyhEOL0Z0\"",
		"mtime": "2026-08-10T14:02:55.266Z",
		"size": 2780,
		"path": "../public/assets/admin.team-DSPtal1b.js"
	},
	"/assets/admin.tickets._ticketId-B7A0aB58.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"171-tn7jqX4HcmkOa4G/VY10+0/QIWg\"",
		"mtime": "2026-08-10T14:02:55.267Z",
		"size": 369,
		"path": "../public/assets/admin.tickets._ticketId-B7A0aB58.js"
	},
	"/assets/admin.tickets.index-B0KSOSie.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1a-1h47N5vquGT8DjNDxUM3Ezo9YKA\"",
		"mtime": "2026-08-10T14:02:55.267Z",
		"size": 7194,
		"path": "../public/assets/admin.tickets.index-B0KSOSie.js"
	},
	"/assets/admin.tickets.new-C4A-EAs2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ba-sRJau/MaFcYg1VXZZ/F4fODu7qM\"",
		"mtime": "2026-08-10T14:02:55.267Z",
		"size": 442,
		"path": "../public/assets/admin.tickets.new-C4A-EAs2.js"
	},
	"/assets/admin.users._userId-DY_mZ7yx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-sIfIvuJse9tNVsZ1pTXczfQUxWU\"",
		"mtime": "2026-08-10T14:02:55.267Z",
		"size": 138,
		"path": "../public/assets/admin.users._userId-DY_mZ7yx.js"
	},
	"/assets/admin.users._userId.edit-BNfFI8ur.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1-PDTC3whRV0p9wueg1pCe5mnVajI\"",
		"mtime": "2026-08-10T14:02:55.267Z",
		"size": 449,
		"path": "../public/assets/admin.users._userId.edit-BNfFI8ur.js"
	},
	"/assets/admin.users._userId.index-D5HVZVNx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d9a-OqNK/k+O4Hh7y+qHp6Mbb9thTwI\"",
		"mtime": "2026-08-10T14:02:55.267Z",
		"size": 7578,
		"path": "../public/assets/admin.users._userId.index-D5HVZVNx.js"
	},
	"/assets/admin.users.index-BveiEPHC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17af-pKnIB1ILVOWuQ7Lu0H+ZWyW6Ikc\"",
		"mtime": "2026-08-10T14:02:55.268Z",
		"size": 6063,
		"path": "../public/assets/admin.users.index-BveiEPHC.js"
	},
	"/assets/admin.users.new-Ch3EZjBk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16c-FmkVH30M90hKR7YgPi97KNt4zbk\"",
		"mtime": "2026-08-10T14:02:55.268Z",
		"size": 364,
		"path": "../public/assets/admin.users.new-Ch3EZjBk.js"
	},
	"/assets/arrow-left-CUFpx9I5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-Kj1fPFlbcrezUUQicx8TMp8i0lk\"",
		"mtime": "2026-08-10T14:02:55.268Z",
		"size": 155,
		"path": "../public/assets/arrow-left-CUFpx9I5.js"
	},
	"/assets/alert-CpfBUclX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d9-y6ZeX+qoBrAQpCcArcf7w/MBZYk\"",
		"mtime": "2026-08-10T14:02:55.268Z",
		"size": 985,
		"path": "../public/assets/alert-CpfBUclX.js"
	},
	"/assets/badge-urbeYOud.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"342-Nbj1UG4ytiY2ONaJNEcutoWFLwA\"",
		"mtime": "2026-08-10T14:02:55.268Z",
		"size": 834,
		"path": "../public/assets/badge-urbeYOud.js"
	},
	"/assets/button-DZcdxMSz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a96e-i3HQvEkYjAul6Kc41bdBV+grtIY\"",
		"mtime": "2026-08-10T14:02:55.268Z",
		"size": 108910,
		"path": "../public/assets/button-DZcdxMSz.js"
	},
	"/assets/categories-BxFncTkZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"149-g/Eg/r4tfqfLhchoUNku19aH1s4\"",
		"mtime": "2026-08-10T14:02:55.268Z",
		"size": 329,
		"path": "../public/assets/categories-BxFncTkZ.js"
	},
	"/assets/change-password-CPL7ms44.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e4-9XQYjvdYrjFZj+h245nBLCPPt1Y\"",
		"mtime": "2026-08-10T14:02:55.268Z",
		"size": 2276,
		"path": "../public/assets/change-password-CPL7ms44.js"
	},
	"/assets/client.dashboard-DFomcn2v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-49KcB1YIMKOkqeJ/2x7+4tdiews\"",
		"mtime": "2026-08-10T14:02:55.268Z",
		"size": 202,
		"path": "../public/assets/client.dashboard-DFomcn2v.js"
	},
	"/assets/create-ticket-form-CERAUDe1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ab9-nhmrx4nK+2FBvvyfs+NTul3NT7E\"",
		"mtime": "2026-08-10T14:02:55.269Z",
		"size": 6841,
		"path": "../public/assets/create-ticket-form-CERAUDe1.js"
	},
	"/assets/customer-form-sheet-BSY_uzTs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166a-WmbO9YR8LZfc696SFIeeXZlXVXE\"",
		"mtime": "2026-08-10T14:02:55.269Z",
		"size": 5738,
		"path": "../public/assets/customer-form-sheet-BSY_uzTs.js"
	},
	"/assets/dist-CcAbA0Ub.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"997-1j9+t3mwLM0OYsON6YT4AIW+A/I\"",
		"mtime": "2026-08-10T14:02:55.269Z",
		"size": 2455,
		"path": "../public/assets/dist-CcAbA0Ub.js"
	},
	"/assets/dialog-DJhJhsPL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"859-RuRUyO6nVnHYVrK4/WHA6yk9Yw0\"",
		"mtime": "2026-08-10T14:02:55.269Z",
		"size": 2137,
		"path": "../public/assets/dialog-DJhJhsPL.js"
	},
	"/assets/eye-CB-zBs96.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-TTqOOwvRG7l6bHx7MtaAKcmclhA\"",
		"mtime": "2026-08-10T14:02:55.270Z",
		"size": 246,
		"path": "../public/assets/eye-CB-zBs96.js"
	},
	"/assets/dist-DB0D2Skk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"219c-c29SJvZ8OdNCE8i5XWZB3ysqFus\"",
		"mtime": "2026-08-10T14:02:55.269Z",
		"size": 8604,
		"path": "../public/assets/dist-DB0D2Skk.js"
	},
	"/assets/forgot-password-D07MYgkF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b78-arWzYWLZVeVZcGmG3kc54zngDKg\"",
		"mtime": "2026-08-10T14:02:55.270Z",
		"size": 2936,
		"path": "../public/assets/forgot-password-D07MYgkF.js"
	},
	"/assets/form-sheet-B9Xi8mYl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25c-cCqip6kEia6twEp/zXvRw8+nkp4\"",
		"mtime": "2026-08-10T14:02:55.270Z",
		"size": 604,
		"path": "../public/assets/form-sheet-B9Xi8mYl.js"
	},
	"/assets/form-validation-Dm4og1pf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e59d-u8KmSmMeyDBigbhdcY2aVODpC20\"",
		"mtime": "2026-08-10T14:02:55.270Z",
		"size": 58781,
		"path": "../public/assets/form-validation-Dm4og1pf.js"
	},
	"/assets/guard-CFa2CXgB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e07-jg/9l6Vv0/u4y+f2fFxGt9w9Rb4\"",
		"mtime": "2026-08-10T14:02:55.270Z",
		"size": 40455,
		"path": "../public/assets/guard-CFa2CXgB.js"
	},
	"/assets/form-actions-kW4G9Fe4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-dfe1BE5lVoGeJ7ZaLhthjb1uoFY\"",
		"mtime": "2026-08-10T14:02:55.270Z",
		"size": 465,
		"path": "../public/assets/form-actions-kW4G9Fe4.js"
	},
	"/assets/help-D7vcbG9a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a82-DnaDHEFEFslVFixZ8qryjHw2Iuw\"",
		"mtime": "2026-08-10T14:02:55.270Z",
		"size": 6786,
		"path": "../public/assets/help-D7vcbG9a.js"
	},
	"/assets/input-DQ9rQj0w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f4-g8TRmfYk1EpxfzzADc4jmshcAfU\"",
		"mtime": "2026-08-10T14:02:55.270Z",
		"size": 756,
		"path": "../public/assets/input-DQ9rQj0w.js"
	},
	"/assets/internal-user-form-sheet-CbUpIJZ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"222f-vLGgpzxfeIX1z5KPYp5XCFL6bos\"",
		"mtime": "2026-08-10T14:02:55.271Z",
		"size": 8751,
		"path": "../public/assets/internal-user-form-sheet-CbUpIJZ-.js"
	},
	"/assets/internal-users-COxULkQW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e6-7xgXORbCO0ihxkqr+6EbPsqoyQc\"",
		"mtime": "2026-08-10T14:02:55.271Z",
		"size": 1254,
		"path": "../public/assets/internal-users-COxULkQW.js"
	},
	"/assets/label-aK6Wohke.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf-6MafJ8pjfptqGXQ3yNdRksgdrBM\"",
		"mtime": "2026-08-10T14:02:55.271Z",
		"size": 703,
		"path": "../public/assets/label-aK6Wohke.js"
	},
	"/assets/life-buoy-DF18raJ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"173-EF9lA5XwcZ6n9ShyeCsl4LrWuUg\"",
		"mtime": "2026-08-10T14:02:55.271Z",
		"size": 371,
		"path": "../public/assets/life-buoy-DF18raJ-.js"
	},
	"/assets/listing-page-BexVNONP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1395-kY1SoqF2cDqxVlRSZH3etdvpqpE\"",
		"mtime": "2026-08-10T14:02:55.271Z",
		"size": 5013,
		"path": "../public/assets/listing-page-BexVNONP.js"
	},
	"/assets/lock-TU4h0s3-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-IPjECCn4dBcvIqm3DMQoGWOpQK0\"",
		"mtime": "2026-08-10T14:02:55.271Z",
		"size": 196,
		"path": "../public/assets/lock-TU4h0s3-.js"
	},
	"/assets/matchContext-DTZFKhir.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-lpFtWSP7wkat+o/AZgvewty03oE\"",
		"mtime": "2026-08-10T14:02:55.271Z",
		"size": 139,
		"path": "../public/assets/matchContext-DTZFKhir.js"
	},
	"/assets/notifications-panel-5ntCNURx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56f-E4bT3XR1AdcHXucWoLlqVeulzew\"",
		"mtime": "2026-08-10T14:02:55.271Z",
		"size": 1391,
		"path": "../public/assets/notifications-panel-5ntCNURx.js"
	},
	"/assets/pencil-ANNZgt_T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a-xPWq4Jvn5C6O+2Z5zq9uzzgOPkU\"",
		"mtime": "2026-08-10T14:02:55.272Z",
		"size": 266,
		"path": "../public/assets/pencil-ANNZgt_T.js"
	},
	"/assets/portal.index-DcGRik4g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93e-J+f6GnhekeDkM5J19NTH9F5OQhA\"",
		"mtime": "2026-08-10T14:02:55.272Z",
		"size": 2366,
		"path": "../public/assets/portal.index-DcGRik4g.js"
	},
	"/assets/portal.notifications-DNK_73mq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-Pb19BrGtyACVzp+VNu68vf0iYi0\"",
		"mtime": "2026-08-10T14:02:55.272Z",
		"size": 233,
		"path": "../public/assets/portal.notifications-DNK_73mq.js"
	},
	"/assets/portal.projects._projectId-CsRf50TH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16d-bngcvtI/ICYaQyzuNbZSisVFOm0\"",
		"mtime": "2026-08-10T14:02:55.272Z",
		"size": 365,
		"path": "../public/assets/portal.projects._projectId-CsRf50TH.js"
	},
	"/assets/portal.tickets._ticketId-D66xcr2E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16b-0LExiI6rUq/+EQzBUIyesZNCwgA\"",
		"mtime": "2026-08-10T14:02:55.272Z",
		"size": 363,
		"path": "../public/assets/portal.tickets._ticketId-D66xcr2E.js"
	},
	"/assets/portal.projects.index-mQ2uumuS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be2-xXrqgkcqz2Dg8W6G0sc/skUCy0Q\"",
		"mtime": "2026-08-10T14:02:55.272Z",
		"size": 3042,
		"path": "../public/assets/portal.projects.index-mQ2uumuS.js"
	},
	"/assets/portal.tickets.index-Da29l2VH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac1-q9K4CQuGhwlcf04FSUChBi61Ysw\"",
		"mtime": "2026-08-10T14:02:55.273Z",
		"size": 2753,
		"path": "../public/assets/portal.tickets.index-Da29l2VH.js"
	},
	"/assets/portal.tickets.new-Vd6bdkMM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b9-0s52R0WTt55bvx25uMyQu33+NbU\"",
		"mtime": "2026-08-10T14:02:55.273Z",
		"size": 441,
		"path": "../public/assets/portal.tickets.new-Vd6bdkMM.js"
	},
	"/assets/index-CJvM7YzO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6fe20-EO2v5F5W9ymmLUrgSnTgC8DbfE0\"",
		"mtime": "2026-08-10T14:02:55.263Z",
		"size": 458272,
		"path": "../public/assets/index-CJvM7YzO.js"
	},
	"/assets/profile-CbWCY2gC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12ff-Y6c/cvVYwOlbP0jZL9MKx5ydxcs\"",
		"mtime": "2026-08-10T14:02:55.273Z",
		"size": 4863,
		"path": "../public/assets/profile-CbWCY2gC.js"
	},
	"/assets/password-5uTg1OR0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d75-wmOaPoYVa2vYL4VKH3xxLvf2oL8\"",
		"mtime": "2026-08-10T14:02:55.272Z",
		"size": 3445,
		"path": "../public/assets/password-5uTg1OR0.js"
	},
	"/assets/project-form-sheet-vhqMB_6k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b5c-5ldGb9vQuKUBP/m9PQ21aCEVx4w\"",
		"mtime": "2026-08-10T14:02:55.273Z",
		"size": 7004,
		"path": "../public/assets/project-form-sheet-vhqMB_6k.js"
	},
	"/assets/project-overview-fQ1Xvui_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c30-D/R/wmJj0GoWZF/jmoYug3t9FDo\"",
		"mtime": "2026-08-10T14:02:55.273Z",
		"size": 19504,
		"path": "../public/assets/project-overview-fQ1Xvui_.js"
	},
	"/assets/projects-D6gGOWKx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"396-HjVXuPiny0KbeejaBCJFxE8le6c\"",
		"mtime": "2026-08-10T14:02:55.273Z",
		"size": 918,
		"path": "../public/assets/projects-D6gGOWKx.js"
	},
	"/assets/reset-password-DZj4u1Be.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9eb-vDyJL49CxuTR7sqIzQ71xyNJOyg\"",
		"mtime": "2026-08-10T14:02:55.274Z",
		"size": 2539,
		"path": "../public/assets/reset-password-DZj4u1Be.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-10T14:02:55.274Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/routes-6pVq2btY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"278d-OWaICMS79dPr+dlkwfa7xbzQvCo\"",
		"mtime": "2026-08-10T14:02:55.274Z",
		"size": 10125,
		"path": "../public/assets/routes-6pVq2btY.js"
	},
	"/assets/staff.dashboard-DjcaHTKJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-AR5Z3ZapkUdtdP82Pak9ixai+fI\"",
		"mtime": "2026-08-10T14:02:55.274Z",
		"size": 202,
		"path": "../public/assets/staff.dashboard-DjcaHTKJ.js"
	},
	"/assets/store-BzYlmZsL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"187f7-aN95goRPsr6v7j+iaHOw4OlwH+8\"",
		"mtime": "2026-08-10T14:02:55.275Z",
		"size": 100343,
		"path": "../public/assets/store-BzYlmZsL.js"
	},
	"/assets/styles-D_qf4L0I.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1794b-BEvPkNAERLiPmr+XZgplce7Yx9M\"",
		"mtime": "2026-08-10T14:02:55.276Z",
		"size": 96587,
		"path": "../public/assets/styles-D_qf4L0I.css"
	},
	"/assets/tabs-D5vKU7m6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1317-ZXHyDySomub1QUjyQ08nctKQnJU\"",
		"mtime": "2026-08-10T14:02:55.275Z",
		"size": 4887,
		"path": "../public/assets/tabs-D5vKU7m6.js"
	},
	"/assets/textarea-CRMOtmsV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"239-vTmUj3JbKNsaThUJOvLePCux82o\"",
		"mtime": "2026-08-10T14:02:55.275Z",
		"size": 569,
		"path": "../public/assets/textarea-CRMOtmsV.js"
	},
	"/assets/ticket-form-sheet-CupaKh4s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23a-9nJhWMGgt7iDE9ieBHjIO3tahrA\"",
		"mtime": "2026-08-10T14:02:55.275Z",
		"size": 570,
		"path": "../public/assets/ticket-form-sheet-CupaKh4s.js"
	},
	"/assets/ticket-workspace-CIe0EYq2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"617f-yWFJ63jEDKl2rvhEYcDHdoEeEfM\"",
		"mtime": "2026-08-10T14:02:55.275Z",
		"size": 24959,
		"path": "../public/assets/ticket-workspace-CIe0EYq2.js"
	},
	"/assets/unauthorized-Lvr7MiCh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ce-j2Vxyv4UmK1Arsm/ElgHiWeaABI\"",
		"mtime": "2026-08-10T14:02:55.275Z",
		"size": 1230,
		"path": "../public/assets/unauthorized-Lvr7MiCh.js"
	},
	"/assets/useMutation-D6IU_H0k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8cf-H27/tzfoy22EbHJLutQNhbi2m4Q\"",
		"mtime": "2026-08-10T14:02:55.275Z",
		"size": 2255,
		"path": "../public/assets/useMutation-D6IU_H0k.js"
	},
	"/assets/useStore-Bwb3bsWW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2997-tM3Bn2oYmzvLjMZgSfC/ZEWAcy0\"",
		"mtime": "2026-08-10T14:02:55.276Z",
		"size": 10647,
		"path": "../public/assets/useStore-Bwb3bsWW.js"
	},
	"/assets/user-D1zkh9es.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba-0g3sFap1HN85NdPb5sSxbzN/4gQ\"",
		"mtime": "2026-08-10T14:02:55.276Z",
		"size": 186,
		"path": "../public/assets/user-D1zkh9es.js"
	},
	"/assets/user-x-CtZpz3Tn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-Rd6cz/fAEWKC/IB3aOOjWaa+Y/U\"",
		"mtime": "2026-08-10T14:02:55.276Z",
		"size": 636,
		"path": "../public/assets/user-x-CtZpz3Tn.js"
	},
	"/assets/users-DeSJUzl9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb-93oaqe8Hbo9HNBDwIEcIK9Can2U\"",
		"mtime": "2026-08-10T14:02:55.276Z",
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
