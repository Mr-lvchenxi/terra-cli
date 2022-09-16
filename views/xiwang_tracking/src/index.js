function loadScript() {
  return new Promise((resolve, reject) => {
    let oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src =
      "https://static-growth-fe.saasp.vdyoo.com/growthFeProject/growthFeSource/growthJsLibrary/talSensor_v2.1.6.js";
    window.onload = function() {
      document.body.appendChild(oScript);
      oScript.onload = function() {
        if (window.XesAnalytics) {
          resolve(window.XesAnalytics);
        }
      };
      oScript.onerror = function(err) {
        reject(err);
      };
    };
  });
}

const Xeslog = async (obj) => {
  let res = await loadScript();
  return new res(obj);
};

export default Xeslog;
