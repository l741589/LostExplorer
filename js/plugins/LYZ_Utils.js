/**
 * Created by Roy on 16-3-19.
 */

var LYZ=LYZ||{};
LYZ.$=LYZ.$||{};
LYZ.global=LYZ.global||{};
LYZ.stubs=LYZ.stubs||{};
(function() {
    var windowWidth=-1;
    LYZ.global.windowWidth=function(){
        if (windowWidth==-1){
            var d=document.getElementById("UpperCanvas");
            windowWidth= d.width;
        }
        return windowWidth;
    };

    Window_Base.prototype.textColor = function(n) {
        if (n==null||n=='') n=0;
        var px = 96 + (n % 8) * 12 + 6;
        var py = 144 + Math.floor(n / 8) * 12 + 6;
        return this.windowskin.getPixel(px, py);
    };

    Window_Base.prototype.processNormalCharacter = function(textState) {
        var c = textState.text[textState.index++];
        var w = this.textWidth(c);
        this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
        textState.x += w;
        if (textState.x>LYZ.global.windowWidth()-64) {
            --textState.index;
            this.processNewLine(textState);
        }
    };

    LYZ.$.extend=function(dest, src){
        if (src == null) return;
        for (var i in src) {
            dest[i] = src[i];
        }
    };

    LYZ.$.loadFileSync=function(src) {
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src;
        xhr.open('GET', url, false);
        xhr.overrideMimeType('text/plain');
        xhr.send();
        if (xhr.status < 400) {
            return xhr.responseText;
        } else {
            return 'error:load from "' + src + '" failed';
        }
    };


    LYZ.$.loadFile=function(gameInterpreter,src,callback){
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src;
        xhr.open('GET', url);
        xhr.overrideMimeType('text/plain');
        xhr.onload = function() {
            gameInterpreter.setWaitMode('');
            if (xhr.status < 400) {
                callback(xhr.responseText);
            }else{
                callback('error:load from "'+src+'" failed');
            }
        };
        xhr.onerror = function() {
            gameInterpreter.setWaitMode('');
            callback('error:load from "'+src+'" failed');
        };
        gameInterpreter.setWaitMode('force');
        xhr.send();
    };

    LYZ.$.GetCommonEvent=function(name){
        var ret=null;
        $dataCommonEvents.forEach(function(e){
            if (e==null) return;
            if (e.name==name) {
                ret=e;
                return false;
            }
        });
        return ret;
    };

    String.prototype.startsWith = function (str) {
        for (var i = 0; i < str.length; ++i) {
            if (this.charAt(i) != str.charAt(i)) return false;
        }
        return true;
    };

    //var _Game_Interpreter_prototype_command356=Game_Interpreter.prototype.command356;
    Game_Interpreter.prototype.command356=function(){
        var args = this._params[0].split(" ");
        var command = args.shift();
        var ret=this.pluginCommand(command, args);
        return ret !== false;
    };

    var _Game_Interpreter_prototype_updateWaitMode=Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode=function(){
        var ret=_Game_Interpreter_prototype_updateWaitMode.call(this);
        if (this._waitMode=='force') ret=true;
        return ret;
    };

    _Game_Party_prototype_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        _Game_Party_prototype_gainItem.call(this, item, amount, includeEquip); //Call Original Method
        var container = this.itemContainer(item);
        if (container) {

        }
    }
    console.log("LYZ_Utils loaded");
})();