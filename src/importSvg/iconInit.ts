import * as fs from "fs";
import { configPath, creatIconFiles } from "../config";
import { exitFn, getPackageJson, Log } from "./utils";

export const iconInit = (path: string) => {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    } else {
      exitFn({ msg: `${path}已存在` });
    }
    // 配置缓存起来
    if (fs.existsSync(configPath)) {
      const data = getPackageJson('project');
      data.iconConfigPath = path;
      fs.writeFileSync(configPath, JSON.stringify(data, null, "\t"));
    } else {
      exitFn({ msg: `configPath 不存在，请先执行 init` });
    }

    // 写入文件
    Object.keys(creatIconFiles).forEach((it) => {
      const filePath = `${path}/${it}`;
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, creatIconFiles[it]);
      }
    });

    Log.success(`初始化成功，文件路径：${path}`);
  } catch (err) {
    Log.error(`${err}`);
  }
};
