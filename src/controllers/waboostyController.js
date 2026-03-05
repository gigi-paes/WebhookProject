const axios = require('axios');
const processaStatusWaboosty = async (req, res) => 
{
    try 
    {
        const dadosWaboosty = req.body;

        if (!dadosWaboosty || !dadosWaboosty.email || !dadosWaboosty.status) 
        {
            console.warn("!!! Requisição inválida !!! Faltam dados obrigatórios na volta da Waboosty.");
            return res.status(400).send
            (
                { message: "Dados inválidos. Os campos 'email' e 'status' são obrigatórios." }
            );
        }
        console.log("1. Webhook recebido da Waboosty:", dadosWaboosty);

        const emailDoLead = dadosWaboosty.email;
        const novoStatus = dadosWaboosty.status;
        console.log(`2. O lead ${emailDoLead} mudou para o status: ${novoStatus}`);

        const rdStationUrl = `https://api.rd.services/platform/contacts/email:${emailDoLead}`;
        const rdAccessToken = process.env.RD_ACCESS_TOKEN;
        const rdPayload = 
        {
            "cf_status_waboosty": novoStatus
        };
        console.log("⚙️ 3. Enviando atualização para o RD Station...");

        const respostaRD = await axios.patch(rdStationUrl, rdPayload, 
        {
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${rdAccessToken}`
            }
        });
        console.log("✅ 4. Sucesso! Lead atualizado no RD Station.");
        return res.status(200).send({ message: "Status recebido e RD Station atualizado com sucesso!" });

    } catch (error) {
        console.error("❌ Erro ao atualizar lead no RD Station:", error.message);
        return res.status(500).send({ message: "Erro ao integrar com o RD Station." });
    }
};

module.exports = { processaStatusWaboosty };