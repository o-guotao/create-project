declare module 'rollup-plugin-cleaner' {
  import { Plugin } from 'rollup';

  interface CleanerOptions {
    /**
     * 要清理的目标路径数组
     */
    targets?: string[];
  }

  /**
   * Rollup 清理插件
   * @param options 清理选项
   * @returns Rollup 插件
   */
  function cleaner(options?: CleanerOptions): Plugin;

  export default cleaner;
}
