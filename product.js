
    /**********************
     Demo product data (expanded)
    ***********************/
    let products = [
      { id:1, name:'Wireless Mouse', price:1599, img:'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=900&q=60', supplier:'TechGear BD', company:'Logitech', importFrom:'Malaysia', material:'Plastic, Metal', stock:24, packing:['Bubble wrap','Box','Seal'] },
      { id:2, name:'Bluetooth Speaker', price:3499, img:'Wireless Speakers.jpeg', supplier:'SoundPro Ltd.', company:'Sony', importFrom:'Japan', material:'ABS Plastic', stock:12, packing:['Foam','Box','Label'] },
      { id:3, name:'Gaming Headset', price:4999, img:'gaming_headset.jpeg', supplier:'Gadget World', company:'Razer', importFrom:'China', material:'Foam, Metal', stock:8, packing:['Bubble wrap','Box','Audio test'] },
      { id:4, name:'Keyboard', price:2250, img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=60', supplier:'TechZone', company:'HP', importFrom:'Vietnam', material:'ABS Plastic', stock:15, packing:['Paper wrap','Box','QC'] },
      { id:5, name:'Smartphone', price:5990, img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=60', supplier:'SmartTech Ltd.', company:'Samsung', importFrom:'South Korea', material:'Aluminum, Silicone', stock:7, packing:['Foam tray','Box','Charge 30%'] },
      { id:6, name:'Webcam', price:3299, img:'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=60', supplier:'CamWorld', company:'LogiCam', importFrom:'China', material:'Plastic, Glass', stock:18, packing:['Anti-static bag','Box','Lens cap'] },
      { id:7, name:'Monitor', price:12499, img:'monitor.jpeg', supplier:'DisplayHub', company:'Dell', importFrom:'Taiwan', material:'Glass, Plastic', stock:5, packing:['Foam plates','Wooden crate','Shock sensor'] },
      { id:8, name:'Laptop Stand', price:1590, img:'laptop_stand.jpeg', supplier:'DeskPro', company:'NexStand', importFrom:'China', material:'Aluminum', stock:30, packing:['Wrap','Box','Instruction slip'] },
      { id:9, name:'Power Bank', price:2599, img:'power_bank.jpeg', supplier:'ChargeIt', company:'Anker', importFrom:'China', material:'ABS Plastic', stock:20, packing:['Bubble pouch','Box','Voltage test'] },
      { id:10, name:'USB Hub', price:1299, img:'usb_hub.jpeg', supplier:'PortPro', company:'Satechi', importFrom:'China', material:'Aluminum, Plastic', stock:25, packing:['Wrap','Box','Label'] },
      { id:11, name:'LED Light Strip', price:899, img:'Led_LIGHT.jpeg', supplier:'Lightify', company:'Govee', importFrom:'China', material:'Silicone, PCB', stock:40, packing:['Roll','Box','Seal'] },
      { id:12, name:'Microphone', price:4599, img:'microphone.jpeg', supplier:'VoiceWorks', company:'Blue', importFrom:'USA', material:'Metal, Foam', stock:9, packing:['Foam','Box','Sound test'] },
      { id:13, name:'Printer', price:18999, img:'printer.jpeg', supplier:'PrintPro', company:'Epson', importFrom:'Japan', material:'Plastic, Metal', stock:6, packing:['Box','Foam','Manual'] },
      { id:14, name:'Router', price:3490, img:'router.jpeg', supplier:'NetWorld', company:'TP-Link', importFrom:'China', material:'Plastic', stock:22, packing:['Box','Label','QC'] }
    ];

    let upcoming = [
      { id:101, name:'Wireless Charger Pad', price:1899, img:'charge_pad.jpeg', supplier:'ChargeIt', company:'Belkin', importFrom:'China', material:'Plastic', stock:0, packing:['Wrap','Box'] },
      { id:102, name:'Portable Projector', price:8499, img:'portable_projector.jpeg', supplier:'BeamTech', company:'XGIMI', importFrom:'China', material:'Plastic, Glass', stock:0, packing:['Foam','Box','Calibration'] },
      { id:103, name:'Noise Cancelling Earbuds', price:6299, img:'Wireless Earbuds Sport.jpeg', supplier:'SoundPro Ltd.', company:'Bose', importFrom:'China', material:'Plastic, Silicone', stock:0, packing:['Case','Box','Pair test'] }
    ];

    // runtime state
    let brokenCount = 3;
    let improvements = ['Better cable length for power banks','Add multi-language manual for projector'];
    let selectedId = null;
    let selectedIsUpcoming = false;
    let nextId = 200;

    /**********************
     DOM refs & init
    ***********************/
    const productsGrid = document.getElementById('productsGrid');
    const upcomingGrid = document.getElementById('upcomingGrid');
    const previewImg = document.getElementById('previewImg');
    const previewName = document.getElementById('previewName');
    const previewSupplier = document.getElementById('previewSupplier');
    const packingNote = document.getElementById('packingNote');

    // charts
    let chartStock = null;
    let chartRatio = null;

    function init(){
      renderProducts();
      renderUpcoming();
      updateOverview();
      initCharts();
      window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });
    }

    /***********************
     Render functions
    ************************/
    function renderProducts(){
      productsGrid.innerHTML = '';
      products.forEach(p=>{
        const div = document.createElement('div'); div.className='product';
        div.innerHTML = `
          <div style="position:relative">
            <img src="${p.img}" alt="${escapeHTML(p.name)}">
            <div style="position:absolute; right:10px; top:10px; background:rgba(0,0,0,0.45); padding:6px 8px; border-radius:8px; font-size:12px;">Stock: ${p.stock}</div>
          </div>
          <div>
            <h3>${escapeHTML(p.name)}</h3>
            <div class="meta">${escapeHTML(p.supplier)} • ${escapeHTML(p.company)}</div>
            <div style="margin-top:8px; display:flex; justify-content:space-between; align-items:center">
              <div>
                <div class="price" style="font-weight:700">৳${numberWithCommas(p.price)}</div>
                <div class="meta" style="font-size:12px">Material: ${escapeHTML(p.material)}</div>
              </div>
              <div class="actions">
                <button class="btn alt" onclick="previewProduct(${p.id})">Preview</button>
                <button class="btn" onclick="openDetail(${p.id})">View</button>
              </div>
            </div>
          </div>
        `;
        productsGrid.appendChild(div);
      });
    }

    function renderUpcoming(){
      upcomingGrid.innerHTML = '';
      upcoming.forEach(p=>{
        const div = document.createElement('div'); div.className='product';
        div.style.position='relative';
        div.innerHTML = `
          <div style="position:relative">
            <img src="${p.img}" alt="${escapeHTML(p.name)}">
            <div class="coming-soon">Coming Soon</div>
          </div>
          <div>
            <h3>${escapeHTML(p.name)}</h3>
            <div class="meta">${escapeHTML(p.supplier)} • ${escapeHTML(p.company)}</div>
            <div style="margin-top:8px; display:flex; justify-content:space-between; align-items:center">
              <div>
                <div class="price" style="font-weight:700">৳${numberWithCommas(p.price)}</div>
                <div class="meta" style="font-size:12px">Expected stock: ${p.stock}</div>
              </div>
              <div class="actions">
                <button class="btn alt" onclick="previewProduct(${p.id}, true)">Preview</button>
                <button class="btn" onclick="openDetail(${p.id}, true)">View</button>
              </div>
            </div>
          </div>
        `;
        upcomingGrid.appendChild(div);
      });
    }

    function previewProduct(id, isUpcoming=false){
      let pool = isUpcoming ? upcoming : products;
      const item = pool.find(x=>x.id===id);
      if(!item) return;
      previewImg.src = item.img;
      previewName.textContent = item.name;
      previewSupplier.textContent = `${item.supplier} • ${item.company}`;
      packingNote.textContent = (item.packing && item.packing.length) ? 'Packing: ' + item.packing.join(' → ') : 'No packing info yet.';
      selectedId = id; selectedIsUpcoming = isUpcoming;
    }

    /***********************
     Overview and charts
    ************************/
    function updateOverview(){
      const totalProducts = products.length + upcoming.length;
      const totalStock = products.reduce((s,p)=>s + (p.stock||0),0);
      const avgPrice = Math.round(products.reduce((s,p)=>s + p.price,0) / Math.max(1,products.length));
      document.getElementById('statTotalProducts').textContent = totalProducts;
      document.getElementById('statTotalStock').textContent = totalStock;
      document.getElementById('statBroken').textContent = brokenCount;
      document.getElementById('statImprovements').textContent = improvements.length;
      document.getElementById('statAvg').textContent = `৳${numberWithCommas(avgPrice)}`;

      // chart data
      const labels = products.map(p=>p.name);
      const vals = products.map(p=> (p.price*(p.stock||0)) );
      updateChartStock(labels, vals);

      updateChartRatio();
    }

    function initCharts(){
      const ctx1 = document.getElementById('chartStock').getContext('2d');
      chartStock = new Chart(ctx1, {
        type:'bar',
        data: { labels: [], datasets:[{ label:'Stock value (৳)', data: [], borderRadius:6 }] },
        options:{
          responsive:true,
          plugins:{ legend:{ display:false }},
          scales:{
            x:{ ticks:{ color:'#cbd5e1' } },
            y:{ ticks:{ color:'#cbd5e1' }, beginAtZero:true }
          }
        }
      });

      const ctx2 = document.getElementById('chartRatio').getContext('2d');
      chartRatio = new Chart(ctx2, {
        type:'doughnut',
        data: { labels:['Broken','Improved'], datasets:[{ data:[brokenCount, improvements.length], cutout:'60%' }] },
        options:{ responsive:true, plugins:{ legend:{ position:'bottom', labels:{ color:'#cbd5e1' } } } }
      });

      updateOverview();
    }

    function updateChartStock(labels, values){
      if(!chartStock) return;
      chartStock.data.labels = labels;
      chartStock.data.datasets[0].data = values;
      chartStock.update();
    }

    function updateChartRatio(){
      if(!chartRatio) return;
      chartRatio.data.datasets[0].data = [brokenCount, improvements.length];
      chartRatio.update();
    }

    /***********************
     Modals / Detail / actions
    ************************/
    function openDetail(id, isUpcoming=false){
      let pool = isUpcoming ? upcoming : products;
      const item = pool.find(x=>x.id===id);
      if(!item) return;
      selectedId = id; selectedIsUpcoming = isUpcoming;
      // fill modal
      document.getElementById('modalImg').src = item.img;
      document.getElementById('modalTitle').textContent = item.name;
      document.getElementById('modalSupplier').textContent = `${item.supplier} • ${item.company}`;
      document.getElementById('modalPrice').textContent = `৳${numberWithCommas(item.price)}`;
      document.getElementById('modalImport').textContent = item.importFrom || '—';
      document.getElementById('modalMaterial').textContent = item.material || '—';
      document.getElementById('modalStock').textContent = item.stock || 0;
      document.getElementById('modalPacking').textContent = (item.packing && item.packing.length) ? item.packing.join(' → ') : '—';

      // show modal
      showModal('modalDetail');
    }

    function openAdd(){
      clearForm();
      showModal('modalForm');
      document.getElementById('formTitle').textContent = 'Add Product';
      document.getElementById('modalForm').dataset.mode = 'add';
    }

    function openEditFromPreview(){
      if(!selectedId) { alert('Select a product first (Preview).'); return; }
      openEditForm(selectedId, selectedIsUpcoming);
    }

    function openEditFromModal(){
      openEditForm(selectedId, selectedIsUpcoming);
    }

    function openEditForm(id, isUpcoming=false){
      let pool = isUpcoming ? upcoming : products;
      const item = pool.find(x=>x.id===id);
      if(!item) return;
      showModal('modalForm');
      document.getElementById('formTitle').textContent = 'Edit Product';
      document.getElementById('modalForm').dataset.mode = 'edit';
      document.getElementById('modalForm').dataset.editId = id;
      document.getElementById('modalForm').dataset.editUpcoming = isUpcoming ? '1' : '0';

      // populate fields
      document.getElementById('fName').value = item.name;
      document.getElementById('fImg').value = item.img;
      document.getElementById('fPrice').value = item.price;
      document.getElementById('fStock').value = item.stock || 0;
      document.getElementById('fSupplier').value = item.supplier;
      document.getElementById('fCompany').value = item.company;
      document.getElementById('fImport').value = item.importFrom;
      document.getElementById('fMaterial').value = item.material;
      document.getElementById('fPacking').value = (item.packing || []).join(', ');
    }

    function openDeleteFromPreview(){
      if(!selectedId) { alert('Select a product first (Preview).'); return; }
      openDelete(selectedId, selectedIsUpcoming);
    }

    let deletePending = null;
    function openDelete(id, isUpcoming=false){
      deletePending = { id, isUpcoming };
      const pool = isUpcoming ? upcoming : products;
      const item = pool.find(x=>x.id===id);
      document.getElementById('delName').textContent = item ? item.name : 'product';
      showModal('modalDelete');
    }

    function confirmDelete(){
      if(!deletePending) return;
      const { id, isUpcoming } = deletePending;
      if(isUpcoming){
        upcoming = upcoming.filter(x=>x.id !== id);
      } else {
        products = products.filter(x=>x.id !== id);
      }
      deletePending = null;
      closeModal();
      renderProducts();
      renderUpcoming();
      updateOverview();
      clearPreviewIfDeleted(id, isUpcoming);
    }

    function clearPreviewIfDeleted(id, isUpcoming){
      if(selectedId===id && selectedIsUpcoming===isUpcoming){
        selectedId = null; selectedIsUpcoming=false;
        previewImg.src = 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=60';
        previewName.textContent = 'Select a product';
        previewSupplier.textContent = 'Preview information will appear here';
        packingNote.textContent = 'No packing info — edit a product to add steps.'
      }
    }

    function markBrokenModal(){
      const id = selectedId; const isUp = selectedIsUpcoming;
      if(!id) return alert('Select a product (open details).');
      const pool = isUp ? upcoming : products;
      const item = pool.find(x=>x.id===id);
      if(!item) return;
      if((item.stock||0) > 0) item.stock = item.stock - 1;
      brokenCount++;
      // refresh
      renderProducts(); renderUpcoming(); updateOverview();
      // update modal displayed values
      document.getElementById('modalStock').textContent = item.stock || 0;
      updateChartRatio();
    }

    function improveModal(){
      const suggestion = prompt('Add an improvement suggestion (short):');
      if(!suggestion) return;
      improvements.push(suggestion.trim());
      updateOverview();
      updateChartRatio();
    }

    /***********************
     Form save
    ************************/
    function saveForm(){
      const mode = document.getElementById('modalForm').dataset.mode || 'add';
      const id = Number(document.getElementById('modalForm').dataset.editId || 0);
      const isUpcoming = document.getElementById('modalForm').dataset.editUpcoming === '1';
      const name = (document.getElementById('fName').value || '').trim();
      const img = (document.getElementById('fImg').value || '').trim() || 'gadgets.jpeg';
      const price = Number(document.getElementById('fPrice').value) || 0;
      const stock = Number(document.getElementById('fStock').value) || 0;
      const supplier = (document.getElementById('fSupplier').value || '').trim();
      const company = (document.getElementById('fCompany').value || '').trim();
      const imp = (document.getElementById('fImport').value || '').trim();
      const mat = (document.getElementById('fMaterial').value || '').trim();
      const packing = (document.getElementById('fPacking').value || '').split(',').map(s=>s.trim()).filter(Boolean);

      if(!name){ alert('Please provide product name'); return; }

      if(mode === 'add'){
        const newId = ++nextId;
        const newProd = { id:newId, name, img, price, stock, supplier, company, importFrom:imp, material:mat, packing };
        products.unshift(newProd);
      } else {
        // edit existing
        const pool = isUpcoming ? upcoming : products;
        const item = pool.find(x=>x.id===id);
        if(!item) return alert('Item not found');
        item.name = name; item.img = img; item.price = price; item.stock = stock;
        item.supplier = supplier; item.company = company; item.importFrom = imp; item.material = mat; item.packing = packing;
      }

      closeModal();
      renderProducts(); renderUpcoming(); updateOverview();
    }

    /***********************
     utility / modal helpers
    ************************/
    function showModal(which){
      document.getElementById('backdrop').style.display = 'flex';
      document.getElementById('modalDetail').style.display = 'none';
      document.getElementById('modalForm').style.display = 'none';
      document.getElementById('modalDelete').style.display = 'none';
      document.getElementById(which).style.display = 'block';
      // prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    function closeModal(){
      document.getElementById('backdrop').style.display = 'none';
      document.getElementById('modalDetail').style.display = 'none';
      document.getElementById('modalForm').style.display = 'none';
      document.getElementById('modalDelete').style.display = 'none';
      document.body.style.overflow = '';
      // clear form dataset
      delete document.getElementById('modalForm').dataset.mode;
      delete document.getElementById('modalForm').dataset.editId;
    }

    function backdropClick(e){
      // close only if backdrop itself clicked (not modal)
      if(e.target.id === 'backdrop') closeModal();
    }

    function openBulkExport(){
      exportCSV();
    }

    function resetDemo(){
      if(!confirm('Reset to demo data?')) return;
      // reload page to reset initial JS arrays
      location.reload();
    }

    function clearForm(){
      document.getElementById('fName').value=''; document.getElementById('fImg').value='';
      document.getElementById('fPrice').value=''; document.getElementById('fStock').value='';
      document.getElementById('fSupplier').value=''; document.getElementById('fCompany').value='';
      document.getElementById('fImport').value=''; document.getElementById('fMaterial').value='';
      document.getElementById('fPacking').value='';
      delete document.getElementById('modalForm').dataset.editId;
    }

    /* CSV export */
    function exportCSV(){
      const rows = [['id','name','price','stock','supplier','company','importFrom','material','packing']];
      products.concat(upcoming).forEach(p=>{
        rows.push([p.id, p.name, p.price, p.stock, p.supplier, p.company, p.importFrom || '', p.material || '', (p.packing||[]).join('|')]);
      });
      const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type:'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'inventory.csv';
      document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    }

    

    function escapeHTML(s){ return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }
    function numberWithCommas(x){ return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

    // ensure modal confirm delete maps to correct function
   

    // init charts and UI
    init();

    // for safety: expose some helpers to console
    window._ss = { products, upcoming, previewProduct, openAdd, openDetail };
   function goToDashboard() {
  // Navigate to your dashboard page (update URL if needed)
  window.location.href = "dashboard.html";
}


  