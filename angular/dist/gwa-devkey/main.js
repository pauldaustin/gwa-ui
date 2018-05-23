(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../../../../Angular/revolsys-angular/dist/revolsys-angular-framework/fesm5/revolsys-angular-framework.js":
/*!*******************************************************************************************************************************!*\
  !*** /Users/paustin/Development/Angular/revolsys-angular/dist/revolsys-angular-framework/fesm5/revolsys-angular-framework.js ***!
  \*******************************************************************************************************************************/
/*! exports provided: AuthService, RoleGuard, BaseComponent, BaseDetailComponent, BaseListComponent, DeleteDialogComponent, LoginDialogComponent, MessageDialogComponent, PageNotFoundComponent, InputFileComponent, ArrayDataSource, BaseService, Config, RevolsysAngularFrameworkModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleGuard", function() { return RoleGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return BaseComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseDetailComponent", function() { return BaseDetailComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseListComponent", function() { return BaseListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteDialogComponent", function() { return DeleteDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginDialogComponent", function() { return LoginDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageDialogComponent", function() { return MessageDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNotFoundComponent", function() { return PageNotFoundComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputFileComponent", function() { return InputFileComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayDataSource", function() { return ArrayDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseService", function() { return BaseService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RevolsysAngularFrameworkModule", function() { return RevolsysAngularFrameworkModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../../../../Angular/revolsys-angular/node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "../../../../../Angular/revolsys-angular/node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../../Angular/revolsys-angular/dist/revolsys-angular-framework/node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../../../../Angular/revolsys-angular/node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../../../../Angular/revolsys-angular/node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "../../../../../Angular/revolsys-angular/node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "../../../../../Angular/revolsys-angular/node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "../../../../../Angular/revolsys-angular/node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "../../../../../Angular/revolsys-angular/node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "../../../../../Angular/revolsys-angular/node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/table */ "../../../../../Angular/revolsys-angular/node_modules/@angular/cdk/esm5/table.es5.js");












/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Config = /** @class */ (function () {
    function Config(title, basePath) {
        if (basePath === void 0) { basePath = ''; }
        this.title = title;
        this.basePath = basePath;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    Config.prototype.getUrl = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return window.location.protocol + '//' + window.location.host + this.basePath + path;
    };
    return Config;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LoginDialogComponent = /** @class */ (function () {
    function LoginDialogComponent(config, dialogRef, data) {
        this.config = config;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    /**
     * @return {?}
     */
    LoginDialogComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.login();
    };
    /**
     * @return {?}
     */
    LoginDialogComponent.prototype.login = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ window = document.defaultView;
        if (this.loginWindow && !this.loginWindow.closed) {
            this.loginWindow.focus();
        }
        else {
            var /** @type {?} */ width = window.outerWidth * 0.9;
            if (width > 800) {
                width = 800;
            }
            var /** @type {?} */ x = window.outerWidth / 2 + window.screenX - (width / 2);
            var /** @type {?} */ y = window.outerHeight / 2 + window.screenY - (300);
            this.loginWindow = window.open(this.config.getUrl('/login/window'), 'gwaLogin', "menubar=no,location=no,status=no,left=" + x + ",top=" + y + ",width=" + width + ",height=600");
        }
        if (this.loginWindow) {
            var /** @type {?} */ listener_1 = function (event) {
                if (event.data === 'close') {
                    _this.dialogRef.close('Login');
                    if (_this.loginWindow) {
                        _this.loginWindow.close();
                        _this.loginWindow = null;
                    }
                    window.removeEventListener('message', listener_1);
                }
            };
            window.addEventListener('message', listener_1);
        }
    };
    LoginDialogComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'raf-login-dialog',
                    template: "\n<h1 mat-dialog-title>Login</h1>\n<div mat-dialog-content>\n  <p>You must be logged in to access this application. Click the Login button to open the login window.</p>\n  <p><b>NOTE:</b> Web browsers may block automated pop-up windows.<br />Allow popups for this site in your\nweb browser to open to allow the login popup.</p>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"login()\" color=\"primary\">Login</button>\n</div>\n  ",
                },] },
    ];
    /** @nocollapse */
    LoginDialogComponent.ctorParameters = function () { return [
        { type: Config, },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"],] },] },
    ]; };
    return LoginDialogComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MessageDialogComponent = /** @class */ (function () {
    function MessageDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.title = this.data['title'];
        this.message = this.data['message'];
        this.body = this.data['body'];
    }
    MessageDialogComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'raf-message-dialog',
                    template: "\n<h1 mat-dialog-title>{{title}}</h1>\n<div mat-dialog-content>\n<p>{{message}}<p>\n<pre>{{body}}</pre>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"dialogRef.close()\" color=\"primary\">Close</button>\n</div>\n  ",
                },] },
    ];
    /** @nocollapse */
    MessageDialogComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"],] },] },
    ]; };
    return MessageDialogComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
