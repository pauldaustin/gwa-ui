(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../src/shared/Authentication/auth.service.ts":
/*!******************************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/Authentication/auth.service.ts ***!
  \******************************************************************************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/Observable */ "../../node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var rxjs_add_observable_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/add/observable/of */ "../../node_modules/rxjs-compat/_esm5/add/observable/of.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "../../node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/toPromise */ "../../node_modules/rxjs-compat/_esm5/add/operator/toPromise.js");
/* harmony import */ var rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Service_BaseService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Service/BaseService */ "../../src/shared/Service/BaseService.ts");
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






var AuthService = /** @class */ (function (_super) {
    __extends(AuthService, _super);
    function AuthService(injector) {
        var _this = _super.call(this, injector) || this;
        var url = _this.getUrl('/authentication');
        _this.httpRequest(function (http) {
            return http.get(url);
        }, function (response) {
            var json = response.json();
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
    AuthService.prototype.hasRole = function (role) {
        if (this.roles == null) {
            return false;
        }
        else {
            return this.roles.indexOf(role) !== -1;
        }
    };
    AuthService.prototype.hasAnyRole = function (roles) {
        if (this.roles == null) {
            return true;
        }
        else {
            for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
                var role = roles_1[_i];
                if (this.roles.indexOf(role) !== -1) {
                    return true;
                }
            }
            return false;
        }
    };
    AuthService.prototype.hasAnyRoleAsync = function (roles) {
        var _this = this;
        if (this.roles == null) {
            var url = this.getUrl('/authentication');
            return this.http.get(url)
                .map(function (response) {
                var json = response.json();
                if (json.error) {
                    _this.roles = [];
                }
                else {
                    _this.roles = json.roles;
                }
                return _this.hasAnyRole(roles);
            });
        }
        else {
            return rxjs_Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"].of(this.hasAnyRole(roles));
        }
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"]])
    ], AuthService);
    return AuthService;
}(_Service_BaseService__WEBPACK_IMPORTED_MODULE_5__["BaseService"]));



/***/ }),

/***/ "../../src/shared/Component/BaseComponent.ts":
/*!**************************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/Component/BaseComponent.ts ***!
  \**************************************************************************************************/
/*! exports provided: BaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return BaseComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Config */ "../../src/shared/Config.ts");
/* harmony import */ var _Authentication_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Authentication/auth.service */ "../../src/shared/Authentication/auth.service.ts");
/* harmony import */ var _MessageDialogComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MessageDialogComponent */ "../../src/shared/Component/MessageDialogComponent.ts");








var BaseComponent = /** @class */ (function () {
    function BaseComponent(injector, service, title) {
        this.injector = injector;
        this.service = service;
        this.authService = this.injector.get(_Authentication_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"]);
        this.config = this.injector.get(_Config__WEBPACK_IMPORTED_MODULE_4__["Config"]);
        this.dialog = this.injector.get(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]);
        this.document = this.injector.get(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]);
        this.location = this.injector.get(_angular_common__WEBPACK_IMPORTED_MODULE_0__["Location"]);
        this.route = this.injector.get(_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]);
        this.router = this.injector.get(_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]);
        this.titleService = this.injector.get(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Title"]);
        this.setTitle(title);
    }
    BaseComponent.prototype.ngOnInit = function () {
    };
    BaseComponent.prototype.routeList = function () {
        this.router.navigate(['..'], { relativeTo: this.route });
    };
    BaseComponent.prototype.showError = function (message, body) {
        var dialogRef = this.dialog.open(_MessageDialogComponent__WEBPACK_IMPORTED_MODULE_6__["MessageDialogComponent"], {
            data: {
                title: 'Error',
                message: message,
                body: body,
            }
        });
    };
    BaseComponent.prototype.getUrl = function (path) {
        return this.config.basePath + '/rest' + path;
    };
    BaseComponent.prototype.hasRole = function (role) {
        return this.authService.hasRole(role);
    };
    Object.defineProperty(BaseComponent.prototype, "username", {
        get: function () {
            return this.authService.username;
        },
        enumerable: true,
        configurable: true
    });
    BaseComponent.prototype.setTitle = function (title) {
        this.titleService.setTitle(title);
    };
    BaseComponent.prototype.stringValue = function (object) {
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
    BaseComponent.prototype.trackByIndex = function (index) {
        return index;
    };
    return BaseComponent;
}());



/***/ }),

/***/ "../../src/shared/Component/BaseListComponent.ts":
/*!******************************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/Component/BaseListComponent.ts ***!
  \******************************************************************************************************/
/*! exports provided: BaseListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseListComponent", function() { return BaseListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _BaseComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseComponent */ "../../src/shared/Component/BaseComponent.ts");
/* harmony import */ var _DeleteDialogComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DeleteDialogComponent */ "../../src/shared/Component/DeleteDialogComponent.ts");
/* harmony import */ var _shared_Service_ArrayDataSource__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/Service/ArrayDataSource */ "../../src/shared/Service/ArrayDataSource.ts");
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





