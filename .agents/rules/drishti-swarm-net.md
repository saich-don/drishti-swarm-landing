---
trigger: always_on
---

# ⚠️  PROJECT GUARDRAILS & CONSISTENCY RULES

To ensure the "Drishti-Swarm Net" landing page and interactive command dashboard perfectly align with our SIH 2026 pitch requirements, you must strictly adhere to the following rules at all times during generation and iteration:

## RULE 0: (Absolute priority over all the rules)
            Strictly Adhere to the master prompt given
## RULE 1: ABSOLUTE NARRATIVE & FACTUAL ACCURACY
* **The Lifesaving Payload:** You must strictly refer to the drone's payload as a **"compact 1kg mini oxygen cylinder"** or "1kg weight-block sized oxygen cylinder". Do not use terms like "oxygen pipes", "large oxygen tanks", or "connected drone masks" under any circumstances.
* **The Hardware Stack:** Never substitute the core hardware. Always explicitly mention the **Qualcomm Flight RB5 5G Platform**, **15 TOPS Hexagon NPU**, **FLIR Boson 640 LWIR**, **Livox Mid-360 LiDAR**, and **77 GHz FMCW Radar**. 
* **The Mission Sequence:** Always maintain the distinction between the **"Mother Drone"** (used for initial exterior perimeter geo-mapping) and the **"Swarm Drones"** (which dive into the building, drop the 1kg mini oxygen cylinders, and relay telemetry).

## RULE 2: TACTICAL DESIGN & UI SYSTEM INVIOLABILITY
* **Color Palette Lock:** Do not use light mode or playful colors. The theme must remain strictly "Tactical Industrial Dark Mode". Stick to deep slate/space backgrounds (`#030712`, `#0b1329`) and use specific emergency accents for statuses:
  * Cyan (`#06b6d4`) for active radar/scanning.
  * Critical Red (`#ef4444`) for Code Red Triage / Active Fire.
  * Hazard Amber (`#f59e0b`) for Code Yellow Triage.
  * Vital Emerald (`#10b981`) for System Online / Code Green.
* **Component Styling:** Use glassmorphism (translucent backgrounds with `backdrop-blur`) and glowing borders (`border-cyan-500/30`) for telemetry cards to simulate an advanced defense/military HUD. Use monospace fonts for all telemetry data and live counters.

## RULE 3: CODE COMPLETENESS (NO PLACEHOLDERS)
* **Zero Omissions:** Do not output truncated code or comments like `// Add your data here` or `// Implement function here`. You must generate the complete, self-contained React functional components.
* **Data Arrays:** Fully populate the JSON/Data arrays for the 5 Disaster Scenarios (Fire, Flood, Earthquake, Rat-Hole Mining, Hazmat) and the Mock Triage Queue exactly as outlined in the Master Prompt.

## RULE 4: INTERACTIVE HUD CONSISTENCY
* The **Command Center Dashboard** section must not be a static image. It must be built as a functional React mock-up consisting of control hud toggles that toggle it to various scenarios like fire disaster , flood , Earth Quake , Rat Mining situation( Like we see in the scenarios Section) illustrating 3d structures in 2d with danger zones safe paths and priority queue besides the Command Huds  
* The simulated ROS 2 terminal must display realistic scrolling text (e.g., `YOLOv10-SAR: person detected`, `SERVO: 1kg O2 cylinder dropped`, `FAST-LIO2: Odometry converged`).
* Triage filters (All, Code Red, Code Yellow) must actively filter the mock victim list when clicked.

## RULE 5: BRANDING & IDENTIFIERS
* Always include the Problem Statement ID: **SIH26177** (Qualcomm Inc).
* Always credit the project to **Team SwarmOps**.
* Always refer to the core technology as **Zero-Cloud Dependency / 100% Offline Edge Autonomy**. Do not imply the drones need active internet to save lives.