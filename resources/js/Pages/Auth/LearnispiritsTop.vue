<script setup>
import WordCloudVisual from '@/Components/Learnispirits/organisms/WordCloudVisual.vue'
import NewsContent from '@/Components/Learnispirits/organisms/NewsContent.vue'
import RelatedSite from '@/Components/Learnispirits/organisms/RelatedSite.vue'
import FlipCardDemo from '@/Components/flip-card/FlipCardDemo.vue'
</script>

<!-- トップページ -->

<template>
    <main class="col-sm-12 col-md-9">
        <!-- ワードクラウド -->
        <section>
            <WordCloudVisual />
        </section>
        <!-- フリップカードのデモヴィジュアル -->
        <section>
            <FlipCardDemo />
        </section>
        <!-- ニュースコンテンツ -->
        <section>
            <NewsContent />
        </section>
        <!-- 姉妹サイト情報 -->
        <section>
            <RelatedSite />
        </section>
    </main>
    <!-- 広告コンテンツ -->
    <aside class="col-sm-12 col-md-3">aside-content</aside>
</template>

<style lang="scss" scoped>
aside {
    background-color: $sunglow;
}
</style>
