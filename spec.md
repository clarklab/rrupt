# 🔔 RRUPT — Build Spec (Agent Version)

## Overview
A static PWA reminder app for ADHD users. Reminders ("Interruptions") trigger attention-grabbing animations/sounds/GIFs that are hard to ignore.

## Tech Stack
- **Frontend:** Single HTML file with embedded JS/CSS (or minimal React if needed for state)
- **Storage:** localStorage only (no backend)
- **Notifications:** Web Notifications API + Service Worker for background triggers
- **Hosting:** Netlify static deploy
- **Assets:** Hosted GIFs/sounds or user-provided URLs

## Core Data Model
```
Interruption {
  id: string
  title: string
  datetime: ISO string
  notes: string (optional)
  rruptType: 'gif' | 'sound' | 'video'
  rruptUrl: string (URL to media)
  snoozedUntil: ISO string | null
}
```

## MVP Features (Priority Order)

### 1. Permission Flow
- On first visit, immediately prompt for notification permissions
- Show friendly explainer before browser prompt
- Store permission state in localStorage

### 2. Create Interruption
- Simple form: title, date/time picker, optional notes
- Rrupt picker: choose from ~5-10 preset GIFs/sounds OR paste custom URL
- Save to localStorage array

### 3. List View
- Show upcoming Interruptions sorted by datetime
- Swipe/tap to delete
- Visual indicator of rrupt type

### 4. Notification Trigger
- Service Worker checks schedule (or uses `setTimeout` for near-term)
- Fires system notification with title + badge icon
- Notification actions: "View" / "Snooze 5min"

### 5. Rrupt Display
- Clicking notification (or "View") opens app to full-screen rrupt animation
- Rrupt plays GIF/video/sound prominently
- Big dismiss button
- "Snooze" button triggers rrupt again after delay

### 6. Goofy UI
- Bright gradient backgrounds (pink/yellow/cyan)
- Wobbly/rounded shapes
- Playful sans-serif font (e.g., Nunito, Fredoka)
- Subtle CSS animations on buttons/cards

## File Structure
```
/index.html        — Main app shell
/sw.js             — Service Worker for notifications
/manifest.json     — PWA manifest
/assets/           — Preset GIFs/sounds
```

## Out of Scope (v1)
- User accounts / sync
- Custom sound uploads
- Recurring reminders
- Multiple rrupt stacking ("conspiring" animations)
- AI-generated rrupts

---

# 🎉 RRUPT — Elevator Pitch (Human Version)

**What is it?**
A simple reminder app for people who ignore notifications. Instead of a boring ding, RRUPT hits you with a full-screen GIF, silly sound, or video that's impossible to tune out.

**How it works:**
1. Open the app, allow notifications
2. Add a reminder: "Take meds" at 2pm, pick a dancing cat GIF
3. At 2pm, you get a notification
4. Tap it → BOOM, dancing cat takes over your screen until you acknowledge it

**Why it's different:**
Regular notifications blend into the noise. RRUPT is designed to be *delightfully annoying*—bright colors, goofy animations, stuff that actually grabs your ADHD brain.

**Tech:**
Runs entirely in your browser. No account needed. Your reminders stay on your device.

**MVP scope:**
- Add/delete reminders
- Pick from preset animations/sounds
- Get notified, see the rrupt, snooze or dismiss

---

Want me to refine either spec, or should I start building this?