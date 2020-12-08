export default class MapModel {
    constructor (data) {
        this.data = data;
    }

    getCells () {
        return this.data.map;
    }

    getTileBackground (x, y) {
        let cell = this.data.map[y][x];
        return cell.image ? 'url(images/tilesets/' + cell.image + ') ' + (-1 * this.data.cellSize * (cell.x - 1)) + 'px ' + (-1 * this.data.cellSize * (cell.y - 1)) + 'px': '';
    }

    setTile (x, y, tile) {
        this.data.map[y][x] = tile;
    }
}

