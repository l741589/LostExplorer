//=============================================================================
// LTN_WindoWPop.js
//=============================================================================
/*:
* @plugindesc V.2.1 A popup window to display custom messages & items/gold gained
*
* @author LTN Games
* @param -- AutoPop Settings --
* @param Auto Item Pop
* @desc Turn this on to allow the window to popup for each gained/lost item/gold.
* @default On
*
* @param Auto Pop Alignment
* @desc The alignment of the item name & icon. Left, or Center.
* @default Left
*
* @param Gain String
* @desc The string when gaining an item. Message Code(s) allowed
* @default \C[3]Found \C[0]x
*
* @param Lose String
* @desc The string when losing an item. Message Code(s) allowed
* @default \C[2]Lost \C[0]x
*
* @param Gold Icon
* @desc The icon to display everytime you gain gold. 0 = No Icon
* @default 208
*
* @param Window Pop SE
* @desc The sound efefct you would like to play on popup.
* @default Jump1
*
* @param SE Pitch
* @desc Pitch of the SE on popup.
* @default 100
*
* @param SE Volume
* @desc Volume of the SE on popup.
* @default 100
*
* @param Pop Animation Settings
*
* @param Pop Fade Speed
* @desc The speed at which the pop up fades out.
* @default 50
*
* @param Pop Slide Speed
* @desc You can slide the popup down/up the screen by setting the speed here.
* @default 0
*
* @param -- Map Display Settings --
* @param Map Display Name
* @desc Turn this on to allow the Window Pop to take control of the Map Display Name
* @default On
*
* @param Map Display SE
* @desc Choose to use the auto pop sound effect for the map display name or not.
* @default On
*
* @param -- Autopop Collector --
* @param Collection String
* @desc The string for when collecting items
* @default Obtained
*
* @param Plural String
* @desc The string at the end of the item name. Defualt (s)
* @default (s)
*
* @param -- Window Settings --
* @param Window X Position
* @desc X Position on screen for the window pop.
* @default 0
*
* @param Window Y Position
* @desc Y Position on screen for the window pop.
* @default 0
*
* @param Window Width
* @desc The width of the window pop.
* @default 360
*
* @param Background Type
* @desc Choose the type of BG you want.'Image' or 'Gradient' without quotes.
* @default Gradient
*
* @param WindowBG Gradient 1
* @desc Change the color of the 1st gradient. RGBA
* @default rgba(0, 0, 0, 0.6)
*
* @param WindowBG Gradient 2
* @desc Change the color of the 2nd gradient. RGBA
* @default rgba(0, 0, 0, 0)
*
* @param  BG Image Filename
* @desc The filename of the bg image you want.Place in the folder System/
* @default wpop_bg
*
* @param  BG X Offset
* @desc The BG Image x position.  Not constraint to the windows width.
* @default 0
*
* @param  BG Y Offset
* @desc The BG Image y position.  Not constraint to the window height.
* @default 0
* @help
*
==============================================================================
TERMS OF USE
==============================================================================
Credit goes to: LTN Games

DO NOT REMOVE HEADER! OR CLAIM AS YOUR OWN!

Exclusive to rpgmakermv.co, please don't share anywhere else unless given
strict permission by the author of the plugin.

The plugin and all graphics included may be used in commerical and
non-commerical products. Credit must be given!

Please report all bugs to http://www.rpgmakermv.co/threads/window-pop.1432/

==============================================================================
INSTRUCTIONS
==============================================================================
Change the setting in the plugin manager to adjust how the Window Pop appears
on map.

If Auto pop is enabled in the plugin manager, a window will pop up For  each
item or gold gained or lost.
==============================================================================
USING PLUGIN COMMANDS, SCRIPT CALLS, & Notetags
==============================================================================
----------===========----------------------
COLLECTION MODE
----------===========----------------------
You can now use collection mode for window pop. The window will still popup
for every item/gold gained but with a few extra plugin commands you can setup
some in game variables and keep track of how many of each item has been gained.

The window will now reflect this as well, so instead of displaying
"Obtained x1 Potion"
it will now display a max value and how much of each item is gained like so
"Obtained 2/10 Potion(s)"
-----------------------------------
PLUGIN COMMANDS FOR COLLECTION MODE
------------------------------------
WPOPCMODE TRUE/FALSE
This command turns collection mode on / true and off / false

WPOPCSET ITEMTYPE ITEMID VARIABLE MAXVALUE
This is where you setup all your items and match them with a variable & max value.

ITEMTYPE = Weapon, Armor Or Item.

Item = The Item ID which you want to store as a collection item.

VARIABLE = The in game variable you want to set the item to.

Max Value = The max value for the item..  1/10  <-- 10 is the max value

WPOPCRESET ITEMTYPE ITEM

This will remove the item from the collection array and the next time you
collect an item it will no longer display in collection mode.

ITEM TYPE = The type of item, weapon item or armor
ITEM = The item ID in the database
----------------------------
EXAMPLES FOR COLLECTION MODE
-------------------------------
WPOPCMODE TRUE   -- Turn on collection mode

WPOPCSET Item 1 1 25   --- Set Item 1, to Variable 1 in game & the max amount to
collect is 25.
WPOPCSET Weapon 5 2 15   --- Set item 5, to Variable 2, & the max amount is 15

Now whenever I gain these items above, it will display the amount I have already
collected and  the amount I still need to collect.

I collected all of the items above and now I want to remove them and reset the
variable so I will do something like this.

WPOPCRESET Item 1
WPOPCRESET Weapon 5

The above WPOPCRESET commands will remove the items from the array and reset
the in game variable back to 0. In other words the items will now act as they
should before collection mode was turned on.

----------===========----------------------
MAP DISPLAY NAME CUSTOMIZATIONS
----------===========----------------------
If enabled in the plugin manager, window pop will take control of the
Map Display Name, so you can add message codes to make the name pop out!

You can now use message codes for your maps display name!
All you have to do is go into the maps setting from the editor
and add your own message code to the Map Display Name text field.
You can use the icon message code if you want to include icons.

----------===========----------------------
THE ITEM NOTETAG:
----------===========----------------------
You can now use a notetag in the items section of the database to chnage the
colors of the items, when they auto pop up. This can be good for Item Rarity.
Notetag to use: <WPOP_Color:x> (x = the # of the color code you want to use)

You can also change the sound effect for each item using a simple notetag.
Using the notetag will force window pop to use that sound effect instead of the
defualt se in the plugin manager.
Notetag to use  <WPOP_Sound:Absorb2>

-------------------------------------------
EXAMPLE NOTETAGS For Items, Weapons & Armor
--------------------------------------------
<WPOP_Color:1>  // Changes to white
<WPOP_Color:2>  // Changed to color 2 in the color pallete of window.png

<WPOP_Sound:Absorb2> // Change the SE on pop to Absorb2
<WPOP_Sound:Attack1> // Change the SE on pop to Attack1

To set a custom window pop, you can use either a plugin command or Script
call.
----------===========----------------------
THE PLUGIN COMMAND FOR CUSTOM POPUP:
----------===========----------------------
Plugin Command: WPOP Align Icon String

In the Icon slot put the icon index # - No icon = 0

In the Duration slot put a number to set how long before window fades out.

In the Align slot, put left, right or center, to align your string in the window.

In the string slot put the string you want to pop up.

-------------------------------------------
EXAMPLE COMMANDS
---------------------------------------------
Message codes work with window pop, I would recommend only sticking with The
codes that change color, show variables, actor name, etc. Some codes like text
size, and draw icon, may break the alignment of the message.

Example: WPOP Left 5 Welome To Oakville
WPOP Center 5 \C[3] Quest Log Updated
WPOP Center 2 \C[2] \N[1] \C[3]Is Poisoned!

----------===========----------------------
NOTES TO REMEBER:
----------===========----------------------

*/

