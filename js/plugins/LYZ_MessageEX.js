var LYZ=LYZ||{};
LYZ.MessageSripts=LYZ.MessageSripts||{};
(function(){
    var PLUGIN_NAME="LYZ_MSG";
    var $=LYZ.$;
    var Scripts=LYZ.MessageSripts;

    function load(file){
        var msg= $.loadFileSync(PLUGIN_NAME+"/"+file).split(/[\r\n]+/);
        //var msg=Scripts[file];
        var ret=[];
        var cfg=null;
        msg.forEach(function(e){
            if (e==null||e=="") return;
            else if (e=="#CONFIG") cfg=[];
            else if (e.startsWith("#load")){
                ret=ret.concat(load(e.substring(5).trim()));
            } else if (e=="##CONFIG"&&cfg) {
                ret.push({type:'cfg',val:cfg.join('')});
                cfg=null;
            } else if (e.startsWith("-")){
                ret.push({type:"yield",val: e.substring(1).trim()});
            } else if (!e.startsWith("#")){
                if (cfg == null) ret.push({type: 'msg', val: e});
                else cfg.push(e);
            }
        });
        Scripts[file]=ret;
        return ret;
    }

    function setBox(file,index,bg,pos){
        $gameMessage.setFaceImage(file,index);
        $gameMessage.setBackground(bg);
        $gameMessage.setPositionType(pos);
    }

    function Msg(file) {
        $.extend(this, {
            config:{roles:{}},
            file:file,
            msg: load(file),
            index: -1,
            lastName: null,
            inc: function () {
                ++this.index;
                if (this.index >= this.msg.length) {
                    this.msg = null;
                    this.s = null;
                    this.index = -1;
                    Scripts.$runtime[file]=null;
                    return false;
                }
                this.s = this.msg[this.index];
                return true;
            },
            show: function (gi) {
                if ($gameMessage.isBusy()) return false;
                var _this=this;
                if (!this.inc()) return true;
                var s = this.s.val;
                switch (this.s.type) {
                    case 'msg':
                    {
                        s= s.replace(/\\(\w)\[([^\\]+)\]/,function(c0,c1,c2){
                            switch(c1){
                                case 'i':return "\\C["+(_this.config.importantColor||0)+"]"+c2+"\\C";
                                default: return c0;
                            }
                        });
                        var i = s.indexOf(':');
                        var j = s.indexOf('：');
                        if (i == -1) i = Number.MAX_VALUE;
                        if (j == -1) j = Number.MAX_VALUE;
                        i = Math.min(i, j);
                        if (i == Number.MAX_VALUE){
                            $gameMessage.add(s);
                        }else {
                            var nameId = s.substring(0, i);
                            var body = s.substring(i + 1);
                            var role = this.config.roles[nameId];
                            var name = nameId;
                            if (role) {
                                name = role.name || nameId;
                                if (role.box) setBox.apply(window, role.box);
                            }
                            $gameMessage.add("【" + name + "】");
                            $gameMessage.add(body);
                        }
                        gi.setWaitMode('message');
                        break;
                    }
                    case 'cfg':
                    {
                        var o = JSON.parse(s);
                        $.extend(this.config.roles, o.roles);
                        this.config.importantColor= o.importantColor;
                        break;
                    }
                    case 'yield':return true;
                }
                return false;
            }
        });
    }

    var cmds={
        msg:function(args){
            Scripts.$runtime=Scripts.$runtime||{};
            var file=args[1];
            var msg=Scripts.$runtime[file];
            if (msg&&msg.msg) return msg.show(this);
            else Scripts.$runtime[file]=new Msg(file);
            return false;
        }
    };

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (PLUGIN_NAME!=command) return;
        var f=cmds[args[0]];
        if (f) return f.call(this, args);
        return true;
    };

    console.log("LYZ_MessageEx loaded");
})();