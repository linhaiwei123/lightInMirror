cc.Class({
    extends: cc.Component,

    properties: {
        _left: 0,
        _right: 0,
        _up: 0,
        _down: 0,

        _leftPress: false,
        _rightPress: false,
        _upPress: false,
        _downPress: false,

        _leftBlock: 0,
        _rightBlock: 0,
        _upBlock: 0,
        _downBlock: 0,

        moveSpeed: 5,
    },

    onLoad: function () {
        cc.systemEvent.on("keydown",this.onKeyDown,this);
        cc.systemEvent.on("keyup",this.onKeyUp,this);

        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function(other,self){
        let blockArray = [];
        let otherAabb = other.world.aabb;
        let selfAabb = self.world.aabb;
        let otherPreAabb = other.world.preAabb;
        let selfPreAabb = self.world.preAabb;

        if(selfPreAabb.xMax <= otherAabb.xMin && selfAabb.xMax >= otherAabb.xMin){
            //right block
            this._rightBlock++;
            blockArray.push('_rightBlock');
        }
        if(selfPreAabb.xMin >= otherAabb.xMax && selfAabb.xMin <= otherAabb.xMax){
            this._leftBlock++;
            blockArray.push('_leftBlock');
        }
        if(selfPreAabb.yMax <= otherAabb.yMin && selfAabb.yMax >= otherAabb.yMin){
            this._upBlock++;
            blockArray.push('_upBlock');
        }
        if(selfPreAabb.yMin >= otherAabb.yMax && selfAabb.yMin <= otherAabb.yMax){
            this._downBlock++;
            blockArray.push('_downBlock');
        }
        
        other.blockArray = blockArray;
    },

    onCollisionExit: function(other,self){
        if(other.blockArray !== undefined){
            for(let item of other.blockArray){
                this[item]--;
            }
            other.blockArray = [];
        }
    },

    onKeyDown: function(e){
        switch(e.keyCode){
            case cc.KEY.w: {if(!this._upPress){this._upPress = true;  this._up += 1; }break;}
            case cc.KEY.s: {if(!this._downPress){this._downPress = true; this._down += 1; }break;}
            case cc.KEY.a: {if(!this._leftPress){this._leftPress = true; this._left += 1; }break;}
            case cc.KEY.d: {if(!this._rightPress){this._rightPress = true; this._right += 1; }break;}
        }
    },

    onKeyUp: function(e){
        switch(e.keyCode){
            case cc.KEY.w: {if(this._upPress){this._upPress = false;  this._up -= 1; }break;}
            case cc.KEY.s: {if(this._downPress){this._downPress = false; this._down -= 1; }break;}
            case cc.KEY.a: {if(this._leftPress){this._leftPress = false; this._left -= 1; }break;}
            case cc.KEY.d: {if(this._rightPress){this._rightPress = false; this._right -= 1; }break;}
        }
    },

    update: function(dt){
        if(!!this._left && !this._leftBlock){this.node.x -= this.moveSpeed;}
        if(!!this._right && !this._rightBlock){this.node.x += this.moveSpeed;}
        if(!!this._up && !this._upBlock){this.node.y += this.moveSpeed;}
        if(!!this._down && !this._downBlock){this.node.y -= this.moveSpeed;}
    }

});
