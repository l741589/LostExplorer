/*:
 * @plugindesc V.1.1.0 to edit plenty of message
 *
 * @update support fuki message
 *
 * @author BigZhao
 * /
 * @param Config File
 * @desc Config file of the plugin
 * @default
 *
 */
var LYZ=LYZ||{};

(function(){
    var PLUGIN_NAME="MSG";
    var $=LYZ.$;
    LYZ.Message=LYZ.Message||{};
    var M=LYZ.Message;
    M.workingDir="MSG";
    M.Config=M.Config||{};
    M.Scripts=M.Scripts||{};
    M.Runtime= M.Runtime||{};
    var cmdPattern=/^\#(\w+)\s+(.*)$/;
    var msgPattern=/^(?:([^:\uff1a]*)[:\uff1a])?(.+)$/;
    var params=PluginManager.parameters("LYZ_MessageEx");

    function readFile(filename){
        if (filename==null||filename=="") return null;
        return $.loadFileSync(M.workingDir+"/"+filename);
    }

    function Section(id){
        this.data=[];
        this.id=id;

        this.push=function(type,val,who){
            this.data.push({type:type,val:val,who:who});
        }
    }

    function loadMessageFile(filename){

        function _T(i){
            throw "Invalid Message FIle: '"+filename+"' at line "+i+" (after processing #include)";
        }

        if (M.Scripts[filename]) return M.Scripts[filename];
        var ss=readFile(filename).split(/[\r\n]+/g);
        var script={};
        var currentSec=null;

        for (var i=0;i<ss.length;++i){
            var s=ss[i].trim();
            if (s==null||s=="") continue;
            var m= s.match(cmdPattern);
            if (m) {
                switch (m[1].toLowerCase()) {
                    case 'sec':
                    case 'msg':
                        currentSec=new Section(m[2]);
                        script[currentSec.id]=currentSec;
                        break;
                    case 'include':
                        var _ss = readFile(m[2]);
                        ss.splice.apply(ss, [i, 1].concat(_ss));
                        break;
                    case 'code':
                        if (currentSec==null) _T(i);
                        currentSec.push("code",m[2]);
                        break;
                    case 'log':
                        currentSec.push("log",m[2]);
                }
            }else if (s.startsWith("##")) {
            }else{
                if (currentSec==null) _T(i);
                if (s=='-'||s=='\uff0d') currentSec.push('yield');
                else {
                    var m_ = s.match(msgPattern);
                    currentSec.push('msg', m_[2], m_[1]);
                }
            }
        }
        M.Scripts[filename]=script;
        return script;
    }

    function setBox(file,index,bg,pos){
        $gameMessage.setFaceImage(file,index||0);
        $gameMessage.setBackground(bg||0);
        $gameMessage.setPositionType(pos||2);
    }


    $.override(Game_Message.prototype,"add",function(args,origin){
        var fmt="\\C[%1]$1\\C[%2]".format(args[1]||M.Config.importantColor, args[2]||M.Config.defaultColor);
        var s=args[0].replace(/\\i\[([^\]]*)\]/g, fmt);
        origin.call(this,s);
    });

    function msgLine(gi,who,msg){
        if (who==null) $gameMessage.add(msg);
        else{
            var role = M.Config.roles[who];
            var name = who;
            if (role) {
                name = role.name==null?who:role.name;
                if (role.box&&role.box.length) setBox.apply(window, role.box);
            }
            if (msg) {
                if (name!=null&&name.trim()!="") {
                    var nameTag=(M.Config.nameTag||"\\>\\C[%3]【%1】\\C[%2]").format(name, M.Config.defaultColor, M.Config.nameColor)
                    if (nameTag!=null&&nameTag!="") $gameMessage.add(nameTag);
                }
                if (role&&role.fuki) msg=role.fuki+msg;
                $gameMessage.add(msg);
            }
        }
        gi.setWaitMode('message');
    }

    function Runtime(filename,section,cmdIndex) {
        this.id=filename;
        this.section=section;
        this.script = loadMessageFile(filename)[section];
        this.index = -1;
        this.cmdIndex=cmdIndex;
        this.next = function (gi) {
            var line = this.script.data[++this.index];
            if (line == null) {
                this.remove();
                return true;
            }
            switch (line.type) {
                case 'msg':msgLine(gi,line.who, line.val);break;
                case 'code':eval($.execLine(line.val));break;
                case 'log':console.log(line.val);break;
                case 'yield':return true;
            }
            return false;
        };

        this.remove = function () {
            this.cmdIndex=-1;
            delete M.Runtime[this.script.id];
        };

        this.reset = function () {
            this.cmdIndex=-1;
            this.index = -1;
        }
    }

    function msg(filename,section){
        if (M.CurrentRuntime==null|| M.CurrentRuntime!=M.Runtime[filename]|| M.CurrentRuntime.cmdIndex!=this._index){
            M.CurrentRuntime=new Runtime(filename,section,this._index);
            M.Runtime[M.CurrentRuntime.id]= M.CurrentRuntime;
        }
        return M.CurrentRuntime.next(this);
    }

    LYZ.$.delegate(Window_Base.prototype,"processNormalCharacter",function(textState){
        if (textState.x>LYZ.Core.windowWidth()-64) {
            --textState.index;
            this.processNewLine(textState);
        }
    });

    $.defineCommandWithName(PLUGIN_NAME,PLUGIN_NAME,function(args){
        if ($gameMessage.isBusy()) {
            this.commandResult=false;
            return;
        }
        if (args.length==0){
            args=["continue"];
        }
        var r;
        switch(args[0]){
            case "msg":{
                this.commandResult=msg.call(this,args[1],args[2]);
                break;
            }
            case "continue":{
                r = M.CurrentRuntime;
                if (args[1] != null) r = M.Runtime[args[1]];
                if (r) this.commandResult = r.next(this);
                break;
            }
            case "line":{
                var m=args.slice(1).join(' ').match(msgPattern);
                msgLine(this,m[1],m[2]);
                break;
            }
            case "break":{
                r= M.CurrentRuntime;
                if (args[1]!=null) r= M.Runtime[args[1]];
                if (r!=null){
                    r.remove();
                    M.CurrentRuntime=null;
                }
                break;
            }
            case "reset":{
                r= M.CurrentRuntime;
                if (args[1]!=null) r= M.Runtime[args[1]];
                if (r) r.reset();
                break;
            }
            default:{
                this.commandResult=msg.call(this,args[0],args[1]);
                break;
            }
        }
    });

    var cfg=readFile(params["Config File"]);
    if (cfg){
        M.Config = $.extend({
            "roles":{},
            "importantColor":17,
            "defaultColor":0,
            "nameColor":1
        },JSON.parse(cfg));
    }
    console.log("LYZ_MessageEx loaded");

})();