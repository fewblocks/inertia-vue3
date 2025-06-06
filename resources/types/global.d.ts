declare module '*.png' {
    const value: string
    export default value
}

declare module '*.svg' {
    const value: string
    export default value
}

declare module '*.json' {
    const value: string
    export default value
}

declare module '*.scss' {
    const value: string
    export default value
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
