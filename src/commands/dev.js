import webpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import path from "path";
import chalk from "chalk";
import getConfig from "../../webpack/config";
import { getComponentInfo } from "../utils";
import {
  getAccessToken,
  getUserInfo,
  getUserNpm,
  hasPermission,
} from "../utils/git";
async function devAction(port) {
  console.log(
    chalk.red(
      "terra-cli 版本>1.1.0 （1）旧组件使用请查看升级指南:https://fe.xesv5.com/luban/#/guide"
    )
  );
  const options = {
    disableHostCheck: true,
    contentBase: path.join(__dirname, "dist"), // html所在路径
    compress: true, // 是否压缩
    port: port,
    hot: true, // 热部署
    open: true, // 打包后自动打开网页
  };
  const componentInfo = await getComponentInfo();
  // console.log('componentInfo', componentInfo)
  // const accessToken = await getAccessToken();
  // const userInfo = await getUserInfo(accessToken)
  // console.log('userInfo',userInfo)
  try {
    // npm 无对应包时会报错 500
    const data = await getUserNpm({ pkgname: componentInfo.name });
    const result = hasPermission(data.data, userInfo);
    if (!result.flag) {
      console.log(
        chalk.green(
          `您当前没有${componentInfo.name}组件的开发权限，申请权限请联系${result.admin}老师, 工号${result.workCode}`
        )
      );
      return;
    }
  } catch (e) {}

  console.log("aaaaaaaaaaa");
  const config = getConfig(componentInfo.type, componentInfo.name);
  // console.log(JSON.stringify(config))
  config.mode = "development";
  const compiler = webpack(config);
  console.log("bbbbbbbb");
  const server = new webpackDevServer(compiler, options);
  console.log("cccccccc", server);

  server.listen(port, "localhost", () => {
    console.log(`dev server listening on port ${port}`);
  });
}
export default devAction;
