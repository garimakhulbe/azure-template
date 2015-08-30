var fs = require("fs"),
    https = require("https"),
    path = require('path');
    //logger = require('./logger.js');



var templateUri = 'https://raw.githubusercontent.com/garimakhulbe/azure-template/master/autoscaletemplate/nestedtemplate.json';
var parameterUri = 'https://raw.githubusercontent.com/garimakhulbe/azure-template/master/autoscaletemplate/deploymentparameters.json';

var deploymentTemplate = 'deploymentTemplate.json';
var fileDir = 'C:\\Users\\t-gakhu\\files';
var self;
var template = {};
//var log = logger.LOG;

function TemplateOperations() {
    this.deploymentTemplate = path.normalize(fileDir + '\\' + deploymentTemplate);
};


function getResourceManagementClient(subscriptionId, token) {
    var resourceManagementClient = resourceManagement.createResourceManagementClient(new common.TokenCloudCredentials({
        subscriptionId: subscriptionId,
        token: token
    }));
    
    return resourceManagementClient;
}


TemplateOperations.prototype.getDeploymentTemplate = function (callback) {
    self = this;
    
    var rg = resourcegroup;
    var armtClient = getResourceManagementClient(subscriptionId, token); // resourceManagementClient;
    
    armtClient.deploymentOperations.get(rg, "SwarmSlaveNodesDeployment", function (err, result) {
        if (err) {
            return callback(err.message, null);
        }

        result
    });


    //try {
    //    //if (!fs.existsSync(self.deploymentTemplate)) {
        
    //    downloadJson(self.templateUri, 'template', function (err, templateFilePath) {
    //        if (err) {
    //            return callback(err.message, null);
    //        }
            
            
    //        try {
    //            //console.log(parameterFilePath)
    //            var jsonTemplateObj = JSON.parse(fs.readFileSync(templateFilePath, 'utf8'));
                
    //            //console.log(jsonTemplateObj);
                
                
                
    //            for (var i = 0; i < jsonTemplateObj.resources.length; i++) {
    //                if ((jsonTemplateObj.resources[i].type.toLowerCase().indexOf("deployments") > -1)) {
    //                    template.properties = jsonTemplateObj.resources[i].properties;
    //                    break;
    //                }
    //            }
                
    //            downloadJson(template.properties.templateLink.uri, 'deployment', function (err, templatePath) {
    //                if (err) {
    //                    return callback(err.message, null);
    //                }

    //                var jsonDeployemntTemplateObj = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
    //                console.log(jsonDeployemntTemplateObj);
    //                jsonDeployemntTemplateObj = JSON.parse(JSON.stringify(jsonDeployemntTemplateObj, null, 4).replace(/copyIndex\([0-9]*\)/gi, 'copyIndex(INDEX)'));
                    
    //                template.properties.templateLink = null;
    //                template.properties.template = jsonDeployemntTemplateObj;
                   
    //                fs.writeFileSync(self.deploymentTemplate, JSON.stringify(template, null, 4));
    //                console.log(template);
    //            });

                                                     
    //                //var temp = JSON.parse(JSON.stringify(jsonTemplateObj, null, 4));
                    
    //                //var resources = [];
                    
    //                //console.log(jsonTemplateObj.resources.length);
    //                //for (var i = 0; i < jsonTemplateObj.resources.length; i++) {
    //                //    if (jsonTemplateObj.resources[i].name.toLowerCase().indexOf("copyindex") > -1) {
    //                //        //console.log(jsonTemplateObj.resources[i].name);
    //                //        resources.push(jsonTemplateObj.resources[i]);
    //                //    }
    //                //}
                    
    //                //resources = JSON.parse(JSON.stringify(resources, null, 4).replace(/copyIndex\([0-9]*\)/gi, 'copyIndex(INDEX)'));
    //                //for (var i = 0; i < resources.length; i++) {
    //                //    resources[i]
    //                //}
    //                //temp.resources = resources;
                    
    //                //var armTemplate = {
    //                //    "properties": {
    //                //        "template": temp,
    //                //        "mode": "Incremental",
    //                //        "parameters": jsonParameterObj.parameters
    //                //    }
    //                //}
                    
    //                //console.log('ARM' + armTemplate);
                    
    //                //fs.writeFileSync(self.deploymentTemplate, JSON.stringify(armTemplate, null, 4));
    //                //var template = JSON.parse(fs.readFileSync(self.deploymentTemplate, 'utf8'));
    //                //callback(null, template);
    //        } catch (e) {
    //            callback(e, null);
    //        }
                
    //    });

    //    //}
    //    //else {
    //    //    var template = JSON.parse(fs.readFileSync(self.deploymentTemplate, 'utf8'));
    //    //    callback(null, template);
    //    //}
    //} catch (e) {
    //    callback(e, null);
    //}
}

function downloadJson(url, file, callback) {
    //console.log(url);
    https.get(url, function (res) {
        body = '';
        
        res.on('data', function (data) {
            body += data;
        });
        
        res.on('end', function () {
            try {
                fs.mkdirSync(fileDir);
            } catch (e) {
                if (e.code != 'EEXIST')
                    callback(e, null);
            }
            
            try {
                var name = fileDir + '\\' + file + '.json';
                //console.log('name' + name);
                fs.writeFileSync(name, body);
                callback(null, name);
            } catch (e) {
                callback(e, null);
            }
        });
        
        res.on('error', function () {
            return callback(error, null);
        });

    }).on('error', function (e) {
        console.error(e);
        callback(e, null);
    });
}



var t = new TemplateOperations(templateUri);
t.getDeploymentTemplate(function (err, template) {
    console.log('ERR'+err);
});


exports.TemplateOperations = TemplateOperations;