var BaseService = /** @class */ (function () {
    function BaseService(injector) {
        this.injector = injector;
        this.idFieldName = 'id';
        this.pathParamName = 'id';
        this.usePostForDelete = true;
        this.jsonHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpHeaders"]({ 'Content-Type': 'application/json' });
        this.config = injector.get(Config);
        this.document = injector.get(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"]);
        this.http = injector.get(_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"]);
        this.location = injector.get(_angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"]);
        this.dialog = injector.get(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]);
    }
    /**
     * @param {?} object
     * @param {?=} path
     * @return {?}
     */
    BaseService.prototype.addObject = /**
     * @param {?} object
     * @param {?=} path
     * @return {?}
     */
    function (object, path) {
        if (!path) {
            path = this.path;
        }
        return this.addObjectDo(path, object);
    };
    /**
     * @template R
     * @param {?} request
     * @param {?} handler
     * @return {?}
     */
    BaseService.prototype.httpRequest = /**
     * @template R
     * @param {?} request
     * @param {?} handler
     * @return {?}
     */
    function (request, handler) {
        var _this = this;
        var /** @type {?} */ response = request(this.http);
        return response.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(handler), //
        //
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) {
            if (error.status === 403) {
                var /** @type {?} */ loginDialog = BaseService.loginDialog;
                if (loginDialog) {
                    loginDialog.componentInstance.login();
                }
                else {
                    loginDialog = _this.dialog.open(LoginDialogComponent, {
                        disableClose: true
                    });
                    BaseService.loginDialog = loginDialog;
                    loginDialog.afterClosed().subscribe(function (dialogResponse) {
                        BaseService.loginDialog = null;
                    });
                }
                loginDialog.afterClosed().subscribe(function (dialogResponse) {
                    if (dialogResponse === 'Login') {
                        return _this.httpRequest(request, handler);
                    }
                    else {
                        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])('Not logged in');
                    }
                });
            }
            else if (error.status === 404) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(null);
            }
            else {
                _this.showError(error.message);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(error.message);
            }
        }));
    };
    /**
     * @param {?} path
     * @param {?} object
     * @param {?=} callback
     * @return {?}
     */
    BaseService.prototype.addObjectDo = /**
     * @param {?} path
     * @param {?} object
     * @param {?=} callback
     * @return {?}
     */
    function (path, object, callback) {
        var _this = this;
        var /** @type {?} */ url = this.getUrl(path);
        var /** @type {?} */ jsonText = JSON.stringify(object);
        return this.httpRequest(function (http) {
            return http.post(url, jsonText, { headers: _this.jsonHeaders });
        }, function (json) {
            if (json.error) {
                _this.showError(json.error, json.body);
                return null;
            }
            else {
                Object.assign(object, json);
                if (callback) {
                    callback();
                }
                return object;
            }
        });
    };
    /**
     * @param {?} object
     * @return {?}
     */
    BaseService.prototype.addOrUpdateObject = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        if (object == null) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(object);
        }
        else if (object[this.idFieldName]) {
            return this.updateObject(object);
        }
        else {
            return this.addObject(object);
        }
    };
    /**
     * @param {?} message
     * @param {?=} body
     * @return {?}
     */
    BaseService.prototype.showError = /**
     * @param {?} message
     * @param {?=} body
     * @return {?}
     */
    function (message, body) {
        var /** @type {?} */ dialogRef = this.dialog.open(MessageDialogComponent, {
            data: {
                title: 'Error',
                message: message,
                body: body,
            }
        });
    };
    /**
     * @param {?} path
     * @return {?}
     */
    BaseService.prototype.getUrl = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return this.config.getUrl('/rest' + path);
    };
    /**
     * @param {?} object
     * @param {?=} path
     * @return {?}
     */
    BaseService.prototype.deleteObject = /**
     * @param {?} object
     * @param {?=} path
     * @return {?}
     */
    function (object, path) {
        return null;
    };
    /**
     * @param {?} path
     * @param {?=} callback
     * @param {?=} parameters
     * @return {?}
     */
    BaseService.prototype.deleteObjectDo = /**
     * @param {?} path
     * @param {?=} callback
     * @param {?=} parameters
     * @return {?}
     */
    function (path, callback, parameters) {
        var _this = this;
        var /** @type {?} */ params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpParams"]();
        if (parameters) {
            try {
                for (var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__values"])(Object.keys(parameters)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var name_1 = _b.value;
                    params.set(name_1, parameters[name_1]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var /** @type {?} */ url = this.getUrl(path);
        var /** @type {?} */ handler = function (httpResponse) {
            var /** @type {?} */ json = httpResponse.json();
            if (json.error) {
                _this.showError(json.error, json.body);
                return false;
            }
            else {
                var /** @type {?} */ deleted = json.deleted === true;
                if (callback) {
                    callback(deleted);
                }
                return deleted;
            }
        };
        if (this.usePostForDelete) {
            return this.httpRequest(function (http) {
                return http.post(url, '', {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-HTTP-Method-Override': 'DELETE'
                    },
                    params: params
                });
            }, handler);
        }
        else {
            return this.httpRequest(function (http) {
                return http.delete(url, {
                    headers: _this.jsonHeaders,
                    params: params
                });
            }, handler);
        }
        var e_1, _c;
    };
    /**
     * @param {?} object
     * @return {?}
     */
    BaseService.prototype.getLabel = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        var /** @type {?} */ fieldNames;
        if (this.labelFieldName) {
            fieldNames = this.labelFieldName.split('.');
        }
        else {
            fieldNames = [this.idFieldName];
        }
        var /** @type {?} */ value = object;
        try {
            for (var fieldNames_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__values"])(fieldNames), fieldNames_1_1 = fieldNames_1.next(); !fieldNames_1_1.done; fieldNames_1_1 = fieldNames_1.next()) {
                var fieldName = fieldNames_1_1.value;
                if (value == null) {
                    return null;
                }
                else {
                    value = value[fieldName];
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (fieldNames_1_1 && !fieldNames_1_1.done && (_a = fieldNames_1.return)) _a.call(fieldNames_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return value;
        var e_2, _a;
    };
    /**
     * @param {?} id
     * @param {?=} values
     * @return {?}
     */
    BaseService.prototype.getObject = /**
     * @param {?} id
     * @param {?=} values
     * @return {?}
     */
    function (id, values) {
        return this.getObjectDo(this.path + '/' + id, values);
    };
    /**
     * @param {?} path
     * @param {?=} values
     * @return {?}
     */
    BaseService.prototype.getObjectDo = /**
     * @param {?} path
     * @param {?=} values
     * @return {?}
     */
    function (path, values) {
        var _this = this;
        var /** @type {?} */ url = this.getUrl(path);
        return this.httpRequest(function (http) {
            return http.get(url);
        }, function (json) {
            if (json.error) {
                _this.showError(json.error, json.body);
                return null;
            }
            else {
                var /** @type {?} */ object = _this.toObject(json);
                if (values) {
                    try {
                        for (var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__values"])(Object.keys(values)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var key = _b.value;
                            object[key] = values[key];
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
                return object;
            }
            var e_3, _c;
        });
    };
    /**
     * @param {?} path
     * @param {?} filter
     * @return {?}
     */
    BaseService.prototype.getObjects = /**
     * @param {?} path
     * @param {?} filter
     * @return {?}
     */
    function (path, filter) {
        if (!path) {
            path = this.path;
        }
        return this.getObjectsDo(path, filter);
    };
    /**
     * @param {?} path
     * @param {?} filter
     * @return {?}
     */
    BaseService.prototype.getObjectsDo = /**
     * @param {?} path
     * @param {?} filter
     * @return {?}
     */
    function (path, filter) {
        var _this = this;
        var /** @type {?} */ params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpParams"]();
        this.addFilterParams(params, filter);
        var /** @type {?} */ url = this.getUrl(path);
        return this.httpRequest(function (http) {
            return http.get(url, {
                params: params
            });
        }, function (json) {
            return _this.getObjectsFromJson(json);
        });
    };
    /**
     * @param {?} json
     * @return {?}
     */
    BaseService.prototype.getObjectsFromJson = /**
     * @param {?} json
     * @return {?}
     */
    function (json) {
        var _this = this;
        var /** @type {?} */ objects = [];
        if (json.error) {
            this.showError(json.error, json.body);
        }
        else {
            var /** @type {?} */ data = json.data;
            if (data) {
                data.forEach(function (recordJson) {
                    var /** @type {?} */ record = _this.toObject(recordJson);
                    objects.push(record);
                });
            }
        }
        return objects;
    };
    /**
     * @return {?}
     */
    BaseService.prototype.getPath = /**
     * @return {?}
     */
    function () {
        return this.path;
    };
    /**
     * @param {?} params
     * @param {?} filter
     * @return {?}
     */
    BaseService.prototype.addFilterParams = /**
     * @param {?} params
     * @param {?} filter
     * @return {?}
     */
    function (params, filter) {
        if (filter) {
            try {
                for (var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__values"])(Object.keys(filter)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var fieldName = _b.value;
                    var /** @type {?} */ value = filter[fieldName];
                    params.append('filterFieldName', fieldName);
                    params.append('filterValue', value);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        var e_4, _c;
    };
    /**
     * @param {?} offset
     * @param {?} limit
     * @param {?} path
     * @param {?} filter
     * @return {?}
     */
    BaseService.prototype.getRowsPage = /**
     * @param {?} offset
     * @param {?} limit
     * @param {?} path
     * @param {?} filter
     * @return {?}
     */
    function (offset, limit, path, filter) {
        var _this = this;
        var /** @type {?} */ params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpParams"]();
        params.set('offset', offset.toString());
        params.set('limit', limit.toString());
        this.addFilterParams(params, filter);
        if (!path) {
            path = this.path;
        }
        var /** @type {?} */ url = this.getUrl(path);
        return this.httpRequest(function (http) {
            return http.get(url, {
                params: params
            });
        }, function (json) {
            var /** @type {?} */ rows = [];
            var /** @type {?} */ total = 0;
            if (json.error) {
                _this.showError(json.error, json.body);
                return null;
            }
            else {
                var /** @type {?} */ data = json.data;
                if (data) {
                    data.forEach(function (recordJson) {
                        var /** @type {?} */ record = _this.toObject(recordJson);
                        rows.push(record);
                    });
                    total = json.total;
                }
            }
            return {
                rows: rows,
                count: total
            };
        });
    };
    /**
     * @return {?}
     */
    BaseService.prototype.getTypeTitle = /**
     * @return {?}
     */
    function () {
        return this.typeTitle;
    };
    /**
     * @return {?}
     */
    BaseService.prototype.newObject = /**
     * @return {?}
     */
    function () {
        return null;
    };
    /**
     * @param {?} json
     * @return {?}
     */
    BaseService.prototype.toObject = /**
     * @param {?} json
     * @return {?}
     */
    function (json) {
        var /** @type {?} */ record = this.newObject();
        Object.assign(record, json);
        return record;
    };
    /**
     * @param {?} object
     * @return {?}
     */
    BaseService.prototype.updateObject = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        return null;
    };
    /**
     * @param {?} path
     * @param {?} object
     * @param {?=} callback
     * @return {?}
     */
    BaseService.prototype.updateObjectDo = /**
     * @param {?} path
     * @param {?} object
     * @param {?=} callback
     * @return {?}
     */
    function (path, object, callback) {
        var _this = this;
        var /** @type {?} */ url = this.getUrl(path);
        var /** @type {?} */ jsonText = JSON.stringify(object);
        return this.httpRequest(function (http) {
            return http.put(url, jsonText, { headers: _this.jsonHeaders });
        }, function (json) {
            if (json.error) {
                _this.showError(json.error, json.body);
                return null;
            }
            else {
                Object.assign(object, json);
                if (callback) {
                    callback();
                }
                return object;
            }
        });
    };
    BaseService.loginDialog = null;
    BaseService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    /** @nocollapse */
    BaseService.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], },
    ]; };
    return BaseService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AuthService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__extends"])(AuthService, _super);
    function AuthService(injector) {
        var _this = _super.call(this, injector) || this;
        var /** @type {?} */ url = _this.getUrl('/authentication');
        _this.httpRequest(function (http) {
            return http.get(url);
        }, function (json) {
            if (json.error) {
                _this.roles = [];
            }
            else {
                _this.roles = json.roles;
                _this.username = json.name;
            }
        });
        return _this;
    }
    /**
     * @param {?} role
     * @return {?}
     */
    AuthService.prototype.hasRole = /**
     * @param {?} role
     * @return {?}
     */
    function (role) {
        if (this.roles == null) {
            return false;
        }
        else {
            return this.roles.indexOf(role) !== -1;
        }
    };
    /**
     * @param {?} roles
     * @return {?}
     */
    AuthService.prototype.hasAnyRole = /**
     * @param {?} roles
     * @return {?}
     */
    function (roles) {
        if (this.roles == null) {
            return true;
        }
        else {
            try {
                for (var roles_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__values"])(roles), roles_1_1 = roles_1.next(); !roles_1_1.done; roles_1_1 = roles_1.next()) {
                    var role = roles_1_1.value;
                    if (this.roles.indexOf(role) !== -1) {
                        return true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (roles_1_1 && !roles_1_1.done && (_a = roles_1.return)) _a.call(roles_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return false;
        }
        var e_1, _a;
    };
    /**
     * @param {?} roles
     * @return {?}
     */
    AuthService.prototype.hasAnyRoleAsync = /**
     * @param {?} roles
     * @return {?}
     */
    function (roles) {
        var _this = this;
        if (this.roles == null) {
            var /** @type {?} */ url = this.getUrl('/authentication');
            return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (json) {
                if (json.error) {
                    _this.roles = [];
                }
                else {
                    _this.roles = json.roles;
                }
                return _this.hasAnyRole(roles);
            }));
        }
        else {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(this.hasAnyRole(roles));
        }
    };
    AuthService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], },
    ]; };
    return AuthService;
}(BaseService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RoleGuard = /** @class */ (function () {
    function RoleGuard(authService) {
        this.authService = authService;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    RoleGuard.prototype.canActivate = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        if (route.data) {
            var /** @type {?} */ roles = route.data['roles'];
            if (roles) {
                return this.authService.hasAnyRoleAsync(roles);
            }
        }
        return true;
    };
    RoleGuard.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    /** @nocollapse */
    RoleGuard.ctorParameters = function () { return [
        { type: AuthService, },
    ]; };
    return RoleGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
BaseComponent = /** @class */ (function () {
    function BaseComponent(injector, service, title) {
        this.injector = injector;
        this.service = service;
        this.title = title;
        this.authService = this.injector.get(AuthService);
        this.config = this.injector.get(Config);
        this.dialog = this.injector.get(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]);
        this.document = this.injector.get(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"]);
        this.location = this.injector.get(_angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"]);
        this.route = this.injector.get(_angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"]);
        this.router = this.injector.get(_angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"]);
        this.titleService = this.injector.get(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Title"]);
        if (this.title) {
            this.setTitle(this.title);
        }
    }
    /**
     * @return {?}
     */
    BaseComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.title) {
            this.titleService.setTitle(this.title);
        }
    };
    /**
     * @return {?}
     */
    BaseComponent.prototype.routeList = /**
     * @return {?}
     */
    function () {
        this.router.navigate(['..'], { relativeTo: this.route });
    };
    /**
     * @param {?} message
     * @param {?=} body
     * @return {?}
     */
    BaseComponent.prototype.showError = /**
     * @param {?} message
     * @param {?=} body
     * @return {?}
     */
    function (message, body) {
        var /** @type {?} */ dialogRef = this.dialog.open(MessageDialogComponent, {
            data: {
                title: 'Error',
                message: message,
                body: body,
            }
        });
    };
    /**
     * @param {?} path
     * @return {?}
     */
    BaseComponent.prototype.getUrl = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return this.config.getUrl('/rest' + path);
    };
    /**
     * @param {?} role
     * @return {?}
     */
    BaseComponent.prototype.hasRole = /**
     * @param {?} role
     * @return {?}
     */
    function (role) {
        return this.authService.hasRole(role);
    };
    Object.defineProperty(BaseComponent.prototype, "username", {
        get: /**
         * @return {?}
         */
        function () {
            return this.authService.username;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} title
     * @return {?}
     */
    BaseComponent.prototype.setTitle = /**
     * @param {?} title
     * @return {?}
     */
    function (title) {
        this.title = title;
        if (title) {
            this.titleService.setTitle(title);
        }
    };
    /**
     * @param {?} object
     * @return {?}
     */
    BaseComponent.prototype.stringValue = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        if (object) {
            if (Array.isArray(object)) {
                if (object.length > 0) {
                    return object.join();
                }
            }
            else {
                return object.toString();
            }
        }
        return '-';
    };
    /**
     * @param {?} index
     * @return {?}
     */
    BaseComponent.prototype.trackByIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index;
    };
    return BaseComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var BaseDetailComponent = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__extends"])(BaseDetailComponent, _super);
    function BaseDetailComponent(injector, service, title) {
        var _this = _super.call(this, injector, service, title) || this;
        _this.addPage = false;
        _this.idParamName = 'id';
        _this.initialized = false;
        _this.formBuilder = _this.injector.get(_angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormBuilder"]);
        return _this;
    }
    /**
     * @return {?}
     */
    BaseDetailComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.id = params[_this.idParamName];
            if (_this.id) {
                _this.service.getObject(_this.id) //
                    .subscribe(function (object) { return _this.setObject(object); });
            }
            else {
                var /** @type {?} */ object = _this.service.newObject();
                _this.setObject(object);
            }
        });
    };
    Object.defineProperty(BaseDetailComponent.prototype, "notFound", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.initialized) {
                return this.object === null;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} object
     * @return {?}
     */
    BaseDetailComponent.prototype.setObject = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        this.object = object;
        this.initialized = true;
    };
    /**
     * @param {?} savedObject
     * @return {?}
     */
    BaseDetailComponent.prototype.postSave = /**
     * @param {?} savedObject
     * @return {?}
     */
    function (savedObject) {
    };
    /**
     * @return {?}
     */
    BaseDetailComponent.prototype.saveDo = /**
     * @return {?}
     */
    function () {
        return this.service.addOrUpdateObject(this.object);
    };
    /**
     * @param {?} object
     * @param {?} form
     * @return {?}
     */
    BaseDetailComponent.prototype.saveValues = /**
     * @param {?} object
     * @param {?} form
     * @return {?}
     */
    function (object, form) {
        try {
            for (var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__values"])(Object.keys(form.value)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                var /** @type {?} */ value = form.value[key];
                object[key] = value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    /**
     * @param {?=} close
     * @return {?}
     */
    BaseDetailComponent.prototype.save = /**
     * @param {?=} close
     * @return {?}
     */
    function (close) {
        var _this = this;
        if (close === void 0) { close = true; }
        this.saveDo()
            .subscribe(function (savedObject) {
            if (savedObject != null) {
                _this.postSave(savedObject);
                if (close) {
                    _this.routeList();
                }
                else if (_this.addPage) {
                    _this.routeDetail();
                }
            }
        });
    };
    /**
     * @return {?}
     */
    BaseDetailComponent.prototype.routeDetail = /**
     * @return {?}
     */
    function () {
    };
    BaseDetailComponent.propDecorators = {
        "addPage": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return BaseDetailComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DeleteDialogComponent = /** @class */ (function () {
    function DeleteDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.typeTitle = this.data['typeTitle'];
        this.objectLabel = this.data['objectLabel'];
    }
    DeleteDialogComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'raf-delete-dialog',
                    template: "\n<h1 mat-dialog-title>Delete {{typeTitle}}?</h1>\n<div mat-dialog-content>\n  <p>Are you sure you want to delete {{typeTitle}}:</p>\n  <p><b>{{objectLabel}}</b>?</p>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"dialogRef.close('Cancel')\">Cancel</button>\n  <button mat-raised-button (click)=\"dialogRef.close('Delete')\" color=\"warn\" style=\"margin-left: 10px;\">Delete</button>\n</div>\n  ",
                },] },
    ];
    /** @nocollapse */
    DeleteDialogComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"],] },] },
    ]; };
    return DeleteDialogComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
ArrayDataSource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__extends"])(ArrayDataSource, _super);
    function ArrayDataSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataChange = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]([]);
        return _this;
    }
    /**
     * @return {?}
     */
    ArrayDataSource.prototype.connect = /**
     * @return {?}
     */
    function () {
        return this.dataChange;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ArrayDataSource.prototype.setData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (!data) {
            data = [];
        }
        this.dataChange.next(data);
    };
    /**
     * @return {?}
     */
    ArrayDataSource.prototype.disconnect = /**
     * @return {?}
     */
    function () {
    };
    Object.defineProperty(ArrayDataSource.prototype, "hasValues", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dataChange.value.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    return ArrayDataSource;
}(_angular_cdk_table__WEBPACK_IMPORTED_MODULE_10__["DataSource"]));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
BaseListComponent = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__extends"])(BaseListComponent, _super);
    function BaseListComponent(injector, service, title) {
        var _this = _super.call(this, injector, service, title) || this;
        _this.dataSource = new ArrayDataSource();
        _this.dialog = _this.injector.get(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]);
        _this.refreshingCount = 0;
        _this.rows = [];
        _this.count = 0;
        _this.hasRows = false;
        _this.offset = 0;
        _this.lastOffset = -1;
        _this.limit = 100;
        _this.filter = {};
        _this.paging = false;
        _this.cssClasses = {
            sortAscending: 'fa fa-chevron-down',
            sortDescending: 'fa fa-chevron-up',
            pagerLeftArrow: 'fa fa-chevron-left',
            pagerRightArrow: 'fa fa-chevron-right',
            pagerPrevious: 'fa fa-step-backward',
            pagerNext: 'fa fa-step-forward'
        };
        return _this;
    }
    /**
     * @return {?}
     */
    BaseListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.refresh();
    };
    /**
     * @return {?}
     */
    BaseListComponent.prototype.refresh = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.paging) {
            this.page(this.offset, this.limit);
        }
        else {
            this.refreshingCount++;
            var /** @type {?} */ filter = this.newFilter();
            this.service.getObjects(this.path, filter).subscribe(function (objects) {
                _this.setRows(objects);
                _this.refreshingCount--;
            });
        }
    };
    /**
     * @param {?} rows
     * @return {?}
     */
    BaseListComponent.prototype.setRows = /**
     * @param {?} rows
     * @return {?}
     */
    function (rows) {
        this.rows = rows;
        this.hasRows = rows.length > 0;
        this.dataSource.setData(rows);
    };
    /**
     * @param {?} object
     * @return {?}
     */
    BaseListComponent.prototype.deleteObject = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        var _this = this;
        var /** @type {?} */ dialogRef = this.dialog.open(DeleteDialogComponent, {
            data: {
                typeTitle: this.deleteRecordTitle || this.service.getTypeTitle(),
                objectLabel: this.service.getLabel(object),
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 'Delete') {
                _this.deleteObjectDo(object);
            }
        });
    };
    /**
     * @param {?} object
     * @return {?}
     */
    BaseListComponent.prototype.deleteObjectDo = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        var _this = this;
        this.service.deleteObject(object, this.path)
            .subscribe(function (deleted) {
            if (deleted) {
                _this.onDeleted(object);
            }
        });
    };
    /**
     * @param {?} object
     * @return {?}
     */
    BaseListComponent.prototype.onDeleted = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        if (this.paging) {
            this.refresh();
        }
        else {
            var /** @type {?} */ rows = this.rows.filter(function (row) { return row !== object; });
            this.setRows(rows);
        }
    };
    /**
     * @return {?}
     */
    BaseListComponent.prototype.getRows = /**
     * @return {?}
     */
    function () {
        return this.rows;
    };
    /**
     * @param {?} offset
     * @param {?} limit
     * @return {?}
     */
    BaseListComponent.prototype.page = /**
     * @param {?} offset
     * @param {?} limit
     * @return {?}
     */
    function (offset, limit) {
        var _this = this;
        this.refreshingCount++;
        this.fetch(offset, limit, function (results) {
            _this.refreshingCount--;
            if (results) {
                _this.count = results.count;
                _this.setRows(results.rows);
            }
        });
    };
    /**
     * @return {?}
     */
    BaseListComponent.prototype.newFilter = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ filter = {};
        if (this.filter) {
            try {
                for (var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__values"])(Object.keys(this.filter)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var fieldName = _b.value;
                    filter[fieldName] = this.filter[fieldName];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (this.filterFieldName) {
            filter[this.filterFieldName] = this.filterValue;
        }
        return filter;
        var e_1, _c;
    };
    /**
     * @param {?} offset
     * @param {?} limit
     * @param {?} callback
     * @return {?}
     */
    BaseListComponent.prototype.fetch = /**
     * @param {?} offset
     * @param {?} limit
     * @param {?} callback
     * @return {?}
     */
    function (offset, limit, callback) {
        var /** @type {?} */ filter = this.newFilter();
        this.service.getRowsPage(offset, limit, this.path, this.filter).subscribe(callback);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    BaseListComponent.prototype.onPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.lastOffset !== event.offset) {
            this.lastOffset = event.offset;
            this.page(event.offset, event.limit);
        }
    };
    return BaseListComponent;
}(BaseComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent(location) {
        this.location = location;
    }
    /**
     * @return {?}
     */
    PageNotFoundComponent.prototype.back = /**
     * @return {?}
     */
    function () {
        this.location.back();
    };
    PageNotFoundComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'raf-page-not-found',
                    template: "\n    <div class=\"error-box\">\n      <h1>404 Error</h1>\n      <p>I'm sorry the page you requested could not be found.</p>\n      <button  (click)=\"back()\" mat-raised-button color=\"warn\">\n        <span class=\"fa fa-chevron-left\" aria-hidden=\"true\"></span> Back\n      </button>\n    </div>\n  ",
                    styles: ["\n.error-box {\n  margin-top:10px;\n  padding: 10px;\n  color:#f44336;\n  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),\n              0 2px 2px 0 rgba(0,0,0,.14),\n              0 1px 5px 0 rgba(0,0,0,.12);\n}\n  "]
                },] },
    ];
    /** @nocollapse */
    PageNotFoundComponent.ctorParameters = function () { return [
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"], },
    ]; };
    return PageNotFoundComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var InputFileComponent = /** @class */ (function () {
    function InputFileComponent() {
        this.iconName = 'floppy-o';
        this.label = 'Choose File';
        this.onFileSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    InputFileComponent.prototype.onNativeInputFileSelect = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ files = event.srcElement.files;
        if (files.length === 0) {
            this.file = null;
            this.fileName = null;
        }
        else {
            this.file = files[0];
            this.fileName = this.file.name;
        }
        this.onFileSelect.emit(this.file);
    };
    /**
     * @return {?}
     */
    InputFileComponent.prototype.selectFile = /**
     * @return {?}
     */
    function () {
        this.nativeInputFile.nativeElement.click();
    };
    InputFileComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    'selector': 'raf-input-file',
                    'template': "\n<input [accept]=\"accept\" type=\"file\" (change)=\"onNativeInputFileSelect($event)\" #inputFile hidden />\n\n<mat-form-field>\n  <input matInput placeholder=\"File\" name=\"file\" [(ngModel)]=\"fileName\" disabled=\"true\" />\n</mat-form-field>\n \n<button type=\"button\" mat-raised-button (click)=\"selectFile()\">\n  <mat-icon fontSet=\"fa\" fontIcon=\"fa-{{iconName}}\"></mat-icon>\n  {{label}}\n</button>\n"
                },] },
    ];
    /** @nocollapse */
    InputFileComponent.propDecorators = {
        "accept": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "iconName": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "label": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "onFileSelect": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "nativeInputFile": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['inputFile',] },],
    };
    return InputFileComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ COMMON_MODULES = [
    PageNotFoundComponent,
    DeleteDialogComponent,
    LoginDialogComponent,
    MessageDialogComponent,
    InputFileComponent
];
var RevolsysAngularFrameworkModule = /** @class */ (function () {
    function RevolsysAngularFrameworkModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    RevolsysAngularFrameworkModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: RevolsysAngularFrameworkModule,
            providers: [
                { provide: Config, useValue: config }
            ]
        };
    };
    RevolsysAngularFrameworkModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [
                        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["BrowserModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                        _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"],
                        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"]
                    ],
                    declarations: COMMON_MODULES,
                    entryComponents: [
                        DeleteDialogComponent,
                        LoginDialogComponent,
                        MessageDialogComponent
                    ],
                    providers: [
                        AuthService
                    ],
                    exports: COMMON_MODULES
                },] },
    ];
    return RevolsysAngularFrameworkModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2b2xzeXMtYW5ndWxhci1mcmFtZXdvcmsuanMubWFwIiwic291cmNlcyI6WyJuZzovL3Jldm9sc3lzLWFuZ3VsYXItZnJhbWV3b3JrL2xpYi9Db25maWcudHMiLCJuZzovL3Jldm9sc3lzLWFuZ3VsYXItZnJhbWV3b3JrL2xpYi9Db21wb25lbnQvTG9naW5EaWFsb2dDb21wb25lbnQudHMiLCJuZzovL3Jldm9sc3lzLWFuZ3VsYXItZnJhbWV3b3JrL2xpYi9Db21wb25lbnQvTWVzc2FnZURpYWxvZ0NvbXBvbmVudC50cyIsIm5nOi8vcmV2b2xzeXMtYW5ndWxhci1mcmFtZXdvcmsvbGliL1NlcnZpY2UvQmFzZVNlcnZpY2UudHMiLCJuZzovL3Jldm9sc3lzLWFuZ3VsYXItZnJhbWV3b3JrL2xpYi9BdXRoZW50aWNhdGlvbi9hdXRoLnNlcnZpY2UudHMiLCJuZzovL3Jldm9sc3lzLWFuZ3VsYXItZnJhbWV3b3JrL2xpYi9BdXRoZW50aWNhdGlvbi9Sb2xlR3VhcmQudHMiLCJuZzovL3Jldm9sc3lzLWFuZ3VsYXItZnJhbWV3b3JrL2xpYi9Db21wb25lbnQvQmFzZUNvbXBvbmVudC50cyIsIm5nOi8vcmV2b2xzeXMtYW5ndWxhci1mcmFtZXdvcmsvbGliL0NvbXBvbmVudC9CYXNlRGV0YWlsQ29tcG9uZW50LnRzIiwibmc6Ly9yZXZvbHN5cy1hbmd1bGFyLWZyYW1ld29yay9saWIvQ29tcG9uZW50L0RlbGV0ZURpYWxvZ0NvbXBvbmVudC50cyIsIm5nOi8vcmV2b2xzeXMtYW5ndWxhci1mcmFtZXdvcmsvbGliL1NlcnZpY2UvQXJyYXlEYXRhU291cmNlLnRzIiwibmc6Ly9yZXZvbHN5cy1hbmd1bGFyLWZyYW1ld29yay9saWIvQ29tcG9uZW50L0Jhc2VMaXN0Q29tcG9uZW50LnRzIiwibmc6Ly9yZXZvbHN5cy1hbmd1bGFyLWZyYW1ld29yay9saWIvQ29tcG9uZW50L1BhZ2VOb3RGb3VuZENvbXBvbmVudC50cyIsIm5nOi8vcmV2b2xzeXMtYW5ndWxhci1mcmFtZXdvcmsvbGliL2lucHV0LWZpbGUvaW5wdXQtZmlsZS1jb21wb25lbnQudHMiLCJuZzovL3Jldm9sc3lzLWFuZ3VsYXItZnJhbWV3b3JrL2xpYi9yZXZvbHN5cy1hbmd1bGFyLWZyYW1ld29yay5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcsXG4gICAgcHVibGljIGJhc2VQYXRoID0gJycpIHtcbiAgfVxuXG4gIHB1YmxpYyBnZXRVcmwocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgdGhpcy5iYXNlUGF0aCArIHBhdGg7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBBZnRlclZpZXdJbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWF0RGlhbG9nLFxuICBNYXREaWFsb2dSZWYsXG4gIE1BVF9ESUFMT0dfREFUQVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi9Db25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdyYWYtbG9naW4tZGlhbG9nJyxcbiAgdGVtcGxhdGU6IGBcbjxoMSBtYXQtZGlhbG9nLXRpdGxlPkxvZ2luPC9oMT5cbjxkaXYgbWF0LWRpYWxvZy1jb250ZW50PlxuICA8cD5Zb3UgbXVzdCBiZSBsb2dnZWQgaW4gdG8gYWNjZXNzIHRoaXMgYXBwbGljYXRpb24uIENsaWNrIHRoZSBMb2dpbiBidXR0b24gdG8gb3BlbiB0aGUgbG9naW4gd2luZG93LjwvcD5cbiAgPHA+PGI+Tk9URTo8L2I+IFdlYiBicm93c2VycyBtYXkgYmxvY2sgYXV0b21hdGVkIHBvcC11cCB3aW5kb3dzLjxiciAvPkFsbG93IHBvcHVwcyBmb3IgdGhpcyBzaXRlIGluIHlvdXJcbndlYiBicm93c2VyIHRvIG9wZW4gdG8gYWxsb3cgdGhlIGxvZ2luIHBvcHVwLjwvcD5cbjwvZGl2PlxuPGRpdiBtYXQtZGlhbG9nLWFjdGlvbnM+XG4gIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gKGNsaWNrKT1cImxvZ2luKClcIiBjb2xvcj1cInByaW1hcnlcIj5Mb2dpbjwvYnV0dG9uPlxuPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIHByaXZhdGUgbG9naW5XaW5kb3c6IFdpbmRvdztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnLFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxMb2dpbkRpYWxvZ0NvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnksXG4gICkge1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMubG9naW4oKTtcbiAgfVxuXG4gIGxvZ2luKCkge1xuICAgIGNvbnN0IHdpbmRvdyA9IGRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICAgIGlmICh0aGlzLmxvZ2luV2luZG93ICYmICF0aGlzLmxvZ2luV2luZG93LmNsb3NlZCkge1xuICAgICAgdGhpcy5sb2dpbldpbmRvdy5mb2N1cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3AgPSB3aW5kb3c7XG4gICAgICBsZXQgd2lkdGggPSB3aW5kb3cub3V0ZXJXaWR0aCAqIDAuOTtcbiAgICAgIGlmICh3aWR0aCA+IDgwMCkge1xuICAgICAgICB3aWR0aCA9IDgwMDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHggPSB3aW5kb3cub3V0ZXJXaWR0aCAvIDIgKyB3aW5kb3cuc2NyZWVuWCAtICh3aWR0aCAvIDIpO1xuICAgICAgY29uc3QgeSA9IHdpbmRvdy5vdXRlckhlaWdodCAvIDIgKyB3aW5kb3cuc2NyZWVuWSAtICgzMDApO1xuXG4gICAgICB0aGlzLmxvZ2luV2luZG93ID0gd2luZG93Lm9wZW4oXG4gICAgICAgIHRoaXMuY29uZmlnLmdldFVybCgnL2xvZ2luL3dpbmRvdycpLFxuICAgICAgICAnZ3dhTG9naW4nLFxuICAgICAgICBgbWVudWJhcj1ubyxsb2NhdGlvbj1ubyxzdGF0dXM9bm8sbGVmdD0ke3h9LHRvcD0ke3l9LHdpZHRoPSR7d2lkdGh9LGhlaWdodD02MDBgXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5sb2dpbldpbmRvdykge1xuICAgICAgY29uc3QgbGlzdGVuZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuZGF0YSA9PT0gJ2Nsb3NlJykge1xuICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCdMb2dpbicpO1xuICAgICAgICAgIGlmICh0aGlzLmxvZ2luV2luZG93KSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luV2luZG93LmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLmxvZ2luV2luZG93ID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWF0RGlhbG9nLFxuICBNYXREaWFsb2dSZWYsXG4gIE1BVF9ESUFMT0dfREFUQVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JhZi1tZXNzYWdlLWRpYWxvZycsXG4gIHRlbXBsYXRlOiBgXG48aDEgbWF0LWRpYWxvZy10aXRsZT57e3RpdGxlfX08L2gxPlxuPGRpdiBtYXQtZGlhbG9nLWNvbnRlbnQ+XG48cD57e21lc3NhZ2V9fTxwPlxuPHByZT57e2JvZHl9fTwvcHJlPlxuPC9kaXY+XG48ZGl2IG1hdC1kaWFsb2ctYWN0aW9ucz5cbiAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKClcIiBjb2xvcj1cInByaW1hcnlcIj5DbG9zZTwvYnV0dG9uPlxuPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEaWFsb2dDb21wb25lbnQge1xuICB0aXRsZTogc3RyaW5nID0gdGhpcy5kYXRhWyd0aXRsZSddO1xuXG4gIG1lc3NhZ2U6IHN0cmluZyA9IHRoaXMuZGF0YVsnbWVzc2FnZSddO1xuXG4gIGJvZHk6IHN0cmluZyA9IHRoaXMuZGF0YVsnYm9keSddO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxNZXNzYWdlRGlhbG9nQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgKSB7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIE9ic2VydmFibGUsXG4gIG9mLFxuICB0aHJvd0Vycm9yXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgbWFwLFxuICBjYXRjaEVycm9yXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBPcHRpb25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgTG9jYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtcbiAgSHR0cENsaWVudCxcbiAgSHR0cEhlYWRlcnNcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge1xuICBNYXREaWFsb2csXG4gIE1hdERpYWxvZ1JlZlxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vQ29uZmlnJztcblxuaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuL1NlcnZpY2UnO1xuXG5pbXBvcnQge0xvZ2luRGlhbG9nQ29tcG9uZW50fSBmcm9tICcuLi9Db21wb25lbnQvTG9naW5EaWFsb2dDb21wb25lbnQnO1xuXG5pbXBvcnQge01lc3NhZ2VEaWFsb2dDb21wb25lbnR9IGZyb20gJy4uL0NvbXBvbmVudC9NZXNzYWdlRGlhbG9nQ29tcG9uZW50JztcbmltcG9ydCB7SHR0cEVycm9yUmVzcG9uc2V9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHtIdHRwUGFyYW1zfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VTZXJ2aWNlPFQ+IGltcGxlbWVudHMgU2VydmljZTxUPiB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgbG9naW5EaWFsb2c6IE1hdERpYWxvZ1JlZjxMb2dpbkRpYWxvZ0NvbXBvbmVudD4gPSBudWxsO1xuXG4gIHByb3RlY3RlZCBjb25maWc6IENvbmZpZztcblxuICBwcm90ZWN0ZWQgZG9jdW1lbnQ6IGFueTtcblxuICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudDtcblxuICBwcm90ZWN0ZWQgbG9jYXRpb246IExvY2F0aW9uO1xuXG4gIHByb3RlY3RlZCBwYXRoOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIHR5cGVUaXRsZTogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBsYWJlbEZpZWxkTmFtZTogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBpZEZpZWxkTmFtZSA9ICdpZCc7XG5cbiAgcGF0aFBhcmFtTmFtZSA9ICdpZCc7XG5cbiAgZGlhbG9nOiBNYXREaWFsb2c7XG5cbiAgdXNlUG9zdEZvckRlbGV0ZSA9IHRydWU7XG5cbiAgcHVibGljIHJlYWRvbmx5IGpzb25IZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvclxuICApIHtcbiAgICB0aGlzLmNvbmZpZyA9IGluamVjdG9yLmdldChDb25maWcpO1xuICAgIHRoaXMuZG9jdW1lbnQgPSBpbmplY3Rvci5nZXQoRE9DVU1FTlQpO1xuICAgIHRoaXMuaHR0cCA9IGluamVjdG9yLmdldChIdHRwQ2xpZW50KTtcbiAgICB0aGlzLmxvY2F0aW9uID0gaW5qZWN0b3IuZ2V0KExvY2F0aW9uKTtcbiAgICB0aGlzLmRpYWxvZyA9IGluamVjdG9yLmdldChNYXREaWFsb2cpO1xuICB9XG5cbiAgYWRkT2JqZWN0KG9iamVjdDogVCwgcGF0aD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xuICAgIGlmICghcGF0aCkge1xuICAgICAgcGF0aCA9IHRoaXMucGF0aDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWRkT2JqZWN0RG8oXG4gICAgICBwYXRoLFxuICAgICAgb2JqZWN0XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBodHRwUmVxdWVzdDxSPihyZXF1ZXN0OiAoaHR0cDogSHR0cENsaWVudCkgPT4gT2JzZXJ2YWJsZTxhbnk+LCBoYW5kbGVyOiAocmVzcG9uc2U6IGFueSkgPT4gUik6IE9ic2VydmFibGU8Uj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdCh0aGlzLmh0dHApO1xuICAgIHJldHVybiByZXNwb25zZS5waXBlKFxuICAgICAgbWFwKGhhbmRsZXIpLCAvL1xuICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgIGxldCBsb2dpbkRpYWxvZyA9IEJhc2VTZXJ2aWNlLmxvZ2luRGlhbG9nO1xuICAgICAgICAgIGlmIChsb2dpbkRpYWxvZykge1xuICAgICAgICAgICAgbG9naW5EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UubG9naW4oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9naW5EaWFsb2cgPSB0aGlzLmRpYWxvZy5vcGVuKExvZ2luRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBCYXNlU2VydmljZS5sb2dpbkRpYWxvZyA9IGxvZ2luRGlhbG9nO1xuICAgICAgICAgICAgbG9naW5EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoZGlhbG9nUmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICBCYXNlU2VydmljZS5sb2dpbkRpYWxvZyA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9naW5EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoZGlhbG9nUmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYgKGRpYWxvZ1Jlc3BvbnNlID09PSAnTG9naW4nKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBSZXF1ZXN0KHJlcXVlc3QsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoJ05vdCBsb2dnZWQgaW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNob3dFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZE9iamVjdERvKHBhdGg6IHN0cmluZywgb2JqZWN0OiBULCBjYWxsYmFjaz86ICgpID0+IHZvaWQpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldFVybChwYXRoKTtcbiAgICBjb25zdCBqc29uVGV4dCA9IEpTT04uc3RyaW5naWZ5KG9iamVjdCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFJlcXVlc3QoXG4gICAgICBodHRwID0+IHtcbiAgICAgICAgcmV0dXJuIGh0dHAucG9zdChcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAganNvblRleHQsXG4gICAgICAgICAge2hlYWRlcnM6IHRoaXMuanNvbkhlYWRlcnN9XG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAganNvbiA9PiB7XG4gICAgICAgIGlmIChqc29uLmVycm9yKSB7XG4gICAgICAgICAgdGhpcy5zaG93RXJyb3IoanNvbi5lcnJvciwganNvbi5ib2R5KTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKG9iamVjdCwganNvbik7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGFkZE9yVXBkYXRlT2JqZWN0KG9iamVjdDogVCk6IE9ic2VydmFibGU8VD4ge1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG9mKG9iamVjdCk7XG4gICAgfSBlbHNlIGlmIChvYmplY3RbdGhpcy5pZEZpZWxkTmFtZV0pIHtcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZU9iamVjdChvYmplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRPYmplY3Qob2JqZWN0KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgc2hvd0Vycm9yKG1lc3NhZ2U6IHN0cmluZywgYm9keT86IHN0cmluZykge1xuICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oTWVzc2FnZURpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgZGF0YToge1xuICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgYm9keTogYm9keSxcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRVcmwocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZ2V0VXJsKCcvcmVzdCcgKyBwYXRoKTtcbiAgfVxuXG4gIGRlbGV0ZU9iamVjdChvYmplY3Q6IFQsIHBhdGg/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZWxldGVPYmplY3REbyhwYXRoOiBzdHJpbmcsIGNhbGxiYWNrPzogKGRlbGV0ZWQ6IGJvb2xlYW4pID0+IHZvaWQsIHBhcmFtZXRlcnM/OiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgIGlmIChwYXJhbWV0ZXJzKSB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXMocGFyYW1ldGVycykpIHtcbiAgICAgICAgcGFyYW1zLnNldChuYW1lLCBwYXJhbWV0ZXJzW25hbWVdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldFVybChwYXRoKTtcbiAgICBjb25zdCBoYW5kbGVyID0gaHR0cFJlc3BvbnNlID0+IHtcbiAgICAgIGNvbnN0IGpzb24gPSBodHRwUmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICAgICAgdGhpcy5zaG93RXJyb3IoanNvbi5lcnJvciwganNvbi5ib2R5KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGVsZXRlZCA9IGpzb24uZGVsZXRlZCA9PT0gdHJ1ZTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgY2FsbGJhY2soZGVsZXRlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlbGV0ZWQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnVzZVBvc3RGb3JEZWxldGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBSZXF1ZXN0KFxuICAgICAgICBodHRwID0+IHtcbiAgICAgICAgICByZXR1cm4gaHR0cC5wb3N0KFxuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdYLUhUVFAtTWV0aG9kLU92ZXJyaWRlJzogJ0RFTEVURSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVyXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwUmVxdWVzdChcbiAgICAgICAgaHR0cCA9PiB7XG4gICAgICAgICAgcmV0dXJuIGh0dHAuZGVsZXRlKFxuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmpzb25IZWFkZXJzLFxuICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZXJcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TGFiZWwob2JqZWN0OiBUKTogc3RyaW5nIHtcbiAgICBsZXQgZmllbGROYW1lczogc3RyaW5nW107XG4gICAgaWYgKHRoaXMubGFiZWxGaWVsZE5hbWUpIHtcbiAgICAgIGZpZWxkTmFtZXMgPSB0aGlzLmxhYmVsRmllbGROYW1lLnNwbGl0KCcuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpZWxkTmFtZXMgPSBbdGhpcy5pZEZpZWxkTmFtZV07XG4gICAgfVxuICAgIGxldCB2YWx1ZTogYW55ID0gb2JqZWN0O1xuICAgIGZvciAoY29uc3QgZmllbGROYW1lIG9mIGZpZWxkTmFtZXMpIHtcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVtmaWVsZE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBnZXRPYmplY3QoaWQ6IHN0cmluZywgdmFsdWVzPzogYW55KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T2JqZWN0RG8odGhpcy5wYXRoICsgJy8nICsgaWQsIHZhbHVlcyk7XG4gIH1cblxuICBnZXRPYmplY3REbyhwYXRoOiBzdHJpbmcsIHZhbHVlcz86IGFueSk6IE9ic2VydmFibGU8VD4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0VXJsKHBhdGgpO1xuICAgIHJldHVybiB0aGlzLmh0dHBSZXF1ZXN0KFxuICAgICAgaHR0cCA9PiB7XG4gICAgICAgIHJldHVybiBodHRwLmdldCh1cmwpO1xuICAgICAgfSxcbiAgICAgIGpzb24gPT4ge1xuICAgICAgICBpZiAoanNvbi5lcnJvcikge1xuICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKGpzb24uZXJyb3IsIGpzb24uYm9keSk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgb2JqZWN0ID0gdGhpcy50b09iamVjdChqc29uKTtcbiAgICAgICAgICBpZiAodmFsdWVzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh2YWx1ZXMpKSB7XG4gICAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWVzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZ2V0T2JqZWN0cyhwYXRoOiBzdHJpbmcsIGZpbHRlcjoge1tmaWVsZE5hbWU6IHN0cmluZ106IHN0cmluZ30pOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgIGlmICghcGF0aCkge1xuICAgICAgcGF0aCA9IHRoaXMucGF0aDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0T2JqZWN0c0RvKHBhdGgsIGZpbHRlcik7XG4gIH1cblxuICBnZXRPYmplY3RzRG8ocGF0aDogc3RyaW5nLCBmaWx0ZXI6IHtbZmllbGROYW1lOiBzdHJpbmddOiBzdHJpbmd9KTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgIHRoaXMuYWRkRmlsdGVyUGFyYW1zKHBhcmFtcywgZmlsdGVyKTtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldFVybChwYXRoKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHBSZXF1ZXN0KFxuICAgICAgaHR0cCA9PiB7XG4gICAgICAgIHJldHVybiBodHRwLmdldChcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAganNvbiA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE9iamVjdHNGcm9tSnNvbihqc29uKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdldE9iamVjdHNGcm9tSnNvbihqc29uKTogVFtdIHtcbiAgICBjb25zdCBvYmplY3RzOiBUW10gPSBbXTtcbiAgICBpZiAoanNvbi5lcnJvcikge1xuICAgICAgdGhpcy5zaG93RXJyb3IoanNvbi5lcnJvciwganNvbi5ib2R5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGF0YSA9IGpzb24uZGF0YTtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGRhdGEuZm9yRWFjaCgocmVjb3JkSnNvbjogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy50b09iamVjdChyZWNvcmRKc29uKTtcbiAgICAgICAgICBvYmplY3RzLnB1c2gocmVjb3JkKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3RzO1xuICB9XG5cbiAgZ2V0UGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBhdGg7XG4gIH1cblxuICBwcml2YXRlIGFkZEZpbHRlclBhcmFtcyhwYXJhbXM6IEh0dHBQYXJhbXMsIGZpbHRlcjoge1tmaWVsZE5hbWU6IHN0cmluZ106IHN0cmluZ30pIHtcbiAgICBpZiAoZmlsdGVyKSB7XG4gICAgICBmb3IgKGNvbnN0IGZpZWxkTmFtZSBvZiBPYmplY3Qua2V5cyhmaWx0ZXIpKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZmlsdGVyW2ZpZWxkTmFtZV07XG4gICAgICAgIHBhcmFtcy5hcHBlbmQoJ2ZpbHRlckZpZWxkTmFtZScsIGZpZWxkTmFtZSk7XG4gICAgICAgIHBhcmFtcy5hcHBlbmQoJ2ZpbHRlclZhbHVlJywgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXRSb3dzUGFnZShcbiAgICBvZmZzZXQ6IG51bWJlcixcbiAgICBsaW1pdDogbnVtYmVyLFxuICAgIHBhdGg6IHN0cmluZyxcbiAgICBmaWx0ZXI6IHtbZmllbGROYW1lOiBzdHJpbmddOiBzdHJpbmd9XG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICBwYXJhbXMuc2V0KCdvZmZzZXQnLCBvZmZzZXQudG9TdHJpbmcoKSk7XG4gICAgcGFyYW1zLnNldCgnbGltaXQnLCBsaW1pdC50b1N0cmluZygpKTtcbiAgICB0aGlzLmFkZEZpbHRlclBhcmFtcyhwYXJhbXMsIGZpbHRlcik7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICBwYXRoID0gdGhpcy5wYXRoO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldFVybChwYXRoKTtcbiAgICByZXR1cm4gdGhpcy5odHRwUmVxdWVzdChcbiAgICAgIGh0dHAgPT4ge1xuICAgICAgICByZXR1cm4gaHR0cC5nZXQoXG4gICAgICAgICAgdXJsLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGpzb24gPT4ge1xuICAgICAgICBjb25zdCByb3dzOiBUW10gPSBbXTtcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLnNob3dFcnJvcihqc29uLmVycm9yLCBqc29uLmJvZHkpO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBqc29uLmRhdGE7XG4gICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgocmVjb3JkSnNvbjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXMudG9PYmplY3QocmVjb3JkSnNvbik7XG4gICAgICAgICAgICAgIHJvd3MucHVzaChyZWNvcmQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0b3RhbCA9IGpzb24udG90YWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcm93czogcm93cyxcbiAgICAgICAgICBjb3VudDogdG90YWxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZ2V0VHlwZVRpdGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudHlwZVRpdGxlO1xuICB9XG5cbiAgbmV3T2JqZWN0KCk6IFQge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdG9PYmplY3QoanNvbjogYW55KTogVCB7XG4gICAgY29uc3QgcmVjb3JkID0gdGhpcy5uZXdPYmplY3QoKTtcbiAgICBPYmplY3QuYXNzaWduKHJlY29yZCwganNvbik7XG4gICAgcmV0dXJuIHJlY29yZDtcbiAgfVxuXG4gIHVwZGF0ZU9iamVjdChvYmplY3Q6IFQpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByb3RlY3RlZCB1cGRhdGVPYmplY3REbyhwYXRoOiBzdHJpbmcsIG9iamVjdDogVCwgY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRVcmwocGF0aCk7XG4gICAgY29uc3QganNvblRleHQgPSBKU09OLnN0cmluZ2lmeShvYmplY3QpO1xuICAgIHJldHVybiB0aGlzLmh0dHBSZXF1ZXN0KFxuICAgICAgaHR0cCA9PiB7XG4gICAgICAgIHJldHVybiBodHRwLnB1dChcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAganNvblRleHQsXG4gICAgICAgICAge2hlYWRlcnM6IHRoaXMuanNvbkhlYWRlcnN9XG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAganNvbiA9PiB7XG4gICAgICAgIGlmIChqc29uLmVycm9yKSB7XG4gICAgICAgICAgdGhpcy5zaG93RXJyb3IoanNvbi5lcnJvciwganNvbi5ib2R5KTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKG9iamVjdCwganNvbik7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgT2JzZXJ2YWJsZSxcbiAgb2Zcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Q2FuQWN0aXZhdGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0Jhc2VTZXJ2aWNlfSBmcm9tICcuLi9TZXJ2aWNlL0Jhc2VTZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIGV4dGVuZHMgQmFzZVNlcnZpY2U8YW55PiAge1xuICB1c2VybmFtZTogc3RyaW5nO1xuICByb2xlczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgc3VwZXIoaW5qZWN0b3IpO1xuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0VXJsKCcvYXV0aGVudGljYXRpb24nKTtcbiAgICB0aGlzLmh0dHBSZXF1ZXN0KFxuICAgICAgaHR0cCA9PiB7XG4gICAgICAgIHJldHVybiBodHRwLmdldCh1cmwpO1xuICAgICAgfSxcbiAgICAgIGpzb24gPT4ge1xuICAgICAgICBpZiAoanNvbi5lcnJvcikge1xuICAgICAgICAgIHRoaXMucm9sZXMgPSBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJvbGVzID0ganNvbi5yb2xlcztcbiAgICAgICAgICB0aGlzLnVzZXJuYW1lID0ganNvbi5uYW1lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGhhc1JvbGUocm9sZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucm9sZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yb2xlcy5pbmRleE9mKHJvbGUpICE9PSAtMTtcbiAgICB9XG4gIH1cblxuICBoYXNBbnlSb2xlKHJvbGVzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnJvbGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IHJvbGUgb2Ygcm9sZXMpIHtcbiAgICAgICAgaWYgKHRoaXMucm9sZXMuaW5kZXhPZihyb2xlKSAhPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGhhc0FueVJvbGVBc3luYyhyb2xlczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBpZiAodGhpcy5yb2xlcyA9PSBudWxsKSB7XG4gICAgICBjb25zdCB1cmwgPSB0aGlzLmdldFVybCgnL2F1dGhlbnRpY2F0aW9uJyk7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpLnBpcGUoXG4gICAgICAgIG1hcCgoanNvbjogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMucm9sZXMgPSBbXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yb2xlcyA9IGpzb24ucm9sZXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLmhhc0FueVJvbGUocm9sZXMpO1xuICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZih0aGlzLmhhc0FueVJvbGUocm9sZXMpKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgQ2FuQWN0aXZhdGUsXG4gIFJvdXRlclN0YXRlU25hcHNob3Rcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvbGVHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICkge1xuICB9XG5cbiAgY2FuQWN0aXZhdGUoXG4gICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gICAgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3RcbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuPiB8IGJvb2xlYW4ge1xuICAgIGlmIChyb3V0ZS5kYXRhKSB7XG4gICAgICBjb25zdCByb2xlczogc3RyaW5nW10gPSByb3V0ZS5kYXRhWydyb2xlcyddO1xuICAgICAgaWYgKHJvbGVzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmhhc0FueVJvbGVBc3luYyhyb2xlcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBJbmplY3RvcixcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTG9jYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIERPQ1VNRU5ULFxuICBUaXRsZVxufSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7XG4gIE1hdERpYWxvZyxcbiAgTWF0RGlhbG9nUmVmXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7XG4gIEFjdGl2YXRlZFJvdXRlLFxuICBSb3V0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vQ29uZmlnJztcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gJy4uL0F1dGhlbnRpY2F0aW9uL2F1dGguc2VydmljZSc7XG5pbXBvcnQge1NlcnZpY2V9IGZyb20gJy4uL1NlcnZpY2UvU2VydmljZSc7XG5pbXBvcnQge01lc3NhZ2VEaWFsb2dDb21wb25lbnR9IGZyb20gJy4vTWVzc2FnZURpYWxvZ0NvbXBvbmVudCc7XG5cbmV4cG9ydCBjbGFzcyBCYXNlQ29tcG9uZW50PFQ+IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChBdXRoU2VydmljZSk7XG5cbiAgcHJvdGVjdGVkIGNvbmZpZyA9IHRoaXMuaW5qZWN0b3IuZ2V0KENvbmZpZyk7XG5cbiAgZGlhbG9nOiBNYXREaWFsb2cgPSB0aGlzLmluamVjdG9yLmdldChNYXREaWFsb2cpO1xuXG4gIGRvY3VtZW50OiBhbnkgPSB0aGlzLmluamVjdG9yLmdldChET0NVTUVOVCk7XG5cbiAgcHJvdGVjdGVkIGxvY2F0aW9uOiBMb2NhdGlvbiA9IHRoaXMuaW5qZWN0b3IuZ2V0KExvY2F0aW9uKTtcblxuICBwcm90ZWN0ZWQgcm91dGU6IEFjdGl2YXRlZFJvdXRlID0gdGhpcy5pbmplY3Rvci5nZXQoQWN0aXZhdGVkUm91dGUpO1xuXG4gIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlciA9IHRoaXMuaW5qZWN0b3IuZ2V0KFJvdXRlcik7XG5cbiAgdGl0bGVTZXJ2aWNlOiBUaXRsZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KFRpdGxlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByb3RlY3RlZCBzZXJ2aWNlOiBTZXJ2aWNlPFQ+LFxuICAgIHByb3RlY3RlZCB0aXRsZTogc3RyaW5nXG4gICkge1xuICAgIGlmICh0aGlzLnRpdGxlKSB7XG4gICAgICB0aGlzLnNldFRpdGxlKHRoaXMudGl0bGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRpdGxlKSB7XG4gICAgICB0aGlzLnRpdGxlU2VydmljZS5zZXRUaXRsZSh0aGlzLnRpdGxlKTtcbiAgICB9XG4gIH1cblxuICByb3V0ZUxpc3QoKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLiddLCB7cmVsYXRpdmVUbzogdGhpcy5yb3V0ZX0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNob3dFcnJvcihtZXNzYWdlOiBzdHJpbmcsIGJvZHk/OiBzdHJpbmcpIHtcbiAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKE1lc3NhZ2VEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdGl0bGU6ICdFcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgIGJvZHk6IGJvZHksXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0VXJsKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldFVybCgnL3Jlc3QnICsgcGF0aCk7XG4gIH1cblxuICBoYXNSb2xlKHJvbGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmhhc1JvbGUocm9sZSk7XG4gIH1cblxuICBnZXQgdXNlcm5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hdXRoU2VydmljZS51c2VybmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRUaXRsZSh0aXRsZTogc3RyaW5nKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgdGhpcy50aXRsZVNlcnZpY2Uuc2V0VGl0bGUodGl0bGUpO1xuICAgIH1cbiAgfVxuXG4gIHN0cmluZ1ZhbHVlKG9iamVjdDogYW55KTogc3RyaW5nIHtcbiAgICBpZiAob2JqZWN0KSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICAgIGlmIChvYmplY3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBvYmplY3Quam9pbigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2JqZWN0LnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnLSc7XG4gIH1cblxuICB0cmFja0J5SW5kZXgoaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBYnN0cmFjdENvbnRyb2wsXG4gIEZvcm1CdWlsZGVyLFxuICBGb3JtR3JvdXBcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtQYXJhbXN9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4vQmFzZUNvbXBvbmVudCc7XG5pbXBvcnQge1NlcnZpY2V9IGZyb20gJy4uL1NlcnZpY2UvU2VydmljZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5cbmV4cG9ydCBjbGFzcyBCYXNlRGV0YWlsQ29tcG9uZW50PFQ+IGV4dGVuZHMgQmFzZUNvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGFkZFBhZ2UgPSBmYWxzZTtcblxuICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgaWQ6IHN0cmluZztcblxuICBpZFBhcmFtTmFtZSA9ICdpZCc7XG5cbiAgb2JqZWN0OiBUO1xuXG4gIGluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlciA9IHRoaXMuaW5qZWN0b3IuZ2V0KEZvcm1CdWlsZGVyKTtcblxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IsIHNlcnZpY2U6IFNlcnZpY2U8VD4sIHRpdGxlOiBzdHJpbmcpIHtcbiAgICBzdXBlcihpbmplY3Rvciwgc2VydmljZSwgdGl0bGUpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yb3V0ZS5wYXJhbXNcbiAgICAgIC5zdWJzY3JpYmUoKHBhcmFtczogUGFyYW1zKSA9PiB7XG4gICAgICAgIHRoaXMuaWQgPSBwYXJhbXNbdGhpcy5pZFBhcmFtTmFtZV07XG4gICAgICAgIGlmICh0aGlzLmlkKSB7XG4gICAgICAgICAgdGhpcy5zZXJ2aWNlLmdldE9iamVjdCh0aGlzLmlkKS8vXG4gICAgICAgICAgICAuc3Vic2NyaWJlKG9iamVjdCA9PiB0aGlzLnNldE9iamVjdChvYmplY3QpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBvYmplY3QgPSB0aGlzLnNlcnZpY2UubmV3T2JqZWN0KCk7XG4gICAgICAgICAgdGhpcy5zZXRPYmplY3Qob2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBnZXQgbm90Rm91bmQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLm9iamVjdCA9PT0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRPYmplY3Qob2JqZWN0OiBUKSB7XG4gICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICBwb3N0U2F2ZShzYXZlZE9iamVjdDogVCk6IHZvaWQge1xuICB9XG5cbiAgcHJvdGVjdGVkIHNhdmVEbygpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmFkZE9yVXBkYXRlT2JqZWN0KHRoaXMub2JqZWN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzYXZlVmFsdWVzKG9iamVjdDogYW55LCBmb3JtOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhmb3JtLnZhbHVlKSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBmb3JtLnZhbHVlW2tleV07XG4gICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHNhdmUoY2xvc2U6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5zYXZlRG8oKVxuICAgICAgLnN1YnNjcmliZShzYXZlZE9iamVjdCA9PiB7XG4gICAgICAgIGlmIChzYXZlZE9iamVjdCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5wb3N0U2F2ZShzYXZlZE9iamVjdCk7XG4gICAgICAgICAgaWYgKGNsb3NlKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlTGlzdCgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hZGRQYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlRGV0YWlsKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHJvdXRlRGV0YWlsKCk6IHZvaWQge1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1hdERpYWxvZyxcbiAgTWF0RGlhbG9nUmVmLFxuICBNQVRfRElBTE9HX0RBVEFcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdyYWYtZGVsZXRlLWRpYWxvZycsXG4gIHRlbXBsYXRlOiBgXG48aDEgbWF0LWRpYWxvZy10aXRsZT5EZWxldGUge3t0eXBlVGl0bGV9fT88L2gxPlxuPGRpdiBtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gIDxwPkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUge3t0eXBlVGl0bGV9fTo8L3A+XG4gIDxwPjxiPnt7b2JqZWN0TGFiZWx9fTwvYj4/PC9wPlxuPC9kaXY+XG48ZGl2IG1hdC1kaWFsb2ctYWN0aW9ucz5cbiAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKCdDYW5jZWwnKVwiPkNhbmNlbDwvYnV0dG9uPlxuICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIChjbGljayk9XCJkaWFsb2dSZWYuY2xvc2UoJ0RlbGV0ZScpXCIgY29sb3I9XCJ3YXJuXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDogMTBweDtcIj5EZWxldGU8L2J1dHRvbj5cbjwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBEZWxldGVEaWFsb2dDb21wb25lbnQge1xuICB0eXBlVGl0bGU6IHN0cmluZyA9IHRoaXMuZGF0YVsndHlwZVRpdGxlJ107XG5cbiAgb2JqZWN0TGFiZWw6IHN0cmluZyA9IHRoaXMuZGF0YVsnb2JqZWN0TGFiZWwnXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RGVsZXRlRGlhbG9nQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgKSB7XG4gIH1cbn1cbiIsImltcG9ydCB7RGF0YVNvdXJjZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgT2JzZXJ2YWJsZVxufSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIEFycmF5RGF0YVNvdXJjZTxUPiBleHRlbmRzIERhdGFTb3VyY2U8YW55PiB7XG4gIGRhdGFDaGFuZ2U6IEJlaGF2aW9yU3ViamVjdDxUW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUW10+KFtdKTtcblxuICBjb25uZWN0KCk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YUNoYW5nZTtcbiAgfVxuXG4gIHNldERhdGEoZGF0YTogVFtdKSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICBkYXRhID0gW107XG4gICAgfVxuICAgIHRoaXMuZGF0YUNoYW5nZS5uZXh0KGRhdGEpO1xuICB9XG5cbiAgZGlzY29ubmVjdCgpIHtcbiAgfVxuXG4gIGdldCBoYXNWYWx1ZXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YUNoYW5nZS52YWx1ZS5sZW5ndGggPiAwO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBJbmplY3RvcixcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNYXREaWFsb2csXG4gIE1hdERpYWxvZ1JlZlxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi9CYXNlQ29tcG9uZW50JztcbmltcG9ydCB7RGVsZXRlRGlhbG9nQ29tcG9uZW50fSBmcm9tICcuL0RlbGV0ZURpYWxvZ0NvbXBvbmVudCc7XG5cbmltcG9ydCB7QXJyYXlEYXRhU291cmNlfSBmcm9tICcuLi9TZXJ2aWNlL0FycmF5RGF0YVNvdXJjZSc7XG5pbXBvcnQge1NlcnZpY2V9IGZyb20gJy4uL1NlcnZpY2UvU2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBCYXNlTGlzdENvbXBvbmVudDxUPiBleHRlbmRzIEJhc2VDb21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkluaXQge1xuICBjb2x1bW5zOiBhbnlbXTtcblxuICBkYXRhU291cmNlID0gbmV3IEFycmF5RGF0YVNvdXJjZTxUPigpO1xuXG4gIGRlbGV0ZVJlY29yZFRpdGxlOiBzdHJpbmc7XG5cbiAgZGlhbG9nOiBNYXREaWFsb2cgPSB0aGlzLmluamVjdG9yLmdldChNYXREaWFsb2cpO1xuXG4gIHJlZnJlc2hpbmdDb3VudCA9IDA7XG5cbiAgcm93czogQXJyYXk8VD4gPSBbXTtcblxuICBjb3VudCA9IDA7XG5cbiAgaGFzUm93cyA9IGZhbHNlO1xuXG4gIG9mZnNldCA9IDA7XG5cbiAgcHJpdmF0ZSBsYXN0T2Zmc2V0ID0gLTE7XG5cbiAgbGltaXQgPSAxMDA7XG5cbiAgZmlsdGVyRmllbGRzOiBhbnlbXTtcblxuICBmaWx0ZXJGaWVsZE5hbWU6IHN0cmluZztcblxuICBmaWx0ZXJWYWx1ZTogc3RyaW5nO1xuXG4gIGZpbHRlcjoge1tmaWVsZE5hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuICBwYWdpbmcgPSBmYWxzZTtcblxuICBwYXRoOiBzdHJpbmc7XG5cbiAgY3NzQ2xhc3NlcyA9IHtcbiAgICBzb3J0QXNjZW5kaW5nOiAnZmEgZmEtY2hldnJvbi1kb3duJyxcbiAgICBzb3J0RGVzY2VuZGluZzogJ2ZhIGZhLWNoZXZyb24tdXAnLFxuICAgIHBhZ2VyTGVmdEFycm93OiAnZmEgZmEtY2hldnJvbi1sZWZ0JyxcbiAgICBwYWdlclJpZ2h0QXJyb3c6ICdmYSBmYS1jaGV2cm9uLXJpZ2h0JyxcbiAgICBwYWdlclByZXZpb3VzOiAnZmEgZmEtc3RlcC1iYWNrd2FyZCcsXG4gICAgcGFnZXJOZXh0OiAnZmEgZmEtc3RlcC1mb3J3YXJkJ1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvciwgc2VydmljZTogU2VydmljZTxUPiwgdGl0bGU6IHN0cmluZykge1xuICAgIHN1cGVyKGluamVjdG9yLCBzZXJ2aWNlLCB0aXRsZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIHJlZnJlc2goKSB7XG4gICAgaWYgKHRoaXMucGFnaW5nKSB7XG4gICAgICB0aGlzLnBhZ2UodGhpcy5vZmZzZXQsIHRoaXMubGltaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlZnJlc2hpbmdDb3VudCsrO1xuICAgICAgY29uc3QgZmlsdGVyID0gdGhpcy5uZXdGaWx0ZXIoKTtcbiAgICAgIHRoaXMuc2VydmljZS5nZXRPYmplY3RzKHRoaXMucGF0aCwgZmlsdGVyKS5zdWJzY3JpYmUob2JqZWN0cyA9PiB7XG4gICAgICAgIHRoaXMuc2V0Um93cyhvYmplY3RzKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoaW5nQ291bnQtLTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRSb3dzKHJvd3M6IFRbXSkge1xuICAgIHRoaXMucm93cyA9IHJvd3M7XG4gICAgdGhpcy5oYXNSb3dzID0gcm93cy5sZW5ndGggPiAwO1xuICAgIHRoaXMuZGF0YVNvdXJjZS5zZXREYXRhKHJvd3MpO1xuICB9XG5cbiAgZGVsZXRlT2JqZWN0KG9iamVjdDogVCk6IHZvaWQge1xuICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRGVsZXRlRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHR5cGVUaXRsZTogdGhpcy5kZWxldGVSZWNvcmRUaXRsZSB8fCB0aGlzLnNlcnZpY2UuZ2V0VHlwZVRpdGxlKCksXG4gICAgICAgIG9iamVjdExhYmVsOiB0aGlzLnNlcnZpY2UuZ2V0TGFiZWwob2JqZWN0KSxcbiAgICAgIH1cbiAgICB9KTtcbiAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQgPT09ICdEZWxldGUnKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlT2JqZWN0RG8ob2JqZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZWxldGVPYmplY3REbyhvYmplY3Q6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnNlcnZpY2UuZGVsZXRlT2JqZWN0KG9iamVjdCwgdGhpcy5wYXRoKVxuICAgICAgLnN1YnNjcmliZSgoZGVsZXRlZCkgPT4ge1xuICAgICAgICBpZiAoZGVsZXRlZCkge1xuICAgICAgICAgIHRoaXMub25EZWxldGVkKG9iamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICA7XG4gIH1cblxuICBvbkRlbGV0ZWQob2JqZWN0OiBUKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFnaW5nKSB7XG4gICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgcm93cyA9IHRoaXMucm93cy5maWx0ZXIocm93ID0+IHJvdyAhPT0gb2JqZWN0KTtcbiAgICAgIHRoaXMuc2V0Um93cyhyb3dzKTtcbiAgICB9XG4gIH1cblxuICBnZXRSb3dzKCk6IEFycmF5PFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yb3dzO1xuICB9XG5cbiAgcGFnZShvZmZzZXQ6IG51bWJlciwgbGltaXQ6IG51bWJlcikge1xuICAgIHRoaXMucmVmcmVzaGluZ0NvdW50Kys7XG4gICAgdGhpcy5mZXRjaChvZmZzZXQsIGxpbWl0LCAocmVzdWx0czogYW55KSA9PiB7XG4gICAgICB0aGlzLnJlZnJlc2hpbmdDb3VudC0tO1xuICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgdGhpcy5jb3VudCA9IHJlc3VsdHMuY291bnQ7XG4gICAgICAgIHRoaXMuc2V0Um93cyhyZXN1bHRzLnJvd3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmV3RmlsdGVyKCk6IHtbZmllbGROYW1lOiBzdHJpbmddOiBzdHJpbmd9IHtcbiAgICBjb25zdCBmaWx0ZXI6IHtbZmllbGROYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICBmb3IgKGNvbnN0IGZpZWxkTmFtZSBvZiBPYmplY3Qua2V5cyh0aGlzLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyW2ZpZWxkTmFtZV0gPSB0aGlzLmZpbHRlcltmaWVsZE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5maWx0ZXJGaWVsZE5hbWUpIHtcbiAgICAgIGZpbHRlclt0aGlzLmZpbHRlckZpZWxkTmFtZV0gPSB0aGlzLmZpbHRlclZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyO1xuICB9XG5cbiAgZmV0Y2gob2Zmc2V0OiBudW1iZXIsIGxpbWl0OiBudW1iZXIsIGNhbGxiYWNrOiAocmVzdWx0czogYW55KSA9PiB2b2lkKSB7XG4gICAgY29uc3QgZmlsdGVyID0gdGhpcy5uZXdGaWx0ZXIoKTtcbiAgICB0aGlzLnNlcnZpY2UuZ2V0Um93c1BhZ2UoXG4gICAgICBvZmZzZXQsXG4gICAgICBsaW1pdCxcbiAgICAgIHRoaXMucGF0aCxcbiAgICAgIHRoaXMuZmlsdGVyXG4gICAgKS5zdWJzY3JpYmUoY2FsbGJhY2spO1xuICB9XG5cbiAgb25QYWdlKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy5sYXN0T2Zmc2V0ICE9PSBldmVudC5vZmZzZXQpIHtcbiAgICAgIHRoaXMubGFzdE9mZnNldCA9IGV2ZW50Lm9mZnNldDtcbiAgICAgIHRoaXMucGFnZShldmVudC5vZmZzZXQsIGV2ZW50LmxpbWl0KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JhZi1wYWdlLW5vdC1mb3VuZCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImVycm9yLWJveFwiPlxuICAgICAgPGgxPjQwNCBFcnJvcjwvaDE+XG4gICAgICA8cD5JJ20gc29ycnkgdGhlIHBhZ2UgeW91IHJlcXVlc3RlZCBjb3VsZCBub3QgYmUgZm91bmQuPC9wPlxuICAgICAgPGJ1dHRvbiAgKGNsaWNrKT1cImJhY2soKVwiIG1hdC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwid2FyblwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNoZXZyb24tbGVmdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4gQmFja1xuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW2Bcbi5lcnJvci1ib3gge1xuICBtYXJnaW4tdG9wOjEwcHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGNvbG9yOiNmNDQzMzY7XG4gIGJveC1zaGFkb3c6IDAgM3B4IDFweCAtMnB4IHJnYmEoMCwwLDAsLjIpLFxuICAgICAgICAgICAgICAwIDJweCAycHggMCByZ2JhKDAsMCwwLC4xNCksXG4gICAgICAgICAgICAgIDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsLjEyKTtcbn1cbiAgYF1cbn0pXG5leHBvcnQgY2xhc3MgUGFnZU5vdEZvdW5kQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHtcbiAgfVxuXG4gIGJhY2soKSB7XG4gICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAnc2VsZWN0b3InOiAncmFmLWlucHV0LWZpbGUnLFxuICAndGVtcGxhdGUnOiBgXG48aW5wdXQgW2FjY2VwdF09XCJhY2NlcHRcIiB0eXBlPVwiZmlsZVwiIChjaGFuZ2UpPVwib25OYXRpdmVJbnB1dEZpbGVTZWxlY3QoJGV2ZW50KVwiICNpbnB1dEZpbGUgaGlkZGVuIC8+XG5cbjxtYXQtZm9ybS1maWVsZD5cbiAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwiRmlsZVwiIG5hbWU9XCJmaWxlXCIgWyhuZ01vZGVsKV09XCJmaWxlTmFtZVwiIGRpc2FibGVkPVwidHJ1ZVwiIC8+XG48L21hdC1mb3JtLWZpZWxkPlxuIFxuPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b24gKGNsaWNrKT1cInNlbGVjdEZpbGUoKVwiPlxuICA8bWF0LWljb24gZm9udFNldD1cImZhXCIgZm9udEljb249XCJmYS17e2ljb25OYW1lfX1cIj48L21hdC1pY29uPlxuICB7e2xhYmVsfX1cbjwvYnV0dG9uPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dEZpbGVDb21wb25lbnQge1xuICBASW5wdXQoKSBhY2NlcHQ6IHN0cmluZztcblxuICBASW5wdXQoKSBpY29uTmFtZSA9ICdmbG9wcHktbyc7XG5cbiAgQElucHV0KCkgbGFiZWwgPSAnQ2hvb3NlIEZpbGUnO1xuXG4gIEBPdXRwdXQoKSBvbkZpbGVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxGaWxlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCdpbnB1dEZpbGUnKSBuYXRpdmVJbnB1dEZpbGU6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBmaWxlOiBGaWxlO1xuXG4gIGZpbGVOYW1lOiBzdHJpbmc7XG5cbiAgb25OYXRpdmVJbnB1dEZpbGVTZWxlY3QoZXZlbnQpIHtcbiAgICBjb25zdCBmaWxlcyA9IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5maWxlID0gbnVsbDtcbiAgICAgIHRoaXMuZmlsZU5hbWUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbGUgPSBmaWxlc1swXTtcbiAgICAgIHRoaXMuZmlsZU5hbWUgPSB0aGlzLmZpbGUubmFtZTtcbiAgICB9XG4gICAgdGhpcy5vbkZpbGVTZWxlY3QuZW1pdCh0aGlzLmZpbGUpO1xuICB9XG5cbiAgc2VsZWN0RmlsZSgpIHtcbiAgICB0aGlzLm5hdGl2ZUlucHV0RmlsZS5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHtcbiAgTWF0QnV0dG9uTW9kdWxlLFxuICBNYXREaWFsb2dNb2R1bGUsXG4gIE1hdEljb25Nb2R1bGUsXG4gIE1hdElucHV0TW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9Db25maWcnO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSAnLi9BdXRoZW50aWNhdGlvbi9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHtEZWxldGVEaWFsb2dDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50L0RlbGV0ZURpYWxvZ0NvbXBvbmVudCc7XG5pbXBvcnQge0xvZ2luRGlhbG9nQ29tcG9uZW50fSBmcm9tICcuL0NvbXBvbmVudC9Mb2dpbkRpYWxvZ0NvbXBvbmVudCc7XG5pbXBvcnQge01lc3NhZ2VEaWFsb2dDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50L01lc3NhZ2VEaWFsb2dDb21wb25lbnQnO1xuaW1wb3J0IHtQYWdlTm90Rm91bmRDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50L1BhZ2VOb3RGb3VuZENvbXBvbmVudCc7XG5pbXBvcnQge0lucHV0RmlsZUNvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC1maWxlL2lucHV0LWZpbGUtY29tcG9uZW50JztcblxuY29uc3QgQ09NTU9OX01PRFVMRVMgPSBbXG4gIFBhZ2VOb3RGb3VuZENvbXBvbmVudCxcbiAgRGVsZXRlRGlhbG9nQ29tcG9uZW50LFxuICBMb2dpbkRpYWxvZ0NvbXBvbmVudCxcbiAgTWVzc2FnZURpYWxvZ0NvbXBvbmVudCxcbiAgSW5wdXRGaWxlQ29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcblxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IENPTU1PTl9NT0RVTEVTLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBEZWxldGVEaWFsb2dDb21wb25lbnQsXG4gICAgTG9naW5EaWFsb2dDb21wb25lbnQsXG4gICAgTWVzc2FnZURpYWxvZ0NvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBdXRoU2VydmljZVxuICBdLFxuICBleHBvcnRzOiBDT01NT05fTU9EVUxFU1xufSlcbmV4cG9ydCBjbGFzcyBSZXZvbHN5c0FuZ3VsYXJGcmFtZXdvcmtNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUmV2b2xzeXNBbmd1bGFyRnJhbWV3b3JrTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBDb25maWcsIHVzZVZhbHVlOiBjb25maWd9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbInRzbGliXzEuX192YWx1ZXMiLCJ0c2xpYl8xLl9f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

