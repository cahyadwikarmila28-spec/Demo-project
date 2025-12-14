document.addEventListener('DOMContentLoaded', () => {
    // Fungsi untuk menampilkan section yang dipilih dan menyembunyikan yang lain
    window.showSection = (sectionId, event) => {
        if (event) {
            event.preventDefault(); // Mencegah halaman melompat atau reload
        }

        const sections = document.querySelectorAll('.content-section');
        const navLinks = document.querySelectorAll('.nav-link');
        const heroSection = document.querySelector('.hero');
        const statsContainer = document.querySelector('.stats-container');
        
        const isHomePage = (sectionId === 'beranda');
        
        // --- 1. MENGONTROL TAMPILAN HERO DAN STATS ---
        if (heroSection) {
            heroSection.style.display = isHomePage ? 'block' : 'none';
        }
        
        if (statsContainer) {
            statsContainer.style.display = isHomePage ? 'grid' : 'none'; 
        }

        // --- 2. Mengatur Section Content ---
        
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // --- 3. Mengatur status aktif pada Nav Link ---
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
        
        // --- 4. Memuat Ulang Peta (Untuk iframe - PENTING) ---
        // Jika pindah ke Peta Desa atau Peta Kecamatan, reload iframe agar peta muncul
        if (sectionId === 'peta-desa' || sectionId === 'peta-kecamatan') {
             const iframe = document.querySelector(`#${sectionId} iframe`);
             if (iframe) {
                 // Force reload the iframe source
                 // Jika Anda menggunakan file statis seperti desa.html, ini membantu
                 iframe.src = iframe.src; 
             }
        }
    };
    
    // PENTING: Inisialisasi: Tampilkan Beranda saat halaman dimuat
    setTimeout(() => {
        window.showSection('beranda'); 
    }, 50); 
});

function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".nav-links").classList.remove("active");
    });
});
