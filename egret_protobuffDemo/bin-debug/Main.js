var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.isConneted = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        sky.touchEnabled = true;
        sky.addEventListener(egret.TouchEvent.TOUCH_END, this.cTouchClick, this);
    };
    Main.prototype.cTouchClick = function () {
        //let testString = "!@#$%^&*())&&T^&*__U(*A&*&^*^Y*!#*(C壹test imgs";
        var testString = JSON.stringify({ a: 123, b: 123, list: [{ ke: 1, bs: 2 }, { ke: 2, bs: 3, se: 2 }] });
        if (!this.socket) {
            this.socket = new egret.WebSocket();
            var socket_1 = this.socket;
            var that_1 = this;
            socket_1.type = egret.WebSocket.TYPE_BINARY;
            socket_1.addEventListener(egret.Event.CONNECT, function (response) {
                that_1.isConneted = true;
            }, this);
            socket_1.addEventListener(egret.Event.CLOSE, function (response) {
                console.log("CLOSE", response);
            }, this);
            socket_1.addEventListener(egret.IOErrorEvent.IO_ERROR, function (response) {
                console.log("IO_ERROR", response);
            }, this);
            socket_1.addEventListener(egret.ProgressEvent.SOCKET_DATA, function (response) {
                console.log("onMessage", response, egret.WebSocket.TYPE_BINARY);
                if (socket_1.type == egret.WebSocket.TYPE_BINARY) {
                    var bytes = new egret.ByteArray();
                    socket_1.readBytes(bytes);
                    //let string = bytes.readUTFBytes(bytes.length);
                    console.log("onMessage Bytes", bytes);
                    var modelProtobufText = RES.getRes("simple_proto");
                    console.log(modelProtobufText);
                    var modelProtobuf = dcodeIO.ProtoBuf.loadProto(modelProtobufText);
                    var modelstruct = modelProtobuf.build("RequestUser");
                    var arrayBuffer = bytes.rawBuffer;
                    response = modelstruct.decode(arrayBuffer);
                    console.log(response);
                }
                if (socket_1.type == egret.WebSocket.TYPE_STRING) {
                    var stringGet = socket_1.readUTF();
                    console.log("onMessage UTF8", stringGet);
                }
            }, this);
            socket_1.connectByUrl("ws://127.0.0.1:9090/ws");
        }
        else if (this.socket.type == egret.WebSocket.TYPE_BINARY) {
            /**
             * 推送正常结构的Json
             * @type {egret.WebSocket}
             */
            var socket = this.socket;
            //let bytesArray = new egret.ByteArray();
            //let len = testString.length;
            //for (var i = 0; i < len; i++) {
            //    let c = testString.charCodeAt(i);
            //    console.log(c);
            //    if (i == 0)
            //        bytesArray.writeByte(c);
            //    else if (c >= 0x010000 && c <= 0x10FFFF) {
            //        bytesArray.writeByte(((c >> 18) & 0x07) | 0xF0);
            //        bytesArray.writeByte(((c >> 12) & 0x3F) | 0x80);
            //        bytesArray.writeByte(((c >> 6) & 0x3F) | 0x80);
            //        bytesArray.writeByte((c & 0x3F) | 0x80);
            //    } else if (c >= 0x000800 && c <= 0x00FFFF) {
            //        console.log("((c >> 12) & 0x0F) | 0xE0", ((c >> 12) & 0x0F) | 0xE0);
            //        bytesArray.writeByte(((c >> 12) & 0x0F) | 0xE0);
            //        bytesArray.writeByte(((c >> 6) & 0x3F) | 0x80);
            //        bytesArray.writeByte((c & 0x3F) | 0x80);
            //    } else if (c >= 0x000080 && c <= 0x0007FF) {
            //        console.log(((c >> 6) & 0x1F) | 0xC0);
            //        console.log((c & 0x3F) | 0x80);
            //        bytesArray.writeByte(((c >> 6) & 0x1F) | 0xC0);
            //        bytesArray.writeByte((c & 0x3F) | 0x80);
            //    } else {
            //        console.log(c, c & 0xFF);
            //        bytesArray.writeByte(c & 0xFF);
            //    }
            //
            //}
            //socket.writeBytes(bytesArray);
            //socket.flush();
            //protobuf 数据结构
            var modelProtobufText = RES.getRes("simple_proto");
            console.log(modelProtobufText);
            var modelProtobuf = dcodeIO.ProtoBuf.loadProto(modelProtobufText);
            /**
             *测试基础结构通信  成功
             */
            //let modelstruct = modelProtobuf.build("test");
            //let struct = new modelstruct({
            //    "a": 123,
            //    "b": 123,
            //    "sim": 1,
            //    "list": [{bs: 2, se: 3}, {ke: 2, bs: 3, se: 2}]
            //});
            /**
             *   测试oneof 结构
             */
            var modulstruct = modelProtobuf.build("header");
            var struct = new modulstruct({
                messageid: 3,
                body1: {
                    bodyid: 5,
                    bodymessage: "body1 message"
                },
                body2: {
                    bodyid: 2,
                    bodymessage: "body2 message"
                },
                body3: {
                    bodyid: 4,
                    testid: "test"
                }
            });
            var bytes = struct.toArrayBuffer();
            var pushMessage = new egret.ByteArray();
            //pushMessage.writeFloat(1000);
            pushMessage.writeBytes(new egret.ByteArray(bytes));
            socket.writeBytes(pushMessage);
            socket.flush();
        }
        else if (this.socket.type == egret.WebSocket.TYPE_STRING) {
            var socket = this.socket;
            socket.writeUTF(testString);
            socket.flush();
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
