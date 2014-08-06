/*
* WmpJs
* Date : 140803 Leeyoonwoo
*
* */

var WmpJs = function( id ){
  if( this instanceof WmpJs ){
    var Func = this[id];
    if( WmpJs.classes[id] === null || typeof WmpJs.classes[id] === "undefined" ){
      WmpJs.classes[id] =  new Func();
    }
    return WmpJs.classes[id];
  }else{
    return new WmpJs(id);
  }
};

WmpJs.classes = {};
WmpJs.extend = function(__ClassName, __func ){
  var _class = this.prototype[__ClassName];
  if( _class === null || typeof _class === "undefined" ){
    this.prototype[__ClassName] = __func;
  }else{
    throw new Error("Already Exist Class.");
  }
};
WmpJs.config = {
  version:"1.0",
  readyAction:function(){
    WmpJs("SystemPop").openSystemPopDataAttrInit();
  }
};
$(document).ready(WmpJs.config.readyAction);

