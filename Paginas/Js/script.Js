function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function login() {
  let user = document.getElementById("user")?.value;
  let pass = document.getElementById("pass")?.value;

  if (user === "admin" && pass === "123") {
    window.location.href = "DashBoard.html";
  } else {
    alert("Login inválido");
  }
}
function carregarDashboard() {
  let pacientes = getData("pacientes");
  let consultas = getData("consultas");

  let total = consultas.reduce((acc, c) => acc + (Number(c.valor) || 0), 0);

  if (document.getElementById("totalPacientes"))
    document.getElementById("totalPacientes").textContent = pacientes.length;

  if (document.getElementById("totalConsultas"))
    document.getElementById("totalConsultas").textContent = consultas.length;

  if (document.getElementById("faturamento"))
    document.getElementById("faturamento").textContent = "R$ " + total.toFixed(2);
}
function salvarPaciente() {
  let nome = document.getElementById("nome")?.value;
  let cpf = document.getElementById("cpf")?.value;
  let telefone = document.getElementById("telefone")?.value;

  if (!nome || !cpf || !telefone) {
    return alert("Preencha tudo!");
  }

  let pacientes = getData("pacientes");

  let existe = pacientes.find(p => p.cpf === cpf);

  if (existe) {
    return alert("Paciente já cadastrado!");
  }

  pacientes.push({ nome, cpf, telefone });

  setData("pacientes", pacientes);

  document.getElementById("nome").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("telefone").value = "";

  listarPacientes();
  carregarPacientesSelect();
}
function listarPacientes() {
  let lista = document.getElementById("listaPacientes");
  if (!lista) return;

  lista.innerHTML = "";

  getData("pacientes").forEach((p, i) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <div class="item-consulta">
        <div>
          <strong>${p.nome}</strong><br>
          CPF: ${p.cpf}<br>
          📞 ${p.telefone}
        </div>
        <button class="btn-delete" onclick="excluirPaciente(${i})">🗑️</button>
      </div>
    `;

    lista.appendChild(li);
  });
}
function carregarPacientesSelect() {

  let pacientes = getData("pacientes");

  let selectConsulta =
    document.getElementById("pacienteConsulta");

  let selectOrcamento =
    document.getElementById("pacienteOrcamento");

  // CONSULTA
  if (selectConsulta) {

    selectConsulta.innerHTML =
      `<option value="">Selecione um paciente</option>`;

    pacientes.forEach(p => {

      let option = document.createElement("option");

      option.value = p.cpf;
      option.textContent = p.nome;

      selectConsulta.appendChild(option);

    });
  }

  // ORÇAMENTO
  if (selectOrcamento) {

    selectOrcamento.innerHTML =
      `<option value="">Selecione um paciente</option>`;

    pacientes.forEach(p => {

      let option = document.createElement("option");

      option.value = p.cpf;
      option.textContent =
        `${p.nome} - ${p.telefone}`;

      selectOrcamento.appendChild(option);

    });
  }
}
function limparPacientes() {
  if (confirm("Tem certeza que deseja apagar todos os pacientes?")) {
    localStorage.removeItem("pacientes"); 

    listarPacientes();
    carregarPacientesSelect();
  }
}
function excluirPaciente(index) {
  let pacientes = getData("pacientes");

  pacientes.splice(index, 1);

  setData("pacientes", pacientes);

  listarPacientes();
}
function salvarDentista() {
  let nome = document.getElementById("nomeDentista")?.value;
  let esp = document.getElementById("especialidade")?.value;

  if (!nome || !esp) {
    alert("Preencha tudo!");
    return;
  }
  let dentistas = getData("dentistas");

  dentistas.push({ nome, especialidade: esp });

  setData("dentistas", dentistas);

  document.getElementById("nomeDentista").value = "";
  document.getElementById("especialidade").value = "";

  listarDentistas();
  carregarDentistasSelect(); 
}
function listarDentistas() {
  let lista = document.getElementById("listaDentistas");
  if (!lista) return;

  lista.innerHTML = "";

  getData("dentistas").forEach((d, i) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <div class="item-consulta">
        <div>
          <strong>${d.nome}</strong><br>
          🦷 ${d.especialidade}
        </div>
        <button class="btn-delete" onclick="excluirDentista(${i})">🗑️</button>
      </div>
    `;

    lista.appendChild(li);
  });
}
function carregarDentistasSelect() {
  let select = document.getElementById("dentistaConsulta");
  if (!select) return;

  let dentistas = getData("dentistas");

  select.innerHTML = "";

  if (dentistas.length === 0) {
    select.innerHTML = `<option value="">Nenhum dentista cadastrado</option>`;
    return;
  }

  select.innerHTML = `<option value="">Selecione o dentista</option>`;

  dentistas.forEach(d => {
    let option = document.createElement("option");
    option.value = d.nome;
    option.textContent = d.nome;
    select.appendChild(option);
  });
}
function excluirDentista(i) {
  let d = getData("dentistas");
  d.splice(i, 1);
  setData("dentistas", d);
  listarDentistas();
}
function salvarItem() {
  let nome = document.getElementById("nomeItem")?.value;
  let qtd = parseInt(document.getElementById("quantidadeItem")?.value);

  if (!nome || isNaN(qtd)) return alert("Preencha tudo!");

  let estoque = getData("estoque");
  estoque.push({ nome, quantidade: qtd });

  setData("estoque", estoque);

  document.getElementById("nomeItem").value = "";
  document.getElementById("quantidadeItem").value = "";

  listarEstoque();
  carregarEstoqueSelect();
}
function listarEstoque() {
  let lista = document.getElementById("listaEstoque");
  if (!lista) return;

  lista.innerHTML = "";

  getData("estoque").forEach((item, i) => {
    let li = document.createElement("li");
    let cor = item.quantidade <= 3 ? "red" : "inherit";

    li.innerHTML = `
      <div class="item-consulta">
        <div>
          <strong>${item.nome}</strong><br>
          📦 Quantidade: <span style="color:${cor}">${item.quantidade}</span>
        </div>
        <button class="btn-delete" onclick="excluirItem(${i})">🗑️</button>
      </div>
    `;

    lista.appendChild(li);
  });
}
function excluirItem(i) {
  let e = getData("estoque");
  e.splice(i, 1);
  setData("estoque", e);
  listarEstoque();
}
function carregarEstoqueSelect() {
  let select = document.getElementById("estoqueConsulta");
  if (!select) return;

  let estoque = getData("estoque");

  select.innerHTML = estoque.length
    ? `<option value="">Selecione um item</option>`
    : `<option value="">Sem estoque</option>`;

  estoque.forEach(item => {
    let opt = document.createElement("option");
    opt.value = item.nome;
    opt.textContent = `${item.nome} (${item.quantidade})`;
    select.appendChild(opt);
  });
}
const consumoProcedimentos = {
  "Limpeza": [
    { nome: "Luva", qtd: 1 },
    { nome: "Máscara", qtd: 1 }
  ],
  "Canal": [
    { nome: "Luva", qtd: 2 },
    { nome: "Anestesia", qtd: 1 }
  ]
};
function baixarEstoque(procedimento) {
  let estoque = getData("estoque");
  let itens = consumoProcedimentos[procedimento];

  if (!itens) return true;

  for (let uso of itens) {
    let item = estoque.find(i => i.nome === uso.nome);
    if (!item || item.quantidade < uso.qtd) {
      alert(`Falta: ${uso.nome}`);
      return false;
    }
  }

  itens.forEach(uso => {
    let item = estoque.find(i => i.nome === uso.nome);
    item.quantidade -= uso.qtd;
  });

  setData("estoque", estoque);
  return true;
}
function agendar() {
  let paciente = document.getElementById("pacienteConsulta")?.value;
  let dentista = document.getElementById("dentistaConsulta")?.value;
  let procedimento = document.getElementById("procedimentoConsulta")?.value;
  let data = document.getElementById("dataConsulta")?.value;
  let hora = document.getElementById("horaConsulta")?.value;
  let valor = parseFloat(document.getElementById("valorConsulta")?.value);
  let pagamento = document.getElementById("pagamentoConsulta")?.value;

  if (!paciente || !dentista || !procedimento || !data || !hora || isNaN(valor) || !pagamento) {
    return alert("Preencha tudo!");
}

  if (!baixarEstoque(procedimento)) return;

  let consultas = getData("consultas");

  consultas.push({
  paciente,
  dentista,
  procedimento,
  data,
  hora,
  valor,
  pagamento 
});

  setData("consultas", consultas);

  limparAgenda();
  listarConsultas();
}
function salvarOrcamento() {

  let paciente =
    document.getElementById("pacienteOrcamento")?.value;

  let itens = getData("itensOrcamentoTemp");

  let total =
    Number(document.getElementById("total")?.textContent);

  if (!paciente) {
    return alert("Selecione um paciente!");
  }

  if (!itens || itens.length === 0) {
    return alert("Adicione itens ao orçamento!");
  }

  let orcamentos = getData("orcamentos");

  orcamentos.push({
    paciente,
    itens,
    total,
    data: new Date().toLocaleDateString("pt-BR")
  });

  setData("orcamentos", orcamentos);

  localStorage.removeItem("itensOrcamentoTemp");

  document.getElementById("listaItens").innerHTML = "";
  document.getElementById("total").textContent = "0";
  document.getElementById("pacienteOrcamento").value = "";

  alert("Orçamento salvo!");
}
function adicionarItem() {

  let procedimento =
    document.getElementById("procedimento")?.value;

  let valor = parseFloat(
    document.getElementById("valor")?.value
  );

  let quantidade = parseInt(
    document.getElementById("quantidade")?.value
  );

  if (!procedimento || isNaN(valor) || isNaN(quantidade)) {
    return alert("Preencha tudo!");
  }

  let itens =
    getData("itensOrcamentoTemp");

  itens.push({
    procedimento,
    valor,
    quantidade
  });

  setData("itensOrcamentoTemp", itens);

  atualizarListaOrcamento();

  document.getElementById("procedimento").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("quantidade").value = "";
}
function atualizarListaOrcamento() {

  let lista =
    document.getElementById("listaItens");

  let totalEl =
    document.getElementById("total");

  let itens =
    getData("itensOrcamentoTemp");

  lista.innerHTML = "";

  let total = 0;

  itens.forEach((item, i) => {

    let subtotal =
      item.valor * item.quantidade;

    total += subtotal;

    let li = document.createElement("li");

    li.innerHTML = `
      <div class="item-consulta">

        <div>
          <strong>${item.procedimento}</strong><br>
          📦 ${item.quantidade}x<br>
          💰 R$ ${subtotal.toFixed(2)}
        </div>

        <div class="acoes-orcamento">

          <button class="btn-whatsapp"
            onclick="enviarOrcamentoWhats(${i})">
            WhatsApp
          </button>

          <button class="btn-delete"
            onclick="removerItemOrcamento(${i})">
            🗑️
          </button>

        </div>

      </div>
    `;

    lista.appendChild(li);

  });

  totalEl.textContent = total.toFixed(2);
}

