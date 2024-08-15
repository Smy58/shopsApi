const Client = (obj) => {
    return {
        "id": obj.CLIENT_ID,
        "name": obj.CLIENT_NAME,
        "address": obj.CLIENT_ADDRESS,
        "phone": obj.CLIENT_PHONE,
        "mail": obj.CLIENT_MAIL
    }
}

const ClientLogin = (obj) => {
    return {
        "id": obj.CLIENT_ID,
        "name": obj.CLIENT_NAME,
        "address": obj.CLIENT_ADDRESS,
        "phone": obj.CLIENT_PHONE,
        "mail": obj.CLIENT_MAIL,
        "password": obj.PASSWORD
    }
}

export default {
    Client,
    ClientLogin
};