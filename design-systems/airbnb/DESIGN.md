# Design System Inspired by Airbnb

> Category: E-Commerce & Retail
> Travel marketplace。Warm coral accent，photography-driven，rounded UI。

## 1. Visual Theme & Atmosphere

Airbnb 的 2026 design 像一本恰好是 app 的 travel magazine —— pristine white canvases 让位给 full-bleed photography，interface 本身隐退，让 listings 得以呼吸。标志性的 Rausch coral-pink（`#ff385c`）用得克制但一眼可辨：search CTA、active tab indicator、primary action button、偶尔的 price 或 wishlist heart。其他一切都是 disciplined grayscale，`#222222` 承载几乎每一行 text。

让这个 system 一眼就是 Airbnb 的，是它对 content 投入了多大 *faith*。Property photos 以 hero scale 呈现，4:3，并带 edge-to-edge radius treatment。Category switching 通过 tri-tab picker（Homes / Experiences / Services）完成，搭配 3D rendered illustrated icons（pitched-roof house、hot-air balloon、service bell）—— physical、tactile、almost toy-like —— 再配上 crisp `Airbnb Cereal VF` labels。这是少见的 consumer product：3D renders 和纯 typographic UI 可以毫无 tension 地共存。

最新 surface 是 **Experiences** product line —— 使用相同 chrome，但 card density 更丰富、photography 更多，并有 center-anchored booking panel 和 sticky right-rail pricing。Listing detail pages（rooms 和 experiences）遵循紧凑模板：full-bleed hero image grid → overlapping rounded booking card（scroll 时 sticky）→ amenities → reviews（Guest Favorite awards 使用居中的大号 `4.81` rating 与 laurel-wreath lockup）→ map → host profile → disclosures。无论订房间还是 yacht tour，rhythm 都一致。

**Key Characteristics:**
- Rausch coral-pink（`#ff385c`）作为 single-accent brand color，只用于 primary CTAs 和 search button
- Full-bleed photography，4:3 / 16:9，带 gentle corner rounding（14–20px），是 primary visual vocabulary
- 3D rendered category icons 搭配 typographic tabs —— system 唯一允许 illustration 的位置
- Circular `50%` icon buttons（back arrow、share、favorite、carousel arrows）散落各处
- `Airbnb Cereal VF` 承载从 8px legal footnote 到 28px section heading 的每个 label —— single-family system
- Product-tier color coding：Airbnb Plus（magenta `#92174d`）、Airbnb Luxe（deep purple `#460479`）、Airbnb（Rausch coral）
- Guest Favorite award lockup —— centered giant rating number 夹在两个 laurel wreaths 之间，是 system 中最具识别度的 moments 之一
- Sticky booking panel，包含 price → dates → guests stack，desktop 上 pinned 到 right rail，mobile 上转为 bottom-anchored "Reserve" bar
- Sticky bottom mobile navigation（Explore / Wishlists / Log in），active-state 使用 Rausch tint

## 2. Color Palette & Roles

### Primary
- **Rausch** (`#ff385c`): Brand 的 signature coral-pink。CSS variable `--palette-bg-primary-core`。用于 primary "Reserve" button、search submit button、active tab underline、wishlist heart fill、pricing emphasis。每个页面上 visibility 最高的单一颜色。

### Secondary & Accent
- **Deep Rausch** (`#e00b41`): 更 saturated 的变体。CSS variable `--palette-bg-tertiary-core`。用于 pressed/active button states 和 gradient terminal stops。
- **Plus Magenta** (`#92174d`): CSS variable `--palette-bg-primary-plus`。Airbnb Plus product tier 的 brand color —— higher-end curated-listing offering。
- **Luxe Purple** (`#460479`): CSS variable `--palette-bg-primary-luxe`。Airbnb Luxe product tier 的 brand color —— villa/estate-level rentals。
- **Info Blue** (`#428bff`): CSS variable `--palette-text-legal`。用于 legal/informational links（terms、privacy、disclosures）—— system 中唯一的 non-monochrome link color。

