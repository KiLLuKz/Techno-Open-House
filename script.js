const scriptURL = 'https://script.google.com/macros/s/AKfycbwjIi2i5zvxKpvHafwDS-PRIlIK1F7bWkjGf__YouNBrCPx-rIRiHlKvmSDr587OUPqVA/exec';

const form = document.getElementById('queueForm');
const status = document.getElementById('status');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // ดึงค่าจากฟอร์มมาเช็กก่อน
    const formData = new FormData(form);
    const nameValue = formData.get('name').trim(); // ตัดช่องว่างหน้า-หลังออก
    const gameValue = formData.get('game');

    // --- ส่วนที่เพิ่มเข้ามา: เช็กว่าชื่อว่างไหม ---
    if (nameValue === "" || nameValue === null) {
        status.style.color = "#ff007f"; // สีชมพูเตือน
        status.innerText = "⚠️ กรุณาใส่ชื่อของคุณก่อนจองคิว!";
        return; // หยุดการทำงาน ไม่ส่ง fetch
    }
    // ---------------------------------------

    submitBtn.disabled = true;
    status.style.color = "#ffeb3b"; 
    status.innerText = "⚡ SYSTEM: PROCESSING QUEUE...";

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            status.style.color = "#39ff14"; 
            status.innerText = "✅ ACCESS GRANTED: จองคิวสำเร็จ!";
            form.reset();
            submitBtn.disabled = false;
        })
        .catch(error => {
            status.style.color = "#ff007f";
            status.innerText = "❌ ERROR: CONNECTION FAILED";
            console.error('Error!', error.message);
            submitBtn.disabled = false;
        });
});