//textos para testes: https://lingua.com/pt/portugues/leitura/
function compareTexts() {
    const text1 = document.getElementById('text1').value.trim();
    const text2 = document.getElementById('text2').value.trim();
    if (!text1 || !text2) {
        alert("Preencha ambos campos de texto para comparar.");
        return;
    }

    const words1 = text1.match(/\b\w+[\w\.,-]*\b/g) || [];
    const words2 = text2.match(/\b\w+[\w\.,-]*\b/g) || [];

    const commonWords = words1.filter(word => words2.includes(word));

    const totalWords = Math.max(words1.length, words2.length);
    const similarity = (commonWords.length / totalWords) * 100;

    function highlightWords(text, words) {
        words.forEach(word => {
            const regex = new RegExp(`(\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b)`, 'gi');
            text = text.replace(regex, '<span class="highlight">$1</span>');
        });
        return text;
    }

    let highlightedText1 = highlightWords(text1, commonWords);
    let highlightedText2 = highlightWords(text2, commonWords);

    document.getElementById('highlightedText1').innerHTML = highlightedText1;
    document.getElementById('highlightedText2').innerHTML = highlightedText2;
    document.getElementById('similarityPercentage').innerText = `Porcentagem de similaridade textual: ${similarity.toFixed(2)}%`;
}

function getPdf() {
    const content = document.getElementById('results');
    console.log('conteudo em pdf', content);
    const options = {
        margin: 0,
        filename: 'resultados.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { 
            unit: 'pt',
            format: 'a4', 
            orientation: 'portrait'
        }
    };
    
    html2pdf().set(options).from(content).toPdf().get('pdf').then(function (pdf) {
        var totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.text(`Page ${i} of ${totalPages}`, 
            pdf.internal.pageSize.getWidth() / 2,
            pdf.internal.pageSize.getHeight() - 10,
            { align: 'center' });
        }
    }).save();
}
