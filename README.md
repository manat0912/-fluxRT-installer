# FluxRT

A pinokio script for https://github.com/tensorforger/FluxRT.git

## How to Guide Edits Correctly

In FluxRT, there are no specific hardcoded "trigger words" (like the ones you'd find in older Stable Diffusion 1.5 LoRAs).

Because it uses a highly advanced base model (`FLUX.2-klein-4B`), it understands natural language descriptions. The prompt simply sets the overall scene, lighting, style, and clothing, while the system automatically applies the face/headswap/identity via the Reference Image logic built into the pipeline.

### Identity & Headswap
You don't need to prompt for the identity. The identity/headswap is locked automatically by uploading an image into the **Reference Image** box. The backend pipeline automatically feeds this reference alongside your webcam/video stream to maintain the face and structure.

### Changing Clothes or Body
Use natural descriptive phrases.
*Example:* "wearing a futuristic red jacket", "dressed in a sharp business suit", or "wearing casual summer clothes".

### Backgrounds & Lighting (The Default Prompt)
Describe the environment and cinematic qualities.
*The default prompt is:* "Make professional soft light: cyberpunk gaming room, red and violet light, soft streamer's light, warm white light, cinematic, beautiful, professional, bokeh".
*You can freely swap this to something like:* "Bright sunny beach, ocean waves, cinematic lighting, photorealistic".

### Summary
Leave the identity work to the **Reference Image** input, and use the **Prompt** text box entirely to describe the clothing, background, and lighting in plain English!

# -fluxRT-installer
