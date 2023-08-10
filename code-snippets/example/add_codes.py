import os
import argparse
import subprocess
import yaml

def generate_crd_yaml(folder_path, output_folder):
    files = []

    # 遍历文件夹下的所有文件
    for root, _, filenames in os.walk(folder_path):
        for filename in filenames:
            file_path = os.path.join(root, filename)
            files.append(file_path)

    # 逐个处理文件生成 CRD YAML
    for file_path in files:
        with open(file_path, 'r') as file:
            content = file.read()

        # 构建 CRD YAML 数据
        dir_name = os.path.dirname(file_path)
        code_type = dir_name.split(os.path.sep)[-2]  # 倒数第二个路径部分作为 codeType
        code_dir = dir_name.split(os.path.sep)[-1]  # 文件所在的文件夹
        language = filename.split('.')[-1]  # 文件后缀作为 language
        code_name = os.path.basename(file_path)
        code_id = f"{code_type}-{code_dir}-{code_name}"

        crd_data = {
            'apiVersion': 'doslab.iscas/v1',
            'kind': 'CodeSnippet',
            'metadata': {
                'name': code_id  # 根据文件名生成资源名称
            },
            'spec': {
                'codeName': code_name, # 使用分析的 codeName
                'codeType': code_type,  # 使用分析的 codeType
                'codeDir': code_dir,  # 使用分析的 codeDir
                'language': language,  # 使用分析的 language
                'content': content  # 读取文件内容作为代码片段
            }
        }

        # 生成 CRD YAML 文件
        output_file_path = os.path.join(output_folder, f"{code_id}.yaml")
        with open(output_file_path, 'w') as output_file:
            yaml.dump(crd_data, output_file)

        print(f"Generated CRD YAML for {file_path} at {output_file_path}")

# 应用所有生成的 CRD YAML 文件到集群中
def apply_crd_yaml_files(output_folder):
    crd_files = [file for file in os.listdir(output_folder) if file.endswith('.yaml')]

    for file in crd_files:
        file_path = os.path.join(output_folder, file)

        # 使用 kubectl apply 命令将 CRD YAML 文件应用到集群中
        apply_command = f"kubectl apply -f {file_path}"
        subprocess.run(apply_command, shell=True, check=True)

        print(f"Applied CRD YAML file: {file_path}")

def main():
    # 创建 CLI 参数解析器
    parser = argparse.ArgumentParser(description='Generate CRD YAML files for code snippets')
    parser.add_argument('folder_path', type=str, help='Path to the folder containing code snippets')
    parser.add_argument('--output_folder', type=str, default='code-snippets-yamls', help='Path to the folder to store generated CRD YAML files')

    # 解析命令行参数
    args = parser.parse_args()
    folder_path = args.folder_path
    if os.path.exists(args.output_folder):
        print(f"Output folder {args.output_folder} already exists, please delete it first")
        return
    os.mkdir(args.output_folder)
    output_folder = args.output_folder

    # 生成 CRD YAML 文件
    generate_crd_yaml(folder_path, output_folder)

    # 将生成的 CRD YAML 文件应用到集群中
    apply_crd_yaml_files(output_folder)

if __name__ == '__main__':
    main()