### Surface & Background
- **Canvas White** (`#ffffff`): Default page background。每个 card、container、detail page 都从这里开始。
- **Soft Cloud** (`#f7f7f7`): Subtle subsurface tint，用于 footer backgrounds、map-view wrappers，以及希望从 primary white 后退一步的 "everything else" sections。
- **Hairline Gray** (`#dddddd`): 无处不在的 1px border color —— 分隔 cards、amenity rows、review panels、footer columns。Layout system 的 workhorse。

### Neutrals & Text
- **Ink Black** (`#222222`): CSS variable `--palette-text-primary`。System 的 near-black。每个 heading、body paragraph、nav label、price 都使用它。页面上约 90% text 都是它。
- **Charcoal** (`#3f3f3f`): CSS variable `--palette-text-focused`。用于 focused-state input text 和低一级 emphasis copy。
- **Ash Gray** (`#6a6a6a`): CSS variable `--palette-bg-tertiary-hover`。Secondary labels、city names 下的 "Cottage rentals" subtitle-style copy、muted footer links。
- **Mute Gray** (`#929292`): CSS variable `--palette-text-link-disabled`。Disabled buttons 和 low-priority metadata。
- **Stone Gray** (`#c1c1c1`): Tertiary dividers、icon strokes、placeholder avatars。

### Semantic & Accent
- **Error Red** (`#c13515`): CSS variable `--palette-text-primary-error`。Form validation errors、destructive-action warnings。
- **Deep Error** (`#b32505`): CSS variable `--palette-text-secondary-error-hover`。Error states 的 pressed/active variants。
- **Translucent Black** (`rgba(0, 0, 0, 0.24)`): CSS variable `--palette-text-material-disabled`。Disabled material-style labels。

### Gradient System
Airbnb 的 brand gradient 用得很少，通常只出现在 wordmark 和 search-button branded moment：

```
linear-gradient(90deg, #ff385c 0%, #e00b41 50%, #92174d 100%)
```

这条 coral → magenta sweep 是 "branded moment" —— 不作为 full surface，只作为 narrow pill fill 或 logo treatment。

## 3. Typography Rules

### Font Family
- **Airbnb Cereal VF**（primary and only）：专有 variable-weight sans-serif，承载整个 system。Fallbacks（按顺序）：`Circular, -apple-system, system-ui, Roboto, Helvetica Neue, sans-serif`。

Extracted tokens 中观察到的 weights：500、600、700。没有 400-regular —— system 的 "body" weight 是 500，让每段 text 都带 subtle extra density，读起来 confident and deliberate。

OpenType features：`salt`（stylistic alternates）用于 compact 11px 和 14px 600-weight labels —— 可能为了更紧的 numerals 和 special-character shaping。未观察到 ligature 或 fractional-numeral features。

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Section Heading | 28px / 1.75rem | 700 | 1.43 | 0 | "Inspiration for future getaways" —— page-level headings |
| Subsection Heading | 22px / 1.38rem | 500 | 1.18 | -0.44px | "What this place offers", "Meet the hosts" —— content dividers |
| Card Title | 21px / 1.31rem | 700 | 1.43 | 0 | Review panel headings、card lead titles |
| Listing Title | 20px / 1.25rem | 600 | 1.20 | -0.18px | "Small Group Yacht Tour, Unlimited Wine & Fruits" —— detail pages 上的 listing headlines |
| Subtitle Bold | 16px / 1.00rem | 600 | 1.25 | 0 | Host name、city name |
| Body Medium | 16px / 1.00rem | 500 | 1.25 | 0 | Detail pages 上的 primary body copy |
| Button Large | 16px / 1.00rem | 500 | 1.25 | 0 | "Reserve", "Become a host" |
| Button Default | 14px / 0.88rem | 500 | 1.29 | 0 | Standard button labels |
| Link | 14px / 0.88rem | 500 | 1.43 | 0 | Nav links、footer links |
| Caption Medium | 14px / 0.88rem | 500 | 1.29 | 0 | Metadata、subtitle lines（"Cottage rentals", "Villa rentals"） |
| Caption Bold | 14px / 0.88rem | 600 | 1.43 | 0 | 启用 `salt` feature —— numeric stats、small-text emphasis |
| Caption Small | 13px / 0.81rem | 400 | 1.23 | 0 | Review dates、micro-metadata |
| Micro Default | 12px / 0.75rem | 400 | 1.33 | 0 | Footer disclaimers、legal micro-copy |
| Micro Bold | 12px / 0.75rem | 700 | 1.33 | 0 | "NEW" pill labels |
| Badge Uppercase | 11px / 0.69rem | 600 | 1.18 | 0 | `salt` feature —— compact category/status badges |
| Superscript | 8px / 0.50rem | 700 | 1.25 | 0.32px | Uppercase —— price footnotes、decimal tails |

