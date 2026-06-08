# Assets — sourcing canon for icons, logos, illustrations, photography, video

当某个 enrichment archetype 确实需要外部 asset 时，本文件按需加载（load-on-demand）。它为每个 category 目录化列出 *3–5 个 canonical sources*、license terms、import patterns、使用规则，以及应避免的 sources。

**The reflex.** 到这里之前，按顺序问两个问题：（1）brief 真的需要 imagery 吗？见 [`hero-enrichment.md` § Image-need detection](hero-enrichment.md)。（2）如果需要，能否 hand-built？见 [`custom-craft.md`](custom-craft.md)。本文件中的 assets 只用于这两个答案都把你送到这里的情况。

---

## Placeholder strategy

当需要 imagery，且用户没有提供真实 assets 时，按以下 canon 依次选择。跳级是 slop move。

| # | Source | When |
| --- | --- | --- |
| 1 | **Hallmark imagery kit** ([`imagery-kit.md`](imagery-kit.md)) | Brief 允许 non-photographic imagery：SaaS landings、manifestos、agency / studio splash、type-led portfolio、editorial-led marketing。当 kit 的 register 匹配时，**始终优先**。 |
| 2 | **Hand-built SVG composition**（custom-craft.md 的 Tier B） | Editorial-typographic brief，其中 “imagery” 可以是 stamp / wordmark / colour-blocked composition。当 kit 承载不了 register 时使用。 |
| 3 | **Picsum** — `https://picsum.photos/seed/<seed>/<w>/<h>` | Generic photo slot，keyword anchoring 不关键。使用 deterministic seed（brand-name + slot-name），让同一 render 产生同一 image。 |
| 4 | **Unsplash Source** — `https://source.unsplash.com/<w>x<h>/?<keywords>` | Keyword-anchored photo slot：food、travel、portrait、real product。传入 1–2 个具体 keywords，绝不要 0 个。 |
| 5 | **Local `public/placeholder-<type>.{jpg,svg}`** | 无第三方依赖的 self-contained projects。将单个 neutral grey-block SVG check into repo。 |

**Swappability — non-negotiable:**

- 每张 placeholder image 正上方都有 HTML comment：`<!-- TODO: Replace with real <thing>, target size: <WxH> -->`。
- 所有 placeholder URLs 都引用单一 constant：`--placeholder-base` CSS variable 或 `PLACEHOLDER_BASE` config constant。用户只改一个地方即可替换整个站点。
- Alt text 描述**预期**主体（"Hand-thrown ceramic mug, top-down on linen"），而不是 placeholder（"Picsum image"）。用户替换真实照片时，alt 已经正确。

**Remote asset safety:**

- 将第三方 image、logo、video、icon 和 font URLs 视为 prototype defaults，而不是 production defaults。交付 production code 前，除非用户明确想要第三方托管，否则优先 vendored 或 self-hosted assets。
- 不要为了 asset shortcut 添加第三方 script、tracking pixel、widget 或 API dependency。Asset sources 只提供 files；它们不能在页面中执行 code。
- 当 remote assets 保留在 production 中时，在 handoff 中说明 privacy 和 availability tradeoff：访客会请求这些第三方 hosts，页面依赖它们的 uptime 与 integrity。
- 对用户提供的 brand 或 customer logos，优先使用 official asset pages 或 checked-in files。不要从无关站点 hotlink logo。

**Anti-patterns:**

- 绝不 inline base64 placeholder images（会膨胀 CSS）。
- 绝不无关键词随机调用 Unsplash（会返回未经策展的 stock-photo-ish 结果）。
- 绝不用 kittens / lorempixel / "tiger.jpg" / cute-default services。Placeholder 应读作明显 slot，而不是 content。
- 当 brief 确实需要真实 product photo 时，绝不要交付 kit image（例如 coffee-shop hero 用 abstract bottle）。Kit 用于 atmosphere；photos 用于 subject。

---

