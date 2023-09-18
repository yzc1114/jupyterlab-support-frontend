const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
    baseUrl: 'https://api.github.com',
})
const fs = require('fs'); 

function writeFile(path, data) {
    var result = JSON.stringify(data);
    fs.writeFile(path, result, (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
      });
}

octokit.rest.repos.getContent({
    owner: "yzc1114",
    repo: "SPREAD",
    path: "src/data",
}).then((res) => {
    console.log("getContent dir response", res)
    writeFile("getContent_dir.txt", res)
})

// octokit.rest.repos.getContent({
//     owner: "yzc1114",
//     repo: "SPREAD",
//     path: "Readme.md",
// }).then((res) => {
//     console.log("getFileContent response", res)
//     writeFile("getContent_file.txt", res)
// })


// octokit.rest.repos.listForUser({
//     username: "yzc1114",
// }).then(res=>{
//     console.log("res",res)

// });