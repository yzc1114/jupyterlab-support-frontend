// import { Gitlab } from '@gitbeaker/rest';
// import { Gitlab } from '@gitbeaker/node';
// const { Gitlab } = require('@gitbeaker/rest');
import { Gitlab } from 'https://esm.sh/@gitbeaker/rest';
import { Buffer } from 'buffer';
const gitUrl = import.meta.env.VITE_GIT_API_BASE_URL

const rootBeakerApi = new Gitlab({
    host: gitUrl,
    token: "glpat-RZnzx43BUo4x8T5cpyyG",
});

const mock = true;

export interface TreeNode {
    name: string;
    fullPath: string;
    children: TreeNode[] | null;
    isLeaf: boolean;
    content: string | null;
    root: boolean;
    contentLoading: boolean;
    repoName: string;
    repoId: number;
    ref: string;
}

export interface GetFileContentParams {
    repoOwnerId: string;
    token: string | undefined;
    repoId: number;
    filePath: string;
    ref: string;
}

export interface BaseGitResponse {
    code: number;
    msg: string;
}

export interface GetFileContentResponse extends BaseGitResponse {
    data: {
        content: string | null;
    };
}

function getApi(repoOwnerId: string, token: string | undefined) {
    return rootBeakerApi
}

var tokenNotExistResponse: BaseGitResponse = {
    code: 401,
    msg: "token not exist",
};

function apiErrorResponse(err: any): BaseGitResponse {
    return {
        code: 500,
        msg: JSON.stringify(err),
    }
}


export const getFileContent = async (params: GetFileContentParams): Promise<GetFileContentResponse> => {
    let api = getApi(params.repoOwnerId, params.token)
    if (!api) {
        return tokenNotExistResponse as GetFileContentResponse;
    }
    // return response.data;
    let response: any = null;
    if (mock) {
        response = {
            "file_name": "test.txt",
            "file_path": "test.txt",
            "size": 6,
            "encoding": "base64",
            "content_sha256": "66a045b452102c59d840ec097d59d9467e13a3f34f6494e539ffd32c1bb35f18",
            "ref": "main",
            "blob_id": "e965047ad7c57865823c7d992b1d046ea66edf78",
            "commit_id": "4897b8b263466cb292df154f67e55fb629b2a138",
            "last_commit_id": "4615753d138394fd0cf7512439eeeb7c321f3bc3",
            "execute_filemode": false,
            "content": "SGVsbG8K"
        }
    } else {
        try {
            response = await api.RepositoryFiles.show(params.repoId, params.filePath, params.ref);
            console.log("RepositoryFiles", response);
        } catch (e) {
            return apiErrorResponse(e) as GetFileContentResponse;
        }
    }
    let result: GetFileContentResponse = {
        code: 200,
        msg: "success",
        data: {
            content: "",
        },
    };
    let content = Buffer.from(response.content, 'base64').toString();
    console.log("base64 content", content)
    result.data.content = content;
    return result;
};


export interface GetUserReposParams {
    repoOwnerId: string;
    token: string | undefined;
}

export interface GetUserReposResponse extends BaseGitResponse {
    code: number;
    data: {
        repos: TreeNode[];
    };
}


