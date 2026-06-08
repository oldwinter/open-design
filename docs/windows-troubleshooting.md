# Windows Troubleshooting Guide

Open Design 可在 Windows 原生运行，但这条路径不像 macOS、Linux 或 WSL2 那样常走。本指南覆盖新 Windows 机器上最常见的错误，以及每个错误的精确修复方式。

> **Tip:** 如果你已经配置好 WSL2，那是 Windows 上最顺滑的路径。本指南面向原生 Windows（PowerShell）。

---

## Prerequisites

| Tool | Version | How to verify |
|---|---|---|
| Node.js | `~24` | `node -v` |
| pnpm | `10.33.x` | `pnpm -v` |
| Git | any recent | `git --version` |

---

## 1. 安装 Node 24

### Symptom
`node -v` 返回的版本早于 `v24.x.x`，或者完全没有安装 Node。

### Fix

**Option A — nvm-windows（推荐）**

1. 安装 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)。
2. 打开新的 PowerShell 窗口：

   ```powershell
   nvm install 24
   nvm use 24
   node -v   # 应输出 v24.x.x
   ```

**Option B — 官方 installer**

从 [nodejs.org](https://nodejs.org/) 下载并运行 Node 24 `.msi`。

### 常见 nvm-windows 坑

如果运行 `nvm version` 或 `node -v` 时弹出 Windows 对话框询问 *"How do you want to open this file?"*，说明 `C:\Windows\System32` 中创建了一个假的 `nvm` 文件（无扩展名）。

**Fix:** 删除该文件，然后重启 PowerShell。

---

## 2. 找不到 pnpm

### Symptom

```text
pnpm : The term 'pnpm' is not recognized as the name of a cmdlet...
```

### Fix（Corepack — 推荐）

Repo 在 `packageManager` 中 pin 了 `pnpm@10.33.2`。Corepack 会自动选择这个精确版本：

```powershell
corepack enable
corepack pnpm --version   # 应输出 10.33.2
```

> **Note:** 如果 `corepack enable` 因 `EPERM` 或 `EACCES` 失败（Node 安装在 `C:\Program Files\nodejs` 时很常见），请改用下一节的 npm-global fallback。

### Fix（npm global — 替代方案）

如果 Corepack 不可用：

```powershell
npm install -g pnpm@10.33.2
pnpm -v   # 应输出 10.33.2
```

---

## 3. Build scripts 被阻止

### Symptom

执行 `pnpm install` 时看到：

```text
Ignored build scripts: better-sqlite3, ...
```

随后 `pnpm tools-dev run web` 因 native-module errors 失败。

### Fix

pnpm 10 默认阻止 lifecycle scripts。允许需要 native compilation 的 packages：

```powershell
pnpm approve-builds
```

批准列表中出现的 packages（通常是 `better-sqlite3`、`electron` 和 `esbuild`）。然后重新运行：

```powershell
pnpm install
```

> **Note:** `better-sqlite3` 在 Windows 上可能 fallback 到从源码编译。如果 `pnpm install` 在这个 package 上卡住或失败，请确保在运行 `pnpm install` **之前**已安装 Visual Studio Build Tools（步骤 4）。

---

## 4. Visual Studio / `gyp` build errors

### Symptom

```text
gyp ERR! find VS could not find Visual Studio
```

或：

```text
error MSB8036: The Windows SDK version was not found
```

### Fix

安装 **Build Tools for Visual Studio 2022**，并选择以下 workloads：

- **Desktop development with C++**
- **MSVC v143 - VS 2022 C++ x64/x86 build tools**
- **Windows 11 SDK**（如果你使用 Windows 10，也可选择 Windows 10 SDK）

下载：[https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)

如果看到 `gyp ERR! find Python`，请确认 Python 已安装：

```powershell
python --version   # 或 py --version
```

如果缺失，从 [python.org](https://www.python.org/downloads/) 安装 Python 3.x，并确保它在 PATH 上。

安装所有 build tools 后，打开**新的** PowerShell 窗口并重新运行 `pnpm install`。

---

## 5. PowerShell execution policy

### Symptom

```text
 cannot be loaded because running scripts is disabled on this system.
```

### Fix

全新 Windows 安装默认会阻止 PowerShell 执行 scripts：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

修改 policy 后重启 PowerShell。

---

## 6. 启动 dev server

### Symptom
你已经完成上述步骤，但不确定如何启动 app。

### Fix

从 repository root 运行：

```powershell
pnpm tools-dev run web
```

期望输出末尾类似：

```text
Open Design dev server ready
  - Local:   http://localhost:17573
```

精确端口可能变化；始终以 terminal output 为准。

---

## Quick diagnostic checklist

打开 issue 前，先在 PowerShell 中运行这些命令。请把输出附到报告里。

```powershell
node -v
pnpm -v
where.exe pnpm
where.exe node
where.exe opencode
corepack --version
python --version   # 或 py --version
Get-ExecutionPolicy -List
```

## 7. Optional：quick launcher

如果你想在 Windows 上有一个 double-click 入口，可以在 repo root 创建 `launch.bat`：

```bat
@echo off
cd /d %~dp0
corepack pnpm tools-dev run web
```

这样仍然走受支持的 `pnpm tools-dev run web` 路径，同时提供 one-click start。

---

## Optional：Windows 上的 OpenCode agent CLI

OpenCode 是 Open Design 可以驱动的 local agent CLIs 之一。如果你想使用它：

```powershell
npm install -g opencode-ai
where.exe opencode   # 应显示 C:\Users\YOUR_USERNAME\AppData\Roaming\npm\opencode.cmd
opencode --version
```

如果 Open Design 在 **Settings → Execution mode** 中仍显示 OpenCode *not installed*，请先确认 `opencode.cmd` 所在目录在你的 user `PATH` 中，然后点击 **Rescan**。
