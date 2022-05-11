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
        // prepare stats
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.bottom = '0px';
        this.stats.domElement.style.zIndex = 10;
        this.container.appendChild( this.stats.domElement );

    },
    draw3dText: function(x, y, z, text) {

        // prepare text geometry
        var textGeometry = new THREE.TextGeometry(text, {
            size: 200, // Font size
            height: 30, // Font height (depth)
            font: 'droid serif', // Font family
            weight: 'bold', // Font weight
            style: 'normal', // Font style
            curveSegments: 1, // Amount of curve segments
            bevelThickness: 5, // Bevel thickness
            bevelSize: 5, // Bevel size
            bevelEnabled: true, // Enable/Disable the bevel
            material: 0, // Main material
            extrudeMaterial: 1 // Side (extrude) material
        });

        //prepare texture
        var texture = THREE.ImageUtils.loadTexture('texture.png');
        // prepare two materials
        var materialFront = new THREE.MeshPhongMaterial({ map: texture, color: 0xffff00, emissive: 0x888888 });
        var materialSide = new THREE.MeshPhongMaterial({ map: texture, color: 0xff00ff, emissive: 0x444444 });

        // create mesh object
        var textMaterial = new THREE.MeshFaceMaterial([ materialFront, materialSide ]);
        var textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.castShadow = true;

        // place the mesh in the certain position, rotate it and add to the scene
        textMesh.position.set(x, y, z);
        textMesh.rotation.x = -1.25;
        textMesh.name = 'textMeshSeconds';
        this.scene.add(textMesh);
    },
    draw3dTextMinutes: function(x, y, z, text) {

        // prepare text geometry
        var textGeometry = new THREE.TextGeometry(text, {
            size: 200, // Font size
            height: 30, // Font height (depth)
            font: 'droid serif', // Font family
            weight: 'bold', // Font weight
            style: 'normal', // Font style
            curveSegments: 1, // Amount of curve segments
            bevelThickness: 5, // Bevel thickness
            bevelSize: 5, // Bevel size
            bevelEnabled: true, // Enable/Disable the bevel
            material: 0, // Main material
            extrudeMaterial: 1 // Side (extrude) material
        });

        //prepare texture
        var texture = THREE.ImageUtils.loadTexture('texture.png');
        // prepare two materials
        var materialFront = new THREE.MeshPhongMaterial({ map: texture, color: 0xffff00, emissive: 0x888888 });
        var materialSide = new THREE.MeshPhongMaterial({ map: texture, color: 0xff00ff, emissive: 0x444444 });

        // create mesh object
        var textMaterial = new THREE.MeshFaceMaterial([ materialFront, materialSide ]);
        var textMeshMinutes = new THREE.Mesh(textGeometry, textMaterial);
        textMeshMinutes.castShadow = true;

        // place the mesh in the certain position, rotate it and add to the scene
        textMeshMinutes.position.set(x, y, z);
        textMeshMinutes.rotation.x = -1.25;
        textMeshMinutes.name = 'textMeshMinutes';
        this.scene.add(textMeshMinutes);
    },
    draw3dTextHours: function(x, y, z, text) {

        // prepare text geometry
        var textGeometry = new THREE.TextGeometry(text, {
            size: 200, // Font size
            height: 30, // Font height (depth)
            font: 'droid serif', // Font family
            weight: 'bold', // Font weight
            style: 'normal', // Font style
            curveSegments: 1, // Amount of curve segments
            bevelThickness: 5, // Bevel thickness
            bevelSize: 5, // Bevel size
            bevelEnabled: true, // Enable/Disable the bevel
            material: 0, // Main material
            extrudeMaterial: 1 // Side (extrude) material
        });

        //prepare texture
        var texture = THREE.ImageUtils.loadTexture('texture.png');
        // prepare two materials
        var materialFront = new THREE.MeshPhongMaterial({ map: texture, color: 0xffff00, emissive: 0x888888 });
        var materialSide = new THREE.MeshPhongMaterial({ map: texture, color: 0xff00ff, emissive: 0x444444 });

        // create mesh object
        var textMaterial = new THREE.MeshFaceMaterial([ materialFront, materialSide ]);
        var textMeshHours = new THREE.Mesh(textGeometry, textMaterial);
        textMeshHours.castShadow = true;

        // place the mesh in the certain position, rotate it and add to the scene
        textMeshHours.position.set(x, y, z);
        textMeshHours.rotation.x = -1.25;
        textMeshHours.name = 'textMeshHours';
        this.scene.add(textMeshHours);
    },
    delete3DOBJ: function(objName){
        var selectedObject = this.scene.getObjectByName(objName);
        this.scene.remove( selectedObject );
        //console.log(selectedObject);
    }
};

var tmp = 0;
var tmp2 = 15;
var id;

// Animate the scene
function animate() {
    id = requestAnimationFrame(animate);
    render();
    setInterval(function(){ 
        update();
    }, 0);
}

// update watch arrows positions
function update(){
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
        tmp2 += 1;
    }
    //remove 3D text
    watch.delete3DOBJ('textMeshSeconds');
    watch.delete3DOBJ('textMeshMinutes');
    watch.delete3DOBJ('textMeshHours');
    // // add 3D text
    watch.draw3dText( 160, 100, 0, watch.timeSec);
    watch.draw3dTextMinutes( -260, 100, 0, watch.timeMin);
    watch.draw3dTextHours( -530, 100, 0, watch.timeHr);
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