window.addEventListener('load',function () {

  var comets = false;
  var stars,stars2,shar1,shar2,shar3;
  var scene;
  var camera;
  var controls;
  var renderer;
  var y = 1700;
  var x = 0;
//var t = 0;

  var info = false;
  var infoAboutMe = false;
  var infoPortfolio = false;
  var infoContact = false;
  var hint = false;
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var menu = false;
  var cameraReset = false;
  var defaultDirectionCamera = {
    x: 0,
    y: 0,
    z: 0
  };
  var currentDirectionCamera = {
    x: 0,
    y: 0,
    z: 0
  };
  var defaultPositionCamera = {
    x: 0,
    y: 3800,
    z: 17000
  };


  function init() {
    //var scene = new THREE.Scene();
    scene = new THREE.Scene();
    //var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200000);
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200000);
    camera.position.set(0, 3800, 17000);
    camera.rotation.set(0, 0, 0);

    // var renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.5);

    document.body.appendChild(renderer.domElement);
// ----- добавление света -----
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.x = 12000;
    light.position.y = 12000;
    scene.add(light);

    var amColor = "#ffffff";
    var amLight = new THREE.AmbientLight(amColor, 0.15);
    scene.add(amLight);

// ------ add controller -----
    //var controls = new THREE.OrbitControls(camera);
    controls = new THREE.OrbitControls(camera);
    controls.maxDistance = 18000;
    controls.minDistance = 10500;
    controls.zoomSpeed = 0.5;
    controls.rotateSpeed = 0.1;
    controls.panSpeed = 0.1;
    controls.enablePan = false;
    controls.enableRotate = true;
  }
  init();
  //var spaceship = false;
// function loaderSpaceship2() {
  //         var mtlLoader = new THREE.MTLLoader();
  //         var interceptUrl = "img/intercept2/tie-intercept.mtl";
  //         mtlLoader.load(interceptUrl, function (materials) {
  //           materials.preload();
  //           var objLoader = new THREE.OBJLoader();
  //           objLoader.setMaterials(materials);
  //           objLoader.setPath('img/');
  //           objLoader.load('intercept2/tie-intercept.obj', function (object) {
  //             object.position.set(shar1.position.x, shar1.position.y, shar1.position.z);
  //             object.scale.set(12.5, 12.5, 12.5);
  //             intercept2 = object;
  //             scene.add(intercept2);
  //             spaceship = true;
  //           });
  //         });
  //       }
  function loaderMeteorite() {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setBaseUrl('app/img/meteorite/');
    mtlLoader.setPath('app/img/meteorite/');
    var url = "meteority_letyat.mtl";
    mtlLoader.load(url, function (materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('app/img/meteorite/');
      objLoader.load('meteority_letyat.obj', function (object) {

        object.position.set(-600, 0, -600);
        object.scale = 30;

        obj = object;
        scene.add(obj);

        obj1 = object.clone();
        obj1.position.set(-2200, 1200, -3000);
        scene.add(obj1);

        obj2 = object.clone();
        obj2.position.set(-1800, 1600, -3500);
        obj2.scale = 2;
        scene.add(obj2);

        obj3 = object.clone();
        obj3.position.set(-2500, -1200, 3000);
        scene.add(obj3);

        obj4 = object.clone();
        obj4.position.set(0, 1200, 4000);
        obj4.scale = 5;
        scene.add(obj4);

        obj5 = object.clone();
        obj5.position.set(3000, -1800, 500);
        obj5.scale = 1;
        scene.add(obj5);

        obj6 = object.clone();
        obj6.position.set(2000, -1100, 1000);
        obj6.scale = 2;
        scene.add(obj6);

        obj7 = object.clone();
        obj7.position.set(1400, 1300, 100);
        obj7.scale = 3;
        scene.add(obj7);

        obj8 = object.clone();
        obj8.position.set(0, -1500, -1000);
        obj8.scale = 3;
        scene.add(obj8);

        obj9 = object.clone();
        obj9.position.set(300, 1500, -4000);
        scene.add(obj9);



        // obj10 = object;
        // obj10.position.set(-2200, 2200, -4000);
        // scene.add(obj10);
        //
        // obj11 = object.clone();
        // obj1.position.set(-1200, 3000, -2000);
        // scene.add(obj11);
        //
        // obj12 = object.clone();
        // obj12.position.set(2800, 3200, -7000);
        // obj12.scale = 20;
        // scene.add(obj12);
        //
        // obj13 = object.clone();
        // obj13.position.set(2000, 2700, 6500);
        // obj13.scale = 20;
        // scene.add(obj13);
        //
        // obj14 = object.clone();
        // obj14.position.set(500, 2500, 7500);
        // obj14.scale = 35;
        // scene.add(obj14);
        //
        // obj15 = object.clone();
        // obj15.position.set(0, 2500, 2500);
        // obj15.scale = 85;
        // scene.add(obj15);
        //
        // obj16 = object.clone();
        // obj16.position.set(2000, -1200, 2000);
        // obj16.scale = 25;
        // scene.add(obj16);
        //
        // obj17 = object.clone();
        // obj17.position.set(1400, 3700, 4000);
        // obj17.scale = 30;
        // scene.add(obj17);
        //
        // obj18 = object.clone();
        // obj18.position.set(200, -1500, -1000);
        // obj18.scale = 30;
        // scene.add(obj18);
        //
        // obj19 = object.clone();
        // obj19.position.set(-300, 1500, -2000);
        // obj19.scale = 25;
        // scene.add(obj19);

        comets = true;
      });
    });
  }

  // ---- добовление звезд -----
  function addStar(star, amount, scalar, opacity, size) {
    var starGeometry = new THREE.Geometry();
    var starMaterial = new THREE.PointsMaterial({
      color: 0xbbbbbb,
      opacity: opacity,
      size: size,
      sizeAttenuation: false
    });

    for (var i = 0; i < amount; i++) {
      var vertex = new THREE.Vector3();
      vertex.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
      vertex.multiplyScalar(scalar);
      starGeometry.vertices.push(vertex);
    }
    star = new THREE.Points(starGeometry, starMaterial);
    star.scale.set(20, 20, 20);
    scene.add(star);
  }
  // ---- добовление планет ----

  function addShar(radius, segment, url, posX, posY, posZ) {
    var geonetryShar = new THREE.SphereGeometry(radius, segment, segment);
    var materialShar = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load(url),
      side: THREE.FrontSide
    });
    var object = new THREE.Mesh(geonetryShar, materialShar);
    object.position.set(posX, posY, posZ);
    object.rotation.x = 90;
    scene.add(object);
    return object;
  }

  shar1 = addShar(900, 60, 'app/img/planet_Bog.jpg', 0, 0, -4000);
  shar2 = addShar(900, 60, 'app/img/Venus2.jpg', -4000, 0, 4000);
  shar3 = addShar(720, 50, 'app/img/planet_Quom.jpg', 4000, 0, 4000);


  // ---- вращение планет вокруг центра ----
  function rotateAroundWorldAxis(object, axis, radians) {
    var rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

    var currentPos = new THREE.Vector4(object.position.x, object.position.y, object.position.z, 1);
    var newPos = currentPos.applyMatrix4(rotWorldMatrix);

    rotWorldMatrix.multiply(object.matrix);
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
    object.position.set(newPos.x, newPos.y, newPos.z);
  };

  // ---- анимацию полета метеоритов ----
  function comet() {
    if (obj.position.z <= -12000 && obj.position.z >= 18000) {
      obj.position.z = -12000;
    }
    if (obj1.position.z <= -12000 && obj1.position.z >= 18000) {
      obj1.position.z = -12000;
    }
    if (obj2.position.z <= -12000 && obj2.position.z >= 18000) {
      obj2.position.z = -12000;
    }
    if (obj3.position.z <= -12000 && obj3.position.z >= 18000) {
      obj3.position.z = -12000;
    }
    if (obj3.position.z <= -12000 && obj3.position.z >= 18000) {
      obj3.position.z = -12000;
    }
    if (obj4.position.z <= -12000 && obj4.position.z >= 18000) {
      obj4.position.z = -12000;
    }
    if (obj5.position.z <= -12000 && obj5.position.z >= 18000) {
      obj5.position.z = -12000;
    }
    if (obj6.position.z <= -12000 && obj6.position.z >= 18000) {
      obj6.position.z = -12000;
    }
    if (obj7.position.z <= -12000 && obj7.position.z >= 18000) {
      obj7.position.z = -12000;
    }
    if (obj8.position.z <= -12000 && obj8.position.z >= 18000) {
      obj8.position.z = -12000;
    }
    if (obj9.position.z <= -12000 && obj9.position.z >= 18000) {
      obj9.position.z = -12000;
    }
  }