### Principles
- **One family, many weights.** Airbnb Cereal VF 处理从 8px legal 到 28px page headings 的所有内容 —— visual identity 来自 family 本身，而不是 typeface mixing。
- **500 is the new 400.** System 的 "regular" weight 是 500，让每个 paragraph 比 web default 有略更 confident 的 texture。
- **Negative tracking on display type only.** 20px+ headings 将 tracking 压缩 -0.18 到 -0.44px，显得 chiseled；body sizes 保持 0 tracking 以保证 readability。
- **Tight line-heights for headlines, generous for body.** Display type 在 1.18–1.25（tight）运行；body 和 caption 打开到 1.43，保证 long-form comfort。
- **No all-caps except at 8px.** System 中唯一的 uppercase transform 是 8px superscript —— 其他地方都用 sentence case 和 subtle weight shifts 完成工作。

### Note on Font Substitutes
Airbnb Cereal VF 是 proprietary。最接近的 open-source substitute 是 **Circular Std**（仍为 commercial）或 **Inter**（free, Google Fonts），display sizes 下 letter-spacing 减少 -0.01em。若追求严格 brand fidelity，文档中的 fallback chain（`Circular, -apple-system, system-ui`）在 macOS/iOS 上可接受，因为 `system-ui` 解析为 San Francisco，比例相近。

## 4. Component Stylings

### Buttons

**Primary CTA**（"Reserve", "Search", "Add dates"）
- Background: Rausch `#ff385c`
- Text: Canvas White `#ffffff`，Airbnb Cereal 500，16px
- Padding: 约 14px vertical，24px horizontal
- Radius: 8px（rectangular）或 50%（circular icon variant）
- Border: none
- Active/pressed: `transform: scale(0.92)` 加 2px `#222222` focus ring：`0 0 0 2px`

**Secondary Button**（"Become a host", outlined tertiary actions）
- Background: `#ffffff`
- Text: Ink Black `#222222`，Airbnb Cereal 500，14–16px
- Padding: 10px 16px
- Radius: 20px（pill）或 8px（rectangular）
- Border: 1px solid Hairline Gray `#dddddd`

**Icon-Only Circular Button**（back arrow、share、favorite、carousel controls）
- Background: `#f2f2f2`（slightly off-white）或 white with 1px translucent black border
- Icon: `#222222` outline stroke，16–20px
- Size: 32–44px diameter
- Radius: 50%
- Active/pressed: `transform: scale(0.92)`；subtle 4px white ring `0 0 0 4px rgb(255,255,255)`，用于从 colorful photography backgrounds 中分离按钮

**Disabled Button**
- Background: `#f2f2f2`
- Text: Stone Gray `#c1c1c1`
- Opacity: 0.5

**Pill Tab Button**（category selector "Homes / Experiences / Services"）
- Background: transparent
- Text: Ink Black `#222222`，Airbnb Cereal 500，16px
- Padding: 8px 14px
- Active state: label 下方 2px Ink Black underline
- 与 label 上方 36–48px 3D-rendered illustrated icon 配对

### Cards & Containers

