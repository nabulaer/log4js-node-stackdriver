/**
 *  Created by yosi on 04/02/2018
 */

var Logging = require('@google-cloud/logging');


function stackdriverAppender(logFileName, resource, layout, credentials) {

    var logging = new Logging(credentials);
    var log = logging.log(logFileName || "syslog");
    return function (loggingEvent) {

        var metadata = {
            resource: {
                type: "global",
                labels: {
                    HOSTNAME: process.env["HOSTNAME"]
                }
            },
            severity: loggingEvent.level.levelStr === "WARN" ? "WARNING" : loggingEvent.level.levelStr

        };
        if (resource) {
            metadata.resource = resource;
        }
        metadata.resource.labels.namespace_id = resource && resource.labels && resource.labels.namespace_id || loggingEvent.categoryName;
        var entry = log.entry(metadata, layout(loggingEvent));

        log.write(entry);
    };
}

function configure(config, layouts) {
    var layout = layouts.basicLayout;
    if (config.layout) {
        layout = layouts.layout(config.layout.type, config.layout);
    }

    return stackdriverAppender(
        config.logFileName,
        config.resource,
        layout,
        config.credentials
    );
}

module.exports.configure = configure;