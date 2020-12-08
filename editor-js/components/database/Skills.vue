<template>
    <div>
        <ul class="cic-container">
            <li class="cic-header">
                <span class="cic-header-title">{{ $t('Skills') }}</span>
                <span
                    id="add_button"
                    :title="$t('Add Skill')"
                    class="cic-header-add"
                    @click="evt => openPopup(-1, evt)"
                >
                </span>
            </li>
            <li>
                <div class="table-filter">
                    <cic-select
                        v-model="filter"
                        :options="['Passive'].concat(game.getJobs().map(job => job.getSkill()).filter((skill, index, self) => self.indexOf(skill) === index)).map(x => { return { value: x, label: x }; })"
                        :placeholder="$t('Please select...')"
                        clearable
                    />
                </div>
                <table id="skills_table" class="cic-table">
                    <thead>
                        <tr>
                            <th>{{ $t('Name') }}</th>
                            <th class="td-checkbox"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, index) in game.getSkills().filter(x => !filter || filter === x.getGearType())"
                            :key="index"
                            :class="{ 'selected': selectedItem && selectedItem.getName() === item.getName() }"
                            @click="evt => openPopup(item.getId(), evt)"
                        >
                            <td class="primary">
                                {{ item.getName() }}
                            </td>
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
        <edit-skill
            v-if="selectedItem"
            :item="selectedItem"
            :game="game"
            @blur="closePopup"
        />
    </div>
</template>

<script>
    import { Button } from 'element-ui';
    import EditSkill from '@/components/database/EditSkill';
    import CicCheckbox from '@/components/input/CicCheckbox';
    import CicSelect from '@/components/input/CicSelect';
    import TableUtils from '@/mixins/TableUtils';
    import GameModel from '@/models/GameModel';
    import SkillModel from '@/models/SkillModel';

    export default {
        name: 'Characters',
        components: {
            CicCheckbox,
            CicSelect,
            EditSkill,
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
                this.game.removeSkills(this.selected);
                this.selected = [];
            },

            openPopup (itemId, evt) {
                if (itemId === -1 || evt.target.classList.length === 0 || !evt.target.classList.contains('checkbox')) {
                    if (itemId !== -1) {
                        this.selectedItem = this.game.getSkills().find(x => x.getId() === itemId);
                    } else {
                        this.selectedItem = new SkillModel();
                        this.game.addSkill(this.selectedItem);
                    }
                }
            },
        },
    };
</script>
