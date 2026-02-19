# Arkemax AI Toolkit - Development Plan

- [ ] **Initialization**
    - [ ] Analyze Arkemax branding (colors, fonts, style)
    - [ ] Update `metadata.json`
    - [ ] Install dependencies (`react-router-dom`, `react-markdown`)
    - [ ] Setup project structure (Layout, Pages, Components)

- [ ] **Core Layout & Navigation**
    - [ ] Create Main Layout with Sidebar/Navigation
    - [ ] Implement Persistent AI Chat Assistant (Sidebar/Floating)
    - [ ] Create Home/Dashboard Page

- [ ] **Feature: AI Chat Assistant**
    - [ ] Implement Chat UI (Messages, Input)
    - [ ] Integrate Gemini API (`gemini-3.1-pro-preview`)
    - [ ] Add System Instruction for "Arkemax Guide" persona (knows about app features)

- [ ] **Feature: 3D Floor Plan Generator**
    - [ ] Create "3D Floor Plan" Page
    - [ ] Implement Image Upload (for 2D sketch/plan)
    - [ ] Implement Prompt Input (optional refinements)
    - [ ] Integrate Gemini Image API (`gemini-3-pro-image-preview` aka "nanobanana pro") to generate 3D view from 2D input
    - [ ] Display Result & Download option
    - [ ] Add "How to use" guide section

- [ ] **Styling & Polish**
    - [ ] Apply Arkemax color palette (extracted from website)
    - [ ] Ensure responsive design
    - [ ] Add smooth transitions (Framer Motion)
