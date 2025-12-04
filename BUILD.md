# Build Instructions

This guide covers how to set up the development environment and build Nugget from source across different platforms.

## Prerequisites

### All Platforms

- [Rust](https://rustup.rs/) (latest stable)
- [Bun](https://bun.sh/) package manager
- [Tauri Prerequisites](https://tauri.app/start/prerequisites/)

### Platform-Specific Requirements

#### macOS

- Xcode Command Line Tools
- Install with: `xcode-select --install`

#### Windows

- Microsoft C++ Build Tools (Desktop C++ workload) including the Windows 10/11 SDK
- CMake on PATH (`cmake --version` should work)
- Vulkan SDK installed (e.g., `C:\VulkanSDK\1.4.328.1`) and `VULKAN_SDK` set to that path

#### Linux

- Build essentials
- ALSA development libraries
- Install with:

  ```bash
  # Ubuntu/Debian
  sudo apt update
  sudo apt install build-essential libasound2-dev pkg-config libssl-dev libvulkan-dev vulkan-tools glslc libgtk-3-dev libwebkit2gtk-4.1-dev libayatana-appindicator3-dev librsvg2-dev patchelf cmake

  # Fedora/RHEL
  sudo dnf groupinstall "Development Tools"
  sudo dnf install alsa-lib-devel pkgconf openssl-devel vulkan-devel \
    gtk3-devel webkit2gtk4.1-devel libappindicator-gtk3-devel librsvg2-devel

  # Arch Linux
  sudo pacman -S base-devel alsa-lib pkgconf openssl vulkan-devel \
    gtk3 webkit2gtk-4.1 libappindicator-gtk3 librsvg
  ```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:Vasista03/Nugget.git
cd Nugget
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Start Dev Server

```bash
bun tauri dev
```

## Windows Build Troubleshooting

- `fatal error: 'stdio.h' file not found` (during `whisper-rs-sys`/bindgen):
  - Install the **Desktop development with C++** workload (or VS Build Tools with MSVC + Windows 10/11 SDK).
  - Make sure you build from a **Developer PowerShell/Native Tools** prompt so MSVC includes are on `PATH`.
- `cmake` not found:
  - Install CMake and ensure `cmake --version` works in your shell.
- Vulkan SDK not detected or wrong version:
  - Install Vulkan SDK (e.g., `C:\VulkanSDK\1.4.328.1`) and set `VULKAN_SDK` to that folder.
  - Ensure `PATH` includes `%VULKAN_SDK%\Bin` and `%VULKAN_SDK%\Lib`.
