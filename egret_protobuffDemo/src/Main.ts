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
class Main extends egret.DisplayObjectContainer {


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })


    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        let icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        let textfield = new egret.TextField();
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

    }

    private isConneted = false;
    private socket:egret.WebSocket;

    private cTouchClick() {

        //let testString = "!@#$%^&*())&&T^&*__U(*A&*&^*^Y*!#*(C壹test imgs";
        let testString = JSON.stringify({a: 123, b: 123, list: [{ke: 1, bs: 2}, {ke: 2, bs: 3, se: 2}]});
        if (!this.socket) {
            this.socket = new egret.WebSocket();
            let socket = this.socket;
            let that = this;
            socket.type = egret.WebSocket.TYPE_BINARY;
            socket.addEventListener(egret.Event.CONNECT, function (response) {
                that.isConneted = true;
            }, this);
            socket.addEventListener(egret.Event.CLOSE, function (response) {
                console.log("CLOSE", response);
            }, this);
            socket.addEventListener(egret.IOErrorEvent.IO_ERROR, function (response) {
                console.log("IO_ERROR", response);
            }, this);
            socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, function (response) {
                console.log("onMessage", response, egret.WebSocket.TYPE_BINARY);
                if (socket.type == egret.WebSocket.TYPE_BINARY) {
                    let bytes = new egret.ByteArray();
                    socket.readBytes(bytes);
                    //let string = bytes.readUTFBytes(bytes.length);
                    console.log("onMessage Bytes", bytes);

                    let modelProtobufText = RES.getRes("simple_proto");
                    console.log(modelProtobufText);
                    let modelProtobuf = dcodeIO.ProtoBuf.loadProto(modelProtobufText);
                    let modelstruct = modelProtobuf.build("RequestUser");
                    let arrayBuffer = bytes.rawBuffer;

                    response = modelstruct.decode(arrayBuffer);
                    console.log(response);
                }

                if (socket.type == egret.WebSocket.TYPE_STRING) {
                    let stringGet = socket.readUTF();
                    console.log("onMessage UTF8", stringGet);
                }


            }, this);
            socket.connectByUrl("ws://127.0.0.1:9090/ws");
        } else if (this.socket.type == egret.WebSocket.TYPE_BINARY) {//二进制
            /**
             * 推送正常结构的Json
             * @type {egret.WebSocket}
             */
            let socket = this.socket;
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
            let modelProtobufText = RES.getRes("simple_proto");
            console.log(modelProtobufText);
            let modelProtobuf = dcodeIO.ProtoBuf.loadProto(modelProtobufText);

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
            let modulstruct = modelProtobuf.build("header");
            let struct = new modulstruct({
                messageid: 3,

                body1: {
                    bodyid: 5,
                    bodymessage: "body1 message"
                },
                body2:{
                    bodyid:2,
                    bodymessage:"body2 message"

                },
                body3:{
                    bodyid:4,
                    testid:"test"
                }

            });


            let bytes = struct.toArrayBuffer();
            let pushMessage = new egret.ByteArray();
            //pushMessage.writeFloat(1000);
            pushMessage.writeBytes(new egret.ByteArray(bytes));
            socket.writeBytes(pushMessage);
            socket.flush();

        } else if (this.socket.type == egret.WebSocket.TYPE_STRING) {
            let socket = this.socket;
            socket.writeUTF(testString);
            socket.flush();
        }

    }


    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string) {
        let result = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, this);
        };

        change();
    }
}