// =============================================================================
// Name Space & IIFE
// =============================================================================
var LTN = LTN || {};
LTN.WindowPopper = LTN.WindowPopper || {};

(function(){
  'use strict';
  // =============================================================================
  // PARAMETERS
  //
  LTN.Param = LTN.Param || {};
  LTN.Parameters = PluginManager.parameters('LTN_WindowPop');
  LTN.Param.collectString = String(LTN.Parameters['Collection String']);
  LTN.Param.pluralString  = String(LTN.Parameters['Plural String']);
  LTN.Param.autoPop       = String(LTN.Parameters['Auto Item Pop']).toLowerCase();
  LTN._mapDisplayName     = String(LTN.Parameters['Map Display Name']).toLowerCase();
  LTN.Param.mapDisplaySe  = String(LTN.Parameters['Map Display SE Switch']).toLowerCase();
  LTN.Param.gainString    = String(LTN.Parameters['Gain String']);
  LTN.Param.loseString    = String(LTN.Parameters['Lose String']);
  LTN.Param.goldIcon      = Number(LTN.Parameters['Gold Icon']);
  LTN.Param.autoPopAlign  = String(LTN.Parameters['Auto Pop Alignment']).toLowerCase();
  LTN.Param.popSe         = String(LTN.Parameters['Window Pop SE']);
  LTN.Param.popPitch      = Number(LTN.Parameters['SE Pitch']);
  LTN.Param.popVol        = Number(LTN.Parameters['SE Volume']);
  LTN.Param.windowX       = Number(LTN.Parameters['Window X Position']);
  LTN.Param.windowY       = Number(LTN.Parameters['Window Y Position']);
  LTN.Param.windowWidth   = Number(LTN.Parameters['Window Width']);
  LTN.Param.bgType        = String(LTN.Parameters['Background Type']).toLowerCase();
  LTN.Param.bgImage       = String(LTN.Parameters['BG Image Filename']);
  LTN.Param.bgOffsetX     = Number(LTN.Parameters['BG X Offset']);
  LTN.Param.bgOffsetY     = Number(LTN.Parameters['BG Y Offset']);
  LTN.Param.windowGradA   = String(LTN.Parameters['WindowBG Gradient 1']);
  LTN.Param.windowGradB   = String(LTN.Parameters['WindowBG Gradient 2']);
  LTN.Param.popFade       = Number(LTN.Parameters['Pop Fade Speed']);
  LTN.Param.popSlideSpeed = Number(LTN.Parameters['Pop Slide Speed']);
  LTN.Param.popUpDelay    = Number(LTN.Parameters['Pop Up Delay']);


  // =============================================================================
  // Game_System
  // =============================================================================
  LTN.WindowPop_oldGS_init = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    LTN.WindowPop_oldGS_init.call(this);
    //Collection Mode Object, for handling array & types. Saves to savefile!
    this.collectObj = {
      item:   {itemId: [], itemMax: [], gameVar: [] },
      armor:  {itemId: [], itemMax: [], gameVar: [] },
      weapon: {itemId: [], itemMax: [], gameVar: [] }
    };
  };
  Game_System.prototype.collectionObject = function() {
    return this.collectObj;
  };
  // =============================================================================
  // Game Party: Assign Auto Pop Variables
  // =============================================================================
  //--------------------------------------
  // Alias Nethod: Gain Gold
  //------------------------------------------------------------------------------
  LTN.WindowPop_gameParty_GainGold = Game_Party.prototype.gainGold;
  //------------------------------------------------------------------------------
  Game_Party.prototype.gainGold = function(amount) {
    if (LTN.Param.autoPop === 'on') {
      if( SceneManager._scene.constructor !== Scene_Map) return;
      WinPopManager.addToQueue('gold', LTN.Param.goldIcon, amount, amount);
    }
    LTN.WindowPop_gameParty_GainGold.call(this, amount);
  };
  //-----------------------------------------------------------
  // Alias Nethod: gainItem. Add current gained item to queue
  LTN.WindowPop_oldGP_gainItem = Game_Party.prototype.gainItem;
  Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    LTN.WindowPop_oldGP_gainItem.call(this, item, amount, includeEquip); //Call Original Method
    if (LTN.Param.autoPop === 'on' && item) {
        WinPopManager.addToQueue('item', item.iconIndex, item, amount);
      }

    $gameMap.requestRefresh();
  };

  //===========================================================================
  // Scene Map: Implement Window Pop Into Scene_Map
  //===========================================================================
  //----------------------------------------------
  // Aliased Nethod:  Create Window Pop in Scene_Map
  LTN.WindowPop_Scene_Map_Update = Scene_Map.prototype.update;

  // Aliased Method Scene_Update
  Scene_Map.prototype.update = function() {
    LTN.WindowPop_Scene_Map_Update.call(this);
    WinPopManager.addToSceneMap();
  };

  //------------------------------------------------------------------------------
  // Alised Method:  If using the Map Display name feature, overwrite to use WindowPop
  //------------------------------------------------------------------------------
  LTN.WindowPop_oldSceneMap_Start   = Scene_Map.prototype.start;
  //------------------------------------------------------------------------------
  Scene_Map.prototype.start = function() {
    if(LTN._mapDisplayName === 'on'){
      var mapName = $gameMap.displayName();
      Scene_Base.prototype.start.call(this);
      SceneManager.clearStack();
      if (this._transfer) {
        this.fadeInForTransfer();
        if(mapName) {
          WinPopManager.addToQueue('map');
        }
        $gameMap.autoplay();
      } else if (this.needsFadeIn()) {
        this.startFadeIn(this.fadeSpeed(), false);
      }
      this.menuCalling = false;
    } else {
      LTN.WindowPop_oldSceneMap_Start.call(this);
    }
  };

  //=============================================================================
  //  WINDOW POP. The main window which pops up.
  //
  //
  function Window_Pop() {
    this.initialize.apply(this, arguments);
  }

  Window_Pop.prototype = Object.create(Window_Base.prototype);
  Window_Pop.prototype.constructor = Window_Pop;
  //-------=====---------
  //Initialize
  //-------=====---------
  Window_Pop.prototype.initialize = function(pop, x, y) {
    this._pop = pop;   // Winodw Pop Public Var for popUp Array
    var collectObj     = $gameSystem.collectionObject();
    var width          = LTN.Param.windowWidth;
    var height         = this.lineHeight(3);
    var px             = LTN.Param.windowX;
    var py             = LTN.Param.windowY;
    Window_Base.prototype.initialize.call(this, px, py, width, height);
    this.opacity = 0;
    this.padding = 0;
    this.refresh();
  };
  //-------=====---------
  //Refresh
  //-------=====---------
  Window_Pop.prototype.refresh = function() {
    this.contents.clear();
    this.popSe(this._pop.item);
    this.backgroundManager(LTN.Param.bgType);
    this.contentManager(this._pop.type, this._pop.icon, this._pop.item, this._pop.amount);
  };

  //Draw Content according to type
  Window_Pop.prototype.contentManager = function(type, icon, item, amount) {
    var align    = LTN.Param.autoPopAlign;
    switch (type) {
      case 'item':
      if(WinPopManager.collectMode === 'true' && WinPopManager.itemIsMatch(item, item.id) && amount > 0){
        this.drawItemCollector(item.iconIndex, item, align);
      } else {
        this.drawItemContents(item.iconIndex, item, amount, align);
      }
      break;
      case 'gold':
      this.drawGoldContents(icon, amount, align);
      break;
      case 'custom':
      this.drawCustomContents(icon, item, align);
      break;
      case 'map':
      this.drawMapDisplay(align);
      break;
    }
  };
  Window_Pop.prototype.backgroundManager = function(type){
    var bgWidth = LTN.Param.windowWidth;
    //Check which BG to use.
    switch (type) {
      // Image choice
      case 'image':
      this.drawBackgroundImage();
      break;
      // Gradient Choice
      case 'gradient':
      this.drawBackgroundGradient(0, 0, bgWidth, this.lineHeight(2));
      break;
      // Defualt Choice
      default:
      this.drawBackgroundGradient(0, 0, bgWidth, this.lineHeight(2));
      break;
    }
  };
  //-------=====---------
  // Draw contents for Auto Item Pop
  //-------=====---------
  Window_Pop.prototype.drawMapDisplay = function(align) {
    var mapName = $gameMap.displayName();
    var x = this.alignPopText(mapName, LTN.Param.windowWidth, align);
    if (mapName) this.drawTextEx(mapName, x, 0);
  };
  //-------=====---------
  // Draw contents for Auto Item Pop
  //-------=====---------
  Window_Pop.prototype.drawItemContents = function(icon, item, amount, align) {
    var gainString  = LTN.Param.gainString;
    var loseString  = LTN.Param.loseString;
    var increment   = WinPopManager.checkIncrement(amount, gainString , loseString);
    var newAmount   = WinPopManager.cleanString(amount);
    var coloredItem = WinPopManager.addColorCodeTo(item);
    var itemString = '';
    itemString  = increment + newAmount + ' ' + coloredItem;
    var tx = this.alignPopText(itemString, LTN.Param.windowWidth, align);
    var ix = tx - 32;

    this.drawIcon(icon, ix, 2);
    this.drawTextEx(itemString, tx, 0);
  };
  //-------=====---------
  // Draw contents for Auto Item Pop Collection Mode
  //-------=====---------
  Window_Pop.prototype.drawItemCollector = function(icon, item, align){
    // String Variables
    var gainString   = LTN.Param.collectString;
    var pluralString = LTN.Param.pluralString;
    var coloredItem  = WinPopManager.addColorCodeTo(item);
    var itemString   = '';

    //Collection Object Variables
    var varVal  = WinPopManager.getValueFromObj('gameVar', item, item.id);
    var itemMax = WinPopManager.getValueFromObj('itemMax', item, item.id);
    var itemVar = $gameVariables.value(varVal);

    // Draw contents if item matches array in collect object
    if(WinPopManager.collectMode === 'true' && WinPopManager.itemIsMatch(item, item.id)) {
      itemString = gainString + ' ' + itemVar + '/'+ itemMax + ' ' + coloredItem + pluralString;
      var tx = this.alignPopText(itemString, LTN.Param.windowWidth, align);
      var ix = tx - 32;
      this.drawIcon(icon, ix, 2);
      this.drawTextEx(itemString, tx, 0);
    }
  };
  //-------=====---------
  // Draw contents for Auto Gold Pop
  //-------=====---------
  Window_Pop.prototype.drawGoldContents = function(icon, amount, align) {
    var gainString = LTN.Param.gainString;
    var loseString = LTN.Param.loseString;
    var increment  = WinPopManager.checkIncrement(amount, gainString, loseString);
    var newAmount  = WinPopManager.cleanString(amount);
    var goldString = increment +  newAmount + ' ' + TextManager.currencyUnit;
    var tx = this.alignPopText(goldString, LTN.Param.windowWidth, align);
    var ix = tx - 32;

    this.drawIcon(icon, ix, 2);
    this.drawTextEx(goldString , tx, 0);
    // }
  };
  //-------=====---------
  // Draw contents For Custom Call
  //-------=====---------
  Window_Pop.prototype.drawCustomContents = function(icon, string, align) {
    var tx = this.alignPopText(string, LTN.Param.windowWidth, align);
    var ix = tx - 32;
    this.drawTextEx(string, tx, 0);
    this.drawIcon(icon, ix, 2);
  };
  //-------=====---------
  // Draw Background
  //-------=====---------
  Window_Pop.prototype.drawBackgroundGradient = function(x, y, width, height) {
    var color1 = LTN.Param.windowGradA;
    var color2 = LTN.Param.windowGradB;
    this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
    this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
  };
  //-------=====---------
  // Draw Background Image
  //-------=====---------
  Window_Pop.prototype.drawBackgroundImage = function() {
    this._backSprite = ImageManager.loadSystem(LTN.Param.bgImage);
    this._backSprite1 = new Sprite(this._backSprite);
    this._backSprite1.x       = LTN.Param.bgOffsetX;
    this._backSprite1.y       = LTN.Param.bgOffsetY;
    this.addChildToBack(this._backSprite1);
    //
  };
  Window_Pop.prototype.standardPadding = function(actor) {
    return 0;
  };
  //-------=====---------
  // New Method: To Align Auto Pop string for drawTextEx methods x value.
  //-------=====---------
  Window_Pop.prototype.alignPopText = function(string, maxWidth, align) {
    var messageCodesWidth =  this.adjustStringWidth(string);
    var textWidth          = this.textWidth(string);
    var stringWidth        =  textWidth - messageCodesWidth;
    var finalX = 0;
    switch (align) {
      case 'center':
      finalX = (maxWidth - stringWidth) / 2;
      break;
      case 'left':
      finalX = 32;
      break;
      case 'right':
      finalX =  maxWidth - stringWidth;
      break;
    }
    if(finalX < 32) finalX = 32;
    return finalX;
  };
  //-------=====---------
  // New Method: To adjust the alignment when message codes are present in string
  //-------=====---------
  Window_Pop.prototype.adjustStringWidth = function(string) {
    var widthToRemove = '';
    var toAdjust = string.match(/(\\[CNVG]\[\d*\])/g);
    if(!toAdjust) return 0;
    for (var i = 0 ; i < toAdjust.length ; i++) {
      widthToRemove += toAdjust[i];
    }
    var removedWidth = this.textWidth(widthToRemove);
    return removedWidth;
  };
  //-------=====---------
  // New Method: popSe, Setup sound effect object
  //-------=====---------
  Window_Pop.prototype.popSe = function(item) {
    var popSe    = {};
    WinPopManager.changePopSound(popSe, item);
    popSe.pitch  = LTN.Param.popPitch;
    popSe.volume = LTN.Param.popVol;
    popSe.pan    = 0;
    AudioManager.playSe(popSe);
  };
  // =============================================================================
  // New Static Class: Window Pop Manager
  //
  // - Handles All Window Pop Functions, Queue System, Collection Mode & Note Tags
  // - functions include: sortItemType, addColorTo, cleanString, getNotetag...
  //
  function WinPopManager() {
  }
  LTN.WindowPopper=WinPopManager;
  // Public variables - Call using this.
  WinPopManager.popQueue = [];
  WinPopManager.popUps   = [];
  WinPopManager.popUpDelay = 0;

  WinPopManager._align = 'left';
  //
  WinPopManager.collectMode = 'false';

  //----------------------------------------------------------------------------
  // Window Pop Queue Functions
  // - Handles queue arrays & adds to scene map, & animations.
  //
  WinPopManager.addToSceneMap = function(){
    if(this.popUpDelay > 0) this.popUpDelay--;
    if(this.popQueue.length > 0 && this.popUpDelay <= 0){
      var curPop = this.popQueue[0];
       this.adjustCollectionVar(curPop.item, curPop.amount);
      var newPop = new Window_Pop(this.popQueue[0], this.x, this.y);
      this.popQueue.shift();
      this.popUps.push(newPop);
      SceneManager._scene.addChild(newPop);
      this.popUpDelay = LTN.Param.popFade;
    }
    this.slideDownPop();
  };
  // Animate: slide down pop ups.
  WinPopManager.slideDownPop = function(){
    if(this.popUps.length > 0) {
      for (var i = this.popUps.length -1; i >= 0; i--) {
        this.popUps[i].y += LTN.Param.popSlideSpeed;
        this.popUps[i].alpha -= 0.5/LTN.Param.popFade;
        if(this.popUps[i].alpha < 0) {
          SceneManager._scene.removeChild(this.popUps[i]);
          this.popUps.splice(this.popUps.indexOf(this.popUps[i]), 1);
        }
      }
    }
  };
  //-------=====---------
  //Set & Add to Queue Array
  //-------=====---------
  WinPopManager.addToQueue = function(type, icon, item, amount){
    if( SceneManager._scene.constructor !== Scene_Map) return;
    var pop    = this.createEmptyPop();
    pop.type  = type;
    pop.icon   = icon;
    pop.item = item;
    pop.amount = amount;
    this.popQueue.push(pop);
  };
  // Create empty object for queueing
  WinPopManager.createEmptyPop = function() {
    var empty = {};
    empty.type = '';
    empty.icon = 0;
    empty.string = "";
    empty.amount = 0;
    return empty;
  };
  //
  //------------------------------------------------------------------------------
  // Collection Mode Functions.
  //  - To handle all object arrays input from the plugin command
  //
  WinPopManager.pushToObjArray = function(itemType, itemId, gameVar, maxValue){
    var obj = $gameSystem.collectionObject();
    var index = itemId;

    switch (itemType) {
      case 'item':
      if(this.itemIdIndex('item', itemId) < 0){
        obj.item.gameVar.push(gameVar);
        obj.item.itemId.push(itemId);
        obj.item.itemMax.push(maxValue);
      }
      break;
      case 'armor':
      if(this.itemIdIndex('armor', itemId) < 0){
        obj.armor.gameVar.push(gameVar);
        obj.armor.itemId.push(itemId);
        obj.armor.itemMax.push(maxValue);
      }
      break;
      case 'weapon':
      if(this.itemIdIndex('weapon', itemId) < 0){
        obj.weapon.gameVar.push(gameVar);
        obj.weapon.itemId.push(itemId);
        obj.weapon.itemMax.push(maxValue);
      }
      break;
    }
  };

  // For Plugin Command: Remove an Item(elements) from the array and reset variable
  WinPopManager.removeFromArray = function(itemType, itemId) {
    var obj = $gameSystem.collectionObject();
    var index = this.itemIdIndex('item', itemId);
    switch (itemType) {
      case 'item':
      if(this.itemIdIndex('item', itemId) > -1){
        obj.item.gameVar.splice(index, 1);
        obj.item.itemId.splice(index, 1);
        obj.item.itemMax.splice(index, 1);
        $gameVariables.setValue(index, 0);
      }
      break;
      case 'armor':
      if(this.itemIdIndex('armor', itemId) > -1){
        obj.item.gameVar.splice(index, 1);
        obj.armor.itemId.splice(index, 1);
        obj.armor.itemMax.splice(index, 1);
        $gameVariables.setValue(index, 0);
      }
      break;
      case 'weapon':
      if(this.itemIdIndex('weapon', itemId) > -1){
        obj.item.gameVar.splice(index, 1);
        obj.weapon.itemId.splice(index, 1);
        obj.weapon.itemMax.splice(index, 1);
        $gameVariables.setValue(index, 0);
      }
      break;
    }
  };
  // Check if current item poping is a match with object arrays
  WinPopManager.itemIsMatch = function(item, itemId) {
    var obj = $gameSystem.collectionObject();
    var index = String(itemId);
    var itemType = this.sortItemType(item);
    var value = false;
    switch (itemType) {
      case 'item':
      if(obj.item.itemId.indexOf(index) >-1) value = true;
      break;
      case 'armor':
      if(obj.armor.itemId.indexOf(index) >-1) value = true;
      break;
      case 'weapon':
      if(obj.weapon.itemId.indexOf(index) >-1) value = true;
      break;
    }
    return value;
  };
  //Get the index from the array for current item poping
  WinPopManager.itemIdIndex = function(itemType, itemId) {
    var obj = $gameSystem.collectionObject();
    var index = String(itemId);
    var objIndex = 0;
    if(itemType === 'item')   objIndex = obj.item.itemId.indexOf(index);
    if(itemType === 'armor')  objIndex = obj.armor.itemId.indexOf(index);
    if(itemType === 'weapon') objIndex = obj.weapon.itemId.indexOf(index);
    return objIndex;
  };
  // get value from arrays, by using current array position
  WinPopManager.getValueFromObj = function(type, item, itemId){
    var itemType = this.sortItemType(item);
    var index = this.itemIdIndex(itemType, itemId);
    var obj = $gameSystem.collectionObject();
    var value = '';
    switch (type) {
      case 'gameVar':
      if(itemType === 'item')   value = obj.item.gameVar[index];
      if(itemType === 'armor')  value = obj.armor.gameVar[index];
      if(itemType === 'weapon') value = obj.weapon.gameVar[index];
      break;
      case 'itemMax':
      if(itemType === 'item')   value = obj.item.itemMax[index];
      if(itemType === 'armor')  value = obj.armor.itemMax[index];
      if(itemType === 'weapon') value = obj.weapon.itemMax[index];
      break;
    }
    return value;
  };

  // Add +1 to gamevariables for collection mode.
  WinPopManager.adjustCollectionVar = function(item, amount) {
    if(!item) return;
    if(this.collectMode === 'true' && this.itemIsMatch(item, item.id)) {
      var gameVar = this.getValueFromObj('gameVar', item, item.id);
      var oldValue = $gameVariables.value(gameVar);
      if(amount > 0) $gameVariables.setValue(gameVar, oldValue + amount);
    }
  };
  //
  //-----------------------------------------------------------------------------
  // Window Pop Functions
  //

  //Sort through item notetags if sound note tag is there change se otherwise defualt
  WinPopManager.changePopSound = function(sound, item) {
    var newSound = this.getSoundTagByItemType(item);
    var itemType = this.sortItemType(item);
    if(newSound && itemType === 'item'){
      sound.name   = String(newSound).trim();
    } else {
      sound.name   = LTN.Param.popSe;
    }
  };

  // Add the color code from notetag to string
  WinPopManager.addColorCodeTo = function(item) {
    var colorCode = this.getColorTagByItemType(item);
    var oldString = item.name;
    var newString = '';
    if(colorCode){
      var colorCodeString = '\\C[' + colorCode + ']';
      newString = colorCodeString.replace(/\s/g, '') + oldString;
      return newString;
    } else {
      return oldString;
    }
  };


  // New Method: Clean the string, to remove the minus (-) symbol from item.amount
  WinPopManager.cleanString = function(string) {
    var oldString = String(string);
    if(!oldString) return;
    var cleanString = oldString.replace(/(^-)/g,'');
    return cleanString;
  };

  // Check the amount of of item being gained or lost, & change string accordingly
  WinPopManager.checkIncrement = function(amount, gainString, loseString) {
    var increment = '';
    if(amount > 0){
      increment  = gainString;
    } else if(amount < 0) {
      increment  = loseString;
    }
    return increment;
  };

  // Sort items, and set the item type.
  WinPopManager.sortItemType = function(item) {
    var itemType = '';
    if (DataManager.isItem(item)) {
      itemType = 'item';
    } else if (DataManager.isWeapon(item)) {
      itemType = 'weapon';
    } else if (DataManager.isArmor(item)) {
      itemType = 'armor';
    } else {
      itemType = '';
    }
    return itemType;
  };

  // Find notetag according to item being gained
  WinPopManager.getSoundTagByItemType = function(item) {
    var soundNotetag = '';
    var itemType = this.sortItemType(item);
    switch (itemType) {
      case 'armor':
      soundNotetag = $dataArmors[item.id].meta.WPOP_Sound;
      break;
      case 'item':
      soundNotetag = $dataItems[item.id].meta.WPOP_Sound;
      break;
      case 'weapon':
      soundNotetag = $dataWeapons[item.id].meta.WPOP_Sound;
      break;
    }
    return soundNotetag ? soundNotetag : LTN.Param.popSe;
  };

  // Set the notetag according to type of item
  WinPopManager.getColorTagByItemType = function(item) {
    var colorNotetag = '';
    var itemType = this.sortItemType(item);
    switch (itemType) {
      case 'armor':
      colorNotetag = $dataArmors[item.id].meta.WPOP_Color;
      break;
      case 'item':
      colorNotetag = $dataItems[item.id].meta.WPOP_Color;
      break;
      case 'weapon':
      colorNotetag = $dataWeapons[item.id].meta.WPOP_Color;
      break;
    }
    return colorNotetag;
  };
  // =============================================================================
  // Game_Interpreter.. Create Plugin Command
  //
  /*
  =================Dev Notes=============
  Add plugin commands for each On/Off switch in the plugin parameters.
  */
  LTN.WPOP_oldGPpluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    LTN.WPOP_oldGPpluginCommand.call(this, command, args);
    switch (command) {
      // WPOP ALIGN ICON STRING
      case 'WPOP':
      var pluginString = '';
      var j = args.length;
      for (var i = 2; i < j; i++) {
        if (i < j){
          pluginString  += args[i] ? args[i] : '';
          pluginString  += " ";
        }
      }
      var align    = args[0] ? String(args[0]).toLowerCase() : 'left';
      var icon     = args[1] ? Number(args[1]) : 0;
      var string   = pluginString;
      WinPopManager._align = align;
      WinPopManager.addToQueue('custom', icon, string, 0);
      break;
      // WPOPCMODE TRUE/FALSE
      case 'WPOPCMODE':
      WinPopManager.collectMode = args[0] ? String(args[0]).toLowerCase() : 'false';
      break;
      // WPOPCSET ItemType ItemId Variable MaxValue
      case 'WPOPCSET':
      WinPopManager.pushToObjArray(args[0].toLowerCase(), args[1], args[2], args[3]);
      break;
      // WPOPCRESET ItemType ItemId
      case 'WPOPCRESET':
      WinPopManager.removeFromArray(args[0].toLowerCase(), args[1]);
      break;
    }
  };
})();
// =============================================================================
// THE END, Based On A True Story!
// =============================================================================