/***/ }),

/***/ "../../../../../Angular/revolsys-angular/node_modules/@angular/core/fesm5 lazy recursive":
/*!******************************************************************************************************************!*\
  !*** /Users/paustin/Development/Angular/revolsys-angular/node_modules/@angular/core/fesm5 lazy namespace object ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../Angular/revolsys-angular/node_modules/@angular/core/fesm5 lazy recursive";

/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/Api/Api.ts":
/*!****************************!*\
  !*** ./src/app/Api/Api.ts ***!
  \****************************/
/*! exports provided: Api */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Api", function() { return Api; });
var Api = /** @class */ (function () {
    function Api() {
    }
    return Api;
}());



/***/ }),

/***/ "./src/app/Api/ApiList.html":
/*!**********************************!*\
  !*** ./src/app/Api/ApiList.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card style=\"flex: 1\">\n  <mat-card-title>Applications</mat-card-title>\n  <mat-card-content>\n    <p>You have permission to access the following applications.</p>\n    \n    <div class=\"table-container\">\n      <mat-table #table [dataSource]=\"dataSource\">\n        <ng-container cdkColumnDef=\"name\">\n          <mat-header-cell *cdkHeaderCellDef>Name</mat-header-cell>\n          <mat-cell *cdkCellDef=\"let row\"> {{row.name}} </mat-cell>\n        </ng-container>\n        \n        <mat-header-row *cdkHeaderRowDef=\"displayedColumns\"></mat-header-row>\n        \n        <mat-row *cdkRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n      </mat-table>\n    </div>\n  </mat-card-content>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/Api/ApiListComponent.ts":
/*!*****************************************!*\
  !*** ./src/app/Api/ApiListComponent.ts ***!
  \*****************************************/