var BaseListComponent = /** @class */ (function (_super) {
    __extends(BaseListComponent, _super);
    function BaseListComponent(injector, service, title) {
        var _this = _super.call(this, injector, service, title) || this;
        _this.dataSource = new _shared_Service_ArrayDataSource__WEBPACK_IMPORTED_MODULE_4__["ArrayDataSource"]();
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
    BaseListComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    BaseListComponent.prototype.refresh = function () {
        var _this = this;
        if (this.paging) {
            this.page(this.offset, this.limit);
        }
        else {
            this.refreshingCount++;
            var filter = this.newFilter();
            this.service.getObjects(this.path, filter).then(function (objects) {
                _this.setRows(objects);
                _this.refreshingCount--;
            });
        }
    };
    BaseListComponent.prototype.setRows = function (rows) {
        this.rows = rows;
        this.hasRows = rows.length > 0;
        this.dataSource.setData(rows);
    };
    BaseListComponent.prototype.deleteObject = function (object) {
        var _this = this;
        var dialogRef = this.dialog.open(_DeleteDialogComponent__WEBPACK_IMPORTED_MODULE_3__["DeleteDialogComponent"], {
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
    BaseListComponent.prototype.deleteObjectDo = function (object) {
        var _this = this;
        this.service.deleteObject(object, this.path)
            .then(function (deleted) {
            if (deleted) {
                _this.onDeleted(object);
            }
        });
    };
    BaseListComponent.prototype.onDeleted = function (object) {
        if (this.paging) {
            this.refresh();
        }
        else {
            var rows = this.rows.filter(function (row) { return row !== object; });
            this.setRows(rows);
        }
    };
    BaseListComponent.prototype.getRows = function () {
        return this.rows;
    };
    BaseListComponent.prototype.page = function (offset, limit) {
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
    BaseListComponent.prototype.newFilter = function () {
        var filter = {};
        if (this.filter) {
            for (var _i = 0, _a = Object.keys(this.filter); _i < _a.length; _i++) {
                var fieldName = _a[_i];
                filter[fieldName] = this.filter[fieldName];
            }
        }
        if (this.filterFieldName) {
            filter[this.filterFieldName] = this.filterValue;
        }
        return filter;
    };
    BaseListComponent.prototype.fetch = function (offset, limit, callback) {
        var filter = this.newFilter();
        this.service.getRowsPage(offset, limit, this.path, this.filter).then(callback);
    };
    BaseListComponent.prototype.onPage = function (event) {
        if (this.lastOffset !== event.offset) {
            this.lastOffset = event.offset;
            this.page(event.offset, event.limit);
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('idT'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"])
    ], BaseListComponent.prototype, "idTemplate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('actionsT'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"])
    ], BaseListComponent.prototype, "actionsTemplate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('dateT'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"])
    ], BaseListComponent.prototype, "dateTemplate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('flagT'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"])
    ], BaseListComponent.prototype, "flagTemplate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('arrayT'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"])
    ], BaseListComponent.prototype, "arrayTemplate", void 0);
    return BaseListComponent;
}(_BaseComponent__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));



/***/ }),

/***/ "../../src/shared/Component/DeleteDialogComponent.ts":
/*!**********************************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/Component/DeleteDialogComponent.ts ***!
  \**********************************************************************************************************/
/*! exports provided: DeleteDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteDialogComponent", function() { return DeleteDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var DeleteDialogComponent = /** @class */ (function () {
    function DeleteDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.typeTitle = this.data['typeTitle'];
        this.objectLabel = this.data['objectLabel'];
    }
    DeleteDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-delete-dialog',
            template: "\n<h1 mat-dialog-title>Delete {{typeTitle}}?</h1>\n<div mat-dialog-content>\n  <p>Are you sure you want to delete {{typeTitle}}:</p>\n  <p><b>{{objectLabel}}</b>?</p>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"dialogRef.close('Cancel')\">Cancel</button>\n  <button mat-raised-button (click)=\"dialogRef.close('Delete')\" color=\"warn\" style=\"margin-left: 10px;\">Delete</button>\n</div>\n  ",
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], DeleteDialogComponent);
    return DeleteDialogComponent;
}());



/***/ }),

/***/ "../../src/shared/Component/LoginDialogComponent.ts":
/*!*********************************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/Component/LoginDialogComponent.ts ***!
  \*********************************************************************************************************/
/*! exports provided: LoginDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginDialogComponent", function() { return LoginDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Config */ "../../src/shared/Config.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var LoginDialogComponent = /** @class */ (function () {
    function LoginDialogComponent(config, dialogRef, data) {
        this.config = config;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    LoginDialogComponent.prototype.ngAfterViewInit = function () {
        this.login();
    };
    LoginDialogComponent.prototype.login = function () {
        var _this = this;
        var window = document.defaultView;
        if (this.loginWindow && !this.loginWindow.closed) {
            this.loginWindow.focus();
        }
        else {
            var top_1 = window;
            var width = window.outerWidth * 0.9;
            if (width > 800) {
                width = 800;
            }
            var x = window.outerWidth / 2 + window.screenX - (width / 2);
            var y = window.outerHeight / 2 + window.screenY - (300);
            this.loginWindow = window.open(this.config.basePath + '/login/window', 'gwaLogin', "menubar=no,location=no,status=no,left=" + x + ",top=" + y + ",width=" + width + ",height=600");
        }
        if (this.loginWindow) {
            var listener_1 = function (event) {
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
    LoginDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login-dialog',
            template: "\n<h1 mat-dialog-title>Login</h1>\n<div mat-dialog-content>\n  <p>You must be logged in to access this application. Click the Login button to open the login window.</p>\n  <p><b>NOTE:</b> Web browsers may block automated pop-up windows.<br />Allow popups for this site in your\nweb browser to open to allow the login popup.</p>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"login()\" color=\"primary\">Login</button>\n</div>\n  ",
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_Config__WEBPACK_IMPORTED_MODULE_2__["Config"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], LoginDialogComponent);
    return LoginDialogComponent;
}());



/***/ }),

