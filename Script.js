let button = document.querySelector("#GenerateButton");

async function writeClipboardHTML(htmlText, plainText) {
    try {
        const blobHTML = new Blob([htmlText], { type: "text/html" });
        const blobText = new Blob([plainText], { type: "text/plain" });
        const data = [new ClipboardItem({
            "text/html": blobHTML,
            "text/plain": blobText
        })];
        await navigator.clipboard.write(data);
        window.alert("Copiado com sucesso para o SEI!");
    } catch (error) {
        window.alert("Erro ao copiar, peça para o Nicolas checar o console")
        console.error("Erro ao copiar: ", error);
    }
}

button.addEventListener("click", () => {
    const getPendencia = (id, texto) => {
        const el = document.getElementById(id);
        return (el && !el.checked) ? texto : null;
    };

    const pendenciasGerais = [
    getPendencia("check_ctps", "(X) Carteira de Trabalho (página com foto);"),
    getPendencia("check_identidade", "(X) Carteira de Identidade;"),
    getPendencia("check_cpf", "(X) Cadastro de Pessoa Física (CPF);"),
    getPendencia("check_residencia", "(X) Comprovante de Residência;"),
    getPendencia("check_eleitor", "(X) Título de Eleitor;"),
    getPendencia("check_pis", "(X) PIS/PASEP;"),
    getPendencia("check_foto", "(X) Fotografia 3x4;"),
    getPendencia("check_aso", "(X) ASO fornecido por médico do trabalho, com validade de até 60 dias;"),
    getPendencia("check_esocial", "(X) Esocial;"),
    getPendencia("check_diploma_extra", "(X) Diploma e/ou comprovante de conclusão de curso;"),
    getPendencia("check_oab", "(X) Declaração de não inscrição ativa junto à OAB;"),
    getPendencia("check_pos_vigencia", "(X) Declaração contendo início e término do curso;"),
    getPendencia("check_form_i", "(X) Formulário I - Ficha Cadastral;"),
    getPendencia("check_decl_sem_vinculo", "(X) Declaração de não-vínculo Profissional (Formulário VI);"),
    getPendencia("check_form_v", "(X) Formulário V - Declaração de vida pregressa;"),
    getPendencia("check_form_viii", "(X) Formulário VIII - Declaração de Parentesco;")
    ];

    const pendenciasCertidoes = [
    getPendencia("check_certidao_eleitoral", "(X) Certidão Negativa da Justiça Eleitoral;"),
    getPendencia("check_certidao_militar", "(X) Certidão Negativa da Justiça Militar;"),
    getPendencia("check_certidao_criminal", "(X) Certidão Negativa de natureza Criminal da Justiça Estadual, Federal ou Distrito Federal;"),
    getPendencia("check_cert_tse", "(X) Certidão Negativa da Justiça Eleitoral (TSE);"),
    getPendencia("check_cert_stm", "(X) Certidão Negativa da Justiça Militar (STM);"),
    getPendencia("check_cert_criminal_completa", "(X) Certidões negativas criminais dos últimos 5 anos;")
    ];

    const pendenciasPos = [
    getPendencia("check_decl_ensino", "(X) Declaração da Instituição de Ensino (vínculo educacional);")
    ];

    const pos = document.getElementById("check_pos").checked

    const supervisorNovo = getPendencia("check_dados_supervisor_novo", "(X) A Seção de Seleção e Acompanhamento de Estágio informa que se faz necessário a indicação de <b>NOME COMPLETO E CPF DO SUPERVISOR</b> do Estagiário nessa unidade.");

    let corpoDocumentos = [
        ...pendenciasGerais,
        ...pendenciasCertidoes,
        ...(pendenciasPos.filter(i => i !== null).length > 0 && pos ? ["<br><b>Exclusivamente nos casos de estágio de Pós-Graduação:</b>", ...pendenciasPos] : []),
        ...(supervisorNovo ? ["<br>" + supervisorNovo] : [])
    ].filter(i => i !== null).join("<br>");

    let htmlContent = `
    <div style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 1.5; color: #000;">
        <p><b>À (AO) ${document.querySelector("#input-setor").value}</b></p>
        <p>Prezado (a) Senhor (a),</p>
        <p>Considerando que a emissão do <u>Termo de Compromisso da Residência Jurídica</u> deve ser nos termos da Resolução nº 03/2022;</p>
        <p>Solicitamos que sejam juntadas as documentações abaixo descritas. Aguardamos o reenvio a esta Seção de Seleção e Acompanhamento de Estágio para prosseguimento e análise do pedido:</p>
       
        <p style="margin: 0; background-color: #fbff00">${corpoDocumentos}</p>
       
        <p>Atenciosamente,</br>
        ${document.querySelector("#input-nome").value}
        </p>

    </div>`;

    writeClipboardHTML(htmlContent, htmlContent.replace(/<[^>]*>/g, ''));
});

const checkCon = document.getElementById("check_con")
const checkConciliadorInfo = document.getElementById("check_conciliador_informatica")

const checkPos = document.getElementById("check_pos")
const checkPosDiploma = document.getElementById("check_pos_diploma")
const checkPosVigencia = document.getElementById("check_pos_vigencia")

function updateConciliador(){
    if(!checkCon.checked){
        checkConciliadorInfo.checked = false
        checkConciliadorInfo.disabled = true
    }else{
        checkConciliadorInfo.disabled = false
    }
}

function updatePos(){
    if(!checkPos.checked){
        checkPosDiploma.checked = false
        checkPosVigencia.checked = false

        checkPosDiploma.disabled = true
        checkPosVigencia.disabled = true
    }else{
        checkPosDiploma.disabled = false
        checkPosVigencia.disabled = false
    }
}

checkCon.addEventListener("change", updateConciliador)
checkPos.addEventListener("change", updatePos)

updateConciliador()
updatePos()
