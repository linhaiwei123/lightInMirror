cc.Class({
    extends: cc.Component,

    properties: {
        currentLevel: 0,
        _sceneLoading: false,
    },

    onLoad: function () {
        window.currentLevel = this.currentLevel;
        this.node.on('touch-danger',this.onTouchDanger,this);
        this.node.on('touch-gate',this.onTouchGate,this);
    },

    onTouchDanger: function(){
        if(!this._sceneLoading){
            this._sceneLoading = true;
            cc.director.loadScene('game-over-scene');
        }
    },

    onTouchGate: function(){
        if(!this._sceneLoading){
            thsis._sceneLoading = true;
            cc.director.loadScene("level-" + (this.currentLevel + 1)  + "-scene");
        }
    }

});
