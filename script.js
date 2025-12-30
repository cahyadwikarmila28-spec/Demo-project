/**
 * ============================================
 * KARANGLEWAS KIDUL - PORTAL INFORMASI GEOGRAFIS
 * JavaScript - File Terpisah
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portal Informasi Geografis Karanglewas Kidul - Dimuat');

    /**
     * Fungsi untuk menampilkan section yang dipilih
     * @param {string} sectionId - ID section yang akan ditampilkan
     * @param {Event} event - Event object dari click
     */
    window.showSection = (sectionId, event) => {
        // Mencegah default action dari link
        if (event) {
            event.preventDefault();
        }

        // Ambil semua elemen yang diperlukan
        const sections = document.querySelectorAll('.content-section');
        const navLinks = document.querySelectorAll('.nav-link');
        const heroSection = document.querySelector('.hero');
        const statsContainer = document.querySelector('.stats-container');
        
        // Cek apakah ini halaman beranda
        const isHomePage = (sectionId === 'beranda');
        
        // Kontrol tampilan Hero dan Stats (hanya tampil di beranda)
        if (heroSection) {
            heroSection.style.display = isHomePage ? 'block' : 'none';
        }
        
        if (statsContainer) {
            statsContainer.style.display = isHomePage ? 'grid' : 'none'; 
        }

        // Sembunyikan semua section
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Tampilkan section yang dipilih
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
            
            // Smooth scroll ke atas
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        }

        // Update status aktif pada navigasi
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
        
        // Reload iframe jika section peta
        if (sectionId === 'peta-desa' || sectionId === 'peta-kecamatan') {
            const iframe = document.querySelector(`#${sectionId} iframe`);
            if (iframe) {
                // Force reload iframe
                iframe.src = iframe.src; 
            }
        }

        // Log untuk debugging
        console.log(`Navigasi ke section: ${sectionId}`);
    };

    /**
     * Fungsi untuk memilih desa di halaman Peta Kecamatan
     * @param {string} villageName - Nama desa yang dipilih
     */
    window.selectVillage = (villageName) => {
        // Update status tombol
        const buttons = document.querySelectorAll('.village-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Set tombol yang diklik sebagai active
        event.target.classList.add('active');
        
        // Data informasi setiap desa
        const villageInfo = {
            'karanglewas-kidul': {
                title: 'Informasi Desa Karanglewas Kidul',
                content: 'Desa Karanglewas Kidul adalah desa terbesar di Kecamatan Karanglewas dengan luas 13,4 km². Desa ini memiliki 5.206 penduduk yang terbagi dalam 1.722 kepala keluarga. Fasilitas lengkap meliputi pendidikan, kesehatan, dan ibadah menjadikan desa ini sebagai pusat kegiatan masyarakat di kecamatan. Desa ini juga memiliki potensi pertanian yang besar dengan mayoritas penduduk bermata pencaharian sebagai petani.'
            },
            'kediri': {
                title: 'Informasi Desa Kediri',
                content: 'Desa Kediri terletak di sebelah utara Desa Karanglewas Kidul. Desa ini dikenal dengan potensi pertaniannya yang sangat baik, terutama di sektor padi dan palawija. Dengan sistem irigasi yang memadai, produktivitas pertanian di desa ini cukup tinggi. Masyarakat Desa Kediri sangat menjunjung tinggi nilai-nilai gotong royong dan kekeluargaan dalam kehidupan sehari-hari.'
            },
            'pangebatan': {
                title: 'Informasi Desa Pangebatan',
                content: 'Desa Pangebatan terletak di sebelah timur Desa Karanglewas Kidul. Desa ini memiliki karakteristik masyarakat yang religius dengan beberapa pondok pesantren dan lembaga pendidikan Islam yang berkualitas. Selain itu, Desa Pangebatan juga memiliki potensi ekonomi dari sektor pertanian dan UMKM. Kehidupan sosial keagamaan sangat kental dengan berbagai kegiatan pengajian dan pesantren.'
            },
            'tamansari': {
                title: 'Informasi Desa Tamansari',
                content: 'Desa Tamansari terletak di sebelah barat Desa Karanglewas Kidul. Desa ini memiliki potensi wisata alam dan perkebunan yang menarik. Dengan pemandangan yang indah dan udara yang sejuk, Desa Tamansari cocok untuk pengembangan agrowisata. Masyarakatnya ramah dan menjunjung tinggi nilai-nilai kearifan lokal. Sektor pertanian dan perkebunan menjadi mata pencaharian utama penduduk.'
            }
        };
        
        // Update informasi desa
        const info = villageInfo[villageName];
        if (info) {
            const titleElement = document.getElementById('village-info-title');
            const contentElement = document.getElementById('village-info-content');
            
            if (titleElement && contentElement) {
                titleElement.innerHTML = '<i class="fas fa-info-circle"></i> ' + info.title;
                contentElement.textContent = info.content;
            }
        }
        
        // Opsional: Jika ada peta terpisah untuk setiap desa
        // Uncomment code di bawah jika Anda memiliki file peta terpisah
        /*
        const iframe = document.getElementById('kecamatan-map');
        if (iframe) {
            iframe.src = `Peta_Kecamatan/${villageName}.html`;
        }
        */

        // Log untuk debugging
        console.log(`Desa dipilih: ${villageName}`);
    };

    /**
     * Fungsi untuk smooth scroll pada anchor links
     */
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Jangan handle jika menggunakan showSection
                if (this.onclick) return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    /**
     * Fungsi untuk mendeteksi scroll dan menambahkan efek
     */
    const handleScrollEffects = () => {
        const nav = document.querySelector('nav');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.boxShadow = '0 6px 30px rgba(0, 0, 0, 0.12)';
            } else {
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }
        });
    };

    /**
     * Fungsi untuk animasi saat element masuk viewport
     */
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe cards
        document.querySelectorAll('.card, .info-detail-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    };

    /**
     * Fungsi untuk handle responsive menu (jika diperlukan di masa depan)
     */
    const initMobileMenu = () => {
        // Placeholder untuk menu mobile
        // Bisa dikembangkan jika dibutuhkan hamburger menu
        const navLinks = document.querySelector('.nav-links');
        
        // Deteksi klik di luar menu pada mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!navLinks.contains(e.target) && !e.target.closest('.logo')) {
                    // Handle menu close jika ada
                }
            }
        });
    };

    /**
     * Fungsi untuk preload images
     */
    const preloadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    // ============================================
    // INISIALISASI APLIKASI
    // ============================================

    // Tampilkan halaman beranda saat pertama kali load
    setTimeout(() => {
        window.showSection('beranda'); 
        console.log('Halaman beranda ditampilkan');
    }, 50);

    // Inisialisasi fitur-fitur tambahan
    initSmoothScroll();
    handleScrollEffects();
    observeElements();
    initMobileMenu();
    preloadImages();

    // Log sukses
    console.log('Semua fitur telah diinisialisasi dengan sukses! ✓');

    // Event listener untuk window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            console.log('Window resized:', window.innerWidth + 'x' + window.innerHeight);
        }, 250);
    });
});

/**
 * Service Worker untuk PWA (Opsional - untuk pengembangan lanjutan)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment jika ingin mengaktifkan PWA
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker terdaftar:', registration);
            })
            .catch(error => {
                console.log('Service Worker gagal:', error);
            });
        */
    });
}

/**
 * Error handler global
 */
window.addEventListener('error', (e) => {
    console.error('Error terdeteksi:', e.error);
});

/**
 * Konsol pesan
 */
console.log('%c Portal Informasi Geografis Karanglewas Kidul ', 
    'background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;');
console.log('%c Versi 1.0.0 - 2025 ', 
    'background: #f59e0b; color: white; padding: 5px 10px; font-size: 12px; border-radius: 3px;');
