/**
 * Created by Roy on 16-3-19.
 */
/*:
 * @plugindesc V.1.0.2 Base Support For LYZ's plugins
 *
 * @author BigZhao
 */
var LYZ=LYZ||{};

(function() {
    LYZ.$=LYZ.$||{};
    LYZ.Core=LYZ.Core||{};
    LYZ.Command=LYZ.Command||{};
    LYZ.__=LYZ.__||{};

    var windowWidth=-1;
    LYZ.Core.windowWidth=function(){
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



    LYZ.$.extend=function(dest, src){
        if (src == null) return dest;
        for (var i in src) {
            if (src[i]!=null) dest[i] = src[i];
        }
        return dest;
    };

    LYZ.$.loadFileSync=function(src) {
        if (src==null||src=='') return null;
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

    LYZ.$.override=function(whose,func,callback){
        var origin=whose[func];
        whose[func]=function(){
            return callback.call(this,arguments,origin);
        }
    };

    LYZ.$.delegate=function(whose,func,callback){
        var origin=whose[func];
        whose[func]=function(){
            this._originReturnValue=origin!=null?origin.apply(this,arguments):undefined;
            return callback.apply(this,arguments);
        }
    };

    LYZ.$.defineCommand=function(callback){
        LYZ.$.delegate(Game_Interpreter.prototype,"pluginCommand",callback);
    };

    LYZ.$.defineCommandWithName=function(pluginName,cmd,callback){
        if (typeof cmd=='string') cmd=cmd.toLowerCase();
        LYZ.Command[pluginName]=cmd;
        LYZ.$.delegate(Game_Interpreter.prototype,"pluginCommand",function(command,args){
            var ccmd=LYZ.Command[pluginName];
            if (typeof ccmd=='string') {
                command = command.toLowerCase();
                if (command != ccmd) {
                    if (!(command.startsWith("lyz.") || command.startsWith("lyz_"))) return;
                    command = command.substring(4);
                    if (command != ccmd) return;
                }
                callback.call(this,args,ccmd);
            }else if (ccmd instanceof RegExp){
                var m=command.match(ccmd);
                if (m!=null){
                    callback.call(this,args,command,m);
                }
            }
        });
    };

    LYZ.$.exec=function(code){
        eval("(function(){"+code+"})()");
    };

    LYZ.$.execLine=function(code){
        return "(function(){"+code+"})()";
    };

    LYZ.$.indexOf=function(arr,func){
        var len=arr.length;
        for (var i=0;i<len;++i) if (func(arr[i],i)) return i;
        return -1;
    };

    LYZ.$.find=function(arr,func){
        var i=LYZ.$.indexOf(arr,func);
        if (i==-1) return null;
        return arr[i];
    };

    var nameCounter=0;
    LYZ.$.genName=function(prefix){
        if (prefix==null) prefix="@@anonymous@@";
        return prefix+(nameCounter++);
    };

    LYZ.$.alias=function (_this,old){
        for(var i=2;i<arguments.length;++i){
            var alias=arguments[i];
            Object.defineProperty(_this,alias,{
                get:function(){ return this[old];},
                set:function(val){ this[old]=val;}
            });
        }
        return this;
    };

    LYZ.$.readArgsFromString=function(note,key){
        if (key==null||key=="") throw "Invalid Key";
        if (note==null) return null;
        var pattern=/\$?\[(\w+)((?:\\\]|[^\]])*)\]/gi;
        for(var m=pattern.exec(note);m!=null;m=pattern.exec(note)){
            if (key!=m[1]) continue;
            return [m[1]].concat(m[2].trim().split(/\s+/g));
        }
    };
    String.prototype.startsWith = function (str) {
        if (str.length>this.length) return false;
        for (var i = 0; i < str.length; ++i) {
            if (this.charAt(i) != str.charAt(i)) return false;
        }
        return true;
    };

    String.prototype.endsWith=function(str){
        if (str.length>this.length) return false;
        return this.substring(this.length-str.length,this.length)==str;
    };

    String.prototype.formatEx=function(){
        return this.replace(/\\(.)||\{(\d+)(:\w+)?\}/g,function(s,e,i,f){
            if (i==null||i=="") return e;
            else return arguments[i-1].toString(f);
        });
    };

    LYZ.$.override(Game_Interpreter.prototype,"command356",function(args,origin){
        this.commandResult=true;
        origin.call(this);
        return this.commandResult;
    });

    LYZ.$.delegate(Game_Interpreter.prototype,"updateWaitMode",function(){
        if (this._waitMode=='force') return true;
        return this._originReturnValue;
    });


    console.log("LYZ_Utils loaded");
})();