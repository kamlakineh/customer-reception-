/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/customers/[id]/route";
exports.ids = ["app/api/customers/[id]/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcustomers%2F%5Bid%5D%2Froute&page=%2Fapi%2Fcustomers%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcustomers%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Chp%5CDocuments%5Cpro%5Cthink%5Cmy-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Chp%5CDocuments%5Cpro%5Cthink%5Cmy-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcustomers%2F%5Bid%5D%2Froute&page=%2Fapi%2Fcustomers%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcustomers%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Chp%5CDocuments%5Cpro%5Cthink%5Cmy-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Chp%5CDocuments%5Cpro%5Cthink%5Cmy-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_hp_Documents_pro_think_my_app_app_api_customers_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/customers/[id]/route.ts */ \"(rsc)/./app/api/customers/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/customers/[id]/route\",\n        pathname: \"/api/customers/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/customers/[id]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\hp\\\\Documents\\\\pro\\\\think\\\\my-app\\\\app\\\\api\\\\customers\\\\[id]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_hp_Documents_pro_think_my_app_app_api_customers_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjdXN0b21lcnMlMkYlNUJpZCU1RCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGY3VzdG9tZXJzJTJGJTVCaWQlNUQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZjdXN0b21lcnMlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNocCU1Q0RvY3VtZW50cyU1Q3BybyU1Q3RoaW5rJTVDbXktYXBwJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNocCU1Q0RvY3VtZW50cyU1Q3BybyU1Q3RoaW5rJTVDbXktYXBwJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNpQztBQUM5RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcaHBcXFxcRG9jdW1lbnRzXFxcXHByb1xcXFx0aGlua1xcXFxteS1hcHBcXFxcYXBwXFxcXGFwaVxcXFxjdXN0b21lcnNcXFxcW2lkXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY3VzdG9tZXJzL1tpZF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jdXN0b21lcnMvW2lkXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvY3VzdG9tZXJzL1tpZF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxocFxcXFxEb2N1bWVudHNcXFxccHJvXFxcXHRoaW5rXFxcXG15LWFwcFxcXFxhcHBcXFxcYXBpXFxcXGN1c3RvbWVyc1xcXFxbaWRdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcustomers%2F%5Bid%5D%2Froute&page=%2Fapi%2Fcustomers%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcustomers%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Chp%5CDocuments%5Cpro%5Cthink%5Cmy-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Chp%5CDocuments%5Cpro%5Cthink%5Cmy-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/customers/[id]/route.ts":
/*!*****************************************!*\
  !*** ./app/api/customers/[id]/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabase */ \"(rsc)/./lib/supabase.ts\");\n\n\nasync function PATCH(req, { params }) {\n    const supabase = (0,_lib_supabase__WEBPACK_IMPORTED_MODULE_1__.getSupabase)();\n    const { id } = await params;\n    const body = await req.json();\n    const updateData = {};\n    if (body.name !== undefined) updateData.name = body.name;\n    if (body.phone !== undefined) updateData.phone = body.phone;\n    if (body.status !== undefined) updateData.status = body.status;\n    if (body.arrivalTime !== undefined) updateData.arrival_time = body.arrivalTime;\n    if (body.pain !== undefined) updateData.pain = body.pain;\n    const { data, error } = await supabase.from('customers').update(updateData).eq('id', id).select().single();\n    if (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Error updating customer\"\n        }, {\n            status: 500\n        });\n    }\n    const mapped = {\n        id: data.id,\n        companyId: data.company_id,\n        name: data.name,\n        phone: data.phone,\n        status: data.status,\n        arrivalTime: data.arrival_time,\n        pain: data.pain,\n        createdAt: data.created_at\n    };\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(mapped);\n}\nasync function DELETE(req, { params }) {\n    const supabase = (0,_lib_supabase__WEBPACK_IMPORTED_MODULE_1__.getSupabase)();\n    const { id } = await params;\n    const { error } = await supabase.from('customers').delete().eq('id', id);\n    if (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Error deleting customer\"\n        }, {\n            status: 500\n        });\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        message: \"Deleted\"\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2N1c3RvbWVycy9baWRdL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFDRTtBQUV0QyxlQUFlRSxNQUNwQkMsR0FBWSxFQUNaLEVBQUVDLE1BQU0sRUFBdUM7SUFFL0MsTUFBTUMsV0FBV0osMERBQVdBO0lBQzVCLE1BQU0sRUFBRUssRUFBRSxFQUFFLEdBQUcsTUFBTUY7SUFDckIsTUFBTUcsT0FBTyxNQUFNSixJQUFJSyxJQUFJO0lBRTNCLE1BQU1DLGFBQWtCLENBQUM7SUFDekIsSUFBSUYsS0FBS0csSUFBSSxLQUFLQyxXQUFXRixXQUFXQyxJQUFJLEdBQUdILEtBQUtHLElBQUk7SUFDeEQsSUFBSUgsS0FBS0ssS0FBSyxLQUFLRCxXQUFXRixXQUFXRyxLQUFLLEdBQUdMLEtBQUtLLEtBQUs7SUFDM0QsSUFBSUwsS0FBS00sTUFBTSxLQUFLRixXQUFXRixXQUFXSSxNQUFNLEdBQUdOLEtBQUtNLE1BQU07SUFDOUQsSUFBSU4sS0FBS08sV0FBVyxLQUFLSCxXQUFXRixXQUFXTSxZQUFZLEdBQUdSLEtBQUtPLFdBQVc7SUFDOUUsSUFBSVAsS0FBS1MsSUFBSSxLQUFLTCxXQUFXRixXQUFXTyxJQUFJLEdBQUdULEtBQUtTLElBQUk7SUFFeEQsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1iLFNBQzNCYyxJQUFJLENBQUMsYUFDTEMsTUFBTSxDQUFDWCxZQUNQWSxFQUFFLENBQUMsTUFBTWYsSUFDVGdCLE1BQU0sR0FDTkMsTUFBTTtJQUVULElBQUlMLE9BQU87UUFDVCxPQUFPbEIscURBQVlBLENBQUNRLElBQUksQ0FBQztZQUFFZ0IsU0FBUztRQUEwQixHQUFHO1lBQUVYLFFBQVE7UUFBSTtJQUNqRjtJQUVBLE1BQU1ZLFNBQVM7UUFDYm5CLElBQUlXLEtBQUtYLEVBQUU7UUFDWG9CLFdBQVdULEtBQUtVLFVBQVU7UUFDMUJqQixNQUFNTyxLQUFLUCxJQUFJO1FBQ2ZFLE9BQU9LLEtBQUtMLEtBQUs7UUFDakJDLFFBQVFJLEtBQUtKLE1BQU07UUFDbkJDLGFBQWFHLEtBQUtGLFlBQVk7UUFDOUJDLE1BQU1DLEtBQUtELElBQUk7UUFDZlksV0FBV1gsS0FBS1ksVUFBVTtJQUM1QjtJQUVBLE9BQU83QixxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDaUI7QUFDM0I7QUFFTyxlQUFlSyxPQUNwQjNCLEdBQVksRUFDWixFQUFFQyxNQUFNLEVBQXVDO0lBRS9DLE1BQU1DLFdBQVdKLDBEQUFXQTtJQUM1QixNQUFNLEVBQUVLLEVBQUUsRUFBRSxHQUFHLE1BQU1GO0lBRXJCLE1BQU0sRUFBRWMsS0FBSyxFQUFFLEdBQUcsTUFBTWIsU0FDckJjLElBQUksQ0FBQyxhQUNMWSxNQUFNLEdBQ05WLEVBQUUsQ0FBQyxNQUFNZjtJQUVaLElBQUlZLE9BQU87UUFDVCxPQUFPbEIscURBQVlBLENBQUNRLElBQUksQ0FBQztZQUFFZ0IsU0FBUztRQUEwQixHQUFHO1lBQUVYLFFBQVE7UUFBSTtJQUNqRjtJQUVBLE9BQU9iLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7UUFBRWdCLFNBQVM7SUFBVTtBQUNoRCIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxocFxcRG9jdW1lbnRzXFxwcm9cXHRoaW5rXFxteS1hcHBcXGFwcFxcYXBpXFxjdXN0b21lcnNcXFtpZF1cXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgZ2V0U3VwYWJhc2UgfSBmcm9tIFwiQC9saWIvc3VwYWJhc2VcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBBVENIKFxuICByZXE6IFJlcXVlc3QsXG4gIHsgcGFyYW1zIH06IHsgcGFyYW1zOiBQcm9taXNlPHsgaWQ6IHN0cmluZyB9PiB9XG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBnZXRTdXBhYmFzZSgpO1xuICBjb25zdCB7IGlkIH0gPSBhd2FpdCBwYXJhbXM7XG4gIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xuICBcbiAgY29uc3QgdXBkYXRlRGF0YTogYW55ID0ge307XG4gIGlmIChib2R5Lm5hbWUgIT09IHVuZGVmaW5lZCkgdXBkYXRlRGF0YS5uYW1lID0gYm9keS5uYW1lO1xuICBpZiAoYm9keS5waG9uZSAhPT0gdW5kZWZpbmVkKSB1cGRhdGVEYXRhLnBob25lID0gYm9keS5waG9uZTtcbiAgaWYgKGJvZHkuc3RhdHVzICE9PSB1bmRlZmluZWQpIHVwZGF0ZURhdGEuc3RhdHVzID0gYm9keS5zdGF0dXM7XG4gIGlmIChib2R5LmFycml2YWxUaW1lICE9PSB1bmRlZmluZWQpIHVwZGF0ZURhdGEuYXJyaXZhbF90aW1lID0gYm9keS5hcnJpdmFsVGltZTtcbiAgaWYgKGJvZHkucGFpbiAhPT0gdW5kZWZpbmVkKSB1cGRhdGVEYXRhLnBhaW4gPSBib2R5LnBhaW47XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbSgnY3VzdG9tZXJzJylcbiAgICAudXBkYXRlKHVwZGF0ZURhdGEpXG4gICAgLmVxKCdpZCcsIGlkKVxuICAgIC5zZWxlY3QoKVxuICAgIC5zaW5nbGUoKTtcblxuICBpZiAoZXJyb3IpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIkVycm9yIHVwZGF0aW5nIGN1c3RvbWVyXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxuXG4gIGNvbnN0IG1hcHBlZCA9IHtcbiAgICBpZDogZGF0YS5pZCxcbiAgICBjb21wYW55SWQ6IGRhdGEuY29tcGFueV9pZCxcbiAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgcGhvbmU6IGRhdGEucGhvbmUsXG4gICAgc3RhdHVzOiBkYXRhLnN0YXR1cyxcbiAgICBhcnJpdmFsVGltZTogZGF0YS5hcnJpdmFsX3RpbWUsXG4gICAgcGFpbjogZGF0YS5wYWluLFxuICAgIGNyZWF0ZWRBdDogZGF0YS5jcmVhdGVkX2F0XG4gIH07XG5cbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG1hcHBlZCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEUoXG4gIHJlcTogUmVxdWVzdCxcbiAgeyBwYXJhbXMgfTogeyBwYXJhbXM6IFByb21pc2U8eyBpZDogc3RyaW5nIH0+IH1cbikge1xuICBjb25zdCBzdXBhYmFzZSA9IGdldFN1cGFiYXNlKCk7XG4gIGNvbnN0IHsgaWQgfSA9IGF3YWl0IHBhcmFtcztcbiAgXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oJ2N1c3RvbWVycycpXG4gICAgLmRlbGV0ZSgpXG4gICAgLmVxKCdpZCcsIGlkKTtcblxuICBpZiAoZXJyb3IpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIkVycm9yIGRlbGV0aW5nIGN1c3RvbWVyXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxuXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiRGVsZXRlZFwiIH0pO1xufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFN1cGFiYXNlIiwiUEFUQ0giLCJyZXEiLCJwYXJhbXMiLCJzdXBhYmFzZSIsImlkIiwiYm9keSIsImpzb24iLCJ1cGRhdGVEYXRhIiwibmFtZSIsInVuZGVmaW5lZCIsInBob25lIiwic3RhdHVzIiwiYXJyaXZhbFRpbWUiLCJhcnJpdmFsX3RpbWUiLCJwYWluIiwiZGF0YSIsImVycm9yIiwiZnJvbSIsInVwZGF0ZSIsImVxIiwic2VsZWN0Iiwic2luZ2xlIiwibWVzc2FnZSIsIm1hcHBlZCIsImNvbXBhbnlJZCIsImNvbXBhbnlfaWQiLCJjcmVhdGVkQXQiLCJjcmVhdGVkX2F0IiwiREVMRVRFIiwiZGVsZXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/customers/[id]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase.ts":
/*!*************************!*\
  !*** ./lib/supabase.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSupabase: () => (/* binding */ getSupabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/index.mjs\");\n\nlet supabaseClient = null;\nconst getSupabase = ()=>{\n    if (!supabaseClient) {\n        const supabaseUrl = \"https://qecxablqupuoggbmwcib.supabase.co\";\n        const supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlY3hhYmxxdXB1b2dnYm13Y2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNjI0NjIsImV4cCI6MjA4OTczODQ2Mn0.jc0ZCvC9gAYK0y_Ozpx37dgLRkgDsYVXN9ccKahmlvA\";\n        if (!supabaseUrl || !supabaseAnonKey) {\n            throw new Error('Supabase configuration (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) is required.');\n        }\n        supabaseClient = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n    }\n    return supabaseClient;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBcUU7QUFFckUsSUFBSUMsaUJBQXdDO0FBRXJDLE1BQU1DLGNBQWM7SUFDekIsSUFBSSxDQUFDRCxnQkFBZ0I7UUFDbkIsTUFBTUUsY0FBY0MsMENBQW9DO1FBQ3hELE1BQU1HLGtCQUFrQkgsa05BQXlDO1FBRWpFLElBQUksQ0FBQ0QsZUFBZSxDQUFDSSxpQkFBaUI7WUFDcEMsTUFBTSxJQUFJRSxNQUFNO1FBQ2xCO1FBRUFSLGlCQUFpQkQsbUVBQVlBLENBQUNHLGFBQWFJO0lBQzdDO0lBQ0EsT0FBT047QUFDVCxFQUFFIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGhwXFxEb2N1bWVudHNcXHByb1xcdGhpbmtcXG15LWFwcFxcbGliXFxzdXBhYmFzZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQsIFN1cGFiYXNlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJztcblxubGV0IHN1cGFiYXNlQ2xpZW50OiBTdXBhYmFzZUNsaWVudCB8IG51bGwgPSBudWxsO1xuXG5leHBvcnQgY29uc3QgZ2V0U3VwYWJhc2UgPSAoKTogU3VwYWJhc2VDbGllbnQgPT4ge1xuICBpZiAoIXN1cGFiYXNlQ2xpZW50KSB7XG4gICAgY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkw7XG4gICAgY29uc3Qgc3VwYWJhc2VBbm9uS2V5ID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVk7XG5cbiAgICBpZiAoIXN1cGFiYXNlVXJsIHx8ICFzdXBhYmFzZUFub25LZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3VwYWJhc2UgY29uZmlndXJhdGlvbiAoTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIGFuZCBORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSkgaXMgcmVxdWlyZWQuJyk7XG4gICAgfVxuXG4gICAgc3VwYWJhc2VDbGllbnQgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSk7XG4gIH1cbiAgcmV0dXJuIHN1cGFiYXNlQ2xpZW50O1xufTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJzdXBhYmFzZUNsaWVudCIsImdldFN1cGFiYXNlIiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VBbm9uS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJFcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tslib","vendor-chunks/iceberg-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcustomers%2F%5Bid%5D%2Froute&page=%2Fapi%2Fcustomers%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcustomers%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Chp%5CDocuments%5Cpro%5Cthink%5Cmy-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Chp%5CDocuments%5Cpro%5Cthink%5Cmy-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();