/***/ "../../src/shared/Component/MessageDialogComponent.ts":
/*!***********************************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/Component/MessageDialogComponent.ts ***!
  \***********************************************************************************************************/
/*! exports provided: MessageDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageDialogComponent", function() { return MessageDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var MessageDialogComponent = /** @class */ (function () {
    function MessageDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.title = this.data['title'];
        this.message = this.data['message'];
        this.body = this.data['body'];
    }
    MessageDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-message-dialog',
            template: "\n<h1 mat-dialog-title>{{title}}</h1>\n<div mat-dialog-content>\n<p>{{message}}<p>\n<pre>{{body}}</pre>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"dialogRef.close()\" color=\"primary\">Close</button>\n</div>\n  ",
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], MessageDialogComponent);
    return MessageDialogComponent;
}());



/***/ }),

/***/ "../../src/shared/Component/PageNotFoundComponent.ts":
/*!**********************************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/Component/PageNotFoundComponent.ts ***!
  \**********************************************************************************************************/
/*! exports provided: PageNotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNotFoundComponent", function() { return PageNotFoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent(location) {
        this.location = location;
    }
    PageNotFoundComponent.prototype.back = function () {
        this.location.back();
    };
    PageNotFoundComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-not-found',
            template: "\n    <div class=\"error-box\">\n      <h1>404 Error</h1>\n      <p>I'm sorry the page you requested could not be found.</p>\n      <button  (click)=\"back()\" mat-raised-button color=\"warn\">\n        <span class=\"fa fa-chevron-left\" aria-hidden=\"true\"></span> Back\n      </button>\n    </div>\n  ",
            styles: ["\n.error-box {\n  margin-top:10px;\n  padding: 10px;\n  color:#f44336;\n  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),\n              0 2px 2px 0 rgba(0,0,0,.14),\n              0 1px 5px 0 rgba(0,0,0,.12);\n}\n  "]
        }),
        __metadata("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"]])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());



/***/ }),

/***/ "../../src/shared/Config.ts":
/*!*********************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/Config.ts ***!
  \*********************************************************************************/
/*! exports provided: Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
var Config = /** @class */ (function () {
    function Config() {
        this.basePath = '';
    }
    return Config;
}());



/***/ }),

/***/ "../../src/shared/Service/ArrayDataSource.ts":
/*!**************************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/Service/ArrayDataSource.ts ***!
  \**************************************************************************************************/
/*! exports provided: ArrayDataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayDataSource", function() { return ArrayDataSource; });
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/table */ "../../node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/BehaviorSubject */ "../../node_modules/rxjs-compat/_esm5/BehaviorSubject.js");
/* harmony import */ var rxjs_add_operator_startWith__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/startWith */ "../../node_modules/rxjs-compat/_esm5/add/operator/startWith.js");
/* harmony import */ var rxjs_add_observable_merge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/observable/merge */ "../../node_modules/rxjs-compat/_esm5/add/observable/merge.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/operator/map */ "../../node_modules/rxjs-compat/_esm5/add/operator/map.js");
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





var ArrayDataSource = /** @class */ (function (_super) {
    __extends(ArrayDataSource, _super);
    function ArrayDataSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataChange = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        return _this;
    }
    ArrayDataSource.prototype.connect = function () {
        return this.dataChange;
    };
    ArrayDataSource.prototype.setData = function (data) {
        this.dataChange.next(data);
    };
    ArrayDataSource.prototype.disconnect = function () {
    };
    return ArrayDataSource;
}(_angular_cdk_table__WEBPACK_IMPORTED_MODULE_0__["DataSource"]));



/***/ }),

/***/ "../../src/shared/Service/BaseService.ts":
/*!**********************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/Service/BaseService.ts ***!
  \**********************************************************************************************/
