# 🤖 AI Agent Workflow Log — Development Process Summary

This document explains how AI tools supported the development of the **FuelEU Maritime Compliance Platform**.  
The goal was not to let AI write the project, but to use it as an assistant to speed up workflows and improve clarity while keeping decision-making and logic design in my hands.

---

## ⚙️ AI Tools Used and Their Roles

| Tool | Role | Where It Helped |
|------|------|----------------|
| **ChatGPT (GPT-5)** | High-level guidance & architecture planning | Designing backend flow, route comparisons, CB logic, UI planning |
| **GitHub Copilot** | Inline code suggestions | Repetitive React code, TypeScript types, function templates |
| **Claude / Similar AI (Optional)** | Concept clarification | Understanding compliance rules, emissions formula reasoning |
| **Cursor / IDE AI (if available)** | Quick refactor hints | Improved readability of APIs and state handlers |

---

## 🧠 Prompt Examples & How They Were Used

### 1) Backend — Route Comparison Logic
**Prompt:**  
“Write a controller for `/routes/comparison` that calculates % difference from baseline and returns compliance flags.”

**AI Output:**  
- Suggested Prisma query for baseline/other routes  
- Provided percent difference formula  
- Added initial compliance boolean logic  

**My Edits:**  
- Renamed variables for clarity  
- Added null checks for missing baseline  
- Improved response formatting

---

### 2) Frontend — CompareTab UI
**Prompt:**  
“Create a CompareTab component that fetches comparison data and renders a bar chart using Recharts.”

**AI Output:**  
- Generated functional React component with `<BarChart>` setup  
- Added `<Tooltip>`, `<Legend>`, `<CartesianGrid>`  

**My Edits:**  
- Fixed TypeScript data shape mismatches  
- Handled loading & empty-state UI  
- Adjusted color palette for consistency

---

### 3) Fixing Prisma Environment Issues
**Prompt:**  
“Why does Prisma say `Missing DATABASE_URL`?”

**AI Guidance:**  
- Suggested checking `.env` placement  
- Provided Windows-compatible environment variable syntax  

**My Fix:**  
- Created `.env` in correct backend folder  
- Re-ran `npx prisma generate` after fix  

---

## 🧪 Common Issues & How I Validated Them

| Issue Encountered | AI Suggestion | Final Fix I Applied |
|------------------|--------------|--------------------|
| TS errors with Node modules | Install `@types/node` | Also updated `tsconfig.json` paths |
| Incorrect import paths | Use relative imports | Standardized to consistent folder structure |
| UI breaking on incomplete API data | Add null checks | Added defensive rendering + fallback values |
| Pooling logic confusion | Ensure ΣCB ≥ 0 rule | Tested with multiple example datasets manually |

---

## 📊 Observations on AI Effectiveness

### ✅ Helpful For:
- Rapid scaffolding of backend + frontend structure  
- Reducing boilerplate coding effort  
- Understanding complex formula steps  
- Debugging environment-related issues faster  

### ⚠️ Required Human Oversight:
- Code correctness and logic validation  
- Data flow consistency between backend & frontend  
- Error handling and API stability  
- Ensuring real compliance rules were implemented accurately  

---

## 🧠 Workflow Strategy Used

1. **Ask AI for structural guidance**, not full solution.  
2. **Let Copilot fill small repetitive parts** in code.  
3. **Test APIs via Postman** and inspect actual values.  
4. **Debug manually** when logic mismatches occurred.  
5. **Commit feature by feature** instead of bulk commits.

---

## 🧭 Final Takeaway

This project showed that **AI is most powerful when used as a helper, not a replacement**.  
I did not copy-paste blindly — instead, I used AI to:
- Accelerate setup
- Improve clarity
- Explore better patterns

But the **final logic, structure, debugging, and validation** were done by me.

---

**Jay Prakash**  
Master of Computer Application — MNNIT Allahabad  
November 2025
