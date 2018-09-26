window.addEventListener('load',function () {
  let cometLoadingIndicator = false;
  let scene,camera,controls,renderer,meteorite,animationCameraPosition,animationResetCameraPosition,galaxyAdd,spaceship;
  let t = 0;
  let planets;
  let infoActive = false;
  let indicatorHint = false;
  let spaceshipIndicator = false;
  let menu = false;
  let cameraPosition = false;
  let cameraPurposeActive = false;

  let mouseMove = false;


  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const defaultDirectionCamera = {
    x: 0,
    y: 0,
    z: 0
  };
  const currentDirectionCamera = {
    x: 0,
    y: 0,
    z: 0
  };
  const defaultPositionCamera = {
    x: 0,
    y: 3800,
    z: 17000
  };
  const cometsConfig = [
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
        }}
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
  const galactic = [
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
  const starsType = [
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
  const newCameraPosition = {
    newPosition: function (from, to,gap,gapZ,shiftX,shiftY,shiftZ) {
      let config = {
        gap: {
          x: gap,
          y: gap,
          z: gapZ
        },
        shift: {
          x: shiftX,
          y: shiftY,
          z: shiftZ
        },
        animateCompleted:{
          x:false,
          y:false,
          z:false
        }
      };
      Object.keys(from).forEach(key => {
        if (from[key] > to[key] + config.gap[key]) {
          from[key] -= config.shift[key] * 1.3;
        } else if ( from[key] < to[key] - config.gap.z) {
          from[key] += config.shift[key];
        } else{config.animateCompleted[key] = true}
      });

      if(config.animateCompleted.x && config.animateCompleted.y && config.animateCompleted.z){
        config.animateCompleted.x = false;
        config.animateCompleted.y = false;
        config.animateCompleted.z = false;
        return true;
      }
    }

  };
  const planetsConfig = [
    {
    name:'planet1',
    popupName:'aboutMe',
    radius: 900,
    segment: 60,
    url: 'app/img/planet_Bog.jpg',
    posX: 0,
    posY: 0,
    posZ: -4000
  },{
    name:'planet2',
    popupName:'portfolio',
    radius: 900,
    segment: 60,
    url: 'app/img/Venus2.jpg',
    posX: -4000,
    posY: 0,
    posZ: 4000
  },{
    name:'planet3',
    popupName:'contact',
    radius: 900,
    segment: 50,
    url: 'app/img/planet_Quom.jpg',
    posX: 4000,
    posY: 0,
    posZ: 4000
  }
  ];

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
      const light = new THREE.DirectionalLight(0xffffff, 1.2);
      light.position.x = 22000;
      light.position.y = 12000;
      scene.add(light);

      const amColor = "#ffffff";
      const amLight = new THREE.AmbientLight(amColor, 0.25);
      scene.add(amLight);

// ------ add controller -----
      addControls();

      console.log(scene);
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
      const mtlLoader = new THREE.MTLLoader();
      const interceptUrl = "app/img/intercept2/tie-intercept.mtl";
      mtlLoader.load(interceptUrl, function (materials) {
        materials.preload();
        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('app/img/');
        objLoader.load('intercept2/tie-intercept.obj', function (object) {
          object.position.set(planets[1].position.x, planets[1].position.y, planets[1].position.z);
          object.scale.set(12.5, 12.5, 12.5);
          spaceship = object;
          scene.add(spaceship);
          spaceshipIndicator = true;

          document.getElementById('desktop').style.left='0';
          document.getElementById('loader').style.left='-100vw';
        });
      });
    }

  function loaderMeteorite() {
      const mtlLoader = new THREE.MTLLoader();
      mtlLoader.setBaseUrl('app/img/meteorite/');
      mtlLoader.setPath('app/img/meteorite/');
      const url = "meteority_letyat.mtl";
      mtlLoader.load(url, function (materials) {
        materials.preload();
        const objLoader = new THREE.OBJLoader();
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
  function addStar(stars) {
      stars.forEach(star=>{
        const starGeometry = new THREE.Geometry();
        const starMaterial = new THREE.PointsMaterial({
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
          const vertex = new THREE.Vector3();
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
  function addNewPlanet(planet) {
      let geonetryShar = new THREE.SphereGeometry(planet.radius, planet.segment, planet.segment);
      let materialShar = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(planet.url),
        side: THREE.FrontSide
      });

      let object = new THREE.Mesh(geonetryShar, materialShar);
      object.position.set(planet.posX, planet.posY, planet.posZ);
      object.rotation.x = 90;
      object.name = planet.name;
      object.popupName = planet.popupName;
      scene.add(object);
      return object;
    }

  planets = planetsConfig.map(planet=>{
      return addNewPlanet(planet);
    });

    // ---- вращение планет вокруг центра ----
  function rotateAroundWorldAxis(object, axis, radians) {
      const rotWorldMatrix = new THREE.Matrix4();
      rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

      const currentPos = new THREE.Vector4(object.position.x, object.position.y, object.position.z, 1);
      const newPos = currentPos.applyMatrix4(rotWorldMatrix);

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
      const geometry = new THREE.PlaneGeometry( galaxy.height, galaxy.width, 1 );
      const material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture(galaxy.url),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
          });
      const galaxyAdd = new THREE.Mesh( geometry, material );
      galaxyAdd.position.set(galaxy.position.x,galaxy.position.y,galaxy.position.z);
      scene.add(galaxyAdd);
      return galaxyAdd;
      });
  }

  function hideTooltips() {
      planets.forEach(planet=>{
        document.getElementById(planet.popupName).style.visibility = "hidden";
      });
    }

  function renderClick(event) {
      hideTooltips();
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      let intersects = raycaster.intersectObjects(scene.children);
      planets.forEach(planet=>{
        if (
          intersects.length > 0 &&
          intersects[0].object.name === planet.name &&
          !infoActive
        ) {
          clickMenuItem(planet.name);
          movementToThePlanet(planet);
        }
      });
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
      if(!mouseMove){
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
        renderMouseMove();
      }
    }

  function renderMouseMove() {
      raycaster.setFromCamera(mouse, camera);
      let intersects = raycaster.intersectObjects(scene.children);

      if (!indicatorHint && !infoActive) {
        planets.forEach(planet=>{
          if (intersects.length > 0 && intersects[0].object.name === planet.name && !infoActive) {
            indicatorHint = true;
            document.getElementById(planet.popupName).style.visibility = "visible";
          }
        });
      }else if(
        (intersects.length === 0 ) ||
        (intersects[0].object.name !== planets[0].name &&
         intersects[0].object.name !== planets[1].name &&
         intersects[0].object.name !== planets[2].name)
      ){
        hideTooltips();
        indicatorHint = false;
      }

      renderer.render(scene, camera);
    }

  function movementToThePlanet(planetObj) {
    let shar = planetObj;
    let pl = shar.geometry.parameters.radius * 1.5;
    let x = shar.position.z < camera.position.z ? shar.position.x + pl : shar.position.x - pl;
    let planet = {
      x: x,
      y: shar.position.y,
      z: shar.position.z
    };
    function animateCamera() {
      if (!cameraPosition || !cameraPurposeActive ) {
        cameraPurpose(currentDirectionCamera, planet);
        cameraPosition = newCameraPosition.newPosition(camera.position, shar.position, 1100, 5000, 80, 110, 200);
        animationCameraPosition = requestAnimationFrame(animateCamera);
      } else {
        cancelAnimationFrame(animationCameraPosition);
      }
    }
    animateCamera();

  }

  function resetCameraPosition(){
    if(!cameraPosition || !cameraPurposeActive) {
      cameraPurpose(currentDirectionCamera, defaultDirectionCamera);
      cameraPosition = newCameraPosition.newPosition(camera.position, defaultPositionCamera,100,200,50,60,120);
      animationResetCameraPosition = requestAnimationFrame(resetCameraPosition);
    }else {
      mouseMove = false;
      cancelAnimationFrame(animationResetCameraPosition);
    }
  }

  function cameraPurpose(from, to){
    cameraPurposeActive = newCameraPosition.newPosition(from, to,240,240,50,60,120);
    camera.lookAt(from.x,from.y,from.z);
  }

  function getIdClick(event) {
    let eventPlanetName = event.target.getAttribute('data-planet');
    planets.forEach(planet=>{
      let activeItem = document.getElementById(planet.name).classList.contains('infoActive');
      if (eventPlanetName === planet.name && !activeItem) {
        clickMenuItem(planet.name);
        movementToThePlanet(planet);
      }
    });
    }

  function clickMenuItem(id) {
    mouseMove = true;
    removeClassActive();
    resetVariableInfo();
    controls.dispose();
    openInfo(id);
    infoActive = true;
  }

  function resetVariableInfo() {
      infoActive = false;
      cameraPosition = false;
      cameraPurposeActive = false;
    }

  function addEventClosed() {
      let close = document.querySelectorAll('.closed');
      for (let i = 0; i < close.length; i++) {
        close[i].addEventListener("click", closedInfo);
      }
    }

  function openMenu() {
      let attr = document.querySelector('#menu > input').checked;
      let menuItem = document.querySelectorAll(".menu__item");
      menuItem.forEach((item,index)=>{
        if(attr){
          item.style.animation = "menuAnimate 1s forwards " + (index / 2) + "s";
          menu = true;
        }else{
          item.style.animation = "menuDefault 1s forwards";
          menu = false;}
      });
    }

  function openInfo(id) {
      if (document.getElementById(id)) {
        document.getElementById(id).classList.add('infoActive');
      }
    }

  function closedInfo() {
      removeClassActive();
      setTimeout(function () {
        resetVariableInfo();
        resetCameraPosition();
        addControls();
      }, 1000);
    }
  function removeClassActive() {
      let infoActive = document.querySelectorAll('.infoActive');
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
        rotateAroundWorldAxis(planets[0], new THREE.Vector3(0, 1, 0), 0.001);
        rotateAroundWorldAxis(planets[1], new THREE.Vector3(0, 1, 0), 0.001);
        rotateAroundWorldAxis(planets[2], new THREE.Vector3(0, 1, 0), 0.001);
        controls.update();
      } else if (infoActive) {
        controls.enableRotate = false;
      }

      if(cometLoadingIndicator) {
        meteorite.forEach((comet,i)=>{
          comet.position.z = returnCometsPosition(comet);
          comet.position.z += cometsConfig[i].animate.position.z;
          comet.rotation.x += cometsConfig[i].animate.rotation.x;
          comet.rotation.y += cometsConfig[i].animate.rotation.y;
        });
      }

      planets[0].rotation.y -= 0.001;
      planets[1].rotation.y += 0.001;
      planets[2].rotation.y += 0.001;
      galaxyAdd[0].rotation.z += 0.0005;

      if(spaceshipIndicator) {
        spaceship.position.x = (Math.sin(t * 0.15) * 100) + (planets[1].position.x);
        spaceship.position.z = (Math.cos(t * 0.15) * 100) + (planets[1].position.z);
        spaceship.rotation.x -= 0.005;
        spaceship.rotation.y -= 0.005;
      }

      t += Math.PI / 180 * 2;

      renderer.render(scene, camera);
    }

    window.addEventListener('resize', onWindowResize, false);

    document.querySelector('canvas').addEventListener('mousemove', onDocumentMouseMove);
    document.querySelector('canvas').addEventListener('click', renderClick);

    document.getElementById('burger').addEventListener("click", openMenu);
    document.getElementById('menu__list').addEventListener("click", getIdClick);
    addGalactic(galactic);
    addStar(starsType);
    addEventClosed();
    loaderMeteorite();
    loaderSpaceship2();

    animate();
  });