**Listing Card**（homepage grid、search results）
- Background: `#ffffff`
- Radius: image 上 14px，text 直接位于下方 transparent background 上
- Image: 4:3 aspect ratio，full-bleed，与 image 同样 14px radius
- Padding: outer container 无 padding；image 与 metadata rows 之间 12px spacing
- Shadow: none —— separation 来自 whitespace 和 photograph 自身 radius
- Metadata pattern: line 1 city/region（16px 600），line 2 distance/duration（14px 500 Ash Gray），line 3 date range，底部 price row 带 "per night"

**Detail Page Booking Panel**（room/experience pages 上 sticky right rail）
- Background: `#ffffff`
- Radius: 14–20px
- Border: 1px solid Hairline Gray `#dddddd`
- Shadow: `rgba(0, 0, 0, 0.02) 0 0 0 1px, rgba(0, 0, 0, 0.04) 0 2px 6px 0, rgba(0, 0, 0, 0.1) 0 4px 8px 0` —— stacked three-layer subtle elevation
- Padding: 24px
- Width: 约 370px，pinned 在 viewport top 下方 120–140px
- Content: price headline → date picker → guest dropdown → primary CTA → "You won't be charged yet" footnote

**Amenity Grid Card**（listing detail pages）
- Background: `#ffffff`
- Border: row level 使用 1px solid Hairline Gray `#dddddd`（不是每 item）
- Padding: 每个 amenity row 16px vertical
- Icon + label pattern: 左侧 24px outline icon，右侧 16px 500-weight label

**Review Card**（detail pages 上单条 review）
- Background: `#ffffff`，no border
- Padding: 0（依赖 grid gaps）
- Content: 40px circular avatar + 16px 600-weight name + 14px 400 Ash Gray date 同行，下面是 14px 500 body paragraph

### Inputs & Forms

**Search Bar**（primary home page）
- Background: `#ffffff`
- Border: 1px solid Hairline Gray `#dddddd` 包裹所有三个 segments（Where / When / Who）
- Radius: 32px（full pill）
- Shadow: `rgba(0, 0, 0, 0.04) 0 2px 6px 0` —— subtle floating feel
- Structure: 三个 segments 由 thin vertical dividers 分隔，每个 segment 有 12px 500 label，下面是 14px 500 placeholder
- Submit: 右侧 Rausch circular icon button，48px diameter

**Text Input**（generic forms）
- Background: `#ffffff`
- Border: 1px solid Hairline Gray `#dddddd`
- Radius: 8px
- Padding: 14px 16px
- Focus: border 切到 Ink Black，并添加 `0 0 0 2px` black outer ring
- Error: border 切到 `#c13515`（Error Red），helper text 使用同色

**Date Picker**
- Calendar grid: 7-column layout，circular `50%` day cells，宽 40–44px
- Selected range: Ink Black `#222222` background with white numerals
- Start/end anchors: larger filled circles；middle dates 使用 Soft Cloud `#f7f7f7` tint

### Navigation

**Top Nav (Desktop)**
- Height: 约 80px
- Background: `#ffffff`
- Left: Rausch 中的 Airbnb wordmark+logo lockup（102×32px）
- Center: tri-tab category picker（Homes / Experiences / Services），36–48px 3D icons stacked above 16px 500 labels；active tab 有 2px Ink Black underline
- Right: "Become a host" text link，然后是 32px circular globe（language），再是 36px hamburger avatar menu
- Border-bottom: 1px solid Hairline Gray `#dddddd`

**Top Nav (Mobile)**
- Single-row search pill 占据全宽："Start your search" placeholder，带 small magnifier icon
- 下方：tri-tab category picker 保留（Homes / Experiences / Services）—— illustrated icons 缩到约 28px
- Bottom-fixed tab bar: Explore（active state Rausch）/ Wishlists / Log in —— 24px icons above 12px labels

**Listing Detail Secondary Nav**
- Scroll 过 hero image 后出现 sticky horizontal scroll anchor links（Photos · Amenities · Reviews · Location · Host）
- Height: 56px
- Border-bottom: 1px solid Hairline Gray

