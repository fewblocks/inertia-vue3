import './bootstrap'
import 'bootstrap'
import '../css/app.css'
import 'bootstrap/dist/css/bootstrap.css'

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m'
import NavigationLayout from '../../resources/js/Layouts/NavigationLayout.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFile as faFileSolid } from '@fortawesome/free-solid-svg-icons'
import { faFile as faFileRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LearnispiritsAphorism from './Pages/Auth/LearnispiritsAphorism.vue'
library.add(faHeartSolid)
library.add(faHeartRegular)
library.add(faFileSolid)
library.add(faFileRegular)
library.add(faStarSolid)
library.add(faStarRegular)

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'
const title = 'Learnispirits'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue')
            // テンプレート設定はここでできる。
        ).then((page) => {
            // page.default.layout = name.startsWith("Auth/Register2")
            //     ? SampleLayout
            //     : undefined;
            console.log(name)
            page.default.layout =
                name.startsWith('Auth/LearnispiritsTop') ||
                name.startsWith('Auth/LearnispiritsAphorism') ||
                name.startsWith('Auth/LearnispiritsLineQuiz')
                    ? NavigationLayout
                    : undefined
            return page
        }),
    setup({ el, App, props, plugin }) {
        return (
            createApp({ render: () => h(App, props) })
                .component('font-awesome-icon', FontAwesomeIcon)
                .use(plugin)
                .use(ZiggyVue, Ziggy)
                // .use(bootstrap)
                .mount(el)
        )
    },
    progress: {
        color: '#4B5563'
    }
})
