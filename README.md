<p align="right"><strong>简体中文</strong> · <a href="README.en.md">English</a></p>

![fly-favicon：10 种风格，放进标签页里试](assets/readme/hero-zh.svg)

**给网站探索一个记得住的标签页图标。** 这个 Codex Skill 默认设计 10 种无字母、无数字的 SVG 候选，并交付可以比较、点击试用和下载的交互页。

[试用小岛案例](https://flyl1u.github.io/fly-favicon) · [试用头像案例](https://flyl1u.github.io/fly-favicon/living-heads-01/) · [安装](#安装) · [Skill 说明](SKILL.md)

## 先看看效果

### 01 / 从小岛到卫星

为 [fly-island](https://github.com/flyl1u/fly-island) 制作的 10 个方向：产品轮廓、负形、玻璃、等高线、折纸、轨道等。下图展示**深色模式**，点击图片即可进入同一个交互页。

[![小岛案例的新版深色交互页：十个图标方向、标签页试用、原尺寸预览和 SVG 下载](assets/readme/island-dark.png)](https://flyl1u.github.io/fly-favicon)

原始提示词：

> 使用fly-favicon，为该项目探索标签页图标

### 02 / 猫、狗和有性格的脸

为个人网站探索的 10 张头像：3 只猫、3 只狗、4 位人物，只画头部，放开网站配色与画风。下图展示**浅色模式**；此案例也已升级为当前交互模板。

[![头像案例的新版浅色交互页：橘猫、黑猫、三花、狗和人物头像，同屏比较十个候选](assets/readme/living-heads-light.png)](https://flyl1u.github.io/fly-favicon/living-heads-01/)

原始提示词：

> 使用fly-favicon再探索一遍，要活物，人，或者小猫，小狗，不要全身，要头，颜色和风格不要被网站风格局限

## 从设计到选定

AI agent 先读取网站与产品背景，再设计有差异的图形；Python 生成器验证 SVG 并组装页面。你可以在真实标签页里判断哪个方案更容易辨认。

| 你要判断什么 | 页面如何帮你 |
| --- | --- |
| 缩小后是否清楚 | 每个候选同时提供浅底、深底的 **16 / 24 / 32 CSS px** 原尺寸预览。 |
| 放进浏览器是否合适 | 点击候选，立即更新当前页的 favicon、标题、选中状态与 SVG 下载目标。 |
| 是否符合最初的要求 | 主标题旁的「查看提示词」保留用户原文，包括换行和标点。 |
| 如何保留和带走结果 | `?icon=02` 等网址参数保存选择；单独下载 SVG，或整体复制页面文件夹离线打开。 |

页面默认浅色，可随时切换深色。左上角 **fly-favicon** 和右上角 Star 链接均可返回本仓库。

生成器只依赖 **Python 标准库**；生成的页面不需要 npm、CDN、API 或构建步骤。数量、配色、主题和是否允许文字都可按需求调整，图标不局限于以上两个案例。

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

如果设置了 `CODEX_HOME`，使用其下的 `skills/fly-favicon` 目录。在已发现该 Skill 的 Codex 会话中，通过 `$fly-favicon` 调用。

## 开始探索

在网站仓库中提出需求，也可以提供网址、截图或产品概念：

```text
使用 $fly-favicon，为当前网站设计 10 种无字母标签页图标，
最终生成可点击试用的交互对比页。
```

也可以指定新方向，或继续细化上轮结果：

```text
使用 $fly-favicon，为阅读笔记网站设计 6 种图标。
偏安静、简洁，尝试纸页、书签、星光等方向。
```

```text
使用 $fly-favicon，细化上次的 02 和 07，
保留识别特征，重点改善 16px 下的清晰度。
```

Skill 会理解背景、设计候选、生成页面并检查效果。确定方案后，可以继续要求把选中的图标接入正式网站。

## 已有 SVG？直接生成对比页

需要 **Python 3.9+**。在仓库根目录运行下面的命令，即可用第一套案例生成一份新页面：

```sh
python scripts/build_comparison.py --manifest docs/manifest.json --output output/demo
```

第二套案例使用 `docs/living-heads-01/manifest.json`。输出目录必须是新目录；再次生成时请换一个路径。

打开 `output/demo/index.html` 即可离线使用，或启动本地服务：

```sh
python -m http.server 8000 --directory output/demo
```

然后访问 [localhost:8000](http://localhost:8000)。Windows 终端出现编码问题时，可使用 `python -X utf8`。

制作自己的清单时，按 [清单格式](references/manifest.md) 准备 JSON 与 SVG，在 `original_prompt` 中原样填写用户的设计请求。旧清单未记录原文时，弹窗会显示「本页未记录原始提示词」。

## 维护入口

| 文件 | 用途 |
| --- | --- |
| [SKILL.md](SKILL.md) | Skill 执行流程与交付要求 |
| [assets/comparison](assets/comparison) | 可复用 HTML / CSS / JS 模板 |
| [scripts/build_comparison.py](scripts/build_comparison.py) | 标准库生成器与 SVG 验证 |
| [references/manifest.md](references/manifest.md) | 清单字段与示例 |
| [docs](docs) | 两套在线演示、SVG 与示例清单 |

## 许可

[MIT](LICENSE)