/*! exports provided: ApiListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiListComponent", function() { return ApiListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var revolsys_angular_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! revolsys-angular-framework */ "../../../../../Angular/revolsys-angular/dist/revolsys-angular-framework/fesm5/revolsys-angular-framework.js");
/* harmony import */ var _ApiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ApiService */ "./src/app/Api/ApiService.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ApiListComponent = /** @class */ (function (_super) {
    __extends(ApiListComponent, _super);
    function ApiListComponent(injector, service) {
        var _this = _super.call(this, injector, service, 'Developer API Keys') || this;
        _this.displayedColumns = ['name'];
        return _this;
    }
    ApiListComponent.prototype.ngOnInit = function () {
        this.columns = [
            { name: 'Name', sortable: true },
        ];
        _super.prototype.ngOnInit.call(this);
    };
    ApiListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-api-list',
            template: __webpack_require__(/*! ./ApiList.html */ "./src/app/Api/ApiList.html"),
            styles: ["\n:host {\n  display: flex;\n  flex-grow: 1;\n}\n  "]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"],
            _ApiService__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])
    ], ApiListComponent);
    return ApiListComponent;
}(revolsys_angular_framework__WEBPACK_IMPORTED_MODULE_1__["BaseListComponent"]));



/***/ }),

/***/ "./src/app/Api/ApiService.ts":
/*!***********************************!*\
  !*** ./src/app/Api/ApiService.ts ***!
  \***********************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var revolsys_angular_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! revolsys-angular-framework */ "../../../../../Angular/revolsys-angular/dist/revolsys-angular-framework/fesm5/revolsys-angular-framework.js");
