<template>
    <el-button type="primary" @click="enableCodeSnippets">代码快捷粘贴</el-button>

    <el-dialog title="代码片段快捷复制粘贴界面" v-model="dialogVisible" width="800px">
        <el-tabs v-model="activeTab">
            <el-tab-pane v-for="(tab, tabName, index) in codeTabs" :label="tabName" :name="tabName" :key="tabName">

                <div class="snippet-container">
                    <el-collapse v-if="Object.keys(tab).length > 0">
                        <el-collapse-item :key="folderName" v-for="(folder, folderName, index2) in tab"
                            :title="folderName">
                            <div class="code-list">
                                <el-card v-for="code in folder" :key="code.name">
                                    <div class="code-title-and-button">
                                        <div class="code-title">{{ code.name }}</div>
                                        <div class="code-title-buttons">
                                            <el-button class="copy-button" type="text"
                                                @click="code.visible = !code.visible">
                                                {{ code.visible ? '折叠' : '显示' }}
                                            </el-button>
                                            <el-button class="copy-button" type="text" @click="copyCode(code.content)">
                                                复制
                                            </el-button>
                                        </div>
                                    </div>

                                    <div v-if="code.visible" class="code-content">
                                        <Codemirror v-model="code.content" :indent-with-tab="true" :tab-size="4"
                                            :extensions="getExtensions(code.language)" />

                                    </div>
                                </el-card>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <div v-else class="no-code-message">暂无代码片段</div>
                </div>

            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { type Node, type Instance } from '@/typeDefs/typeDefs'; // 假设有定义 Node 和 Instance 类型
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

const languageToExtension: any = {
    'json': json(),
    'javascript': javascript(),
    'python': python(),
}

const FontSizeThemeExtension: Extension = [Theme];

export default defineComponent({
    name: 'CodeSnippet',
    components: {
        Codemirror,
    },
    data() {
        return {
            codeMirrorOptions: {
                mode: 'python', // Change the mode according to your code language
                lineNumbers: true,
                theme: 'one-dark', // Change the theme if needed
                indentUnit: 4,
                tabSize: 4,
            },
            dialogVisible: false,
            activeTab: 'fullCode', // 'fullCode' or 'codeSnippet'
            codeTabs: {} as {
                [tabName: string]: {
                    [folderName: string]: {
                        name: string,
                        content: string,
                        language: string,
                        visible: boolean,
                    }[]
                }
            },
        };
    },
    mounted() {
        // this.loadCodes()
    },
    props: {

    },
    methods: {
        async loadCodes() {
            // Load code snippets from backend
            let response = await listAllCodeSnippets()
            if (response.code != 20000) {
                ElMessage.error('加载代码片段失败！原因：' + response.message);
                return
            }
            console.log("code snippets", response.data.items)
            let codeSnippets = response.data.items
            let tabs: any = {}

            for (let codeSnippet of codeSnippets) {
                let language = this.languageFix(codeSnippet.spec.language)
                let item = {
                    name: codeSnippet.spec.codeName,
                    content: codeSnippet.spec.content,
                    language: language,
                    visible: false,
                }

                let tabName = codeSnippet.spec.codeType
                if (!(tabName in tabs)) {
                    tabs[tabName] = {}
                }
                let folderName = codeSnippet.spec.codeDir
                if (!(folderName in tabs[tabName])) {
                    tabs[tabName][folderName] = []
                }
                tabs[tabName][folderName].push(item)
            }
            console.log("tabs", tabs)
            this.codeTabs = tabs
            let keys = Object.keys(tabs)
            if (keys.length > 0) {
                this.activeTab = keys[0]
            }
        },
        copyCode(code: string) {
            copyToClipboard(code)
            ElMessage.success('代码已复制到剪贴板！');
        },
        getExtensions(language: string) {
            let extensions = [EditorState.readOnly.of(true), oneDark, FontSizeThemeExtension]
            if (language in languageToExtension) {
                extensions.push(languageToExtension[language])
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
        async enableCodeSnippets() {
            await this.loadCodes()
            this.dialogVisible = true
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
.snippet-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    /* Add spacing between code folders if needed */
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
</style>
