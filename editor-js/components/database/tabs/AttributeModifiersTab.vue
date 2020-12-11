<template>
    <table id="attribute_modifier_tab">
        <tbody>
            <tr v-for="(modifier, index) in item.getAttributes()">
                <td>
                    <cic-select
                        :value="modifier.attribute"
                        :options="Object.keys(game.getAttributes()).map(x => { return { value: x, label: $t(x + '_label') }; })"
                        @input="val => item.setAttribute(index, 'attribute', val)"
                    />
                </td>
                <td class="operator-cell">
                    <cic-select
                        :value="modifier.operator"
                        :options="['+', '*'].map(x => { return { value: x, label: x }; })"
                        @input="val => item.setAttribute(index, 'operator', val)"
                    />
                </td>
                <td>
                    <cic-number
                        :value="modifier.value"
                        @input="val => item.setAttribute(index, 'value', val)"
                    />
                </td>
                <td><icon-button icon="remove-icon" @click="item.removeAttribute(index)" /></td>
            </tr>
            <tr>
                <td colspan="3"></td>
                <td><icon-button icon="add-icon" @click="item.addAttribute()" /></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import IconButton from '@/components/controls/IconButton';
    import CicNumber from '@/components/input/CicNumber';
    import CicSelect from '@/components/input/CicSelect';
    import GameModel from '@/models/GameModel';
    import ItemModel from '@/models/ItemModel';

    export default {
        name: 'AttributeModifiersTab',
        components: {
            CicSelect,
            IconButton,
            CicNumber,
        },
        props: {
            game: {
                type: GameModel,
                required: true,
            },
            item: {
                type: ItemModel,
                required: true,
            },
        },
    };
</script>
