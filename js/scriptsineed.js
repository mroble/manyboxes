var scene, camera, renderer;

var cube;

var cubes = [];

function init() {
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000);

	camera.position.set(0, 0, 50);

	scene.add(camera);


	var cubeShape = new THREE.BoxGeometry(3, 3, 3);


	var cubeMaterial = new THREE.MeshBasicMaterial();
	//var cubeMaterial = new THREE.MeshBasicMaterial({color: 0x66FFFF});

	//var cubeMaterial = new THREE.MeshBasicMaterial ( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );

	for ( var i = 0; i < cubeShape.faces.length; i += 2 ) {
		var hex = Math.random() * 0xffffff;
		cubeShape.faces[i].color.setHex(hex);
		cubeShape[i + 1].color.setHex(hex);
	}

	var cubeMaterial = new THREE.MeshLambertMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});

	//cube = new THREE.Mesh( cubeShape, cubeMaterial );
	//scene.add( cube );

	for(var x = 0; x < 50; x++) {
		cube = new THREE.Mesh( cubeShape, cubeMaterial );

		cube.position.x = Math.random() * 75 - 50;
		cube.position.y = Math.random() * 75 - 50;
		cube.position.z = 0;
		cube.rotation.x = Math.random() * 2 * Math.PI;
		cube.rotation.y = Math.random() * 2 * Math.PI;
		cube.rotation.z = Math.random() * 2 * Math.PI;
		cube.scale.x = Math.random() + 0.5;
		cube.scale.y = Math.random() + 0.5;
		cube.scale.z = Math.random() + 0.5;
		cube.userData.velocity = new THREE.Vector3();
		cube.userData.velocity.x = Math.random() * 0.4 - 0.2;
		cube.userData.velocity.y = Math.random() * 0.4 - 0.2;
		cube.userData.velocity.z = Math.random() * 0.4 - 0.2;
		scene.add(cube);
		cubes.push(cube);

	}




	directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(0, 3, 3).normalize();
	scene.add(directionalLight);



	window.addEventListener('resize', function() {
		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;
		renderer.setSize(newWidth, newHeight);
		camera.aspect = newWidth / newHeight;
		camera.updateProjectionMatrix();
	})

}




function animate() {
	requestAnimationFrame(animate);

	//cube.rotation.x += 0.02;
	//cube.rotation.y += 0.02;

	for (var i = 0; i < cubes.length; i++){
		var cube = cubes[i];
		cube.position.add(cube.userData.velocity);
		if (cube.position.x < - 100 || cube.position.x > 100) {
			cube.position.x = THREE.Math.clamp(cube.position.x, - 100, 100);
			cube.userData.velocity.x = - cube.userData.velocity.x;
		}
		if (cube.position.y < - 100 || cube.position.y > 100) {
			cube.position.y = THREE.Math.clamp(cube.position.y, - 100, 100);
			cube.userData.velocity.y = - cube.userData.velocity.y;
		}
		if (cube.position.z < - 100 || cube.position.z > 100) {
			cube.position.z = THREE.Math.clamp(cube.position.z, - 100, 100);
			cube.userData.velocity.z = - cube.userData.velocity.z;
		}
		cube.rotation.x += 0.01;

	}

	renderer.render(scene, camera);
}

