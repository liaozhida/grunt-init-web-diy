#!/bin/bash

# 通过在docker设置环境变量NODE_ENV=xxx来指定启动的配置，支持的有
# production(生产环境) prep(预发布环境) test(测试环境)
PORT={%= port %} supervisor index.js