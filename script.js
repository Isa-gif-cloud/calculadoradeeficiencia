/**
 * Web App: EcoÁgua Agro - Calculadora de Eficiência Hídrica
 * Foco: Concurso Agrinho 2026 - Pedagogia da Pesquisa
 */

// 1. CAPTURA DOS ELEMENTOS DO DOM (document.querySelector)
const waterForm = document.querySelector('#water-form');
const cropSelect = document.querySelector('#crop-select');
const areaInput = document.querySelector('#area-input');
const irrigationSelect = document.querySelector('#irrigation-select');

const errorBox = document.querySelector('#error-message');
const resultCard = document.querySelector('#result-card');

// Elementos de exibição do resultado
const resCrop = document.querySelector('#res-crop');
const resArea = document.querySelector('#res-area');
const resConsumption = document.querySelector('#res-consumption');
const resEfficiency = document.querySelector('#res-efficiency');
const resTipText = document.querySelector('#res-tip-text');

// 2. ESCUTADOR DE EVENTOS (addEventListener)
waterForm.addEventListener('submit', function (event) {
    // Impede o recarregamento padrão da página ao enviar o formulário
    event.preventDefault();

    // Reset inicial de estados (esconde mensagens anteriores)
    errorBox.hidden = true;
    errorBox.textContent = '';
    resultCard.hidden = true;

    // Captura e conversão dos valores digitados pelo usuário
    const cropValue = cropSelect.value;
    const areaValue = parseFloat(areaInput.value);
    const irrigationValue = irrigationSelect.value;

    /* ==========================================================================
       3. VALIDAÇÃO ESTRITA DE DADOS (Exibição de erro amigável na tela)
       ========================================================================== */
    if (!cropValue || !irrigationValue) {
        showError('Por favor, selecione a cultura e o método de irrigação para continuar.');
        return;
    }

    // Validação contra campos vazios, não numéricos (NaN) ou valores menores/iguais a zero
    if (isNaN(areaValue) || areaValue <= 0) {
        showError('Erro: A área da lavoura deve ser um número positivo e maior que zero.');
        return;
    }

    /* ==========================================================================
       4. PROCESSAMENTO DOS DADOS (Regras de Negócio baseadas no Agro)
       ========================================================================== */
    // Consumo base estimado de água por hectare/dia (valores ilustrativos para o simulador)
    let waterPerHectare = 0;
    let cropName = '';

    switch (cropValue) {
        case 'soja':
            waterPerHectare = 4500; // 4.500 litros
