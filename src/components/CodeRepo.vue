<template>
    <div>
        <el-tabs v-model="activeTab" @tab-change="handleTabChange" :stretch="true">
            <el-tab-pane v-for="(tab, tabName, index) in codeTabs" :label="(tab.label as string)" :name="tabName"
                :key="tabName">

                <div v-if="tabName == 'user' && tab.gitOwnerId == null">
                    <el-row class="form-item-row">
                        <el-col :span="18" class="form-item-label center-box">
                            <el-input v-model="userInputGitlabName" placeholder="Gitlab用户名" />
                        </el-col>
                        <el-col :span="2">
                        </el-col>
                        <el-col :span="4" class="center-box">
                            <el-button type="primary" @click="handleTabChange(tabName)">
                                确定
                            </el-button>
                        </el-col>
                    </el-row>
                </div>
                <div v-else class="repo-container">
                    <el-tree v-if="tab.dataSource == null || tab.dataSource.length > 0" style="min-height: 100px; width: 100%;" v-loading="tab.dataSource == null"
                        :data="tab.dataSource" :props="props" :expand-on-click-node="false" lazy :load="handleLoadNode">
                        <template #default="{ node, data }">
                            <span class="custom-tree-node">
                                <span>{{ data.name }}</span>
                                <span v-if="data.isLeaf === true">
                                    <el-button class="copy-button" type="text" @click="handleFileShow(data)">
                                        {{ '显示' }}
                                        <loading v-model:active="data.contentLoading" class="loading" :height="30"
                                            :width="30" color="#007bff" background-color="white" loader="bars"
                                            :is-full-page="false" />
                                    </el-button>
                                </span>
                                <span v-if="data.root === true">
                                    <el-button class="copy-button" type="text" @click="handleGotoRepo(data)">
                                        {{ '前往' }}
                                    </el-button>
                                    <el-button class="copy-button" type="text" @click="handleCopyCloneCmd(data)">
                                        {{ '复制clone命令' }}
                                    </el-button>
                                </span>
                            </span>
                        </template>
                    </el-tree>
                    <div v-else class="no-code-message">暂无代码仓库，<span class="link-to-gitlab" @click="handleGotoGitlab()">前往</span>创建</div>
                </div>

            </el-tab-pane>
        </el-tabs>

        <el-dialog v-model="centerCodeDialog.visible" :title="centerCodeDialog.filename" width="30%" align-center>
            <Codemirror v-model="centerCodeDialog.content" :indent-with-tab="true" :tab-size="4"
                :extensions="getExtensions(centerCodeDialog.filename)" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerCodeDialog.visible = false">取消</el-button>
                    <el-button type="primary" @click="copyCode(centerCodeDialog.content)">
                        复制
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus'; // 引入 Element Plus 组件库中的 Message 组件
import ClipboardJS from 'clipboard';
import { copyToClipboard } from '@/utils/clipboard'
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorState } from "@codemirror/state"
import { listAllCodeSnippets } from '@/api/cluster'
import { getUser, getUserRepos, getGroupRepos, getFileContent, getRepoContents, type BaseGitResponse, type TreeNode, type GetUserParams, type GetUserReposParams, type GetGroupReposParams, type GetRepoContentsParams, type GetFileContentParams } from '@/api/git'
import type Node from 'element-plus/es/components/tree/src/model/node'


