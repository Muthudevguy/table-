const table = document.getElementById('myTable');
const tbody = table.getElementsByTagName('tbody')[0];
const rows = Array.from(tbody.getElementsByTagName('tr'));

let sortColumn = 0; 
let sortOrder = 1; 
let currentPage = 1;
const rowsPerPage = 5; 

function sortTable(column) {
  if (sortColumn === column) {
    sortOrder *= -1; // Change the sort order if the same column is clicked again
  } else {
    sortColumn = column;
    sortOrder = 1;
  }

  rows.sort((a, b) => {
    const aValue = a.getElementsByTagName('td')[column].innerText;
    const bValue = b.getElementsByTagName('td')[column].innerText;
    return sortOrder * (aValue.localeCompare(bValue));
  });

  updateTable();
}

function updateTable() {
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;

  tbody.innerHTML = '';
  for (let i = startIdx; i < endIdx && i < rows.length; i++) {
    tbody.appendChild(rows[i].cloneNode(true));
  }

  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const paginationDiv = document.getElementById('pagination');
  paginationDiv.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.onclick = () => {
      currentPage = i;
      updateTable();
    };
    paginationDiv.appendChild(button);
  }
}
sortTable(sortColumn);