### Image Treatment

- **Primary aspect ratios**: homepage listing grids 使用 4:3，experience hero photography 使用 16:9，avatars 使用 1:1
- **Radius**: listing-grid images 14px，detail-page hero photo frames 20px，avatars `50%`
- **Image grid on detail pages**: five-photo grid，左侧单张 large-left image（50% width），右侧四张小图组成 2×2 grid，整体共享 20px outer rounded container
- **Lazy loading**: 大量使用 `loading="lazy"` 和 blurred placeholder previews
- **Carousel**: circular 32px arrow buttons overlay 在 image 上，垂直居中；dot indicators 位于 bottom edge 上方 12px

### Signature Components

**Guest Favorite Award Lockup**（高分 listing detail pages 中显著展示）
- Centered rating number，44–56px 700-weight
- 左右各一个 hand-drawn laurel-wreath SVG illustrations，约 48px tall
- 下方："Guest Favorite" label，12px 700 uppercase，`0.32px` tracking；再下方 short sub-label，14px 500 Ash Gray
- Full-width block，无 container border —— 直接置于 white canvas 上

**Tri-Tab Category Picker**（出现在每个 browse surface 顶部）
- 三个 tabs：Homes / Experiences / Services
- 每个 tab: 约 48px tall 的 3D-rendered illustrated icon，位于 16px 500 label 上方
- Experiences 和 Services 目前带一个小 navy-blue "NEW" pill（12px 700 white text on dark blue），浮在 icon top-right
- Active tab: label 下方 2px Ink Black underline

**Inspiration City Grid**（homepage "Inspiration for future getaways"）
- Desktop 上 6-column destination links grid，mobile 上 2-column
- 每个 cell: line 1 为 16px 600 city name，line 2 为 14px 500 Ash Gray rental-type subtitle（"Cottage rentals", "Villa rentals"）
- 无 images —— text-only grid
- 上方有 category tabs（Popular / Arts & culture / Beach / Mountains / Outdoors / Things to do / Travel tips & inspiration / Airbnb-friendly apartments）—— active tab 有 2px underline 和 weight shift

**Reserve Sticky Card**（listing detail pages）
- Desktop 上用户 scroll 过 hero 后 fixed 在 viewport top 下方 120px
- Mobile 上 collapse 为 full-width bottom bar，包含 "From $X / night" label 和 Rausch "Reserve" pill
- 始终显示：price headline → date display → guest selector → Rausch CTA → "You won't be charged yet" disclaimer

**Experience Host Card**（experience detail pages）
- Full-width rounded container，顶部 3:2 cover photograph
- Host avatar（circular, 56px）与 cover bottom edge 重叠 50%
- Overlap 下方：host name 16px 700，host tenure 14px 500 Ash Gray，小号 Rausch "Message host" pill button
- 用作 reviews 与 amenities/location block 之间的 transition

**"Things to know" Strip**（listing detail pages）
- 3-column grid，包含 rule/policy blocks（House rules, Safety & property, Cancellation policy）
- 每列：顶部 icon，16px 600 heading，14px 500 Ash Gray body，Ink Black underline 的 "Show more" link
- Separator: 整体 strip 顶部和底部使用 1px Hairline Gray borders

## 5. Layout Principles

### Spacing System
- **Base unit**: 8px
- **Extracted scale**: 2、3、4、5.5、6、8、10、11、12、15、16、18.5、22、24、32px —— 细粒度，少量 off-grid values 用于 pixel-perfect icon alignment
- **Section padding**: desktop 上约 48–64px top/bottom，mobile 上 24–32px
- **Card internal padding**: booking panels 和 large cards 为 24px，amenity rows 为 16px，listing-card metadata 为 12px
- **Gutter between listing cards**: desktop 24px，mobile 16px
- **Between stacked text rows**: 4–8px（非常 tight —— 强化 travel listings 的 "dense information" feel）

