// script.js

// 1. นำ URL ที่ได้จากการ Deploy Google Apps Script มาวางที่นี่
const scriptURL = 'ใส่_WEB_APP_URL_ของคุณตรงนี้';

const form = document.getElementById('queueForm');
const status = document.getElementById('status');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // ล็อกปุ่มกดเพื่อป้องกันการกดซ้ำ
    submitBtn.disabled = true;
    status.style.color = "#e3b341";
    status.innerText = "⏳ กำลังบันทึกคิวของคุณ...";

    // ส่งข้อมูลไปยัง Google Sheets
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            status.style.color = "#3fb950";
            status.innerText = "✅ จองคิวสำเร็จ! รอเจ้าหน้าที่เรียกชื่อครับ";
            form.reset();
            submitBtn.disabled = false;
        })
        .catch(error => {
            status.style.color = "#f85149";
            status.innerText = "❌ เกิดข้อผิดพลาด กรุณาแจ้งเจ้าหน้าที่ซุ้ม";
            console.error('Error!', error.message);
            submitBtn.disabled = false;
        });
});