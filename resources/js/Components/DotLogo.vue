<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import '@/CharactorSCSS/1_.scss'
import '@/CharactorSCSS/2_.scss'
import '@/CharactorSCSS/5_.scss'
import '@/CharactorSCSS/8_.scss'
import '@/CharactorSCSS/11_.scss'
import '@/CharactorSCSS/95_.scss'
import '@/CharactorSCSS/106_.scss'
import '@/CharactorSCSS/140_.scss'
import '@/CharactorSCSS/145_.scss'
import '@/CharactorSCSS/165_.scss'
const props = defineProps({
    styleType: {
        type: Number,
        default: 1
    },
    characterId: {
        type: Number,
        default: '1'
    }
})

const styleClass = computed(() => ({
    'style-1': props.characterId === 1,
    'style-2': props.characterId === 2,
    'style-5': props.characterId === 5,
    'style-8': props.characterId === 8,
    'style-11': props.characterId === 11,
    'style-95': props.characterId === 95,
    'style-106': props.characterId === 106,
    'style-140': props.characterId === 140,
    'style-145': props.characterId === 145,
    'style-165': props.characterId === 165
}))
</script>
<template>
    <div :class="[styleClass, 'character']">
        <div class="character-icon-wrapper">
            <div class="dot"></div>
        </div>
        <div class="copyright">©荒木飛呂彦／集英社</div>
    </div>
</template>

<style lang="scss" scoped>
.character {
    // 共通のスタイル
    .copyright {
        bottom: -10px;
        position: relative;
        font-weight: bold;
        font-size: 10px;
    }
    .character-icon-wrapper {
        width: 256px;
        height: 256px;
        align-items: center; // 追加
        border: solid 1px #000;
        border-radius: 5%;
        overflow: hidden;
        padding-right: 0px;
        padding-left: 0px;
        padding-top: 0px;
    }

    .dot {
        max-width: 100%;
        height: auto;
        transform: scale(1); // デフォルトサイズ
        transform-origin: top left; // 変形の基準点を設定
        position: absolute;
    }

    // メディアクエリは小さい画面から順に記述
    @media screen and (max-width: 480px) {
        .character-icon-wrapper {
            width: calc(256px * 0.5);
            height: calc(256px * 0.5);
        }
        .copyright,
        .character-icon-wrapper {
            margin-left: 10px;
        }
        .dot {
            transform: scale(0.5);
            transform-origin: top left;
            position: relative;
        }
    }

    @media screen and (min-width: 481px) and (max-width: 768px) {
        .character-icon-wrapper {
            width: calc(256px * 0.6);
            height: calc(256px * 0.6);
        }
        .copyright,
        .character-icon-wrapper {
            margin-left: 32px;
        }
        .dot {
            transform: scale(0.6);
            transform-origin: top left;
            position: relative;
        }
    }

    @media screen and (min-width: 769px) and (max-width: 1199px) {
        .character-icon-wrapper {
            width: calc(256px * 0.75);
            height: calc(256px * 0.75);
        }
        .copyright,
        .character-icon-wrapper {
            margin-left: 64px;
        }
        .dot {
            transform: scale(0.75);
            transform-origin: top left;
            position: relative;
        }
    }

    @media screen and (min-width: 1200px) {
        .dot,
        .character-icon-wrapper {
            transform: scale(1);
        }
    }
}
</style>
