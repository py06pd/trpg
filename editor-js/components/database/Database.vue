<template>
    <div>
        <div id="menu" class="menu">
            <ul>
                <li
                    v-for="item in ['characters', 'jobs', 'weapons', 'armours', 'items', 'skills']"
                    :key="item"
                    :class="{ 'selected' : selected === item }"
                    @click="selected = item"
                >
                    {{ item }}
                </li>
            </ul>
        </div>
        <div id="content" class="content">
            <characters v-if="selected === 'characters'" :game="game" />
            <jobs v-else-if="selected === 'jobs'" :game="game" />
            <weapons v-else-if="selected === 'weapons'" :game="game" />
            <armours v-else-if="selected === 'armours'" :game="game" />
            <items v-else-if="selected === 'items'" :game="game" />
            <skills v-else-if="selected === 'skills'" :game="game" />
        </div>
    </div>
</template>

<script>
    import Armours from '@/components/database/Armours';
    import Characters from '@/components/database/Characters';
    import Items from '@/components/database/Items';
    import Jobs from '@/components/database/Jobs';
    import Skills from '@/components/database/Skills';
    import Weapons from '@/components/database/Weapons';
    import GameModel from '@/models/GameModel';

    export default {
        name: 'Database',
        components: {
            Armours,
            Characters,
            Items,
            Jobs,
            Skills,
            Weapons,
        },
        props: {
            game: {
                type: GameModel,
                required: true,
            },
        },
        data () {
            return {
                selected: null,
            };
        },
    };
</script>
