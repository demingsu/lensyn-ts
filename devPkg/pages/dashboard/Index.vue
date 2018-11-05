/*********************************************************************
* Created by deming-su on 2018/5/3                                   
 *********************************************************************/
 

<template>
    <div>
        <h1>This is dashboard page... ...</h1>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class extends Vue {
        /**
         * 页面参数释义
         */


        private created(): void {
            console.log('initial success... ....');
        }
    }
</script>