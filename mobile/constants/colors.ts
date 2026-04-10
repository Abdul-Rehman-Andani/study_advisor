/**
 * Study Planner Design System Colors
 * Extracted from the study-themed UI background.
 */

export const Colors = {
  // Brand & Primary Actions
  primary: "#4A676E",    // Slate Teal: Buttons, active states
  secondary: "#9ca3af",  // Muted Brown: Borders, accents
  
  // Neutral Surfaces
  background: "#F7F3EE", // Off-white: Main screen background
  surface: "#FFFFFFCC",  // White with 80% opacity: Sign-up cards (Glass effect)
  
  // Typography & Feedback
  foreground: "#333333", // Dark Grey: Primary text, headings
  muted: "#717171",      // Medium Grey: Placeholder text, subtext
  success: "#9CAF88",    // Sage Green: Completed tasks, success icons
  error: "#BA4949",    
  
  accent : "#8C6E5E"
} as const;

export type AppColors = typeof Colors;