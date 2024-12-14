const accountList = document.getElementById('accountList');
let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
const generateAccountNumber = () => `ACC-${Date.now()}`;


function renderAccounts() {
    accountList.innerHTML = '';
    if (accounts.length === 0) {
        accountList.innerHTML = '<tr><td colspan="5" class="text-muted text-center">No accounts added yet.</td></tr>';
    } else {
        accounts.forEach((account, index) => {
            accountList.innerHTML += `
                <tr>
                    <td>${account.name}</td>
                    <td>${account.number}</td>
                    <td>${account.type}</td>
                    <td>${account.balance}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-2" onclick="editAccount(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteAccount(${index})">Delete</button>
                    </td>
                </tr>
            `;
        });
    }
}

// Save accounts to localStorage
function saveToLocalStorage() {
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

document.getElementById('addAccountForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Form validation
    const accountName = document.getElementById('accountName').value.trim();
    const accountNumber = document.getElementById('accountNumber').value.trim();
    const accountType = document.getElementById('accountType').value;
    const initialBalance = parseFloat(document.getElementById('initialBalance').value);

    if (!accountName || !accountNumber || !accountType || isNaN(initialBalance)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    // Check for duplicate account numbers
    const isDuplicate = accounts.some(account => account.number === accountNumber);
    if (isDuplicate) {
        alert("Account number must be unique. Please use a different number.");
        return;
    }

    // Add new account
    accounts.push({ name: accountName, number: accountNumber, type: accountType, balance: initialBalance });
    renderAccounts();
    saveToLocalStorage();
    document.getElementById('addAccountForm').reset();
});

function editAccount(index) {
    const account = accounts[index];

    document.getElementById('accountName').value = account.name;
    document.getElementById('accountNumber').value = account.number;
    document.getElementById('accountType').value = account.type;
    document.getElementById('initialBalance').value = account.balance;

    // Remove the account from the array so it won't be duplicated
    accounts.splice(index, 1);
    renderAccounts();
    saveToLocalStorage();
}

function deleteAccount(index) {
    accounts.splice(index, 1);
    renderAccounts();
    saveToLocalStorage();
}

renderAccounts();
