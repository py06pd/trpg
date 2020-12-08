<template>
    <ul>
        <li class="form-label">
            {{ $t('Sprite') }}
        </li>
        <li><sprite-select :value="item.getSprite()" @input="val => item.setSprite(val)" /></li>
        <li class="form-label">
            {{ $t('Face') }}
        </li>
        <li><face-select :value="item.getFace()" @input="val => item.setFace(val)" /></li>
    </ul>
</template>

<script>
    import FaceSelect from '@/components/input/FaceSelect';
    import SpriteSelect from '@/components/input/SpriteSelect';
    import CharacterModel from '@/models/CharacterModel';

    export default {
        name: 'GraphicsTab',
        components: {
            FaceSelect,
            SpriteSelect,
        },
        props: {
            item: {
                type: CharacterModel,
                required: true,
            },
        },
    };
</script>