import { type Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


const Theme = EditorView.theme({
    "&": {
        fontSize: "10.5pt",
        border: "1px solid #c0c0c0"
    },
    ".cm-content": {
        fontFamily: "Menlo, Monaco, Lucida Console, monospace",
        // minHeight: "100px"
    },
    ".cm-gutters": {
        // minHeight: "100px"
    },
    ".cm-scroller": {
        overflow: "auto",
        maxHeight: "600px"
    }
});

const FontSizeThemeExtension: Extension = [Theme];

const languageToExtension: any = {
    'json': json(),
    'javascript': javascript(),
    'python': python(),
}

export default defineComponent({
    name: 'CodeRepo',
    components: {
        Codemirror,
        Loading,
    },
    data() {
        return {
            props: {
                label: 'name',
                children: 'children',
                isLeaf: 'isLeaf',
            },
            centerCodeDialog: {
                visible: false,
                content: '',
                filename: '',
            },
            codeMirrorOptions: {
                mode: 'python', // Change the mode according to your code language
                lineNumbers: true,
                theme: 'one-dark', // Change the theme if needed
                indentUnit: 4,
                tabSize: 4,
            },
            activeTab: 'platform', // 'platform' or 'user'
            git_base_url: import.meta.env.VITE_GIT_BASE_URL,
            userInputGitlabName: "",
            codeTabs: {
                'platform': {
                    label: '模型代码',
                    gitOwnerId: 'root',
                    dataSource: null as TreeNode[] | null,
                },
                'user': {
                    label: '用户代码',
                    gitOwnerId: null,
                    dataSource: null as TreeNode[] | null,
                },
            } as {
                [key: string]: {
                    label: string,
                    gitOwnerId: string|null,
                    dataSource: TreeNode[],
                }
            }
        };
    },
    async mounted() {
        // setTimeout(async () => {
        //     let repos = await this.loadRepos(this.codeTabs[this.activeTab].gitOwnerId)
        // if (repos) {
        //     this.codeTabs[this.activeTab].dataSource = repos
        // }
        // }, 5000)
        let repos = await this.loadAIGroupRepos()
        if (repos) {
            this.codeTabs[this.activeTab].dataSource = repos
        }
    },
    props: {
        userId: {
            type: String,
            required: true,
        },
    },
    methods: {
        async handleTabChange(tabName: string) {
            // setTimeout(async () => {
            //     console.log("tab changed", tabName)
            //     if (this.codeTabs[tabName].dataSource != null && this.codeTabs[tabName].dataSource.length > 0) {
            //         return
            //     }
            //     let repos = await this.loadRepos(this.codeTabs[this.activeTab].gitOwnerId)
            //     if (repos) {
            //         // this.codeTabs[tabName].dataSource = repos
            //         this.codeTabs[tabName].dataSource = []
            //     }
            // }, 1000)

            if (this.codeTabs[tabName].dataSource != null && this.codeTabs[tabName].dataSource.length > 0) {
                return
            }
            console.log("tab changed", tabName)
            var _this = this
            let repos = await async function() {
                if (tabName == "platform") {
                    return await _this.loadAIGroupRepos()
                } else if (tabName == "user") {
                    let response = await getUser({ gitlabUserName: _this.userInputGitlabName })
                    if (response.code != 200) {
                        ElMessage.error('加载用户信息失败！');
                        return null
                    }
                    if (response.data == null || response.data.userInfos.length == 0) {
                        ElMessage.error('用户不存在！');
                        return null
                    }
                    console.log("getUserResponse at tabChanged", response)
                    _this.codeTabs[_this.activeTab].gitOwnerId = response.data.userInfos[0].id
                    if (_this.codeTabs[_this.activeTab].gitOwnerId == null) {
                        return null
                    }
                    return await _this.loadReposByUser(_this.codeTabs[_this.activeTab].gitOwnerId as string)
                } else {
                    console.log("impossible")
                }
            }()
            if (repos) {
                this.codeTabs[tabName].dataSource = repos
            }
        },
        async handleLoadNode(node: Node, resolve: Function) {
            console.log(node, "load node")
            if (!node.data) {
                // resolve(null)
                console.log("no data")
                return
            }
            let data: TreeNode = node.data as TreeNode
            if (data.isLeaf === true) {
                // resolve(null)
                console.log("isLeaf, no need to load")
                return
            }
            if (data.children !== null) {
                // resolve(null)
                console.log("children already loaded")
                return
            }
            let dirPath = data.fullPath
            let loadedRepoContents = await this.loadRepoContents(
                data.repoName,
                data.repoId,
                data.ref,
                dirPath)
            if (!loadedRepoContents) {
                resolve(null)
                console.log("load repo contents failed")
                return
            }
            console.log("loadedRepoContents", loadedRepoContents)
            resolve(loadedRepoContents)
        },
        async handleFileShow(data: TreeNode) {
            let showCodeDialog = (filename: string, content: string) => {
                this.centerCodeDialog.filename = filename;
                this.centerCodeDialog.content = content;
                this.centerCodeDialog.visible = true;
                console.log("showCodeDialog", filename)
            }
            if (data.content !== null) {
                showCodeDialog(data.name, data.content);
                return
            }
            data.contentLoading = true;
            setTimeout(async () => {
                let content = await this.loadFileContent(
                    data.repoId, data.ref, data.fullPath);
                data.contentLoading = false;
                if (!content) {
                    return;
                }
                data.content = content;
                showCodeDialog(data.name, data.content);
            }, 5000);
        },
        async handleGotoRepo(data: TreeNode) {
            let url = `${import.meta.env.VITE_GIT_BASE_URL}/${this.codeTabs[this.activeTab].gitOwnerId}/${data.repoName}`
            // open new browser tab to this url
            window.open(url);
        },
        async handleGotoGitlab() {
            let url = `${import.meta.env.VITE_GIT_BASE_URL}`
            console.log("handleGotoGitlab", url)
            // open new browser tab to this url
            window.open(url);
        },
        async handleCopyCloneCmd(data: TreeNode) {
            let cmd = `git clone ${import.meta.env.VITE_GIT_BASE_URL}/${this.codeTabs[this.activeTab].gitOwnerId}/${data.repoName}.git`
            copyToClipboard(cmd)
            ElMessage.success('代码仓库clone命令已复制到剪贴板！');
        },
        async loadReposByUser(gitOwnerId: string) {
            let getUserReposParams: GetUserReposParams = {
                repoOwnerId: gitOwnerId,
            }
            console.log("get code repos request", getUserReposParams)
            let response = await getUserRepos(getUserReposParams)
            console.log("get code repos response", response)
            if (response.code != 200 || response.data == null) {
                ElMessage.error('加载代码仓库失败！');
                return null
            }
            return response.data.repos
        },
        async loadAIGroupRepos() {
            let groupId = `${import.meta.env.VITE_GIT_AI_GROUP_ID}` // AI工作台群组
            let getGroupReposParams: GetGroupReposParams = {
                groupId: groupId,
            }
            console.log("get code repos request", getGroupReposParams)
            let response = await getGroupRepos(getGroupReposParams)
            console.log("get code repos response", response)
            if (response.code != 200 || response.data == null) {
                ElMessage.error('加载代码仓库失败！');
                return null
            }
            return response.data.repos
        },
        async loadRepoContents(repoName: string, repoId: number, ref: string, dirPath: string) {
            let params: GetRepoContentsParams = {
                repoId: repoId,
                repoName: repoName,
                ref: ref,
                dirPath: dirPath,
            }
            console.log("get code repo contents request", params)
            let response = await getRepoContents(params)
            console.log("get code repo tree response", response)
            if (response.code != 200 || response.data == null) {
                ElMessage.error('加载代码仓库树结构失败！');
                return
            }
            return response.data.children
        },
        async loadFileContent(repoId: number, ref: string, fileFullPath: string) {
            let getFileContentParams: GetFileContentParams = {
                repoId: repoId,
                ref: ref,
                filePath: fileFullPath,
            }
            console.log("get code file content request", getFileContentParams)
            let response = await getFileContent(getFileContentParams)
            console.log("get code file content response", response)
            if (response.code != 200 || response.data == null) {
                ElMessage.error('加载代码文件内容失败！');
                return
            }
            return response.data.content
        },
        copyCode(code: string) {
            copyToClipboard(code)
            ElMessage.success('代码已复制到剪贴板！');
        },
        getExtensions(filename: string) {
            // let suffix = filename.split(".").length > 1 ? filename.split(".")[1] : ""
            let suffix = filename.split(".").pop() as string
            let languageFixed = this.languageFix(suffix)
            let extensions = [EditorState.readOnly.of(true), oneDark, FontSizeThemeExtension]
            if (languageFixed in languageToExtension) {
                extensions.push(languageToExtension[languageFixed])
            }
            return extensions
        },
        languageFix(language: string) {
            if (language == 'py') {
                return 'python'
            }
            if (language == 'js' || language == 'javascript') {
                return 'javascript'
            }
            return language
        },
    },
});
</script>


<style scoped>
/* Add your custom styles here */

/* Styles for full code container */
.el-card :deep(.el-card__body) {
    padding: 10px;
}

.code-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* Add spacing between code blocks if needed */
}

