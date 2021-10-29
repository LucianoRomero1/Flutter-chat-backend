const User = require('../models/user');
const Message = require('../models/message');

const userOn = async  (uid = '') => {

    const user  = await User.findById(uid);
    user.online = true;

    await user.save();

    return user;
}

const userOff = async  (uid = '') => {

    const user  = await User.findById(uid);
    user.online = false;

    await user.save();

    return user;
}

const saveMessage = async (payload) => {

    /*
        payload: {
            from: '',
            to: '',
            text: ''
        }
    */

    try {
        const message = new Message(payload);
        await message.save();

        return true;
        
    } catch (error) {
        return false;
    }
}

module.exports = {
    userOn,
    userOff,
    saveMessage
}