import type { LocalizedTutorialContent } from '../tutorials-longform-i18n';

export const entry: Partial<Record<string, LocalizedTutorialContent>> = {
  zh: {
    title: '如何用 Open Design 创建 AI 驱动的 PPT：动手工作坊教程',
    summary:
      '一份可直接照做的文字工作坊指南：用 Open\u00a0Design 将原始笔记转成可编辑的 AI PPT，并逐步完成视觉方向、Deck Mode、素材、图表、动效和最终质检。',
    bodyHtml: `
<blockquote><p><strong>核心思路：</strong>把 AI 演示文稿的制作拆成一组可控步骤：先选定风格，再构建可编辑的演示文稿，最后用素材、图表、动效和评论逐步打磨。</p></blockquote>

<h1>开始之前</h1>
<p>这套工作流适用于研究报告、产品提案、课程讲义、作品集展示、内部战略备忘录、活动复盘，以及任何需要转化为视觉演示文稿的材料。源材料可以是一份文档、几篇笔记、一段访谈记录、一份研究摘要，甚至是一堆杂乱的要点。</p>

<blockquote><p><strong>推荐配置：</strong>在本地安装 Open Design，连接一个编程 Agent 或 AI Agent，并准备一份包含主题、受众、目标和原始内容的源文档。如果 Agent 能浏览网页、下载素材、生成图像并编辑代码，整个流程会顺畅得多。</p></blockquote>

<h2>先明确演示文稿的目的</h2>
<p>演示文稿不只是一组漂亮的幻灯片。它应该帮助受众理解某件事，并据此做出决定、形成判断或采取行动。在让 Open Design 开始设计之前，先写清楚受众需要理解什么，以及你希望他们最终得出什么结论。</p>

<h3><span id="prompt-0"></span>提示词 0：在设计前明确演示文稿的目的</h3>

<pre><code class="language-text">我想制作一份关于[主题]的演示文稿。

受众：
[描述受众]

这份演示文稿应帮助受众理解：
1. [他们需要理解什么]
2. [他们需要哪些背景或证据]

这份演示文稿应引导受众形成以下判断或决定：
[你希望他们做出的决定、形成的观念或采取的行动]

请帮我明确：
1. 这份演示文稿的核心叙事。
2. 最重要的论点。
3. 推荐的幻灯片顺序。
4. 哪些信息应通过视觉方式呈现，而不应只用文字表达。

暂时不要设计幻灯片，也不要编写 HTML。只关注故事、结构和决策逻辑。</code></pre>

<hr>

<h1>第 1 步：使用 Image Mode 生成一张包含多种风格的参考图</h1>
<figure class="ppt-media">
  <img src="/tutorials/open-design-ai-ppt-image-mode-entry.webp" alt="提示词编辑器中的 Open Design Image Mode 入口" width="1600" height="824" loading="lazy" />
  <figcaption>在构建完整演示文稿前，如果想先得到一张视觉参考图，请从 Image Mode 开始。</figcaption>
</figure>

<p>在 Open Design 中，第一步不是生成完整 PPT，而是使用 <strong>Image Mode</strong> 生成一张包含多种潜在视觉方向的参考图。这样，用户可以先做选择，再决定整份演示文稿采用哪种风格。</p>
<p>这一步很重要，因为人们往往说不出自己想要的风格叫什么。他们可能并不确定自己更喜欢瑞士排版、粗野主义布局、赛博朋克仪表盘、编辑式杂志设计、产品发布会视觉，还是简洁的投资人演示风格。把多种风格放在同一张参考图里，用户就能直观比较，并选出最符合内容表达的方向。</p>

<blockquote><p><strong>重要：</strong>这一步只生成一张图。图中应并排展示多个风格选项。暂时不要让 Open Design 创建完整演示文稿。</p></blockquote>

<h3><span id="prompt-1"></span>提示词 1：Image Mode —— 生成一张包含多种 PPT 风格选项的图片</h3>

<pre><code class="language-text">我正在准备一份关于[主题]的演示文稿。

受众是：
[受众]

演示文稿的目标是：
[目标、决定或核心论点]

请只生成一张参考图，在同一张图中展示这份 PPT 可能采用的多种视觉风格。

要求：
1. 在一张构图中包含 4 到 6 个彼此不同的风格方向。
2. 每个方向都应像同一份演示文稿的封面页或核心视觉。
3. 各方向在布局、排版、颜色、纹理和视觉语言上必须真正不同。
4. 暂时不要创建完整 PPT。
5. 不要分别生成多张图片。把所有风格选项放在一张图里，便于比较。
6. 为每个选项加一个简短的风格标签，例如瑞士编辑风、新粗野主义、玻璃拟态、电影感科技、数据杂志或产品发布。

需要体现的内容：
[粘贴 5 到 10 个关键要点或演示文稿大纲]

请让这张图真正有助于选择最终的 PPT 风格。</code></pre>

<figure class="ppt-media">
  <img src="/tutorials/open-design-ai-ppt-style-light.webp" alt="在 Image Mode 中生成的明亮风格 Open Design 幻灯片图片" width="1600" height="958" loading="lazy" />
  <figcaption>在构建演示文稿之前，一张参考图就可以探索简洁、明亮的演示风格。</figcaption>
</figure>

<figure class="ppt-media">
  <img src="/tutorials/open-design-ai-ppt-style-dark.webp" alt="在 Image Mode 中生成的深色风格 Open Design 幻灯片图片" width="1600" height="958" loading="lazy" />
  <figcaption>加入一个对比鲜明的深色方向，有助于并排比较视觉语言、层级和氛围。</figcaption>
</figure>

<h2>如何选择风格</h2>
<p>图片生成后，从中选择一个风格方向。不要只挑最好看的，而要挑最能支持内容表达的。创业项目提案可能需要清晰与自信；研究演讲可能更需要结构和信息密度；创意社区分享则可能适合更鲜明的视觉个性。</p>

<table>
  <thead>
    <tr><th background-color="light-gray">如果演示文稿需要……</th><th background-color="light-gray">应选择给人这种感受的风格……</th></tr>
  </thead>
  <tbody>
    <tr><td>信任感、战略感、企业可信度</td><td>简洁、有结构、克制、编辑感</td></tr>
    <tr><td>活力、社区感、产品势能</td><td>大胆、鲜明、高对比、富有表现力</td></tr>
    <tr><td>技术深度、数据、研究</td><td>基于网格、模块化、信息密集</td></tr>
    <tr><td>未来感 AI 或开发者工具</td><td>数字化、有层次、受代码启发、具有电影感</td></tr>
  </tbody>
</table>

<h3><span id="prompt-1b"></span>提示词 1B：让 AI 帮你选择最佳方向</h3>

<pre><code class="language-text">这是包含多个风格方向的参考图。

我的演示文稿主题是[主题]。
我的受众是[受众]。
我希望受众最终得出的结论是[结论]。

请比较这些风格选项，并推荐最合适的一个。

请从以下角度评估每个选项：
1. 是否支持内容表达。
2. 是否适合受众。
3. 是否能扩展成一整套演示文稿。
4. 是否为文字、图表、截图和 Logo 留出了足够空间。

暂时不要生成演示文稿。请帮我选定一个风格方向，并解释原因。</code></pre>

<hr>

<h1>第 2 步：先准备幻灯片结构，再开始设计</h1>
<p>进入 Deck Mode 之前，先逐页确定内容。许多 AI 演示文稿工作流会在这里失败：设计开始得太早。只要文案、页面顺序和叙事逻辑仍不清晰，后续每一次设计修改的成本都会更高。</p>
<p>这一阶段的目标是建立一副干净的内容骨架：每页标题、副标题、核心信息、支撑要点，以及必要的视觉要求。你可以使用任意 AI 对话工具，也可以在习惯使用 Open Design 工作区时直接使用其中的聊天功能。</p>

<h3><span id="prompt-2"></span>提示词 2：创建逐页内容规划</h3>

<pre><code class="language-text">我想制作一份关于[主题]的 PPT。

受众：
[受众]

受众应理解：
[他们应该理解什么]

受众应得出结论或做出决定：
[他们应该相信什么、决定什么或采取什么行动]

源材料：
[粘贴原始笔记、访谈记录、报告或要点]

请创建逐页内容规划。

要求：
1. 暂时不要设计幻灯片。
2. 暂时不要编写最终 HTML。
3. 创建[页数]页幻灯片。
4. 每页都需提供：
   - 幻灯片标题
   - 一句话核心信息
   - 主要要点
   - 有帮助时给出建议的视觉元素
   - 该页是否需要图表、Logo、图片、截图或动效
5. 每页只聚焦一个观点。
6. 避免在单页放入过多文字。

完成大纲后，再创建一个简单的 HTML 预览，把每页文字放入简洁布局中，便于我在视觉设计开始前检查结构。</code></pre>

<blockquote><p><strong>检查点：</strong>现在就编辑幻灯片结构。修改标题、删除薄弱页面、合并重复观点，并在生成设计稿前明确最终结论。</p></blockquote>

<hr>

<h1>第 3 步：使用 Deck Mode，把选定的图片风格重建为可编辑 PPT</h1>
<figure class="ppt-media">
  <img src="/tutorials/open-design-ai-ppt-deck-mode-entry.png" alt="提示词编辑器中已选择 Open Design Deck Mode" width="2754" height="1576" loading="lazy" />
  <figcaption>目标是可编辑的演示文稿而不是单张参考图时，请切换到 Deck Mode。</figcaption>
</figure>

<p>现在切换到 <strong>Deck Mode</strong>。把选定的参考图和逐页内容交给 Open Design，让它按照参考图的视觉风格重建演示文稿，但输出必须是可编辑的 HTML 幻灯片。</p>
<p>这是静态图片工作流与 Open Design 工作流之间的关键区别。输出不应是一张扁平图片，而应是一套可以检查、编辑、评论并持续改进的演示文稿。</p>

<h3><span id="prompt-3"></span>提示词 3：Deck Mode —— 创建第一版可编辑演示文稿</h3>

<pre><code class="language-text">我想创建一套 PPT 演示文稿。

请将随附的参考图作为视觉方向。

重要要求：
1. 重现参考图中选定的风格方向。
2. 将 PPT 构建为基于 HTML 的可编辑幻灯片。
3. 除非我另有说明，否则幻灯片比例应与参考图一致。
4. 尽可能保留幻灯片文案和结构。
5. 不要把整套演示文稿变成静态图片。
6. 每页都要有精致的视觉效果，同时保持易读并适合演示。

选定的视觉风格：
[描述你从图片中选择的风格]

幻灯片内容：
[粘贴最终的逐页内容规划]

请生成第一版完整演示文稿。</code></pre>

<h2>第一版应该达到什么程度</h2>
<p>第一版可能已经能用，但通常不会完全匹配参考图，这是正常现象。它可能在间距、纹理、排版张力、视觉密度一致性或布局复杂度上仍然偏弱。不要把第一版当作成品，而要把它视为可继续打磨的工作草稿。</p>

<hr>

<h1>第 4 步：将生成的演示文稿与参考图对照</h1>
<p>不要只说“做得更好一些”，而要让 AI 将当前演示文稿与参考图逐项比较。这样可以建立更具体的改进循环，让它诊断布局、排版、纹理、视觉层级、密度和氛围上的差距。</p>

<h3><span id="prompt-4"></span>提示词 4：诊断视觉差距并改进演示文稿</h3>

<pre><code class="language-text">这里再次附上原始参考图。

请将当前演示文稿与参考图进行比较。

重点检查：
1. 布局结构
2. 字体层级与个性
3. 配色
4. 间距与对齐
5. 视觉层级
6. 纹理、纵深与氛围
7. 每页是否都像来自同一套设计系统

不要只描述差异，请直接改进演示文稿。

使用所有可用的设计和编码能力缩小差距，同时保持演示文稿易读、可编辑。

完成修改后，请总结：
1. 修改了什么。
2. 哪些幻灯片改进最大。
3. 哪些部分仍需人工检查。</code></pre>

<blockquote><p><strong>工作坊心得：</strong>这轮自我对照往往是演示文稿从“生成出来”转变为“真正经过设计”的关键时刻。</p></blockquote>

<hr>

<h1>第 5 步：加入真实 Logo 和品牌素材</h1>
<p>AI 生成的演示文稿经常在本该使用真实 Logo、产品图标、截图或品牌素材的位置放置文字占位符，这会削弱可信度。让 Open Design 找出需要真实素材的位置，搜索并下载合适版本，再把它们放进演示文稿。</p>
<p>对于 Logo，要明确要求：使用官方 Logo，保留原始颜色，不要为了匹配演示文稿而重新设计。演示文稿可以有鲜明的视觉风格，但品牌素材应保持可辨识。</p>

<figure class="ppt-media">
  <img src="/tutorials/open-design-ai-ppt-brand-assets.webp" alt="使用真实 Agent 和模型 Logo 的演示文稿幻灯片" width="1600" height="964" loading="lazy" />
  <figcaption>真实 Logo 和产品素材能让演示文稿更具体，避免看起来像由占位符拼成。</figcaption>
</figure>

<h3><span id="prompt-5"></span>提示词 5：加入官方 Logo 和品牌素材</h3>

<pre><code class="language-text">请检查整套演示文稿，找出应该加入真实外部素材的位置。

请寻找：
1. 公司 Logo
2. 产品 Logo
3. 应用图标
4. 平台截图
5. 公开的产品图片或界面参考

要求：
1. 搜索合适的官方素材或高质量素材。
2. 下载素材并插入相关幻灯片。
3. 保留 Logo 的原始品牌色。
4. 不要改色、拉伸或重新设计官方 Logo。
5. 不要每页都加素材，只在素材能提升清晰度、可信度或辨识度时加入。
6. 确保插入的素材适配布局，不要让页面显得拥挤。

更新后请告诉我：
1. 哪些幻灯片加入了新素材。
2. 加入了哪些素材。
3. 哪些素材可能仍需人工核验。</code></pre>

<h2>Logo 质量检查</h2>
<ul class="contains-task-list">
  <li class="task-list-item"><input type="checkbox" disabled> 所有 Logo 是否清晰可辨，且没有变形？</li>
  <li class="task-list-item"><input type="checkbox" disabled> 是否保留了官方品牌色？</li>
  <li class="task-list-item"><input type="checkbox" disabled> 是否移除了低分辨率或模糊素材？</li>
  <li class="task-list-item"><input type="checkbox" disabled> 每个 Logo 是否服务于该页信息，而不是只作为装饰？</li>
</ul>

<hr>

<h1>第 6 步：只在有助于解释论点时加入 AI 生成图像</h1>
<p>加入 Logo 和真实素材后，演示文稿可能仍需要概念性视觉。这类图片不是品牌素材，而是用来解释观点、营造氛围，或让抽象概念更容易理解。</p>
<p>关键在于避免过度装饰。不要要求每页都放图片，而要让 AI 判断哪些页面真正能从图像生成中受益、每张图应表达什么，以及应放在什么位置。</p>

<figure class="ppt-media">
  <img src="/tutorials/open-design-ai-ppt-ai-visual-example.webp" alt="使用 AI 生成视觉素材来支撑演示论点的幻灯片" width="1800" height="1087" loading="lazy" />
  <figcaption>AI 生成视觉应强化幻灯片的论点，并让最终演示文稿<span class="ppt-nowrap">更精致。</span></figcaption>
</figure>

<h3><span id="prompt-6"></span>提示词 6：只在有用的位置生成辅助视觉</h3>

<pre><code class="language-text">请检查整套演示文稿，判断哪些位置加入 AI 生成图像后会更清晰或更有说服力。

要求：
1. 不要每页都加入 AI 图片。
2. 只在图片能帮助解释概念、支撑论点或让关键时刻更令人印象深刻时使用。
3. 已经有足够视觉内容的幻灯片不要再加图片。
4. 图片风格应与选定的演示文稿风格一致。
5. 如果可以使用图像生成，请生成图片并插入演示文稿。
6. 如果无法使用图像生成，请写出可在其他图像生成工具中使用的提示词。

对于加入或建议的每张图片，请告诉我：
1. 幻灯片页码
2. 图片用途
3. 使用的图像提示词
4. 为什么该页能从这张图片中受益</code></pre>

<blockquote><p><strong>经验法则：</strong>视觉应解释论点，而不是装饰页面。如果图片没有让观点更容易理解，就删掉它。</p></blockquote>

<hr>

<h1>第 7 步：为数据密集型幻灯片使用 ECharts</h1>
<p>如果演示文稿包含市场对比、时间线、采用趋势、调查结果、技术基准或研究发现，请使用真实图表，而不是静态图片。ECharts 很适合这类场景，因为图表可以嵌入 HTML 幻灯片、按演示文稿风格定制，并在数据变化后继续更新。</p>
<p>让 AI 扫描整套演示文稿，找出应该使用图表的页面。仍然要保持克制：每页都有图表会让演示文稿变得嘈杂，少数几张有力的图表反而能显著增强可信度。</p>

<figure class="ppt-media">
  <img src="/tutorials/open-design-ai-ppt-echarts-example.webp" alt="包含嵌入式图表模块的演示文稿幻灯片" width="1600" height="901" loading="lazy" />
  <figcaption>只在幻灯片需要清晰的数据叙事时使用图表，不要把图表当作装饰。</figcaption>
</figure>

<h3><span id="prompt-7"></span>提示词 7：在数据可视化有帮助的位置加入 ECharts</h3>

<pre><code class="language-text">请扫描整套演示文稿，找出使用 ECharts 可视化后能改善理解的幻灯片。

只在确实有用时使用 ECharts。

可以考虑为以下内容添加图表：
1. 对比
2. 随时间变化的趋势
3. 排名
4. 市场份额
5. 采用曲线
6. 调查结果
7. 前后对比指标
8. 技术基准

要求：
1. 不要每页都加图表。
2. 为每个相关页面选择最合适的图表类型。
3. 让图表样式匹配演示文稿的视觉系统。
4. 有确切数据时使用真实数据。
5. 如果缺少精确数据，请使用明确标注的示意数据，并说明仍需核验。
6. 安排图表位置，使其服务于该页核心信息。

更新后请总结：
1. 哪些幻灯片加入了图表。
2. 使用了什么图表类型。
3. 使用了哪些数据。
4. 哪些数据点仍需核验。</code></pre>

<table>
  <thead>
    <tr><th background-color="light-gray">内容类型</th><th background-color="light-gray">建议图表</th><th background-color="light-gray">适用原因</th></tr>
  </thead>
  <tbody>
    <tr><td>市场增长</td><td>折线图或面积图</td><td>清晰呈现方向和势能。</td></tr>
    <tr><td>竞争对比</td><td>条形图或雷达图</td><td>让差异一目了然。</td></tr>
    <tr><td>类别占比</td><td>饼图、环形图或矩形树图</td><td>快速呈现分布。</td></tr>
    <tr><td>工作流阶段</td><td>漏斗图或堆叠条形图</td><td>展示转化或推进过程。</td></tr>
  </tbody>
</table>

<hr>

<h1>第 8 步：只在确实有帮助时加入 Three.js 视觉效果</h1>
<p>Open Design 演示文稿基于 HTML，因此可以加入传统幻灯片工具不易实现的 Web 原生视觉效果。Three.js 可以创建粒子、3D 物体、细微的背景纵深或空间动效；动画库则能实现入场过渡、悬停效果、章节切换或重点强调。</p>
<p>请谨慎使用。动效应该让演示更令人印象深刻或更容易理解，而不是降低幻灯片的可读性。</p>

<figure class="ppt-media">
  <video src="/tutorials/open-design-ai-ppt-threejs-demo.mp4" controls playsinline preload="metadata"></video>
  <figcaption>只有当 Web 原生动效能增加清晰度、纵深或记忆点时才使用它。</figcaption>
</figure>

<h3><span id="prompt-8a"></span>提示词 8A：加入克制的 Three.js 效果</h3>

<pre><code class="language-text">请扫描演示文稿，找出哪些位置加入克制的 Three.js 效果后会更好。

只在 Three.js 能支持该页信息时使用它。

合适的用法包括：
1. 为开场页加入细微的动态背景。
2. 用 3D 隐喻表达关键概念。
3. 使用粒子效果营造氛围，同时不降低可读性。
4. 使用空间视觉帮助解释系统、网络或流程。

要求：
1. 不要每页都加入 3D 效果。
2. 避免视觉杂乱。
3. 保持文字易读。
4. 将性能控制在合理范围内。
5. 让效果匹配演示文稿的视觉风格。

更新后请告诉我：
1. 哪些幻灯片加入了 Three.js 效果。
2. 加入了什么效果。
3. 它为什么能支持该页内容。
4. 是否有任何效果应该为了清晰度而移除。</code></pre>

<blockquote><p><strong>不要滥用动效。</strong>如果选定的演示风格已经色彩丰富、信息密集或表现力很强，就少用一些 3D 效果；如果风格极简，细微动效可以增加活力，又不会让设计显得杂乱。</p></blockquote>

<hr>

<h1>第 9 步：使用 Comment、Mark 和 Edit 精细调整</h1>

<h2>Comment</h2>
<p>当问题与某个具体幻灯片元素相关时，请使用 Comment：例如 Logo 显得太大、标签需要换一种说法、图表需要更多留白，或某个视觉细节需要复核。这样，反馈会紧贴需要修改的对象，下一轮 Agent 处理时就能准确定位。</p>

<figure class="ppt-media">
  <img src="/tutorials/open-design-ai-ppt-comment-tool.png" alt="附着在已选幻灯片元素上的 Open Design 评论框" width="2154" height="1206" loading="lazy" />
  <figcaption>元素评论适合对间距、文案、素材或视觉层级给出精确反馈。</figcaption>
</figure>

<h2>Mark</h2>
<p>需要快速指出某一视觉区域时，请使用 Mark。它适合那些“展示比描述更容易”的布局问题，例如“这组元素位置太高”“这一部分应与标题对齐”或“选中的页眉需要更强对比度”。</p>

<figure class="ppt-media">
  <img src="/tutorials/open-design-ai-ppt-mark-tool.png" alt="突出标出幻灯片页眉区域的 Open Design Mark 工具" width="2158" height="1210" loading="lazy" />
  <figcaption>当某个布局区域需要调整时，Mark 可以让视觉反馈变得具体。</figcaption>
</figure>

<h2>Edit</h2>
<p>已经明确知道要做哪项局部修改时，请使用 Edit。选中元素，直接编辑文字或样式属性并保存，无须重新生成整套演示文稿。主设计系统稳定后，Edit 最适合处理最终措辞、排版和小幅布局修正。</p>

<figure class="ppt-media">
  <img src="/tutorials/open-design-ai-ppt-edit-tool.png" alt="正在编辑所选幻灯片文字的 Open Design Edit 面板" width="2156" height="1206" loading="lazy" />
  <figcaption>Edit 是精确修改文字、排版和单个元素的最快方式。</figcaption>
</figure>

<hr>

<h1>第 10 步：加入演示文稿级过渡与交互</h1>
<p>当内容、视觉、图表、3D 细节和局部修正都已到位后，再添加最后一层：贯穿整套 PPT 的流程动效和交互。这不同于只给某一页添加一个视觉效果；这里的目标是让演示文稿从头到尾播放时都流畅自然。</p>
<p>可以把它理解为整套演示系统：页面切换、章节过渡、入场时序、悬停状态、点击交互和细微的强调动画。最好的版本应该帮助受众跟上叙事，而不是像一场动画效果演示。</p>

<blockquote><p><strong>最后再做这一步。</strong>如果过早加入全局动画，后续内容和布局修改可能破坏时序。请先完成演示文稿，再为整个演示流程添加动画。</p></blockquote>

<figure class="ppt-media">
  <video src="/tutorials/open-design-ai-ppt-motion-demo.mp4" controls playsinline preload="metadata" poster="/tutorials/open-design-ai-ppt-tutorial-cover.webp"></video>
  <figcaption>一段简短的演示预览，可以展示页面级动效贯穿整套演示文稿时的实际感受。</figcaption>
</figure>

<h3><span id="prompt-10a"></span>提示词 10A：为整套 PPT 加入流程动效和交互</h3>

<pre><code class="language-text">请为整套演示文稿加入演示级流程动效和交互。

目标是让 PPT 从头到尾播放时流畅、精致。

请加入：
1. 幻灯片之间的过渡效果。
2. 主题变化时的章节级过渡时刻。
3. 关键标题、卡片、图表和图片的入场动画。
4. 对每页最重要信息的细微强调动画。
5. 只在合理的位置使用悬停或点击交互。
6. 适当为图表、卡片或视觉模块加入轻量交互细节。

约束：
1. 不要给每个元素都加动画。
2. 不要让演示文稿浮夸或分散注意力。
3. 所有文字都应保持易读、稳定。
4. 图表标签和数据必须始终可见。
5. 交互应足够简单，适合现场演示。
6. 整套演示文稿的动画节奏应保持一致。
7. 优化性能，避免演示模式中出现卡顿。

加入动画和交互后，请总结：
1. 整套演示文稿采用的过渡风格。
2. 哪些幻灯片加入了自定义交互。
3. 哪些幻灯片加入了特殊入场或强调动画。
4. 哪些幻灯片应减少动画或进行人工检查。</code></pre>

<table>
  <thead>
    <tr><th background-color="light-gray">动画类型</th><th background-color="light-gray">适合用途</th><th background-color="light-gray">应避免</th></tr>
  </thead>
  <tbody>
    <tr><td>页面过渡</td><td>表示叙事从一个观点推进到下一个观点</td><td>每页都使用不同过渡</td></tr>
    <tr><td>章节过渡</td><td>标示故事发生重大转折</td><td>让细小的话题变化显得过于戏剧化</td></tr>
    <tr><td>入场动画</td><td>逐步揭示标题、卡片和图表的层级</td><td>为每段文字或每个要点都加动画</td></tr>
    <tr><td>悬停或点击交互</td><td>让演讲者按需展示补充细节</td><td>把关键信息藏在交互后面</td></tr>
  </tbody>
</table>

<hr>

<h1>最终导出与演示说明</h1>
<p>这套工作流可能包含真实素材、生成图像、图表、3D 效果和动效，因此导出方式非常重要。导出为传统幻灯片格式时，部分视觉效果可能丢失或需要重建；导出为静态图片或 PDF 时，视觉设计通常能保留，但动画和交互不会生效。</p>

<table>
  <thead>
    <tr><th background-color="light-gray">格式</th><th background-color="light-gray">最适合</th><th background-color="light-gray">取舍</th></tr>
  </thead>
  <tbody>
    <tr><td>直接在 Open Design 中演示</td><td>保留动效、HTML 布局、图表和交互效果</td><td>需要在 Open Design 环境中进行演示</td></tr>
    <tr><td>PDF 或图片</td><td>分享稳定的视觉版本</td><td>动效和交互会丢失</td></tr>
    <tr><td>PPTX</td><td>兼容传统演示文稿工具</td><td>复杂 HTML 视觉可能无法完美转换</td></tr>
    <tr><td>HTML</td><td>以 Web 原生方式分享和归档</td><td>外部素材和生成效果需要仔细核验</td></tr>
  </tbody>
</table>

<blockquote><p><strong>推荐做法：</strong>如果演示文稿使用了图表、3D 和动效，请尽可能直接在 Open Design 中演示。如果还需要一个便于分享的备份版本，请在最终质检后导出 PDF 或图片。</p></blockquote>

<hr>

<h1>完整提示词索引</h1>
<p>把这一节当作紧凑的复制粘贴索引。使用时，请将方括号中的变量替换为你自己的主题、受众、内容和约束。</p>

<table>
  <thead>
    <tr><th background-color="light-gray">提示词</th><th background-color="light-gray">何时使用</th><th background-color="light-gray">在哪里使用</th></tr>
  </thead>
  <tbody>
    <tr><td><a href="#prompt-0">提示词 0</a></td><td>需要明确故事和决策逻辑时。</td><td>任意 AI 对话工具</td></tr>
    <tr><td><a href="#prompt-1">提示词 1</a></td><td>需要一张包含多种视觉风格选项的图片时。</td><td>Open Design Image Mode</td></tr>
    <tr><td><a href="#prompt-1b">提示词 1B</a></td><td>希望 AI 帮助选择最佳视觉方向时。</td><td>Open Design 聊天或任意 AI 对话工具</td></tr>
    <tr><td><a href="#prompt-2">提示词 2</a></td><td>需要逐页内容规划时。</td><td>任意 AI 对话工具</td></tr>
    <tr><td><a href="#prompt-3">提示词 3</a></td><td>已经准备好创建第一版可编辑演示文稿时。</td><td>Open Design Deck Mode</td></tr>
    <tr><td><a href="#prompt-4">提示词 4</a></td><td>第一版演示文稿需要更接近参考图时。</td><td>Open Design 聊天</td></tr>
    <tr><td><a href="#prompt-5">提示词 5</a></td><td>需要真实 Logo 和产品素材时。</td><td>Open Design 聊天</td></tr>
    <tr><td><a href="#prompt-6">提示词 6</a></td><td>只想在有帮助的位置使用 AI 生成图像时。</td><td>Open Design 聊天</td></tr>
    <tr><td><a href="#prompt-7">提示词 7</a></td><td>数据密集型幻灯片需要图表时。</td><td>Open Design 聊天</td></tr>
    <tr><td><a href="#prompt-8a">提示词 8A</a></td><td>需要克制的 3D 视觉效果时。</td><td>Open Design 聊天</td></tr>
    <tr><td><a href="#prompt-10a">提示词 10A</a></td><td>准备为整套 PPT 加入最终流程动效和交互时。</td><td>Open Design 演示或聊天</td></tr>
  </tbody>
</table>
`,
  },
};