/*! exports provided: BaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseService", function() { return BaseService; });
/* harmony import */ var rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/add/operator/toPromise */ "../../node_modules/rxjs-compat/_esm5/add/operator/toPromise.js");
/* harmony import */ var rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "../../node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Config */ "../../src/shared/Config.ts");
/* harmony import */ var _Component_LoginDialogComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Component/LoginDialogComponent */ "../../src/shared/Component/LoginDialogComponent.ts");
/* harmony import */ var _Component_MessageDialogComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Component/MessageDialogComponent */ "../../src/shared/Component/MessageDialogComponent.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var BaseService = /** @class */ (function () {
    function BaseService(injector) {
        this.injector = injector;
        this.config = this.injector.get(_Config__WEBPACK_IMPORTED_MODULE_6__["Config"]);
        this.document = this.injector.get(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"]);
        this.http = this.injector.get(_angular_http__WEBPACK_IMPORTED_MODULE_3__["Http"]);
        this.location = this.injector.get(_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]);
        this.idFieldName = 'id';
        this.pathParamName = 'id';
        this.dialog = this.injector.get(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"]);
        this.usePostForDelete = true;
        this.jsonHeaders = new _angular_http__WEBPACK_IMPORTED_MODULE_3__["Headers"]({ 'Content-Type': 'application/json' });
    }
    BaseService_1 = BaseService;
    BaseService.prototype.addObject = function (object, path) {
        if (!path) {
            path = this.path;
        }
        return this.addObjectDo(path, object);
    };
    BaseService.prototype.httpRequest = function (request, handler) {
        var _this = this;
        var response = request(this.http);
        return response.toPromise()
            .then(handler)
            .catch(function (error) {
            if (error.status === 403) {
                return new Promise(function (resolve, reject) {
                    var loginDialog = BaseService_1.loginDialog;
                    if (loginDialog) {
                        loginDialog.componentInstance.login();
                    }
                    else {
                        loginDialog = _this.dialog.open(_Component_LoginDialogComponent__WEBPACK_IMPORTED_MODULE_7__["LoginDialogComponent"], {
                            disableClose: true
                        });
                        BaseService_1.loginDialog = loginDialog;
                        loginDialog.afterClosed().subscribe(function (dialogResponse) {
                            BaseService_1.loginDialog = null;
                        });
                    }
                    loginDialog.afterClosed().subscribe(function (dialogResponse) {
                        if (dialogResponse === 'Login') {
                            _this.httpRequest(request, handler).then(function (validResult) {
                                resolve(validResult);
                            }, function (errorResult) {
                                reject(errorResult);
                            });
                        }
                        else {
                            reject('Not logged in');
                        }
                    });
                });
            }
            else if (error.status === 404) {
                return Promise.resolve(null);
            }
            else {
                _this.showError(error.message || error);
                return Promise.reject(error.message || error);
            }
        });
    };
    BaseService.prototype.addObjectDo = function (path, object, callback) {
        var _this = this;
        var url = this.getUrl(path);
        var jsonText = JSON.stringify(object);
        return this.httpRequest(function (http) {
            return http.post(url, jsonText, { headers: _this.jsonHeaders });
        }, function (response) {
            var json = response.json();
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
    BaseService.prototype.addOrUpdateObject = function (object) {
        if (object == null) {
            return Promise.resolve(object);
        }
        else if (object[this.idFieldName]) {
            return this.updateObject(object);
        }
        else {
            return this.addObject(object);
        }
    };
    BaseService.prototype.showError = function (message, body) {
        var dialogRef = this.dialog.open(_Component_MessageDialogComponent__WEBPACK_IMPORTED_MODULE_8__["MessageDialogComponent"], {
            data: {
                title: 'Error',
                message: message,
                body: body,
            }
        });
    };
    BaseService.prototype.getUrl = function (path) {
        return this.config.basePath + '/rest' + path;
    };
    BaseService.prototype.deleteObject = function (object, path) {
        return null;
    };
    BaseService.prototype.deleteObjectDo = function (path, callback, parameters) {
        var _this = this;
        var params = new _angular_http__WEBPACK_IMPORTED_MODULE_3__["URLSearchParams"]();
        if (parameters) {
            for (var _i = 0, _a = Object.keys(parameters); _i < _a.length; _i++) {
                var name_1 = _a[_i];
                params.set(name_1, parameters[name_1]);
            }
        }
        var url = this.getUrl(path);
        var handler = function (httpResponse) {
            var json = httpResponse.json();
            if (json.error) {
                _this.showError(json.error, json.body);
                return false;
            }
            else {
                var deleted = json.deleted === true;
                if (callback) {
                    callback(deleted);
                }
                return deleted;
            }
        };
        if (this.usePostForDelete) {
            return this.httpRequest(function (http) {
                return http.post(url, '', {
                    headers: new _angular_http__WEBPACK_IMPORTED_MODULE_3__["Headers"]({
                        'Content-Type': 'application/json',
                        'X-HTTP-Method-Override': 'DELETE'
                    }),
                    search: params
                });
            }, handler);
        }
        else {
            return this.httpRequest(function (http) {
                return http.delete(url, {
                    headers: _this.jsonHeaders,
                    search: params
                });
            }, handler);
        }
    };
    BaseService.prototype.getLabel = function (object) {
        var fieldNames;
        if (this.labelFieldName) {
            fieldNames = this.labelFieldName.split('.');
        }
        else {
            fieldNames = [this.idFieldName];
        }
        var value = object;
        for (var _i = 0, fieldNames_1 = fieldNames; _i < fieldNames_1.length; _i++) {
            var fieldName = fieldNames_1[_i];
            if (value == null) {
                return null;
            }
            else {
                value = value[fieldName];
            }
        }
        return value;
    };
    BaseService.prototype.getObject = function (id, values) {
        return this.getObjectDo(this.path + '/' + id, values);
    };
    BaseService.prototype.getObjectDo = function (path, values) {
        var _this = this;
        var url = this.getUrl(path);
        return this.httpRequest(function (http) {
            return http.get(url);
        }, function (response) {
            var json = response.json();
            if (json.error) {
                _this.showError(json.error, json.body);
                return null;
            }
            else {
                var object = _this.toObject(json);
                if (values) {
                    for (var _i = 0, _a = Object.keys(values); _i < _a.length; _i++) {
                        var key = _a[_i];
                        object[key] = values[key];
                    }
                }
                return object;
            }
        });
    };
    BaseService.prototype.getObjects = function (path, filter) {
        if (!path) {
            path = this.path;
        }
        return this.getObjectsDo(path, filter);
    };
    BaseService.prototype.getObjectsDo = function (path, filter) {
        var _this = this;
        var params = new _angular_http__WEBPACK_IMPORTED_MODULE_3__["URLSearchParams"]();
        this.addFilterParams(params, filter);
        var url = this.getUrl(path);
        return this.httpRequest(function (http) {
            return http.get(url, {
                search: params
            });
        }, function (response) {
            return _this.getObjectsFromJson(response);
        });
    };
    BaseService.prototype.getObjectsFromJson = function (response) {
        var _this = this;
        var objects = [];
        var json = response.json();
        if (json.error) {
            this.showError(json.error, json.body);
        }
        else {
            var data = json.data;
            if (data) {
                data.forEach(function (recordJson) {
                    var record = _this.toObject(recordJson);
                    objects.push(record);
                });
            }
        }
        return objects;
    };
    BaseService.prototype.getPath = function () {
        return this.path;
    };
    BaseService.prototype.addFilterParams = function (params, filter) {
        if (filter) {
            for (var _i = 0, _a = Object.keys(filter); _i < _a.length; _i++) {
                var fieldName = _a[_i];
                var value = filter[fieldName];
                params.append('filterFieldName', fieldName);
                params.append('filterValue', value);
            }
        }
    };
    BaseService.prototype.getRowsPage = function (offset, limit, path, filter) {
        var _this = this;
        var params = new _angular_http__WEBPACK_IMPORTED_MODULE_3__["URLSearchParams"]();
        params.set('offset', offset.toString());
        params.set('limit', limit.toString());
        this.addFilterParams(params, filter);
        if (!path) {
            path = this.path;
        }
        var url = this.getUrl(path);
        return this.httpRequest(function (http) {
            return http.get(url, {
                search: params
            });
        }, function (response) {
            var rows = [];
            var total = 0;
            var json = response.json();
            if (json.error) {
                _this.showError(json.error, json.body);
                return null;
            }
            else {
                var data = json.data;
                if (data) {
                    data.forEach(function (recordJson) {
                        var record = _this.toObject(recordJson);
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
    BaseService.prototype.getTypeTitle = function () {
        return this.typeTitle;
    };
    BaseService.prototype.newObject = function () {
        return null;
    };
    BaseService.prototype.toObject = function (json) {
        var record = this.newObject();
        Object.assign(record, json);
        return record;
    };
    BaseService.prototype.updateObject = function (object) {
        return null;
    };
    BaseService.prototype.updateObjectDo = function (path, object, callback) {
        var _this = this;
        var url = this.getUrl(path);
        var jsonText = JSON.stringify(object);
        return this.httpRequest(function (http) {
            return http.put(url, jsonText, { headers: _this.jsonHeaders });
        }, function (response) {
            var json = response.json();
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
    BaseService = BaseService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"]])
    ], BaseService);
    return BaseService;
    var BaseService_1;
}());



/***/ }),

/***/ "../../src/shared/bcgov-template/BcGovTemplate.css":
/*!********************************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/bcgov-template/BcGovTemplate.css ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bcgov-template {\n  font-family: Myriad-Pro, Calibri, Arial, 'sans serif';\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background-color: #f1f1f1;\n}\n\n.collapse {\n  display: none;\n}\n\n.container {\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto\n}\n\n.menu .menu-sections.container {\n  padding-left: 0px;\n  padding-right: 0px;\n}\n\n@media ( min-width :820px) {\n  .container {\n    width: 750px;\n  }\n  .menu .menu-sections.container {\n    padding-left: 15px;\n    padding-right: 15px;\n  }\n}\n\n@media ( min-width :1020px) {\n  .container {\n    width: 970px;\n  }\n}\n\n@media ( min-width :1220px) {\n  .container {\n    width: 1170px;\n  }\n}\n\nheader {\n  margin-bottom: 5px;\n  box-shadow: 0 3px 3px 1px rgba(51, 51, 51, .5);\n}\n\n.header-title {\n  flex: 1 1 auto;\n  -ms-grid-row-align: stretch;\n      align-self: stretch;\n  margin: auto 0px auto 0px;\n}\n\n.header-title a {\n  text-decoration: none;\n  color: white;\n  margin: 0px;\n  font-size: 45px;\n}\n\n.logo {\n  margin-right: 10px;\n}\n\n.logo-large {\n  display: none;\n}\n\n.bcgov-content {\n  flex: 1 1 auto;\n  display: flex;\n  flex-direction: column;\n  margin: 0px;\n  align-items: stretch;\n}\n\n.bcgov-content .container {\n  background-color: white;\n  padding-top: 5px;\n  padding-bottom: 10px;\n  flex: 1 1 auto;\n  display: flex;\n  flex-direction: column;\n}\n\nfooter {\n  font-size: 14px;\n  border-top: 2px solid #fcba19;\n}\n\nfooter .menu {\n  background-color: #003366;\n}\n\n.titlebar {\n  background-color: #003366;\n  padding: 10px;\n}\n\n.titlebar .container {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  }\n\nheader .titlebar {\n  border-bottom: 2px solid #fcba19;\n}\n\nfooter .titlebar {\n  padding: 10px 10px 10px 0px;\n}\n\n.menu-button {\n  display: block;\n  border-width: 0px;\n  border-radius: 0px;\n  padding: 4px;\n  margin: auto 0px auto 10px;\n  background-color: #003366;\n  color: #c6d6ee;\n  font-size: 30px;\n  width: 38px;\n  height: 38px;\n}\n\n.menu-button:hover {\n  border-width: 0px;\n  background-color: #c6d6ee;\n  color: #003366;\n}\n\n.menu-button:focus {\n  outline: 0;\n}\n\n.menu {\n  background-color: #38598a;\n  color: #ffffff;\n}\n\n.menu .menu-sections {\n  display: flex;\n  flex-direction: column;\n}\n\n.menu ul {\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  margin: 0px;\n  padding: 0px;\n}\n\n.menu li {\n  border-top: 1px solid #748bad;\n  padding: 5px 10px 5px 10px;\n  display: block;\n  width: 100%;\n}\n\n.menu li>a {\n  color: #ffffff;\n  font-size: 14px;\n  text-decoration: none;\n}\n\n.menu li>a:hover {\n  text-decoration: underline;\n}\n\n.menu li>a.active-link {\n  font-weight: bold;\n  text-decoration: underline;\n}\n\n.menu .mat-icon {\n  height: 20px;\n  margin-top: -4px;\n}\n\n.fill-width {\n  flex-grow: 1;\n  height: 0px;\n}\n\nfooter .menu-button {\n  margin-left: auto;\n  display: block;\n}\n\n@media ( min-width : 769px) {\n  .bcgov-content {\n  }\n  .logo-small {\n    display: none;\n  }\n  .logo-large {\n    display: inline;\n  }\n  .menu-button {\n    display: none;\n  }\n  .titlebar {\n    padding: 10px 20px 10px 20px;\n  }\n  footer .titlebar {\n    display: none;\n  }\n  .menu.collapse {\n    display: block !important;\n    height: auto !important;\n    padding-bottom: 0;\n    overflow: visible !important;\n  }\n  .menu .menu-sections {\n    flex-direction: row;\n    flex-wrap: wrap;\n    padding: 10px 30px 0px 30px;\n  }\n  .menu ul {\n    flex-direction: row;\n  }\n  .menu ul>li {\n    border-left: 1px solid #748bad;\n    border-top-width: 0px;\n    padding: 0px 10px 0px 10px;\n    width: auto;\n    margin-bottom: 10px;\n  }\n  .menu ul>li:first-child {\n    border-left-width: 0px;\n  }\n  .menu-right {\n    \n  }\n}"

/***/ }),

/***/ "../../src/shared/bcgov-template/BcGovTemplate.html":
/*!*********************************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/bcgov-template/BcGovTemplate.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"bcgov-template\">\n  <header *ngIf=\"showHeaderAndFooter\">\n    <nav>\n      <div class=\"titlebar\">\n        <div class=\"container\">\n          <div class=\"logo\">\n            <a href=\"http://www2.gov.bc.ca/\">\n              <img src=\"/images/gov3_bc_logo.png\" class=\"logo-large\" />\n              <img src=\"/images/gov3_bc_logo_mobile.png\" class=\"logo-small\" />\n            </a> \n          </div>\n  \n          <div class=\"header-title\">\n            <a routerLink=\"/\">{{title}}</a>\n          </div>\n  \n          <button type=\"button\" class=\"menu-button collapsed\" (click)=\"headerMenuVisible = !headerMenuVisible\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"fa fa-bars\"></span>\n          </button>\n        </div>\n      </div>\n      <div class=\"menu\" [ngClass]=\"{'collapse': !headerMenuVisible}\">\n        <div class=\"menu-sections container\">\n          <ul>\n            <li *ngFor=\"let menuItem of headerMenuItems\">\n              <a\n                routerLink=\"{{menuItem.routerLink}}\" \n                title=\"{{menuItem.title}}\" \n                *ngIf=\"isMenuVisible(menuItem)\" \n                routerLinkActive=\"active-link\"\n              >{{menuItem.title}}</a>\n            </li>\n          </ul>\n          <div class=\"fill-width\"></div>\n          <ul *ngIf=\"username\" class=\"menu-right\">\n            <li class=\"navbar-link\">{{username}} <a href=\"logout\" class=\"navbar-link\"><mat-icon fontSet=\"fa\" fontIcon=\"fa-sign-out\"></mat-icon></a></li>\n          </ul>\n        </div>\n      </div>\n    </nav>\n  </header>\n\n  <div class=\"bcgov-content\">\n    <div class=\"container\">\n      <router-outlet></router-outlet>\n    </div>\n  </div>\n\n  <footer *ngIf=\"showHeaderAndFooter\">\n    <nav>\n      <div class=\"menu\" [ngClass]=\"{'collapse': !footerMenuVisible}\">\n        <div class=\"menu-sections container\" >\n          <ul>\n            <li><a href=\"http://www2.gov.bc.ca/gov/content/home\" title=\"About gov.bc.ca\">Home</a></li>\n            <li><a href=\"http://www2.gov.bc.ca/gov/content/home/disclaimer\" title=\"Disclaimer\">Disclaimer</a></li>\n            <li><a href=\"http://www2.gov.bc.ca/gov/content/home/privacy\" title=\"Privacy\">Privacy</a></li>\n            <li><a href=\"http://www2.gov.bc.ca/gov/content/home/accessibility\"\n              title=\"Accessibility\">Accessibility</a></li>\n            <li><a href=\"http://www2.gov.bc.ca/gov/content/home/copyright\" title=\"Copyright\">Copyright</a></li>\n            <li><a href=\"https://extranet.gov.bc.ca/forms/gov/contact/index.html\"\n              title=\"Contact Us\">Contact Us</a></li>\n          </ul>\n        </div>\n      </div>\n     <div class=\"titlebar\">\n        <button type=\"button\" class=\"menu-button collapsed\" (click)=\"footerMenuVisible = !footerMenuVisible\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"fa fa-bars\"></span>\n        </button>\n      </div>\n    </nav>\n  </footer>\n</div>"

/***/ }),

/***/ "../../src/shared/bcgov-template/BcGovTemplateComponent.ts":
/*!****************************************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/bcgov-template/BcGovTemplateComponent.ts ***!
  \****************************************************************************************************************/
/*! exports provided: BcGovTemplateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BcGovTemplateComponent", function() { return BcGovTemplateComponent; });
/* harmony import */ var rxjs_add_operator_first__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/add/operator/first */ "../../node_modules/rxjs-compat/_esm5/add/operator/first.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _Authentication_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Authentication/auth.service */ "../../src/shared/Authentication/auth.service.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Config */ "../../src/shared/Config.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var BcGovTemplateComponent = /** @class */ (function () {
    function BcGovTemplateComponent(route, router, authService, titleService, config) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.titleService = titleService;
        this.title = '';
        this.headerMenuVisible = false;
        this.footerMenuVisible = false;
        this.showHeaderAndFooter = true;
        if (config) {
            this.title = config.title;
            if (this.title) {
                this.titleService.setTitle(config.title);
            }
            if (config.headerMenuItems) {
                this.headerMenuItems = config.headerMenuItems;
            }
        }
    }
    BcGovTemplateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            if (_this.showHeaderAndFooter) {
                _this.showHeaderAndFooter = !('true' === params['contentOnly']);
            }
        });
    };
    BcGovTemplateComponent.prototype.isMenuVisible = function (menuItem) {
        for (var _i = 0, _a = this.router.config; _i < _a.length; _i++) {
            var route = _a[_i];
            if (route.path === menuItem.routerLink) {
                if (route.data) {
                    var roles = route.data['roles'];
                    if (roles) {
                        var visible = this.authService.hasAnyRole(roles);
                        return visible;
                    }
                }
            }
        }
        return true;
    };
    Object.defineProperty(BcGovTemplateComponent.prototype, "username", {
        get: function () {
            return this.authService.username;
        },
        enumerable: true,
        configurable: true
    });
    BcGovTemplateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-bcgov-template',
            template: __webpack_require__(/*! ./BcGovTemplate.html */ "../../src/shared/bcgov-template/BcGovTemplate.html"),
            styles: [__webpack_require__(/*! ./BcGovTemplate.css */ "../../src/shared/bcgov-template/BcGovTemplate.css")]
        }),
        __param(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _Authentication_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"],
            _Config__WEBPACK_IMPORTED_MODULE_5__["Config"]])
    ], BcGovTemplateComponent);
    return BcGovTemplateComponent;
}());



