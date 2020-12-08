export default class Input {
    constructor () {
        this.reset();
    }

    reset () {
        this.leftStickUp = false;
        this.leftStickLeft = false;
        this.leftStickDown = false;
        this.leftStickRight = false;

        this.DPadUp = false;
        this.DPadLeft = false;
        this.DPadDown = false;
        this.DPadRight = false;

        this.X = false;
        this.B = false;

        this.leftBumper = false;
        this.rightBumper = false;
    }

    handleInput (key) {
        this.reset();
        if (key === 'w') {
            this.leftStickUp = true;
        }
        if (key === 'a') {
            this.leftStickLeft = true;
        }
        if (key === 's') {
            this.leftStickDown = true;
        }
        if (key === 'd') {
            this.leftStickRight = true;
        }
        if (key === 'ArrowUp') {
            this.DPadUp = true;
        }
        if (key === 'ArrowLeft') {
            this.DPadLeft = true;
        }
        if (key === 'ArrowDown') {
            this.DPadDown = true;
        }
        if (key === 'ArrowRight') {
            this.DPadRight = true;
        }
        if (key === 'Enter') {
            this.X = true;
        }
        if (key === 'Escape') {
            this.B = true;
        }
    }

    cancel () {
        return this.B;
    }

    confirm () {
        return this.X;
    }

    down () {
        return this.leftStickDown;
    }

    left () {
        return this.leftStickLeft;
    }

    next () {
        return this.DPadRight;
    }

    previous () {
        return this.DPadLeft;
    }

    right () {
        return this.leftStickRight;
    }

    up () {
        return this.leftStickUp;
    }
}