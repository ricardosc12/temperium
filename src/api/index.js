import { DynamoDBClient } from "@aws-sdk/client-dynamodb"

class ClientDB {
    static client () {
        return new DynamoDBClient({ region: "us-east-2"})
        // credentials: {
            // accessKeyId: "******",
            // secretAccessKey: "*****"
        // }});
    }
}

export default ClientDB