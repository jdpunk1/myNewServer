//gcpController.js
// handle metadata from within cloud to assign to sys vars
const gcpMetadata = require('gcp-metadata');
// check if metadata server is available
exports.gcp = async function gcp(){
        const isAvailable = await gcpMetadata.isAvailable();
    // Access metadata
    if (isAvailable){
        const data = await gcpMetadata.instance();
        console.log(data); // ... All metadata properties
        return data
    }else{
        return
    }

}