/* harmony import */ var _Api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Api */ "./src/app/Api/Api.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ApiService = /** @class */ (function (_super) {
    __extends(ApiService, _super);
    function ApiService(injector) {
        var _this = _super.call(this, injector) || this;
        _this.path = '/apis';
        _this.typeTitle = 'API';
        _this.labelFieldName = 'name';
        return _this;
    }
    ApiService.prototype.newObject = function () {
        return new _Api__WEBPACK_IMPORTED_MODULE_2__["Api"]();
    };
    ApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]])
    ], ApiService);
    return ApiService;
}(revolsys_angular_framework__WEBPACK_IMPORTED_MODULE_1__["BaseService"]));



/***/ }),

/***/ "./src/app/ApiKey/ApiKey.ts":
/*!**********************************!*\
  !*** ./src/app/ApiKey/ApiKey.ts ***!
  \**********************************/
/*! exports provided: ApiKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiKey", function() { return ApiKey; });
var ApiKey = /** @class */ (function () {
    function ApiKey() {
    }
    return ApiKey;
}());



/***/ }),

/***/ "./src/app/ApiKey/ApiKeyList.css":
/*!***************************************!*\
  !*** ./src/app/ApiKey/ApiKeyList.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".rowToColumn {\n  display:flex;\n  flex-direction:column;\n  align-items: stretch;\n  margin: -5px;\n}\n\n.rowToColumn > * {\n  margin: 5px;\n  flex: 1 1 auto;\n}\n\n@media (min-width: 769px) {\n  .rowToColumn {\n    flex-direction:row;\n  }\n}\n"

/***/ }),

