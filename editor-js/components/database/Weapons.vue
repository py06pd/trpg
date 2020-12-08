<template>
    <div>
        <ul class="cic-container">
            <li class="cic-header">
                <span class="cic-header-title">{{ $t('Weapons') }}</span>
                <span
                    id="add_button"
                    :title="$t('Add Weapon')"
                    class="cic-header-add"
                    @click="evt => openPopup(-1, evt)"
                >
                </span>
            </li>
            <li>
                <div class="table-filter">
                    <cic-select
                        v-model="filter"
                        :options="game.getWeaponTypes().map(x => { return { value: x, label: x }; })"
                        :placeholder="$t('Please select...')"
                        clearable
                    />
                </div>
                <table id="weapons_table" class="cic-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>{{ $t('Name') }}</th>
                            <th>{{ $t('Type') }}</th>
                            <th class="td-checkbox"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, index) in game.getWeapons().filter(x => !filter || filter === x.getGearType())"
                            :key="index"
                            :class="{ 'selected': selectedItem && selectedItem.getName() === item.getName() }"
                            @click="evt => openPopup(item.getId(), evt)"
                        >
                            <td style="padding: 0 5px; width: 28px">
                                <icon-select
                                    :value="item.getIcon()"
                                    :enabled="false"
                                    :size="28"
                                />
                            </td>
                            <td class="primary">
                                {{ item.getName() }}
                            </td>
                            <td>{{ item.getGearType() }}</td>
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
        <edit-weapon
            v-if="selectedItem"
            :item="selectedItem"
            :game="game"
            @blur="closePopup"
        />
    </div>
</template>

<script>
    import { Button } from 'element-ui';
    import EditWeapon from '@/components/database/EditWeapon';
    import CicCheckbox from '@/components/input/CicCheckbox';
    import CicSelect from '@/components/input/CicSelect';
    import IconSelect from '@/components/input/IconSelect';
    import TableUtils from '@/mixins/TableUtils';
    import ItemModel from '@/models/ItemModel';
    import GameModel from '@/models/GameModel';

    export default {
        name: 'Characters',
        components: {
            CicCheckbox,
            CicSelect,
            EditWeapon,
            IconSelect,
            'el-button': Button,
        },
        mixins: [TableUtils],
        props: {
            game: {
                type: GameModel,
                required: true,
            },
        },
        data () {
            return { filter: null };
        },
        methods: {
            deleteItems () {
                this.game.removeWeapons(this.selected);
                this.selected = [];
            },

            openPopup (itemId, evt) {
                if (itemId === -1 || evt.target.classList.length === 0 || !evt.target.classList.contains('checkbox')) {
                    if (itemId !== -1) {
                        this.selectedItem = this.game.getWeapons().find(x => x.getId() === itemId);
                    } else {
                        this.selectedItem = new ItemModel();
                        this.game.addWeapon(this.selectedItem);
                    }
                }
            },
        },
    };
</script>
