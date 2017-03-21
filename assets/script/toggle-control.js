cc.Class({
    extends: cc.Component,

    properties: {
        toggleArray:[cc.Node],
        enableOnEnter: false,
        enableOnExit: false,
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'player' || other.node.group == "mirror"){
            for(let item of this._toggleArray){
                item.active = this.enableOnEnter;
            }
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'player' || other.node.group == 'mirror'){
            for(let item of this._toggleArray){
                item.active = this.enableOnExit;
            }
        }
    }

});
