        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Feature tabs functionality
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and tabs
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.tab-content').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding tab content
                const tabId = this.getAttribute('data-tab') + '-tab';
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Service selection in phone mockup
        document.querySelectorAll('.service-option').forEach(option => {
            option.addEventListener('click', function() {
                // In a real implementation, this would store the selected service
                // and then advance to the next step
                setTimeout(nextStep, 500);
            });
        });
        
        // Date selection in phone mockup
        document.querySelectorAll('.date-option').forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                document.querySelectorAll('.date-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // In a real implementation, this would store the selected time
                // and then advance to the next step after a delay
                setTimeout(nextStep, 1000);
            });
        });

 // --- Lógica do Modal Beta (CORRIGIDA PARA SCROLL MÓVEL) ---

// 1. Seleciona os elementos
const html = document.documentElement; // <html>
const body = document.body;             // <body>
const betaModal = document.getElementById('beta-modal');
const modalCloseBtn = betaModal.querySelector('.modal-close-btn');

// 2. Seleciona TODOS os botões de "comprar"
const triggerButtons = document.querySelectorAll(
    '.hero-buttons .btn-primary, .pricing-card .btn, .cta .btn'
);

// 3. Função para ABRIR o modal
function openBetaModal(event) {
    event.preventDefault(); 
    html.classList.add('modal-active'); // ADICIONA NO HTML
    body.classList.add('modal-active'); // ADICIONA NO BODY
    betaModal.classList.add('active');
}

// 4. Função para FECHAR o modal
function closeBetaModal() {
    html.classList.remove('modal-active'); // REMOVE DO HTML
    body.classList.remove('modal-active'); // REMOVE DO BODY
    betaModal.classList.remove('active');
}

// 5. Adiciona os "escutadores" de evento
triggerButtons.forEach(button => {
    button.addEventListener('click', openBetaModal);
});

modalCloseBtn.addEventListener('click', closeBetaModal);

betaModal.addEventListener('click', function(event) {
    if (event.target === betaModal) {
        closeBetaModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && betaModal.classList.contains('active')) {
        closeBetaModal();
    }
});

const betaForm = document.getElementById('beta-form');

betaForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(betaForm);

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        betaModal.querySelector('.modal-content').innerHTML =
        '<div class="success-screen" style="padding:1rem 0;">' +
        '<div class="success-icon" style="width:60px;height:60px;font-size:1.5rem;">' +
        '<i class="fas fa-check"></i></div>' +
        '<h4 class="mt-4">Inscrição recebida!</h4>' +
        '<p class="text-secondary">Obrigado! Você será avisado por e-mail.</p>' +
        '</div>';
    }
});
