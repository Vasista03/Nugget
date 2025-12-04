# Nugget

**A free, open source, and extensible speech-to-text application that works completely offline.**

Nugget is a cross-platform desktop application built with Tauri (Rust + React/TypeScript) that provides simple, privacy-focused speech transcription. Press a shortcut, speak, and have your words appear in any text field—all without sending your voice to the cloud.

## Why Nugget?

Nugget was created to fill the gap for a truly open source, extensible speech-to-text tool. Its guiding principles:

- **Free**: Accessibility tooling belongs in everyone's hands, not behind a paywall
- **Open Source**: Together we can build further. Extend Nugget for yourself and contribute to something bigger
- **Private**: Your voice stays on your computer. Get transcriptions without sending audio to the cloud
- **Simple**: One tool, one job. Transcribe what you say and put it into a text box

Nugget isn't trying to be the best speech-to-text app—it's trying to be the most forkable one.

## How It Works

1. **Press** a configurable keyboard shortcut to start/stop recording (or use push-to-talk mode)
2. **Speak** your words while the shortcut is active
3. **Release** and Nugget processes your speech using Whisper
4. **Get** your transcribed text pasted directly into whatever app you're using

The process is entirely local:

- Silence is filtered using VAD (Voice Activity Detection) with Silero
- Transcription uses your choice of models:
  - **Whisper models** (Small/Medium/Turbo/Large) with GPU acceleration when available
  - **Parakeet V3** - CPU-optimized model with excellent performance and automatic language detection
- Works on Windows, macOS, and Linux

## Quick Start

### Installation

1. Install a build for your platform (from your package manager or by building from source)
2. Launch Nugget and grant necessary system permissions (microphone, accessibility)
3. Configure your preferred keyboard shortcuts in Settings
4. Start transcribing!

### Run from Source (Dev)

Prereqs: Rust (rustup), Bun, CMake, Clang/LLVM, and (Windows) Vulkan SDK + VS Build Tools.

From the repo root:

```
# Install JS deps
bun install

# Fetch required VAD model
mkdir -p src-tauri/resources/models
curl -o src-tauri/resources/models/silero_vad_v4.onnx <your-vad-model-url>

# Run the Tauri app (backend + frontend)
bun run tauri dev
```

Frontend only:

```
bun run dev
```
### Development Setup

For detailed build instructions including platform-specific requirements, see [BUILD.md](BUILD.md).

## Architecture

Nugget is built as a Tauri application combining:

- **Frontend**: React + TypeScript with Tailwind CSS for the settings UI
- **Backend**: Rust for system integration, audio processing, and ML inference
- **Core Libraries**:
  - `whisper-rs`: Local speech recognition with Whisper models
  - `transcription-rs`: CPU-optimized speech recognition with Parakeet models
  - `cpal`: Cross-platform audio I/O
  - `vad-rs`: Voice Activity Detection
  - `rdev`: Global keyboard shortcuts and system events
  - `rubato`: Audio resampling

### Debug Mode

Nugget includes an advanced debug mode for development and troubleshooting. Access it by pressing:

- **macOS**: `Cmd+Shift+D`
- **Windows/Linux**: `Ctrl+Shift+D`

## Known Issues & Current Limitations

This project is actively being developed and has some known issues. We believe in transparency about the current state:

### Major Issues (Help Wanted)

**Whisper Model Crashes:**

- Whisper models crash on certain system configurations (Windows and Linux)
- Does not affect all systems - issue is configuration-dependent
  - If you experience crashes and are a developer, please help to fix and provide debug logs!

**Wayland Support (Linux):**