### Grid & Container
- **Max content width**: ultra-wide 上 1760–1920px（Airbnb 让 grid 比多数 sites 呼吸更远）；多数 detail pages 上 1280px
- **Homepage listing grid**: ≥1760px 为 6 columns，≥1440px 为 5，≥1128px 为 4，≥800px 为 3，≥550px 为 2，以下为 1
- **Detail page**: 2-column asymmetric —— main content 约 58%，sticky booking panel 右侧约 36%，gutter 约 6%
- **Footer**: 3-column Support / Hosting / Airbnb

### Whitespace Philosophy
Airbnb 信息密集但从不拥挤。Whitespace 用于 *group* —— listing cards 有 24px gutter，让每张 photograph 都像独立 object，但每张 card 下方 metadata 使用 4–8px gaps，让 price/city/date 像单一 unit。Detail-page booking panel 有 24px internal padding，但内部 rows（date picker、guest selector、CTA）以 12px 堆叠 —— card 与 page 的边界比内部 content 承担更多 separation work。

### Border Radius Scale
| Radius | Use |
|--------|-----|
| 4px | Inline anchor tags、tag chips |
| 8px | Text buttons、dropdowns、small utility buttons |
| 14px | Listing card photography、generic content containers、badges |
| 20px | Primary rounded buttons（pill shape）、large images、booking panel |
| 32px | Search bar pill、extra-large containers |
| 50% | 所有 circular icon buttons、avatars、wishlist hearts —— system signature round geometry |

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| 0 | No shadow | Listing cards、body content、text-only sections |
| 1 | `rgba(0, 0, 0, 0.08) 0 4px 12px` | Active/pressed icon buttons（如 back、share、favorite）—— subtle lift 表示 interaction |
| 2 | `rgba(0, 0, 0, 0.02) 0 0 0 1px, rgba(0, 0, 0, 0.04) 0 2px 6px 0, rgba(0, 0, 0, 0.1) 0 4px 8px 0` | Booking panel sticky card、modals、dropdown menus —— system signature three-layer elevation |
| Focus Ring | `0 0 0 2px #222222` | Active-state buttons、focused search input |
| White Separator Ring | `rgb(255, 255, 255) 0 0 0 4px` | Photographs 上 overlay 的 circular buttons —— 4px white ring 干净地将 button 从 colorful image backgrounds 中分离 |

Shadow philosophy: Airbnb 使用 **stacked layered shadows**，而不是单一 drop。Three-layer booking-panel shadow 读起来像一个 cohesive lift，但实际是三个不同 opacity/blur values 的 shadows —— 在 shadow perimeter 上创造 subtle anti-aliasing，premium 但不 heavy。

### Decorative Depth
- **Photography as depth**: system 强依赖 full-bleed photography 创造 visual depth；shadows 和 gradients 用得克制，让 photographs 承担 heavy lifting
- **Laurel wreath lockup**: Guest Favorite award 使用两个 SVG laurel illustrations，为 otherwise-flat rating number 带来 ceremonial、trophy-like presence
- **3D rendered category icons**: Homes/Experiences/Services icons 自带 soft internal lighting 和 subtle cast shadows，烘焙在 artwork 中 —— brand 唯一允许 "dimensional" illustration 的地方

## 7. Do's and Don'ts

### Do
- Rausch `#ff385c` 只保留给 primary actions 和 active-tab indicator —— 不要用装饰性用途稀释它。
- 让 photography 呼吸 —— 4:3 crops，14–20px rounded corners，不叠 text，不加 gradient scrims。
- Rausch 以下每层 text 都使用 Ink Black `#222222` —— 这是 system near-black，绝不用 true `#000000`。
- 将 tri-tab category picker 的 3D illustrated icons 与 flat typography 配对 —— 不要在同一个 surface 内混用 illustration styles。
- 叠加三层 low-opacity shadows（约 2%、4%、10%）创造 signature booking-panel elevation。
- 所有 card-to-card 和 row-to-row divider 都使用 Hairline Gray `#dddddd` 1px borders。
- Desktop 上将 booking panel 视为 sticky，mobile 上 collapse 为 bottom-anchored reserve bar。
- Metadata groups 内使用 4–8px spacing，cards 之间使用 24px —— information density 是刻意的。

