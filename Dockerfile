# 使用 nginx 作为基础镜像
FROM nginx:latest

# 复制前端构建输出目录中的文件到 Nginx 默认的静态资源目录
COPY dist/ /usr/share/nginx/html

# 复制 nginx.conf 到镜像中的相应路径
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露容器的 80 端口，用于对外提供服务
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
