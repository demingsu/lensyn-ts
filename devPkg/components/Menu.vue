/*********************************************************************
* Vue private menu file
* Created by deming-su on 2017/12/30
*********************************************************************/

<script type="text/javascript" lang="ts">
    import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";
    import { VNode, CreateElement } from "vue";

    @Component
    export default class Menu extends Vue {
        /**
         * 页面参数定义
         * @define menuData 页面树菜单
         */
        private menuData: any[] = [];

        /* menu树数据对象 */
        @Prop({type: Array, required: true})
        private menuList: any[];
        /* 观察树数据对象是否发生变化 */
        @Watch("menuList")
        private onMenuListChange(val: any[]) {
            this.menuData = val;
        }
        /* 商标对象 */
        @Prop({type: String, default: 'THREE-JS'})
        private brand: string;
        /* menu树点击事件 */
        @Emit('menuEvent')
        private menuEvent(d: any) {};
        /* 是否收起菜单 */
        @Prop({type: Boolean, default: false})
        private menuCollapse: boolean;
        /* 是否自动收起其它展开项 */
        @Prop({type: Boolean, default: false})
        private autoCollapse: boolean;

        private created() {
            /* 初始化menu数据 */
            this.menuData = this.menuList;
        }

        /**
         * 虚拟DOM渲染方法
         * 创建页面挂载主节点
         * 创建商标位置数据，图标用样式修改，文字传递过来
         * 创建树的容器
         */
        private render(createElement: CreateElement): VNode {
            /* 创建子节点 */
            let nodes = this.assembleNodes(createElement, this.menuData);
            /* 创建主节点并添加子节点 */
            return createElement('div', {
                'class': {
                    'menu-container': true,
                    'menu-collapse': this.menuCollapse
                },
                ref: 'menuTreeList'
            }, [createElement('div', {
                'class': {
                    'brand': true
                },
                on: {
                    click: () => {
                        this.menuEvent({type: 'brandClick'});
                    }
                }
            }, [
                createElement('i', {}, ''),
                createElement('span', {}, this.brand)
            ] as any),
                createElement('div', {
                'class': { 'box': true }
            }, nodes)] as any);
        }

        /**
         * 递归创建DOM节点及数据节点重组
         * @param createElement           创建VNode方法
         * @param list                    树结构数据
         * @param layer                   树结构当前层级用于树的padding-left值设置
         * @param pIds                    树结构当前节点所有父节点及本身的id拼接字符串
         */
        private assembleNodes(createElement: CreateElement, list: any[], layer = 0, pIds = ""): any {
            layer ++;
            let nodes: any[] = [];
            for(let i = 0;i < list.length;i ++) {
                /* 子节点数组对象 */
                let cn = [];
                /* 是否有子节点 */
                let hasChild: boolean = !!list[i].children && list[i].children.length > 0;
                /* 当前所有父节点字符串 */
                let pKey: string = pIds === "" ? list[i].id : `${pIds}&&&${list[i].id}`;
                /* 子节点DOM容器 */
                let cNode: any = '';
                /* 是否已经把侧边栏收起，如果已经收起需要设置除第一层子节点不可以显示，并且添加绝对定位样式 */
                let isCollapse = layer === 1 && this.menuCollapse;
                if(hasChild) {
                    /* 递归创建子节点数据 */
                    cn = this.assembleNodes(createElement, list[i].children, layer, pKey);
                    /* 创建子节点容器 */
                    cNode = createElement('div', {
                        'class': {
                            'children-box': true,
                            'active': list[i].checked,
                            'collapse-box': isCollapse
                        }
                    }, cn);
                }
                /* 创建单个节点，节点显示标签和添加子节点 */
                nodes.push(createElement('div', {'class': {'item': true}}, [
                    /**
                     * 显示标签
                     * 选中状态只有在没有子节点且选中才会添加active样式
                     * 第二个节点及一下节点的背景色与第一级不一样
                     * 收起图标样式时第一层图标及大小样式‘collapse-label’
                     * parentKey 所有父节点的id连接字符串
                     * 添加点击事件
                     * 如果是展开第一层需要显示名字，否则不现实名字
                     * 选中图标需要切换为active
                     * 如果是有子节点则显示尖角符号
                     */
                    createElement('span', {
                        'class': {
                            'item-label': true,
                            'child-bg': layer > 1,
                            'active': !hasChild && list[i].checked,
                            'collapse-label': isCollapse
                        },
                        attrs: {
                            'parentKey': pKey
                        },
                        style: {
                            'padding-left': `${layer*15}px`
                        },
                        on: {
                            click: (evt: Event) => {
                                this.clickEvent(evt, list[i]);
                            }
                        }
                    }, [
                        isCollapse ? '' : list[i].name,
                        (isCollapse || !hasChild) ? createElement('i', {
                            'class': {
                                'item-label-icon': true
                            },
                            domProps: {
                                innerHTML: list[i].checked ? list[i].active : list[i].icon
                            },
                            style: {
                                'left': `${layer*15}px`
                            }
                        }, '') : createElement('i', {
                            'class': {
                                'item-label-expand': true,
                                'active': list[i].checked
                            },
                            domProps: {
                                innerHTML: '&#xe60a;'
                            },
                            style: {
                                'left': `${layer*15}px`
                            }
                        }, '')
                    ]),
                    cNode
                ] as any));
            }
            return nodes;
        }

        /**
         * 标签点击事件
         * @param evt          当前点击事件源
         * @param item         当前点击数据对象
         */
        private clickEvent(evt: Event, item: any): void {
            let node = (evt.target) as any;
            if(!!node && node.tagName !== 'SPAN') {
                node = node.parentNode;
                if(!node || node.tagName !== 'SPAN') return;
            }
            /* 向外广播点击事件 */
            this.menuEvent(item);
            /* 获取到父节点字符串，进行数据重组 */
            let pIds = node.getAttribute('parentKey');
            if(!!pIds) this.assembleData(pIds.split('&&&'), item);
        }

        /* 重置选中状态 */
        protected resetActiveMenu(item: any): void {
            /* 获取到对应页面的DOM节点，遍历找到对应DOM节点并获取到pIds */
            let nodes = (this.$refs.menuTreeList as HTMLDivElement).querySelectorAll('span[parentKey]');
            for(let i = 0;i < nodes.length;i ++) {
                let attr = nodes[i].getAttribute('parentKey');
                if(!!attr) {
                    let ss = attr.split("&&&");
                    let s = ss.findIndex((oo: string) => oo === item.id);
                    /* 当前数据对象的DOM节点一定是label才可以设置选中状态 */
                    if(s === ss.length - 1) {
                        this.assembleData(ss, item);
                        break;
                    }
                }
            }
        }

        /* 重组数据对象 */
        private assembleData(ids: string[], obj: any): void {
            /* 拷贝当前数据，获取当前数据对象是否有子节点 */
            let temp = [...this.menuData];
            let curHasChild = !!obj.children && obj.children.length > 0;

            /* 递归数据方法 */
            let loopData = (list: any[], id: string[]): any[] => {
                let newList: any[] = [];
                for(let i = 0;i < list.length;i ++) {
                    /* 查询到当前遍历对象的id是否在父节点中存在 */
                    let nowIdx: number = id.findIndex((oo: any) => oo === list[i].id);
                    /* 是否是当前需要操作的数据节点 */
                    let isNode: boolean = nowIdx > -1 && nowIdx === id.length - 1;
                    /* 是否有子节点 */
                    let hasChildren = !!list[i].children && list[i].children.length > 0;
                    /**
                     * 如果当前操作对象没有子节点
                     * 则说明操作的显示对象
                     * 有子节点需要设置选中状态为非当前状态
                     */
                    if(!curHasChild) {
                        /* 设置为自动收起其它选项，则本目录所有节点展开，其它节点收起状态 */
                        if(this.autoCollapse) {
                            list[i].checked = nowIdx > -1;
                        } else {
                            /* 当前遍历节点是否有子节点，如果没有子节点的（最小叶子节点）需要去掉选中状态，设置当前选中元素（叶子节点）为选中状态 */
                            if(!hasChildren) {
                                list[i].checked = nowIdx > -1;
                            } else {
                                /* 设置父节点展开，这个用于单独设置某个节点选中 */
                                if(nowIdx > -1) list[i].checked = true;
                            }
                        }
                    } else {
                        /* 当前操作数据有子节点则表明自需要处理有子节点的对象 */
                        if(hasChildren) {
                            /* 如果是最后对象设置为非当前状态 */
                            if(isNode) {
                                list[i].checked = !list[i].checked;
                            } else {
                                /* 如果是父节点，设置为展开状态 */
                                if(nowIdx > -1) list[i].checked = true;
                            }
                        }
                    }

                    /* 添加修改后的数据到新数组中 */
                    newList.push(list[i]);

                    /* 如果当前遍历对象有子节点数据需要递归遍历 */
                    if(list[i].children && list[i].children.length > 0) {
                        list[i].children = loopData(list[i].children, id);
                    }
                }
                return newList;
            }

            this.menuData = loopData(temp, ids);
        }
    };
</script>
