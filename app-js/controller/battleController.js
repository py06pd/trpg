export default class BattleController
{
    constructor (party, map) {
        this.action = 'setup';
        this.battlers = [];
        this.cursor = { x: 0, y: 0 };
        this.map = map;
        this.party = party;
        this.setupIndex = 0;
        this.target = null;
    }

    active () {
        if (this.action === 'setup') {
            return { character: this.party[this.setupIndex] };
        }

        return this.battlers[0];
    }

    addBattler (character) {
        this.battlers.push({ x: this.cursor.x, y: this.cursor.y, direction: 3, character: character });
        if (this.battlers.length === Math.min(6, this.party.length)) {
            this.cursor = { x: this.battlers[0].x, y: this.battlers[0].y };
            this.action = null;
        } else {
            this.change(1);
        }
    }
    
    attack () {
        let index = this.battlers.findIndex(a => a.x === this.cursor.x && a.y === this.cursor.y);
        if (index >= 0) {
            let target = this.battlers[index].character;
            let damage = target.getAttribute('str').getValue() * 4 - target.getAttribute('def').getValue() * 2;
            target.getAttribute('hp').reduce(damage);
            this.action = 'endTurn';
        }
    }

    change (increment) {
        this.setupIndex = this.setupIndex + increment;
        if (this.setupIndex < 0) {
            this.setupIndex = this.party.length - 1;
        }
        if (this.setupIndex === this.party.length) {
            this.setupIndex = 0;
        }

        if (this.battlers.find(x => x.character.getName() == this.active().character.getName())) {
            this.change(increment);
        }
    }

    confirm () {
        if (this.action === 'attack' && this.inRange('range', this.cursor.x, this.cursor.y)) {
            this.attack();
        } else if (this.action == 'move' && this.inRange('move', this.cursor.x, this.cursor.y)) {
            this.move();
        } else if (this.action === 'setup' && this.map[this.cursor.y][this.cursor.x].setup) {
            let index = this.battlers.findIndex(x => x.x === this.cursor.x && x.y === this.cursor.y);
            if (index >= 0) {
                this.setupIndex = this.party.findIndex(x => x.getName() === this.battlers[index].character.getName());
                this.removeBattler(index);
            } else {
                this.addBattler(this.active().character);
            }
        }
    }

    endTurn () {
        this.action = null;
        this.battlers.splice(this.battlers.length, 0, this.battlers.splice(0, 1)[0]);
        if (this.battlers[0].character.getType() === 'enemy') {
            this.endTurn();
        }

        this.target = null;
    }
    
    getBattler (x, y) {
        return this.battlers.find(a => a.x === x && a.y === y);
    }

    handleInput (input) {
        if (this.action === 'endTurn') {
            if (input.confirm()) {
                this.endTurn();
            }
            if (input.down()) {
                this.battlers[0].direction = 3;
            }
            if (input.left()) {
                this.battlers[0].direction = 4;
            }
            if (input.right()) {
                this.battlers[0].direction = 2;
            }
            if (input.up()) {
                this.battlers[0].direction = 1;
            }
        } else {
            if (input.up() && this.cursor.y > 0) {
                this.setCursor(this.cursor.x, this.cursor.y - 1);
            }
            if (input.down() && this.cursor.y < this.map.length) {
                this.setCursor(this.cursor.x, this.cursor.y + 1);
            }
            if (input.left() && this.cursor.x > 0) {
                this.setCursor(this.cursor.x - 1, this.cursor.y);
            }
            if (input.right() && this.cursor.x < this.map[0].length) {
                this.setCursor(this.cursor.x + 1, this.cursor.y);
            }
            if (input.confirm()) {
                this.confirm();
            }
            if (this.action === 'setup') {
                if (input.next()) {
                    this.change(1);
                }
                if (input.previous()) {
                    this.change(-1);
                }
            } else if (input.cancel()) {
                this.action = null;
            }
        }
    }

    inRange (attribute, x, y) {
        let active = this.active();
        let distance = Math.abs(active.x - x) + Math.abs(active.y - y);
        return distance > 0 && distance <= active.character.getAttribute(attribute).getValue();
    }

    move () {
        this.battlers[0].x = this.cursor.x;
        this.battlers[0].y = this.cursor.y;
        this.action = null;
    }

    removeBattler (index) {
        this.battlers.splice(index, 1);
    }

    setCursor (x, y) {
        this.target = null;
        this.cursor = { x: x, y: y };
        if (this.action !== 'setup') {
            let index = this.battlers.findIndex(a => a.x === x && a.y === y);
            if (index > 0) {
                this.target = this.battlers[index].character;
            }
        }
    }
}