/***/ "./src/app/ApiKey/ApiKeyList.html":
/*!****************************************!*\
  !*** ./src/app/ApiKey/ApiKeyList.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"authService.username\">\n  <ng-container *ngIf=\"hasRole('gwa_github_developer'); else elseAcceptTerms\">\n  \n    <mat-card *ngIf=\"appName && (appRedirectUrl || appSendMessage); else elseUserMode\" style=\"margin-bottom:10px\">\n      <mat-card-title>Authorize application {{appName}}</mat-card-title>\n      <mat-card-content>\n        <p>Allow application <b>{{appName}}</b> to use your API Key to access web services?</p>\n        <p>By allowing access you accept all responsibility for any access to the web service using\n        your developer key.</p>\n        <p>You can revoke access by deleting the API Key.</p>\n        <p>Use of the API keys is subject to the the <a href=\"/terms\" target=\"_blank\">API Key Terms of Use</a>.</p>\n        <mat-select placeholder=\"API Key\" [(ngModel)]=\"apiKey\" style=\"width: 290px\" [disabled]=\"!hasApiKey\">\n          <mat-option *ngFor=\"let apiKey of rows\" [value]=\"apiKey\">{{apiKey.key}}</mat-option>\n        </mat-select>\n        <button (click)=\"deleteApiKey()\" mat-mini-fab color=\"warn\" title=\"Delete API Key\" [disabled]=\"!hasApiKey\"><mat-icon fontSet=\"fa\" fontIcon=\"fa-trash-o\"></mat-icon></button>\n        <button (click)=\"addApiKey()\" mat-mini-fab title=\"Create API Key\" color=\"primary\"><mat-icon fontSet=\"fa\" fontIcon=\"fa-plus\"></mat-icon></button>\n      </mat-card-content>\n      <mat-card-actions>\n        <button (click)=\"authorizeAccess()\" mat-raised-button color=\"primary\" [disabled]=\"!hasApiKey\">Authorize application {{appName}}</button>\n      </mat-card-actions>\n    </mat-card>\n    <ng-template #elseUserMode>\n      <div class=\"rowToColumn\">\n        <mat-card>\n          <mat-card-title>Developer API Key <a href=\"https://github.com/bcgov/gwa/wiki/Developer-Guide\" alt=\"Developer Guide\" target=\"_blank\"><mat-icon fontSet=\"fa\" fontIcon=\"fa-question-circle\" ></mat-icon></a></mat-card-title>\n          <mat-card-content>\n            <div class=\"table-container\">\n              <mat-toolbar>\n                <button (click)=\"addApiKey()\" mat-raised-button color=\"primary\">Create API Key</button>\n              </mat-toolbar>\n         \n              <mat-table *ngIf=\"hasRows; else noUserApikeys\" #table [dataSource]=\"dataSource\">\n                <ng-container cdkColumnDef=\"key\">\n                  <mat-header-cell *cdkHeaderCellDef fxFlex=\"290px\">API Key</mat-header-cell>\n                  <mat-cell *cdkCellDef=\"let row\" fxFlex=\"290px\">{{row.key}}</mat-cell>\n                </ng-container>\n    \n                <ng-container cdkColumnDef=\"actions\">\n                  <mat-header-cell *cdkHeaderCellDef fxFlex=\"50px\">Actions</mat-header-cell>\n                  <mat-cell *cdkCellDef=\"let row\" fxFlex=\"50px\"><button (click)=\"deleteObject(row)\" mat-icon-button style=\"color: red\" title=\"Delete\">\n                    <mat-icon fontSet=\"fa\" fontIcon=\"fa-trash-o\"></mat-icon>\n                  </button></mat-cell>\n                </ng-container>\n                \n                <mat-header-row *cdkHeaderRowDef=\"displayedColumns\"></mat-header-row>\n                \n                <mat-row *cdkRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n              </mat-table>\n              <ng-template #noUserApikeys><div style=\"padding: 0.5em 1em\"><i>No API keys found</i></div></ng-template>\n            </div>\n            <p>Use of the API keys is subject to the the <a href=\"/terms\" target=\"_blank\">API Key Terms of Use</a>.</p>\n          </mat-card-content>\n        </mat-card>\n        <app-api-list></app-api-list>\n      </div>\n    </ng-template>\n  </ng-container>\n  <ng-template #elseAcceptTerms>\n    <mat-card>\n      <mat-card-title>Developer API Key <a href=\"https://github.com/bcgov/gwa/wiki/Developer-Guide\" alt=\"Developer Guide\" target=\"_blank\"><mat-icon fontSet=\"fa\" fontIcon=\"fa-question-circle\" ></mat-icon></a></mat-card-title>\n      <mat-card-content>\n        <mat-checkbox [(ngModel)]=\"acceptTerms\">I agree to the <a href=\"/terms\" target=\"_blank\">API Key Terms of Use</a></mat-checkbox>\n      </mat-card-content>\n      <mat-card-actions>\n        <button (click)=\"requestAccess()\" mat-raised-button color=\"primary\" [disabled]=\"!acceptTerms\">Request Access</button>\n      </mat-card-actions>\n    </mat-card>\n  </ng-template>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/ApiKey/ApiKeyListComponent.ts":
/*!***********************************************!*\
  !*** ./src/app/ApiKey/ApiKeyListComponent.ts ***!
  \***********************************************/
