import { DynamoDBClient } from "@aws-sdk/client-dynamodb"

class ClientDB {
    static client () {
        return new DynamoDBClient({ region: "us-east-2"})
        // credentials: {
            // accessKeyId: "AKIAYGR6C56R635ZSB66",
            // secretAccessKey: "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"
        // }});
    }
}

export default ClientDB