var fs = require('fs');
var dateTime = require('node-datetime');
var mkdirp = require('mkdirp');
var path = require('path');

var util = function () {

    this.copyFile = async function (source, destination) {
        try {
            await fs.copyFile(source, destination, async (err) => {
                if (err) {
                    await commonLogger.error(err);
                    throw err;
                }
                await commonLogger.info('Archived html report');
            });
        }
        catch (err) {

            await commonLogger.error(err);
            throw e;
        }
    };

    String.prototype.replaceAll = async function (search, replacement) {
        try {
            var target = this;
            return await target.replace(new RegExp(search, 'g'), replacement);
        }
        catch (err) {

            await commonLogger.error(err);
            throw e;
        }
    };

    this.getCurrentDateTime = async function () {
        try {
            var dt = await dateTime.create();
            return await dt.format('Y-m-d H:M:S');
        }
        catch (err) {

            await commonLogger.error(err);
            throw e;
        }
    };

    this.createFolder = async function (folder) {
        try {
            mkdirp(folder, function (err) {
                if (err) commonLogger.error(err)                
            });
        } catch (err) {
            await commonLogger.error(err);
            throw e;
        }
    }

    this.getDatePostFix = async function () {
        var curDT = await this.getCurrentDateTime();
        var cr = await curDT.replaceAll(" ", "_");
        var cr1 = await cr.replaceAll(":", "_");
        cr1 = await cr1.replaceAll("-", "_");
        return cr1;
    }

    this.moveAllFiles = async function (src, dest) {
        try {
            await fs.readdir(src, function (err, files) {
                if (err) {
                    commonLogger.error("Could not list the directory.", err);
                    //process.exit(1);
                }

                files.forEach(async function (file, index) {
                    // Make one pass and make the file complete
                    var fromPath = await path.join(src, file);
                    var toPath = await path.join(dest, file);


                    if (await fs.statSync(fromPath).isDirectory()) {
                        await this.moveAllFiles(src+"/"+file, dest+"/"+file);
                    }
                    else {
                        await fs.stat(dest, async function (error, stat) {
                            if (error) {
                                commonLogger.error("Error stating file.", error);
                                //  return;
                            }

                            await fs.rename(fromPath, toPath, async function (error) {
                                if (error) {
                                    commonLogger.error("File moving error.", error);
                                } else {
                                    commonLogger.info("Moved file '%s' to '%s'.", fromPath, toPath);
                                }
                            });
                        });
                    }
                });
            });
        }
        catch(e){

        }
    
    },

    this.getLogger=async function(string){
        await log4js.configure("./config/log4js.json");
        await log4js.getLogger(string);

    }
};

module.exports = new util();