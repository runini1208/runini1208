// 1. 鼠標跟隨
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 2. 背景變色邏輯
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const sections = [
        { id: 'north', color: '#C86C61' },
        { id: 'central', color: '#F5BD47' },
        { id: 'south', color: '#3BB0C9' },
        { id: 'east', color: '#369040' }
    ];
    let activeColor = '#F9F7F2';
    sections.forEach(s => {
        const el = document.getElementById(s.id);
        if (el && scroll >= el.offsetTop - 500) activeColor = s.color;
    });
    document.body.style.backgroundColor = activeColor;
});

// 3. 煙霧粒子動畫
const canvas = document.getElementById('smoke-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

class Particle {
    constructor(x, y) { 
        this.x = x; this.y = y; 
        this.size = Math.random()*50+20; 
        this.opacity = 0.3; 
        this.vx = Math.random()*1-0.5; 
        this.vy = Math.random()*-1.2; 
    }
    update() { this.x += this.vx; this.y += this.vy; this.opacity -= 0.002; }
    draw() { ctx.fillStyle = `rgba(73, 55, 40, ${this.opacity})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill(); }
}

function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    if (Math.random() < 0.05) particles.push(new Particle(Math.random()*canvas.width, canvas.height+50));
    particles.forEach((p, i) => { p.update(); p.draw(); if(p.opacity <=0) particles.splice(i,1); });
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) particles.push(new Particle(e.clientX, e.clientY));
});

// 4. 彈窗控制
function openModal(id) {
    const modal = document.getElementById('modal-overlay');
    document.getElementById('modal-body').innerHTML = document.getElementById(id).innerHTML;
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden'; 
}
function closeModal() {
    const modal = document.getElementById('modal-overlay');
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }, 600);
}