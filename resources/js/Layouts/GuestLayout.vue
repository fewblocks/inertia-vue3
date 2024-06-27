<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
</script>

<template>
    <div
        class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100"
    >
        <button id="button" aria-describedby="tooltip">My button</button>
        <div id="tooltip" role="tooltip">My tooltip</div>

        <!-- トースト -->
        <button type="button" class="btn btn-primary" id="liveToastBtn">
            Show live toast
        </button>

        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div
                id="liveToast"
                class="toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div class="toast-header">
                    <img src="..." class="rounded me-2" alt="..." />
                    <strong class="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="toast-body">
                    Hello, world! This is a toast message.
                </div>
            </div>
        </div>
        <!-- トースト -->

        <div>
            <Link href="/">
                <ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
            </Link>
        </div>

        <div
            class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
        >
            <slot />
        </div>
    </div>
</template>
