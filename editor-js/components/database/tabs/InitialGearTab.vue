<template>
    <ul id="equip_slots">
        <li v-for="slot in game.getEquipSlots()" :key="slot">
            <span>{{ $t(slot + '_label') }}</span>
            <cic-select
                v-if="['hand1', 'hand2'].includes(slot)"
                :value="item.getGear(slot)"
                :options="game.getGear(slot).filter(x => typeSource.getWeaponTypes().includes(x.getGearType())).map(x => { return { value: x.getId(), label: x.getName() }; })"
                :placeholder="$t('Please select...')"
                clearable
                @change="val => item.setGear(slot, val)"
            />
            <cic-select
                v-else
                :value="item.getGear(slot)"
                :options="game.getGear(slot).filter(x => typeSource.getArmourTypes().includes(x.getGearType())).map(x => { return { value: x.getId(), label: x.getName() }; })"
                :placeholder="$t('Please select...')"
                clearable
                @change="val => item.setGear(slot, val)"
            />
        </li>
    </ul>
</template>

<script>
    import CicSelect from '@/components/input/CicSelect';
    import CharacterModel from '@/models/CharacterModel';
    import GameModel from '@/models/GameModel';
    import JobModel from '@/models/JobModel';

    export default {
        name: 'InitialGearTab',
        components: {
            CicSelect,
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
            typeSource: {
                type: JobModel,
                required: true,
            },
        },
    };
</script>
