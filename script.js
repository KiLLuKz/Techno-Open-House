const scriptURL = 'https://script.google.com/macros/s/AKfycbx07Cw_hSjQZt3XhHNcHcx-Q5IqG4GIlrfKASEbdY0Dt5S13KqiFMaGpMQo-smlDLlVOg/exec';

const form = document.getElementById('queueForm');
const status = document.getElementById('status');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // ดึงค่าจากฟอร์ม
    const formData = new FormData(form);
    const nameValue = formData.get('name'); // ดึงค่าออกมาก่อน (อย่าเพิ่ง trim ตรงนี้เผื่อเป็น null)
    const gameValue = formData.get('game');

    // 1. เช็กชื่อก่อน (เพราะช่องกรอกชื่ออยู่บนสุด)
    if (!nameValue || nameValue.trim() === "") {
        status.style.color = "#ff007f"; 
        status.innerText = "⚠️ กรุณากรอกชื่อ-นามสกุลของคุณ!";
        // auto focus กลับไปที่ช่องชื่อ
        form.querySelector('input[name="name"]').focus();
        return; 
    }

    // 2. เช็กว่าเลือกเกมหรือยัง
    if (!gameValue) {
        status.style.color = "#ff007f";
        status.innerText = "⚠️ กรุณาเลือกเกมที่ต้องการท้าทาย!";
        return;
    }

    // --- ผ่านทุกด่าน เริ่มส่งข้อมูล ---
    submitBtn.disabled = true;
    status.style.color = "#ffeb3b"; 
    status.innerText = "⚡ SYSTEM: PROCESSING QUEUE...";

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            status.style.color = "#39ff14"; // สีเขียว Neon
            status.innerText = "✅ ACCESS GRANTED: จองคิวสำเร็จ!";
            form.reset(); // ล้างฟอร์มและปุ่มเลือก
            submitBtn.disabled = false;
            
            // (Optional) ตั้งเวลาลบข้อความแจ้งเตือนออกหลัง 5 วินาที
            setTimeout(() => {
                status.innerText = "";
            }, 5000);
        })
        .catch(error => {
            status.style.color = "#ff007f";
            status.innerText = "❌ ERROR: CONNECTION FAILED";
            console.error('Error!', error.message);
            submitBtn.disabled = false;
        });
});