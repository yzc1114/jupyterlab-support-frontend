import os
import argparse
import subprocess
import yaml

def generate_crd_yaml(folder_path, output_folder):
    files = []
    
    for root, _, filenames in os.walk(folder_path):
        for filename in filenames:
            file_path = os.path.join(root, filename)
            files.append(file_path)
    
    for file_path in files:
        with open(file_path, 'r') as file:
            content = file.read()
        
        crd_data = {
            'apiVersion': 'doslab.iscas/v1',
            'kind': 'CodeSnippet',
            'metadata': {
                'name': os.path.basename(file_path).replace('.txt', '')
            },
            'spec': {
                'codeType': 'example',
                'codeDir': os.path.dirname(file_path),
                'language': 'python',
                'content': content
            }
        }
        
        output_file_path = os.path.join(output_folder, f"{os.path.basename(file_path)}.yaml")
        with open(output_file_path, 'w') as output_file:
            yaml.dump(crd_data, output_file)
        
        print(f"Generated CRD YAML for {file_path} at {output_file_path}")
