# Drishti-Swarm Net 🛸⚡

> **Autonomous Search & Rescue Drone Swarm System**  
> **Problem Statement ID:** `SIH26177` (Qualcomm Inc)  
> **Developed by:** **Team SwarmOps**  
> **Core Architecture:** **Zero-Cloud Dependency / 100% Offline Edge Autonomy**

---

## 🌟 Executive Summary

**Drishti-Swarm Net** is a mission-critical, autonomous search-and-rescue (SAR) swarm drone platform engineered to operate in GPS-denied, communication-blackout, and structurally compromised disaster environments. Operating with complete offline edge intelligence on the **Qualcomm Flight RB5 5G Platform**, the swarm conducts multi-modal sensory mapping, human presence detection via thermal and radar scanning, and critical life-support payload delivery.

---

## 🛠️ Hardware & Sensor Architecture

The system operates with zero cloud reliance, hosting full neural inference and SLAM on-drone:

* **Compute Engine:** Qualcomm Flight RB5 5G Platform (Qualcomm Kryo 585 CPU + Adreno 650 GPU)
* **Neural Accelerator:** 15 TOPS Qualcomm Hexagon NPU (Dedicated YOLOv10-SAR Edge Inference)
* **Thermal Imaging:** FLIR Boson 640 LWIR (Long-Wave Infrared for human thermal signature triage)
* **LiDAR SLAM:** Livox Mid-360 LiDAR (360° dense point-cloud reconstruction via FAST-LIO2)
* **Penetration Radar:** 77 GHz FMCW Radar (Through-smoke and rubble life detection)
* **Mesh Network:** 802.11s Ad-Hoc / Batadv Self-Healing Peer-to-Peer Swarm Mesh

---

## 🚁 Mission Operational Sequence

1. **Mother Drone Deployment:**
   * High-altitude exterior perimeter geo-mapping and thermal structural assessment.
   * Identifies structural breach points and drops decentralized anchor mesh nodes.
2. **Swarm Drone Penetration:**
   * Swarm units dive into subterranean, collapsed, or smoke-filled corridors.
   * Real-time 3D FAST-LIO2 odometry mapping with dynamic obstacle avoidance.
3. **Targeted Life-Saving Delivery:**
   * Precision servo-actuated deployment of a **compact 1kg mini oxygen cylinder** to trapped survivors.
   * Real-time vitals monitoring (HR, SpO₂) and survivor triage relayed back via the ad-hoc mesh.

---

## 💻 Web Platform & Command HUD Stack

The Drishti-Swarm Net mission portal and interactive command center is built with a modern, high-performance web architecture:

* **Framework:** React 18 (Single Page Application)
* **Bundler & Build Tool:** Vite 6
* **Routing:** React Router DOM v7
* **Tactical Styling:** Tailwind CSS 3.4 + Custom Glassmorphic HUD Design System
* **Iconography:** Lucide React
* **Dual Theme Engine:** Adaptive Tactical Industrial Dark Mode & High-Contrast Light Mode
* **Interactive Mission Features:**
  * Multi-scenario 2D/3D Tactical Overlays (Fire, Flood, Earthquake, Mining, HAZMAT)
  * Live-simulated ROS 2 terminal telemetry (`YOLOv10-SAR`, `FAST-LIO2`, `SERVO-DROP`)
  * Dynamic triage filtering (All, Code Red, Code Yellow, Code Green)

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0 or newer)
* npm (v9.0 or newer)

### Installation

```bash
# Clone the repository
git clone https://github.com/saich-don/drishti-swarm-landing.git

# Navigate to project root
cd drishti-swarm-landing

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🌐 One-Click Deployments (Universal Platform Ready)

This repository includes pre-configured settings and rewrite rules for all major cloud and serverless hosts:

### 1. Vercel (Recommended — Automatic Git Sync)
* Uses root [`vercel.json`](./vercel.json).
* Import repository into [Vercel](https://vercel.com/) -> Framework preset: **Vite** -> Deploy.

### 2. Netlify (Automatic Git Sync)
* Uses root [`netlify.toml`](./netlify.toml) and [`public/_redirects`](./public/_redirects).
* Import repository into [Netlify](https://www.netlify.com/) -> Build command: `npm run build` -> Publish directory: `dist`.

### 3. Cloudflare Pages
* Uses [`public/_redirects`](./public/_redirects) and [`public/_headers`](./public/_headers) for SPA fallback and performance caching.
* Connect repository on [Cloudflare Pages](https://pages.cloudflare.com/) -> Framework preset: **Vite** -> Deploy.

### 4. GitHub Pages (Automated via GitHub Actions)
* A pre-built workflow is ready at [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).
* Go to repository **Settings** -> **Pages** -> Source: **GitHub Actions**.
* Any push to `main` automatically triggers build and zero-downtime deployment!

### 5. Google Cloud Run / Docker
* Uses the multi-stage [`Dockerfile`](./Dockerfile) and production [`nginx.conf`](./nginx.conf).
* Build and deploy via Google Cloud CLI:
  ```bash
  # Build and deploy directly to Cloud Run
  gcloud run deploy drishti-swarm-net --source . --platform managed --allow-unauthenticated
  ```


---

## 📄 License & Attribution

* **Challenge:** Smart India Hackathon (SIH 2026)
* **Organization:** Qualcomm Inc (`SIH26177`)
* **Engineering Team:** **Team SwarmOps**
