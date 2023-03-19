import { DynamoDBClient } from "@aws-sdk/client-dynamodb"

class ClientDB {
    static client () {
        if(import.meta.env.DEV === true) return new DynamoDBClient({ region: "us-east-2",
        credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
        }}) 
        console.log(process.env)
        return new DynamoDBClient({ region: "us-east-2", 
        credentials:{
            accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY
        }})
    }
}

export default ClientDB