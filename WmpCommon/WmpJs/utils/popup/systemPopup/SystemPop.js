// Prototype Extension
WmpJs.extend("SystemPop", function(){

  var getInnerSize = function() {
    var x,y;
    if (self.innerHeight){ // all except Explorer
      x = self.innerWidth;
      y = self.innerHeight;
    }else if (document.documentElement && document.documentElement.clientHeight){
    // Explorer 6 Strict Mode
      x = document.documentElement.clientWidth;
      y = document.documentElement.clientHeight;
    }else if (document.body){ // other Explorers
      x = document.body.clientWidth;
      y = document.body.clientHeight;
    }
    return [x,y];
  },

  resizeTo = function(innerWidth, innerHeight, nonTimerCh ) {
    if( nonTimerCh ){
      window.resizeTo( innerWidth, innerHeight );
      return;
    }

    setTimeout(function(){
      var _size_arr = getInnerSize(), adjustWidth, adjustHeight;
      adjustWidth = innerWidth - _size_arr[0];
      adjustHeight = innerHeight - _size_arr[1];
      window.resizeBy(adjustWidth, adjustHeight);
    }, 250);
  },

  resizeAutoTo = function( _selector, _w ){
    var w = ( _w === undefined )?500:_w,
    h = 0, _error_msg = "Error : Add to Selector";

    if( _selector === undefined ){
      alert(_error_msg);
      return;
    }else{
      $selector = $(_selector);
      if( $selector.length === 0 ){
        alert(_error_msg);
        return;
      }
    }

    h = $selector.height();
    resizeTo( w, h );
  },


  // open System Pop initialize ( data-pop-id attr set Event )
  readyCount = 0,
  openSystemPopDataAttrInit = function(){
    $(document).ready(function(){

      if( readyCount > 0 ) return;
      readyCount = 1;

      var $elements = $("html,body").find("[data-pop-id='system']");
      $elements.each(function(){
        openSystemPopDataAttr($(this));
      });
    });
  },

  // Data Attribute Match
  openSystemPopDataAttr = function($el){
    $el.click(function(e){
      var url = $(this).attr("data-pop-url"), name = $(this).attr("data-pop-name"), opts = $(this).attr("data-pop-opts");
      openSystemPop(url, name, opts);
      e.preventDefault();
      return false;
    });
  },

  openSystemPop = function( url, name, opts ){

    var _default = { resizable:0, scrollbars:0, status:0, titlebar:0, toolbar:0, menu:0 },
      _name = name || "", _opts = opts || "", _opt_arr, _opt_obj = {},
      _systemPop, _systemParam;

    if( url === undefined || url === "" ){
      alert("openSystemPop Error : Url is not found");
      return false;
    }

    // array To Object
    if( _opts !== "" ){
      _opt_arr = _opts.split(",");
      for( var i = 0 ; i < _opt_arr.length ; i++ ){
        var _arr = _opt_arr[i].split("="),
          _valueName = $.trim( _arr[0] ),
          _value = $.trim( _arr[1] );
        _opt_obj[_valueName] = _value;
      }

      for( var oprop in _opt_obj ){
        if( _default[oprop] != _opt_obj[oprop] ) _default[oprop] = _opt_obj[oprop];
      }
    }
    _opt_arr = [];
    for( var dprop in _default ){
      _opt_arr.push( dprop+"="+_default[dprop] );
    }
    _systemParam = _opt_arr.join(",");

    //console.log("Debug systemPop : ",url , _name, _systemParam);
    var systemPop = window.open( url , _name, _systemParam);
    systemPop.focus();
    return false;
  };

  return{
    openSystemPopDataAttrInit:openSystemPopDataAttrInit,
    //openSystemPopDataAttr:openSystemPopDataAttr,
    openSystemPop:openSystemPop,
    resizeTo:resizeTo,
    resizeAutoTo:resizeAutoTo,
    getInnerSize:getInnerSize
  };
});