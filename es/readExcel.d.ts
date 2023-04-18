/**
 * 解析excel文件
 * @param file 文件
 * @param fieldMap 字段映射表, map的建会去做正则匹配，未匹配上的，不会出现在结果中
 * @returns 读取到的excel文件
 */
declare const readExcel: <Target extends Record<string, string | number>>(file?: Blob, fieldMap?: Record<string, keyof Target> | undefined) => Promise<Target[]>;
export default readExcel;
