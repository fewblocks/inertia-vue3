<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
import { onMounted } from "vue";
import { Toast } from "bootstrap";
import testImageSrc from "~/test-image.png";

onMounted(() => {
    // トースト

    const toastTrigger = document.getElementById("liveToastBtn");
    const toastLiveExample = document.getElementById("liveToast");

    if (toastTrigger) {
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastTrigger.addEventListener("click", () => {
            toastBootstrap.show();
        });
    }

    // トースト
});
</script>

<template>
    <div
        class="tw-min-h-screen tw-flex tw-flex-col sm:tw-justify-center tw-items-center tw-pt-6 sm:tw-pt-0 tw-bg-gray-100"
    >
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
                    <img :src="testImageSrc" class="rounded me-2" alt="..." />
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
                <ApplicationLogo
                    class="tw-w-20 tw-h-20 tw-fill-current tw-text-gray-500"
                />
            </Link>
        </div>

        <div
            class="tw-w-full sm:tw-max-w-md tw-mt-6 tw-px-6 tw-py-4 tw-bg-white tw-shadow-md tw-overflow-hidden sm:tw-rounded-lg"
        >
            <slot />
        </div>
    </div>
</template>
