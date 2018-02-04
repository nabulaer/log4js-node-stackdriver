# log4js-stackdriver-appender
a log4js appender for use with the stackdriver on google cloud.

to allow access to google cloud logging please follow setup and access permission on google cloud  documentation.
You can use Application Default Credentials (ADC) or supply credential in config.

if your code is running on Google Cloud then make sure the proper scopes is setup.

if you running on you local dev server , use gcloud cli to authorize.

By default all logging will be done to file syslog in the "Global" logging section.

If you want you can specify a resource which the log will be written to.


quick usage :
```js
var config ={
    appenders: {
        google: {
            type:  'log4js-stackdriver-appender',
            resource: {
                type: "container",
                labels: {
                    cluster_name: 'local-dev',
                    pod_id: process.env["HOSTNAME"],
                    container_name: ''
                }
            },
            logFileName: 'syslog',
            layout: {
                type: 'basic'
            }
        }
    },
    categories: {
        default: {
            appenders: ['google'],
            level:'DEBUG'
        }
    }
};

var log4js = require('log4js');
log4js.configure(config);
var logger = log4js.getLogger('local');
logger.debug('somthing');
```