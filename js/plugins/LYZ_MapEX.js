/**
 * Created by Roy on 16-4-4.
 */

/*:
 * @plugindesc V.1.0.0 some extension for map
 *
 * @author BigZhao
 */


(function(){
    var $=LYZ.$;

    var map=LYZ.Map=LYZ.Map||{
        level:0
    };

/*
    $.override(Tilemap.prototype,"_paintTiles",function(args,origin){
        this.__lyz_paintingTileX=args[2];
        this.__lyz_paintingTileY=args[3];
        origin.apply(this,args);
    });
*/

    Tilemap.prototype.tag=function(tileId){
        var tag = this.flags[tileId] >> 12;
        if (tag > 0) return tag;
        return 0;
    };

    $.delegate(Tilemap.prototype,"_isHigherTile",function(tileId){
        var t=this.tag(tileId);
        if (map.level<t) return true;
        return this._originReturnValue;
    });

    Game_Map.prototype.checkPassage = function(x, y, bit) {
        var tileset=this.tileset();
        if (tileset==null) return false;
        var flags = tileset.flags;
        var tiles = this.allTiles(x, y);
        for (var i = 0; i < tiles.length; i++) {
            //if (tileset._isHigherTile(tiles[i])) continue; // [*] No effect on passage
            var flag = flags[tiles[i]];
            if ((flag & 0x10) !== 0) // [*] No effect on passage
                continue;
            if ((flags >> 12)>map.level)
                continue;
            if ((flag & bit) === 0)   // [o] Passable
                return true;
            if ((flag & bit) === bit) // [x] Impassable
                return false;
        }
        return false;
    };
})();