## iconer

| 命令                                          | 参数说明                                                       | 默认值            | 示例                                                                                                                                                                      |
| --------------------------------------------- | -------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-V`                                          | 查看版本号                                                     | -                 | `iconer -V`                                                                                                                                                               |
| `-i --init [path]`                            | 初始化，path 为初始化文件存放目录                              | ./src/icon        | `iconer -i` <br /> `iconer -i ./src/iconTest`                                                                                                                             |
| `-a --add [iconName] [icons...]`              | 添加指定名称的 icon，多个 icon 请以空格分开；指定 . 则全部添加 | -                 | `iconer -a .`<br />`iconer -a ic_files ic_delete`                                                                                                                         |
| `-s, --set-origin [key=value] [key=value...]` | 设置或添加 icon 的资源路径                                     | {"uto": '...url'} | `iconer --set-origin test=https://at.alicdn.com/t/test.js`<br /><br />`iconer --set-origin test1=https://at.alicdn.com/t/test1.js test2=https://at.alicdn.com/t/test2.js` |
| `-d, --del-origin [key] [key...]`             | 删除 icon 资源地址                                             | -                 | `iconer --del-origin testOrigin`<br />`iconer --del-origin testOrigin1 testOrigin2`                                                                                       |
| `-show, --show-origin`                        | 查看 icon 资源地址                                             | -                 | `iconer --show-origin`                                                                                                                                                    |

#### init

执行`init`之后，会在指定的目录下创建 icon 文件夹，包含如下文件：
|文件名|说明|
|-----|---|
|config.json|icon 的配置文件|
|index.less|icon 组件的样式文件|
|index.tsx|icon 组件文件|
|path.tsx|path 路径集合文件|
|preview.html|预览已添加的 icon (暂只有通过 add 命令添加后才会实时更新)；

###### config.json 文件：

```json
{
  "origin": {
    "uto": "https://at.alicdn.com/t/c/font_3325623_wwvul9sxt1.js"
  },
  "map": {},
  "include": [],
  "exclude": []
}
```

1. origin 为 icon 的资源路径集合；
2. map 暂无作用；
3. include 需要包含的 icon 名称数组，全量添加的时候使用；
4. exclude 需要剔除的 icon 名称数组，全量添加的时候使用；

###### path.tsx 文件：

```javascript
import React from 'react';

export default {
 "ic_files": <path d="M96 128l317.184 0.128L500.224 256H928v640h-832V128zM832 352H192v448h640v-448z"  ></path>,
 ...
}
```

<b>📢 注意：执行命令请在工程项目的根目录进行操作！`init`执行后会在工程的 package.json 中插入 `"iconConfigPath": <path>` 作为 icon 的路径的配置</b>

<!-- #### resourcePath
resourcePath 为后续添加icon的资源地址，请在`init`之后操作； -->

#### set-origin

修改或者添加 icon 的源，重名时会在控制台提醒是否修改替换；否则直接添加；下一步中的 add 中会通过该配置读取指定资源；

#### add

- 添加 icon 到`path.tsx`文件，支持单个、批量、全量添加；
- 存在单个文件源时，直接读取文件进行添加；存在多个文件源时，则会提示用户进行选择；
- 添加时会判断现存的 path，为增量添加，重名则跳过以及提示；
- 批量时请以空格分割要添加的 icon 名称；
- 全量添加时会将获取到的资源中的未在`path.tsx`中的 icon 全部加入；
- 触发 add 后，会同步更新 preview.html 文件；

##### ⚔ 建议 ⚔

初始化时可以直接执行 `iconer -i -a [iconName]` 快速初始化、设置资源路径、添加 icon；

#### 使用

![path.tsx](https://files.catbox.moe/qo8qnm.png)
![icon组件使用](https://files.catbox.moe/mtfmwz.png)
