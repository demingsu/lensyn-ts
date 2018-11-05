/*********************************************************************
 * page menu data file
 * Created by deming-su on 2017/12/30
 * id 为primary key；link 为路由路径；
 * icon 为正常显示字体库，active 为选中时的图标（第一级及最后一级都必须添加active字体）；
 * primary 为系统首页，系统首页不能在导航栏关闭，且一直处于存活状态；
 *********************************************************************/

const MenuData: any[] = [
    {
        id: "home",
        name: "首页",
        link: "/home",
        cls: "",
        icon: "&#xe677;",
        active: "&#xe606;",
        primary: true
    },
    {
        id: "chapter001",
        name: "章节一",
        link: "",
        icon: "&#xe63c;",
        active: "&#xe63c;",
        children: [
            {
                id: "chapter001&line",
                name: "章节一 line",
                link: "/chapter001/line",
                icon: "&#xe600;",
                active: "&#xe638;"
            },
            {
                id: "chapter01&two",
                name: "章节一&第二节",
                link: "",
                icon: "&#xe600;",
                children: [
                    {
                        id: "chapter01&two&one",
                        name: "第一小节",
                        link: "",
                        icon: "&#xe600;",
                        children: [
                            {
                                id: "chapter01&two&one&one",
                                name: "第001小节",
                                link: "",
                                icon: "&#xe600;",
                                children: [
                                    {
                                        id: "chapter001&text",
                                        name: "章节一 text",
                                        link: "/chapter001/text",
                                        icon: "&#xe600;",
                                        active: "&#xe638;"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: "chapter01&three",
                name: "章节一&第三节",
                link: "/chapter001/three",
                icon: "&#xe600;",
                active: "&#xe638;"
            }
        ]
    },
    {
        id: "chapter002",
        name: "章节二",
        link: "",
        icon: "&#xe63c;",
        active: "&#xe63c;",
        children: [
            {
                id: "chapter002&one",
                name: "章节二&第一节",
                link: "",
                icon: "&#xe600;",
                children: [
                    {
                        id: "chapter002&one&one",
                        name: "第一节之一",
                        link: "/chapter002/one/one",
                        icon: "&#xe600;",
                        active: "&#xe638;"
                    }
                ]
            },
            {
                id: "chapter002&two",
                name: "章节二&第二节",
                link: "",
                icon: "&#xe600;",
                children: [
                    {
                        id: "chapter002&two&one",
                        name: "第二节之一",
                        link: "/chapter002/two/one",
                        icon: "&#xe600;",
                        active: "&#xe638;"
                    },
                    {
                        id: "chapter002&two&two",
                        name: "第二节之二",
                        link: "/chapter002/two/two",
                        icon: "&#xe600;",
                        active: "&#xe638;",

                    }
                ]
            },
            {
                id: "chapter002&three",
                name: "章节二&第三节",
                link: "/chapter002/three",
                icon: "&#xe600;",
                active: "&#xe638;"
            }
        ]
    }
] as any[];

export default MenuData;