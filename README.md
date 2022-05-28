### 项目结构
# build
运行 npm build 生成的打包文件
# public
静态资源
# src-assets
静态资源

# src-components
组件目录
- carousel: 走马灯、checkOutCard：结账卡片、cooperation：合作企业、filter: 搜索页面筛选、footer：页脚、header：页头、paymentCard：支付页面卡片、paymentForm: 支付页面输入表单、productCollection: 主页产品列表、productComments: 产品评论、productIntro：产品介绍、productList：搜索页面产品列表、siderMenu: 菜单栏

# src-i18n
国际化目录

# src-layout
两种页面的布局方式
登录相关页面，无header和footer
主页相关页面，有header和footer

# src-pages
detail 商品详情页面：ProductIntro, ProductComments
home 主页：SideMenu, Carousel, ProductCollection, Cooperation
placeOrder 订单页面：PaymentForm, CheckOutCard
register 注册页面
search 搜索页面：FilterArea, ProductList
shoppingCart 购物车页面：ProductList, PaymentCard
signIn 登录页面

# src-redux
language、recommentProducts（传统redux store）
middlewares 自定义中间件
order、productDetail、search、shoppingCart、user （RTK slice）

# App.module.css 模块化css文件
# App.tsx 配置 React-Router V6
# index.tsx 项目入口文件
# dockerfile 容器化生成文件