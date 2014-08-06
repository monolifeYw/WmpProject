WmpJs.extend("Utils", function(){
  return{
    jQueryVersion:$.fn.jquery.substr(0,3),
    nowTime:function(){ return new Date().getTime();},
    binder:function( _scope, _function ){
      return function(){
        return _function.apply( _scope, arguments );
      };
    }
  };
});