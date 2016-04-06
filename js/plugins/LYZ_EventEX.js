/**
 * Created by Roy on 16-3-26.
 */

(function(){
    "use strict";
    LYZ.Event=LYZ.Event||{
            start,
            remove,
            findByName,
            link,
            breakLink,
            breakLinkByEvent,
            getLinkedIdsOfEvent,
            startParallel,
            newParallel,
            stop,
            Links:{}
        };
    function escapeArg(_this,arg){
        return arg=="this"?$dataMap.events[_this._eventId].name:arg;
    }
    LYZ.$.defineCommandWithName("event","event",function(args){
        switch(args[0]){
            case 'start':start(escapeArg(this,args[1]),args[2]);break;
            case 'startParallel':startParallel(escapeArg(this,args[1]),args[2]);break;
            case 'newParallel':newParallel(escapeArg(this,args[1]),args[2],args[3]);break;
            case 'remove':remove(args[1]);break;
            case 'stop':stop(this,args[1]);break;
            case 'erase':remove(args[1]);break;
            case 'waitAll':this.commandResult=waitAll(args[1]);break;
            case 'waitAny':this.commandResult=waitAny(args[1]);break;

            case 'link':link(args[1],args[2]);break;
            case 'breakLinkByEvent':breakLinkByEvent(args[1]);break;
            case 'breakLink':breakLink(args[1]);break;
        }
    });

    function findById(id){
        return $gameMap.event(id);
    }

    function findByName(eventName){
        var de=LYZ.$.find($dataMap.events,function(e){ return e!=null&&e.name==eventName; });
        if (de==null) return;
        return $gameMap.event(de.id);
    }

    function remove(eventName){
        var e=findByName(eventName);
        if (e==null) return e;
        e.erase();
    }

    function start(eventName,page){
        var e=findByName(eventName);
        if (e==null) return;
        if (page==null) e.refresh();
        else{
            page=parseInt(page)-1;
            var p=e.event().pages[page];
            if (!e._erased&&p&&e.meetsConditions(p)){
                if (e._pageIndex!=page){
                    e._pageIndex=page;
                    e.setupPage();
                }
            }
        }
        if (e._pageIndex>=0) e.start();
    }

    function stop(gi,eventName){
        if (eventName=="this") gi.terminate();
        else if (eventName=="main") $gameMap._interpreter.terminate();
        var e=findByName(eventName);
        if (e._interpreter) e._interpreter.terminate();
    }

    function startParallel(eventName,page){
        var e=findByName(eventName);
        if (e==null||e._interpreter&&e._interpreter.isRunning()) return;
        if (page==null) e.refresh();
        else{
            var de=e.event();
            page=parseInt(page)-1;
            var p=de.pages[page];
            if (!e._erased&&p&&e.meetsConditions(p)){
                if (e._pageIndex!=page){
                    e._pageIndex=page;
                    e.setupPage();
                }
            }
        }
        e._interpreter=new Game_Interpreter();
    }

    function newParallel(eventName,page,tag){
        var event=findByName(eventName);
        if (event==null) return;
        if (page==null) page=event.findProperPageIndex();
        var de=event.event();
        page=parseInt(page)-1;
        var p=de.pages[page];
        if (event._erased||p==null||!event.meetsConditions(p)) return;
        if ($gameMap._interpreters==null) $gameMap._interpreters={};
        var gi=new Game_Interpreter();
        gi.setup(p.list,event._eventId);
        if (tag==null) tag=LYZ.$.genName();
        if ($gameMap._interpreters[tag]) throw "Tag Conflict";
        $gameMap._interpreters[tag]=gi;
        console.log("event "+tag+" start");
        return tag;
    }

    function waitOne(name){
        var e;
        if (name.startsWith("E:")){
            e=findByName(name.substring(2));
            if (e) e=e._interpreter;
        }else if (name.startsWith("P:")){
            e=$gameMap._interpreters[name.substring(2)];
        }else if (name.startsWith("ID:")){
            e=findById(name.substring(3));
            if (e) e=e._interpreter;
        }else{
            e = findByName(name);
            if (e == null) e = $gameMap._interpreters[name];
            else e=e._interpreter;
        }
        return e==null||!e.isRunning();
    }

    function waitAll(names){
        var ns=names.split(",");
        for (var i=0;i<ns.length;++i){
            if (!waitOne(ns[i])) return false;
        }
        return true;
    }

    function waitAny(names){
        var ns=names.split(",");
        for (var i=0;i<ns.length;++i){
            if (waitOne(ns[i])) return true;
        }
        return false;
    }

    //////////////////////////////////////////////////////////////////////


    function link(regionId,eventName){
        var id=parseInt(regionId);
        if (id==0||Number.isNaN(id)) throw "Invalid Region Id";
        LYZ.Event.Links[id]=eventName;
    }

    function breakLink(regionId){
        var id=parseInt(regionId);
        if (id==0||Number.isNaN(id)) throw "Invalid Region Id";
        delete LYZ.Event.Links[id];
    }

    function breakLinkByEvent(eventName){
        for (var k in LYZ.Event.Links){
            var v=LYZ.Event.Links[k];
            if (v==eventName) breakLink(k);
        }
    }

    function getLinkedIdsOfEvent(eventName){
        var out=[];
        for (var k in LYZ.Event.Links){
            var v=LYZ.Event.Links[k];
            if (v==eventName) out.push(k);
        }
        return k;
    }

    LYZ.$.delegate(Game_Map.prototype,"updateInterpreter",function(active){
        if (this._interpreters==null) return;
        for (var i in this._interpreters){
            var e=this._interpreters[i];
            if (e==null) continue;
            e.update();
            if (e.isRunning()) continue;
            if (e.eventId() > 0) {
                this.unlockEvent(e.eventId());
                e.clear();
            }
            delete this._interpreters[i];
            console.log("event "+i+" finished");
        }
    });


    LYZ.$.delegate(Game_Map.prototype,"setup",function(){
        LYZ.Event.Links={};
        for (var e of $dataMap.events){
            if (e==null) continue;
            var m=LYZ.$.readArgsFromString(e.note,"link");
            if (m==null) continue;
            var id=parseInt(m[1]);
            if (id==null||Number.isNaN(id)) throw "Invalid Event Link: "+e.name;
            LYZ.Event.Links[id]=e.name;
        }
    });

    Game_Map.prototype.eventLinkXy=function(x,y){
        var rid=this.regionId(x,y);
        if (rid==null||rid==0) return null;
        var name=LYZ.Event.Links[rid];
        if (name==null||name=="") return null;
        return findByName(name);
    };

    Game_Map.prototype.eventLinkXyNt=function(x,y){
        var e=this.eventLinkXy(x,y);
        return e&&e.isThrough()?e:null;
    };

    LYZ.$.delegate(Game_Map.prototype,"eventsXy",function(x,y){
        var ret=this._originReturnValue;
        if (ret==null) return ret;
        var e=this.eventLinkXy(x,y);
        if (e) ret.push(e);
        return ret;
    });

    LYZ.$.delegate(Game_Map.prototype,"eventsXyNt",function(x,y){
        var ret=this._originReturnValue;
        if (ret==null) return ret;
        var e=this.eventLinkXyNt(x,y);
        if (e) ret.push(e);
        return ret;
    });

    LYZ.$.delegate(Game_Map.prototype,"tileEventsXy",function(x,y){
        var ret=this._originReturnValue;
        if (ret==null) return ret;
        var e=this.eventLinkXyNt(x,y);
        if (e) ret.push(e);
        return ret;
    });



    console.log("LYZ_EventEx loaded");
})();
