var watch = {
    scene: null,
    camera: null,
    renderer: null,
    container: null,
    controls: null,
    clock: null,
    stats: null,
    arrowHr: null,
    arrowMin: null,
    arrowSec: null,
    timeHr: null,
    timeMin: null,
    timeSec: null,

    init: function() { // initialization

        // create main scene
        this.scene = new THREE.Scene();

        var SCREEN_WIDTH = window.innerWidth,
            SCREEN_HEIGHT = window.innerHeight;

        // prepare camera
        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 5000;
        this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        this.scene.add(this.camera);
        this.camera.position.set(0, 1500, 500);
        this.camera.lookAt(new THREE.Vector3(0,0,0));

        // prepare renderer
        this.renderer = new THREE.WebGLRenderer({antialias:true, alpha: false});
        this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.renderer.setClearColor(0xffffff);

        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapSoft = true;

        // prepare container
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        this.container.appendChild(this.renderer.domElement);

        // events
        THREEx.WindowResize(this.renderer, this.camera);

        // prepare controls (OrbitControls)
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target = new THREE.Vector3(0, 0, 0);

        // prepare clock
        this.clock = new THREE.Clock();

        // prepare stats
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.bottom = '0px';
        this.stats.domElement.style.zIndex = 10;
        this.container.appendChild( this.stats.domElement );

        // add dial shape
        var dialMesh = new THREE.Mesh(
            new THREE.CircleGeometry(500, 50),
            new THREE.MeshBasicMaterial({ color:0xffffff, side: THREE.DoubleSide })
        );
        dialMesh.rotation.x = - Math.PI / 2;
        dialMesh.position.y = 0;
        this.scene.add(dialMesh);

        // add watch rim shape
        var rimMesh = new THREE.Mesh(
          new THREE.TorusGeometry(500, 20, 10, 100),
          new THREE.MeshBasicMaterial({ color:0x00000 })
        );
        rimMesh.rotation.x = - Math.PI / 2;
        this.scene.add(rimMesh);

        // add watch arrow
        var iHours = 12;
        var iSec = 60;
        var mergedArrows = new THREE.Geometry();
        var extrudeOpts = {amount: 12, steps: 1, bevelSegments: 1, bevelSize: 1, bevelThickness:1};
        var handFrom = 400, handTo = 450;

        for (i = 1; i <= iSec; i++) {

          // prepare each arrow in a circle
          var arrowShape = new THREE.Shape();

          var from = (i % 5 == 0) ? 350 : handFrom;

          var a = i * Math.PI / iSec * 2;
          arrowShape.moveTo(Math.cos(a) * from, Math.sin(a) * from);
          arrowShape.lineTo(Math.cos(a) * from + 5, Math.sin(a) * from + 5);
          arrowShape.lineTo(Math.cos(a) * handTo + 5, Math.sin(a) * handTo + 5);
          arrowShape.lineTo(Math.cos(a) * handTo, Math.sin(a) * handTo);

          var arrowGeom = new THREE.ExtrudeGeometry(arrowShape, extrudeOpts);
          THREE.GeometryUtils.merge(mergedArrows, arrowGeom);
        }

        var arrowsMesh = new THREE.Mesh(mergedArrows, new THREE.MeshBasicMaterial({ color:0x666666}));
        arrowsMesh.rotation.x = - Math.PI / 2;
        arrowsMesh.position.y = 10;
        this.scene.add(arrowsMesh);

        // add seconds arrow
        handTo = 325;
        var arrowSecShape = new THREE.Shape();
        arrowSecShape.moveTo(0, 350);
        arrowSecShape.lineTo(10, -5);
        arrowSecShape.lineTo(-10, -5);

        var arrowSecGeom = new THREE.ExtrudeGeometry(arrowSecShape, extrudeOpts);
        this.arrowSec = new THREE.Mesh(arrowSecGeom, new THREE.MeshBasicMaterial({ color:0xff0000 }));
        this.arrowSec.rotation.x = - Math.PI / 2;
        this.arrowSec.position.y = 20;
        this.scene.add(this.arrowSec);
    }
};

var tmp = 0;
var tmp2 = 15;
var id;

// Animate the scene
function animate() {
    id = requestAnimationFrame(animate);
    render();
}

// update watch arrows positions
function update(){
    watch.controls.update(watch.clock.getDelta());
    watch.stats.update();

    // // get current time
    var date = new Date;
    watch.timeSec = date.getSeconds();
    watch.timeMin = date.getMinutes();
    watch.timeHr = date.getHours();
    console.log(watch.timeSec); 

    //console.log(tmp);
    if(tmp != date.getSeconds()){
        tmp = date.getSeconds();
        if(tmp > 60){
            tmp = 0;
        }
        var rotSec = tmp2 * 2 * Math.PI / 60 - Math.PI/2;
        watch.arrowSec.rotation.z = -rotSec;
        tmp2 += 1;
    }
}

function run(){
    requestAnimationFrame(animate);
    render();
    setInterval(function(){ 
        update();
    }, 0);
    tmp = 0;
    tmp2 = 15;
}

function stop(){
    console.log("stop pressed");
    cancelAnimationFrame(id);
}

// Render the scene
function render() {
    if (watch.renderer) {
        watch.renderer.render(watch.scene, watch.camera);
    }
}

// Initialize lesson on page load
function initializeLesson() {
    watch.init();
    animate();
}

if (window.addEventListener)
    window.addEventListener('load', initializeLesson, false);
else if (window.attachEvent)
    window.attachEvent('onload', initializeLesson);
else window.onload = initializeLesson;