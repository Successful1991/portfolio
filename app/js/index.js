window.addEventListener('load',function () {
    var cometLoadingIndicator = false;
    var planet1,planet2,planet3,scene,camera,controls,renderer,meteorite;
    var y = 1700;
    var x = 0;
    var t=0;
    //var t = 0;
    var galaxyAdd;
    var spaceship;

    var infoActive = false;
    var aboutMeInfoActive = false;
    var portfolioInfoActive = false;
    var contactInfoActive = false;
    var indicatorHint = false;
    var spaceshipIndicator = false;
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
    let cometsConfig = [
      {
        position: {
          x: 3600,
          y: 3200,
          z: -1600
        },
        scale: 40,
        animate:{
          rotation:{
            x: 0.01,
            y: 0.03
          },
          position:{
            z: 10
          }
      }
      },{
        position:{
          x:-2200,
          y:1200,
          z:-3000
        },
        scale: 50,
        animate:{
          rotation:{
            x: 0.02,
            y: 0
          },
          position:{
            z: 12
          }
        }
      },{
        position:{
          x:2800,
          y:1900,
          z:-6500
        },
        scale: 40,
        animate:{
          rotation:{
            x: 0.01,
            y: 0.02
          },
          position:{
            z: 25
          }
        }
      },{
        position:{
          x:-2500,
          y:-3200,
          z:-13000
        },
        scale: 55,
        animate:{
          rotation:{
            x: 0.03,
            y: 0.01
          },
          position:{
            z: 8
          }
        }
      },{
        position:{
          x:-2000,
          y:2800,
          z:4000
        },
        scale: 30,
        animate:{
          rotation:{
            x:0,
            y: 0.03
          },
          position:{
            z: 9
          }
        }
      },{
        position:{
          x:3000,
          y:3800,
          z:500
        },
        scale: 40,
        animate:{
          rotation:{
            x: 0.02,
            y: 0
          },
          position:{
            z: 14
          }
        }
      },{
        position:{
          x:2500,
          y:-4100,
          z:-10000
        },
        scale: 54,
        animate:{
          rotation:{
            x: 0,
            y:0.01
          },
          position:{
            z: 13
          }
        }
      },{
        position:{
          x:1400,
          y:1300,
          z:-8100
        },
        scale: 40,
        animate:{
          rotation:{
            x: 0.02,
            y: 0
          },
          position:{
            z: 17
          }
        }
      },{
        position:{
          x:0,
          y:-1500,
          z:-1100
        },
        scale: 45,
        animate:{
          rotation:{
            x: 0.02,
            y: 0.02
          },
          position:{
            z: 10
          }
        }
      },{
        position:{
          x:-3300,
          y:4500,
          z:-4000
        },
        scale: 35,
        animate:{
          rotation:{
            x: 0.03,
            y: 0
          },
          position:{
            z: 17
          }
        }
      }
      ];
    let galactic = [
      {
      height: 17000,
      width: 17000,
      position: {
        x:16000,
        y:7000,
        z:-92000
      },
      rotation: 0,
      url:'app/img/stars/galactictop.png'
    },{
      height: 90000,
      width: 60000,
      position: {
        x:-34000,
        y:-10000,
        z:-42000
      },
      rotation: 20,
      url:'app/img/stars/galactic2.jpg'
    },{
      height: 64000,
      width: 64000,
      position: {
        x:104000,
        y:-50000,
        z:-100000
      },
      rotation: -1,
      url:'app/img/stars/atlantis_nebula-final.png'
    },{
      height: 64000,
      width: 64000,
      position: {
        x:104000,
        y:20000,
        z:-100000
      },
      rotation: -1,
      url:'app/img/stars/downloaded-finish.jpg'
    }];
    let starsType = [
      {
      amount:4000,
      distance:5500,
      opacity:1,
      size:6,
      url:'app/img/stars/p_0.png'
    },{
      amount:3000,
      distance:5500,
      opacity:0.5,
      size:4,
      url:'app/img/stars/star_preview.png'
    },{
      amount:2000,
      distance:5500,
      opacity:1,
      size:8,
      url:'app/img/stars/galactic_blur.png'
    },{
      amount:10,
      distance:5500,
      opacity:1,
      size:60,
      url:'app/img/stars/corona.png'
    },{
      amount:100,
      distance:5500,
      opacity:1,
      size:15,
      url:'app/img/stars/galactic_sharp.png'
    },{
      amount:7000,
      distance:5500,
      opacity:1,
      size:1,
      url:false
    }];

    function init() {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200000);
      camera.position.set(0, 3800, 17000);
      camera.rotation.set(0, 0, 0);

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0.5);

      document.getElementById('desktop').appendChild(renderer.domElement);
// ----- добавление света -----
      var light = new THREE.DirectionalLight(0xffffff, 1.2);
      light.position.x = 22000;
      light.position.y = 12000;
      scene.add(light);

      var amColor = "#ffffff";
      var amLight = new THREE.AmbientLight(amColor, 0.25);
      scene.add(amLight);

// ------ add controller -----
      addControls();
    }
    init();

    function addControls() {
      controls = new THREE.OrbitControls(camera);
      controls.maxDistance = 38000;
      controls.minDistance = 10500;
      controls.zoomSpeed = 0.5;
      controls.rotateSpeed = 0.1;
      controls.panSpeed = 0.1;
      controls.enablePan = false;
      controls.enableRotate = true;
      controls.maxPolarAngle = Math.PI/2+0.3;
      controls.minPolarAngle = Math.PI/2-0.5;
      controls.minAzimuthAngle = -0.6;
      controls.maxAzimuthAngle = 0.6;
    }

    function loaderSpaceship2() {
      var mtlLoader = new THREE.MTLLoader();
      var interceptUrl = "app/img/intercept2/tie-intercept.mtl";
      mtlLoader.load(interceptUrl, function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('app/img/');
        objLoader.load('intercept2/tie-intercept.obj', function (object) {
          object.position.set(planet2.position.x, planet2.position.y, planet2.position.z);
          object.scale.set(12.5, 12.5, 12.5);
          spaceship = object;
          scene.add(spaceship);
          spaceshipIndicator = true;

          document.getElementById('desktop').style.opacity=1;
          document.getElementById('loader').style.display='none';
          //document.getElementsByTagName('canvas').style.opacity = '1';
        });
      });
    }

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

          meteorite = cometsConfig.map((comet,i)=>{
            comet = object.clone();
            comet.position.set(cometsConfig[i].position.x,cometsConfig[i].position.y,cometsConfig[i].position.z);
            comet.scale = cometsConfig[i].scale;
            scene.add(comet);
            return comet;
          });
          cometLoadingIndicator = true;
        });
      });
    }

    // ---- добовление звезд -----
    // function addStar(star, amount, scalar, opacity, size,url=false) {
    function addStar(stars) {
      stars.forEach(star=>{
        var starGeometry = new THREE.Geometry();
        var starMaterial = new THREE.PointsMaterial({
          color: 0xffffff,
          opacity: star.opacity,
          size: star.size,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: false,
          depthWrite: false,
          transparent: true,
        });
        if(star.url){starMaterial.map = new THREE.TextureLoader().load(star.url)};
        for (let i = 0; i < star.amount; i++) {
          var vertex = new THREE.Vector3();
          vertex.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
          vertex.multiplyScalar(star.distance);
          starGeometry.vertices.push(vertex);
        }

        star = new THREE.Points(starGeometry, starMaterial);
        star.scale.set(30, 30, 30);
        scene.add(star);
      });
    }

    // ---- добовление планет ----
    function addNewPlanet(radius, segment, url, posX, posY, posZ) {
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

    planet1 = addNewPlanet(900, 60, 'app/img/planet_Bog.jpg', 0, 0, -4000);
    planet2 = addNewPlanet(900, 60, 'app/img/Venus2.jpg', -4000, 0, 4000);
    planet3 = addNewPlanet(720, 50, 'app/img/planet_Quom.jpg', 4000, 0, 4000);

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
    }

    // ---- анимацию полета метеоритов ----
    function returnCometsPosition(comet) {
        if (comet.position.z <= -12000 || comet.position.z >= 18000) {
          return -12000;
        }else {
          return comet.position.z;
        }
    }

    function addGalactic(galactic) {
        galaxyAdd = galactic.map((galaxy)=>{
        var galacticTopMaterial = new THREE.MeshBasicMaterial({
          map: THREE.ImageUtils.loadTexture(galaxy.url),
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          transparent: true,
        });
        var geometry = new THREE.PlaneGeometry( galaxy.height, galaxy.width, 1 );
        var material = galacticTopMaterial;

        let galaxyAdd = new THREE.Mesh( geometry, material );
        galaxyAdd.position.set(galaxy.position.x,galaxy.position.y,galaxy.position.z);
        scene.add(galaxyAdd);
        return galaxyAdd;
      });
  }
    addGalactic(galactic);

    function hideTooltips() {
      document.getElementById("planet1").style.visibility = "hidden";
      document.getElementById("planet2").style.visibility = "hidden";
      document.getElementById("planet3").style.visibility = "hidden";
    }

    function renderClick(event) {
      hideTooltips();
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(scene.children);
      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.uuid === planet1.uuid && !aboutMeInfoActive && !portfolioInfoActive && !contactInfoActive) {
          clickMenuItem("aboutMe");
          aboutMeInfoActive = true;
          infoActive = true;
        }
        else if (intersects[i].object.uuid === planet2.uuid && !aboutMeInfoActive && !portfolioInfoActive && !contactInfoActive) {
          clickMenuItem("portfolio");
          portfolioInfoActive = true;
          infoActive = true;
        }
        else if (intersects[i].object.uuid === planet3.uuid && !aboutMeInfoActive && !portfolioInfoActive && !contactInfoActive) {
          clickMenuItem("contact");
          contactInfoActive = true;
          infoActive = true;
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
      //y = parseInt(event.offsetY) + 1700;
      //x = parseInt(event.offsetX);
      renderMouseMove();
    }

    function renderMouseMove() {
      raycaster.setFromCamera(mouse, camera);
      let intersects = raycaster.intersectObjects(scene.children);

      if (!indicatorHint) {
          if (intersects.length > 0 && intersects[0].object.uuid === planet1.uuid) {
            addMouseEffect("planet1", intersects[0].object);
          }
          else if (intersects.length > 0 && intersects[0].object.uuid === planet2.uuid) {
            addMouseEffect("planet2", intersects[0].object);
          }
          else if (intersects.length > 0 && intersects[0].object.uuid === planet3.uuid) {
            addMouseEffect("planet3", intersects[0].object);
          }
      }

      if(intersects.length === 0 || intersects[0].object.uuid !== planet3.uuid && intersects[0].object.uuid !== planet2.uuid && intersects[0].object.uuid !== planet1.uuid) {
        hideTooltips();
        indicatorHint = false;
      }
      renderer.render(scene, camera);
    }

    function addMouseEffect(planet, object) {
      indicatorHint = true;
      var proj = toScreenPosition(object, camera);
      document.getElementById(planet).style.visibility = "visible";
      var distance = camera.position.z - object.position.z;
      var width = object.geometry.parameters.radius/(distance/(object.geometry.parameters.radius* Math.PI));

      document.getElementById(planet).style.top = proj.y - (width / 1.5) + 'px';
      document.getElementById(planet).style.left = proj.x - 75 + 'px';
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
      let planet = {
        x: x,
        y: shar.position.y,
        z: shar.position.z
      };
      cameraPurpose(currentDirectionCamera, planet);
      if (camera.position.x > shar.position.x + 110) {
        camera.position.x -= 60;
      } else if (camera.position.x < shar.position.x) {
        camera.position.x += 50;
      }
      if (camera.position.z > shar.position.z + 5000) {
        camera.position.z -= 200;
      } else if (camera.position.z < shar.position.z - 5000) {
        camera.position.z += 200;
      }
      if (camera.position.y > shar.position.y + 110) {
        camera.position.y -= 60;
      } else if (camera.position.y < shar.position.y) {
        camera.position.y += 50;
      }
    }

    function resetCameraPosition(cam){
      if(camera.position.z >= 0) {
        cameraPurpose(currentDirectionCamera, defaultDirectionCamera);
      }

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

    }

    function cameraPurpose(from, to){
      if(from.x > to.x +240 ){
        from.x-=60;
      }else if(from.x < to.x ){
        from.x+=50;
      }
      if(from.y > to.y + 240 ){
        from.y-=60;
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
        aboutMeInfoActive = true;
        //infoActive = true;
      } else if (event.target.id === "menu__portfolio") {
        clickMenuItem("portfolio");
        portfolioInfoActive = true;
        //infoActive = true;
      } else if (event.target.id === "menu__contact") {
        clickMenuItem("contact");
        contactInfoActive = true;
        //infoActive = true;
      }
    }

    function clickMenuItem(id) {
      removeClassActive();
      resetVariableInfo();
      controls.dispose();
      openInfo(id);
      infoActive = true;
    }

    function resetVariableInfo() {
      infoActive = false;
      aboutMeInfoActive = false;
      portfolioInfoActive = false;
      contactInfoActive = false;
    }

    function addEventClosed() {
      var close = document.querySelectorAll('.closed');
      for (var i = 0; i < close.length; i++) {
        close[i].addEventListener("click", closedInfo);
      }
    }

    function openMenu() {
      var attr = document.querySelector('#menu > input').checked;
      var menuItem = document.getElementsByClassName("menu__item");
      if(attr) {
        for (var i = 0; i < menuItem.length; i++) {
          var animate = "menuAnimate 1s forwards " + (i / 2) + "s";
          menuItem[i].style.animation = animate;
        }
        menu = true;
      } else{
        for (var i = 0; i < menuItem.length; i++) {
          menuItem[i].style.animation = "menuDefault 1s forwards";
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
      removeClassActive();
      setTimeout(function () {
        addControls();
        resetVariableInfo();
        cameraReset = true;
      }, 1000);
    }
    function removeClassActive() {
      var infoActive = document.querySelectorAll('.infoActive');
      if (infoActive.length > 0) {
        document.querySelector('.infoActive').classList.add('infoClose');
        document.querySelector('.infoActive').classList.remove('infoActive');
        setTimeout(function () {
          document.querySelector('.infoClose').classList.remove('infoClose');
        }, 2000);
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      if (!infoActive && !indicatorHint) {
        rotateAroundWorldAxis(planet3, new THREE.Vector3(0, 1, 0), 0.001);
        rotateAroundWorldAxis(planet2, new THREE.Vector3(0, 1, 0), 0.001);
        rotateAroundWorldAxis(planet1, new THREE.Vector3(0, 1, 0), 0.001);
        controls.update();
      }
      else if (infoActive) {
        controls.enableRotate = false;
      }

      if (aboutMeInfoActive) {
        movementToThePlanet(planet1);
      } else if (portfolioInfoActive) {
        movementToThePlanet(planet2);
      } else if (contactInfoActive) {
        movementToThePlanet(planet3);
      }

      if(cameraReset){
        resetCameraPosition(defaultPositionCamera);
      }

      if(cometLoadingIndicator) {
        meteorite.forEach((comet,i)=>{
          comet.position.z = returnCometsPosition(comet);
          comet.position.z += cometsConfig[i].animate.position.z;
          comet.rotation.x += cometsConfig[i].animate.rotation.x;
          comet.rotation.y += cometsConfig[i].animate.rotation.y;
        });
      }

      planet1.rotation.y -= 0.001;
      planet2.rotation.y += 0.001;
      planet3.rotation.y += 0.001;
      galaxyAdd[0].rotation.z += 0.0005;

      if(spaceshipIndicator) {
        spaceship.position.x = (Math.sin(t * 0.15) * 100) + (planet2.position.x);
        spaceship.position.z = (Math.cos(t * 0.15) * 100) + (planet2.position.z);
        spaceship.rotation.x -= 0.005;
        spaceship.rotation.y -= 0.005;
      }

      t += Math.PI / 180 * 2;

      renderer.render(scene, camera);
    }

    window.addEventListener('click', renderClick, false);
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onDocumentMouseMove, false);

    document.getElementById('burger').addEventListener("click", openMenu);
    document.getElementById('menu__list').addEventListener("click", getIdClick);

    addStar(starsType);
    addEventClosed();
    loaderMeteorite();
    loaderSpaceship2();

    animate();
  });