function removerItemOrcamento(i) {

  let itens =
    getData("itensOrcamentoTemp");

  itens.splice(i, 1);

  setData("itensOrcamentoTemp", itens);

  atualizarListaOrcamento();
}

function enviarOrcamentoWhats(i) {

  let itens =
    getData("itensOrcamentoTemp");

  let item = itens[i];

  let cpfPaciente =
    document.getElementById("pacienteOrcamento")?.value;

  if (!cpfPaciente) {
    return alert("Selecione o paciente!");
  }

  let pacientes =
    getData("pacientes");

  let dadosPaciente = pacientes.find(
    p => p.cpf === cpfPaciente
  );

  if (!dadosPaciente) {
    return alert("Paciente não encontrado!");
  }

  if (!dadosPaciente.telefone) {
    return alert("Paciente sem telefone!");
  }

  let numero =
    "55" + dadosPaciente.telefone.replace(/\D/g,'');

  let subtotal =
    item.valor * item.quantidade;

  let msg = encodeURIComponent(
`Olá ${dadosPaciente.nome}!

Segue seu orçamento odontológico 🦷

Procedimento:
${item.procedimento}

Quantidade:
${item.quantidade}x

Valor:
R$ ${subtotal.toFixed(2)}

Clínica SorrIA`
  );

  window.open(
    `https://wa.me/${numero}?text=${msg}`,
    "_blank"
  );
}
function listarConsultas() {
  let lista = document.getElementById("listaConsultas");
  if (!lista) return;

  lista.innerHTML = "";

  getData("consultas").forEach((c, i) => {
    let li = document.createElement("li");

    let valor = Number(c.valor) || 0;

    li.innerHTML = `
      <div class="item-consulta">
        <div>
          <strong>${c.paciente}</strong><br>
          👨‍⚕️ ${c.dentista}<br>
          🦷 ${c.procedimento}<br>
          📅 ${c.data} às ${c.hora}<br>
          💰 R$ ${valor.toFixed(2)}
          💳 ${c.pagamento}
        </div>
      <button onclick="enviarLembrete(${i})">
        WhatsApp
        </button>

        <button class="btn-delete"
          onclick="excluirConsulta(${i})">
          🗑️
          </button>
        </div>
      </div>
    `;

    lista.appendChild(li);
  });
}
function enviarLembrete(indiceConsulta) {

  let consultas = getData("consultas");
  let pacientes = getData("pacientes");

  let consulta = consultas[indiceConsulta];

  let paciente = pacientes.find(
    p => p.nome === consulta.paciente
  );

  if (!paciente || !paciente.telefone) {
    alert("Paciente sem telefone cadastrado.");
    return;
  }

  // monta número com Brasil
  let numero = "55" + paciente.telefone.replace(/\D/g,'');

  let msg = encodeURIComponent(
`Olá ${consulta.paciente},
lembrete da sua consulta:

🦷 ${consulta.procedimento}
📅 ${consulta.data}
⏰ ${consulta.hora}
👨‍⚕️ ${consulta.dentista}

Endereço:
Rua Guaranési, 425 - Vila Maria,
São Paulo - SP
CEP: 02112-000

Clínica SorrIA`
  );

  window.open(
    `https://wa.me/${numero}?text=${msg}`,
    "_blank"
  );
  
}
function excluirConsulta(i) {
  let c = getData("consultas");
  c.splice(i, 1);
  setData("consultas", c);
  listarConsultas();
}
function limparAgenda() {
  ["pacienteConsulta","dentistaConsulta","dataConsulta","horaConsulta","valorConsulta"]
    .forEach(id => {
      let el = document.getElementById(id);
      if (el) el.value = "";
    });
    
  let pagamento = document.getElementById("pagamentoConsulta");
  if (pagamento) pagamento.value = "";
}
function carregarCalendario() {
  let calendario = document.getElementById("calendario");
  if (!calendario) return;

  calendario.innerHTML = "";

  let consultas = getData("consultas");

  consultas.sort((a, b) => {
    return new Date(a.data + " " + a.hora) - new Date(b.data + " " + b.hora);
  });

  let agrupado = {};

  consultas.forEach(c => {
    if (!agrupado[c.data]) {
      agrupado[c.data] = [];
    }
    agrupado[c.data].push(c);
  });

  for (let data in agrupado) {
    let divDia = document.createElement("div");
    divDia.classList.add("dia");

    let titulo = document.createElement("h3");
    titulo.textContent = formatarData(data);

    divDia.appendChild(titulo);

    agrupado[data].forEach(c => {
      let item = document.createElement("div");
      item.classList.add("consulta-calendario");

      item.innerHTML = `
        <strong>${c.hora}</strong> - ${c.paciente}<br>
        👨‍⚕️ ${c.dentista}<br>
        🦷 ${c.procedimento}
      `;

      divDia.appendChild(item);
    });

    calendario.appendChild(divDia);
  }
}
function formatarData(data) {
  let d = new Date(data);
  return d.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  });
}
function logout() {
  localStorage.removeItem("usuarioLogado"); 

  window.location.href = "Login.html"; 
}
document.addEventListener("DOMContentLoaded", () => {
  carregarDashboard();

  listarPacientes();
  listarDentistas();
  listarEstoque();
  listarConsultas();

  carregarPacientesSelect();
  carregarDentistasSelect();
  carregarEstoqueSelect();
  carregarCalendario();
  listarOrcamentos();
  
});
