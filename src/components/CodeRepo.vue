<template>
    <div>
        <el-tabs v-model="activeTab" @tab-change="handleTabChange">
            <el-tab-pane v-for="(tab, tabName, index) in codeTabs" :label="(tab.label as string)" :name="tabName"
                :key="tabName">

                <div class="repo-container">
                    <el-tree :data="tab.dataSource" :props="props" :expand-on-click-node="false" lazy :load="handleLoadNode">
                        <template #default="{ node, data }">
                            <span class="custom-tree-node">
                                <span>{{ data.name }}</span>
                                <span v-if="data.isLeaf === true">
                                    <el-button class="copy-button" type="text" @click="handleFileShow(data)">
                                        {{ '显示' }}
                                    </el-button>
                                </span>
                            </span>
                        </template>
                    </el-tree>
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
import { getUserRepos, getFileContent, getRepoContents, type TreeNode, type GetUserReposParams, type GetRepoContentsParams, type GetFileContentParams } from '@/api/git'
import type Node from 'element-plus/es/components/tree/src/model/node'


import { type Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

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
            codeTabs: {
                'platform': {
                    label: '模型代码',
                    gitOwnerId: 'test',
                    dataSource: [] as TreeNode[],
                },
                'user': {
                    label: '用户代码',
                    gitOwnerId: this.userId,
                    dataSource: [] as TreeNode[],
                },
            } as {
                [key: string]: {
                    label: string,
                    gitOwnerId: string
                    dataSource: TreeNode[],
                }
            }
        };
    },
    async mounted() {
        let repos = await this.loadRepos(this.codeTabs[this.activeTab].gitOwnerId)
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
            console.log("tab changed", tabName)
            if (this.codeTabs[tabName].dataSource.length > 0) {
                return
            }
            let repos = await this.loadRepos(this.codeTabs[this.activeTab].gitOwnerId)
            if (repos) {
                this.codeTabs[tabName].dataSource = repos
            }
        },
        async handleLoadNode(node: Node, resolve: Function) {
            console.log(node, "load node")
            if (!node.data) {
                resolve(null)
                console.log("no data")
                return
            }
            let data: TreeNode = node.data as TreeNode
            if (data.isLeaf === true) {
                resolve(null)
                console.log("isLeaf, no need to load")
                return
            }
            if (data.children !== null) {
                // resolve(null)
                console.log("children already loaded")
                return
            }
            let dirPath = data.fullPath
            let loadedRepoContents = await this.loadRepoContents(this.codeTabs[this.activeTab].gitOwnerId, data.name, dirPath)
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
            let content = await this.loadFileContent(this.codeTabs[this.activeTab].gitOwnerId, data.name, data.fullPath);
            if (!content) {
                return;
            }
            data.content = content;
            showCodeDialog(data.name, data.content);
        },
        async loadRepos(gitOwnerId: string) {
            let getUserReposParams: GetUserReposParams = {
                repoOwnerId: gitOwnerId
            }
            console.log("get code repos request", getUserReposParams)
            let response = await getUserRepos(getUserReposParams)
            console.log("get code repos response", response)
            if (response.code != 200 || response.data == null) {
                ElMessage.error('加载代码仓库失败！');
                return
            }
            return response.data.repos
        },
        async loadRepoContents(gitOwnerId: string, repoName: string, dirPath: string) {
            let params: GetRepoContentsParams = {
                repoOwnerId: gitOwnerId,
                repoName: repoName,
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
        async loadFileContent(gitOwnerId: string, repoName: string, fileFullPath: string) {
            let getFileContentParams: GetFileContentParams = {
                repoOwnerId: gitOwnerId,
                repoName: repoName,
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
</style>
