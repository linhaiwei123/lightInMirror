cc.Class({
    extends: cc.Component,

    properties: {
        shadowPlayerPrefab: cc.Prefab,
        _shadowPlayer: null,
        player: cc.Node,
        _canvas: {
            get: function(){
                return cc.find('Canvas');
            }
        },

        _spacePress: false,
        _fPress: false,
        _mirrorSet: false,
        _followPosition: null,
    },  

    onLoad: function () {
        this._followPosition = this.node.position.clone();
        
        this._shadowPlayer = cc.instantiate(this.shadowPlayerPrefab);
        this._canvas.addChild(this._shadowPlayer);
        this._shadowPlayer.getComponent('shadow-player-control').init(this.player,this.node);
        this._shadowPlayer.active = false;


        this._canvas.on('touchstart',this.onTouchStart,this);

        //按下空格 人物和影子换位
        //按下f键  回收镜子和影子

        cc.systemEvent.on('keydown',this.onKeyDown,this);
        cc.systemEvent.on('keyup',this.onKeyUp,this);
    },

    onKeyDown: function(e){
        switch(e.keyCode){
            case cc.KEY.space: if(!this._spacePress){this._spacePress = true;this.onSpacePress();break;};
            case cc.KEY.f: if(!this._fPress){this._fPress = true;this.onFPress();break;};
        }
    },

    onKeyUp: function(e){
        switch(e.keyCode){
            case cc.KEY.space: if(this._spacePress){this._spacePress = false;};
            case cc.KEY.f: if(this._fPress){this._fPress = false;};
        }
    },

    onSpacePress: function(){
        //人物和影子交换位置
        //检测镜子是否放下
        //检查影子是否在墙壁里面
        let wallTouch = !!this._shadowPlayer.getComponent('shadow-player-control')._wallTouch;
        if(this._mirrorSet && !wallTouch){
            let shadowPlayerPosition = this._shadowPlayer.position.clone();
            let playerPosition = this.player.position.clone();
            this.player.position = shadowPlayerPosition;
            this._shadowPlayer.position = playerPosition;
        }
    },

    onFPress: function(){
        //回收镜子和影子
        //解除镜子放下
        this._shadowPlayer.active = false;
        this.node.parent = this.player;
        this.node.position = this._followPosition;
        this._mirrorSet = false;
    },

    

    onTouchStart: function(e){
        //镜子移到点击位置 不随玩家移动
        //影子激活
        //设置镜子放下
        let positionForCanvas = this._canvas.convertToNodeSpaceAR(e.getLocation());
        this.node.parent = this._canvas;
        this.node.position = positionForCanvas;
        this._mirrorSet = true;
        this._shadowPlayer.active = true;
    }


});
