<template>
    <table id="learning_tab">
        <tbody>
            <tr v-for="(skill, index) in item.getLearning()">
                <td>
                    <cic-select
                        :value="skill.skill"
                        :options="game.getSkills().map(x => { return { value: x.getId(), label: x.getName() } })"
                        @input="val => item.setLearning(index, 'attribute', val)"
                    />
                </td>
                <td>
                    <cic-select
                        :value="skill.attribute"
                        :options="Object.keys(game.getAttributes()).map(x => { return { value: x, label: $t(x + '_label') }; })"
                        @input="val => item.setLearning(index, 'attribute', val)"
                    />
                </td>
                <td>
                    <cic-number
                        :value="skill.value"
                        @input="val => item.setLearning(index, 'value', val)"
                    />
                </td>
                <td><icon-button icon="remove-icon" @click="item.removeLearning(index)" /></td>
            </tr>
            <tr>
                <td colspan="3"></td>
                <td><icon-button icon="add-icon" @click="item.addLearning()" /></td>
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
        name: 'LearningTab',
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
