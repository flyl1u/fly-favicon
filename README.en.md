<p align="right"><a href="README.md">简体中文</a> · <strong>English</strong></p>

![fly-favicon: ten directions, ready to try in your tab](assets/readme/hero-en.svg)

**Find a favicon people can recognize.** This Codex skill designs 10 SVG candidates without letters or numbers by default, then delivers an interactive page to compare, try, and download them.

[Try the island example](https://flyl1u.github.io/fly-favicon) · [Try the head portraits](https://flyl1u.github.io/fly-favicon/living-heads-01/) · [Install](#install) · [Skill instructions](SKILL.md)

## See the results

### 01 / From islands to orbits

Ten directions created for [fly-island](https://github.com/flyl1u/fly-island): product silhouettes, negative space, glass, contours, origami, orbits, and more. The screenshot shows **dark mode**. Click it to open the same interactive page.

[![Updated island comparison page in dark mode: ten directions, live favicon switching, actual-size previews, and SVG downloads](assets/readme/island-dark.png)](https://flyl1u.github.io/fly-favicon)

Exact original prompt:

> 使用fly-favicon，为该项目探索标签页图标

### 02 / Cats, dogs, and faces with character

Ten head portraits explored for a personal website: three cats, three dogs, and four people, with freedom to move beyond the site's palette and style. The screenshot shows **light mode**. This example also uses the current comparison template.

[![Updated head-portrait comparison page in light mode: ten cat, dog, and human candidates displayed together](assets/readme/living-heads-light.png)](https://flyl1u.github.io/fly-favicon/living-heads-01/)

Exact original prompt:

> 使用fly-favicon再探索一遍，要活物，人，或者小猫，小狗，不要全身，要头，颜色和风格不要被网站风格局限

## From ideas to a choice

The AI agent reads the website and product context, then designs distinct artwork. The Python builder validates the SVGs and assembles the page. You can judge each candidate in the actual browser tab.

| What you want to judge | How the page helps |
| --- | --- |
| Clarity at small sizes | Every candidate has **16 / 24 / 32 CSS px** previews on both light and dark backgrounds. |
| Fit in the browser | Selecting a candidate updates the page favicon, title, selected state, and SVG download target. |
| Fit with the original request | “查看提示词” beside the main title opens the exact user prompt, preserving line breaks and punctuation. |
| Keeping the result | URL parameters such as `?icon=02` retain your selection. Download an SVG or copy the entire folder for offline use. |

Pages start in light mode and offer a dark-mode switch. Both the **fly-favicon** wordmark and the Star link lead back to this repository.

The builder uses only the **Python standard library**. Generated pages need no npm packages, CDN, API, or build step. You can change the count, palette, subject, and whether text is allowed; these two examples do not constrain future designs.

## Install

Clone the repository into your personal Codex skills directory.

**macOS / Linux**

```sh
git clone https://github.com/flyl1u/fly-favicon.git ~/.codex/skills/fly-favicon
```

**Windows PowerShell**

```powershell
git clone https://github.com/flyl1u/fly-favicon.git "$env:USERPROFILE\.codex\skills\fly-favicon"
```

If you set `CODEX_HOME`, use its `skills/fly-favicon` subdirectory. Invoke `$fly-favicon` in a Codex session that has discovered the installed skill.

## Start exploring

Work inside a website repository, or provide a URL, screenshot, or product concept:

```text
Use $fly-favicon to design 10 symbol-only favicons for this website.
Deliver an interactive comparison page where I can try each option.
```

Specify a new direction or refine results from an earlier round:

```text
Use $fly-favicon to design 6 icons for a reading-notes website.
Keep the feel quiet and simple; explore paper, bookmarks, and starlight.
```

```text
Use $fly-favicon to refine options 02 and 07 from the previous round.
Preserve their recognizable shapes and improve clarity at 16px.
```

The skill reads the context, designs candidates, builds the page, and checks the result. Once you choose a design, you can ask it to integrate that favicon into the production website.

## Already have SVGs? Build the page directly

Requires **Python 3.9+**. From the repository root, generate a fresh page from the first example:

```sh
python scripts/build_comparison.py --manifest docs/manifest.json --output output/demo
```

For the second example, use `docs/living-heads-01/manifest.json`. The output directory must be new; choose a different path for another run.

Open `output/demo/index.html` for offline use, or serve it locally:

```sh
python -m http.server 8000 --directory output/demo
```

Then visit [localhost:8000](http://localhost:8000). On Windows, use `python -X utf8` if the terminal has encoding issues.

For your own manifest, prepare JSON and SVG files using the [manifest format](references/manifest.md). Put the exact user request in `original_prompt`. Older manifests without a recorded prompt show “本页未记录原始提示词” (“Original prompt not recorded”).

## Maintenance entry points

| File | Purpose |
| --- | --- |
| [SKILL.md](SKILL.md) | Skill workflow and delivery requirements |
| [assets/comparison](assets/comparison) | Reusable HTML / CSS / JS template |
| [scripts/build_comparison.py](scripts/build_comparison.py) | Standard-library builder and SVG validation |
| [references/manifest.md](references/manifest.md) | Manifest fields and examples |
| [docs](docs) | Both live examples, SVGs, and sample manifests |

## License

[MIT](LICENSE)
