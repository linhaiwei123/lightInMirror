cc.Class({
    extends: cc.Component,

    properties: {
       _player: null,
       _mirror: null,
       _wallTouch: 0,
    },

    init: function (player,mirror) {
        this._player = player;
        this._mirror = mirror;

        //设置碰撞 用于避免玩家交换后进入墙壁
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'wall'){
            this._wallTouch++;
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'wall'){
            this._wallTouch--;
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this._player && this._mirror){
            let newPosition = cc.pAdd(this._mirror.position,cc.pSub(this._mirror.position,this._player.position));
            this.node.position = newPosition;
        }
    },
});
