const fs = require('fs')

function openFile(path){
    return new Promise((resolve, reject)=>{
        fs.readFile(path, (err, data) =>{
            if(err) reject(err)
            try {
                const resp = JSON.parse(data)
                resolve(resp)
            }catch {
                resolve(String(data))
            }
            
        })
    })
}

function writeFile(path, string){
    return new Promise((resolve, reject)=>{
        fs.writeFile(path, typeof string=='string'?string:JSON.stringify(string, undefined, 2), (err) =>{
            if(err) reject(err)
            resolve(true)
        })
    })
}

async function main(){

    const [ version, note ] = process.argv.slice(2)

    const package_config = './package.json'
    const updater_config = './updater/index.json'
    const version_config = 'src/config/version.js'
    const signature = `src-tauri/target/release/bundle/msi/temperium_${version}_x64_en-US.msi.zip.sig`

    try {

        Promise.all([ 
            openFile(package_config),
            openFile(updater_config),
            openFile(signature)
        ])
        .then(([package, updater, signature])=>{
            package.version = version
            updater.version = `v${version}`
            updater.notes = `${note || ""}`
            updater.platforms['windows-x86_64'].signature = signature
            updater.platforms['windows-x86_64'].url = 
            `https://github.com/ricardosc12/temperium/raw/master/src-tauri/target/release/bundle/msi/temperium_${version}_x64_en-US.msi.zip`

            writeFile(package_config, package)
            writeFile(updater_config, updater)
            writeFile(version_config, `export const VERSION = '${version}'`)

        })
        .catch(err=>{
            console.log(err)
        })
        
    }
    catch (e) {
        console.error(e)
    }
}

main()