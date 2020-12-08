<template>
    <ul id="attributes">
        <li v-for="(maxValue, attribute) in game.getAttributes()" :key="attribute">
            <span>{{ $t(attribute + '_label') }}</span>
            <cic-number
                :value="item.getAttribute(attribute)"
                :min="0"
                :max="maxValue"
                @input="val => item.setAttribute(attribute, val)"
            />
        </li>
    </ul>
</template>

<script>
    import CicNumber from '@/components/input/CicNumber';
    import CharacterModel from '@/models/CharacterModel';
    import GameModel from '@/models/GameModel';

    export default {
        name: 'AttributesTab',
        components: {
            CicNumber,
        },
        props: {
            game: {
                type: GameModel,
                required: true,
            },
            item: {
                type: CharacterModel,
                required: true,
            },
        },
    };
</script>
