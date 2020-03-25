function copyFile(targetFile, targetFolder){
    const fs = require('fs');
    // takes two arguements a file to copy and a destination to copy to
    // both arguements should be strings
    fs.copyFile(targetFile, targetFolder, (err) => {
        //if there is an error anywhere in the process display said error 
        if (err) throw err;
      });
}