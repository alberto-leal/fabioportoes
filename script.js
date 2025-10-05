/** JAVASCRIPT **/

        /**
         * ===== MENU MOBILE =====
         * Gerencia a abertura e fechamento do menu mobile
         */
        class MobileMenu {
            constructor() {
                this.menuToggle = document.getElementById('menu-toggle');
                this.navMenu = document.getElementById('nav-menu');
                this.init();
            }

            init() {
                // Toggle do menu
                this.menuToggle.addEventListener('click', () => {
                    this.toggleMenu();
                });

                // Fechar ao clicar em um link
                document.querySelectorAll('nav a').forEach(link => {
                    link.addEventListener('click', () => {
                        this.closeMenu();
                    });
                });

                // Fechar ao clicar fora
                document.addEventListener('click', (e) => {
                    if (!this.menuToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                        this.closeMenu();
                    }
                });
            }

            toggleMenu() {
                this.navMenu.classList.toggle('active');
                this.menuToggle.textContent = this.navMenu.classList.contains('active') ? '✕' : '☰';
            }

            closeMenu() {
                this.navMenu.classList.remove('active');
                this.menuToggle.textContent = '☰';
            }
        }

        /**
         * ===== FILTRO DA GALERIA =====
         * Gerencia a filtragem dos itens da galeria
         */
        class GalleryFilter {
            constructor() {
                this.filterButtons = document.querySelectorAll('.filter-btn');
                this.galleryItems = document.querySelectorAll('.gallery-item');
                this.init();
            }

            init() {
                this.filterButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const filter = button.getAttribute('data-filter');
                        this.filterGallery(filter);
                        this.setActiveButton(button);
                    });
                });
            }

            filterGallery(filter) {
                this.galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'todos' || category === filter) {
                        item.style.display = 'block';
                        // Animação de entrada
                        item.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }

            setActiveButton(activeButton) {
                this.filterButtons.forEach(button => {
                    button.classList.remove('active');
                });
                activeButton.classList.add('active');
            }
        }

        /**
         * ===== SCROLL SUAVE =====
         * Implementa navegação suave entre seções
         */
        class SmoothScroll {
            constructor() {
                this.links = document.querySelectorAll('a[href^="#"]');
                this.init();
            }

            init() {
                this.links.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetId = link.getAttribute('href').substring(1);
                        const targetElement = document.getElementById(targetId);
                        
                        if (targetElement) {
                            const headerHeight = document.getElementById('header').offsetHeight;
                            const targetPosition = targetElement.offsetTop - headerHeight;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    });
                });
            }
        }

        /**
         * ===== HEADER SCROLL =====
         * Adiciona efeito ao header durante o scroll
         */
        class HeaderScroll {
            constructor() {
                this.header = document.getElementById('header');
                this.init();
            }

            init() {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 100) {
                        this.header.classList.add('scrolled');
                    } else {
                        this.header.classList.remove('scrolled');
                    }
                });
            }
        }

        /**
         * ===== BOTÃO VOLTAR AO TOPO =====
         * Gerencia o botão de scroll to top
         */
        class ScrollToTop {
            constructor() {
                this.button = document.getElementById('scroll-top');
                this.init();
            }

            init() {
                // Mostrar/ocultar botão baseado no scroll
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 300) {
                        this.button.classList.add('visible');
                    } else {
                        this.button.classList.remove('visible');
                    }
                });

                // Ação do botão
                this.button.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        }

        /**
         * ===== FORMULÁRIO DE CONTATO =====
         * Gerencia validação e envio do formulário
         */
        class ContactForm {
            constructor() {
                this.form = document.getElementById('contact-form');
                this.init();
            }

            init() {
                this.form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleSubmit();
                });

                // Validação em tempo real
                this.form.querySelectorAll('input, textarea, select').forEach(field => {
                    field.addEventListener('blur', () => {
                        this.validateField(field);
                    });

                    field.addEventListener('input', () => {
                        this.clearFieldError(field);
                    });
                });
            }

            handleSubmit() {
                const formData = new FormData(this.form);
                const data = Object.fromEntries(formData);

                // Validar todos os campos obrigatórios
                let isValid = true;
                this.form.querySelectorAll('[required]').forEach(field => {
                    if (!this.validateField(field)) {
                        isValid = false;
                    }
                });

                if (!isValid) {
                    this.showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                    return;
                }

                // Simular envio
                this.showLoadingState();
                
                setTimeout(() => {
                    this.hideLoadingState();
                    this.showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                    this.form.reset();
                }, 2000);
            }

            validateField(field) {
                const value = field.value.trim();
                let isValid = true;

                this.clearFieldError(field);

                // Campo obrigatório
                if (field.hasAttribute('required') && !value) {
                    this.showFieldError(field, 'Este campo é obrigatório.');
                    isValid = false;
                }

                // Email
                if (field.type === 'email' && value && !this.isValidEmail(value)) {
                    this.showFieldError(field, 'Por favor, insira um e-mail válido.');
                    isValid = false;
                }

                // Telefone
                if (field.type === 'tel' && value && value.length < 10) {
                    this.showFieldError(field, 'Por favor, insira um telefone válido.');
                    isValid = false;
                }

                return isValid;
            }

            isValidEmail(email) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(email);
            }

            showFieldError(field, message) {
                field.style.borderColor = '#e74c3c';
                
                let errorElement = field.parentNode.querySelector('.field-error');
                if (!errorElement) {
                    errorElement = document.createElement('div');
                    errorElement.className = 'field-error';
                    errorElement.style.cssText = 'color: #e74c3c; font-size: 0.875rem; margin-top: 0.25rem;';
                    field.parentNode.appendChild(errorElement);
                }
                errorElement.textContent = message;
            }

            clearFieldError(field) {
                field.style.borderColor = '';
                const errorElement = field.parentNode.querySelector('.field-error');
                if (errorElement) {
                    errorElement.remove();
                }
            }

            showMessage(message, type) {
                const existingMessage = document.querySelector('.form-message');
                if (existingMessage) {
                    existingMessage.remove();
                }

                const messageElement = document.createElement('div');
                messageElement.className = 'form-message';
                messageElement.textContent = message;
                messageElement.style.cssText = `
                    padding: 1rem;
                    border-radius: 4px;
                    margin-bottom: 1rem;
                    font-weight: 600;
                    text-align: center;
                    ${type === 'success' ? 
                        'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
                        'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
                `;

                this.form.insertBefore(messageElement, this.form.firstChild);

                setTimeout(() => {
                    messageElement.remove();
                }, 5000);
            }

            showLoadingState() {
                const submitBtn = this.form.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
            }

            hideLoadingState() {
                const submitBtn = this.form.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Enviar Mensagem';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        }

        /**
         * ===== ANIMAÇÕES DE SCROLL =====
         * Anima elementos quando entram na viewport
         */
        class ScrollAnimations {
            constructor() {
                this.observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };
                this.init();
            }

            init() {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('fade-in');
                            observer.unobserve(entry.target);
                        }
                    });
                }, this.observerOptions);

                // Elementos para animar
                const elements = document.querySelectorAll(
                    '.service-card, .gallery-item, .diferencial-card, .contact-item, .about-text, .feature-item'
                );
                
                elements.forEach(element => {
                    observer.observe(element);
                });
            }
        }

        /**
         * ===== INICIALIZAÇÃO =====
         * Inicializa todas as funcionalidades quando o DOM estiver pronto
         */
        document.addEventListener('DOMContentLoaded', () => {
            // Inicializar todas as classes
            new MobileMenu();
            new GalleryFilter();
            new SmoothScroll();
            new HeaderScroll();
            new ScrollToTop();
            new ContactForm();
            new ScrollAnimations();

            // Log de inicialização
            console.log('🏗️ Site da Serralheria carregado com sucesso!');
        });

        /**
         * ===== FORMATAÇÃO DE TELEFONE =====
         * Formata o campo de telefone automaticamente
         */
        document.getElementById('telefone').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    e.target.value = value;
                } else if (value.length <= 6) {
                    e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else if (value.length <= 10) {
                    e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
                } else {
                    e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                }
            }
        });