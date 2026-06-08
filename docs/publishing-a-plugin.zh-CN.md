# 发布 Open Design 插件

Open Design registry publishing 在 v1 中由 GitHub 支撑。CLI 仍是 canonical workflow；产品 UI 和 agent flows 只是包装这些命令。

## 1. Scaffold

```bash
od plugin scaffold --id figma-workflow --title "Figma workflow" --out ./plugins/community
```

Scaffold 命令会创建 `./plugins/community/figma-workflow/`。Plugin IDs 必须为小写、以字母开头，并且只能使用 `[a-z0-9._-]`；slash-separated registry paths 用于 catalogs，不用于 `od plugin scaffold`。生成的 `open-design.json` 是与 `SKILL.md` 并列的 Open Design sidecar。

## 2. Validate And Pack

```bash
od plugin validate ./plugins/community/figma-workflow --no-daemon
od plugin pack ./plugins/community/figma-workflow
```

Registry 接受任何能 validate 和 pack 的内容。Source repository 除了 `SKILL.md` 加 `open-design.json` 之外，不需要特殊布局。`od plugin pack` 默认把 archive 写到 plugin folder 旁边。

## 3. Authenticate

```bash
od plugin login
od plugin whoami --json
```

这些命令会包装 GitHub CLI。Tokens 留在 `gh` 中；Open Design 不保存 GitHub credentials。

## 4. Publish

```bash
od plugin publish figma-workflow --to open-design --repo https://github.com/acme/figma-workflow
```

v1 会打开 GitHub registry review flow。Publish payload 包含 plugin ID、version、repo、capability summary 和目标 registry entry path。合并之后，CI 会重新生成 `open-design-marketplace.json`。

## 5. Install From The Registry

```bash
od marketplace refresh official
od plugin install figma-workflow
od plugin info figma-workflow --json
```

安装会保留 marketplace provenance、resolved source、manifest digest 和 archive integrity。`official` 与 `trusted` sources 会作为 trusted 安装；`restricted` sources 会保持 restricted，直到用户授予更多 trust。

## 6. Yank A Version

```bash
od plugin yank figma-workflow@1.0.0 --reason "Security issue"
```

Yank 绝不会删除 metadata 或 bytes。新安装会拒绝 yanked versions；已有的精确 lockfile replay 仍可在 archive 可访问且 integrity 匹配时发出警告并继续。
