export default class ContactService {

    constructor() {

    }

    sendMessage(groupId, messageBody) {
        console.log(`Sending message '${messageBody}' to ${groupId}`)
        
        return new Promise((res, rej) => {
            //TODO: send message to group

            rej(new Error("Not Implemented Yet"));
        });

    }

}