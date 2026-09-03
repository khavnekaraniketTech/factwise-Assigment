import React, { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useEmployees } from "../context/EmployeeContext";
import {
  StatusCellRenderer,
  SkillsCellRenderer,
} from "../components/CustomRenderers";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function EmployeeDashboard() {
  const { employees, quickFilter, setQuickFilter, metrics } = useEmployees();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [quickFilter]);

  const columnDefs = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70, sortable: true },
      {
        headerName: "Full Name",
        valueGetter: (params) =>
          `${params.data.firstName} ${params.data.lastName}`,
        sortable: true,
        filter: true,
        flex: 1,
      },
      { field: "email", headerName: "Email", flex: 1.2, filter: true },
      {
        field: "department",
        headerName: "Department",
        sortable: true,
        filter: true,
      },
      { field: "position", headerName: "Position", flex: 1, filter: true },
      {
        field: "salary",
        headerName: "Salary",
        sortable: true,
        filter: "agNumberColumnFilter",
        valueFormatter: (params) => `$${params.value.toLocaleString()}`,
      },
      {
        field: "location",
        headerName: "Location",
        sortable: true,
        filter: true,
      },
      {
        field: "performanceRating",
        headerName: "Rating",
        width: 100,
        sortable: true,
      },
      {
        field: "isActive",
        headerName: "Status",
        cellRenderer: StatusCellRenderer,
        width: 110,
      },
      {
        field: "skills",
        headerName: "Skills",
        cellRenderer: SkillsCellRenderer,
        flex: 1.5,
      },
    ],
    [],
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      filter: true,
    }),
    [],
  );

  const filteredEmployees = useMemo(() => {
    if (!quickFilter.trim()) return employees;

    const term = quickFilter.toLowerCase();
    return employees.filter((emp) => {
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      const email = emp.email?.toLowerCase() || "";
      const department = emp.department?.toLowerCase() || "";
      const position = emp.position?.toLowerCase() || "";
      const location = emp.location?.toLowerCase() || "";
      const skills = Array.isArray(emp.skills)
        ? emp.skills.join(" ").toLowerCase()
        : "";
      const status = emp.isActive ? "active" : "inactive";

      return (
        fullName.includes(term) ||
        email.includes(term) ||
        department.includes(term) ||
        position.includes(term) ||
        location.includes(term) ||
        skills.includes(term) ||
        status.includes(term)
      );
    });
  }, [employees, quickFilter]);

  const totalPages = Math.ceil(filteredEmployees.length / pageSize) || 1;
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredEmployees.slice(startIndex, startIndex + pageSize);
  }, [filteredEmployees, currentPage, pageSize]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            HR Employee Dashboard
          </h1>
          <p className="text-sm text-slate-500">AG Grid Data Visualization</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">Total Employees</p>
          <p className="text-2xl font-bold text-slate-800">{metrics.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">Active Staff</p>
          <p className="text-2xl font-bold text-green-600">{metrics.active}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">Average Salary</p>
          <p className="text-2xl font-bold text-blue-600">
            ${metrics.avgSalary.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search employees by name, skill, position..."
          value={quickFilter}
          onChange={(e) => setQuickFilter(e.target.value)}
          className="px-3.5 py-2 w-80 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {/* Grid Table Container */}
      <div className="ag-theme-alpine w-full rounded-t-lg overflow-hidden border border-slate-200 shadow-sm bg-white">
        <AgGridReact
          rowData={paginatedEmployees}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          domLayout="autoHeight"
          animateRows={true}
        />
      </div>

      {/* Manual Custom Pagination Bar */}
      <div className="flex justify-between items-center bg-white p-4 border-x border-b border-slate-200 rounded-b-lg text-sm text-slate-600 shadow-sm">
        <div>
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {paginatedEmployees.length > 0
              ? (currentPage - 1) * pageSize + 1
              : 0}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-slate-900">
            {Math.min(currentPage * pageSize, filteredEmployees.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">
            {filteredEmployees.length}
          </span>{" "}
          results
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
          >
            Previous
          </button>

          <span className="px-2 font-medium text-slate-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage >= totalPages}
            className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
