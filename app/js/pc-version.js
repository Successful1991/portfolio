document.addEventListener('DOMContentLoaded', function() {
function init() {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300000);
    camera.position.set(0, 3800, 17000);
    camera.rotation.set(0, 0, 0);

    var renderer = new THREE.WebGLRenderer();
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

    var controls = new THREE.OrbitControls(camera);
    controls.maxDistance = 15000;
    controls.minDistance = 10500;


    // function loaderSpaceship1() {
    //   var mtlLoader = new THREE.MTLLoader();
    //   var interceptUrl = "img/intercept1/TIE-fighter.mtl";
    //   mtlLoader.load(interceptUrl, function (materials) {
    //     materials.preload();
    //     var objLoader = new THREE.OBJLoader();
    //     objLoader.setMaterials(materials);
    //     objLoader.setPath('img/');
    //     objLoader.load('intercept1/TIE-fighter.obj', function (object) {
    //       object.position.set(shar3.position.x,shar3.position.y,shar3.position.z);
    //       object.scale.set(1.5,1.5,1.5);
    //       intercept1 = object;
    //       scene.add(intercept1);
    //     });
    //   });
    // }
    // loaderSpaceship1();

    function loaderSpaceship2() {
      var mtlLoader = new THREE.MTLLoader();
      var interceptUrl = "img/intercept2/tie-intercept.mtl";
      mtlLoader.load(interceptUrl, function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('img/');
        objLoader.load('intercept2/tie-intercept.obj', function (object) {
          object.position.set(shar1.position.x, shar1.position.y, shar1.position.z);
          object.scale.set(12.5, 12.5, 12.5);
          intercept2 = object;
          scene.add(intercept2);
        });
      });
    }

    loaderSpaceship2();

    // function loaderSpaceship3() {
    //   var mtlLoader = new THREE.MTLLoader();
    //   var interceptUrl = "img/intercept2/tie-intercept.mtl";
    //   mtlLoader.load(interceptUrl, function (materials) {
    //     materials.preload();
    //     var objLoader = new THREE.OBJLoader();
    //     objLoader.setMaterials(materials);
    //     objLoader.setPath('img/');
    //     objLoader.load('intercept2/tie-intercept.obj', function (object) {
    //       object.position.set(shar2.position.x, shar2.position.y, shar2.position.z);
    //       object.scale.set(12.5, 12.5, 12.5);
    //       intercept3 = object;
    //       scene.add(intercept3);
    //     });
    //   });
    // }
    // loaderSpaceship3();


    function loaderMeteorite() {
      var mtlLoader = new THREE.MTLLoader();
      mtlLoader.setBaseUrl('img/meteorite/');
      mtlLoader.setPath('img/meteorite/');
      var url = "meteority_letyat.mtl";
      mtlLoader.load(url, function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('img/meteorite/');
        objLoader.load('meteority_letyat.obj', function (object) {

          object.position.set(-600, 0, -600);
          object.scale = 3;

          obj = object;
          scene.add(obj);

          obj1 = object.clone();
          obj1.position.set(-2200, 200, -3000);
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
          obj5.position.set(2500, -1500, 500);
          obj5.scale = 1;
          scene.add(obj5);

          obj6 = object.clone();
          obj6.position.set(2000, -900, 1000);
          obj6.scale = 2;
          scene.add(obj6);

          obj7 = object.clone();
          obj7.position.set(1400, 500, 400);
          obj7.scale = 3;
          scene.add(obj7);

          obj8 = object.clone();
          obj8.position.set(0, -1500, -1000);
          obj8.scale = 3;
          scene.add(obj8);

          obj9 = object.clone();
          obj9.position.set(300, -500, -2000);
          scene.add(obj9);
        });
      });
    }

    loaderMeteorite();

    // ---- добавление котролера камеры ----

    var y = 1700;
    var x = 0;
    document.addEventListener('mousemove', function (event) {
      y = parseInt(event.offsetY) + 1700;
      x = parseInt(event.offsetX);
    });

    // ---- добовление звезд -----
    var stars;
    var stars2;

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

    addStar(stars, 15000, 5500, 0.2, 1);
    addStar(stars2, 15000, 5500, 1, 1.2);

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

    var shar1 = addShar(900, 60, 'img/planet_Bog1200.png', 0, 0, -4000);
    var shar2 = addShar(900, 60, 'img/Venus2.jpg', -4000, 0, 4000);
    var shar3 = addShar(720, 50, 'img/planet_Quom1200.png', 4000, 0, 4000);


    // ---- вращение планет вокруг центра ----
    var rotateAroundWorldAxis = function (object, axis, radians) {
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
    function comet(obj, spead) {
      if (obj.position.z >= -8000 && obj.position.z <= 8000) {
        obj.position.z += spead;
      } else {
        obj.position.z = -8000;
      }
    }

// ------ клики на объект ------
    var info = false;
    var infoAboutMe = false;
    var infoPortfolio = false;
    var infoContact = false;
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var menu = false;

    function onMouseClick(event) {
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
      window.requestAnimationFrame(renderClick);
      info = true;
      document.getElementById("shar1").style.visibility = "hidden";
      document.getElementById("shar2").style.visibility = "hidden";
      document.getElementById("shar3").style.visibility = "hidden";
    }

    function renderClick() {
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(scene.children);
      for (var i = 0; i < intersects.length; i++) {
        if (intersects[i].object.uuid === shar1.uuid && infoAboutMe === false && infoPortfolio === false && infoContact === false) {
          clickMenuItem("aboutMe");
          infoAboutMe = true;
        }
        else if (intersects[i].object.uuid === shar2.uuid && infoAboutMe === false && infoPortfolio === false && infoContact === false) {
          clickMenuItem("portfolio");
          infoPortfolio = true;
        }
        else if (intersects[i].object.uuid === shar3.uuid && infoAboutMe === false && infoPortfolio === false && infoContact === false) {
          clickMenuItem("contact");
          infoContact = true;
        }
      }
      renderer.render(scene, camera);
    }

    window.addEventListener('click', onMouseClick, false);

// ----- обновление размера окна -----
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize, false);

