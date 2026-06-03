# 🏨 Pré Check-In Hoteleiro - Web App Mobile-First

Sistema completo de pré-check-in hoteleiro com geração de QR Code para otimizar o atendimento na recepção durante os horários de pico.

## 📋 Funcionalidades

### Frontend (index.html)
- ✅ Interface 100% responsiva com foco em mobile
- ✅ Formulário elegante para coleta de dados FNRH (Nome, CPF/Passaporte, Celular, Data de Nascimento)
- ✅ Geração de QR Code instantânea após submissão
- ✅ Exibição de código para download e apresentação na recepção
- ✅ Design moderno com Tailwind CSS
- ✅ Validação de formulário em tempo real

### Backend (server.js)
- ✅ API REST com 3 endpoints principais
- ✅ Banco de dados em memória para protótipo
- ✅ Geração de UUID para cada registro
- ✅ CORS habilitado para requisições do frontend
- ✅ Tratamento de erros e validações

## 🚀 Como Usar

### 1. Instalação das Dependências

```bash
npm install
```

Isso irá instalar:
- `express` - Framework web
- `uuid` - Geração de IDs únicos
- `cors` - Compartilhamento de recursos entre origens

### 2. Iniciar o Servidor

```bash
npm start
```

O servidor iniciará em `http://localhost:3000` com a mensagem:

```
╔════════════════════════════════════════╗
║    Servidor Pré Check-In Online        ║
╠════════════════════════════════════════╣
║  🚀 Servidor rodando em:               ║
║     http://localhost:3000              ║
╠════════════════════════════════════════╣
║  📍 Endpoints Disponíveis:             ║
║     POST   /api/checkin                ║
║     GET    /api/recepcao/consultar/:id ║
║     POST   /api/recepcao/finalizar/:id ║
║     GET    /api/debug/registros        ║
╚════════════════════════════════════════╝
```

### 3. Abrir o Frontend

Abra o arquivo `index.html` no navegador (ou use um servidor local):

```bash
# Com Python 3
python -m http.server 8000

# Ou com Node.js
npx http-server
```

Acesse: `http://localhost:8000`

## 📡 Endpoints da API

### 1. POST `/api/checkin`
**Registra um novo pré-check-in**

**Request:**
```json
{
  "nome": "João Silva Santos",
  "documento": "123.456.789-00",
  "celular": "(11) 99999-9999",
  "dataNascimento": "1990-05-15"
}
```

**Response (201):**
```json
{
  "erro": false,
  "id": "a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6",
  "status": "Pre-Checkin Concluido",
  "mensagem": "Pré check-in realizado com sucesso"
}
```

### 2. GET `/api/recepcao/consultar/:id`
**Consulta dados do hóspede na recepção**

**Request:**
```
GET /api/recepcao/consultar/a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6
```

**Response (200):**
```json
{
  "erro": false,
  "dados": {
    "id": "a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6",
    "nome": "João Silva Santos",
    "documento": "123.456.789-00",
    "celular": "(11) 99999-9999",
    "dataNascimento": "1990-05-15",
    "status": "Pre-Checkin Concluido",
    "numeroQuarto": null,
    "dataCheckin": "2026-06-03T12:30:45.123Z",
    "dataAtualizacao": "2026-06-03T12:30:45.123Z"
  },
  "mensagem": "Dados recuperados com sucesso"
}
```

### 3. POST `/api/recepcao/finalizar/:id`
**Finaliza o check-in e vincula quarto**

**Request:**
```json
{
  "numeroQuarto": "402"
}
```

**Response (200):**
```json
{
  "erro": false,
  "dados": {
    "id": "a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6",
    "nome": "João Silva Santos",
    "documento": "123.456.789-00",
    "celular": "(11) 99999-9999",
    "dataNascimento": "1990-05-15",
    "status": "Hospede no Quarto",
    "numeroQuarto": "402",
    "dataCheckin": "2026-06-03T12:30:45.123Z",
    "dataAtualizacao": "2026-06-03T12:45:30.456Z"
  },
  "mensagem": "Check-in finalizado com sucesso"
}
```

