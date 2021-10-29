const Message = require('../models/message');

const getChat = async(req, res) => {

    const myId = req.uid;
    const messagesFrom = req.params.from

    const lastMsg = await Message.find({
        $or: [{from: myId, to:messagesFrom}, {from: messagesFrom, to:myId}]
    })
    .sort({createdAt: 'desc'})
    // .limit(30); limitar canttidad de mensajes recuperados

    res.json({
        ok: true,
        messages: lastMsg
    });

}

module.exports = {
    getChat
}