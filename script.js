document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Display existing expenses
    function displayExpenses() {
      expenseList.innerHTML = '';
      expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${expense.name}: $${expense.amount}</span>
          <button class="edit" data-index="${index}">Edit</button>
          <button class="delete" data-index="${index}">Delete</button>
        `;
        expenseList.appendChild(li);
      });
    }

    displayExpenses();

    // Add new expense
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('expenseName').value;
      const amount = parseFloat(document.getElementById('expenseAmount').value);

      if (name && amount) {
        expenses.push({ name, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
        expenseForm.reset();
      } else {
        alert('Please fill out all fields');
      }
    });

    // Delete expense
    expenseList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        const index = e.target.dataset.index;
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
      }
    });

    // Edit expense
    expenseList.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit')) {
        const index = e.target.dataset.index;
        const newName = prompt('Enter new expense name:');
        const newAmount = parseFloat(prompt('Enter new amount:'));
        if (newName && newAmount) {
          expenses[index] = { name: newName, amount: newAmount };
          localStorage.setItem('expenses', JSON.stringify(expenses));
          displayExpenses();
        } else {
          alert('Please fill out all fields');
        }
      }
    });
  });