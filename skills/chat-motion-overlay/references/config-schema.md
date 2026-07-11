# 配置结构

当用户需要默认值以外的设置时，提供一个 JSON 文件。

## 示例

```json
{
  "container": "wechat",
  "avatarMode": "mixed",
  "deviceFrame": "iphone-dynamic-island",
  "nicknameMode": "first-message-only",
  "deliveryFormat": "mov",
  "showTimestamp": true,
  "participants": {
    "Alice": {
      "side": "left",
      "preset": "female-fox-yellow"
    },
    "Bob": {
      "side": "right",
      "preset": "male-penguin-blue",
      "uploadPath": "/path/to/bob-avatar.png"
    }
  }
}
```

## 字段

- `container`
  - `none`: 仅显示独立气泡
  - `wechat`: 微信风格界面外壳
  - `telegram`: Telegram 风格界面外壳
  - `messenger`: Facebook Messenger 风格界面外壳

- `avatarMode`
  - `preset`: 仅使用工程包内置的预设头像
  - `upload`: 要求所有参与者都使用上传的头像文件
  - `mixed`: 在不同参与者之间混合使用预设头像和上传头像

- `deviceFrame`
  - `none`
  - `iphone-dynamic-island`
  - `container: none` 仅支持 `deviceFrame: none`；应用容器可以使用手机边框

- `nicknameMode`
  - `hidden`
  - `first-message-only`
  - `always`

- `deliveryFormat`
  - `mov`: `MOV（透明背景，可直接导入剪映 / PR / FCP 叠加）`
  - `webm`: `WebM（透明背景，适合网页 / 浏览器播放）`
  - `remotion`: `Remotion 工程（适合继续编辑和拼装）`
  - `hyperframe`: `Hyperframe 工程（适合作为模块继续复用）`
  - `json`: `JSON 数据（适合程序处理 / 自定义渲染）`
  - `preview`: `预览图 / 预览工程（适合先确认效果）`

- `showTimestamp`
  - boolean

- `participants`
  - 键是聊天记录或截图中的发言者姓名。
  - `side`：`left` 或 `right`；同一位参与者必须始终位于同一侧。
  - `preset`：可选的内置预设头像键。
  - `uploadPath`：可选的本地头像文件路径，在准备工程包时使用。
  - 如果省略，则从聊天记录中推断参与者，并为其分配固定的预设头像。
  - 在生成的工程包中，会移除本地 `uploadPath` 值，只保留复制后的 `uploadAsset` 名称。

## 预设头像键

- `female-bunny-pink`
- `female-cat-orange`
- `female-fox-yellow`
- `male-bear-mint`
- `male-penguin-blue`
- `male-koala-lilac`
