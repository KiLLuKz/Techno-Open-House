// ⚠️ เปลี่ยน URL เป็นตัวใหม่ที่คุณจะได้จากการ Deploy ล่าสุด
const scriptURL = 'https://script.google.com/macros/s/AKfycbw_FsEtO_hK8cFaMACKo3nAL2d4sCYn0RTxQvaFR2kzaKtYPw0-YmwSoh6a_e41hhV3ow/exec';

const form = document.getElementById('queueForm');
const status = document.getElementById('status');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const nameValue = formData.get('name');
    const gameValue = formData.get('game');

    // Validation
    if (!nameValue || nameValue.trim() === "") {
        status.style.color = "#ff007f"; 
        status.innerText = "⚠️ กรุณากรอกชื่อ-นามสกุล!";
        form.querySelector('input[name="name"]').focus();
        return; 
    }
    if (!gameValue) {
        status.style.color = "#ff007f";
        status.innerText = "⚠️ กรุณาเลือกเกม!";
        return;
    }

    // เริ่มส่งข้อมูล
    submitBtn.disabled = true;
    status.style.color = "#ffeb3b"; 
    status.innerText = "⚡ กำลังบันทึกข้อมูล... (กรุณารอ 3 วินาที)";

    // 1. ส่งข้อมูลจอง (POST)
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            
            // 2. หน่วงเวลา 3 วินาที เพื่อให้ Database อัปเดตทัน
            setTimeout(() => {
                
                // 3. ดึงเลขคิวมาแสดง (GET)
                fetch(`${scriptURL}?name=${encodeURIComponent(nameValue)}&game=${encodeURIComponent(gameValue)}`)
                .then(res => res.text())
                .then(queueNum => {
                    status.style.color = "#39ff14"; // สีเขียว Neon
                    status.innerText = `✅ จองสำเร็จ! คุณคือคิวที่ ${queueNum} ของเกม ${gameValue}`;
                    form.reset(); 
                    submitBtn.disabled = false;
                });

            }, 3000); // รอ 3 วินาที
        })
        .catch(error => {
            status.style.color = "#ff007f";
            status.innerText = "❌ เกิดข้อผิดพลาดในการเชื่อมต่อ";
            console.error('Error!', error.message);
            submitBtn.disabled = false;
        });
});