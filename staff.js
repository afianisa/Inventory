// ...existing code...
// Employees data with real person photos from randomuser.me
const employeesData = {
  fulltime: [],
  parttime: [],
  onleave: [],
};

const names = [
  "Alice Johnson", "Michael Smith", "Jessica Lee", "David Brown", "Emily Davis",
  "James Wilson", "Sarah Miller", "Robert Moore", "Laura Taylor", "Daniel Anderson"
];

// We'll fetch real images from randomuser.me for each employee
async function fetchRandomUsers(count) {
  const res = await fetch(`https://randomuser.me/api/?results=${count}&inc=name,picture`);
  const data = await res.json();
  return data.results;
}

// Generate employees with real photos and random salary, paid status
async function generateEmployees() {
  const sections = ['fulltime', 'parttime', 'onleave'];
  for (const section of sections) {
    const users = await fetchRandomUsers(10);
    for (let i=0; i<10; i++) {
      const user = users[i];
      employeesData[section].push({
        id: section + i,
        name: `${user.name.first} ${user.name.last}`,
        salary: Math.floor(3000 + Math.random()*3500),
        paid: Math.random() < 0.4,  // 40% chance paid
        photo: user.picture.large
      });
    }
  }
  renderEmployees(currentSection);
  updateSalaryChart();
}

// Elements
const sidebarButtons = document.querySelectorAll('.section-btn');
const mainContent = document.getElementById('mainContent');
const employeeModal = document.getElementById('employeeModal');
const modalAvatar = document.getElementById('modalAvatar');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalSalary = document.getElementById('modalSalary');
const modalStatus = document.getElementById('modalStatus');
const paySalaryBtn = document.getElementById('paySalaryBtn');
const modalCloseBtn = document.getElementById('modalClose');

const paymentModal = document.getElementById('paymentModal');
const paymentCloseBtn = document.getElementById('paymentClose');
const paymentForm = document.getElementById('paymentForm');
const paymentAmount = document.getElementById('paymentAmount');

const confirmationModal = document.getElementById('confirmationModal');
const confirmCloseBtn = document.getElementById('confirmClose');

let currentSection = 'fulltime';
let currentEmployee = null;

