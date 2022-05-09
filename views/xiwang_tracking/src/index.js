function loadScript() {
  return new Promise((resolve, reject) => {
    let oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src =
      "https://static-growth-fe.saasp.vdyoo.com/growthFeProject/growthFeSource/growthJsLibrary/talSensor_v2.1.3.js";
    window.onload = function() {
      document.body.appendChild(oScript);
      oScript.onload = function() {
        resolve(obj);
      };
      oScript.onerror = function(err) {
        reject(err);
      };
    };
  });
}

const xesLog = async (obj) => {
  await loadScript();
  return new window.XesAnalytics(obj);
};

export default xesLog;