### 4. GET `/api/debug/registros` (Bônus)
**Lista todos os registros (apenas para debug)**

```
GET /api/debug/registros
```

## 🔄 Fluxo de Uso

```
1. HÓSPEDE (Antes de chegar)
   └─ Acessa index.html
   └─ Preenche formulário (nome, documento, celular, data nascimento)
   └─ Clica em "Gerar Código QR"
   └─ Backend cria registro com ID único
   └─ Frontend exibe QR Code com ID
   └─ Hóspede salva ou fotografa o código

2. RECEPÇÃO (Na chegada)
   └─ Usa leitor QR Code para escanear
   └─ Obtém ID do hóspede
   └─ Consulta GET /api/recepcao/consultar/:id
   └─ Confirma dados na tela
   └─ Atribui quarto com POST /api/recepcao/finalizar/:id
   └─ Status muda para "Hospede no Quarto"
```

## 🎨 Customizações

### Cores
Edite as classes Tailwind no `index.html`:
- `from-indigo-600 to-blue-600` - Gradiente principal
- `bg-green-100`, `text-green-600` - Cores de sucesso

### API URL
Se o backend estiver em outro endereço, altere no `index.html`:
```javascript
const API_URL = 'http://seu-servidor.com/api';
```

### Porta do Servidor
No `server.js`, altere:
```javascript
const PORT = 3001; // Mude para a porta desejada
```

## 📦 Estrutura de Arquivos

```
check-in-antecipado/
├── index.html          # Frontend (página única responsiva)
├── server.js           # Backend (API Express)
├── package.json        # Dependências do projeto
└── README.md           # Este arquivo
```

## 🛠 Tecnologias

- **Frontend:**
  - HTML5
  - Tailwind CSS (via CDN)
  - JavaScript Vanilla (Fetch API)
  - QRCode.js (geração de QR Code)

- **Backend:**
  - Node.js
  - Express.js
  - UUID (geração de IDs)
  - CORS (compartilhamento de recursos)

## 🔒 Segurança (Produção)

Para uso em produção, considere:
- ✅ Adicionar autenticação na API
- ✅ Usar banco de dados real (PostgreSQL, MongoDB)
- ✅ Implementar rate limiting
- ✅ Usar HTTPS
- ✅ Validar e sanitizar inputs
- ✅ Adicionar logging e monitoramento
- ✅ Implementar backup de dados

## 📝 Exemplo de Teste com cURL

```bash
# 1. Registrar novo check-in
curl -X POST http://localhost:3000/api/checkin \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "documento": "123.456.789-00",
    "celular": "(11) 99999-9999",
    "dataNascimento": "1990-05-15"
  }'

# 2. Consultar na recepção (substitua ID_AQUI pelo ID retornado)
curl http://localhost:3000/api/recepcao/consultar/ID_AQUI

# 3. Finalizar check-in
curl -X POST http://localhost:3000/api/recepcao/finalizar/ID_AQUI \
  -H "Content-Type: application/json" \
  -d '{"numeroQuarto": "402"}'
```

## 📱 Responsividade

O frontend é totalmente otimizado para:
- ✅ Smartphones (320px+)
- ✅ Tablets (768px+)
- ✅ Desktops (1024px+)

## 📞 Suporte

Para problemas ou dúvidas sobre a implementação, verifique:
1. Se o servidor está rodando em `http://localhost:3000`
2. Se as dependências foram instaladas com `npm install`
3. Se o navegador permite requisições CORS (verifique console)
4. Se os dados do formulário estão sendo validados

## 📄 Licença

MIT - Sinta-se livre para usar, modificar e distribuir.

---

**Desenvolvido com ❤️ para otimizar o atendimento hoteleiro**
