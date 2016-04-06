/**
 * Created by Roy on 16-3-25.
 */
/*:
 * @plugindesc V.1.0.0
 *
 * @author BigZhao
 * /
 * @param Flow Tree Definition
 * @desc the file defines the flow.
 * @default
 *
 * @param Tab Indent
 * @desc how many Tab(s) regard as a indent.
 * @default 1
 *
 * @param Space Indent
 * @desc how many Space(s) regard as a indent.
 * @default 4
 *
 * @param Max Depth
 * @desc how many Space(s) regard as a indent.
 * @default 8
 */
(function() {
    "use strict";
    var $ = LYZ.$;

    var params=PluginManager.parameters("LYZ_FlowManager");
    var def=params["Flow Tree Definition"];

    var tabIndent=parseInt(params["Tab Indent"]);
    var spaceIndent=parseInt(params["Space Indent"]);
    var maxDepth=parseInt(params["Max Depth"]);

    // Chapter
    class Chapter{
        constructor(parent,name,level,index){
            this.$_init(parent,name,level,index);
        }

        $_init(parent,name,level,index){
            var _this=this;
            this["$valueCounter"]=0;
            this["$parent"]=parent;
            this["$name"]=name;
            this["$value"]=index==0&&parent!=null?parent.$value:this.$root.$valueCounter++;
            this["$index"]=index;
            this["$level"]=level;
            this["$desc"]="Chapter %1: %2  (%3)".format(this.$value,this.$fullName, this.$root.$key);
            if (this.$level<maxDepth) this.$add("$");
        }

        $_adaptArg(o){
            if (o==null) o=this.$root.$Current;
            if (o instanceof Chapter) o= o.$v;
            var n=Number(o);
            if (n==null||Number.isNaN(n)) throw "invalid arg: '"+o+"'";
            return n;
        }

        $add(name){
            if (this["$children"]==null) this["$children"]=[];
            var chapter=new Chapter(this,name,this.$level+1,this.$children.length);
            this.$children.push(chapter);
            this[name]=chapter;
            if (this.$firstChild==null){
                this.$firstChild=this.$lastChild=chapter;
            }else{
                this.$lastChild.$next=chapter;
                chapter.$prev=this.$lastChild;
                this.$lastChild=chapter;
            }
            return chapter;
        }

        $eq(o){ return this.$value==this.$_adaptArg(o); }
        $gt(o){ return this.$value>this.$_adaptArg(o); }
        $ne(o){ return !this.$eq(o); };
        $lt(o){ return this.$value<this.$_adaptArg(o); };
        $ge(o){ return this.$gt(o)||this.$eq(o); };
        $le(o){ return this.$lt(o)||this.$eq(o); };
        $contains(o){var nv=this.$nextValid;return this.$le(o)&&(nv==null||nv.$gt(o));};
        $in(o){var nv=this.$root.$byValue[this.$_adaptArg(o)].$nextValid;return c.$le(this)&&(nv==null||nv.$gt(this));};

        get $fullName(){return this.$parent?this.$parent.$fullName+"."+this.$name:""}
        get $root(){return this.$parent?this.$parent.$root:this;};
        get $nextValid(){return this.$next||(this.$parent?this.$parent.$nextValid:null);}
        get $ceil(){var nv=this.$nextValid;return nv?nv.$value:this.$root.$byValue.length;};
        get $deepest(){ return this.$firstChild==null?this:this.$firstChild.$deepest;};
        get $mostShallow(){return (this.$parent&&this.$parent.$value==this.$value)?this.$parent.$mostShallow:this;};
    }
    $.alias(Chapter.prototype,"$eq","$is");
    $.alias(Chapter.prototype,"$gt","$after");
    $.alias(Chapter.prototype,"$ne","$neq","$not");
    $.alias(Chapter.prototype,"$lt","$before");
    $.alias(Chapter.prototype,"$ge","$nlt");
    $.alias(Chapter.prototype,"$le","$ngt");
    $.alias(Chapter.prototype,"$value","$v","$val");
    $.alias(Chapter.prototype,"$index","$i");

    function countIndent(s){
        var cs=0;
        var ct=0;
        for (var i=0;i< s.length;++i){
            var c= s.charAt(i);
            if (c==' ') ++cs;
            if (c=='\t') ++ct;
        }
        return parseInt(ct/tabIndent+cs/spaceIndent);
    }

    function MakeFlow(def,key) {
        var Flow = function (val) {
            if (val != null) {
                if (typeof val == 'number' || typeof val == 'string') {
                    val = Flow.$byValue[val];
                }
                if (val instanceof Chapter) {
                    Flow.$Current = val.$deepest;
                    console.log(Flow.$Current.$desc);
                }
            }
            return Flow.$Current.$deepest;
        };
        Flow.constructor = Chapter;
        Flow.__proto__ = Chapter.prototype;
        Flow.$byValue = [];
        Flow.$key=key;
        Flow.$file=def;
        Chapter.prototype.$_init.call(Flow, null, "$", 0, 0);
        LYZ.FlowManager.Flows[key]=Flow;
        var currentChapter = Flow;
        Flow.$byValue[currentChapter.$value] = currentChapter.$deepest;
        var lines = LYZ.$.loadFileSync("FLOW/" + def);
        if (lines != null) {
            lines.split(/[\r\n]+/g).forEach(function (s) {
                if (s==null) return;
                var idt = countIndent(s);
                s = s.trim();
                if (s=="") return;
                while (idt < currentChapter.$level) currentChapter = currentChapter.$parent;
                if (idt == currentChapter.$level) {
                    currentChapter = currentChapter.$add(s);
                    Flow.$byValue[currentChapter.$value] = currentChapter.$deepest;
                }
            });
        }

        Flow.$Current = Flow.$deepest;
        console.log(Flow.$Current.$desc);

        for (var i = 0; i < maxDepth; ++i) {
            (function () {
                var p = i;
                Object.defineProperty(Flow, p.toString(), {
                    get: function () {
                        var c;
                        for (c = this.$Current; c != null && c.$level > p; c = c.$parent);
                        if (c == null) throw "invalid index";
                        return c;
                    },
                    set: function (val) {
                        var c;
                        for (c = this.$Current; c != null && c.$level >= p; c = c.$parent);
                        if (c == null) throw "invalid index";
                        if (c[val] == null) throw "invalid flow, must be one of '" + c.$children.map(function (e) {
                            return e.$name
                        }).join(", ") + "'";
                        this.$Current = c[val].$deepest;
                        console.log(this.$Current.$desc);
                    }
                });
            })();
        }
        return Flow;
    }

    //LYZ.Flows={};
    LYZ.FlowManager={Flows:{},MakeFlow,Chapter};
    LYZ.Flow=MakeFlow(def,"Main");
    if (window.Flow==null) Object.defineProperty(window,"Flow",{
        get:function(){ return LYZ.Flow;},
        set:function(val){ LYZ.Flow=val;}
    });

    $.delegate(DataManager,"makeSaveContents",function(args){
        var contents=this._originReturnValue;
        contents.LYZ_FLOW={};
        for(var i in LYZ.FlowManager.Flows) {
            var flow=LYZ.FlowManager.Flows[i];
            contents.LYZ_FLOW[i]={
                key:flow.$key,
                file:flow.$file,
                val:flow().$fullName
            }
        }
        return contents;
    });

    $.delegate(DataManager,"extractSaveContents",function(contents){
        var f=contents.LYZ_FLOW;
        for(var i in f){
            var flow=MakeFlow(f[i].file,f[i].key);
            eval("flow(flow"+f[i].val+")");
        }
        LYZ.Flow=LYZ.FlowManager.Flows["Main"];
    });

    $.defineCommandWithName("FlowManager",/flow\b.*/i,function(args,cmd,match){
        var flow=LYZ.Flow;
        var cmdline=cmd+" "+args.join(" ");
        var c= $.execLine(cmdline);
        eval(c);
    });

    console.log("LYZ_FlowManager loaded");
})();