//gcpController.js
// handle metadata from within cloud to assign to sys vars
const gcpMetadata = require('gcp-metadata');
// check if metadata server is available
exports.gcp = async function(){
        const isAvailable = await gcpMetadata.isAvailable();
        console.log("GCPavailable", isAvailable);
    // Access metadata
    if (isAvailable){
        let data={};
        data.PORT = await gcpMetadata.instance({
            property: 'attributes/PORT',
          });
        data.DBCONNECT = await gcpMetadata.instance({
            property: 'attributes/DBCONNECT',
          });
          data.DBPASS = await gcpMetadata.instance({
            property: 'attributes/DBPASS',
          });
          data.DBAUTH = await gcpMetadata.instance({
            property: 'attributes/DBAUTH',
          });
          data.DBHOST = await gcpMetadata.instance({
            property: 'attributes/DBHOST',
          });
          data.DBPORT = await gcpMetadata.instance({
            property: 'attributes/DBPORT',
          });
          data.DBUSER = await gcpMetadata.instance({
            property: 'attributes/DBUSER',
          });
        console.log("gcpData:", data.DBCONNECT, data.PORT); // ... All metadata properties
        return data
    }else{
        return false
    }

}