# Palenro - Saudi Luxury Furniture & Bespoke Wood Craftsmanship

Welcome to the Palenro source code repository. Palenro is a premium Saudi Arabian luxury furniture and bespoke wood craftsmanship studio. This website is designed to provide a high-end, cinematic, and immersive digital experience tailored to a luxury market presence.

##  Key Features

- **Cinematic User Experience**: Features an award-winning, editorial design aesthetic comparable to premium brands. Incorporates dynamic micro-animations, glassmorphism UI elements, and a sophisticated typography system.
- **Advanced Animations**: Powered by GSAP and Anime.js. Includes interactive cursor followers that reveal media on keyword hover, staggered link reveals, and custom easing for image reveals.
- **Premium Navigation**: A centralized, adaptive glassmorphism navbar for desktop and a full-screen, GSAP-animated overlay for mobile devices.
- **Luxury WhatsApp Integration**: A unified, easily configurable contact system that dynamically generates pre-filled project inquiry messages for a seamless e-commerce-style order flow.
- **Smooth Scrolling**: Implemented using Lenis for an effortless, buttery-smooth scrolling experience across all sections.

##  Tech Stack

This project is built using modern, performant web technologies:

- **Framework**: [TanStack Start](https://tanstack.com/start) / React 19
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) (Headless UI for accessibility)
- **Animations**: [GSAP](https://gsap.com/), [Anime.js](https://animejs.com/)
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)

##  Getting Started

### Prerequisites
Make sure you have Node.js and [Bun](https://bun.sh/) (or npm/yarn) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/simo-SM/saudi-luxury-furniture-Palenro.git
   cd palenro-chair
   ```

2. Install dependencies (assuming you are using bun):
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Build for production:
   ```bash
   bun run build
   ```

## 📂 Project Structure

- `src/components/`: Reusable UI components, including sections (`Hero`, `Projects`, `Craft`, `Contact`) and base UI elements (Radix UI wrappers).
- `src/assets/`: High-quality local assets (`.jpeg`, `.jpg`, `.mp4`) for the luxury furniture gallery and crafting videos.
- `src/routes/`: TanStack Router file-based routing configuration.
- `src/lib/`: Utility functions, WhatsApp integration helpers, and configuration files.

##  Contributing
Contributions are welcome. Please ensure that any new components or UI updates adhere to the established premium design aesthetic and visual consistency (e.g., pure white backgrounds for interactive elements, black text, smooth GSAP transitions).

##  License
This project is proprietary and intended for Palenro Saudi Luxury Furniture.
