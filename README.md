# HR Employee Dashboard (Factwise Assignment)

A responsive, high-performance internal employee management dashboard built with **React**, **AG Grid**, **Tailwind CSS**, and **React Context API**.

---

## 🛠️ Installation & Setup Instructions

### 1. Prerequisites
Ensure you have **Node.js (v18 or higher)** and **npm** installed on your machine.

### 2. Install Dependencies

Install all core application dependencies:


npm install react-router-dom ag-grid-react ag-grid-community
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
Run the Development Server
Start the local Vite development server:

Bash
npm run dev
Open your browser and navigate to http://localhost:5173 to view the application.

🚀 Key Features & Implementation Details
1. Multi-Field Global Search
Search is powered directly via React’s useMemo hook to ensure instant, real-time filtering without relying on complex grid state engine mutations:

Multi-Property Matching: Filters across firstName, lastName, email, department, position, location, skills, and isActive status.

Auto Page Reset: Automatically resets the active pagination view back to Page 1 on every keystroke to prevent out-of-bounds page indices.

2. Controlled Custom Pagination
To avoid container height layout constraints and cross-version AG Grid CSS pagination bugs, pagination is managed at the React application level:

Fixed Page Size: Limits visible rows strictly to 10 per page (pageSize = 10).

Controlled Dataset Slicing: Slices the search-filtered employee array dynamically before passing rows down to <AgGridReact />.

Custom Pagination Footer: Features dynamic range counts (Showing X to Y of Z results), total page count indicators, and disabled navigation buttons for edge pages.
fact-wise/
├── src/
│   ├── components/
│   │   └── CustomRenderers.jsx    # AG Grid status badges & skill pill renderers
│   ├── context/
│   │   └── EmployeeContext.jsx    # Global state management for employee data
│   ├── pages/
│   │   └── EmployeeDashboard.jsx  # Main dashboard layout, search, & pagination
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
