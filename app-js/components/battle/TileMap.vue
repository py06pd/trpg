<template>
    <ul class="grid">
        <li v-for="(row, rowIndex) in battle.map" :key="rowIndex">
            <ul>
                <li
                    v-for="(cell, cellIndex) in row"
                    :key="rowIndex + '|' + cellIndex"
                    @mouseenter="battle.setCursor(cellIndex, rowIndex)"
                    @click="battle.confirm"
                >
                    <div v-if="battle.action === 'setup' && cell.setup" class="move" />
                    <div v-if="battle.action === 'move' && battle.inRange('move', cellIndex, rowIndex)" class="move" />
                    <div v-if="battle.action === 'attack' && battle.inRange('range', cellIndex, rowIndex)" class="attack" />
                    <div v-if="battle.getBattler(cellIndex, rowIndex)" :class="'battler battler' + battle.getBattler(cellIndex, rowIndex).character.getSprite() + ' direction' + battle.getBattler(cellIndex, rowIndex).direction" />
                    <div
                        v-if="battle.action === 'setup' && cell.setup && battle.cursor.x === cellIndex && battle.cursor.y === rowIndex"
                        :class="'battler battler' + battle.active().character.getSprite()"
                        style="cursor: pointer"
                    />
                    <div v-if="battle.cursor.x === cellIndex && battle.cursor.y === rowIndex" id="cursor" />
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
import BattleController from '../../controller/battleController';

export default {
    name: 'TileMap',
    props: {
        battle: {
            type: BattleController,
            required: true,
        },
    },
};
</script>
