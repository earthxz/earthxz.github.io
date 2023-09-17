// 创建Cesium Viewer
var viewer = new Cesium.Viewer('cesiumContainer', {
  //添加地形
  terrain: Cesium.Terrain.fromWorldTerrain({
    // requestWaterMask: true,
    // requestVertexNormals: true
  }),
  navigationHelpButton: false, // 隐藏帮助按钮
  fullscreenButton: false, // 隐藏全屏按钮
  homeButton: false, // 隐藏主页按钮
  geocoder: false, // 隐藏地理编码器
  sceneModePicker: false, // 隐藏场景模式选择器
  baseLayerPicker: false, // 隐藏底图选择器
  timeline: false, // 隐藏时间轴
  animation: false, // 隐藏动画控件
  skyAtmosphere: false, //
  shouldAnimate: true, //
});

// 抗锯齿
viewer.scene.postProcessStages.fxaa.enabled = true;
// 优化性能
viewer.resolutionScale = window.devicePixelRatio;
// 水雾特效
viewer.scene.globe.showGroundAtmosphere = false;
// 设置最大俯仰角，[-90,0]区间内，默认为-30，单位弧度
viewer.scene.screenSpaceCameraController.constrainedPitch = Cesium.Math.toRadians(-10);
//隐藏底部文字和logo
viewer.cesiumWidget.creditContainer.style.display = "none";
//移除当前图层
viewer.imageryLayers.removeAll();

// 自定义一个图层
var gog = new Cesium.UrlTemplateImageryProvider({
  url: 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s%40781=&x={x}&y={y}&z={z}&src=app&scale=8&from=app'
  //url: 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s,m&gl=&x={x}&y={y}&z={z}&src=app&scale=8&from=app'

});

//限制地球放大范围
viewer.scene.screenSpaceCameraController.minimumZoomDistance = 25;
//限制地球缩小范围
viewer.scene.screenSpaceCameraController.maximumZoomDistance = 24000000;

var title = new Cesium.UrlTemplateImageryProvider({
 //url: 'https://tiles1.geovisearth.com/base/v1/cia/{z}/{x}/{y}?format=png&tmsIds=w&token=82455ef06c72bb3a35bbb4d7d05fd9eceb96a94dc942a056b8feb0e5928ed96f',
  url: 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=h&hl=&x={x}&y={y}&z={z}&scale=8&from=app',

});

// const title2 = new Cesium.UrlTemplateImageryProvider({
//   url: 'https://tiles1.geovisearth.com/base/v1/cia/{z}/{x}/{y}?format=png&tmsIds=w&token=82455ef06c72bb3a35bbb4d7d05fd9eceb96a94dc942a056b8feb0e5928ed96f',
// });


viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(106.8599, 25.6488, 10000000)
});
// //自定义函数名
var gog = viewer.imageryLayers.addImageryProvider(gog);
var title = viewer.imageryLayers.addImageryProvider(title);
//var titlee = viewer.imageryLayers.addImageryProvider(title2);
//初始状况下路网不可见
title.show = false;
//titlee.show = false;
//复选框控制
var che = document.getElementById('checkbox');
che.addEventListener('change', () => {
  title.show = che.checked;
 //titlee.show = che.checked;
});

// //ArcGis地形服务
// var ArcGisTerrainProvider = new Cesium.ArcGISTiledElevationTerrainProvider({
//     url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
// });
//         viewer.terrain = ArcGisTerrainProvider;

function zoomInByMove(flag) {
  var position = viewer.camera.positionCartographic;
  var minHeight = 25; // 最小高度
  var maxHeight = 25000000; // 最大高度

  if (flag) {
    var newHeight = position.height * 0.5;
    if (position.height - newHeight > minHeight) {
      viewer.camera.moveForward(newHeight);
    }
  } else {
    var newHeight = position.height / 0.5;
    if (position.height + newHeight < maxHeight  ) {
      viewer.camera.moveBackward(newHeight);
    }
  }
}

// 绑定两个控件事件
document.getElementById('zoomIn').addEventListener('click', function() {
  zoomInByMove(1);
});

document.getElementById('zoomOut').addEventListener('click', function() {
  zoomInByMove(0);
});

var zoomTimer; // 定时器变量

// 按下鼠标按钮时开始连续缩放
document.getElementById('zoomIn').addEventListener('mousedown', function() {
  zoomTimer = setInterval(function() {
    zoomInByMove(1);
  }, 200); // 每100毫秒执行一次缩放
});

document.getElementById('zoomOut').addEventListener('mousedown', function() {
  zoomTimer = setInterval(function() {
    zoomInByMove(0);
  }, 200); // 每100毫秒执行一次缩放
});

// 松开鼠标按钮时停止连续缩放
document.addEventListener('mouseup', function() {
  clearInterval(zoomTimer); // 清除定时器
});