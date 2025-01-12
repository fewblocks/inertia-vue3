// globals.d.ts
import 'ziggy-js'

declare global {
    function route(name?: string, params?: any, absolute?: boolean, config?: any): any
}

export {}
