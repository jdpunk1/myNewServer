//gcpController.js
// handle metadata from within cloud to assign to sys vars
const gcpMetadata = require('gcp-metadata');
// check if metadata server is available
exports.gcp = async function(){
        const isAvailable = await gcpMetadata.isAvailable();
        console.log("GCPavailable", isAvailable);
    // Access metadata
    if (isAvailable){
        const data = await gcpMetadata.instance({
            property: 'attributes',
            params: { PORT: 'number' }
          });
        console.log("gcpData:", data); // ... All metadata properties
        return data
    }else{
        return false
    }

}