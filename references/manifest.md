# 对比页清单

生成器输入为 UTF-8 JSON。图标路径相对于清单所在目录；把图标放在该目录内，便于复制整套输入。最小字段为 `brand` 与非空的 `directions`。

```json
{
  "brand": "星野笔记",
  "headline": "给灵感，一个小小的入口。",
  "intro": "从星光到纸页，比较不同的图形语言。点击即可在当前标签页试用。",
  "tab_title": "星野笔记 · 留住每一次灵感",
  "edition": "2026.10",
  "allow_text": false,
  "recommendations": [
    { "id": "01", "reason": "轮廓清楚，与记录功能直接相关" },
    { "id": "02", "reason": "几何特征鲜明，适合深浅标签栏" }
  ],
  "directions": [
    {
      "id": "01",
      "title": "折角星光",
      "category": "负形 · 纸页与星光",
      "description": "一张折角纸页中留出星光，表达灵感被记下。",
      "icon": "icons/01-folded-star.svg"
    },
    {
      "id": "02",
      "title": "环形书签",
      "category": "几何实心 · 持续记录",
      "description": "圆环与短书签结合，为日常记录留下明确入口。",
      "icon": "icons/02-orbit-bookmark.svg"
    }
  ]
}
```

示例只说明数据结构；默认任务仍需按用户要求创作方向数量，不以这两个描述代替实际图标。

| 字段 | 约定 |
| --- | --- |
| `brand` | 必填，非空品牌或网站名；用于页眉及下载文件名。 |
| `headline` / `intro` | 可选，自定义页首标题与短说明；按纯文本渲染。省略则按品牌和数量生成。 |
| `tab_title` | 可选，用于两种标签栏模拟，默认品牌名。 |
| `edition` | 可选，页眉的日期或轮次标签；不填则仅显示方案数。 |
| `allow_text` | 可选，布尔值，默认 `false`。默认拒绝 SVG 的可见文字节点；仅在用户允许图标中使用文字时设为 `true`。路径轮廓是否构成字母仍需视觉检查。 |
| `recommendations` | 可选，`id` / `reason` 对象数组；每个 ID 必须对应存在的候选，理由需非空。 |
| `directions` | 必填，非空对象数组。每个对象包含 `id`、`title`、`category`、`description`、`icon` 五个非空字符串。 |
| `id` | 唯一，数字、小写字母或连字符，例如 `01`、`02`、`minimal`；编号需 JSON 字符串。 |
| `icon` | 输入目录内的相对 SVG 文件路径。SVG 应自包含，有正方形 viewBox，不能依赖外部字体、图片或脚本。 |

输出 `manifest.json` 会把 icon 归一化为 `icons/<id>.svg`，可连同输出文件夹再复制到其他机器。生成器不读取网站、不设计图形；网站理解、差异化设计、小尺寸视觉复核由执行 skill 的 agent 完成。
