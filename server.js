// server.js - API REST para Pré Check-In Hoteleiro
// Dependências: express, uuid, cors
// Instale com: npm install express uuid cors

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ========================================
// BANCO DE DADOS EM MEMÓRIA
// ========================================
// Estrutura: { id: UUID, nome, documento, celular, dataNascimento, status, numeroQuarto, dataCheckin }
const registrosCheckin = {};

// ========================================
// ENDPOINTS
// ========================================

/**
 * POST /api/checkin
 * Recebe dados do hóspede e gera um ID único
 * Body esperado: { nome, documento, celular, dataNascimento }
 * Retorna: { id, status, mensagem }
 */
app.post('/api/checkin', (req, res) => {
    try {
        const { nome, documento, celular, dataNascimento } = req.body;

        // Validação básica
        if (!nome || !documento || !celular || !dataNascimento) {
            return res.status(400).json({
                erro: true,
                mensagem: 'Todos os campos são obrigatórios'
            });
        }

        // Gerar ID único
        const id = uuidv4();

        // Armazenar no banco de dados em memória
        registrosCheckin[id] = {
            id,
            nome,
            documento,
            celular,
            dataNascimento,
            status: 'Pre-Checkin Concluido',
            numeroQuarto: null,
            dataCheckin: new Date().toISOString(),
            dataAtualizacao: new Date().toISOString()
        };

        console.log(`✓ Pré Check-In Registrado - ID: ${id} | Hóspede: ${nome}`);

        res.status(201).json({
            erro: false,
            id,
            status: 'Pre-Checkin Concluido',
            mensagem: 'Pré check-in realizado com sucesso'
        });

    } catch (error) {
        console.error('Erro em POST /api/checkin:', error);
        res.status(500).json({
            erro: true,
            mensagem: 'Erro interno do servidor'
        });
    }
});

/**
 * GET /api/recepcao/consultar/:id
 * Consulta os dados salvos usando o ID do QR Code
 * Retorna: dados do hóspede ou erro 404
 */
app.get('/api/recepcao/consultar/:id', (req, res) => {
    try {
        const { id } = req.params;

        // Verificar se o registro existe
        if (!registrosCheckin[id]) {
            return res.status(404).json({
                erro: true,
                mensagem: 'Registro não encontrado'
            });
        }

        const registro = registrosCheckin[id];

        console.log(`✓ Consulta Realizada - ID: ${id} | Hóspede: ${registro.nome} | Status: ${registro.status}`);

        res.status(200).json({
            erro: false,
            dados: {
                id: registro.id,
                nome: registro.nome,
                documento: registro.documento,
                celular: registro.celular,
                dataNascimento: registro.dataNascimento,
                status: registro.status,
                numeroQuarto: registro.numeroQuarto,
                dataCheckin: registro.dataCheckin,
                dataAtualizacao: registro.dataAtualizacao
            },
            mensagem: 'Dados recuperados com sucesso'
        });

    } catch (error) {
        console.error('Erro em GET /api/recepcao/consultar/:id:', error);
        res.status(500).json({
            erro: true,
            mensagem: 'Erro interno do servidor'
        });
    }
});

/**
 * POST /api/recepcao/finalizar/:id
 * Atualiza status para 'Hospede no Quarto' e vincula número do quarto
 * Body esperado: { numeroQuarto }
 * Retorna: dados atualizados ou erro
 */
app.post('/api/recepcao/finalizar/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { numeroQuarto } = req.body;

        // Validação
        if (!numeroQuarto) {
            return res.status(400).json({
                erro: true,
                mensagem: 'Número do quarto é obrigatório'
            });
        }

        // Verificar se o registro existe
        if (!registrosCheckin[id]) {
            return res.status(404).json({
                erro: true,
                mensagem: 'Registro não encontrado'
            });
        }

        // Atualizar status e número do quarto
        registrosCheckin[id].status = 'Hospede no Quarto';
        registrosCheckin[id].numeroQuarto = numeroQuarto;
        registrosCheckin[id].dataAtualizacao = new Date().toISOString();

        const registroAtualizado = registrosCheckin[id];

        console.log(`✓ Check-In Finalizado - ID: ${id} | Hóspede: ${registroAtualizado.nome} | Quarto: ${numeroQuarto}`);

        res.status(200).json({
            erro: false,
            dados: {
                id: registroAtualizado.id,
                nome: registroAtualizado.nome,
                documento: registroAtualizado.documento,
                celular: registroAtualizado.celular,
                dataNascimento: registroAtualizado.dataNascimento,
                status: registroAtualizado.status,
                numeroQuarto: registroAtualizado.numeroQuarto,
                dataCheckin: registroAtualizado.dataCheckin,
                dataAtualizacao: registroAtualizado.dataAtualizacao
            },
            mensagem: 'Check-in finalizado com sucesso'
        });

    } catch (error) {
        console.error('Erro em POST /api/recepcao/finalizar/:id:', error);
        res.status(500).json({
            erro: true,
            mensagem: 'Erro interno do servidor'
        });
    }
});

// ========================================
// ENDPOINT BONUS: Listar todos os registros (para debug)
// ========================================
app.get('/api/debug/registros', (req, res) => {
    res.status(200).json({
        total: Object.keys(registrosCheckin).length,
        registros: Object.values(registrosCheckin)
    });
});

// ========================================
// INICIAR SERVIDOR
// ========================================
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║    Servidor Pré Check-In Online        ║
╠════════════════════════════════════════╣
║  🚀 Servidor rodando em:               ║
║     http://localhost:${PORT}              ║
╠════════════════════════════════════════╣
║  📍 Endpoints Disponíveis:             ║
║     POST   /api/checkin                ║
║     GET    /api/recepcao/consultar/:id ║
║     POST   /api/recepcao/finalizar/:id ║
║     GET    /api/debug/registros        ║
╚════════════════════════════════════════╝
    `);
});