/***/ }),

/***/ "../../src/shared/input-file/input-file-component.html":
/*!************************************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/input-file/input-file-component.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<input [accept]=\"accept\" type=\"file\" (change)=\"onNativeInputFileSelect($event)\" #inputFile hidden />\n\n<mat-input-container>\n  <input mdInput placeholder=\"File\" name=\"file\" [(ngModel)]=\"fileName\" disabled=\"true\" />\n</mat-input-container>\n \n<button type=\"button\" mat-raised-button (click)=\"selectFile()\">\n  <mat-icon fontSet=\"fa\" fontIcon=\"fa-{{iconName}}\"></mat-icon>\n  {{label}}\n</button>\n"

/***/ }),

/***/ "../../src/shared/input-file/input-file-component.ts":
/*!**********************************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/input-file/input-file-component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: InputFileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputFileComponent", function() { return InputFileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InputFileComponent = /** @class */ (function () {
    function InputFileComponent() {
        this.iconName = 'floppy-o';
        this.label = 'Choose File';
        this.onFileSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    InputFileComponent.prototype.onNativeInputFileSelect = function (event) {
        var files = event.srcElement.files;
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
    InputFileComponent.prototype.selectFile = function () {
        this.nativeInputFile.nativeElement.click();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], InputFileComponent.prototype, "accept", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], InputFileComponent.prototype, "iconName", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], InputFileComponent.prototype, "label", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], InputFileComponent.prototype, "onFileSelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('inputFile'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], InputFileComponent.prototype, "nativeInputFile", void 0);
    InputFileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            'selector': 'app-input-file',
            template: __webpack_require__(/*! ./input-file-component.html */ "../../src/shared/input-file/input-file-component.html")
        })
    ], InputFileComponent);
    return InputFileComponent;
}());



