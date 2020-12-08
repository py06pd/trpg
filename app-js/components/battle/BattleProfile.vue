<template>
    <ul>
        <li><span :class="'profile profile' + character.getFace()" /></li>
        <li>
            <ul class="stats">
                <li>{{ character.getLabel() }}</li>
                <li>{{ 'HP: ' + character.getAttribute('hp').getValue() + '/' + character.getAttribute('hp').getMax() }}</li>
            </ul>
        </li>
    </ul>
</template>

<script>
import Character from '../../model/character';

export default {
    name: 'BattleProfile',
    props: {
        character: {
            type: Character,
            required: true,
        },
    },
};
</script>