- Limited or no support for Wayland display server
- On Wayland the clipboard-based paste options (`Clipboard (CTRL+V)` / `Clipboard (Shift+Insert)`) copy the transcription once, then try to run [`wtype`](https://github.com/atx/wtype) (preferred) or [`dotool`](https://sr.ht/~geb/dotool/) to fire the paste keystroke. Install one of these tools to let Nugget drive the compositor-friendly paste shortcut; otherwise it falls back to Enigo-generated key events, which may not work on Wayland.

### Linux Notes

- The recording overlay is disabled by default on Linux (`Overlay Position: None`) because certain compositors treat it as the active window. When the overlay is visible it can steal focus, which prevents Nugget from pasting back into the application that triggered transcription. If you enable the overlay anyway, be aware that clipboard-based pasting might fail or end up in the wrong window.
- You can manage global shortcuts outside of Nugget and still control the app via signals. Sending `SIGUSR2` to the Nugget process toggles recording on/off, which lets Wayland window managers or other hotkey daemons keep ownership of keybindings. Example (Sway):

  ```ini
  bindsym $mod+o exec pkill -USR2 -n nugget
  ```

  `pkill` here simply delivers the signal—it does not terminate the process.

### Platform Support

- **macOS (both Intel and Apple Silicon)**
- **x64 Windows**
- **x64 Linux**

### System Requirements/Recommendations

The following are recommendations for running Nugget on your own machine. If you don't meet the system requirements, the performance of the application may be degraded. We are working on improving the performance across all kinds of computers and hardware.

**For Whisper Models:**

- **macOS**: M series Mac, Intel Mac
- **Windows**: Intel, AMD, or NVIDIA GPU
- **Linux**: Intel, AMD, or NVIDIA GPU
  - Ubuntu 22.04, 24.04

**For Parakeet V3 Model:**

- **CPU-only operation** - runs on a wide variety of hardware
- **Minimum**: Intel Skylake (6th gen) or equivalent AMD processors
- **Performance**: ~5x real-time speed on mid-range hardware (tested on i5)
- **Automatic language detection** - no manual language selection required

## Roadmap & Active Development

We're actively working on several features and improvements. Contributions and feedback are welcome!

### In Progress

**Debug Logging:**

- Adding debug logging to a file to help diagnose issues

**macOS Keyboard Improvements:**

- Support for Globe key as transcription trigger
- A rewrite of global shortcut handling for MacOS, and potentially other OS's too.

**Opt-in Analytics:**

- Collect anonymous usage data to help improve Nugget
- Privacy-first approach with clear opt-in

**Settings Refactoring:**

- Cleanup and refactor settings system which is becoming bloated and messy
- Implement better abstractions for settings management

**Tauri Commands Cleanup:**

- Abstract and organize Tauri command patterns
- Investigate tauri-specta for improved type safety and organization

## Troubleshooting

### Manual Model Installation (For Proxy Users or Network Restrictions)

If you're behind a proxy, firewall, or in a restricted network environment where Nugget cannot download models automatically, you can manually download and install them. The URLs are publicly accessible from any browser.

#### Step 1: Find Your App Data Directory

1. Open Nugget settings
2. Navigate to the **About** section
3. Copy the "App Data Directory" path shown there, or use the shortcuts:
   - **macOS**: `Cmd+Shift+D` to open debug menu
   - **Windows/Linux**: `Ctrl+Shift+D` to open debug menu

The typical paths are:

- **macOS**: `~/Library/Application Support/com.pais.nugget/`
- **Windows**: `C:\Users\{username}\AppData\Roaming\com.pais.nugget\`
- **Linux**: `~/.config/com.pais.nugget/`

#### Step 2: Create Models Directory

Inside your app data directory, create a `models` folder if it doesn't already exist:

```bash
# macOS/Linux
mkdir -p ~/Library/Application\ Support/com.pais.nugget/models

# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path "$env:APPDATA\com.pais.nugget\models"
```

#### Step 3: Download Model Files

Download the models you want from a trusted source and keep the filenames exactly as shown.

**Whisper Models (single .bin files):**

- Small (487 MB): `https://huggingface.co/Vasista03/Nugget/resolve/main/ggml-small.bin`

- Medium (492 MB): `https://huggingface.co/Vasista03/Nugget/resolve/main/whisper-medium-q4_1.bin`

- Turbo (1600 MB): `https://huggingface.co/Vasista03/Nugget/resolve/main/ggml-large-v3-turbo.bin`

- Large (1100 MB): `https://huggingface.co/Vasista03/Nugget/resolve/main/ggml-large-v3-q5_0.bin`

**Parakeet Models (compressed archives):**

- V2 (473 MB): `https://huggingface.co/Vasista03/Nugget/resolve/main/parakeet-v2-int8.tar.gz`

- V3 (478 MB): `https://huggingface.co/Vasista03/Nugget/resolve/main/parakeet-v3-int8.tar.gz`

#### Step 4: Install Models

**For Whisper Models (.bin files):**

Simply place the `.bin` file directly into the `models` directory:

```
{app_data_dir}/models/
├── ggml-small.bin
├── whisper-medium-q4_1.bin
├── ggml-large-v3-turbo.bin
└── ggml-large-v3-q5_0.bin
```

**For Parakeet Models (.tar.gz archives):**

1. Extract the `.tar.gz` file
2. Place the **extracted directory** into the `models` folder
3. The directory must be named exactly as follows:
   - **Parakeet V2**: `parakeet-tdt-0.6b-v2-int8`
   - **Parakeet V3**: `parakeet-tdt-0.6b-v3-int8`

Final structure should look like:

```
{app_data_dir}/models/
├── parakeet-tdt-0.6b-v2-int8/     (directory with model files inside)
│   ├── (model files)
│   └── (config files)
└── parakeet-tdt-0.6b-v3-int8/     (directory with model files inside)
    ├── (model files)
    └── (config files)
```

**Important Notes:**

- For Parakeet models, the extracted directory name **must** match exactly as shown above
- Do not rename the `.bin` files for Whisper models; use the exact filenames listed above
- After placing the files, restart Nugget to detect the new models

#### Step 5: Verify Installation

1. Restart Nugget
2. Open Settings → Models
3. Your manually installed models should now appear as "Downloaded"
4. Select the model you want to use and test transcription

### How to Contribute

1. **Fork the repository** and create a feature branch
2. **Test thoroughly** on your target platform
3. **Submit a pull request** with clear description of changes

The goal is to create both a useful tool and a foundation for others to build upon—a well-patterned, simple codebase that serves the community.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Whisper** by OpenAI for the speech recognition model
- **whisper.cpp and ggml** for amazing cross-platform whisper inference/acceleration
- **Silero** for great lightweight VAD
- **Tauri** team for the excellent Rust-based app framework
- **Community contributors** helping make Nugget better

---

_"Your search for the right speech-to-text tool can end here—not because Nugget is perfect, but because you can make it perfect for you."_

