process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const axios = require('axios');

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const cookie = 'express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalZtTmpJNVpERTFPV0k0TVRZMU1EQXpaVFEyWkdJMU1pSXNJbVZ0WVdsc0lqb2lZWE5rUUdWdFlXbHNMbU52YlNJc0ltbGhkQ0k2TVRZd01ESTVPREkyTVgwLm11VVB6dWx2eTd0YmdQNmJDMEVEb3VHMnRGbHRFTnFXMVFnamxUZzBObEkifQ==';

const doRequest = async () => {
    const name = `ticket-${uuidv4()}`
    const { data } = await axios.post(
        'https://ticketing.dev/api/tickets',
        { title: name, price: 5 },
        {
            headers: { cookie }
        }
    );

    await axios.put(
        `https://ticketing.dev/api/tickets/${data.id}`,
        { title: name, price: 10 },
        {
            headers: { cookie }
        }
    );

    await axios.put(
        `https://ticketing.dev/api/tickets/${data.id}`,
        { title: name, price: 15 },
        {
            headers: { cookie }
        }
    );

    console.log('Request complete');
}

(async () => {
    for (let i = 0; i < 400; i++) {
        doRequest();
    }
})();