/* Styles for code snippet container */
.repo-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    /* align-items: center; */
    justify-content: space-between;
}

/* Styles for code list */
.code-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* Add spacing between code blocks if needed */
}

.code-title {
    font: 1em sans-serif;
    /* Add styles for code title */
    display: flex;
    align-items: center;
}

.code-title-and-button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* Align the copy button to the right end of the parent element */
}

/* Styles for code content */
.code-content {
    background-color: #f2f2f2;
    /* Add a background color to distinguish code blocks */
    padding: 10px;
    border-radius: 4px;
    font-family: monospace;
    white-space: pre-wrap;
    /* Preserve line breaks and spacing in the code */
}

/* Styles for copy button */
.code-title-buttons {
    align-self: flex-end;
    /* Align the copy button to the right end of the parent element */
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

:deep(.el-tabs__item) {
    font-size: calc(100vw * 15 / 1920);
}

.no-code-message {
    font-size: calc(100vw * 15 / 1920);
    color: gray;
    text-align: center;
}

.link-to-gitlab {
    color: #007bff;
    cursor: pointer;
}

.form-item-row {
    padding-bottom: 10px;
}

.form-item-label {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(100vw * 13 / 1920);
}

.center-box {
    /* style="display: flex; align-items: center; justify-content: center;" */
    display: flex;
    align-items: center;
    justify-content: center;
}

:deep(.el-form-item__label) {
    text-align: left;
    font-size: calc(100vw * 13 / 1920);
    /* font-weight: bold; */
}

/* .loading {
    height: 30px;
    width: 30px;
    color: RGB(0, 123, 255);
    background-color: white;
} */
</style>