### Don't
- 不要引入 Rausch / Plus Magenta / Luxe Purple product-tier palette 之外的 secondary accent colors。
- 不要把 text 放进 photographs —— captions 始终在 image 下方，绝不 overlay。
- 不要使用 all-caps labels，除了唯一的 8px superscript role。
- Icon buttons 只能是 50% 圆形 —— circular 是 system signature geometry。
- 不要给 listing cards 添加 drop shadows —— 它们置于 white canvas 上且没有 elevation。
- 不要使用 gradient backgrounds —— system 中唯一 gradient 是 wordmark 上 narrow Rausch → magenta sweep。
- 不要使用 400-regular font weight —— Airbnb Cereal 的 body weight 是 500。
- 不要用不同 display face 覆盖 Airbnb Cereal VF —— system 有意保持 single-family。

## 8. Responsive Behavior

### Breakpoints

Airbnb 声明约 60 个 breakpoints（来自 component library 的 design-time artifact），但真正有意义的 layout shifts 集中在更小的一组：

| Name | Width | Key Changes |
|------|-------|-------------|
| Ultra-wide | ≥1760px | 6-column listing grid，1760–1920px max content width |
| Desktop XL | 1440–1759px | 5-column grid，full nav visible，sticky right-rail booking panel |
| Desktop | 1128–1439px | 4-column grid，sticky booking panel 保留 |
| Laptop | 1024–1127px | 3–4 column grid，category nav 保持 horizontal |
| Tablet | 800–1023px | 3-column grid，global search 可能 collapse 为 single-row pill |
| Small tablet | 550–799px | 2-column grid，booking panel drop 为 full-width inline block |
| Mobile | 375–549px | 1-column stacked layout，bottom-fixed tab bar 出现（Explore / Wishlists / Log in） |
| Small mobile | <375px | Edge padding 收紧到 16px；category-picker icons 缩到约 28px |

### Touch Targets
所有 interactive elements 都达到或超过 44×44px。Circular icon button family 明确为 32–44px，并带 8–12px extended hit-area padding。Rausch primary Reserve button 约 48px tall。Tri-tab category picker 的 hit area 是完整 label-plus-icon rectangle（通常每个 tab 约 64×80px）。

### Collapsing Strategy
- **Nav**: Tablet 及以上保留 Airbnb wordmark + tri-tab picker；mobile 上 picker 滑到 search pill 下方，globe/avatar controls 移到底部 tab bar。
- **Search bar**: Desktop 上是三个 segment 的 pill（Where / When / Who）和 Rausch circular submit button；mobile 上 collapse 为 single-row "Start your search" pill，tap 后打开 full-screen search sheet。
- **Booking panel**: ≥1128px 为 sticky right-rail；800–1127px 内联到 main content column；<800px 为 bottom-fixed "Reserve" pill。
- **Listing grid**: 跨 breakpoints 依次 reflow：6 → 5 → 4 → 3 → 2 → 1 columns。
- **Detail-page image grid**: Desktop 上 five-image layout（1 large + 4 small）；mobile 上变为 swipeable full-bleed carousel，带 page-dot indicators。
- **Footer**: 3-column layout 在 <800px collapse 为 stacked single-column。