export const getUserRepos = async (params: GetUserReposParams): Promise<GetUserReposResponse> => {
    let response: any = null;
    let api = getApi(params.repoOwnerId, params.token)
    if (!api) {
        return tokenNotExistResponse as GetUserReposResponse;
    }
    if (mock) {
        response = [
            {
                "id": 1,
                "description": null,
                "name": "test1-proj-1",
                "name_with_namespace": "test1l test1f / test1-proj-1",
                "path": "test1-proj-1",
                "path_with_namespace": "test1/test1-proj-1",
                "created_at": "2023-11-30T06:37:32.116Z",
                "default_branch": "main",
                "tag_list": [],
                "topics": [],
                "ssh_url_to_repo": "git@1240edfb84bb:test1/test1-proj-1.git",
                "http_url_to_repo": "http://1240edfb84bb/test1/test1-proj-1.git",
                "web_url": "http://1240edfb84bb/test1/test1-proj-1",
                "readme_url": "http://1240edfb84bb/test1/test1-proj-1/-/blob/main/README.md",
                "forks_count": 0,
                "avatar_url": null,
                "star_count": 0,
                "last_activity_at": "2023-11-30T07:56:38.839Z",
                "namespace": {
                    "id": 2,
                    "name": "test1l test1f",
                    "path": "test1",
                    "kind": "user",
                    "full_path": "test1",
                    "parent_id": null,
                    "avatar_url": "https://www.gravatar.com/avatar/50ce962eb454e5eed42442130ca028eb?s=80&d=identicon",
                    "web_url": "http://1240edfb84bb/test1"
                },
                "_links": {
                    "self": "http://1240edfb84bb/api/v4/projects/1",
                    "issues": "http://1240edfb84bb/api/v4/projects/1/issues",
                    "merge_requests": "http://1240edfb84bb/api/v4/projects/1/merge_requests",
                    "repo_branches": "http://1240edfb84bb/api/v4/projects/1/repository/branches",
                    "labels": "http://1240edfb84bb/api/v4/projects/1/labels",
                    "events": "http://1240edfb84bb/api/v4/projects/1/events",
                    "members": "http://1240edfb84bb/api/v4/projects/1/members",
                    "cluster_agents": "http://1240edfb84bb/api/v4/projects/1/cluster_agents"
                },
                "packages_enabled": true,
                "empty_repo": false,
                "archived": false,
                "visibility": "public",
                "owner": {
                    "id": 2,
                    "username": "test1",
                    "name": "test1l test1f",
                    "state": "active",
                    "locked": false,
                    "avatar_url": "https://www.gravatar.com/avatar/50ce962eb454e5eed42442130ca028eb?s=80&d=identicon",
                    "web_url": "http://1240edfb84bb/test1"
                },
                "resolve_outdated_diff_discussions": false,
                "container_expiration_policy": {
                    "cadence": "1d",
                    "enabled": false,
                    "keep_n": 10,
                    "older_than": "90d",
                    "name_regex": ".*",
                    "name_regex_keep": null,
                    "next_run_at": "2023-12-01T06:37:32.191Z"
                },
                "issues_enabled": true,
                "merge_requests_enabled": true,
                "wiki_enabled": true,
                "jobs_enabled": true,
                "snippets_enabled": true,
                "container_registry_enabled": true,
                "service_desk_enabled": false,
                "service_desk_address": null,
                "can_create_merge_request_in": true,
                "issues_access_level": "enabled",
                "repository_access_level": "enabled",
                "merge_requests_access_level": "enabled",
                "forking_access_level": "enabled",
                "wiki_access_level": "enabled",
                "builds_access_level": "enabled",
                "snippets_access_level": "enabled",
                "pages_access_level": "enabled",
                "analytics_access_level": "enabled",
                "container_registry_access_level": "enabled",
                "security_and_compliance_access_level": "private",
                "releases_access_level": "enabled",
                "environments_access_level": "enabled",
                "feature_flags_access_level": "enabled",
                "infrastructure_access_level": "enabled",
                "monitor_access_level": "enabled",
                "model_experiments_access_level": "enabled",
                "emails_disabled": false,
                "emails_enabled": true,
                "shared_runners_enabled": true,
                "lfs_enabled": true,
                "creator_id": 2,
                "import_url": null,
                "import_type": null,
                "import_status": "none",
                "open_issues_count": 0,
                "description_html": "",
                "updated_at": "2023-11-30T07:56:38.839Z",
                "ci_default_git_depth": 20,
                "ci_forward_deployment_enabled": true,
                "ci_forward_deployment_rollback_allowed": true,
                "ci_job_token_scope_enabled": false,
                "ci_separated_caches": true,
                "ci_allow_fork_pipelines_to_run_in_parent_project": true,
                "build_git_strategy": "fetch",
                "keep_latest_artifact": true,
                "restrict_user_defined_variables": false,
                "runners_token": "GR1348941hAyKKaCzYRABGZ5pHCTm",
                "runner_token_expiration_interval": null,
                "group_runners_enabled": true,
                "auto_cancel_pending_pipelines": "enabled",
                "build_timeout": 3600,
                "auto_devops_enabled": true,
                "auto_devops_deploy_strategy": "continuous",
                "ci_config_path": null,
                "public_jobs": true,
                "shared_with_groups": [],
                "only_allow_merge_if_pipeline_succeeds": false,
                "allow_merge_on_skipped_pipeline": null,
                "request_access_enabled": true,
                "only_allow_merge_if_all_discussions_are_resolved": false,
                "remove_source_branch_after_merge": true,
                "printing_merge_request_link_enabled": true,
                "merge_method": "merge",
                "squash_option": "default_off",
                "enforce_auth_checks_on_uploads": true,
                "suggestion_commit_message": null,
                "merge_commit_template": null,
                "squash_commit_template": null,
                "issue_branch_template": null,
                "autoclose_referenced_issues": true,
                "requirements_enabled": false,
                "requirements_access_level": "enabled",
                "security_and_compliance_enabled": true,
                "compliance_frameworks": [],
                "permissions": {
                    "project_access": {
                        "access_level": 50,
                        "notification_level": 3
                    },
                    "group_access": null
                }
            }
        ]
    } else {
        try {
            response = await api.Users.allProjects(params.repoOwnerId, { perPage: 100 })
        } catch (e) {
            return apiErrorResponse(e) as GetUserReposResponse;
        }
    }
    console.log("getUserRepos response", response)
    let result: GetUserReposResponse = {
        "code": 200,
        "msg": "success",
        "data": {
            "repos": [] as TreeNode[]
        }
    }
    response.forEach((repo: any) => {
        let repoNode: TreeNode = {
            name: repo.name,
            children: null,
            fullPath: "",
            isLeaf: false,
            root: true,
            content: null,
            contentLoading: false,
            repoName: repo.name,
            repoId: repo.id,
            ref: repo.default_branch,
        }
        result.data.repos.push(repoNode);
    });
    return result;
}

