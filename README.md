# fly-favicon

**简体中文** | [English](README.en.md)

为网站设计多种风格的 SVG 标签页图标，交付一个可以比较、点选试用和下载的交互对比页。

**下图是为 [fly-island](https://github.com/flyl1u/fly-island) 制作的完整示例，点击图片进入同一个交互对比页，可以直接在浏览器标签页试用任意方案**

**[打开在线演示 →](https://flyl1u.github.io/fly-favicon)**

[![fly-favicon 交互对比页：十种无字母图标，支持深浅背景与原尺寸预览](docs/images/comparison.jpg)](https://flyl1u.github.io/fly-favicon)

[查看 Skill](SKILL.md) · [清单格式](references/manifest.md)

## 你会得到什么

默认根据网站主题设计 **10 种无字母、无数字的 SVG 图标**。不同方向使用不同的图形语言和核心意象，数量、配色和是否使用文字均可按要求调整。

| 功能 | 体验 |
| --- | --- |
| 同屏比较 | 每个方向都有名称、设计说明和放大预览。 |
| 原尺寸预览 | 每个图标都在浅底、深底上展示 16 / 24 / 32 CSS px 效果。 |
| 真实标签页试用 | 点击候选，同步切换当前页 favicon、标题、选中状态和下载目标。 |
| 深浅背景 | 切换整个对比页的背景，页首同时展示两种标签栏模拟。 |
| 保存选择 | `?icon=02` 等网址参数保留当前方案，刷新可恢复。 |
| 独立素材 | 下载 SVG；输出文件夹可整体复制并离线打开。 |

图形由使用本 Skill 的 AI agent 结合网站内容设计，Python 脚本负责验证素材并组装对比页。生成器仅依赖 Python 标准库，产出的页面无需 npm、CDN、API 或构建工具。

## 安装

将仓库克隆到 Codex 的个人 skills 目录。

**macOS / Linux**

```sh
git clone https://github.com/flyl1u/fly-favicon.git ~/.codex/skills/fly-favicon
```

**Windows PowerShell**

```powershell
git clone https://github.com/flyl1u/fly-favicon.git "$env:USERPROFILE\.codex\skills\fly-favicon"
```

如果设置了 `CODEX_HOME`，请把目标目录改为其下的 `skills/fly-favicon`。安装后，在能发现该 Skill 的 Codex 会话中使用 `$fly-favicon`。

## 使用

在网站仓库中直接提出需求，也可以提供网址、截图或产品概念：

```text
使用 $fly-favicon，为当前网站设计 10 种无字母标签页图标，
最终生成可点击试用的交互对比页。
```

```text
使用 $fly-favicon，为一个阅读笔记网站设计 6 种图标。
偏安静、简洁，尝试纸页、书签、星光等方向，最后给我对比页。
```

```text
使用 $fly-favicon，继续细化上次的 02 和 07，
保留两者的识别特征，重点改善 16px 下的清晰度。
```

Skill 会先理解网站和现有品牌，再设计图标、生成页面并检查效果。只要求设计或比较时，正式站点的图标会保留；要求落地某个明确方案时，再完成对应接入。

## 单独运行生成器

已有 SVG 和清单时，可以直接生成对比页。需要 Python 3.9 或更高版本。

在仓库根目录运行下列命令，可用演示中的 10 个图标生成一份新的对比页：

```sh
python scripts/build_comparison.py --manifest docs/manifest.json --output output/demo
```

然后打开 `output/demo/index.html`，或启动本地服务：

```sh
python -m http.server 8000 --directory output/demo
```

访问 <http://localhost:8000>。输出目录必须是新目录；重复运行时请换一个输出路径。Windows 出现终端编码问题时，可使用 `python -X utf8`。

为自己的项目使用时，按 [清单格式](references/manifest.md) 准备 JSON 和 SVG，再替换 `--manifest` 路径。

## 仓库结构

```text
fly-favicon/
├── SKILL.md                   # Skill 的执行说明
├── agents/openai.yaml         # Codex 展示与调用信息
├── assets/comparison/         # 交互页 HTML / CSS / JS 模板
├── scripts/build_comparison.py
├── references/manifest.md     # 输入数据格式
└── docs/                      # 在线演示、10 个 SVG、截图与示例清单
```

`docs/` 保留这次的 fly-island 展示；模板和生成器可用于其他网站，不会固定生成小岛主题。

## 许可

[MIT](LICENSE)
