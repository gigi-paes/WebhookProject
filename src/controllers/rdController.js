const axios = require('axios');

const processaLeadRd = async (req, res) => 
{
    try 
    {
        const dadosDoLead = req.body;

        if (!dadosDoLead || !dadosDoLead.leads || !Array.isArray(dadosDoLead.leads) || dadosDoLead.leads.length === 0)
        {
            console.warn("!!! Requisição inválida !!! O formato esperado do RD Station não foi recebido.");
            return res.status(400).send({ message: "Formato de dados inválido. Esperado um array 'leads' com pelo menos um lead." });
        }

        console.log("1. Dados recebidos do RD Station:", dadosDoLead);
        const rdLead = dadosDoLead.leads[0];

        const waboostyPayload = 
        {
            lead: 
            {
                name: rdLead.name,
                phone: `55${rdLead.personal_phone}`,
                email: rdLead.email,
                variables: 
                [
                    {
                        name: "origem",
                        content: rdLead.custom_fields.origem
                    },
                    {
                        name: "programa desejado",
                        content: rdLead.custom_fields.programa_desejado
                    }
                ]
            }
        };

        const waboostyWebhookUrl = process.env.WABOOSTY_WEBHOOK_URL;
        console.log("3. Enviando dados via Axios para Waboosty...");

        const respostaWaboosty = await axios.post
        ( waboostyWebhookUrl, waboostyPayload, 
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        console.log("4. Sucesso! Resposta da Waboosty:", respostaWaboosty.data);
        return res.status(200).send( { message: "Lead processado e enviado com sucesso!" } );

    } catch (error) 
    {
        console.error("X Erro ao enviar para a Waboosty:", error.message);
        return res.status(500).send( { message: "Erro ao integrar com a Waboosty." } );
    }
};

module.exports = { processaLeadRd };
