cc.Class({
    extends: cc.Component,

    properties: {
        _canvas: {
            get: function(){
                return cc.find('Canvas');
            }
        }
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == "player"){
            this._canvas.emit('touch-gate');
        }
    }

});
