// 模型路径 @|hubei.stl|
const stlPath = './static/resource/hubei.stl'
const canvasW = 750
const canvasH = 1508

var renderer;
function initRender() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: owo.id.canvasBg,
    alpha: true
  });
  renderer.setSize(canvasW, canvasH);
  //告诉渲染器需要阴影效果
  // renderer.setClearColor(0x000000);
  // document.body.appendChild(renderer.domElement);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, canvasW/canvasH, 0.1, 1000);
    camera.position.set(0, 20, 25);
    camera.lookAt(new THREE.Vector3(0,0,0));
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

//初始化dat.GUI简化试验流程
var gui;

var light;
function initLight() {
    // scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.PointLight(0xffffff);
    light.position.set(0,50,50);

    //告诉平行光需要开启阴影投射
    light.castShadow = true;

    // scene.add(light);
}

let Geometry = null

function createPoints() {
  // 创建一个几何模型（Geometry）,并添加点
  let geometry = new THREE.Geometry();

  // 点位置
  const p1 = new THREE.Vector3(0,0,0);
  const p2 = new THREE.Vector3(15,15,0);
  const p3 = new THREE.Vector3(-15,2,0);

  // vertices 表示顶点
  geometry.vertices.push(p1, p2, p3);
  // 使用 PointsMaterial, 记得加上size属性，用来设置点的大小
  // https://threejs.org/docs/index.html#api/en/materials/PointsMaterial
  let material = new THREE.PointsMaterial({
      color: 0x00ff66, 
      size: 2
  });

  let points = new THREE.Points(geometry, material);
  return points;
}

function initModel() {

    //辅助工具
    // var helper = new THREE.AxesHelper(50);
    // scene.add(helper);
    var loader = new THREE.STLLoader();
    loader.load(stlPath, function (geometry) {
      Geometry = geometry
        //创建纹理
      var material = new THREE.PointsMaterial({
        color: 0xfffd80,
        size: 6,
        opacity: 0.8,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        // vertexColors: true,
        sizeAttenuation: false,
        // @|dot.png|
        map: new THREE.TextureLoader().load( './static/resource/dot.png' )
      });
      
      var mesh = new THREE.Points(Geometry, material);
      console.log(mesh)
      mesh.rotation.x = -0.5 * Math.PI; //将模型摆正
      mesh.scale.set(1, 1, 1); //缩放
      Geometry.center(); //居中显示
      // console.log(JSON.stringify(mesh.toJSON()))
      mesh.position.y = 3
      scene.add(mesh);
    });
}

function test () {
  for (let index = 0; index < Geometry.attributes.position.array[0].length; index++) {
    Geometry.attributes.position.array[0][index] = 0
  }
  console.log(Geometry)
}

function render() {

    renderer.render( scene, camera );
}

//窗口变动触发的函数
function onWindowResize() {

    camera.aspect = canvasW / canvasH;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize( canvasW, canvasH );

}

function animate() {
  //更新控制器
  render();

  requestAnimationFrame(animate);
}

function draw() {
  initRender();
  initScene();
  initCamera();
  // initLight();
  initModel();

  animate();
  window.onresize = onWindowResize;
}