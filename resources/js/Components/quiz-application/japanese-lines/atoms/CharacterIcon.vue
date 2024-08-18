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
    display: flex;
    justify-content: center;
    max-width: 1280px;
    margin: 0 auto;
    .character-icon {
        background-color: red;
        max-width: 100%;
        height: auto;
    }
}
</style>
