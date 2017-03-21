cc.Class({
    extends: cc.Component,

    properties: {
       _player: null,
       _mirror: null,
    },

    init: function (player,mirror) {
        this._player = player;
        this._mirror = mirror;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this._player && this._mirror){
            let newPosition = cc.pAdd(this._mirror.position,cc.pSub(this._mirror.position,this._player.position));
            this.node.position = newPosition;
        }
    },
});
