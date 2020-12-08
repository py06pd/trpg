<template>
    <div>
        <ul class="cic-container">
            <li class="cic-header">
                <span class="cic-header-title">{{ $t('Characters') }}</span>
                <span
                    id="add_button"
                    :title="$t('Add Character')"
                    class="cic-header-add"
                    @click="evt => openPopup(-1, evt)"
                >
                </span>
            </li>
            <li>
                <table id="characters_table" class="cic-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>{{ $t('Name') }}</th>
                            <th>{{ $t('Job') }}</th>
                            <th class="td-checkbox"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, index) in game.getCharacters()"
                            :key="index"
                            :class="{ 'selected': selectedItem && selectedItem.getName() === item.getName() }"
                            @click="evt => openPopup(item.getId(), evt)"
                        >
                            <td style="padding: 0 5px; width: 28px">
                                <face-select
                                    :value="item.getFace()"
                                    :enabled="false"
                                    :size="28"
                                />
                            </td>
                            <td class="primary">
                                {{ item.getName() }}
                            </td>
                            <td>{{ game.getJobs().find(x => x.getId() === item.getJob()).getName() }}</td>
                            <td>
                                <cic-checkbox :value="selected.includes(item.getId())" @click="handleSelected(item.getId())" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </li>
            <li class="cic-footer">
                <el-button
                    v-if="selected.length"
                    id="delete_button"
                    @click="deleteItems"
                >
                    {{ $t('Delete selected') }}
                </el-button>
            </li>
        </ul>
        <edit-character
            v-if="selectedItem"
            :item="selectedItem"
            :game="game"
            @blur="closePopup"
        />
    </div>
</template>

<script>
    import { Button } from 'element-ui';
    import EditCharacter from '@/components/database/EditCharacter';
    import CicCheckbox from '@/components/input/CicCheckbox';
    import FaceSelect from '@/components/input/FaceSelect';
    import TableUtils from '@/mixins/TableUtils';
    import CharacterModel from '@/models/CharacterModel';
    import GameModel from '@/models/GameModel';

    export default {
        name: 'Characters',
        components: {
            FaceSelect,
            CicCheckbox,
            EditCharacter,
            'el-button': Button,
        },
        mixins: [TableUtils],
        props: {
            game: {
                type: GameModel,
                required: true,
            },
        },
        methods: {
            deleteItems () {
                this.game.removeCharacters(this.selected);
                this.selected = [];
            },

            openPopup (itemId, evt) {
                if (itemId === -1 || evt.target.classList.length === 0 || !evt.target.classList.contains('checkbox')) {
                    if (itemId !== -1) {
                        this.selectedItem = this.game.getCharacters().find(x => x.getId() === itemId);
                    } else {
                        this.selectedItem = new CharacterModel();
                        this.game.addCharacter(this.selectedItem);
                    }
                }
            },
        },
    };
</script>
