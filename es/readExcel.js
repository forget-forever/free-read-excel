import * as XLSX from 'xlsx';
/**
 * 解析excel文件
 * @param file 文件
 * @param fieldMap 字段映射表, map的建会去做正则匹配，未匹配上的，不会出现在结果中
 * @returns 读取到的excel文件
 */
const readExcel = (file, fieldMap, type) => {
    if (!file) {
        return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = event => {
            var _a;
            try {
                // 以二进制流方式读取得到整份excel表格对象
                const workbook = XLSX.read((_a = event.target) === null || _a === void 0 ? void 0 : _a.result, { type: type || 'binary' });
                if (!workbook.SheetNames.length) {
                    reject(Error('文件内容不正确！'));
                    return;
                }
                // debugger
                const result = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
                if (!result.length) {
                    resolve([]);
                    return;
                }
                const rowFields = Object.keys(result[0]);
                const targetKeys = Object.keys(fieldMap || {});
                const fields = rowFields.reduce((pre, cur) => {
                    let resKey = '';
                    targetKeys.forEach((ele) => {
                        const reg = new RegExp(ele);
                        if (reg.test(cur)) {
                            resKey = (fieldMap === null || fieldMap === void 0 ? void 0 : fieldMap[ele]) || '';
                        }
                    });
                    return Object.assign(pre, { [cur]: resKey });
                }, {});
                // 读取表格中导入的值
                const values = result.map(item => {
                    return Object.keys(item).reduce((acc, cur) => {
                        if (fields[cur]) {
                            return Object.assign(Object.assign({}, acc), { [fields[cur]]: item[cur] });
                        }
                        return acc;
                    }, {});
                });
                resolve(values);
            }
            catch (e) {
                console.error(e);
                // 这里可以抛出文件类型错误不正确的相关提示
                reject(Error('文件类型不正确！'));
            }
        };
        // 以二进制方式打开文件
        fileReader.readAsBinaryString(file);
    });
};
export default readExcel;
