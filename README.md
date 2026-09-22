# Xinyu Pu · 蒲鑫宇 — Academic Homepage

独立的中英文学术主页，纯 HTML / CSS / JavaScript，无构建步骤。使用本地图片和系统字体，可直接部署至 GitHub Pages。

## 预览与维护

在此目录运行 `python3 -m http.server 8000 --bind 127.0.0.1`，访问 http://127.0.0.1:8000 。也可直接打开 index.html。

- `index.html`：全部内容；中英文分别用 `lang="en"` 和 `lang="zh-CN"` 标记。
- `styles.css`：桌面、手机、打印及深浅主题样式。
- `site.js`：语言与主题记忆、论文筛选、论文图片预览窗、页脚年份。
- `assets/papers/`：论文原图与 WebP 缩略图；点击左侧缩略图在当前页面放大查看。
- `assets/institutions/`：学校标识。
- `files/Xinyu_Pu_CV.pdf`：沿用原主页 PDF，网站语言切换不会翻译 PDF。
- `projects/geodrag/`：GeoDrag 项目页，对应主页摘要中的 Project page 链接。

新增论文可复制 `.paper`，更新 `data-category` 和全部论文计数。News 为可滚动区域。学校和实验室详情采用原生 details/summary，支持键盘操作。主题默认跟随系统，手动选择后记住偏好。

## 内容与设计

个人资料来自原主页的 `_pages/about.md`、`_pages/publications.md`、`_pages/cv.md` 和 `_config.yml`。用户补充确认：2026 年 5 月起在 LV Lab @ SMU 任 Visiting Student，导师 Pan Zhou。

采用连续正文、蓝色链接、栏目线框图标和左图右文的论文列表。参考 xiaofeng-tan.github.io 的内容密度与交互方式，未复制其页面代码或装饰。顶部仅保留 About、CV、中英文和主题按钮。教育与研究经历使用紧凑的多列圆角展开卡片、蓝色日期和悬停动画；学术服务以会议、期刊两行文字展示；页尾集中展示学术主页图标与 Gmail 联系方式。

TMM 保留“2025 年 12 月录用”，补入用户提供 PDF 上的 DOI 10.1109/TMM.2026.3694539。Neural Networks 按 PDF 卷期标注 2025，News 保留 2024 年在线发表事件。其余履历与论文信息沿用原站。

## 配图来源

- GeoDrag：ICLR 2026 官方海报，https://iclr.cc/virtual/2026/poster/10009968 。
- ACM MM：用户提供的 `3664647.3681573 (1).pdf` 第 2 页 Figure 1；未找到可确认的海报，使用论文框架图。
- SSR：用户提供 Conquering Missing Views PDF，第 3 页 Figure 1。
- TGP、RWLTA：用户提供论文 PDF，第 2 页 Figure 1。
- 东南大学校徽：https://www.shanghairanking.com/_uni/logo/82819451.png 。
- 西南大学校徽：从官方标志规范图裁出，https://www.swu.edu.cn/xxbs/bzgf.htm 。
- SMU 标识：SMU 官网 https://www.smu.edu.sg/ 的页眉标识。

图片仅做裁切、尺寸调整和压缩，未使用生成式图像重画论文内容。

## 排名来源（2026 年 9 月核对）

各榜单分别标注年份，范围为全球。排名会随来源更新而变化。

- CSRankings 2025–2026：依官方 generated-author-info.csv，按官网 adjustedcount、单领域分数及并列排名规则计算。东南大学 AI #14 / CV #40，SMU AI #24 / CV #61；西南大学不展示未确认的 CSRankings 名次。来源 https://csrankings.org/ 。
- QS 2027：东南大学 =335、西南大学 951–1000、SMU =411。来源 https://www.topuniversities.com/universities/southeast-university 、https://www.topuniversities.com/universities/southwest-university 、https://www.topuniversities.com/universities/singapore-management-university 。
- ARWU 2026：东南大学 89、西南大学 301–400。来源 https://www.shanghairanking.com/universities/southeast-university 和 https://www.shanghairanking.com/universities/southwest-university 。

## 验证与部署

第四版已检查 JavaScript 语法、本地资源、HTML 标签和 ID；浏览器验证语言和主题切换、News 滚动、论文筛选、学校详情展开、论文图片预览窗及图片加载。桌面和手机窄屏无水平溢出。

仓库根目录即 GitHub Pages 发布目录；`.nojekyll` 会让 GitHub Pages 直接发布现有静态文件，无需运行 Jekyll。
