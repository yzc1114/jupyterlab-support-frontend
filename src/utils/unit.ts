export function convertToGB(input: string): number {
    // 定义单位与字节的映射关系
    const unitToBytes: { [key: string]: number } = {
      Ki: 1024,
      Mi: 1024 * 1024,
      Gi: 1024 * 1024 * 1024,
      Ti: 1024 * 1024 * 1024 * 1024,
    };
  
    // 使用正则表达式从字符串中提取数字和单位部分
    const match = input.match(/^(\d+)(\w+)$/);
  
    if (match && match.length === 3) {
      const numberPart = parseInt(match[1]);
      const unitPart = match[2];
  
      // 检查是否存在合法的单位
      if (unitToBytes.hasOwnProperty(unitPart)) {
        // 将单位转换为字节（B）
        const bytes = numberPart * unitToBytes[unitPart];
        
        // 将字节转换为GB
        const GB = bytes / (1024 * 1024 * 1024);
        
        return GB;
      }
    }
  
    // 如果输入的格式不正确或者单位不合法，则返回null表示转换失败
    return 0;
}

