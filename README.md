
# Fashion Product Lifecycle Management (PLM) System

A full-stack application for managing the fashion product development lifecycle, from initial design concepts through sampling to mass production. The system enforces strict business rules, tracks design evolution, and manages supplier relationships.

## Tech Stack

- **Frontend:** React (Vite), CSS Modules (responsive custom design)
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma (schema modeling & migrations)

## Key Features

- **Garment Management:** Create garments with specific attribute sets (e.g., Nightwear, Cotton) and material compositions (e.g., 95% Cotton, 5% Lycra)
- **Design Evolution (Versioning):** "Deep Clone" functionality to create new variations (v2, v3) of existing garments while preserving the history of the parent design
- **Lifecycle Control:** Strict state transitions: `Concept` → `Sample` → `Mass Production`
- **Business Rule Engine:** Prevents invalid configurations (e.g., a garment cannot be both "Nightwear" and "Activewear")
- **Supplier & Sampling Workflow:** Simulates requesting samples, approving them, and promoting a design to manufacturing
- **Data Integrity:** Enforces constraints (e.g., garments in Mass Production cannot be deleted or modified)

## Architectural Decisions & Data Modeling

### Database Schema (Prisma)

- **Many-to-Many Relationships (Explicit):** Used for `Garment` ↔ `Material` to allow storing metadata on the relationship itself (specifically the `percentage` of material composition)
- **Self-Relation (Adjacency List):** The `Garment` model references itself via `parentGarmentId` to enable a tree-like structure for tracking design evolution and variations
- **Soft Deletes:** Implemented via a `deletedAt` timestamp; historical data is preserved

### Business Logic Layer

- **Service-Controller Pattern:** Logic is separated from HTTP transport. The `GarmentService` handles all validations, transactions, and DB interactions
- **Atomic Transactions:** Operations like "Create Garment" use Prisma's nested writes to ensure database atomicity

### Assumptions & Trade-offs

- **Supplier Management:** The schema supports multiple offers/samples per garment (one-to-many). The UI implements a simplified "Happy Path" where a supplier is selected and immediately approved for production

---

## Setup & Installation

### Prerequisites

- Node.js (v22+)
- PostgreSQL

### 1. Configure Environment Variables

Create a `.env` file inside the `server` directory (or update it if it exists):

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/fashion_plm"
```

Prisma relies on the `DATABASE_URL` variable to establish the database connection.

### 2. Install Backend Dependencies

```sh
cd server
npm install
```

### 3. Apply Database Schema (server folder)

For assessment purposes, the database schema can be applied using Prisma's
`db push` command, which synchronizes the schema without creating migration
history files:

npx prisma db push


### 4. Seed Initial Data (server folder)

To insert base reference data (e.g., materials):

```sh
npx prisma db seed
```

### 5. (Optional) Open Prisma Studio (server folder)

Launch a browser-based UI to inspect garments, materials, lifecycle states, and version relationships:

```sh
npx prisma studio
```

### 6. Start the Backend Server

```sh
cd server
npm run dev
```

### 7. Start the Client

```sh
cd client
npm install
npm run dev
```

## Why Prisma?

Prisma was chosen for its strong type safety, expressive schema modeling,
and transactional guarantees, which are critical for enforcing strict
business rules and lifecycle constraints in a PLM system.