/*! exports provided: ApiKeyListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiKeyListComponent", function() { return ApiKeyListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var revolsys_angular_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! revolsys-angular-framework */ "../../../../../Angular/revolsys-angular/dist/revolsys-angular-framework/fesm5/revolsys-angular-framework.js");
/* harmony import */ var _ApiKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ApiKey */ "./src/app/ApiKey/ApiKey.ts");
/* harmony import */ var _ApiKeyService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ApiKeyService */ "./src/app/ApiKey/ApiKeyService.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ApiKeyListComponent = /** @class */ (function (_super) {
    __extends(ApiKeyListComponent, _super);
    function ApiKeyListComponent(injector, service) {
        var _this = _super.call(this, injector, service, 'Developer API Keys') || this;
        _this.acceptTerms = false;
        _this.appSendMessage = false;
        _this.displayedColumns = ['key', 'actions'];
        _this.hasApiKey = false;
        return _this;
    }
    ApiKeyListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.columns = [
            { name: 'API Key', prop: 'key', sortable: true },
            { name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false }
        ];
        _super.prototype.ngOnInit.call(this);
        this.route.queryParams
            .subscribe(function (params) {
            _this.appName = params['appName'];
            _this.appRedirectUrl = params['appRedirectUrl'];
            _this.appSendMessage = params['appSendMessage'] === 'true';
            _this.refresh();
        });
    };
    ApiKeyListComponent.prototype.addApiKey = function () {
        var _this = this;
        var apiKey = new _ApiKey__WEBPACK_IMPORTED_MODULE_2__["ApiKey"]();
        this.service.addObject(apiKey).subscribe(function (apiKey2) {
            _this.hasApiKey = true;
            _this.refresh();
            _this.apiKey = apiKey2;
        });
    };
    ApiKeyListComponent.prototype.deleteApiKey = function () {
        this.deleteObject(this.apiKey);
    };
    ApiKeyListComponent.prototype.authorizeAccess = function () {
        var key = this.apiKey.key;
        if (this.appSendMessage) {
            var messageWindow = window.opener;
            if (!messageWindow) {
                messageWindow = window.parent;
            }
            messageWindow.postMessage(key, '*');
        }
        else {
            var url = this.appRedirectUrl;
            if (url.indexOf('?') === -1) {
                url += '?';
            }
            else {
                url += '&';
            }
            url += 'apiKey=' + key;
            this.document.location.href = url;
        }
    };
    ApiKeyListComponent.prototype.onDeleted = function (apiKey) {
        _super.prototype.onDeleted.call(this, apiKey);
        if (this.rows.length === 0) {
            this.hasApiKey = false;
            this.apiKey = null;
        }
        else {
            var setApiKey = true;
            if (this.apiKey) {
                for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
                    var row = _a[_i];
                    if (this.apiKey === row) {
                        setApiKey = false;
                    }
                }
            }
            if (setApiKey) {
                this.apiKey = this.rows[0];
            }
        }
    };
    ApiKeyListComponent.prototype.setRows = function (rows) {
        _super.prototype.setRows.call(this, rows);
        if (rows.length > 0) {
            this.hasApiKey = true;
            var setApiKey = true;
            if (this.apiKey) {
                for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                    var row = rows_1[_i];
                    if (this.apiKey.key === row.key) {
                        this.apiKey = row;
                        setApiKey = false;
                    }
                }
            }
            if (setApiKey) {
                this.apiKey = this.rows[0];
            }
            this.acceptTerms = true;
        }
        else {
            this.hasApiKey = false;
        }
    };
    ApiKeyListComponent.prototype.requestAccess = function () {
        var _this = this;
        var url = this.service.getUrl('/organizations/_join');
        this.service.httpRequest(function (http) {
            return http.post(url, '', { headers: { 'Content-Type': 'application/json' } });
        }, function (response) {
            var json = response.json();
            if (json.error) {
                _this.showError(json.error);
                return null;
            }
            else {
                _this.authService.roles.push('gwa_github_developer');
                _this.refresh();
                return null;
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('actionsT'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"])
    ], ApiKeyListComponent.prototype, "actionsTemplate", void 0);
    ApiKeyListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-api-key-list',
            template: __webpack_require__(/*! ./ApiKeyList.html */ "./src/app/ApiKey/ApiKeyList.html"),
            styles: [__webpack_require__(/*! ./ApiKeyList.css */ "./src/app/ApiKey/ApiKeyList.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"],
            _ApiKeyService__WEBPACK_IMPORTED_MODULE_3__["ApiKeyService"]])
    ], ApiKeyListComponent);
    return ApiKeyListComponent;
}(revolsys_angular_framework__WEBPACK_IMPORTED_MODULE_1__["BaseListComponent"]));



