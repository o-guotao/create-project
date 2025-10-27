import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import cleaner from 'rollup-plugin-cleaner';
import { globSync } from 'glob';


const hookEntries = globSync('src/use*/index.ts').reduce((entries, file) => {
    const name = file.split('/')[1]
    entries[`${name}/index`] = file
    return entries;
}, {} as Record<string, string>)


export default [
    {
        // js
        input: {
            index: 'src/index.ts', //统一入口
            ...hookEntries //分入口
        },
        output: [
            {
                dir: 'lib',
                format: 'cjs',
                exports: 'named',
                preserveModules: true, // 保持目录结构 按需加载
                preserveModulesRoot: 'src', // 保持目录结构
                entryFileNames: '[name].js',
                sourcemap: true
            },
            {
                dir: 'es',
                format: 'esm',
                preserveModules: true, // 保持目录结构 按需加载
                preserveModulesRoot: 'src', // 保持目录结构
                entryFileNames: '[name].js',
                sourcemap: true
            }
        ],
        plugins: [
            cleaner({
                targets: ['./lib', './es']
            }),
            resolve(), // 引入第三方模块
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: false,
                sourceMap: true
            }),
            terser(), // 压缩
        ],
        external: ['react', 'react-dom']
    },
    {
        // d.ts
        input: {
            index: 'src/index.ts', //统一入口
            ...hookEntries //分入口
        },
        output: [
            {
                dir: 'lib',
                entryFileNames: '[name].d.ts',
                format: 'esm',
                preserveModules: true,
            }
        ],
        plugins: [
            dts()
        ]
    }, 
    {
        input: 'src/index.ts',
        output: [
            {
                dir: 'dist',
                format: 'umd',
                name: 'gtHooks',
                sourcemap: true,
                globals:{
                    react: 'React',
                }
            }
        ],
        plugins: [
            resolve(), // 引入第三方模块
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: false,
                sourceMap: true
            }),
            terser(), // 压缩
        ],
        external: ['react', 'react-dom']
    }
]