### Image Behavior
- 全局使用 `loading="lazy"`，并优先提供 blurred `im_w=` URL-parameterized preview thumbs
- Responsive images 通过 Airbnb 的 `muscache.com` CDN 使用 `im_w` query parameter 进行 width-based delivery（`im_w=240`、`im_w=720`、`im_w=1200`、`im_w=2400`）
- 无 art-direction crops —— 同一 image 跨 breakpoints 放大/缩小
- Carousels 自动推进 photo height，以在任何 source aspect 下保持一致 4:3 ratio

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: "Rausch (#ff385c)"
- Page background: "Canvas White (#ffffff)"
- Subsurface: "Soft Cloud (#f7f7f7)"
- Heading / body text: "Ink Black (#222222)"
- Secondary text: "Ash Gray (#6a6a6a)"
- Border / divider: "Hairline Gray (#dddddd)"
- Error: "Error Red (#c13515)"
- Info link: "Info Blue (#428bff)"
- Luxe tier accent: "Luxe Purple (#460479)"
- Plus tier accent: "Plus Magenta (#92174d)"

### Example Component Prompts
- "创建 primary Reserve button：Rausch (#ff385c) background，white Airbnb Cereal 500-weight label at 16px，14px × 24px padding，8px border-radius，无 shadow。Active/pressed 时添加 `transform: scale(0.92)`，并带 2px Ink Black focus ring（`0 0 0 2px #222222`）。"
- "构建 listing card：4:3 full-bleed photograph，14px border-radius，无 container shadow；image 下方堆叠三行 text，gaps 为 4px：city name 使用 16px 600 Ink Black，rental type 使用 14px 500 Ash Gray (#6a6a6a)，price range 使用 16px 500 Ink Black，并带 14px `per night` suffix。"
- "设计 sticky booking panel：white background，14px border-radius，1px Hairline Gray (#dddddd) border，3-layer elevation shadow（`rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px 0, rgba(0,0,0,0.1) 0 4px 8px 0`），24px padding，370px width，desktop 上 pinned 在 viewport top 下方 120px。Contents：price headline、date picker、guest dropdown、Rausch primary CTA，以及 12px Ash Gray `You won't be charged yet` disclaimer。"
- "创建 tri-tab category picker：三个 equal-width tabs，label 为 Homes、Experiences、Services；每个 tab 有约 48px 3D-rendered illustrated icon（house、balloon、bell），位于 16px 500 Ink Black label 上方；active tab 有 2px Ink Black underline；Experiences 和 Services icons top-right 添加一个小 12px 700 white `NEW` pill，背景 dark navy。"
- "渲染 Guest Favorite award lockup：居中的 rating number，52px 700-weight Ink Black，左右 flank hand-drawn SVG laurel wreaths，约 48px tall；下方 12px 700 uppercase `GUEST FAVORITE` label，0.32px tracking；sub-label 使用 14px 500 Ash Gray；full-width block 直接置于 white canvas，无 container border。"

### Iteration Guide
用此 design system refine 已生成 screens 时：
1. 一次专注 ONE component。
2. 引用本文中的具体 color names 和 hex codes（例如 "Ink Black #222222"，不要说 "dark gray"）。
3. 用 natural language descriptions 搭配 measurements（例如 "subtle three-layer elevation"，而不是一长串 shadow string）。
4. 描述想要的 "feel"（"magazine-like, photography-first" vs "dense utility"）。
5. Body 默认始终使用 Airbnb Cereal VF 500-weight，emphasis 使用 600–700 —— 永远不要 400。
6. 保持 Rausch pink 稀少 —— 如果一个 viewport 中出现超过一个 Rausch-colored element，考虑是否应将其中一个 neutralized。

### Known Gaps
- **Homepage listing grid cards**: airbnb.com 的 primary visual surface（main property-card grid）没有在 extracted homepage screenshots 中被完整捕获 —— content 只部分加载。上方 Listing Card specs 从 Inspiration grid structure 和 Airbnb broader conventions 推断；production use 前请对 live site 确认 exact aspect ratios 和 metadata hierarchy。
- **Experiences category icons**: Homes / Experiences / Services 的 3D illustrated icons 以 raster assets 提供；它们的 exact source-file specifications（SVG vs PNG、rendered pixel dimensions）未在此记录。
- **Animation and transition timings**: 未捕获 —— static extraction scope。
- **Dark mode**: Airbnb 在 extracted product surfaces 中没有 native dark mode；本文只描述单一 light-mode theme。
