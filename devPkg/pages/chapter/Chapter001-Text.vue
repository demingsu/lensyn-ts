/*********************************************************************
 * Created by deming-su on 2018/5/3
 *********************************************************************/
 

<template>
    <div class="home-container">
        <div class="container">
            <div class="body" ref="containerNode">This is chapter001 text container... ...</div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class extends Vue {
        /**
         * 页面参数释义
         */


        private mounted(): void {
            this.$nextTick(() => {

            });
        }
    }
</script>