// ------ клики на объект ------

  //var t = 0;
  function onMouseClick() {
    document.getElementById("shar1").style.visibility = "hidden";
    document.getElementById("shar2").style.visibility = "hidden";
    document.getElementById("shar3").style.visibility = "hidden";
    renderClick();
  }

  function renderClick() {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    for (var i = 0; i < intersects.length; i++) {
      if (intersects[i].object.uuid === shar1.uuid && !infoAboutMe && !infoPortfolio && !infoContact) {
        clickMenuItem("aboutMe");
        infoAboutMe = true;
        info = true;
      }
      else if (intersects[i].object.uuid === shar2.uuid && !infoAboutMe && !infoPortfolio && !infoContact) {
        clickMenuItem("portfolio");
        infoPortfolio = true;
        info = true;
      }
      else if (intersects[i].object.uuid === shar3.uuid && !infoAboutMe && !infoPortfolio && !infoContact) {
        clickMenuItem("contact");
        infoContact = true;
        info = true;
      }
    }
    renderer.render(scene, camera);
  }

// ----- обновление размера окна -----
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

// ------ наведение на объект ------
  function onDocumentMouseMove(event) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
    y = parseInt(event.offsetY) + 1700;
    x = parseInt(event.offsetX);
    renderMouseMove();
  }

  function renderMouseMove() {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (!info) {
      for (var i = 0; i < intersects.length; i++) {
        if (intersects[i].object.uuid === shar1.uuid) {
          addMouseEffect("shar1", intersects[i].object);
        }
        else if (intersects[i].object.uuid === shar2.uuid) {
          addMouseEffect("shar2", intersects[i].object);
        }
        else if (intersects[i].object.uuid === shar3.uuid) {
          addMouseEffect("shar3", intersects[i].object);
        }
      }
    }
    if(intersects.length === 0) {
      document.getElementById("shar1").style.visibility = "hidden";
      document.getElementById("shar2").style.visibility = "hidden";
      document.getElementById("shar3").style.visibility = "hidden";
      //info = false;
      hint = false;

    }
    renderer.render(scene, camera);
  }

  function addMouseEffect(planet, object) {
    hint = true;
    var proj = toScreenPosition(object, camera);
    document.getElementById(planet).style.visibility = "visible";
    document.getElementById(planet).style.top = proj.y - (proj.y / 3) + 'px';
    document.getElementById(planet).style.left = proj.x - 75 + 'px';
    //info = true;
  }

  function toScreenPosition(obj, camera) {
    var vector = new THREE.Vector3();
    var widthHalf = 0.5 * renderer.context.canvas.width;
    var heightHalf = 0.5 * renderer.context.canvas.height;

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);
    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = -( vector.y * heightHalf ) + heightHalf;
    return {
      x: vector.x,
      y: vector.y
    };
  }

  function movementToThePlanet(shar) {
    var pl = shar.geometry.parameters.radius * 1.5;
    var x;
    if (shar.position.z < camera.position.z) {
      x = shar.position.x + pl;
    } else {
      x = shar.position.x - pl;
    }
    var sharik = {
      x: x,
      y: shar.position.y,
      z: shar.position.z
    };
    cameraPurpose(currentDirectionCamera, sharik);
    if (camera.position.x > shar.position.x + 100) {
      camera.position.x -= 80;
    } else if (camera.position.x < shar.position.x) {
      camera.position.x += 80;
    }
    if (camera.position.z > shar.position.z + 5000) {
      camera.position.z -= 210;
    } else if (camera.position.z < shar.position.z - 5000) {
      camera.position.z += 210;
    }
    if (camera.position.y > shar.position.y + 90) {
      camera.position.y -= 80;
    } else if (camera.position.y < shar.position.y) {
      camera.position.y += 80;
    }
  }


  function resetCameraPosition(cam){
    if(camera.position.x > cam.x +100 ){
      camera.position.x-=80;
    }else if(camera.position.x < cam.x ){
      camera.position.x+=50;
    }
    if(camera.position.y > cam.y + 100 ){
      camera.position.y-=80;
    }else if(camera.position.y < cam.y ){
      camera.position.y+=50;
    }
    if(camera.position.z > cam.z + 200 ){
      camera.position.z-=160;
    }else if(camera.position.z < cam.z ){
      camera.position.z+=120;
    }else{
      cameraReset = false;
    }
    cameraPurpose(currentDirectionCamera, defaultDirectionCamera);
  }

  function cameraPurpose(from, to){
    if(from.x > to.x +240 ){
      from.x-=80;
    }else if(from.x < to.x ){
      from.x+=50;
    }
    if(from.y > to.y + 240 ){
      from.y-=80;
    }else if(from.y < to.y ){
      from.y+=50;
    }
    if(from.z > to.z + 240 ){
      from.z-=160;
    }else if(from.z < to.z ){
      from.z+=120;
    }
    camera.lookAt(from.x,from.y,from.z);
  }

  function getIdClick(event) {
    if (event.target.id === "menu__aboutMe") {
      clickMenuItem("aboutMe");
      infoAboutMe = true;
      //info = true;
    } else if (event.target.id === "menu__portfolio") {
      clickMenuItem("portfolio");
      infoPortfolio = true;
      //info = true;
    } else if (event.target.id === "menu__contact") {
      infoContact = true;
      clickMenuItem("contact");
      //info = true;
    }
  }

  function clickMenuItem(id) {
    removeClassActive();
    resetVariableInfo();
    controls.dispose();
    openInfo(id);
    info = true;
  }

  function resetVariableInfo() {
    info = false;
    infoAboutMe = false;
    infoPortfolio = false;
    infoContact = false;
  }

  function addEventClosed() {
    var close = document.querySelectorAll('.closed');
    for (var i = 0; i < close.length; i++) {
      close[i].addEventListener("click", closedInfo);
    }
  }

  function openMenu() {
    var attr = document.querySelector('#menu > input').checked;
    if (attr === true) {
      var menuItem = document.getElementsByClassName("menu__item");
      for (var i = 0; i < menuItem.length; i++) {
        var animate = "menuAnimate 1s forwards " + (i / 2) + "s";
        menuItem[i].style.animation = animate;
      }
      menu = true;
      info = true;
    }
    else if (attr === false) {
      var menuItem = document.getElementsByClassName("menu__item");
      for (var i = 0; i < menuItem.length; i++) {
        menuItem[i].style.animation = "menuDefault 1s forwards";
      }
      menu = false;
      info = false;
    }
  }

  function openInfo(id) {
    if (document.getElementById(id)) {
      document.getElementById(id).classList.add('infoActive');
    }
  }

  function closedInfo() {
    removeClassActive();
    setTimeout(function () {
      controls = new THREE.OrbitControls(camera);
      controls.maxDistance = 19000;
      controls.minDistance = 10500;
      resetVariableInfo();
      cameraReset = true;
    }, 1000);
  }
  function removeClassActive() {
    var t = document.querySelectorAll('.infoActive');
    if (t.length > 0) {
      document.querySelector('.infoActive').classList.add('infoClose');
      document.querySelector('.infoActive').classList.remove('infoActive');
      setTimeout(function () {
        document.querySelector('.infoClose').classList.remove('infoClose');
      }, 2000);
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!info && !hint) {
      rotateAroundWorldAxis(shar3, new THREE.Vector3(0, 1, 0), 0.001);
      rotateAroundWorldAxis(shar2, new THREE.Vector3(0, 1, 0), 0.001);
      rotateAroundWorldAxis(shar1, new THREE.Vector3(0, 1, 0), 0.001);
      camera.position.y = y * 1.5;
      camera.position.x = x * 1.5;
      controls.enableRotate = false;
      controls.update();
    }
    else if (info) {
      controls.enableRotate = false;
    }
    if (infoAboutMe) {
      movementToThePlanet(shar1);
    } else if (infoPortfolio) {
      movementToThePlanet(shar2);
    } else if (infoContact) {
      movementToThePlanet(shar3);
    }
    if(cameraReset){
      resetCameraPosition(defaultPositionCamera);
    }
    if(comets) {
      comet();
      obj.rotation.x += 0.01;
      obj.position.z += 10;
      obj1.rotation.x += 0.02;
      obj1.position.z += 12;
      obj2.rotation.y += 0.02;
      obj2.position.z += 5;
      obj3.rotation.x += 0.03;
      obj3.position.z += 8;
      obj4.rotation.y += 0.03;
      obj4.position.z += 9;
      obj5.rotation.x += 0.02;
      obj5.position.z += 14;
      obj6.rotation.y += 0.01;
      obj6.position.z += 13;
      obj7.rotation.x += 0.02;
      obj7.position.z += 17;
      obj8.rotation.y += 0.02;
      obj8.position.z += 10;
      obj9.rotation.x += 0.03;
      obj9.position.z += 7;
      // comet(obj10, 10);
      // obj10.rotation.x += 0.01;
      // comet(obj11, 12);
      // obj11.rotation.x += 0.02;
      // comet(obj12, 5);
      // obj12.rotation.y += 0.02;
      // comet(obj13, 8);
      // obj13.rotation.x += 0.03;
      // comet(obj14, 9);
      // obj14.rotation.y += 0.03;
      // comet(obj15, 30);
      // obj15.rotation.x += 0.07;
      // comet(obj16, 13);
      // obj16.rotation.y += 0.01;
      // comet(obj17, 17);
      // obj17.rotation.x += 0.02;
      // comet(obj18, 10);
      // obj18.rotation.y += 0.02;
      // comet(obj19, 7);
      // obj19.rotation.x += 0.03;
    }
    shar1.rotation.y -= 0.001;
    shar2.rotation.y += 0.001;
    shar3.rotation.y += 0.001;

    // if(spaceship) {
    //   intercept2.position.x = (Math.sin(t * 0.15) * 100) + (shar1.position.x);
    //   intercept2.position.z = (Math.cos(t * 0.15) * 100) + (shar1.position.z);
    //   intercept2.rotation.x -= 0.005;
    //   intercept2.rotation.y -= 0.005;
    // }
    //
    // t += Math.PI / 180 * 2;
    renderer.render(scene, camera);
  };

  window.addEventListener('click', onMouseClick, false);
  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousemove', onDocumentMouseMove, false);
  document.getElementById('burger').addEventListener("click", openMenu);
  document.getElementById('menu__list').addEventListener("click", getIdClick);
  addStar(stars, 7000, 5500, 0.2, 1);
  addStar(stars2, 3000, 4500, 1, 1.4);

  addEventClosed();
  loaderMeteorite();
  //loaderSpaceship2();
  animate();
});