/***/ }),

/***/ "../../src/shared/shared.module.ts":
/*!****************************************************************************************!*\
  !*** /Users/paustin/Development/ALL/ca.bc.gov.gwa/angular/src/shared/shared.module.ts ***!
  \****************************************************************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Config */ "../../src/shared/Config.ts");
/* harmony import */ var _bcgov_template_BcGovTemplateComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bcgov-template/BcGovTemplateComponent */ "../../src/shared/bcgov-template/BcGovTemplateComponent.ts");
/* harmony import */ var _Authentication_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Authentication/auth.service */ "../../src/shared/Authentication/auth.service.ts");
/* harmony import */ var _Component_DeleteDialogComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Component/DeleteDialogComponent */ "../../src/shared/Component/DeleteDialogComponent.ts");
/* harmony import */ var _Component_LoginDialogComponent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Component/LoginDialogComponent */ "../../src/shared/Component/LoginDialogComponent.ts");
/* harmony import */ var _Component_MessageDialogComponent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Component/MessageDialogComponent */ "../../src/shared/Component/MessageDialogComponent.ts");
/* harmony import */ var _Component_PageNotFoundComponent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Component/PageNotFoundComponent */ "../../src/shared/Component/PageNotFoundComponent.ts");
/* harmony import */ var _input_file_input_file_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./input-file/input-file-component */ "../../src/shared/input-file/input-file-component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var COMMON_MODULES = [
    _Component_PageNotFoundComponent__WEBPACK_IMPORTED_MODULE_11__["PageNotFoundComponent"],
    _Component_DeleteDialogComponent__WEBPACK_IMPORTED_MODULE_8__["DeleteDialogComponent"],
    _Component_LoginDialogComponent__WEBPACK_IMPORTED_MODULE_9__["LoginDialogComponent"],
    _Component_MessageDialogComponent__WEBPACK_IMPORTED_MODULE_10__["MessageDialogComponent"],
    _bcgov_template_BcGovTemplateComponent__WEBPACK_IMPORTED_MODULE_6__["BcGovTemplateComponent"],
    _input_file_input_file_component__WEBPACK_IMPORTED_MODULE_12__["InputFileComponent"]
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function (config) {
        return {
            ngModule: SharedModule_1,
            providers: [
                { provide: _Config__WEBPACK_IMPORTED_MODULE_5__["Config"], useValue: config }
            ]
        };
    };
    SharedModule = SharedModule_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"]
            ],
            exports: COMMON_MODULES,
            entryComponents: [
                _Component_DeleteDialogComponent__WEBPACK_IMPORTED_MODULE_8__["DeleteDialogComponent"],
                _Component_LoginDialogComponent__WEBPACK_IMPORTED_MODULE_9__["LoginDialogComponent"],
                _Component_MessageDialogComponent__WEBPACK_IMPORTED_MODULE_10__["MessageDialogComponent"]
            ],
            declarations: COMMON_MODULES,
            providers: [
                _Authentication_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"],
            ],
        })
    ], SharedModule);
    return SharedModule;
    var SharedModule_1;
}());



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
/* harmony import */ var _src_shared_Component_BaseListComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../src/shared/Component/BaseListComponent */ "../../src/shared/Component/BaseListComponent.ts");
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
}(_src_shared_Component_BaseListComponent__WEBPACK_IMPORTED_MODULE_1__["BaseListComponent"]));



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
/* harmony import */ var _src_shared_Service_BaseService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../src/shared/Service/BaseService */ "../../src/shared/Service/BaseService.ts");
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
}(_src_shared_Service_BaseService__WEBPACK_IMPORTED_MODULE_1__["BaseService"]));



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
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "../../node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _src_shared_Component_BaseListComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../src/shared/Component/BaseListComponent */ "../../src/shared/Component/BaseListComponent.ts");
/* harmony import */ var _ApiKey__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ApiKey */ "./src/app/ApiKey/ApiKey.ts");
/* harmony import */ var _ApiKeyService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ApiKeyService */ "./src/app/ApiKey/ApiKeyService.ts");
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
        this.route.queryParams.map(function (params) { return params; })
            .subscribe(function (params) {
            _this.appName = params['appName'];
            _this.appRedirectUrl = params['appRedirectUrl'];
            _this.appSendMessage = params['appSendMessage'] === 'true';
            _this.refresh();
        });
    };
    ApiKeyListComponent.prototype.addApiKey = function () {
        var _this = this;
        var apiKey = new _ApiKey__WEBPACK_IMPORTED_MODULE_3__["ApiKey"]();
        this.service.addObject(apiKey).then(function (apiKey2) {
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
            return http.post(url, '', { headers: new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json' }) });
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
    ApiKeyListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-api-key-list',
            template: __webpack_require__(/*! ./ApiKeyList.html */ "./src/app/ApiKey/ApiKeyList.html"),
            styles: [__webpack_require__(/*! ./ApiKeyList.css */ "./src/app/ApiKey/ApiKeyList.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"],
            _ApiKeyService__WEBPACK_IMPORTED_MODULE_4__["ApiKeyService"]])
    ], ApiKeyListComponent);
    return ApiKeyListComponent;
}(_src_shared_Component_BaseListComponent__WEBPACK_IMPORTED_MODULE_2__["BaseListComponent"]));



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
/* harmony import */ var _src_shared_Service_BaseService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../src/shared/Service/BaseService */ "../../src/shared/Service/BaseService.ts");
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
    ApiKeyService.prototype.addObject = function (apiKey) {
        return this.addObjectDo('/apiKeys', apiKey);
    };
    ApiKeyService.prototype.deleteObject = function (apiKey, path) {
        return this.deleteObjectDo("/apiKeys/" + apiKey.key);
    };
    ApiKeyService.prototype.newObject = function () {
        return new _ApiKey__WEBPACK_IMPORTED_MODULE_2__["ApiKey"]();
    };
    ApiKeyService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]])
    ], ApiKeyService);
    return ApiKeyService;
}(_src_shared_Service_BaseService__WEBPACK_IMPORTED_MODULE_1__["BaseService"]));



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
/* harmony import */ var _src_shared_Component_PageNotFoundComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../src/shared/Component/PageNotFoundComponent */ "../../src/shared/Component/PageNotFoundComponent.ts");
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
    { path: '**', component: _src_shared_Component_PageNotFoundComponent__WEBPACK_IMPORTED_MODULE_2__["PageNotFoundComponent"] },
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
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "../../node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/table */ "../../node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "../../node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "../../node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "../../node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var revolsys_bcgov_angular_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! revolsys-bcgov-angular-page */ "../../node_modules/revolsys-bcgov-angular-page/esm5/revolsys-bcgov-angular-page.js");
/* harmony import */ var _src_shared_shared_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../src/shared/shared.module */ "../../src/shared/shared.module.ts");
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
                _angular_http__WEBPACK_IMPORTED_MODULE_2__["HttpModule"],
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
                revolsys_bcgov_angular_page__WEBPACK_IMPORTED_MODULE_10__["RevolsysBcgovAngularPageModule"].forRoot({
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
                _src_shared_shared_module__WEBPACK_IMPORTED_MODULE_11__["SharedModule"].forRoot({
                    basePath: '',
                    title: 'API Keys',
                    headerMenuItems: [
                        {
                            title: 'API Keys',
                            routerLink: 'ui/apiKeys'
                        },
                    ]
                }),
                _app_routing_module__WEBPACK_IMPORTED_MODULE_9__["AppRoutingModule"]
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