const fs = require('fs')
const { spawn } = require( 'child_process' );

function build({args}) {
    console.log("\nExecutando build !\n")

    const dir = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run','pos_update',...args]);
    
    dir.stdout.on( 'data', ( data ) => console.log( `${ data }` ) );
    dir.stderr.on( 'data', ( data ) => console.log( `${ data }` ) );
    dir.on( 'close', ( code ) => console.log( `Processo pós build finalizado ! ${code}` ) )
}

function main(){
    const [ version, note ] = process.argv.slice(2)

    fs.readFile('./src-tauri/tauri.conf.json', (err, data) =>{
        if (err) throw err

        const obj = JSON.parse(data)

        obj.package.version = `${version}`

        const json = JSON.stringify(obj, undefined, 2);

        fs.writeFile('./src-tauri/tauri.conf.json', json, (err) => {
            
            if (err) throw err;

            console.log('Versão atualizada !');

            build({args: process.argv.slice(2)})

        });
    })
}

main()