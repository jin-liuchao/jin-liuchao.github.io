# Liuchao Jin — 优化版个人主页

这是从线上最新版本独立复制并优化的静态站点。原始仓库 `D:\Documents\GitHub\liuchaojin-test.github.io` 未被修改，本副本也未发布到 GitHub Pages。

## 主要改进

- 重建信息架构：`Home / About / Research / Publications / News / CV / Contact`
- 首页突出研究定位、代表成果、代表论文、动态和联系入口
- 首页深绿背景加入缓慢游走的金色与苔绿色环境光，并为减少动态效果偏好保留静止版本
- 新增独立 `About` 页面；旧 `people.html` 自动跳转，避免旧链接失效
- Research 用“挑战—方法—结果”解释已发表工作，并新增三大研究支柱、审稿中工作、未来 5–10 年方向和受治理的自主科学发现框架
- Publications 现有 37 条网页记录，补齐 3 篇 2026 论文并按正式卷期年份修正多条元数据；支持关键词、年份和主题筛选，以及摘要与引用复制
- News 补入 2026 Best Presentation、Best Poster、Reaching Out Award 等重要动态
- About 按 2026-07-14 版 CV 更新教育背景、南方科技大学研究经历与 2026 荣誉
- 新版 CV 已作为本地站点文件收录，所有页面不再依赖旧的反向拼写域名
- 全站统一移动端导航、跳至正文、键盘焦点和减少动画偏好
- 完成全站排版复检：修正栏目标题宽度竞争、重复容器留白、平板网格过密、日期断行、新闻孤卡、科研图裁切和移动端按钮/导航断点
- 补齐独立标题、描述、canonical、Open Graph、favicon、manifest、sitemap、robots 与 404
- 生成 38 个响应式 WebP；常用页面图片均提供 480w / 800w / 1200w 三档资源
- 新增 1200×630 社交分享图 `images/og.png`

## 本地预览

在此目录打开 PowerShell，运行：

```powershell
py -m http.server 8000
```

然后访问 `http://localhost:8000/`。也可以直接双击 `index.html`，但使用本地服务器更接近 GitHub Pages 的访问方式。

## 页面与关键文件

```text
index.html                 首页
about.html                 个人简介、经历与荣誉
research.html              研究方向、案例与项目
publications.html          完整论文列表与筛选工具
news.html                  新闻与里程碑
contact.html               完整联系方式、学术主页与 CUHK 办公室地图
files/Liuchao_Jin_CV.pdf   2026-07-14 版 CV
people.html                旧地址兼容跳转
404.html                   友好的未找到页面
css/common.css             全站视觉变量、导航、按钮、页脚和响应式规则
js/script.js               移动菜单、键盘交互和动态年份
js/publications.js          论文搜索、筛选、摘要、引用与复制反馈
images/optimized/           响应式 WebP
images/og.png               社交分享预览图
robots.txt / sitemap.xml    搜索引擎基础文件
```

## 本轮附件内容整合

本轮更新以四份附件为内容依据：

- `Liuchao_Jin_CV.pdf`：身份、教育、访问经历、荣誉、报告与精选论文的主要事实基线；
- `Liuchao_Jin_Research_Statement.pdf`：长期研究愿景、三大研究支柱、代表贡献与未来 5–10 年方向；
- `slide_deck_20min.pptx`：从智能物质到自主科学发现的研究主线、ResearchState、专业智能体和治理原则；
- `interview_v2.pptx`：逆向设计方法谱系、当前审稿中工作和端到端 AI Scientist 构想。

已发表成果、审稿中工作与长期愿景在页面中分区呈现，避免把未来计划写成既有能力。Research Statement 与两份演示文稿未复制进网站，避免公开申请材料和未发表细节。

## 如何更新内容

### 新增新闻

在 `news.html` 中复制一个 `.news-card`，并同时更新：

1. `<time datetime="YYYY-MM">` 与可读日期；
2. 标题和一段简洁说明；
3. 描述性图片 `alt`；
4. 第一方或主办方来源链接；
5. 图片的 480w / 800w / 1200w WebP。

### 新增论文

在 `publications.html` 的论文列表中沿用现有条目结构，确保标题、作者、期刊、年份、DOI、摘要与引用信息完整。筛选脚本会根据论文内容建立搜索文本和主题标签。

### 替换图片

保留原图作为档案，并为页面生成 480w、800w，必要时再生成 1200w 的 WebP。图片使用 `srcset` 与 `sizes`，卡片图片默认懒加载，首屏主图不懒加载。

### 修改公共导航或页脚

本站保持零构建、可直接部署的静态结构，因此公共 HTML 位于每个主页面中。修改导航或页脚时，应同步检查 `index.html`、`about.html`、`research.html`、`publications.html` 和 `news.html`。

## 发布前建议确认

- 2026 年 7 月博士学位是否已经正式授予；当前页面采用中性的“doctoral research, 2022–2026”；
- `AirWork Robotics` 是否应公开保留：新版 CV 未包含该经历，因此本副本已从核心简介移除；
- CUHK 邮箱毕业后是否长期可用，必要时改为永久邮箱；
- 审稿中项目是否允许公开展示更具体的性能数据或图片；本版只保留高层描述；
- 已发表论文图片在个人主页复用时的出版社许可；
- 最新论文、新闻和 Google Scholar 信息是否需要更新；
- 将文件部署到目标仓库后，用真实域名测试移动菜单、筛选、DOI、外链和 404；
- 在 Google Search Console 重新提交 `sitemap.xml`。