/***/ }),

/***/ "./src/app/ApiKey/ApiKeyService.ts":
/*!*****************************************!*\
  !*** ./src/app/ApiKey/ApiKeyService.ts ***!
  \*****************************************/
/*! exports provided: ApiKeyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiKeyService", function() { return ApiKeyService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var revolsys_angular_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! revolsys-angular-framework */ "../../../../../Angular/revolsys-angular/dist/revolsys-angular-framework/fesm5/revolsys-angular-framework.js");
/* harmony import */ var _ApiKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ApiKey */ "./src/app/ApiKey/ApiKey.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ApiKeyService = /** @class */ (function (_super) {
    __extends(ApiKeyService, _super);
    function ApiKeyService(injector) {
        var _this = _super.call(this, injector) || this;
        _this.path = '/apiKeys';
        _this.typeTitle = 'API Key';
        _this.labelFieldName = 'key';
        return _this;
    }
    ApiKeyService.prototype.addObject = function (apiKey, path) {
        return this.addObjectDo('/apiKeys', apiKey);
    };
    ApiKeyService.prototype.deleteObject = function (apiKey, path) {
        return this.deleteObjectDo("/apiKeys/" + apiKey.key);
    };
    ApiKeyService.prototype.getUrl = function (path) {
        return window.location.protocol + '//' + window.location.host + this.config.basePath + '/rest' + path;
    };
    ApiKeyService.prototype.newObject = function () {
        return new _ApiKey__WEBPACK_IMPORTED_MODULE_2__["ApiKey"]();
    };
    ApiKeyService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]])
    ], ApiKeyService);
    return ApiKeyService;
}(revolsys_angular_framework__WEBPACK_IMPORTED_MODULE_1__["BaseService"]));



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var revolsys_angular_framework__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! revolsys-angular-framework */ "../../../../../Angular/revolsys-angular/dist/revolsys-angular-framework/fesm5/revolsys-angular-framework.js");
/* harmony import */ var _ApiKey_ApiKeyListComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ApiKey/ApiKeyListComponent */ "./src/app/ApiKey/ApiKeyListComponent.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: '', redirectTo: 'ui/apiKeys', pathMatch: 'full' },
    { path: 'ui', redirectTo: 'ui/apiKeys', pathMatch: 'full' },
    { path: 'ui/apiKeys', component: _ApiKey_ApiKeyListComponent__WEBPACK_IMPORTED_MODULE_3__["ApiKeyListComponent"], pathMatch: 'full' },
    { path: '**', component: revolsys_angular_framework__WEBPACK_IMPORTED_MODULE_2__["PageNotFoundComponent"] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<bcgov-page>\n  <div class=\"flexFullHeight\">\n    <router-outlet></router-outlet>\n  </div>\n</bcgov-page>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: []
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/table */ "../../node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "../../node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "../../node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "../../node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var revolsys_angular_bcgov_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! revolsys-angular-bcgov-page */ "../../node_modules/revolsys-angular-bcgov-page/fesm5/revolsys-angular-bcgov-page.js");
/* harmony import */ var revolsys_angular_framework__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! revolsys-angular-framework */ "../../../../../Angular/revolsys-angular/dist/revolsys-angular-framework/fesm5/revolsys-angular-framework.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _Api_ApiService__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Api/ApiService */ "./src/app/Api/ApiService.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _Api_ApiListComponent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Api/ApiListComponent */ "./src/app/Api/ApiListComponent.ts");
/* harmony import */ var _ApiKey_ApiKeyService__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ApiKey/ApiKeyService */ "./src/app/ApiKey/ApiKeyService.ts");
/* harmony import */ var _ApiKey_ApiKeyListComponent__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ApiKey/ApiKeyListComponent */ "./src/app/ApiKey/ApiKeyListComponent.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var AppModule = /** @class */ (function () {
    function AppModule(mdIconRegistry) {
        mdIconRegistry.registerFontClassAlias('fa', 'fa');
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["NoopAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                _angular_cdk_table__WEBPACK_IMPORTED_MODULE_3__["CdkTableModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["NgxDatatableModule"],
                revolsys_angular_framework__WEBPACK_IMPORTED_MODULE_10__["RevolsysAngularFrameworkModule"].forRoot(new revolsys_angular_framework__WEBPACK_IMPORTED_MODULE_10__["Config"]('API Keys')),
                revolsys_angular_bcgov_page__WEBPACK_IMPORTED_MODULE_9__["RevolsysAngularBcgovPageModule"].forRoot({
                    basePath: '/',
                    title: 'API Keys',
                    fullWidthContent: true,
                    headerMenuItems: [
                        {
                            title: 'API Keys',
                            routerLink: 'ui/apiKeys'
                        },
                    ]
                }),
                _app_routing_module__WEBPACK_IMPORTED_MODULE_11__["AppRoutingModule"]
            ],
            entryComponents: [],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"],
                _Api_ApiListComponent__WEBPACK_IMPORTED_MODULE_14__["ApiListComponent"],
                _ApiKey_ApiKeyListComponent__WEBPACK_IMPORTED_MODULE_16__["ApiKeyListComponent"],
            ],
            providers: [
                _Api_ApiService__WEBPACK_IMPORTED_MODULE_12__["ApiService"],
                _ApiKey_ApiKeyService__WEBPACK_IMPORTED_MODULE_15__["ApiKeyService"],
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"]]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconRegistry"]])
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/projects/gwa-devkey/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map