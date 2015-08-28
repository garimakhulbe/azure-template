var fs = require("fs"),
    https = require("https"),
    path = require('path');
    //logger = require('./logger.js');



var templateUri = 'https://raw.githubusercontent.com/garimakhulbe/azure-template/master/autoscaletemplate/azuredeployment.json';
var parameterUri = 'https://raw.githubusercontent.com/garimakhulbe/azure-template/master/autoscaletemplate/deploymentparameters.json';

var deploymentTemplate = 'deploymentTemplate.json';
var fileDir = 'C:\\Users\\t-gakhu\\files';
var self;
//var log = logger.LOG;

function TemplateOperations(templateUri, parameterUri) {
    if (templateUri === null || templateUri === undefined) {
        throw new Error('TEMPLATEURI CANNOT BE NULL.');
    }
    
    if (parameterUri === null || parameterUri === undefined) {
        throw new Error('PARAMETERURI CANNOT BE NULL.');
    }
    this.templateUri = templateUri;
    this.parameterUri = parameterUri;
    this.deploymentTemplate = path.normalize(fileDir + '\\' + deploymentTemplate);
};



TemplateOperations.prototype.getDeploymentTemplate = function (callback) {
    self = this;
    
    try {
        if (!fs.existsSync(self.deploymentTemplate)) {
            
            downloadJson(self.templateUri, 'template', function (err, templateFilePath) {
                if (err) {
                    return callback(err.message, null);
                }
                
                downloadJson(self.parameterUri, 'parameter', function (err, parameterFilePath) {
                    if (err) {
                        return callback(err.message, null);
                    }
                    
                    try {
                        //console.log(parameterFilePath)
                        var jsonTemplateObj = JSON.parse(fs.readFileSync(templateFilePath, 'utf8'));
                        var jsonParameterObj = JSON.parse(fs.readFileSync(parameterFilePath, 'utf8'));
                        
                        var temp = JSON.parse(JSON.stringify(jsonParameterObj, null, 4));
                       
                        var resources = [];
                        
                        console.log(jsonTemplateObj.resources.length);
                        for (var i = 0; i < jsonTemplateObj.resources.length; i++) {
                            if (jsonTemplateObj.resources[i].name.toLowerCase().indexOf("copyindex") > -1) {
                                //console.log(jsonTemplateObj.resources[i].name);
                                resources.push(jsonTemplateObj.resources[i]);
                            }
                        }

                        resources = JSON.parse(JSON.stringify(resources, null, 4).replace(/copyIndex\([0-9]*\)/gi, 'copyIndex(INDEX)'));
                        for (var i = 0; i < resources.length; i++) {
                            resources[i]
                        }                 
                        temp.resources = resources;
                        
                        var armTemplate = {
                            "properties": {
                                "template": temp,
                                "mode": "Incremental",
                                "parameters": jsonParameterObj.parameters
                            }
                        }
                        
                        console.log('ARM'+armTemplate);
                        
                        fs.writeFileSync(self.deploymentTemplate, JSON.stringify(armTemplate, null, 4));
                        var template = JSON.parse(fs.readFileSync(self.deploymentTemplate, 'utf8'));
                        callback(null, template);
                    } catch (e) {
                        callback(e, null);
                    }
                
                });
            });
        }
        else {
            var template = JSON.parse(fs.readFileSync(self.deploymentTemplate, 'utf8'));
            callback(null, template);
        }
    } catch (e) {
        callback(e, null);
    }
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
                var name = fileDir + '//' + file + '.json';
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



var t = new TemplateOperations(templateUri, parameterUri);
t.getDeploymentTemplate(function (err, template) {
    //console.log(template);
    console.log('ERR'+err);
});


exports.TemplateOperations = TemplateOperations;