## 已完成的静态校验

- 8 个 HTML 文件通过结构与本地资源校验；
- 9 个 CSS 文件通过语法与括号完整性检查；
- 响应式排版规则通过专项检查，覆盖标题宽度、容器留白、平板网格、时间线日期、吸顶年份与科研图片完整展示；
- 公共脚本和 Publications 脚本通过 Node.js 语法检查；
- 本地链接、图片、`srcset`、ARIA 引用、重复 ID、图片 `alt` 和新窗口安全属性通过自定义检查；
- 37 条论文记录、5 个年份分组、连续编号、无重复标题和新增 2026 论文通过内容校验；
- 本地 CV 与提供的 2026-07-14 源文件 SHA-256 一致；
- `site.webmanifest`、`sitemap.xml` 与两处 JSON-LD 均可正常解析；
- 44 个新图片/图标资产已验证可解码，社交图尺寸为 1200×630。

根据本次现有静态站点的工作约束，没有自动执行浏览器点击或截图测试；正式发布前仍建议在桌面和手机浏览器中进行一次人工验收。

## 首页三大研究方向概念图生成记录

`images/research-pillars-hero-v1.png` 使用内置 `imagegen` 模式生成，并由本地 Pillow 生成 480w / 800w / 1200w WebP。最终提示词如下：

```text
Use case: stylized-concept
Asset type: landscape hero image for an academic personal website
Primary request: create one elegant continuous scientific concept image that clearly communicates three connected research directions: AI-driven architected material and metamaterial design; intelligent multimaterial 3D/4D manufacturing; bio-inspired soft robotics and embodied intelligence.
Scene/backdrop: a refined deep forest-green scientific studio space with a subtle tonal grid and atmospheric depth, designed to sit naturally inside a dark-green website hero.
Subject: three large, immediately readable focal forms flowing from left to right without hard panel dividers. Left: a sophisticated ivory-and-teal architected metamaterial lattice emerging from restrained golden computational contours and data particles, suggesting inverse design and machine learning. Center: a precision additive-manufacturing nozzle depositing two visibly different materials into a functional layered structure, with clean geometry and believable fabrication detail. Right: an elegant origami-inspired hard-soft robotic gripper with compliant joints gently interacting with a small warm-gold sphere, suggesting adaptive embodied intelligence. Connect all three with one subtle luminous gold data-and-material flow so they read as a single system.
Style/medium: premium editorial scientific visualization, polished cinematic 3D render, credible engineering geometry, sophisticated and minimal rather than futuristic fantasy.
Composition/framing: wide 16:10 landscape composition; three balanced focal zones with no hard borders; strong visual hierarchy; readable at approximately 540 pixels wide; generous outer margins; no empty copy area needed.
Lighting/mood: crisp controlled studio lighting, calm, intelligent, rigorous, optimistic; soft volumetric glow only around the connecting flow.
Color palette: deep forest green #102b25, rich green-teal #173e35, warm ivory #f6f3e9, restrained moss #8d9648, and selective warm gold #d6a91d accents; high contrast against the dark background.
Materials/textures: matte polymer, finely textured composite lattice, satin metal printhead, soft elastomeric robotic joints; physically plausible surfaces.
Constraints: no text, no letters, no numbers, no labels, no logos, no watermark, no people, no browser frame, no UI panels, no axes or charts, no tiny unreadable details, no collage, no three separate boxed panels. The three themes must be visually distinct but integrated into one coherent image.
```

## 社交分享图生成记录

`images/og.png` 使用内置 `imagegen` 模式生成。最终提示词如下：

```text
Use case: stylized-concept
Asset type: website social preview / Open Graph image, target landscape ratio 1200 x 630
Primary request: Create a sophisticated editorial-scientific visual for Liuchao Jin's personal research website, expressing the intersection of AI-driven design, programmable materials, advanced 3D/4D printing, and soft robotics.
Scene/backdrop: clean deep navy-to-teal scientific studio space with subtle depth, no literal laboratory.
Subject: one elegant metamaterial lattice transitioning into an origami-inspired compliant robotic form; faint data-flow curves and optimization contours connect the structures.
Style/medium: premium scientific visualization, polished 3D render with restrained technical-diagram accents, credible materials and geometry.
Composition/framing: wide landscape; primary structures centered and right-weighted with calm negative space at left; safe margins for social cropping.
Lighting/mood: crisp directional lighting, intelligent, optimistic, rigorous.
Color palette: ink navy, deep teal, cool white, and a restrained indigo accent, matching an academic portfolio.
Materials/textures: matte polymer, translucent elastomer, subtle metallic traces.
Constraints: visually clear at thumbnail size; a single coherent scene; no people; no university branding; no logos; no letters, words, numbers, labels, equations, watermark, or decorative UI chrome.
Avoid: generic stock-photo aesthetics, busy collage, fantasy machinery, neon cyberpunk, illegible pseudo-text.
```

## 发布说明

本副本保留了克隆时的 Git 历史，但当前改动尚未提交或推送。确认内容后，可以在本目录创建新分支或配置新的远程仓库，再发布到 GitHub Pages。
