/**
 * 本地构建
 */
import { spawn } from 'child_process'
import k from 'kleur'
import { workspace } from './workspace.mjs'
import { readFileSync } from 'fs'
import process from 'process'

const { targetDirs } = workspace

/**
 * 获取待构建任务
 * @returns
 */
const getBuildTask = () => {
  const totalBuildTasks = targetDirs
  let _tasks = totalBuildTasks.filter((arg) => {
    return process.argv
      .map((arg) => arg.toLowerCase())
      .includes(arg.name.toLowerCase())
  })

  return _tasks
}

const runScript = (scriptName, pkgLocation, args = '') => {
  const pkgJson = JSON.parse(
    readFileSync(`${pkgLocation}/package.json`, 'utf-8')
  )
  if (pkgJson.scripts && pkgJson.scripts[scriptName]) {
    spawn('npm', ['run', scriptName, ...args], {
      stdio: 'inherit',
      cwd: pkgLocation,
    })
  }
}

;(() => {
  const buildTasks = getBuildTask()
  if (buildTasks.length === 0) {
    console.log(
      k.bold().red('构建失败，构建任务为空！请尝试执行：') +
        k.green('npm run build:dev')
    )
    return
  }

  buildTasks.forEach((taskInfo) => {
    console.log(k.blue(`[${taskInfo.name}] ${k.green('正在构建中...')}`))
    if (taskInfo.name === 'playground') {
      runScript('buildWeb', taskInfo.location)
    } else {
      runScript('build', taskInfo.location)
    }
  })
})()