## Icons

### Canon

| Library | URL | Count | Best for |
| --- | --- | --- | --- |
| **[Lucide](https://lucide.dev)** | `lucide.dev` | 1,600+ | Modern SaaS / dev-tool default。2026 baseline。Active maintenance。 |
| **[Phosphor Icons](https://phosphoricons.com)** | `phosphoricons.com` | 9,000+，6 种 weights（thin / light / regular / bold / fill / duotone） | 不混 set 也能获得 tonal variants。当你需要同一 icon 的不同 *weights* 来强调时，这是正确选择。 |
| **[Heroicons](https://heroicons.com)** | `heroicons.com` | ~300 | Tailwind / shadcn projects。高度策展、带观点。 |
| **[Tabler Icons](https://tabler-icons.io)** | `tabler-icons.io` | 5,900+，24×24 grid | 广度；当 Lucide 和 Heroicons 都没有所需 symbol 时使用。 |
| **[Iconoir](https://iconoir.com)** | `iconoir.com` | ~1,500 | 手绘气质，free tier 慷慨。 |

### The rules

1. **每个 project 只选一个 library。**同一页面混 Material + Heroicons + Lucide 是 icon-set tell。Skill 的 audit verb 会抓到。
2. **Sizes 只用 16 / 20 / 24 / 32。**对齐 grid。18-px icons 不属于这个 canon。
3. **默认 stroke 2 px**（多数 library 的 regular weight）。只有在 icons 小于 20 px 或用作强调时，才切到 bold（2.5 px）。
4. **Monochrome with `currentColor`。**Icons 继承 text colour。Brand-coloured icons 只用于唯一 primary CTA，不作为 decoration。
5. **No emoji-as-icon。**Emoji 破坏 alignment、accessibility 和 brand consistency。使用真正 icon library。

### Import patterns

```jsx
// Lucide — React (most common)
import { ArrowRight, Check, X } from "lucide-react";
<ArrowRight size={20} strokeWidth={2} />

// Phosphor — React, with weight prop
import { ArrowRight } from "@phosphor-icons/react";
<ArrowRight size={20} weight="regular" />

// Heroicons — React or static HTML
import { ArrowRightIcon } from "@heroicons/react/24/outline";

// Tabler — vanilla HTML via CDN
<svg width="20" height="20"><use href="https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/arrow-right.svg" /></svg>
```

### Avoid

- **Font Awesome free** — 臃肿、过时。2018-SaaS look；600+ 个 generic glyphs 全都读作 “I picked the icons before designing the page”。
- **Material Icons in a non-Material project** — 会带来与其他部分不匹配的 Google look。
- **Stroke widths 不一致的 icon packs** — 选择一个 icons 共享 weight 的 library；折衷混搭会读成随机。
- **Emoji as semantic icons** — colour、size、weight、alignment 全不可控。

---

## Brand / company logos

### Canon

| Source | URL | Count | Best for |
| --- | --- | --- | --- |
| **[Simple Icons](https://simpleicons.org)** | `simpleicons.org` | 3,400+ | 行业标准。Monochrome SVG + 每个 brand 的 official hex。MIT licensed。Logo walls 默认选择。 |
| **[SVGL](https://svgl.app)** | `svgl.app` | 600+ | Curated、hand-picked、no spam。质量门槛高于 Simple Icons。 |
| **[theSVG](https://thesvg.org)** | `thesvg.org` | 4,000+，含 dark/light/mono/wordmark variants | 面向 AI 的 npm + MCP server。如果 stack 支持，它是 Simple Icons 的 superset。 |
| **[Brandfetch](https://brandfetch.com)** | `brandfetch.com` | 22M+ brands | Paid API。Logo + colours + fonts + guardrails。适合构建要求用户输入 “what's your domain?” 并自动 back-fill brand 的 CMS / form。 |
| **Official brand asset pages** | Per company | — | 准确性重要时始终先查。多数 brands 都提供 media-kit page（例如 `vercel.com/design`）。 |

### The rules

1. **Logo walls: monochrome only。**使用 Simple Icons 默认 colour 或 official monochrome variant。混合 full-colour logos 会读作 2018-SaaS。
2. **按高度对齐，不按宽度对齐。**选择 baseline（通常 32–48 px height），让 width 自由。Brand proportions 很重要；stretching 是 tell。
3. **Gutter 是 height 的 2–3×。**Logos 需要呼吸。32-px logos 的 wall 需要 64–96-px gutters。
4. **No hairline borders, no glow halos。**只把 marks 放在页面上。

### Import patterns

```html
<!-- Simple Icons via CDN — easiest -->
<img src="https://cdn.simpleicons.org/github" alt="GitHub" height="32">
<img src="https://cdn.simpleicons.org/figma/aaaaaa" alt="Figma" height="32"> <!-- monochrome override -->

<!-- npm -->
<!-- npm install simple-icons -->
import { siGithub } from 'simple-icons/icons';
<svg viewBox="0 0 24 24"><path d={siGithub.path} fill="currentColor" /></svg>

<!-- SVGL via API -->
<img src="https://api.svgl.app/?slug=vercel" alt="Vercel">
```

### Avoid

- **Full-colour logo grids。**视觉混乱；读作 2018。
- **Stretched / squished marks。**始终保持 aspect ratio。
- **Template kits 里的 placeholder customer logos**（"ACME"、"Initech"、"Hooli"）。用真实 customer logos，或者完全跳过 logo wall；fake social proof 比没有 social proof 更糟。
- **Mixing wordmarks with marks。**同一个 wall 选择一种 treatment（all-monogram 或 all-wordmark）。

---

## Generated illustration（enrichment hierarchy 中的 Tier C）

当 characters 或 specific scenes 无法经济地 hand-built 时使用。**始终 post-process。**完整纪律见 [`custom-craft.md`](custom-craft.md) Tier E。

### Canon

| Model | URL | Cost | Best for | Output |
| --- | --- | --- | --- | --- |
| **[Nanobanana 2 / Gemini 2.5 Flash Image](https://ai.google.dev/gemini-api/docs/image-generation)** | Google AI | $0.039 / image | 跨 panels 的 character consistency、快速 iteration、通过 reference images 遵循 brand-style、带文字的 infographics | PNG（支持 transparent） |
| **[Recraft V4](https://www.recraft.ai/)** | recraft.ai | ~$0.04 / image | **唯一具备 production-grade SVG output 的 model。**Logos、icons、需要 scale 的 illustrations。 | SVG + PNG |
| **[Midjourney v8](https://www.midjourney.com)** | midjourney.com | ~$0.14 / image | Aesthetic beauty、atmospheric stills、artistic direction | PNG |
| **[Flux 2](https://blackforestlabs.ai/)** | blackforestlabs.ai | ~$0.03 / image | Photorealism：skin、fabric、product detail、hands | PNG |

### The rules

1. **Always post-process。**添加 grain、asymmetric crop、hand-drawn overlays、colour grading。Raw model output 100% 读作 AI。
2. **使用 reference images** 保持 brand consistency。Nanobanana 2 的 character-consistency feature 是它相对 Midjourney 的差异点；把 brand assets 喂给它，让 generations 保持 on-style。
3. **在 macrostructure comment 中 stamp model**（`generated: nanobanana-2 · post-processed`）。Provenance 很重要。
4. **验证 SynthID watermark** 出现在 Google-generated images 上。
5. **No animation。**这些 models 都不输出 multi-frame；需要 motion 时通过 custom-craft 组装。

### Avoid

- **Symmetrical compositions** — 算法感；AI tell。始终 asymmetric crop。
- **Smooth-mesh-blob faces** — 2024 generic AI character look。
- **Default lighting + blue-tinted backgrounds** — generic AI aesthetic。Prompt 中指定 brand-anchored colour 和 unusual lighting。
- **Six fingers / doubled furniture / impossible rooms** — 2026 年少见了，但仍潜伏。检查。
- **Shipping unmodified output** — 见 rule 1。

### Prompting recipe（Nanobanana 2）

```
Subject: <one specific concrete subject> in <one specific concrete pose>.
Style: <named style — "risograph print", "1960s editorial illustration",
        "ink-on-paper line drawing", NOT "modern flat" or "clean illustration">.
Composition: asymmetric, <off-centre subject>, <unusual crop>.
Lighting: <named lighting — "side-lit, late afternoon", "overcast diffuse">.
Reference: <attach brand asset / mood board for character consistency>.
Constraints: no smooth mesh-gradient, no aurora background, no symmetric layout,
             no smiling people-on-laptops poses.
```

具体 prompt 产生具体 image。Generic prompt 产生 AI tell。

---

## Library illustrations（Tier D，不是第一选择）

当 budget 和 timeline 迫使走捷径，且 Tier C 也过重时使用。

### Canon

| Source | URL | Licence | Best for |
| --- | --- | --- | --- |
| **[Storyset](https://storyset.com)** | storyset.com (Freepik) | Free with attribution；paid removes | Animated SVG illustrations，可切换 element animation，并支持站内 colour customisation。Onboarding flows、feature explanations。 |
| **[Humaaans](https://www.humaaans.com)** | humaaans.com (Pablo Stanley) | CC0 | 可 mix-and-match 的 characters，具备多样 poses / outfits / skin tones。需要 humans 但不想进入 stock-photo 领域的 hero sections。 |
| **[unDraw](https://undraw.co)** | undraw.co | MIT | Open SVG illustrations，导出时可换色。如果定制过仍受尊重；未定制则饱和且一眼可认。 |
| **[IRA Design](https://www.iradesign.io)** | iradesign.io (Creative Tim) | Free / paid | Moody、sophisticated、isometric scenes，用于 B2B / enterprise。 |
| **[Open Peeps](https://www.openpeeps.com)** | openpeeps.com | CC0 | Hand-drawn character library，naive style。位于 photography 和 illustration 之间。 |

### The rules

1. **始终将 colour custom 到 brand anchor hue。**Library default colour 就是 library look。换掉它。
2. 如果可以，**crop 或 recompose**。未修改 illustration 已经出现在一百个 competitor sites 上；即便只改 crop 也能区别开。
3. **每个 project 只用一个 library。**混用 Storyset + Humaaans + unDraw = visual chaos。选一个，坚持到底。
4. **避开 giveaway poses**：抱着 laptop 的男人 + floating speech bubble、戴 headset 站在云上的女人、抱着 giant phone 的角色。你 2021 年在 Dribbble 看过的，观众也看过。
5. **>3 uses 时 commission custom。**如果 illustration 出现在 hero、feature block 和 promotional material 中，单件 commission 成本（$200–$600 freelancer，$399–$999/month unlimited subscription）在 brand consistency 上胜过 libraries。

### Avoid

- **Open Doodles** — 过时。2019 hand-drawn aesthetic 已被 2026 tactile rebellion 取代。
- **"Modern flat" generic poses** — 整套 aesthetic 是 AI training-distribution default。
- **AI-generated illustrations 再套 library filters** — 两个世界最糟的组合。
- **Stock photography with character cutouts pasted on top** — 与物理现实打架，看起来诡异。

---

## App mockups / device frames

### Canon

| Source | URL | Best for |
| --- | --- | --- |
| **[Browserframe](https://browserframe.com)** | browserframe.com | Browser + mobile device frames with annotation。为 SaaS demo screenshots 构建。 |
| **[Ray.so](https://ray.so)** | ray.so | macOS window frames 中的 code snippets。非常适合 developer-tool landing pages。 |
| **[Cleanmock](https://cleanmock.com)** | cleanmock.com | Mobile device frames；minimalist；适合 app-store-listing-style heroes。 |
| **[Mockup.style](https://mockup.style)** | mockup.style | Versatile device + browser builder，Figma-friendly export。 |
| **[Device Shots](https://deviceshots.com)** | deviceshots.com | Free device generator，多个 frame styles，快速出图。 |

### The rules

1. **SaaS / web apps 用 browser frame。**它传达“这是在 web 上真实运行的东西”。使用 Browserframe 或 hand-build（1-px hairline + 三个 macOS dots 就足够）。
2. **干净 splits 使用 floating-no-frame。**当 screenshot 美到可以独立站立时使用。需要高质量 screenshot。
3. **Device frame（iPhone / iPad）谨慎使用。**最多一个 hero mockup；再多就读作 generic template work。
4. **Tilt 1–3°。**增加生命感。0° 读起来 flat；5°+ 读起来醉。
5. **只用 numbered-pin annotations。**Numbered circles（1、2、3）+ 下方对应 callout legend。不要 arrow-and-label callouts（2018 UX）。只标注*新颖* features，不标注显而易见的东西。

### Avoid

- **Glossy plastic device bezels** — 像 2015。使用 minimalist frames 或 no frame。
- **Annotation chaos** — pins 比 pixels 还多。三个 numbered pins 已经很多；五个太多。
- **Stretched aspect ratios** — 绝不要超出 natural ratio resize mockup。
- **Screenshot 中可见 Figma prototyping artifacts**（ghost-out frames、"hover" indicators）。清理 export。

---

## Hero / demo video

### Canon（没有自己的 footage 时）

| Source | URL | Licence | Best for |
| --- | --- | --- | --- |
| **[Mixkit](https://mixkit.co)** | mixkit.co (Envato) | No registration，no attribution required，1080p+ HD | Quality-to-effort sweet spot。 |
| **[Coverr](https://coverr.co)** | coverr.co | Free commercial use | 针对 hero-section backgrounds 和 ambient loops 优化。 |
| **[Pexels Videos](https://www.pexels.com/videos/)** | pexels.com/videos | CC0 | 最大 free library；可用 4K。Volume play。 |
| **[Videvo](https://www.videvo.net)** | videvo.net | Tiered（free + pro） | Community footage + motion graphics。 |

### The rules

1. **`<source>` 顺序中的 codec chain：AV1 → WebM VP9 → MP4 H.264。**Browsers 会选择第一个支持项。相同质量下 AV1 比 H.264 小 30–50%；H.264 是 universal fallback。
2. **始终 autoplay-muted-loop-playsinline。**
   ```html
   <video autoplay muted loop playsinline preload="metadata"
          poster="/hero-poster.webp" fetchpriority="high">
     <source src="/hero.av1.mp4"  type='video/mp4; codecs="av01.0.05M.08"'>
     <source src="/hero.vp9.webm" type="video/webm">
     <source src="/hero.h264.mp4" type="video/mp4">
   </video>
   ```
3. **始终包含 `poster=""`**：防止 layout shift，也给 reduced-motion users 一个静态 fallback。
4. **LCP element 上使用 `fetchpriority="high"`。**Hero 上**绝不要 `loading="lazy"`**，那会杀死 LCP。
5. **VTT captions for accessibility。**即便是 muted demo loops；用户可能 unmute。
6. **Autoplay 不带声音。**Browsers 本来也会 block，但原则很明确。

### Compression

- **[ffmpeg](https://ffmpeg.org)** 用于精确控制：
  - VP9: `ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 0 -crf 30 -c:a libopus -b:a 128k output.webm`
  - AV1: `ffmpeg -i input.mp4 -c:v libaom-av1 -crf 30 -c:a aac output.mp4`
  - H.264: `ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 23 -c:a aac output.mp4`
- **[HandBrake](https://handbrake.fr)** 用于 GUI / batch：从 "Vimeo YouTube HQ 1080p" preset 开始，web 场景下 bitrate 降到 3–4 Mbps。

### Avoid

- **Watermarked stock** — 角落可见 “Pexels.com” stamps。
- **30 fps labelled as 60 fps** — 在现代 displays 上会露馅。
- **Music-heavy demos without a mute toggle** — 排斥 accessibility users 和嘈杂环境。
- **Hero video 上的 `loading="lazy"`** — 杀死 LCP，拖垮 Core Web Vitals。

---

## Photography

### Canon

| Source | URL | Licence | Best for |
| --- | --- | --- | --- |
| **[Unsplash](https://unsplash.com)** | unsplash.com | CC0 | 最大 free collection，moody / cinematic，每周 community uploads。Starting point。 |
| **[Pexels](https://www.pexels.com)** | pexels.com | CC0 | 3.5M+ free photos，多样 photographers。 |
| **[Nappy.co](https://www.nappy.co)** | nappy.co | Free + paid | 为 diversity 和 representation 策展。Premium visual direction。 |
| **[Shotstash](https://www.shotstash.com)** | shotstash.com | Free | Lifestyle / minimal aesthetic。较小但 carefully curated。 |
| **[Open Peeps](https://www.openpeeps.com)** | openpeeps.com | CC0 | 当你想要 diversity 但不想要 photo-stock look 时的 illustrated character library。 |

### The rules

1. **始终 tweak source。**Gradient overlay、crop、desaturation、blur 或 brand-colour wash。未修改 Unsplash photo 已出现在一百个 competitor sites 上；即使改变 crop 也能区别开。
2. **Tone match brief。**Enterprise / B2B：neutral palettes、natural lighting、真实 workspaces。Consumer / lifestyle：warm lighting、human emotion。Tech / startup：minimal backgrounds、hands-on interaction。
3. **Diverse representation。**Nappy.co 是 intentional curation 的最佳 free source；Unsplash 和 Pexels 也有 diversity，但需要搜索努力。
4. **Aspect ratios fit。**Hero photography 通常 desktop 需要 16/9，mobile 需要 4/3 或 9/16。

### Avoid

- **Photos with visible logos / trademarks** — copyright risk。
- **Over-processed HDR** — 过时、不真实。
- **Staged "team photo" shots** — generic，读作 stock。
- **Unmodified Unsplash** — 本周已有一百个 competitor sites 用了同一张。

---

## Abstract backgrounds

### Canon

| Source | URL | Output | Best for |
| --- | --- | --- | --- |
| **CSS gradients（native）** | n/a — write them | Zero bytes，GPU-composited | 默认选择。Linear 或 radial；最多 2–3 个 colour stops。 |
| **[Mesh Gradient Generator](https://www.learnui.design/tools/mesh-gradient-generator.html)** | learnui.design tools | Figma / SVG export | Apple-style mesh gradients；export 带 organic noise。 |
| **[fffuel.co](https://www.fffuel.co/)** | fffuel.co | SVG | `gggrain` 用于 grain noise；`ffflux` 用于 fluid gradients；`uuunion` 用于 wavy meshes。Composable。 |
| **[CSS Gradient](https://cssgradient.io)** | cssgradient.io | CSS strings | 快速 gradient picker；copy-paste ready。 |

### The rules

1. **CSS gradients first。**零字节、无限 scale、可用 `@property` 平滑 animate。如果 CSS gradient 能完成任务，绝不要转向 SVG 或 images。
2. **Two to three colour stops。**超过三个会读作 generated。选择共享 hue 且按 lightness 步进的 stops。
3. **Grain via SVG `<feTurbulence>`**：opacity < 0.1，`mix-blend-mode: multiply`。便宜、无 asset、像 paper。
4. **只用于 hero 或 accent card，绝不 page-wide。**100-vh gradient 是 tell；40-vh hero gradient + 其余页面 flat paper 是 intentional。
5. **Whole-page gradients 不 animation。**Hero accent 上 30-s subtle drift 允许；全页面 slowly-rotating mesh-gradient 是新的 aurora-blob anti-pattern。

### Recipe（CSS gradient + SVG grain）

```css
.hero {
  background:
    linear-gradient(135deg,
      color-mix(in oklch, var(--color-paper) 100%, var(--color-accent) 4%),
      color-mix(in oklch, var(--color-paper) 100%, var(--color-paper-2) 50%));
  position: relative;
}

.hero::after {
  content: "";
  position: absolute; inset: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  opacity: 0.06;
  mix-blend-mode: multiply;
  pointer-events: none;
}
```

### Avoid

- **Aurora blobs** — 2022 Dribbble look。Critical anti-pattern。
- **Purple-to-cyan mesh** — 2023 default。Critical anti-pattern。
- **Floating orbs / spheres** — generic 3D ambient。Critical anti-pattern。
- **Particle / starfield** — 2010s nostalgia，分散注意力。
- **Animated mesh-gradient on the whole page** — 旋转 gradient banner 的现代等价物。

---

## Lottie / Rive（Tier F，last resort）

### Canon

| Source | URL | Best for |
| --- | --- | --- |
| **[LottieFiles](https://lottiefiles.com)** | lottiefiles.com | Lottie ecosystem。Free + pro tiers；npm + CDN；Figma plugin；AI creator。 |
| **[Rive](https://rive.app)** | rive.app | 带 state machines 的 interactive real-time animations。Native runtime；比 Lottie 更适合 app UI micro-interactions。 |

### The rules

1. **Lottie is last resort。**只有当复杂 character motion 无法 hand-built 时才用。见 [`custom-craft.md`](custom-craft.md) Tier F。
2. **Custom-commissioned over library pulls。**能贴合你 brand 的 LottieFiles community animation 是存在的；既贴合又不像每个其他 LottieFiles community animation 的，很少。Hero work 请 commission（Upwork 上 $100–$300；studio $1,000+）。
3. **文件大小 < 2 MB。**更重就输给自己的 loading state。
4. **Pause / resume support。**Accessibility 必需（motion-sensitive users 需要控制）。
5. **Reduced-motion fallback** 到 static keyframe。必需。
6. **不要把 Lottie 用在 CSS 能做的事情上。**Spinning logos、checkmark draws、loading spinners、hover micro-interactions 都属于 CSS territory。Skill 的 slop test 会抓 “Lottie shortcut” anti-pattern。

### Avoid

- **2019-era over-smooth animations。**看起来过时，缺少 character。
- **比页面本身还重的 animations**：200 KB 页面配 5 MB Lottie files。
- **Animations without pause / resume** — accessibility fail。
- **LottieFiles community pulls used unmodified** — 读作 “I picked this from a library”。

---

## Quick-reference: which source for which job

| Need | First reach | Second reach |
| --- | --- | --- |
| UI icon（chevron、check、X） | Lucide | Phosphor / Heroicons |
| Brand logo for a wall | Simple Icons | SVGL / theSVG |
| A hero illustration the brand owns | Hand-build（Tier A or B） | Commission custom |
| A hero illustration that's character-driven | Nanobanana 2（Tier C） | Commission, then library |
| An SVG-format illustration that needs to scale | Recraft V4 | Hand-build in Figma → SVG |
| A photograph with diversity | Nappy.co | Unsplash with manual tone-tweak |
| A demo video of your product | Custom screen recording | (skip; no stock fits) |
| A textured background | CSS gradient + SVG grain | Mesh Gradient Generator |
| A character animation | Custom Lottie commission | LottieFiles community + customise |
| A loading spinner | CSS conic-gradient | (don't reach for Lottie) |
| A checkmark draw on confirm | SVG `stroke-dasharray` | (don't reach for Lottie) |

犹豫时：自己构建。2026 年，阻力最小的路径和最少 AI tell 的路径是同一条。
