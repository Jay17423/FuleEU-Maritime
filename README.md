# 🚢 FuelEU Maritime Compliance Platform — **Full-Stack Implementation**

## 🌟 Project Executive Summary

This project delivers a robust, full-stack compliance solution for the **FuelEU Maritime Regulation**. Built on a modern **React, Node.js, and PostgreSQL** stack, it utilizes the rigorous **Hexagonal Architecture (Ports & Adapters)** to create a scalable, testable, and maintainable platform.

The system is designed to handle core regulatory mandates, including **Greenhouse Gas (GHG) intensity assessment, Compliance Balance (CB) computation, and advanced banking and pooling mechanisms** (per FuelEU Articles 20 & 21).

---

## 🏗️ Architectural Blueprint: Hexagonal Design

The backend is strictly organized using the Ports & Adapters pattern to ensure the business logic (**Core**) remains independent of external frameworks (Database, HTTP).

### 📐 Backend Structure (Node.js/TypeScript)

| Layer | Path | Responsibility |
| :--- | :--- | :--- |
| **Domain Core** | `src/core/` | Business entities, rules, and calculation logic (GHG, CB, Banking, Pooling). |
| **Inbound Adapter** | `src/adapters/inbound/http/` | Express controllers (API layer) that translate HTTP requests into Core commands. |
| **Outbound Adapter** | `src/adapters/outbound/postgres/` | Prisma-based repositories, translating Core entities to DB operations. |
| **Infrastructure** | `src/infrastructure/` | Environment setup (Express Server, Prisma Client). |

### 🎨 Frontend Structure (React/TypeScript)

The React application complements the backend structure:

* `src/core/`: Frontend domain models and custom data hooks.
* `src/adapters/ui/`: Presentation logic (React Components, Pages).
* `src/adapters/infrastructure/`: Axios client for API consumption.

---

## ⚙️ Key Functional Modules

The platform is organized into distinct compliance tabs:

### 1. 🛳️ Route Management
* **Listing:** Displays all recorded shipping routes, showing key data like vessel/fuel type, year, and calculated emissions.
* **Baseline:** Allows setting a specific route as the compliance **Baseline** for comparison.

### 2. ⚖️ Emissions Comparison
* Fetches and visualizes the Baseline GHG Intensity against comparison routes.
* Calculates **% difference** and determines compliance status (`✅ / ❌`).
* Data visualized using interactive **Recharts** bar charts.

### 3. 💰 Compliance Banking (Article 20)
* Manages the current **Compliance Balance (CB)** for a ship/year.
* Features: **Bank** (store surplus CB) and **Apply** (offset deficit using banked CB).
* Tracks essential metrics: `cb_before`, `applied`, and `cb_after`.

### 4. 🔗 Compliance Pooling (Article 21)
* Allows the creation of a **Pool** where vessels can share their CB.
* **Validation Logic:** Enforces the regulatory constraints:
    * The collective adjusted CB (Sigma) must be $\geq 0$.
    * Deficit ships must not have a worse final balance.
    * Surplus ships must not end up in a negative balance.
* Provides a visual audit of pre- and post-pooling CBs.

---

## 🛠️ Technical Stack

| Category | Technologies |
| :--- | :--- |
| **Backend** | Node.js, Express, TypeScript, **Prisma ORM** |
| **Frontend** | React, Vite, TypeScript, **TailwindCSS**, **Recharts** |
| **Database** | **PostgreSQL** |
| **Architecture** | Hexagonal (Ports & Adapters) |
| **Tools** | ESLint, Prettier, ts-node-dev |

---

## 🗄️ Database Schema & Compliance Logic

The system relies on robust PostgreSQL models managed by Prisma:

* **`routes`**: Core shipping data (GHG intensity, fuel consumption, etc.).
* **`ship_compliance`**: CB records by ship and year.
* **`bank_entries`**: History of banked surplus.
* **`pools` / `pool_members`**: Pool configuration and member CB adjustments.

### Compliance Balance (CB) Calculation

The core financial metric is calculated as:
$$
\text{CB} = (\text{Target Intensity} - \text{Actual Intensity}) \times (\text{Fuel Consumption} \times 41,000)
$$
*Note: The 2025 Target Intensity is fixed at $89.3368 \text{ gCO₂e/MJ}$.*

---

## 🚀 Setup Guide

### 💻 Backend Setup

1.  **Navigate:** `cd Backend`
2.  **Dependencies:** `npm install`
3.  **Environment:** Create a `.env` file with your PostgreSQL connection string:
    ```env
    DATABASE_URL="postgresql://postgres:<PASSWORD>@localhost:5432/fueleu?schema=public"
    ```
4.  **DB Initialization:**
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```
5.  **Seed Data:** `npx ts-node prisma/seed.ts`
6.  **Start Server:** `npm run dev` (Runs on **http://localhost:4000**)

### 🌐 Frontend Setup

1.  **Navigate:** `cd Frontend`
2.  **Dependencies:** `npm install`
3.  **Start Client:** `npm run dev` (Runs on **http://localhost:5173**)

***Ensure the backend is running before starting the frontend!***

---

## 📡 Comprehensive API Endpoints

| Method | Endpoint | Use Case |
| :--- | :--- | :--- |
| `GET` | `/routes` | Retrieve all shipping routes. |
| `POST` | `/routes/:id/baseline` | Designate a route as the compliance baseline. |
| `GET` | `/routes/comparison` | Retrieve baseline vs. comparison data for visualization. |
| `GET` | `/compliance/cb?shipId&year` | Calculate and fetch a ship's Compliance Balance (CB). |
| `POST` | `/compliance/banking/bank` | Commit surplus CB to the bank. |
| `POST` | `/compliance/banking/apply` | Utilize banked CB to cover a current deficit. |
| `POST` | `/pools` | Create and validate a new compliance pool. |

---

## 🧪 Testing and Quality Assurance

### Automated Testing
* **Execution:** `npm run test` (in `Backend` directory)
* Focus is on unit and integration testing for the **Core** logic: CB calculation, Banking mechanism, and Pooling validation rules.

### Manual Verification
API endpoints can be tested with Postman or a browser for immediate verification of:
1.  Route listing (`/routes`)
2.  Comparison data retrieval (`/routes/comparison`)
3.  CB calculation (`/compliance/cb...`)
4.  Pool creation and validation (`/pools`)

---

## 🧩 Project Structure

```
FuelEU-Maritime/
 ├── Backend/
 │   ├── src/
 │   │   ├── core/
 │   │   ├── adapters/
 │   │   └── infrastructure/
 │   ├── prisma/
 │   ├── package.json
 │   └── .env
 ├── Frontend/
 │   ├── src/
 │   │   ├── adapters/ui/
 │   │   ├── adapters/infrastructure/
 │   │   └── core/
 │   ├── package.json
 │   └── vite.config.ts
 ├── README.md
 ├── AGENT_WORKFLOW.md
 └── REFLECTION.md
```

---


## 💡 Opportunities for Expansion

* **Security:** Implement full Authentication/Authorization (e.g., admin vs. ship operator roles).
* **User Experience:** Introduce dynamic data filters and user-specific dashboards.
* **Deployment:** Implement Dockerization and a robust CI/CD pipeline.
* **Coverage:** Achieve 100% Jest test coverage across all layers.
* **Data Visualization:** Add dedicated charts for Banking and Pooling historical performance.

---

## 🧑‍💻 Developer Profile

**Jay Prakash**
* **Education:** Master's of computer Application,MNNIT ALLAHABAD
* **GitHub:** [Jay17423](https://github.com/Jay17423)
* **Contact:** jayprakash.2023.ca@gmail.com