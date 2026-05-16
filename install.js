module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/manat0912/FluxRT.git app",
        ]
      }
    },
    // Apply fixes
    {
      method: "shell.run",
      params: {
        message: [
          "python patch.py"
        ]
      }
    },
    // Install torch first to avoid CPU version being pulled by dependencies
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv_python: "3.12",
          venv: "env",
          path: "app",
          xformers: true,
          triton: true,
          flashattention: true,
          sageattention: true
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        venv_python: "3.12",
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "python --version",
          "uv pip install gradio devicetorch",
          "uv pip install -r requirements.txt",
          "uv pip install -r requirements_lipsync.txt",
          "uv pip install insightface",
          "uv pip install gdown gguf huggingface-hub",
          "uv pip install -e ."
        ]
      }
    },
    // Clone LivePortrait repository
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "git clone https://github.com/KwaiVGI/LivePortrait.git LivePortrait-code"
        ]
      }
    },
    // Download LivePortrait models
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": ["KwaiVGI/LivePortrait"],
        "local-dir": "models",
        "token": "False"
      }
    },
    // Optional Downloads
    {
      method: "input",
      params: {
        title: "Optional Downloads",
        description: "Select optional models to download.",
        form: [
          {
            key: "file",
            title: "GGUF Model File",
            description: "Select a GGUF model to download from leejet/FLUX.2-klein-4B-GGUF (Optional)",
            type: "select",
            items: [
              { text: "None (Skip GGUF download)", value: "" },
              { text: "FLUX.2-klein-4B-Q4_K_M.gguf (Default)", value: "FLUX.2-klein-4B-Q4_K_M.gguf" },
              { text: "FLUX.2-klein-4B-F16.gguf", value: "FLUX.2-klein-4B-F16.gguf" },
              { text: "FLUX.2-klein-4B-BF16.gguf", value: "FLUX.2-klein-4B-BF16.gguf" },
              { text: "FLUX.2-klein-4B-Q8_0.gguf", value: "FLUX.2-klein-4B-Q8_0.gguf" },
              { text: "FLUX.2-klein-4B-Q5_K_M.gguf", value: "FLUX.2-klein-4B-Q5_K_M.gguf" },
              { text: "FLUX.2-klein-4B-Q3_K_M.gguf", value: "FLUX.2-klein-4B-Q3_K_M.gguf" },
              { text: "FLUX.2-klein-4B-Q2_K.gguf", value: "FLUX.2-klein-4B-Q2_K.gguf" }
            ],
            default: ""
          },
          {
            key: "int8",
            title: "Download int8 quantized model",
            description: "Required for int8 inference mode (aydin99/FLUX.2-klein-4B-int8)",
            type: "checkbox",
            default: false
          }
        ]
      }
    },
    {
      when: "{{input.file}}",
      method: "hf.download",
      params: {
        path: "app",
        "_": ["leejet/FLUX.2-klein-4B-GGUF"],
        "include": ["{{input.file}}"],
        "local-dir": "models/gguf",
        "token": "False"
      }
    },
    // RIFE Frame Interpolation Model
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": ["TensorForger/RIFE-safetensors"],
        "local-dir": "RIFE-safetensors",
        "token": "False"
      }
    },
    // FLUX.2-klein-4B Model
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": ["black-forest-labs/FLUX.2-klein-4B"],
        "local-dir": "FLUX.2-klein-4B",
        "token": "False"
      }
    },
    // Optional: int8 quantized FLUX.2-klein-4B
    {
      when: "{{input.int8}}",
      method: "hf.download",
      params: {
        path: "app",
        "_": ["aydin99/FLUX.2-klein-4B-int8"],
        "local-dir": "FLUX.2-klein-4B-int8",
        "token": "False"
      }
    }
  ]
}
