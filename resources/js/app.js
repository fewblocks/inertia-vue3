import "./bootstrap";
import "bootstrap";
import "../css/app.css";
import "bootstrap/dist/css/bootstrap.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/vue.m";
import NavigationLayout from "../../resources/js/Layouts/NavigationLayout.vue";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
            // テンプレート設定はここでできる。
        ).then((page) => {
            // page.default.layout = name.startsWith("Auth/Register2")
            //     ? SampleLayout
            //     : undefined;
            console.log(name);
            page.default.layout = name.startsWith("Auth/LearnispiritsTop")
                ? NavigationLayout
                : undefined;
            return page;
        }),
    setup({ el, App, props, plugin }) {
        return (
            createApp({ render: () => h(App, props) })
                .use(plugin)
                .use(ZiggyVue, Ziggy)
                // .use(bootstrap)
                .mount(el)
        );
    },
    progress: {
        color: "#4B5563",
    },
});
