/*********************************************************************
 * Created by deming-su on 2018/5/3
 *********************************************************************/
 

<template>
    <div class="home-container">
        <div class="container">
            <div class="body">
                <span ref="containerNode" class="tree-find-list-container"></span>
            </div>
            <div class="footer">
                <i class="btn" v-html="pause ? `&#xe6a7;` : `&#xe961;`" @click="playEvent"></i>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import { findItemInTree } from "../../util/tool";

    @Component
    export default class extends Vue {
        /**
         * 页面参数释义
         * @param pause                    暂停状态对象
         */
        private pause: boolean = false;

        private mounted(): void {
            this.$nextTick(() => {
                let cacheData = JSON.parse(sessionStorage.getItem('menus') || '[]');
                let obj = {id: "chapter01&two&one",
                    name: "第一小节",
                    link: "",
                    icon: "&#xe600;",
                    active: "&#xe638;"};
                let test = findItemInTree(obj, cacheData);
                let text = "";
                for(let item of test) {
                    text += `<span>${JSON.stringify(item)}</span>`
                }
                (this.$refs.containerNode as HTMLSpanElement).innerHTML = text;
            });
        }

        /* 开始、暂停点击事件 */
        private playEvent(): void {
            this.pause = !this.pause;
        }
    }
</script>