// ------ наведение на объект ------
    function onDocumentMouseMove(event) {
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
      // if(info === false){
      renderMouseMove();
      // }
    }

    function renderMouseMove() {
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(scene.children);
      if (info === false && infoAboutMe === false && infoPortfolio === false && infoContact === false) {
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
      if (intersects.length === 0) {
        document.getElementById("shar1").style.visibility = "hidden";
        document.getElementById("shar2").style.visibility = "hidden";
        document.getElementById("shar3").style.visibility = "hidden";
        info = false;
      }
      renderer.render(scene, camera);
    }

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    function addMouseEffect(planet, object) {
      proj = toScreenPosition(object, camera);
      document.getElementById(planet).style.visibility = "visible";
      document.getElementById(planet).style.top = proj.y - (proj.y / 3) + 'px';
      document.getElementById(planet).style.left = proj.x - 75 + 'px';
      return info = true;
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

      var y = shar.position.y;
      var z = shar.position.z;

      if (camera.position.x > shar.position.x + 100) {
        camera.position.x -= 50;
        camera.lookAt(x, y, z);
      } else if (camera.position.x < shar.position.x) {
        camera.position.x += 80;
        camera.lookAt(x, y, z);
      }
      if (camera.position.z > shar.position.z + 5000) {
        camera.position.z -= 110;
        camera.lookAt(x, y, z);
      } else if (camera.position.z < shar.position.z - 5000) {
        camera.position.z += 110;
        camera.lookAt(x, y, z);
      }
      if (camera.position.y > shar.position.y + 50) {
        camera.position.y -= 50;
        camera.lookAt(x, y, z);
      } else if (camera.position.y < shar.position.y) {
        camera.position.y += 30;
        camera.lookAt(x, y, z);
      }

    }

    function getIdClick(event) {
      if (event.target.id === "menu__aboutMe") {
        clickMenuItem("aboutMe");
        infoAboutMe = true;
      } else if (event.target.id === "menu__portfolio") {
        clickMenuItem("portfolio");
        infoPortfolio = true;
      } else if (event.target.id === "menu__contact") {
        clickMenuItem("contact");
        infoContact = true;
      }
    }

    function clickMenuItem(id) {
      closedInfo();
      resetVariableInfo();
      controls.saveState();
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


    document.getElementById('burger').addEventListener("click", openMenu);
    document.getElementById('menu__list').addEventListener("click", getIdClick);

    var close = document.querySelectorAll('.closed');
    for (var i = 0; i < close.length; i++) {
      close[i].addEventListener("click", closedInfo);
    }

    function openMenu() {
      var attr = document.querySelector('#menu > input').checked;
      if (attr === true) {
        var menuItem = document.getElementsByClassName("menu__item");
        for (var i = 0; i < menuItem.length; i++) {
          var animate = "menuAnimate 3s forwards " + (i / 2) + "s";
          menuItem[i].style.animation = animate;
        }
        menu = true;
      }
      else if (attr === false) {
        var menuItem = document.getElementsByClassName("menu__item");
        for (var i = 0; i < menuItem.length; i++) {
          menuItem[i].style.animation = "menuDefault 2s forwards";
        }
        menu = false;
      }
    }

    function openInfo(id) {
      if (document.getElementById(id)) {
        document.getElementById(id).classList.add('infoActive');
      }
    }

    function closedInfo() {
      var t = document.querySelectorAll('.infoActive');
      if (t.length > 0) {
        document.querySelector('.infoActive').classList.add('infoClose');
        document.querySelector('.infoActive').classList.remove('infoActive');
        setTimeout(function () {
          document.querySelector('.infoClose').classList.remove('infoClose');
        }, 2000);
      }
      // if(event.target.offsetParent.id !== ""){
      //   document.getElementById(event.target.offsetParent.id).style.animation = "closedInfo 2s forwards";
      // }else if(event.target.offsetParent.offsetParent.id !== ""){
      //   document.getElementById(event.target.offsetParent.offsetParent.id).style.animation = "closedInfo 2s forwards";
      // }

      //controls.reset();
      camera.position.z = 17000;
      controls = new THREE.OrbitControls(camera);
      controls.maxDistance = 19000;
      controls.minDistance = 10500;
      console.log(info, infoAboutMe, infoPortfolio, infoContact, menu);
      resetVariableInfo();
      console.log(info, infoAboutMe, infoPortfolio, infoContact, menu);
    }


    var t = 0;
    var t3 = 0;
    var animate = function () {
      requestAnimationFrame(animate);
      if (info === false && infoAboutMe === false && infoPortfolio === false && infoContact === false && menu === false) {
        rotateAroundWorldAxis(shar3, new THREE.Vector3(0, 1, 0), 0.001);
        rotateAroundWorldAxis(shar2, new THREE.Vector3(0, 1, 0), 0.001);
        rotateAroundWorldAxis(shar1, new THREE.Vector3(0, 1, 0), 0.001);

        camera.position.y = y * 1.5;
        camera.position.x = x * 1.5;
        controls.enabled = true;
        controls.update();
      }
      else if (info === true) {
        controls.enabled = false;
      }
      if (infoAboutMe === true) {
        movementToThePlanet(shar1);
      } else if (infoPortfolio === true) {
        movementToThePlanet(shar2);
      } else if (infoContact === true) {
        movementToThePlanet(shar3);
      }

      comet(obj, 10);
      obj.rotation.x += 0.01;
      comet(obj1, 12);
      obj1.rotation.x += 0.02;
      comet(obj2, 5);
      obj2.rotation.y += 0.02;
      comet(obj3, 8);
      obj3.rotation.x += 0.03;
      comet(obj4, 9);
      obj4.rotation.y += 0.03;
      comet(obj5, 14);
      obj5.rotation.x += 0.02;
      comet(obj6, 13);
      obj6.rotation.y += 0.01;
      comet(obj7, 17);
      obj7.rotation.x += 0.02;
      comet(obj8, 10);
      obj8.rotation.y += 0.02;
      comet(obj9, 7);
      obj9.rotation.x += 0.03;

      shar1.rotation.y -= 0.001;
      shar2.rotation.y += 0.001;
      shar3.rotation.y += 0.001;

      // intercept1.position.x = (Math.sin(t * 0.15) * 920) + (shar3.position.x);
      // intercept1.position.z = (Math.cos(t * 0.15) * 1160) + (shar3.position.z);
      // intercept1.rotation.y -= 0.005;

      intercept2.position.x = (Math.sin(t * 0.15) * 100) + (shar1.position.x);
      intercept2.position.z = (Math.cos(t * 0.15) * 100) + (shar1.position.z);
      intercept2.rotation.x -= 0.005;
      intercept2.rotation.y -= 0.005;


      // intercept3.position.x = (Math.sin(t3 * 0.15) * 100) + (shar2.position.x );
      // intercept3.position.z = (Math.cos(t3 * 0.15) * 100) + (shar2.position.z);
      // intercept3.rotation.y -= 0.005;

      t += Math.PI / 180 * 2;
      //t3 += Math.PI / 180 * 2;

      renderer.render(scene, camera);
    };


    animate();
  }

  init();
}, false);