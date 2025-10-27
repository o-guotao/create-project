import { menus } from "./hooks"

export default {
    exportStatic: {},
    nodeModulesTransform: {
        type: 'none',
        exclude: []
    },
    history: {
        type: 'hash'
    },
    // 配置babel 插件
    extraBabelPlugins: [
        [
            'babel-plugin-import',
            {
                libraryName: '@alifd/next',
                style: false,
            },
            'fusion'
        ]
    ],
    mode: 'site',
    title: '自定义hooks',
    dynamicImport: {},
    manifest: {},
    hash: true,
    alias: {
        gthooks: process.cwd() + '/packages/hooks/src/index.ts'
    },
    resolve: {
        include: [
            'docs',
            'packages/hooks/src'
        ]
    },
    navs: [
        {
            title: '指南',
            path: '/guide',
        },
        {
            title: 'hooks',
            path: '/hooks',
        },
    ],
    menus: {
        '/': [
            {
                title: '首页',
                path: 'index'
            }],

        '/guide': [{
            title: '指南',
            path: '/guide'
        },
        ],
        '/hooks': menus
    }
}