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
    async create(payload) {
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
    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) { 
        return await this.find({
            name: { $regex: new RegExp(new RegExp(name)), $options: "i" },
        });
    }

    async findById(id) { 
        return await this.Contact.findOne({
            _id: ObjectID.isValid(id) ? new ObjectID(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectID.isValid(id) ? new ObjectID(id) : null,
        };
        const update = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { ReturnDocument: "after" }
        );
        return result.value;
    }
    
    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectID.isValid(id) ? new ObjectID(id) : null,
        });
        return result;
    }

    async findFavorite() {
        return await this.find({favorite: true});
    }

    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = ContactService;