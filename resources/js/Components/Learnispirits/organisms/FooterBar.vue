<!-- @v overview: フッターバー -->
<script setup lang="ts"></script>
<template>
    <div class="footer-bar">
        <p class="text-muted"><slot name="userName"></slot></p>
        <p class="text-muted"><slot name="address"></slot></p>
    </div>
</template>

<style lang="scss" scoped>
.footer-bar {
    max-width: 1280px;
}
</style>
