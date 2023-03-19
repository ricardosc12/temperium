import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb"
import ClientDB from ".."

const getUser = async({id}) => {

    const client = ClientDB.client()

    const input = {
		id: id
	}

	const command = new GetItemCommand({TableName: "users", Key: marshall(input)});

	try {
		const { $metadata, ...result }  = await client.send(command);

		if($metadata.httpStatusCode !== 200) throw $metadata

		const item = unmarshall(result.Item)

		return item

	} catch (err) {
		return err
	}
}


// const create =  await createUser({client: client, user: {
// 	id:"lucao",
// 	cargo: "Back-End",
// 	atividades: [
// 		'lavar-prato', 'varrer chão', 'printar'
// 	]
// }})
const createUser = async({user}) => {

    const client = ClientDB.client()

	const item_dynamodb = marshall(user);

	const command = new PutItemCommand({TableName:"users", Item: item_dynamodb})

	try {
		const { $metadata }  = await client.send(command);

		if($metadata.httpStatusCode !== 200) throw $metadata

		return true

	} catch (err) {
		return false
	}
}

export { getUser, createUser }