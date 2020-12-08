<template>
    <div>
        <ul class="cic-container">
            <li class="cic-header">
                <span class="cic-header-title">{{ $t('Jobs') }}</span>
                <span
                    id="add_button"
                    :title="$t('Add Job')"
                    class="cic-header-add"
                    @click="evt => openPopup(-1, evt)"
                >
                </span>
            </li>
            <li>
                <table id="jobs_table" class="cic-table">
                    <thead>
                        <tr>
                            <th>{{ $t('Name') }}</th>
                            <th>{{ $t('Skill Name') }}</th>
                            <th>{{ $t('Promotions') }}</th>
                            <th class="td-checkbox"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, index) in game.getJobs()"
                            :key="index"
                            :class="{ 'selected': selectedItem && selectedItem.getName() === item.getName() }"
                            @click="evt => openPopup(item.getId(), evt)"
                        >
                            <td class="primary">
                                {{ item.getName() }}
                            </td>
                            <td>{{ item.getSkill() }}</td>
                            <td>{{ item.getPromotions().map(x => game.getJobs().find(y => y.getId() === x).getName()).join(', ') }}</td>
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
        <edit-job
            v-if="selectedItem"
            :item="selectedItem"
            :game="game"
            @blur="closePopup"
        />
    </div>
</template>

<script>
    import { Button } from 'element-ui';
    import EditJob from '@/components/database/EditJob';
    import CicCheckbox from '@/components/input/CicCheckbox';
    import TableUtils from '@/mixins/TableUtils';
    import JobModel from '@/models/JobModel';
    import GameModel from '@/models/GameModel';

    export default {
        name: 'Characters',
        components: {
            CicCheckbox,
            EditJob,
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
                this.game.removeJobs(this.selected);
                this.selected = [];
            },

            openPopup (itemId, evt) {
                if (itemId === -1 || evt.target.classList.length === 0 || !evt.target.classList.contains('checkbox')) {
                    if (itemId !== -1) {
                        this.selectedItem = this.game.getJobs().find(x => x.getId() === itemId);
                    } else {
                        this.selectedItem = new JobModel();
                        this.game.addJob(this.selectedItem);
                    }
                }
            },
        },
    };
</script>
