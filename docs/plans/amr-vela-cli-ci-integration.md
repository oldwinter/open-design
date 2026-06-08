# AMR Vela CLI CI Integration Review Summary

## 概要

该 PR 将 Open Design 的 beta mac arm64 packaging path 接入 Vela 由 npm 托管的 CLI distribution contract。

目标是让 packaged AMR builds 使用由 lockfile 固定的 Vela CLI package，而不是要求 CI 下载、构建或手工定位 Vela binary。Rollout 有意收窄：beta mac arm64 release builds 要求 Vela，而 mac Intel、Windows、Linux、preview 和 stable builds 保持 non-strict，并在不支持时继续跳过 Vela bundling。

## Design Contract

Open Design 只依赖 Vela meta package：

```json
"@powerformer/vela-cli": "0.0.1-test"
```

Open Design 不直接依赖 `@powerformer/vela-cli-darwin-arm64` 这类 platform packages。Vela 通过 optional dependencies 和 resolver API 拥有该 platform matrix。

Vela CLI binary resolution 顺序是：

1. `OPEN_DESIGN_VELA_CLI_BIN`
2. Dynamic import of `@powerformer/vela-cli`
3. `resolveVelaCliBin({ strict })`

这保留了 developer/emergency override，同时让 npm 成为常规 CI contract。

CI/package timing 如下：

1. Vela 在 Open Design packaging 开始前将 `@powerformer/vela-cli` 发布到 npm。
2. Open Design 在 `tools/pack/package.json` 和 `pnpm-lock.yaml` 中 pin 该 package。
3. CI 运行 `pnpm install --frozen-lockfile`，安装 pinned meta package 以及其受支持的 optional native binary package。
4. `tools-pack` 进入 `resource-tree` phase，并将 Vela binary 解析/复制到 Open Design resource tree。
5. `electron-builder` 通过 `extraResources` 嵌入该 resource tree。
6. Packaged daemon 启动时收到 `OD_RESOURCE_ROOT`，并将 AMR 解析到 `OD_RESOURCE_ROOT/bin/vela`，除非 `VELA_BIN` 显式覆盖。

## 已实现行为

`tools-pack` 现在支持 `--require-vela-cli`。缺少该 flag 时，缺失 Vela packages、不支持的平台、缺失 resolvers 或 null resolver results 都会被视为 "skip Vela bundling"。存在该 flag 时，packaging 会以可执行错误失败，并同时提到两条 remediation paths：安装/使用 `@powerformer/vela-cli`，或设置 `OPEN_DESIGN_VELA_CLI_BIN`。

Vela resource copying 现在位于 `tools/pack/src/vela-cli.ts`，因此 generic resource-tree helper 只拥有 static Open Design resources。Vela helper 通过 shared resolver path 解析 binary，并将其复制到：

```text
resources/open-design/bin/vela
```

复制后的文件在 POSIX platforms 上会被标记为 executable。

Beta release workflow 只在 mac arm64 release build path 中传递 `--require-vela-cli`。其他 release-beta jobs 保持 non-strict。

Windows resource cache keys 会在 optional Vela binary 存在时包含它，从而保持 cache correctness，同时不在本轮 rollout 中让 Windows 变成 strict。

## Vela Package Status

当前 verification npm packages 已发布：

- `@powerformer/vela-cli@0.0.1-test`
- `@powerformer/vela-cli-darwin-arm64@0.0.1-test`

Open Design 应只安装 `@powerformer/vela-cli`。在受支持机器上，该 meta package 会以 optional dependency 拉取 macOS arm64 binary package。

Vela monorepo 外的本地验证：

```bash
npm install @powerformer/vela-cli@0.0.1-test
npx vela --version
```

预期输出：

```text
0.0.1-test
```

## Validation

聚焦的 `tools-pack` tests 覆盖：

- `--require-vela-cli` config parsing；
- env-provided Vela binary copying 和 executable permissions；
- npm-resolved Vela binary copying 和 executable permissions；
- env override 相对 npm resolver output 的优先级；
- strict missing-package 和 missing-binary failures；
- non-strict unsupported-platform skip behavior；
- release-beta workflow 中 `--require-vela-cli` 的 placement。

Vela module extraction 和 `0.0.1-test` bump 的本地验证已在 Node `v24.0.0` 和 pnpm `10.33.2` 下通过：

```bash
pnpm --filter @open-design/tools-pack typecheck
pnpm --dir tools/pack exec vitest run tests/resources.test.ts tests/release-workflows.test.ts tests/config.test.ts tests/win-resources.test.ts
pnpm guard
pnpm typecheck
```

聚焦的 tools-pack test run 通过了 4 个文件中的 27 个 tests。

此前一次本地 non-publishing beta mac arm64 dry run 也在带 `--require-vela-cli` 时成功，生成了 DMG，并在以下位置 bundling 了 Vela binary：

```text
.tmp/release-beta-dry-run/out/mac/namespaces/release-beta/resources/open-design/bin/vela
```

Bundled binary 已验证为 executable，且为 `Mach-O 64-bit executable arm64`。

## Review 重点

Reviewers 应关注这些边界：

- Open Design 只依赖 `@powerformer/vela-cli`。
- `OPEN_DESIGN_VELA_CLI_BIN` 保持最高优先级。
- Strict mode 是 opt-in，且只由 beta mac arm64 CI 使用。
- Non-strict platforms 在 Vela 不受支持或不可用时不能失败。
- Strict-mode errors 包含两条 remediation paths。
- Workflow tests 防止 strict-mode 意外 rollout 到其他平台。

## 已知限制

本地 dry run 没有覆盖 Apple signing、notarization、R2 upload、GitHub artifact upload 或 release metadata publishing，因为这些需要 CI secrets 和 hosted runner context。

第一次使用 `/tmp` 的本地 dry run 暴露了一个现有 path-shape issue：macOS 会在 prebundle entrypoints 中通过 `/private/tmp` 解析 `/tmp`。成功的 dry run 使用了仓库 `.tmp` path，它更接近正常的 project-local tools-pack 用法。

## 后续

Vela 发布第一个 stable package version 后，将 `tools/pack/package.json` 和 `pnpm-lock.yaml` 从 `0.0.1-test` 更新到 stable version。

当 Vela 支持更多平台时，为相应 release jobs 选择性启用 `--require-vela-cli`，并添加匹配的 workflow smoke coverage。
