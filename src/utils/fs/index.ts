import * as FS from 'fs';
import * as PATH from 'path';

const { access, constants } = FS;

/**
 * @description 文件相关操作封装
 */

/**
 * @description 判断文件或目录是否存在
 */
export const isExistDirOrFile = async (path: string) => {
  return new Promise((resolve, reject) => {
    access(path, constants.F_OK, (err) => {
      console.log('err', err, path);
      if (err) {
        reject(err);
        return;
      }

      resolve(true);
    });
  }).catch(() => {
    return false;
  });
};

/**
 * @description 创建目录
 */
export const createDir = async (path: string) => {
  const dirPath = getDir(path);
  const pathArr = pathSplit(dirPath);

  let currentPath = '';
  for (const item of pathArr) {
    currentPath += item;

    const isExist = await isExistDirOrFile(currentPath);

    if (isExist) {
      continue;
    }

    await new Promise((resolve, reject) => {
      FS.mkdir(currentPath, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  }
};

/**
 * @description 创建文件
 */
export const createFile = async (path: string) => {
  const dir = getDir(path);
  await createDir(dir);
  const filename = getFileName(path, true);
  if (!filename) return;
  const p = new Promise((resolve, reject) => {
    FS.writeFile(path, '', (err) => {
      if (err) {
        console.log('err', err);
        reject(err);
      }
      resolve(true);
    });
  });
  return p;
};

/**
 * @description 路径切割
 */
export const pathSplit = (path: string) => {
  const pathArr = path.split(PATH.delimiter);
  return pathArr;
};

/**
 * @description 获取路径中的目录
 */
export const getDir = (path: string) => {
  const parseObj = PATH.parse(path);
  const { name, ext } = parseObj;
  let { dir } = parseObj;
  if (!ext) {
    dir = PATH.resolve(dir, name);
  }
  return dir;
};

/**
 * @description 获取路径中的文件名
 */
export const getFileName = (path: string, force = false) => {
  const parseObj = PATH.parse(path);
  const { name, ext } = parseObj;
  const filename = name + ext;
  if (force) {
    return filename;
  }
  if (!ext) {
    return '';
  }

  return filename;
};

/**
 * @description 将数据写入文件
 * @param path 文件路径
 * @param data 要写入的数据
 * @param fileName 文件名
 */
export const writeToFile = async (
  path: string,
  data: string,
  fileName: string,
) => {
  const filePath = `${path}/${fileName}`;
  await createFile(filePath);
  const p = new Promise((resolve, reject) => {
    FS.writeFile(filePath, data, (err) => {
      if (err) {
        console.log('err', err);
        reject(err);
      }
      resolve(true);
    });
  });
  return p;
};
