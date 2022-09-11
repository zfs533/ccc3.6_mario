# 项目环境
- Vue 2.x
- Element-UI


# 安装依赖
```shell
    npm install
```

# 本地启动服务
```shell
    npm run dev
```

浏览器访问 http://localhost:9527

# 发布

# 打包并上传测试环境
```shell
    ./test.sh
```

# 打包并上传正式环境
```shell
    ./build.sh
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix


#配置文件

根目录下三个文件分别为本地，测试服，正式服的API请求地址配置：
.env.development
.env.production
.env.staging