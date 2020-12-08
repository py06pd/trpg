<template>
    <div id="actorInfo" class="menu-panel">
        <div :class="'profile profile' + character.getFace()" />
        <div>
            <div style="font-weight: bold">{{ character.getLabel() }}</div>
            <div>{{ character.getJob().getLabel() }}</div>
            <table>
                <tr><td>Lv</td><td>{{ character.getAttribute('level').getValue() }}</td></tr>
                <tr><td>HP</td><td>{{ character.getAttribute('hp').getValue() }}/{{ character.getAttribute('hp').getMax() }}</td></tr>
                <tr><td>TP</td><td>{{ character.getAttribute('tp').getValue() }}/{{ character.getAttribute('tp').getMax() }}</td></tr>
            </table>
        </div>
    </div>
</template>

<script>
import Character from '../../model/character';

export default {
    name: 'InfoPanel',
    props: {
        character: {
            type: Character,
            required: true,
        },
    },
};
</script>
