const { Gitlab } = require('@gitbeaker/rest');

const fs = require('fs'); 

const beakerApi = new Gitlab({
    host: 'http://133.133.135.73:8880',
    token: 'glpat-RZnzx43BUo4x8T5cpyyG',
});

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

// octokit.rest.repos.getContent({
//     owner: "yzc1114",
//     repo: "SPREAD",
//     path: "src/data",
// }).then((res) => {
//     console.log("getContent dir response", res)
//     writeFile("getContent_dir.txt", res)
// })


beakerApi.Users.allProjects("root", {perPage: 100}).then(res => {
  writeFile("projects.txt", res)
  console.log("projects", res);
});

beakerApi.Repositories.allRepositoryTrees(1, {
  path: "/",
  ref: "main",
}).then(res => {
  writeFile("repositoryTrees.txt", res)
  console.log("repositorytrees", res);
});

beakerApi.RepositoryFiles.show(1, "test.txt", "main").then(res => {
  writeFile("repositoryFiles.txt", res)
  console.log("RepositoryFiles", res);
  let content = Buffer.from(res.content, 'base64').toString();
  console.log("base64 content", content)
});


// const getFileContent = async (params) => {
//   // return response.data;
//   let response = null;
//   response = await beakerApi..getContent({
//     owner: params.repoOwnerId,
//     repo: params.repoName,
//     path: params.filePath,
// })
//   let result = {
//       code: 0,
//       data: {
//           content: "",
//       },
//   };
//   result.code = response.status;
//   if (response.status != 200) {
//       return result;
//   }
//   let downloaded_content = await axios.get(response.data.download_url)
//   if (downloaded_content.status != 200) {
//       result.code = downloaded_content.status;
//       return result;
//   }
//   result.data.content = downloaded_content.data;
//   console.log("getFileContent response", response)
//   return result;
// };

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