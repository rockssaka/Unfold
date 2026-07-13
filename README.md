# Unfold

**A private, local-first space for grounding, reflection, and intentional inner work.**

Unfold is a psychology-informed web experience designed around a simple idea: meaningful change does not always begin with doing more. Sometimes it begins with grounding, noticing what is happening, and working with one belief at a time.

Rather than treating wellbeing as a streak, checklist, or productivity problem, Unfold offers different depths of engagement depending on what a person has capacity for in the moment.

**[Try Unfold →](https://rockssaka.github.io/Unfold/)**

---

## Why Unfold?

Most self-reflection and wellbeing tools assume that users are ready to journal, complete an exercise, or maintain a habit.

Unfold is designed differently.

A user might need to ground themselves first. On another day, they may only have two minutes. At another point, they may be ready to explore a recurring belief more deeply.

The experience therefore moves across different levels of engagement:

* **Ground Now** — immediate grounding when reflection feels like too much
* **Pulse** — a short daily practice requiring minimal time and energy
* **Rituals** — repeatable practices for intentional reflection
* **Depth Sessions** — longer guided explorations of underlying beliefs
* **Evidence** — a space to notice experiences that challenge old narratives
* **History** — a record of the journey without turning it into a performance metric

At the centre of the experience is an **Active Belief** — one belief the user chooses to work with over time.

This creates continuity across the product instead of presenting disconnected exercises.

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/63349a3a-edf6-4e08-90ca-0d87ee69b213" />

---

## Design Principles

### Meet the user where they are

Not every moment is suitable for deep reflection. Unfold provides lower-effort paths and easy exits rather than forcing completion.

### Ground before going deeper

When someone feels overwhelmed, the first interaction should not demand analysis. Grounding is available as a first-class experience.

### Depth over volume

The product is intentionally centred around working with one active belief rather than collecting endless goals, affirmations, or journal entries.

### No guilt mechanics

There are no streaks, missed-day warnings, or pressure to maintain perfect consistency.

### Privacy by default

Personal reflections remain on the user's device. Unfold does not require an account or send reflection data to a backend.

---

## Local-First Architecture

Unfold is designed as a local-first application.

User state and reflections are stored in the browser, allowing the experience to remain:

* Private
* Account-free
* Fast
* Simple to use

The application also includes state migration to support changes between versions while preserving existing user data.

> **Note:** Because data is stored locally, clearing browser storage may remove saved reflections and progress.

---

## Tech Stack

* **TypeScript**
* **React**
* **Vite**
* **Local browser persistence**
* **Android packaging**
* **GitHub Actions**
* **GitHub Pages**

---

## Project Structure

```text
Unfold/
├── src/                 # Application source code
├── android/             # Android project
├── public/              # Static assets
├── .github/workflows/   # CI/CD workflows
├── vite.config.ts       # Vite configuration
└── package.json
```

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/rockssaka/Unfold.git
cd Unfold
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

---

## Product Philosophy

Unfold is not intended to replace therapy, professional mental-health support, or medical care.

The experience draws inspiration from concepts used in reflective and psychology-informed practices, but it is designed as a self-guided personal tool rather than a clinical intervention.

The goal is not to tell users what to think.

It is to create enough space for them to notice what they already carry — and decide what they want to work with next.

---

## Status

Unfold is an evolving personal project.

Current development is focused on refining the experience, strengthening accessibility, improving resilience of local state management, and exploring how the product can grow without compromising its privacy-first and low-pressure philosophy.

---

## Author

Created and built by **Sakshi Tyagi**.

If this project resonates with you, feel free to explore the repository or try the live experience.
