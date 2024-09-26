<script setup>
import characterIcon from '~/sample_character_icon.png'
</script>

<template>
    <div class="character-icon-wrapper">
        <img :src="characterIcon" class="character-icon img-fluid" alt="キャラクター画像" />
    </div>
</template>

<style lang="scss" scoped>
.character-icon-wrapper {
    max-width: 1280px;

    margin-top: auto;
    min-width: 200px;
    min-height: 150px;
    .character-icon {
        background-color: red;
        max-width: 100%;
        height: auto;
    }
}
</style>
