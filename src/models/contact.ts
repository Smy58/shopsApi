import Worker from "./worker";

const Contact = (obj) => {
    return {
        "id": obj.ID,
        "phone": obj.PHONE,
        "worker": Worker(obj)
    }
}

export default Contact;