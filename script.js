document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("agendamentoForm");
    const listaAgendamentos = document.getElementById("listaAgendamentos");
    const listaHistorico = document.getElementById("listaHistorico");
    const verHistoricoBtn = document.getElementById("verHistorico");

    let agendamentos = [];

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const servicos = Array.from(document.getElementById("servicos").selectedOptions).map(opt => opt.value);
        const data = new Date(document.getElementById("data").value);
        const hoje = new Date();
        
        if (data <= hoje) {
            alert("A data do agendamento deve ser futura.");
            return;
        }
        
        const novoAgendamento = { servicos, data: data.toISOString().split('T')[0] };
        agendamentos.push(novoAgendamento);
        atualizarLista();
    });

    function atualizarLista() {
        listaAgendamentos.innerHTML = "";
        agendamentos.forEach((ag, index) => {
            const li = document.createElement("li");
            li.textContent = `Serviços: ${ag.servicos.join(", ")} - Data: ${ag.data}`;
            
            const botaoEditar = document.createElement("button");
            botaoEditar.textContent = "Editar";
            botaoEditar.onclick = () => editarAgendamento(index);
            
            li.appendChild(botaoEditar);
            listaAgendamentos.appendChild(li);
        });
    }

    function editarAgendamento(index) {
        const agendamento = agendamentos[index];
        const dataAgendada = new Date(agendamento.data);
        const hoje = new Date();
        const diferenca = (dataAgendada - hoje) / (1000 * 60 * 60 * 24);
        
        if (diferenca < 2) {
            alert("Alteração só pode ser feita por telefone.");
            return;
        }
        
        const novaData = prompt("Digite a nova data (YYYY-MM-DD):", agendamento.data);
        if (novaData) {
            agendamentos[index].data = novaData;
            atualizarLista();
        }
    }

    verHistoricoBtn.addEventListener("click", () => {
        listaHistorico.innerHTML = "";
        agendamentos.forEach(ag => {
            const li = document.createElement("li");
            li.textContent = `Serviços: ${ag.servicos.join(", ")} - Data: ${ag.data}`;
            listaHistorico.appendChild(li);
        });
    });
});
