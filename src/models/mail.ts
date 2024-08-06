import Worker from "./worker";

const Mail = (obj) => {
    return {
        "id": obj.ID,
        "mail": obj.MAIL,
        "worker": Worker(obj)
    }
}

export default Mail;