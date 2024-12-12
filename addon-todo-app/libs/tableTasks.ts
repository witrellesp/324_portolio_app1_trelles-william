import { Task }  from "../types/tasks";

export const createTable = (tasks: Task[]): HTMLTableElement => {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // Define headers
  const headers: { key: keyof Task; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "title", label: "Titre" },
    { key: "description", label: "Description" },
    { key: "status", label: "État" },
  ];

  // Helper function to create a cell
  const createCell = (tag: "th" | "td", content: string): HTMLElement => {
    const cell = document.createElement(tag);
    cell.textContent = content;
    return cell;
  };

  // Create table headers
  const headerRow = document.createElement("tr");
  headers.forEach(({ label }) => {
    headerRow.appendChild(createCell("th", label));
  });
  thead.appendChild(headerRow);

  // Create table rows
  tasks.forEach((task) => {
    const row = document.createElement("tr");
    headers.forEach(({ key }) => {
      row.appendChild(createCell("td", task[key]));
    });
    tbody.appendChild(row);
  });

  // Build the table
  table.appendChild(thead);
  table.appendChild(tbody);
  table.classList.add("my-todo-table"); // Optional styling
  table.setAttribute("aria-label", "Tasks Table"); // Accessibility

  return table;
};

export default createTable;