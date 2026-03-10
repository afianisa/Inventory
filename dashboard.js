(() => {
  const items = [
    { name: 'Wireless Mouse', stock: 20 },
    { name: 'Bluetooth Speaker', stock: 8 },
    { name: 'Gaming Headset', stock: 5 },
    { name: 'Keyboard', stock: 15 },
    { name: 'Smartwatch', stock: 10 },
    { name: 'Webcam', stock: 25 },
    { name: 'Monitor', stock: 12 },
    { name: 'Laptop Stand', stock: 9 },
    { name: 'USB Hub', stock: 30 },
    { name: 'Power Bank', stock: 18 },
    { name: 'LED Light Strip', stock: 7 },
    { name: 'Microphone', stock: 13 }
  ];

  document.getElementById('totalItems').textContent = items.length;
  document.getElementById('totalOrders').textContent = 124;
  document.getElementById('totalBookings').textContent = 56;
  document.getElementById('staffCount').textContent = 70;

  // Inventory Chart
  const ctx1 = document.getElementById('inventoryChart').getContext('2d');
  const grad = ctx1.createLinearGradient(0, 0, 0, 400);
  grad.addColorStop(0, 'rgba(167, 139, 250, 0.8)');
  grad.addColorStop(1, 'rgba(124, 58, 237, 0.4)');
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: items.map(i => i.name),
      datasets: [{
        label: 'Available Stock',
        data: items.map(i => i.stock),
        backgroundColor: grad,
        borderColor: '#a78bfa',
        borderWidth: 2
      }]
    },
    options: {
      plugins: { legend: { labels: { color: '#fff' } } },
      scales: {
        x: { ticks: { color: '#d1d5db' } },
        y: { beginAtZero: true, ticks: { color: '#d1d5db' } }
      }
    }
  });

  // Order Pie Chart
  const ctx2 = document.getElementById('orderChart').getContext('2d');
  new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: ['Pending', 'Packed', 'Shipped', 'Delivered', 'Cancelled'],
      datasets: [{
        data: [25, 20, 30, 40, 5],
        backgroundColor: ['#fbbf24','#3b82f6','#06b6d4','#10b981','#ef4444'],
        hoverOffset: 12
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1.3,
      plugins: { legend: { position: 'bottom', labels: { color: '#fff', font:{family:'Poppins'} } } }
    }
  });

  // Revenue Line Chart
  const ctx3 = document.getElementById('revenueChart').getContext('2d');
  const gradient = ctx3.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(6, 182, 212, 0.6)');
  gradient.addColorStop(1, 'rgba(124, 58, 237, 0.1)');
  new Chart(ctx3, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [{
        label: 'Revenue (৳)',
        data: [200000, 250000, 300000, 280000, 320000, 350000, 400000, 420000, 460000],
        fill: true,
        backgroundColor: gradient,
        borderColor: '#06b6d4',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#7c3aed'
      }]
    },
    options: {
      plugins: { legend: { labels: { color: '#fff' } } },
      scales: {
        x: { ticks: { color: '#d1d5db' } },
        y: { ticks: { color: '#d1d5db' }, beginAtZero: true }
      }
    }
  });

  // --- Modal Logic ---
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const closeModal = document.getElementById('closeModal');

  const openModal = (title, content) => {
    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    modalOverlay.style.display = 'flex';
  };

  closeModal.onclick = () => modalOverlay.style.display = 'none';
  modalOverlay.onclick = e => { if(e.target === modalOverlay) modalOverlay.style.display = 'none'; };

  // Optional: example trigger for your cards
  document.querySelectorAll('.grid .card').forEach((card, idx) => {
    card.style.cursor = 'pointer';
    card.onclick = () => {
      let title = card.querySelector('h3').textContent;
      let content = '';
      if(title === 'Total Items'){
        content = items.map(i => `${i.name} - Stock: ${i.stock}`).join('<br>');
      } else if(title === 'Total Orders'){
        content = '📦 Total Orders: 124<br>✅ 98 Processed<br>🚚 30 Shipped<br>❌ 5 Cancelled';
      } else if(title === 'Bookings'){
        content = '🕓 21 Pending<br>💰 35 Confirmed<br>❌ 5 Cancelled';
      } else if(title === 'Staff Members'){
        content = '👥 70 Staff Members<br>👨‍💼 50 Active<br>🏖️ 5 On Leave<br>🧾 15 Part-time';
      }
      openModal(title, content);
    }
  });
})();