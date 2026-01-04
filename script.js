/**
 * ============================================
 * KARANGLEWAS KIDUL - PORTAL INFORMASI GEOGRAFIS
 * JavaScript - Dropdown di Peta Desa
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portal Informasi Geografis Karanglewas Kidul - Dimuat');

    /**
     * Fungsi untuk toggle mobile menu
     */
    window.toggleMobileMenu = () => {
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.querySelector('.mobile-menu-toggle');

        if (navLinks) {
            navLinks.classList.toggle('active');

            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    };

    /**
     * Toggle dropdown menu di mobile
     */
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768) {
            const dropdown = event.target.closest('.nav-dropdown');
            if (dropdown) {
                const link = dropdown.querySelector('.nav-link');
                const dropdownIcon = link.querySelector('.dropdown-icon');

                // Jika klik pada link utama (bukan pada dropdown item)
                if ((event.target === link || link.contains(event.target)) && !event.target.closest('.dropdown-menu')) {
                    event.preventDefault();

                    // Close all other dropdowns
                    document.querySelectorAll('.nav-dropdown').forEach(d => {
                        if (d !== dropdown) {
                            d.classList.remove('active');
                        }
                    });

                    dropdown.classList.toggle('active');
                }
            }
        }
    });

    /**
     * Fungsi untuk menampilkan section yang dipilih
     */
    window.showSection = (sectionId, event) => {
        if (event) {
            event.preventDefault();
        }

        const sections = document.querySelectorAll('.content-section');
        const navLinks = document.querySelectorAll('.nav-link');
        const heroSection = document.querySelector('.hero');
        const statsContainer = document.querySelector('.stats-container');
        const mobileNav = document.getElementById('navLinks');
        const menuToggle = document.querySelector('.mobile-menu-toggle');

        // Tutup mobile menu saat item diklik
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }

        // Tutup dropdown di mobile
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        dropdowns.forEach(d => d.classList.remove('active'));

        const isHomePage = (sectionId === 'beranda');

        if (heroSection) {
            heroSection.style.display = isHomePage ? 'block' : 'none';
        }

        if (statsContainer) {
            statsContainer.style.display = isHomePage ? 'grid' : 'none';
        }

        sections.forEach(section => {
            section.classList.remove('active');
        });

        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }

        if (sectionId === 'peta-desa' || sectionId === 'peta-kecamatan') {
            const iframe = document.querySelector(`#${sectionId} iframe`);
            if (iframe) {
                iframe.src = iframe.src;
            }
        }

        console.log(`Navigasi ke section: ${sectionId}`);
    };

    /**
     * Data informasi desa
     */
    const villageData = {
        'karanglewas-kidul': {
            name: 'Desa Karanglewas Kidul',
            title: 'Informasi Desa Karanglewas Kidul',
            content: 'Desa Karanglewas Kidul adalah desa terbesar di Kecamatan Karanglewas dengan luas 13,4 km². Desa ini memiliki 5.206 penduduk yang terbagi dalam 1.722 kepala keluarga. Fasilitas lengkap meliputi pendidikan, kesehatan, dan ibadah menjadikan desa ini sebagai pusat kegiatan masyarakat di kecamatan.',
            mapPath: 'PetaDesa-Karanglewaskidul/index.html'
        },
        'kediri': {
            name: 'Desa Kediri',
            title: 'Informasi Desa Kediri',
            content: 'Desa Kediri terletak di sebelah utara Desa Karanglewas Kidul. Desa ini dikenal dengan potensi pertaniannya yang sangat baik, terutama di sektor padi dan palawija. Dengan sistem irigasi yang baik dan lahan persawahan yang luas, Desa Kediri menjadi salah satu penyumbang produksi pangan terbesar di kecamatan.',
            mapPath: 'PetaDesa-Kediri/index.html'
        },
        'pangebatan': {
            name: 'Desa Pangebatan',
            title: 'Informasi Desa Pangebatan',
            content: 'Desa Pangebatan terletak di sebelah timur Desa Karanglewas Kidul. Desa ini memiliki karakteristik masyarakat yang religius dengan beberapa pondok pesantren dan lembaga pendidikan Islam. Kehidupan keagamaan yang kuat menjadi ciri khas desa ini, dengan berbagai kegiatan keagamaan yang rutin dilaksanakan.',
            mapPath: 'PetaDesa-Pangebatan/index.html'
        },
        'tamansari': {
            name: 'Desa Tamansari',
            title: 'Informasi Desa Tamansari',
            content: 'Desa Tamansari terletak di sebelah barat Desa Karanglewas Kidul. Desa ini memiliki potensi wisata alam dan perkebunan yang menarik. Dengan pemandangan yang indah dan udara yang sejuk, Desa Tamansari menjadi tempat yang cocok untuk pengembangan wisata alam dan agrowisata.',
            mapPath: 'PetaDesa-Tamansari/index.html'
        }
    };

    /**
     * Fungsi untuk memilih desa dari tombol
     */
    window.selectVillage = (villageName) => {
        const data = villageData[villageName];
        if (data) {
            const titleElement = document.getElementById('village-info-title');
            const contentElement = document.getElementById('village-info-content');

            if (titleElement) titleElement.innerHTML = '<i class="fas fa-info-circle"></i> ' + data.title;
            if (contentElement) contentElement.textContent = data.content;

            // Update active state tombol
            const buttons = document.querySelectorAll('.village-btn');
            buttons.forEach(btn => {
                btn.classList.remove('active');
                // Cek apakah tombol ini yang diklik
                const btnText = btn.textContent.toLowerCase().trim();
                const villageName2 = villageName.replace('-', ' ').toLowerCase();
                if (btnText.includes(villageName2)) {
                    btn.classList.add('active');
                }
            });
        }

        // Refresh iframe jika diperlukan
        const iframe = document.getElementById('desa-map');
        if (iframe) {
            // Anda bisa menambahkan parameter query untuk menampilkan desa tertentu
            // Contoh: iframe.src = `PetaDesa/index.html?village=${villageName}`;
        }

        console.log(`Desa dipilih: ${villageName}`);
    };

    /**
     * Fungsi untuk langsung menampilkan peta desa yang dipilih dari dropdown
     */
    window.showVillageMapDirect = (villageName, event) => {
        if (event) {
            event.preventDefault();
        }

        // Tutup mobile menu jika terbuka
        const mobileNav = document.getElementById('navLinks');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }

        // Tutup dropdown di mobile
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        dropdowns.forEach(d => d.classList.remove('active'));

        // Update informasi desa
        const data = villageData[villageName];
        if (data) {
            const titleElement = document.getElementById('village-info-title');
            const contentElement = document.getElementById('village-info-content');

            if (titleElement) titleElement.innerHTML = '<i class="fas fa-info-circle"></i> ' + data.title;
            if (contentElement) contentElement.textContent = data.content;

            // Update active state tombol
            const buttons = document.querySelectorAll('.village-btn');
            buttons.forEach(btn => {
                btn.classList.remove('active');
                const btnText = btn.textContent.toLowerCase().trim();
                const villageName2 = villageName.replace('-', ' ').toLowerCase();
                if (btnText.includes(villageName2)) {
                    btn.classList.add('active');
                }
            });
        }

        // Tampilkan section peta desa
        showSection('peta-desa');

        // Refresh iframe
        const iframe = document.getElementById('desa-map');
        if (iframe && data && data.mapPath) {
            iframe.src = data.mapPath;
        } else if (iframe) {
            iframe.src = iframe.src;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * Fungsi untuk kembali ke beranda
     */
    window.goToHome = () => {
        showSection('beranda');
    };

    /**
     * Fungsi counter animasi agar menghormati angka bulat dan desimal
     */
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const originalValue = counter.textContent.replace(/,/g, '');
            const target = parseFloat(originalValue);
            const isDecimal = originalValue.includes('.');

            let count = 0;
            const inc = target / speed;

            const updateCount = () => {
                if (count < target) {
                    count += inc;
                    if (target > 100) {
                        counter.textContent = Math.ceil(count).toLocaleString();
                    } else {
                        counter.textContent = isDecimal ? count.toFixed(1) : Math.ceil(count);
                    }
                    setTimeout(updateCount, 10);
                } else {
                    if (target > 100) {
                        counter.textContent = target.toLocaleString();
                    } else {
                        counter.textContent = isDecimal ? target.toFixed(1) : target;
                    }
                }
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    };

    /**
     * Observe elements untuk animasi scroll
     */
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card, .info-detail-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    };

    /**
     * Close mobile menu saat klik di luar menu
     */
    document.addEventListener('click', (event) => {
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const logo = document.querySelector('.logo');

        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(event.target) &&
                !menuToggle.contains(event.target) &&
                !logo.contains(event.target)) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    /**
     * Handle window resize - tutup mobile menu jika layar diperbesar
     */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                const navLinks = document.getElementById('navLinks');
                const menuToggle = document.querySelector('.mobile-menu-toggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                // Tutup dropdown juga
                const dropdowns = document.querySelectorAll('.nav-dropdown');
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        }, 250);
    });

    // Jalankan Semua Fungsi
    setTimeout(() => { window.showSection('beranda'); }, 50);
    observeElements();
    animateCounters();

    console.log('Semua fitur telah diperbarui dan diinisialisasi! ✓');
});

function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".nav-links").classList.remove("active");
    });
});
