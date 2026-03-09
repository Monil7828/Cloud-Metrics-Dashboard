# Cloud Metrics Dashboard — Atomity Frontend Challenge

A dynamic, scroll-triggered data visualization dashboard built for the Atomity Frontend Engineering Challenge. This project demonstrates modern frontend architecture, state management, and fluid animations.

**[Live Demo](https://cloud-metrics-dashboard.vercel.app/)** | **[GitHub Repository](https://github.com/Monil7828/Cloud-Metrics-Dashboard)**

---

## 🎯 Feature Chosen & Rationale

**I chose Option A (0:30–0:40) — The Interactive Drill-Down Dashboard.**

**Why?** Atomity is a cloud optimization platform, which inherently involves making sense of large, hierarchical datasets (Clusters → Namespaces → Pods). I chose this feature because building a robust, data-driven drill-down UI demonstrates stronger engineering fundamentals—specifically regarding state management, data caching, and component reusability—compared to purely spatial animations. It proves I can handle complex data architectures while keeping the UI highly responsive.

---

## 🛠 Tech Stack & Libraries

* **React (Vite) & TypeScript:** Chosen for fast development, optimal build times, and strict type safety across data structures.
* **Tailwind CSS:** Used for utility-first styling, integrated with a custom CSS variable token system.
* **Framer Motion:** Chosen for handling scroll-triggered entrances and complex layout animations (like `layoutId` morphing) smoothly without performance jank.
* **TanStack Query (React Query):** The industry standard for data fetching, caching, and server state synchronization.

---

## 🎨 Token Architecture & Modern CSS

Following the challenge requirements, there are **no hardcoded hex values** scattered throughout the components. 

I implemented a strict design token architecture using CSS variables defined in a global `tokens.css` file. These CSS variables dictate colors, spacing, and border radii, and are seamlessly mapped to the Tailwind configuration.

**Modern CSS Features Used:**
* **Fluid Typography:** Utilized `clamp()` in CSS variables so text scales naturally from mobile to desktop without relying heavily on static media queries.
* **Container Queries:** Used `@container` on UI components to ensure they adapt to their parent wrapper's width, making the components truly reusable in any layout context.
* **Accessibility:** Handled `prefers-reduced-motion` to tone down Framer Motion animations for users with motion sensitivity.

---

## 💾 Data Fetching & Caching Strategy

The UI must never feel slow or trigger redundant network requests when drilling up and down the data hierarchy.

* **API:** Integrated with a public REST API (`https://jsonplaceholder.typicode.com`) to simulate the hierarchical cloud data (mapping Users/Companies to Clusters/Namespaces).
* **Caching:** Implemented **React Query**. I configured a specific `staleTime` so that once a user fetches the "Cluster" or "Namespace" data, navigating back and forth instantly loads from the cache.
* **State Handling:** Built-in `isLoading` and `isError` states are handled gracefully with skeleton loaders to prevent layout shift.

---

## ✨ Animation Approach

The goal was to make the animations feel intentional and physically natural, avoiding the "everything flying in at once" anti-pattern.

1.  **Scroll Triggers:** The main section uses Framer Motion's `whileInView` with a staggered viewport threshold, ensuring the dashboard only fades and slides up when the user actually scrolls to it.
2.  **Layout Transitions:** When clicking a bar chart to drill down into deeper metrics, I utilized Framer Motion's `layoutId`. This allows the UI elements (like the chart bars and table rows) to smoothly resize and morph into their new states rather than jarringly snapping into place.

---

## ⚖️ Tradeoffs & Decisions

* **Mock API Structure:** Since a real Kubernetes cost-monitoring API wasn't available, I mapped the JSONPlaceholder data to fit a "Cloud Cost" narrative. The data transformation logic is abstracted to keep components clean, but a real-world scenario would require more complex data parsing.
* **Atomic UI Over Libraries:** I strictly avoided UI libraries (MUI, shadcn). Every Card, Badge, and Chart element is built entirely from scratch to demonstrate foundational component architecture. 

---

## 🚀 What I Would Improve With More Time

1.  **Dark Mode Implementation:** The CSS token architecture is already set up to handle `prefers-color-scheme`, but I would add a manual toggle and fine-tune the dark mode color palette.
2.  **Complex Charting:** While I built custom animated bars for this challenge, for a production Atomity dashboard, I would likely wrap a lightweight charting library (like Recharts) within Framer Motion for more complex data visualizations.
3.  **End-to-End Testing:** Add Playwright or Cypress tests to verify the drill-down user flow and ensure the caching strategy behaves correctly under network throttling.
