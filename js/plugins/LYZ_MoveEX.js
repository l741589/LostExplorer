/**
 * Created by Roy on 16-3-26.
 */

(function(){
    var $=LYZ.$;
    var runningCommand={

    };

    function exec(a){
        if (a.who == null || a.x == null || a.y == null) return;
        switch(a.speed){
            case 'immediately':
                a.who.locate(a.x, a.y);
                return;
            case 'slow':
                a.who.setMoveSpeed(3);
                break;
            case 'normal':
                a.who.setMoveSpeed(4);
                break;
            case 'fast':
                a.who.setMoveSpeed(5);
                break;
        }
        this.commandResult=moveTo(a.who, a.x, a.y);
        if (this.commandResult==true) {
            a.who._originalPattern=1;
            a.who.setMoveSpeed(4);
            switch(a.face){
                case 'front':case 'forward':break;
                case 'left':a.who.setDirection(4);break;
                case 'right':a.who.setDirection(6);break;
                case 'up':a.who.setDirection(8);break;
                case 'down':a.who.setDirection(2);break;
                case 'lefthand':a.who.turnLeft90();break;
                case 'righthand':a.who.turnRight90();break;
                case 'back':case 'behind':a.who.turn180();break;
            }

            //a.who.resetPattern();
        }
    }

    $.defineCommandWithName("move","move",function(args){
        if (runningCommand._list==this._list&&runningCommand._index==this._index){
            exec.call(this,runningCommand);
            return;
        }
        var a= {
            who: getUnit(this, args[0]),
            face: 'front',
            speed: 'normal'
        };
        var index=-1;
        switch (args[1]) {
            case 'to':
            {
                a.x = parseInt(args[2]);
                a.y = parseInt(args[3]);
                index=4;
                break;
            }
            case 'at':{
                var at=getUnit(args[2]);
                a.x=at.x;a.y=at.y;
                index=3;
                break;
            }
            case 'by':{
                a.x = a.who.x+parseInt(args[2]);
                a.y = a.who.y+parseInt(args[3]);
                index=4;
            }
        }
        if (index==-1) return;
        while(args[index]!=null){
            switch(args[index]){
            case 'face':case 'turn':a.face=args[++index];break;
            case 'immediately':case 'normal':case 'fast':case 'slow':a.speed=args[index];break;
            }
            ++index;
        }
        runningCommand=a;
        a._list=this._list;
        a._index=this._index;
        exec.call(this,a);
    });

    function getUnit(gi,str){
        var who=null;
        switch(str){
            case 'player':who=$gamePlayer;break;
            case 'this':who=$gameMap.event(gi._eventId);break;
            default :who=LYZ.Event.findByName(str);break
        }
        if (who==null) who=$gamePlayer;
        return who;
    }

    var canMove = function(who) {
        if ($gameMessage.isBusy()) {
            return false;
        }
        if (who.isMoveRouteForcing() || who.areFollowersGathering!=null&&who.areFollowersGathering()) {
            return false;
        }
        if (who._vehicleGettingOn || who._vehicleGettingOff) {
            return false;
        }
        if (who.isInVehicle&&who.isInVehicle() && !who.vehicle().canMove()) {
            return false;
        }
        return true;
    };

    function moveTo(who,x,y){
        if (who.isMoving() ||!canMove(who)) return false;
        if (who.x==x&&who.y==y) return true;
        var dir=who.findDirectionTo(x,y);
        if (dir>0) {
            who.moveStraight(dir);
            return false;
        }
        return true;
    }

    console.log("LYZ_MoveEx loaded");
})();