// Render employee cards for a section
function renderEmployees(section) {
  mainContent.innerHTML = '';
  const list = employeesData[section];
  if(!list || list.length === 0){
    mainContent.innerHTML = '<p style="font-weight:600; font-size:1.2rem; color:#9ca3af;">No employees found.</p>';
    return;
  }
  list.forEach(emp => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${emp.name}, salary $${emp.salary}, payment status ${emp.paid ? 'paid' : 'pending'}`);
    card.innerHTML = `
      <img class="avatar" src="${emp.photo}" alt="Photo of ${emp.name}" />
      <div class="employee-name">${emp.name}</div>
      <div class="salary-info">Salary: $${emp.salary}</div>
      <div class="payment-status ${emp.paid ? 'paid' : ''}">${emp.paid ? 'Paid' : 'Pending'}</div>
    `;
    card.onclick = () => openEmployeeModal(emp);
    card.onkeypress = e => { if(e.key === 'Enter' || e.key === ' ') openEmployeeModal(emp); };
    mainContent.appendChild(card);
  });
}

// Open employee details modal
function openEmployeeModal(emp) {
  currentEmployee = emp;
  modalAvatar.src = emp.photo;
  modalAvatar.alt = `Photo of ${emp.name}`;
  modalTitle.textContent = emp.name;
  modalDesc.textContent = `Employee ID: ${emp.id}`;
  modalSalary.textContent = emp.salary;
  modalStatus.textContent = emp.paid ? 'Paid' : 'Pending';
  modalStatus.className = 'payment-status ' + (emp.paid ? 'paid' : '');
  paySalaryBtn.disabled = emp.paid;
  employeeModal.classList.add('active');
  paySalaryBtn.focus();
}

// Close employee modal
modalCloseBtn.addEventListener('click', () => {
  employeeModal.classList.remove('active');
});

// Close payment modal
paymentCloseBtn.addEventListener('click', () => {
  paymentModal.classList.remove('active');
});

// Close confirmation modal
confirmCloseBtn.addEventListener('click', () => {
  confirmationModal.classList.remove('active');
});

// Sidebar button click
sidebarButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    sidebarButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSection = btn.dataset.section;
    renderEmployees(currentSection);
    updateSalaryChart();
  });
});

// On Pay Salary button click, show payment modal with employee info
paySalaryBtn.addEventListener('click', () => {
  if (!currentEmployee) return;
  paymentAmount.textContent = currentEmployee.salary;
  paymentForm.reset();
  employeeModal.classList.remove('active');
  paymentModal.classList.add('active');
  paymentForm.elements.cardName.focus();
});

// Payment form submission simulation
paymentForm.addEventListener('submit', e => {
  e.preventDefault();
  // For demo, just simulate success after validation

  // Validate card number length (16 digits)
  const cardNumber = paymentForm.cardNumber.value.replace(/\s+/g, '');
  if (cardNumber.length !== 16 || !/^\d{16}$/.test(cardNumber)) {
    alert('Please enter a valid 16-digit card number.');
    paymentForm.cardNumber.focus();
    return;
  }
  // Validate expiry date MM/YY format
  const expiry = paymentForm.expiryDate.value;
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
    alert('Please enter a valid expiry date in MM/YY format.');
    paymentForm.expiryDate.focus();
    return;
  }
  // Validate CVV length (3 digits)
  if (!/^\d{3}$/.test(paymentForm.cvv.value)) {
    alert('Please enter a valid 3-digit CVV.');
    paymentForm.cvv.focus();
    return;
  }

  // Simulate payment processing delay
  paymentForm.querySelector('button[type="submit"]').disabled = true;
  paymentForm.querySelector('button[type="submit"]').textContent = 'Processing...';

  setTimeout(() => {
    // Mark employee as paid
    currentEmployee.paid = true;

    // Update UI
    renderEmployees(currentSection);
    updateSalaryChart();

    paymentModal.classList.remove('active');
    confirmationModal.classList.add('active');

    paymentForm.querySelector('button[type="submit"]').disabled = false;
    paymentForm.querySelector('button[type="submit"]').textContent = `Pay $${currentEmployee.salary}`;
  }, 1500);
});

// Chart.js salary payment pie chart
const ctx = document.getElementById('salaryChart').getContext('2d');
let salaryChart;

function updateSalaryChart() {
  const list = employeesData[currentSection];
  const paidCount = list.filter(e => e.paid).length;
  const pendingCount = list.length - paidCount;

  const data = {
    labels: ['Paid', 'Pending'],
    datasets: [{
      data: [paidCount, pendingCount],
      backgroundColor: [varToRgb('--accent-1', '#7c3aed'), varToRgb('--accent-2', '#06b6d4')],
      borderWidth: 1,
    }]
  };

  if(salaryChart){
    salaryChart.data = data;
    salaryChart.update();
  } else {
    salaryChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#d0d0ff',
              font: { family: 'Poppins' }
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(124,58,237,0.8)'
          }
        }
      }
    });
  }
}

// Helper to get CSS variable color fallback
function varToRgb(varName, fallback) {
  const style = getComputedStyle(document.documentElement);
  const color = style.getPropertyValue(varName).trim() || fallback;
  return color;
}

// Initialize
generateEmployees();

// Accessibility: close modals with Escape key
document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    if(employeeModal.classList.contains('active')) employeeModal.classList.remove('active');
    if(paymentModal.classList.contains('active')) paymentModal.classList.remove('active');
    if(confirmationModal.classList.contains('active')) confirmationModal.classList.remove('active');
  }
});