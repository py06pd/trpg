<template>
    <ul>
        <li class="form-item-label">
            {{ $t('Weapon Types') }}
        </li>
        <li>
            <cic-select
                :value="item.getWeaponTypes()"
                :options="game.getWeaponTypes().map(x => { return { value: x, label: x }; })"
                multiple
                @input="val => item.setWeaponTypes(val)"
            />
        </li>
        <li class="form-item-label">
            {{ $t('Armour Types') }}
        </li>
        <li>
            <cic-select
                :value="item.getArmourTypes()"
                :options="game.getArmourTypes().map(x => { return { value: x, label: x }; })"
                multiple
                @input="val => item.setArmourTypes(val)"
            />
        </li>
    </ul>
</template>

<script>
    import CicSelect from '@/components/input/CicSelect';
    import GameModel from '@/models/GameModel';
    import JobModel from '@/models/JobModel';

    export default {
        name: 'GearTypesTab',
        components: {
            CicSelect,
        },
        props: {
            game: {
                type: GameModel,
                required: true,
            },
            item: {
                type: JobModel,
                required: true,
            },
        },
    };
</script>
