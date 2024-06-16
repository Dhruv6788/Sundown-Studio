const ListFiltering = () => {
  const data = [
    {
      name: "Angelique Morse",
      email: "benny89@yahoo.com",
      phone: "500-268-4826",
      company: "Wuckert Inc",
      role: "Sales Representative",
      status: "Banned",
      avatar: "../assets/avatar_16.jpg",
    },
    {
      name: "Ariana Lang",
      email: "avery43@hotmail.com",
      phone: "408-439-8033",
      company: "Feest Group",
      role: "Customer Service Associate",
      status: "Pending",
      avatar: "../assets/avatar_16.jpg",
    },
    {
      name: "Aspen Schmitt",
      email: "mireya13@hotmail.com",
      phone: "531-492-6028",
      company: "Kihn, Marquardt and Crist",
      role: "Content Strategist",
      status: "Banned",
      avatar: "../assets/avatar_16.jpg",
    },
    {
      name: "Brycen Jimenez",
      email: "tyrel_greenholt@gmail.com",
      phone: "201-465-1954",
      company: "Rempel, Hand and Herzog",
      role: "Software Developer",
      status: "Active",
      avatar: "../assets/avatar_16.jpg",
    },
    {
      name: "Chase Day",
      email: "joana.simonis84@gmail.com",
      phone: "285-840-9338",
      company: "Mraz, Donnelly and Collins",
      role: "Creative Director",
      status: "Banned",
      avatar: "../assets/avatar_16.jpg",
    },
  ];

  let currentPage = 1;
  let rowsPerPage = 5;
  let filteredData = [...data];

  function loadTableData() {
    const tableBody = document.querySelector("#data-table tbody");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = filteredData.slice(start, end);

    paginatedData.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td><input type="checkbox"></td>
                <td><div class="avatar"><img src="${
                  item.avatar
                }" alt="Avatar">${item.name}</div></td>
                <td>${item.phone}</td>
                <td>${item.company}</td>
                <td>${item.role}</td>
                <td><span class="status ${item.status.toLowerCase()}">${
        item.status
      }</span></td>
                <td><button class="edit-btn">✏️</button></td>
                <td><button class="delete-btn" onclick="deleteRow(${
                  index + start
                })">🗑️</button></td>
            `;

      tableBody.appendChild(row);
    });

    updatePageInfo(filteredData.length);
  }

  function deleteRow(index) {
    data.splice(index, 1);
    filterData();
  }

  function updatePageInfo(totalItems) {
    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(currentPage * rowsPerPage, totalItems);
    document.getElementById(
      "pageInfo"
    ).textContent = `${start}-${end} of ${totalItems}`;
    document.getElementById("currentPage").textContent = currentPage;
  }

  function filterData() {
    const searchValue = document
      .getElementById("searchBar")
      .value.toLowerCase();
    filteredData = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchValue) ||
        item.phone.includes(searchValue) ||
        item.company.toLowerCase().includes(searchValue) ||
        item.role.toLowerCase().includes(searchValue) ||
        item.status.toLowerCase().includes(searchValue)
      );
    });

    currentPage = 1; // Reset to first page after filtering
    loadTableData();
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadTableData();

    document.getElementById("searchBar").addEventListener("input", filterData);

    document
      .getElementById("rowsPerPage")
      .addEventListener("change", function () {
        rowsPerPage = parseInt(this.value);
        currentPage = 1;
        loadTableData();
      });

    document.getElementById("prevPage").addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        loadTableData();
      }
    });

    document.getElementById("nextPage").addEventListener("click", function () {
      if (currentPage * rowsPerPage < filteredData.length) {
        currentPage++;
        loadTableData();
      }
    });
  });
};

ListFiltering();

