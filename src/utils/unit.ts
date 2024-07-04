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
        let GB = bytes / (1024 * 1024 * 1024);

        // 保留两位小数
        GB = Math.round(GB * 100) / 100;
        
        return GB;
      }
    }
  
    // 如果输入的格式不正确或者单位不合法，则返回null表示转换失败
    return 0;
}

export function convertByteToProperUnit(input: number): string {
  // 定义字节与单位的映射关系
  const bytesToUnit: { [key: string]: number } = {
    B: 1,
    K: 1000,
    M: 1000 * 1000,
    G: 1000 * 1000 * 1000,
    T: 1000 * 1000 * 1000 * 1000,
  };

  // 初始化单位为字节
  let unit = "B";
  let value = input;

  // 从最大单位开始遍历，找到合适的单位
  for (const [key, bytes] of Object.entries(bytesToUnit).reverse()) {
    if (input >= bytes) {
      // 计算对应单位的值
      value = input / bytes;
      // 保留两位小数
      value = Math.round(value * 100) / 100;
      unit = key;
      break;
    }
  }

  return `${value}${unit}`;
}

export function convertCPUToCore(input: string): number {
  // cpu can be in the format of 100m or 1
  // 100m means 100 milli core, 1 means 1 core
  // 1 core = 1000 milli core
  const match = input.match(/^(\d+)(\w*)$/);
  if (match && match.length === 3) {
    const numberPart = parseInt(match[1]);
    console.log("numberPart", numberPart)
    const unitPart = match[2];
    if (unitPart === "m") {
      let core = numberPart / 1000;
      // 保留一位
      core = Math.round(core * 10) / 10;
      return core;
    } else {
      return numberPart;
    }
  }
  return 0;
}
