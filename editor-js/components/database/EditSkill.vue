<template>
    <ul class="content">
        <li class="form-item-label">
            {{ $t('Name') }}
        </li>
        <li><cic-textbox :value="item.getName()" @input="item.setName" /></li>
        <li class="form-item-label">
            {{ $t('Types') }}
        </li>
        <li>
            <cic-select
                :value="item.getTypes()"
                :options="game.getJobs().map(job => job.skill).map(x => { return { value: x, label: x }; })"
                multiple
                @input="item.setTypes"
            />
        </li>
    </ul>
</template>

<script>
    import CicSelect from '@/components/input/CicSelect';
    import CicTextbox from '@/components/input/CicTextbox';
    import GameModel from '@/models/GameModel';
    import SkillModel from '@/models/SkillModel';

    export default {
        name: 'EditSkill',
        components: {
            CicSelect,
            CicTextbox,
        },
        props: {
            game: {
                type: GameModel,
                required: true,
            },
            item: {
                type: SkillModel,
                required: true,
            },
        },
    };
</script>
