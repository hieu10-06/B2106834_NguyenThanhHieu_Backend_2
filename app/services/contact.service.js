const { ObjectID, ReturnDocument } = require("mongodb");

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("Contacts");

    }
    extractContactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        Object.keys(contact).forEach(
            (ket) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }
    async create(payload){
        const contact = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            {
                $set: { favorite: contact.favorite === true }
            },
            {
                ReturnDocument: "after", upsert: true
            }
        );
        return result;
    
    }
}

module.exports = ContactService;