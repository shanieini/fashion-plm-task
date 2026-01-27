# Fashion Product Lifecycle Management (PLM) System

A full-stack application designed to manage the fashion product development lifecycle, from initial design concepts through sampling to mass production. The system enforces strict business rules, tracks design evolution, and manages supplier relationships.

## 🚀 Tech Stack

* **Frontend:** React (Vite), CSS Modules (Responsive custom design)
* **Backend:** Node.js, Express, TypeScript
* **Database:** PostgreSQL
* **ORM:** Prisma (Schema modeling & Migrations)

## ✨ Key Features

* **Garment Management:** Create garments with specific attribute sets (e.g., Nightwear, Cotton) and material compositions (e.g., 95% Cotton, 5% Lycra).
* **Design Evolution (Versioning):** "Deep Clone" functionality to create new variations (v2, v3) of existing garments while preserving the history of the parent design.
* **Lifecycle Control:** Strict state transitions: `Concept` → `Sample` → `Mass Production`.
* **Business Rule Engine:** Automatically prevents invalid configurations (e.g., a garment cannot be both "Nightwear" and "Activewear").
* **Supplier & Sampling Workflow:** Simulates the process of requesting samples, approving them, and promoting a design to manufacturing.
* **Data Integrity:** Enforces constraints (e.g., garments in Mass Production cannot be deleted or modified).

## 🏗️ Architectural Decisions & Data Modeling

### 1. Database Schema (Prisma)
* **Many-to-Many Relationships (Explicit):** Used for `Garment` ↔ `Material` to allow storing metadata on the relationship itself (specifically the `percentage` of material composition).
* **Self-Relation (Adjacency List):** The `Garment` model references itself via `parentGarmentId`. This enables a tree-like structure for tracking **Design Evolution** and variations without duplicating data redundancy or losing context.
* **Soft Deletes:** Implemented via a `deletedAt` timestamp. In a PLM system, historical data is crucial; items are rarely permanently removed from the database.

### 2. Business Logic Layer
* **Service-Controller Pattern:** Logic is strictly separated from HTTP transport. The `GarmentService` handles all validations, transactions, and DB interactions, making the code testable and reusable.
* **Atomic Transactions:** Operations like "Create Garment" (which involves inserting the garment, attributes, and materials) use Prisma's nested writes to ensure database atomicity. If one part fails, the whole operation rolls back.

### 3. Assumptions & Trade-offs
* **Supplier Management:** The database schema is designed to support **multiple offers/samples** per garment (One-to-Many relationship). However, for the scope of this assessment, the UI implements a simplified "Happy Path" where a specific supplier is selected and immediately approved for production.

## 🛠️ Setup & Installation

### Prerequisites
* Node.js (v22+)
* PostgreSQL

### 1. Backend Setup
Navigate to the server directory:
cd server
npm install
npm run dev

###2. Client Setup
Navigate to the client directory:
cd client
npm install
npm run dev