# SkillHub - AI Skill 市场设计方案头脑风暴

## 项目背景
对标 ClawHub 的 AI Skill 市场，用户喜欢苹果风格，需要顶尖设计效果。融合 Anthropic frontend-design 的大胆美学和 UI/UX Pro Max 的专业设计规范。

---

<response>
<text>

## 方案一：Apple HIG 极致纯净主义（Neo-Apple Purity）

**设计运动**: 受 Apple Human Interface Guidelines 启发的超纯净极简主义，融合 2024-2025 年 Apple 产品页面的视觉语言——大面积留白、精密的排版层次、以及标志性的产品聚焦展示方式。

**核心原则**:
1. **呼吸感优先** — 每个元素都拥有充足的空间，信息密度通过层级而非拥挤来传达
2. **精密排版** — SF Pro 风格的字体系统，从 96px 的 hero 标题到 13px 的辅助信息，每一级都经过精确计算
3. **克制的色彩** — 以纯白/深黑为底，仅在关键交互点使用 Apple Blue (#007AFF) 作为唯一强调色
4. **材质真实感** — 毛玻璃导航栏、微妙的阴影层次、精致的分割线

**色彩哲学**: 
- 主背景: #FBFBFD (Apple 标志性的微暖白)
- 文字主色: #1D1D1F (Apple 深灰黑)
- 文字次色: #86868B (Apple 中灰)
- 强调色: #007AFF (Apple Blue)
- 卡片背景: #FFFFFF
- 边框: #D2D2D7

**布局范式**: 全宽 hero + 居中内容区(max-width 980px)，模仿 apple.com 的经典布局节奏。大标题 → 副标题 → 内容网格的垂直叙事流。

**签名元素**:
1. 毛玻璃(backdrop-blur)固定导航栏，滚动时背景模糊
2. 卡片 hover 时的精致 scale + shadow 动画，模仿 Apple Store 产品卡片

**交互哲学**: 每个交互都应该感觉"恰到好处"——不过度也不缺失。hover 提供微妙的视觉反馈，点击有即时响应，过渡平滑自然。

**动画**: 页面加载时元素从下方淡入(translateY + opacity)，stagger delay 50ms。卡片 hover 时 scale(1.02) + 阴影加深。导航栏滚动时背景从透明过渡到毛玻璃。

**字体系统**: 
- Display: SF Pro Display (fallback: -apple-system, BlinkMacSystemFont) — 用于大标题
- Body: SF Pro Text (fallback: system-ui) — 用于正文
- 由于 SF Pro 不可商用 Web 使用，替代方案: **Inter** 搭配 **Plus Jakarta Sans** 作为 display

</text>
<probability>0.04</probability>
</response>

<response>
<text>

## 方案二：Apple Vision Pro 空间感设计（Spatial Glass）

**设计运动**: 受 Apple Vision Pro 和 visionOS 启发的空间计算美学——深色背景上的多层玻璃面板、光晕效果、以及具有深度感的 3D 空间布局。这不是传统的扁平设计，而是具有真实材质感的"空间界面"。

**核心原则**:
1. **深度层次** — 通过多层半透明面板创造 Z 轴深度感，背景→中景→前景的空间关系清晰
2. **光与材质** — 玻璃面板具有真实的折射和反射效果，边缘有微妙的光晕(specular highlight)
3. **暗色沉浸** — 深色背景让内容面板"浮起"，创造沉浸式的专注体验
4. **有机动态** — 缓慢的背景光效流动、面板的弹性动画，让界面感觉"活着"

**色彩哲学**:
- 主背景: #000000 → #0A0A0F 的微妙渐变
- 玻璃面板: rgba(255,255,255,0.08) 带 backdrop-blur(40px)
- 面板边框: rgba(255,255,255,0.12) 的 1px 边框 + 内侧顶部高光
- 文字主色: #F5F5F7 (Apple 标志性亮白)
- 文字次色: rgba(255,255,255,0.6)
- 强调色: 多色渐变 — #007AFF → #5856D6 → #AF52DE (Apple 蓝紫渐变)
- 交互高亮: #30D158 (Apple Green) 用于成功/安装状态

**布局范式**: 打破传统网格，使用"浮动面板"布局。Hero 区域是一个巨大的玻璃面板悬浮在深色背景上，skill 卡片是独立的玻璃面板在空间中排列。左侧筛选面板 + 右侧内容区的不对称布局。

**签名元素**:
1. 面板边缘的 specular highlight — 顶部和左侧有微妙的白色渐变边框，模拟光照
2. 背景中缓慢移动的彩色光球(ambient orbs)，创造空间氛围感
3. 搜索栏是一个独立的浮动玻璃胶囊，带有内发光效果

**交互哲学**: 空间感的交互——hover 时面板微微"靠近"用户(scale + shadow 增强)，点击时面板有弹性收缩再展开的反馈。鼠标移动时面板有微妙的 3D tilt 效果。

**动画**: 
- 页面加载: 面板从远处"飞入"(scale 0.95→1 + opacity 0→1)，stagger 100ms
- 背景光球: 20s 的缓慢循环移动，使用 CSS animation
- Hover: 300ms ease-out 的 scale(1.03) + box-shadow 增强
- 搜索框获焦: 边框从白色渐变到蓝紫渐变，宽度微微扩展

**字体系统**:
- Display: **Satoshi** (几何无衬线，现代感强) — 用于标题和数字
- Body: **General Sans** — 用于描述文字
- Mono: **JetBrains Mono** — 用于安装命令和代码

</text>
<probability>0.08</probability>
</response>

<response>
<text>

## 方案三：Apple 产品页叙事式设计（Apple Narrative）

**设计运动**: 受 apple.com 产品发布页面（如 iPhone、MacBook Pro 页面）启发的"滚动叙事"设计。每一屏都是一个精心编排的故事场景，通过滚动推进叙事。大胆的排版、戏剧性的空间使用、以及精确的滚动动画。

**核心原则**:
1. **叙事驱动** — 页面不是功能列表，而是一个关于"发现完美 Skill"的故事
2. **戏剧性排版** — 超大标题(clamp 72px-120px)配合极细副标题，创造视觉张力
3. **全屏场景** — 每个 section 占据至少一个视口高度，像幻灯片一样推进
4. **精确节奏** — 信息的出现时机经过精心编排，滚动触发的动画创造"揭示"感

**色彩哲学**:
- 场景交替使用亮/暗背景，创造节奏感:
  - Hero: #000000 (纯黑) + 白色大字
  - 搜索区: #FBFBFD (暖白) + 深色文字
  - 分类展示: #1D1D1F (深灰) + 彩色分类标签
  - 热门 Skills: #F5F5F7 (浅灰) + 卡片
- 强调色系统: 每个分类有自己的颜色——开发工具(#007AFF)、效率(#FF9500)、安全(#FF3B30)、AI(#AF52DE)
- 渐变: 标题文字使用 background-clip: text 的渐变效果

**布局范式**: 垂直全屏叙事流。Hero 全屏黑底白字 → 搜索区全屏 → 分类横向滚动 → 热门 Skills 瀑布流 → CTA 全屏。打破传统的"导航+内容"模式，更像是一个产品展示页。

**签名元素**:
1. 渐变文字标题 — hero 标题使用 Apple 标志性的彩色渐变文字
2. 滚动触发的数字计数器 — "12,000+ Skills" 在滚入视口时从 0 动画到目标数字
3. 横向滚动的分类展示带 — 类似 Apple TV+ 的内容浏览方式

**交互哲学**: 滚动就是交互。每次滚动都会触发新的视觉变化——元素淡入、数字跳动、背景色切换。鼠标交互是辅助的，滚动是主要的叙事推进方式。

**动画**:
- 滚动触发: 使用 Intersection Observer，元素进入视口时从 opacity:0 translateY:60px 动画到可见
- 数字动画: 统计数字在可见时从 0 计数到目标值，duration 2s
- 背景过渡: section 之间的背景色使用 CSS scroll-snap + 平滑过渡
- 视差: hero 背景元素以不同速度滚动，创造深度感
- 卡片入场: staggered reveal，每张卡片延迟 80ms

**字体系统**:
- Display: **Outfit** (几何感强，适合大标题) — 用于 hero 和 section 标题
- Body: **DM Sans** — 用于描述和正文
- Accent: **Space Grotesk** — 用于数字和标签

</text>
<probability>0.06</probability>
</response>

---

## 最终选择

**选择方案二：Apple Vision Pro 空间感设计（Spatial Glass）**

理由：
1. 最能体现"顶尖设计效果"的要求——空间感玻璃设计在视觉上最具冲击力
2. 深色背景 + 毛玻璃面板的组合是当前最前沿的 UI 趋势，与 Apple 最新设计语言一致
3. 多层深度感和光效创造了独特的视觉记忆点，避免了"AI slop"的平庸感
4. 暗色主题天然适合开发者/技术人群的审美偏好
5. 丰富的动画和交互空间，能充分展示前端技术能力

但需要做以下调整以适配 Skill 市场的功能需求：
- 保持玻璃面板美学，但确保信息可读性和功能性
- 搜索和筛选功能需要高效易用，不能为了美观牺牲实用性
- 卡片设计需要清晰展示 skill 的关键信息（名称、描述、作者、星标、下载量）
- 字体替换为可免费使用的 Google Fonts：Satoshi → **Sora**，General Sans → **DM Sans**
