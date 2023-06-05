## iconer



|命令|参数说明|默认值|示例|
|---|-------|----|-----|
|`-V`|查看版本号|-|`svgicon -V`|
|`-i --init [path]`|初始化，path为初始化文件存放目录|./src/icon|`svgicon -i` <br /> `svgicon -i ./src/iconTest`|
|`-a --add [iconName] [icons...]`|添加指定名称的icon，多个icon请以空格分开；指定 . 则全部添加|-|`svgicon -a .`<br />`svgicon -a ic_files ic_delete`|
|--set-origin [key=value] [key=value...]|设置或添加icon的资源路径|{"ide": [ide资源地址](https://at.alicdn.com/t/c/font_3325623_wwvul9sxt1.js)}| `svgicon --set-origin test=https://at.alicdn.com/t/test.js`<br /><br />`svgicon --set-origin test1=https://at.alicdn.com/t/test1.js test2=https://at.alicdn.com/t/test2.js`
|--del-origin [key] [key...]|删除icon资源地址|-|`svgicon --del-origin testOrigin`<br />`svgicon --del-origin testOrigin1 testOrigin2`
|--show-origin|查看icon资源地址|-|`svgicon --show-origin`

<!-- |`-p --resourcePath <path>`|配置资源地址(支持在线链接和本地地址)|-|`svgicon -p https://at.alicdn.com/t/c/font_3325623_wwvul9sxt1.js` <br />`svgicon -p /Users/_self_/iconfont.js`| -->

#### init
执行`init`之后，会在指定的目录下创建icon文件夹，包含如下文件：
|文件名|说明|
|-----|---|
|config.json|icon的配置文件|
|index.less|icon组件的样式文件|
|index.tsx|icon组件文件|
|path.tsx|path路径集合文件|
|preview.html|预览已添加的icon (暂只有通过add命令添加后才会实时更新)；

###### config.json 文件：
```json
{
 "origin": {
  "ide": "https://at.alicdn.com/t/c/font_3325623_wwvul9sxt1.js"
 },
 "map": {},
 "include": [],
 "exclude": []
}
```
1. origin 为icon的资源路径集合；
2. map 暂无作用；
3. include 需要包含的icon名称数组，全量添加的时候使用；
4. exclude 需要剔除的icon名称数组，全量添加的时候使用；

###### path.tsx 文件：
```javascript
import React from 'react';

export default {
 "ic_files": <path d="M96 128l317.184 0.128L500.224 256H928v640h-832V128zM832 352H192v448h640v-448z"  ></path>,
 ...
}
```

<b>📢 注意：执行命令请在工程项目的根目录进行操作！`init`执行后会在工程的package.json中插入 `"iconConfigPath": <path>` 作为icon的路径的配置</b>

<!-- #### resourcePath
resourcePath 为后续添加icon的资源地址，请在`init`之后操作； -->

#### set-origin
修改或者添加icon的源，重名时会在控制台提醒是否修改替换；否则直接添加；下一步中的add中会通过该配置读取指定资源；

#### add
* 添加icon到`path.tsx`文件，支持单个、批量、全量添加；
* 存在单个文件源时，直接读取文件进行添加；存在多个文件源时，则会提示用户进行选择；
* 添加时会判断现存的path，为增量添加，重名则跳过以及提示；
* 批量时请以空格分割要添加的icon名称；
* 全量添加时会将获取到的资源中的未在`path.tsx`中的icon全部加入；
* 触发add后，会同步更新preview.html文件；

##### ⚔ 建议 ⚔
初始化时可以直接执行 `svgicon -i -a [iconName]` 快速初始化、设置资源路径、添加icon；

#### 使用
![path.tsx](https://files.catbox.moe/qo8qnm.png)
![icon组件使用](https://files.catbox.moe/mtfmwz.png)
