document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobileMenuToggle');
    const mobileMenu = document.querySelector('.mobileMenu');
    const mobileMenuClose = document.querySelector('.mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('.mobileMenuLink');
    let bombasInterval = null;
    
    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            startBombasCarousel();
        });
        
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            stopBombasCarousel();
        });
        
        for (let i = 0; i < mobileMenuLinks.length; i++) {
            mobileMenuLinks[i].addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                stopBombasCarousel();
            });
        }
    }
    
    const whatsappLinks = document.querySelectorAll('.fab.fa-whatsapp');
    for (let i = 0; i < whatsappLinks.length; i++) {
        const parentLink = whatsappLinks[i].closest('a');
        if (parentLink) {
            parentLink.href = 'https://wa.me/525551047376';
            parentLink.target = '_blank';
            parentLink.rel = 'noopener noreferrer';
        }
    }
    
    function startBombasCarousel() {
        const bombasImages = document.querySelectorAll('.bombas img');
        let currentIndex = 0;
        
        for (let i = 0; i < bombasImages.length; i++) {
            bombasImages[i].style.opacity = '0';
            bombasImages[i].style.display = 'none';
            bombasImages[i].style.transition = 'opacity 0.3s ease';
        }
        
        if (bombasImages.length > 0) {
            bombasImages[0].style.display = 'block';
            setTimeout(() => {
                bombasImages[0].style.opacity = '1';
            }, 10);
        }
        
        bombasInterval = setInterval(() => {
            bombasImages[currentIndex].style.opacity = '0';
            
            setTimeout(() => {
                bombasImages[currentIndex].style.display = 'none';
                currentIndex = currentIndex + 1;
                if (currentIndex >= bombasImages.length) {
                    currentIndex = 0;
                }
                bombasImages[currentIndex].style.display = 'block';
                setTimeout(() => {
                    bombasImages[currentIndex].style.opacity = '1';
                }, 10);
            }, 300);
        }, 2000);
    }
    
    function stopBombasCarousel() {
        if (bombasInterval) {
            clearInterval(bombasInterval);
            bombasInterval = null;
            
            const bombasImages = document.querySelectorAll('.bombas img');
            for (let i = 0; i < bombasImages.length; i++) {
                bombasImages[i].style.opacity = '0';
                bombasImages[i].style.display = 'none';
            }
        }
    }
    
    const header = document.querySelector('.headerContainer');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '5px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    const locationControls = document.querySelectorAll('.locationControl');
    const locationCards = document.querySelectorAll('.locationCard');
    
    if (locationControls.length && locationCards.length) {
        for (let i = 0; i < locationControls.length; i++) {
            locationControls[i].addEventListener('click', function() {
                const location = this.getAttribute('data-location');
                
                for (let j = 0; j < locationControls.length; j++) {
                    locationControls[j].classList.remove('active');
                }
                this.classList.add('active');
                
                for (let k = 0; k < locationCards.length; k++) {
                    locationCards[k].classList.remove('active');
                    if (locationCards[k].id === location) {
                        locationCards[k].classList.add('active');
                    }
                }
            });
        }
    }
    
    const franchiseForm = document.getElementById('franchiseForm');
    
    if (franchiseForm) {
        franchiseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(franchiseForm);
            const formValues = {};
            for (const pair of formData.entries()) {
                formValues[pair[0]] = pair[1];
            }
            
            let isValid = true;
            const requiredFields = ['name', 'email', 'phone', 'city'];
            
            for (let i = 0; i < requiredFields.length; i++) {
                const field = requiredFields[i];
                const input = document.getElementById(field);
                if (!formValues[field]) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            }
            
            if (isValid) {
                const emailSubject = 'Nueva solicitud de franquicia - Las Hijas del Marqués';
                const emailBody = `
                    Nombre: ${formValues.name}
                    Email: ${formValues.email}
                    Teléfono: ${formValues.phone}
                    Ciudad: ${formValues.city}
                    Mensaje: ${formValues.message || 'No se proporcionó mensaje'}
                `;
                
                const emailForm = document.createElement('form');
                emailForm.method = 'POST';
                emailForm.action = 'https://formsubmit.co/admin@kooxland.com';
                emailForm.style.display = 'none';
                
                function addField(name, value) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = name;
                    input.value = value;
                    emailForm.appendChild(input);
                }
                
                addField('_subject', emailSubject);
                addField('name', formValues.name);
                addField('email', formValues.email);
                addField('phone', formValues.phone);
                addField('city', formValues.city);
                addField('message', formValues.message || '');
                addField('_captcha', 'false');
                addField('_template', 'table');
                addField('_next', window.location.href);
                
                document.body.appendChild(emailForm);
                emailForm.submit();
                
                alert('¡Gracias por tu interés! Te contactaremos pronto.');
                franchiseForm.reset();
            } else {
                alert('Por favor completa todos los campos requeridos.');
            }
        });
    }
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    for (let i = 0; i < anchorLinks.length; i++) {
        anchorLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    const galleryItems = document.querySelectorAll('.galleryItem');
    const lightboxModal = document.querySelector('.lightboxModal');
    const modalImage = document.querySelector('.modalImage');
    const modalCaption = document.querySelector('.modalCaption');
    const closeModal = document.querySelector('.closeModal');

    if (galleryItems.length && lightboxModal && modalImage && closeModal) {
        lightboxModal.style.display = 'none';
        
        for (let i = 0; i < galleryItems.length; i++) {
            galleryItems[i].addEventListener('click', function() {
                const imgSrc = this.querySelector('.galleryImage').src;
                const imgAlt = this.querySelector('.galleryImage').alt;
                const caption = this.querySelector('.galleryOverlay span').textContent;
                
                modalImage.src = imgSrc;
                modalImage.alt = imgAlt;
                modalCaption.textContent = caption;
                
                lightboxModal.style.display = 'flex';
                
                lightboxModal.offsetHeight;
                
                setTimeout(() => {
                    lightboxModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }, 10);
            });
        }
        
        function closeModalFunction() {
            lightboxModal.classList.remove('active');
            
            setTimeout(() => {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = '';
                
                modalImage.src = '';
            }, 300);
        }
        
        closeModal.addEventListener('click', closeModalFunction);
        
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeModalFunction();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeModalFunction();
            }
        });
    }
    
    const bombasImages = document.querySelectorAll('.bombas img');
    for (let i = 0; i < bombasImages.length; i++) {
        bombasImages[i].style.opacity = '0';
        bombasImages[i].style.display = 'none';
    }

    function setupGalleryNavigation() {
        const galleryItems = document.querySelectorAll('.galleryItem');
        const prevButton = document.querySelector('.prevButton');
        const nextButton = document.querySelector('.nextButton');
        const currentPageEl = document.querySelector('.currentPage');
        const totalPagesEl = document.querySelector('.totalPages');
        
        if (!galleryItems.length || !prevButton || !nextButton) return;
        
        const itemsPerPage = 6;
        const totalItems = galleryItems.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        let currentPage = 1;
        
        if (totalPagesEl) totalPagesEl.textContent = totalPages;
        
        function showPage(page) {
            if (page < 1) page = totalPages;
            if (page > totalPages) page = 1;
            
            currentPage = page;
            
            if (currentPageEl) currentPageEl.textContent = currentPage;
            
            const startIndex = (page - 1) * itemsPerPage;
            let endIndex = startIndex + itemsPerPage;
            if (endIndex > totalItems) {
                endIndex = totalItems;
            }
            
            for (let i = 0; i < galleryItems.length; i++) {
                galleryItems[i].classList.add('hidden');
            }
            
            for (let i = startIndex; i < endIndex; i++) {
                galleryItems[i].classList.remove('hidden');
            }
        }
        
        showPage(1);
        
        prevButton.addEventListener('click', () => {
            showPage(currentPage - 1);
        });
        
        nextButton.addEventListener('click', () => {
            showPage(currentPage + 1);
        });
        
        if (totalPages <= 1) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }
    }
    
    function setupHistoryCarousel() {
        const historySlides = document.querySelectorAll('.historySlide');
        const prevButton = document.querySelector('.prevHistoryButton');
        const nextButton = document.querySelector('.nextHistoryButton');
        const currentPageEl = document.querySelector('.currentHistoryPage');
        const totalPagesEl = document.querySelector('.totalHistoryPages');
        
        if (!historySlides.length || !prevButton || !nextButton) return;
        
        const totalSlides = historySlides.length;
        let currentSlide = 0;
        
        if (totalPagesEl) totalPagesEl.textContent = totalSlides;
        
        function showSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            currentSlide = index;
            
            if (currentPageEl) currentPageEl.textContent = currentSlide + 1;
            
            for (let i = 0; i < historySlides.length; i++) {
                historySlides[i].classList.remove('active');
            }
            
            historySlides[currentSlide].classList.add('active');
        }
        
        showPage(0);
        
        prevButton.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
        
        nextButton.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
        
        function showPage(index) {
            showSlide(index);
        }
    }
    
    setupGalleryNavigation();
    setupHistoryCarousel();
});