export interface GetRepoContentsParams {
    repoOwnerId: string;
    token: string | undefined;
    repoName: string;
    repoId: number;
    ref: string;
    dirPath: string;
}

export interface GetRepoContentsResponse extends BaseGitResponse {
    data: {
        children: TreeNode[];
    };
}


export const getRepoContents = async (params: GetRepoContentsParams): Promise<GetRepoContentsResponse> => {
    let response: any = null;
    let api = getApi(params.repoOwnerId, params.token)
    if (!api) {
        return tokenNotExistResponse as GetRepoContentsResponse;
    }
    if (mock) {
        response = [
            {
                "id": "5d2a01016664fd4e8cf2d033a659b9323e0deb3c",
                "name": "testdir",
                "type": "tree",
                "path": "testdir",
                "mode": "040000"
            },
            {
                "id": "65c1a1658c8148aa0c32b054d5df34c9b7847969",
                "name": "README.md",
                "type": "blob",
                "path": "README.md",
                "mode": "100644"
            },
            {
                "id": "e965047ad7c57865823c7d992b1d046ea66edf78",
                "name": "test.txt",
                "type": "blob",
                "path": "test.txt",
                "mode": "100644"
            }
        ]
    } else {
        try {
            response = await api.Repositories.allRepositoryTrees(params.repoId, {
                path: params.dirPath,
                ref: params.ref,
            });
        } catch (e) {
            return apiErrorResponse(e) as GetRepoContentsResponse;
        }
    }
    console.log("getRepoContents response", response)
    let result: GetRepoContentsResponse = {
        code: 200,
        msg: "success",
        data: {
            children: [] as TreeNode[]
        }
    }
    response.forEach((item: any) => {
        let repoNode: TreeNode = {
            name: item.name,
            children: null,
            fullPath: item.path,
            root: false,
            isLeaf: item.type == "blob",
            content: null,
            contentLoading: false,
            repoName: params.repoName,
            repoId: params.repoId,
            ref: params.ref,
        }
        result.data.children.push(repoNode);
    });
    return result;
}
