/* GLOBAL CONSTANTS AND VARIABLES */

/* assignment specific globals */
var defaultEye = vec3.fromValues(0.5,0.8,-0.2); // default eye position in world space
var defaultCenter = vec3.fromValues(0.5,0.2,0.5); // default view direction in world space
var defaultUp = vec3.fromValues(0,1,0); // default view up vector
var lightAmbient = vec3.fromValues(1,1,1); // default light ambient emission
var lightDiffuse = vec3.fromValues(1,1,1); // default light diffuse emission
var lightSpecular = vec3.fromValues(1,1,1); // default light specular emission
var lightPosition = vec3.fromValues(-0.5,1.5,-0.5); // default light position

/* webgl and geometry data */
var gl = null; // the all powerful gl object. It's all here folks!
var gameBoard = [
    // Start Grass Area
    {
        "safe" : 1,
        "goal" : 0,
        "material" : {
            "ambient" : [0.1, 0.1, 0.1],
            "diffuse" : [0.1, 0.9, 0.1],
            "specular" : [0.8, 0.8, 0.8],
            "n" : 12
        },
        "vertices" : [
            // Top Surface
            [1.3, 0, 0.2],
            [-0.3, 0, 0.2],
            [1.3, 0, 0.3],
            [-0.3, 0, 0.3],
            // Bottom Surface
            [1.3, -0.1, 0.2],
            [-0.3, -0.1, 0.2],
            [1.3, -0.1, 0.3],
            [-0.3, -0.1, 0.3],
            // Front Surface
            [1.3, 0, 0.2],
            [-0.3, 0, 0.2],
            [1.3, -0.1, 0.2],
            [-0.3, -0.1, 0.2]
        ],
        "normals" : [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            // Bottom Surface
            [0, -1, 0],
            [0, -1, 0],
            [0, -1, 0],
            [0, -1, 0],
            // Front Surface
            [0, 0, -1],
            [0, 0, -1],
            [0, 0, -1],
            [0, 0, -1],
        ],
        "triangles" : [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1],
            // Bottom Surface
            [4, 5, 6],
            [7, 6, 5],
            // Front Surface
            [8, 9, 10],
            [11, 10, 9]
        ]
    },
    // Road Area
    {
        "safe" : 1,
        "goal" : 0,
        "material" : {
            "ambient" : [0.1, 0.1, 0.1],
            "diffuse" : [0.2, 0.2, 0.2],
            "specular" : [0.8, 0.8, 0.8],
            "n" : 12
        },
        "vertices" : [
            // Top Surface
            [1.3, 0, 0.3],
            [-0.3, 0, 0.3],
            [1.3, 0, 0.7],
            [-0.3, 0, 0.7]
        ],
        "normals" : [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles" : [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    // Middle Grass Area
    {
        "safe" : 1,
        "goal" : 0,
        "material" : {
            "ambient" : [0.1, 0.1, 0.1],
            "diffuse" : [0.1, 0.9, 0.1],
            "specular" : [0.8, 0.8, 0.8],
            "n" : 12
        },
        "vertices" : [
            // Top Surface
            [1.3, 0, 0.7],
            [-0.3, 0, 0.7],
            [1.3, 0, 0.8],
            [-0.3, 0, 0.8]
        ],
        "normals" : [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles" : [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    // River Area
    {
        "safe" : 0,
        "goal" : 0,
        "material" : {
            "ambient" : [0.1, 0.1, 0.1],
            "diffuse" : [0.1, 0.1, 0.9],
            "specular" : [0.8, 0.8, 0.8],
            "n" : 12
        },
        "vertices" : [
            // Top Surface
            [1.3, 0, 0.8],
            [-0.3, 0, 0.8],
            [1.3, 0, 1.3],
            [-0.3, 0, 1.3]
        ],
        "normals" : [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles" : [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    // Goal Areas
    {
        "safe" : 1,
        "goal" : 1,
        "material" : {
            "ambient" : [0.1, 0.1, 0.1],
            "diffuse" : [0.1, 0.9, 0.1],
            "specular" : [0.8, 0.8, 0.8],
            "n" : 12
        },
        "vertices" : [
            // Top Surface
            [1.15, 0, 1.3],
            [1.05, 0, 1.3],
            [1.15, 0, 1.4],
            [1.05, 0, 1.4]
        ],
        "normals" : [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles" : [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    {
        "safe" : 1,
        "goal" : 1,
        "material" : {
            "ambient" : [0.1, 0.1, 0.1],
            "diffuse" : [0.1, 0.9, 0.1],
            "specular" : [0.8, 0.8, 0.8],
            "n" : 12
        },
        "vertices" : [
            // Top Surface
            [0.85, 0, 1.3],
            [0.75, 0, 1.3],
            [0.85, 0, 1.4],
            [0.75, 0, 1.4]
        ],
        "normals" : [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles" : [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    {
        "safe" : 1,
        "goal" : 1,
        "material" : {
            "ambient" : [0.1, 0.1, 0.1],
            "diffuse" : [0.1, 0.9, 0.1],
            "specular" : [0.8, 0.8, 0.8],
            "n" : 12
        },
        "vertices" : [
            // Top Surface
            [0.55, 0, 1.3],
            [0.45, 0, 1.3],
            [0.55, 0, 1.4],
            [0.45, 0, 1.4]
        ],
        "normals" : [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles" : [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    {
        "safe" : 1,
        "goal" : 1,
        "material" : {
            "ambient" : [0.1, 0.1, 0.1],
            "diffuse" : [0.1, 0.9, 0.1],
            "specular" : [0.8, 0.8, 0.8],
            "n" : 12
        },
        "vertices" : [
            // Top Surface
            [0.25, 0, 1.3],
            [0.15, 0, 1.3],
            [0.25, 0, 1.4],
            [0.15, 0, 1.4]
        ],
        "normals" : [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles" : [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    {
        "safe" : 1,
        "goal" : 1,
        "material" : {
            "ambient" : [0.1, 0.1, 0.1],
            "diffuse" : [0.1, 0.9, 0.1],
            "specular" : [0.8, 0.8, 0.8],
            "n" : 12
        },
        "vertices" : [
            // Top Surface
            [-0.05, 0, 1.3],
            [-0.15, 0, 1.3],
            [-0.05, 0, 1.4],
            [-0.15, 0, 1.4]
        ],
        "normals" : [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles" : [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    // Non-Goal Far Areas
    {
        "safe" : 0,
        "goal" : 0,
        "material": {
            "ambient": [0.1, 0.1, 0.1],
            "diffuse": [0.1, 0.5, 0.1],
            "specular": [0.4, 0.4, 0.4],
            "n": 12
        },
        "vertices": [
            // Top Surface
            [1.3, 0, 1.3],
            [1.15, 0, 1.3],
            [1.3, 0, 1.4],
            [1.15, 0, 1.4]
        ],
        "normals": [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles": [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    {
        "safe" : 0,
        "goal" : 0,
        "material": {
            "ambient": [0.1, 0.1, 0.1],
            "diffuse": [0.1, 0.5, 0.1],
            "specular": [0.4, 0.4, 0.4],
            "n": 12
        },
        "vertices": [
            // Top Surface
            [1.05, 0, 1.3],
            [0.85, 0, 1.3],
            [1.05, 0, 1.4],
            [0.85, 0, 1.4]
        ],
        "normals": [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles": [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    {
        "safe" : 0,
        "goal" : 0,
        "material": {
            "ambient": [0.1, 0.1, 0.1],
            "diffuse": [0.1, 0.5, 0.1],
            "specular": [0.4, 0.4, 0.4],
            "n": 12
        },
        "vertices": [
            // Top Surface
            [0.75, 0, 1.3],
            [0.55, 0, 1.3],
            [0.75, 0, 1.4],
            [0.55, 0, 1.4]
        ],
        "normals": [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles": [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    {
        "safe" : 0,
        "goal" : 0,
        "material": {
            "ambient": [0.1, 0.1, 0.1],
            "diffuse": [0.1, 0.5, 0.1],
            "specular": [0.4, 0.4, 0.4],
            "n": 12
        },
        "vertices": [
            // Top Surface
            [0.45, 0, 1.3],
            [0.25, 0, 1.3],
            [0.45, 0, 1.4],
            [0.25, 0, 1.4]
        ],
        "normals": [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles": [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    {
        "safe" : 0,
        "goal" : 0,
        "material": {
            "ambient": [0.1, 0.1, 0.1],
            "diffuse": [0.1, 0.5, 0.1],
            "specular": [0.4, 0.4, 0.4],
            "n": 12
        },
        "vertices": [
            // Top Surface
            [0.15, 0, 1.3],
            [-0.05, 0, 1.3],
            [0.15, 0, 1.4],
            [-0.05, 0, 1.4]
        ],
        "normals": [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles": [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    {
        "safe" : 0,
        "goal" : 0,
        "material": {
            "ambient": [0.1, 0.1, 0.1],
            "diffuse": [0.1, 0.5, 0.1],
            "specular": [0.4, 0.4, 0.4],
            "n": 12
        },
        "vertices": [
            // Top Surface
            [-0.15, 0, 1.3],
            [-0.3, 0, 1.3],
            [-0.15, 0, 1.4],
            [-0.3, 0, 1.4]
        ],
        "normals": [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles": [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    },
    // Back Grass Area
    {
        "safe" : 0,
        "goal" : 0,
        "material": {
            "ambient": [0.1, 0.1, 0.1],
            "diffuse": [0.1, 0.5, 0.1],
            "specular": [0.4, 0.4, 0.4],
            "n": 12
        },
        "vertices": [
            // Top Surface
            [1.3, 0, 1.4],
            [-0.3, 0, 1.4],
            [1.3, 0, 1.5],
            [-0.3, 0, 1.5]
        ],
        "normals": [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "triangles": [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1]
        ]
    }
]; // the triangle data as loaded from default board
var numTriangleSets = 0; // how many triangle sets in input scene
var vertexBuffers = []; // this contains vertex coordinate lists by set, in triples
var normalBuffers = []; // this contains normal component lists by set, in triples
var triSetSizes = []; // this contains the size of each triangle set
var triangleBuffers = []; // lists of indices into vertexBuffers by set, in triples

/* shader parameter locations */
var vPosAttribLoc; // where to put position for vertex shader
var mMatrixULoc; // where to put model matrix for vertex shader
var pvmMatrixULoc; // where to put project model view matrix for vertex shader
var ambientULoc; // where to put ambient reflecivity for fragment shader
var diffuseULoc; // where to put diffuse reflecivity for fragment shader
var specularULoc; // where to put specular reflecivity for fragment shader
var shininessULoc; // where to put specular exponent for fragment shader

/* interaction variables */
var Eye = vec3.clone(defaultEye); // eye position in world space
var Center = vec3.clone(defaultCenter); // view direction in world space
var Up = vec3.clone(defaultUp); // view up vector in world space
var game;
var frog;
var gameLoop = 0;
var firstPerson = false;

function Game(logs, cars, turtles, goals) {
    this.logs = logs;
    this.cars = cars;
    this.turtles = turtles;
    this.goals = goals;
}

function Log(position) {
    this.position = position;
    this.length = 0.2;
    this.width = 0.1;
    this.triangles = {
        "material" : {
            "ambient" : [0.1, 0.1, 0.1],
            "diffuse" : [0.3, 0.2, 0.1],
            "specular" : [0.8, 0.8, 0.8],
            "n" : 12
        },
        "vertices" : [
            // Top Surface
            [1.3, 0.02, 0.2],
            [1.1, 0.02, 0.2],
            [1.3, 0.02, 0.3],
            [1.1, 0.02, 0.3],
            // Bottom Surface
            [1.3, 0, 0.2],
            [1.1, 0, 0.2],
            [1.3, 0, 0.3],
            [1.1, 0, 0.3],
            // Front Surface
            [1.3, 0.02, 0.2],
            [1.1, 0.02, 0.2],
            [1.3, 0, 0.2],
            [1.1, 0, 0.2],
            // Left Surface
            [1.3, 0.02, 0.2],
            [1.3, 0.02, 0.3],
            [1.3, 0, 0.2],
            [1.3, 0, 0.3],
            // Right Surface
            [1.1, 0.02, 0.2],
            [1.1, 0.02, 0.3],
            [1.1, 0, 0.2],
            [1.1, 0, 0.3]
        ],
        "normals" : [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            // Bottom Surface
            [0, -1, 0],
            [0, -1, 0],
            [0, -1, 0],
            [0, -1, 0],
            // Front Surface
            [0, 0, -1],
            [0, 0, -1],
            [0, 0, -1],
            [0, 0, -1],
            // Left Surface
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0],
            // Right Surface
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0]
        ],
        "triangles" : [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1],
            // Bottom Surface
            [4, 5, 6],
            [7, 6, 5],
            // Front Surface
            [8, 9, 10],
            [11, 10, 9],
            // Left Surface
            [12, 13, 14],
            [15, 14, 13],
            // Right Surface
            [16, 17, 18],
            [19, 18, 17]
        ]
    }
    this.vertexBuffer = gl.createBuffer();
    this.normalBuffer = gl.createBuffer();
    this.triangleBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER,this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.triangles.normals.flat()),gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.triangleBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(this.triangles.triangles.flat()),gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.triangles.vertices.flat()),gl.STATIC_DRAW);
}

function Car(position) {
    this.position = position;
    this.length = 0.2;
    this.width = 0.1;
    this.triangles = {
        "material" : {
            "ambient" : [0.1, 0.1, 0.1],
            "diffuse" : [0.9, 0.1, 0.1],
            "specular" : [0.8, 0.8, 0.8],
            "n" : 12
        },
        "vertices" : [
            // Top Surface
            [1.3, 0.1, 0.201],
            [1.1, 0.1, 0.201],
            [1.3, 0.1, 0.3],
            [1.1, 0.1, 0.3],
            // Bottom Surface
            [1.3, 0, 0.201],
            [1.1, 0, 0.201],
            [1.3, 0, 0.3],
            [1.1, 0, 0.3],
            // Front Surface
            [1.3, 0.1, 0.201],
            [1.1, 0.1, 0.201],
            [1.3, 0, 0.201],
            [1.1, 0, 0.201],
            // Left Surface
            [1.3, 0.1, 0.201],
            [1.3, 0.1, 0.3],
            [1.3, 0, 0.201],
            [1.3, 0, 0.3],
            // Right Surface
            [1.1, 0.1, 0.201],
            [1.1, 0.1, 0.3],
            [1.1, 0, 0.201],
            [1.1, 0, 0.3]
        ],
        "normals" : [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            // Bottom Surface
            [0, -1, 0],
            [0, -1, 0],
            [0, -1, 0],
            [0, -1, 0],
            // Front Surface
            [0, 0, -1],
            [0, 0, -1],
            [0, 0, -1],
            [0, 0, -1],
            // Left Surface
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0],
            // Right Surface
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0]
        ],
        "triangles" : [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1],
            // Bottom Surface
            [4, 5, 6],
            [7, 6, 5],
            // Front Surface
            [8, 9, 10],
            [11, 10, 9],
            // Left Surface
            [12, 13, 14],
            [15, 14, 13],
            // Right Surface
            [16, 17, 18],
            [19, 18, 17]
        ]
    }
    this.vertexBuffer = gl.createBuffer();
    this.normalBuffer = gl.createBuffer();
    this.triangleBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER,this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.triangles.normals.flat()),gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.triangleBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(this.triangles.triangles.flat()),gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.triangles.vertices.flat()),gl.STATIC_DRAW);
}

function Turtle(position) {
    this.diver = Math.floor(Math.random() * 1.5);
    this.diveState = 0;
    this.position = position;
    this.length = 0.1;
    this.width = 0.1;
    this.triangles = {
        "material" : {
            "ambient" : [0.1, 0.1, 0.1],
            "diffuse" : [0.95, 0.7, 0.7],
            "specular" : [0.8, 0.8, 0.8],
            "n" : 12
        },
        "vertices" : [
            // Top Surface
            [1.3, 0.02, 0.2],
            [1.2, 0.02, 0.2],
            [1.3, 0.02, 0.3],
            [1.2, 0.02, 0.3],
            // Bottom Surface
            [1.3, 0, 0.2],
            [1.2, 0, 0.2],
            [1.3, 0, 0.3],
            [1.2, 0, 0.3],
            // Front Surface
            [1.3, 0.02, 0.2],
            [1.2, 0.02, 0.2],
            [1.3, 0, 0.2],
            [1.2, 0, 0.2],
            // Left Surface
            [1.3, 0.02, 0.2],
            [1.3, 0.02, 0.3],
            [1.3, 0, 0.2],
            [1.3, 0, 0.3],
            // Right Surface
            [1.2, 0.02, 0.2],
            [1.2, 0.02, 0.3],
            [1.2, 0, 0.2],
            [1.2, 0, 0.3]
        ],
        "normals" : [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            // Bottom Surface
            [0, -1, 0],
            [0, -1, 0],
            [0, -1, 0],
            [0, -1, 0],
            // Front Surface
            [0, 0, -1],
            [0, 0, -1],
            [0, 0, -1],
            [0, 0, -1],
            // Left Surface
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0],
            // Right Surface
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0]
        ],
        "triangles" : [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1],
            // Bottom Surface
            [4, 5, 6],
            [7, 6, 5],
            // Front Surface
            [8, 9, 10],
            [11, 10, 9],
            // Left Surface
            [12, 13, 14],
            [15, 14, 13],
            // Right Surface
            [16, 17, 18],
            [19, 18, 17]
        ]
    }
    this.vertexBuffer = gl.createBuffer();
    this.normalBuffer = gl.createBuffer();
    this.triangleBuffer = gl.createBuffer();


    gl.bindBuffer(gl.ARRAY_BUFFER,this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.triangles.normals.flat()),gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.triangleBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(this.triangles.triangles.flat()),gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.triangles.vertices.flat()),gl.STATIC_DRAW);
}

function Frog(position) {
    this.position = position;
    this.length = 0.1;
    this.width = 0.1;
    this.triangles = {
        "material" : {
            "ambient" : [0.1, 0.1, 0.1],
            "diffuse" : [0.05, 0.2, 0.05],
            "specular" : [0.8, 0.8, 0.8],
            "n" : 12
        },
        "vertices" : [
            // Top Surface
            [1.3, 0.1, 0.2001],
            [1.2, 0.1, 0.2001],
            [1.3, 0.1, 0.3],
            [1.2, 0.1, 0.3],
            // Bottom Surface
            [1.3, 0, 0.2001],
            [1.2, 0, 0.2001],
            [1.3, 0, 0.3],
            [1.2, 0, 0.3],
            // Front Surface
            [1.3, 0.1, 0.2001],
            [1.2, 0.1, 0.2001],
            [1.3, 0, 0.2001],
            [1.2, 0, 0.2001],
            // Left Surface
            [1.3, 0.1, 0.2001],
            [1.3, 0.1, 0.3],
            [1.3, 0, 0.2001],
            [1.3, 0, 0.3],
            // Right Surface
            [1.2, 0.1, 0.2001],
            [1.2, 0.1, 0.3],
            [1.2, 0, 0.2001],
            [1.2, 0, 0.3]
        ],
        "normals" : [
            // Top Surface
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            // Bottom Surface
            [0, -1, 0],
            [0, -1, 0],
            [0, -1, 0],
            [0, -1, 0],
            // Front Surface
            [0, 0, -1],
            [0, 0, -1],
            [0, 0, -1],
            [0, 0, -1],
            // Left Surface
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0],
            // Right Surface
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0]
        ],
        "triangles" : [
            // Top Surface
            [0, 1, 2],
            [3, 2, 1],
            // Bottom Surface
            [4, 5, 6],
            [7, 6, 5],
            // Front Surface
            [8, 9, 10],
            [11, 10, 9],
            // Left Surface
            [12, 13, 14],
            [15, 14, 13],
            // Right Surface
            [16, 17, 18],
            [19, 18, 17]
        ]
    }
    this.vertexBuffer = gl.createBuffer();
    this.normalBuffer = gl.createBuffer();
    this.triangleBuffer = gl.createBuffer();


    gl.bindBuffer(gl.ARRAY_BUFFER,this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.triangles.normals.flat()),gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.triangleBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(this.triangles.triangles.flat()),gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.triangles.vertices.flat()),gl.STATIC_DRAW);
}

// ASSIGNMENT HELPER FUNCTIONS

// does stuff when keys are pressed
function handleKeyDown(event) {
    
    const modelEnum = {TRIANGLES: "triangles", ELLIPSOID: "ellipsoid"}; // enumerated model type
    const dirEnum = {NEGATIVE: -1, POSITIVE: 1}; // enumerated rotation direction

    switch (event.code) {

        case "ArrowRight": // select next triangle set
            move(0.1, 0)
            break;
        case "ArrowLeft": // select previous triangle set
            move(-0.1, 0)
            break;
        case "ArrowUp": // select next ellipsoid
            move(0, 0.1)
            break;
        case "ArrowDown": // select previous ellipsoid
            move(0, -0.1)
            break;
        case "KeyD": // select next triangle set
            move(0.1, 0)
            break;
        case "KeyA": // select previous triangle set
            move(-0.1, 0)
            break;
        case "KeyW": // select next ellipsoid
            move(0, 0.1)
            break;
        case "KeyS": // select previous ellipsoid
            move(0, -0.1)
            break;
        case "Digit1":
            if (event.getModifierState("Shift")) {
                firstPerson = !firstPerson;
            }

            
        
    } // end switch
} // end handleKeyDown

function move(x, y) {
    if (gameLoop < 700) {
        return;
    }

    if ((frog.position[0] > 0.1 && x < 0) || (frog.position[0] < 1.45 && x > 0))
        frog.position[0] += x;

    if (frog.position[1] > 0 || y > 0)
        frog.position[1] += y;
}

// set up the webGL environment
function setupWebGL() {
    
    // Set up keys
    document.onkeydown = handleKeyDown; // call this when key pressed

     
    // Get the canvas and context
    var canvas = document.getElementById("myWebGLCanvas"); // create a js canvas
    gl = canvas.getContext("webgl"); // get a webgl object from it
    
    try {
      if (gl == null) {
        throw "unable to create gl context -- is your browser gl ready?";
      } else {
        gl.clearColor(0.0, 0.0, 0.0, 1.0); // use black when we clear the frame buffer
        gl.clearDepth(1.0); // use max when we clear the depth buffer
        gl.enable(gl.DEPTH_TEST); // use hidden surface removal (with zbuffering)
      }
    } // end try
    
    catch(e) {
      console.log(e);
    } // end catch
 
} // end setupWebGL

// read models in, load them into webgl buffers
function loadModels() {

    try {
        if (gameBoard == String.null)
            throw "Unable to load triangles file!";
        else {
            var whichSetVert; // index of vertex in current triangle set
            var whichSetTri; // index of triangle in current triangle set
            var vtxToAdd; // vtx coords to add to the coord array
            var normToAdd; // vtx normal to add to the coord array
            var triToAdd; // tri indices to add to the index array
            var maxCorner = vec3.fromValues(Number.MIN_VALUE,Number.MIN_VALUE,Number.MIN_VALUE); // bbox corner
            var minCorner = vec3.fromValues(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE); // other corner
        
            // process each triangle set to load webgl vertex and triangle buffers
            numTriangleSets = gameBoard.length; // remember how many tri sets
            for (var whichSet=0; whichSet<numTriangleSets; whichSet++) { // for each tri set
                
                // set up hilighting, modeling translation and rotation
                gameBoard[whichSet].center = vec3.fromValues(0,0,0);  // center point of tri set
                gameBoard[whichSet].on = false; // not highlighted
                gameBoard[whichSet].translation = vec3.fromValues(0,0,0); // no translation
                gameBoard[whichSet].xAxis = vec3.fromValues(1,0,0); // model X axis
                gameBoard[whichSet].yAxis = vec3.fromValues(0,1,0); // model Y axis 

                // set up the vertex and normal arrays, define model center and axes
                gameBoard[whichSet].glVertices = []; // flat coord list for webgl
                gameBoard[whichSet].glNormals = []; // flat normal list for webgl
                var numVerts = gameBoard[whichSet].vertices.length; // num vertices in tri set
                for (whichSetVert=0; whichSetVert<numVerts; whichSetVert++) { // verts in set
                    vtxToAdd = gameBoard[whichSet].vertices[whichSetVert]; // get vertex to add
                    normToAdd = gameBoard[whichSet].normals[whichSetVert]; // get normal to add
                    gameBoard[whichSet].glVertices.push(vtxToAdd[0],vtxToAdd[1],vtxToAdd[2]); // put coords in set coord list
                    gameBoard[whichSet].glNormals.push(normToAdd[0],normToAdd[1],normToAdd[2]); // put normal in set coord list
                    vec3.max(maxCorner,maxCorner,vtxToAdd); // update world bounding box corner maxima
                    vec3.min(minCorner,minCorner,vtxToAdd); // update world bounding box corner minima
                    vec3.add(gameBoard[whichSet].center,gameBoard[whichSet].center,vtxToAdd); // add to ctr sum
                } // end for vertices in set
                vec3.scale(gameBoard[whichSet].center,gameBoard[whichSet].center,1/numVerts); // avg ctr sum

                // send the vertex coords and normals to webGL
                vertexBuffers[whichSet] = gl.createBuffer(); // init empty webgl set vertex coord buffer
                gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(gameBoard[whichSet].glVertices),gl.STATIC_DRAW); // data in
                normalBuffers[whichSet] = gl.createBuffer(); // init empty webgl set normal component buffer
                gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(gameBoard[whichSet].glNormals),gl.STATIC_DRAW); // data in
            
                // set up the triangle index array, adjusting indices across sets
                gameBoard[whichSet].glTriangles = []; // flat index list for webgl
                triSetSizes[whichSet] = gameBoard[whichSet].triangles.length; // number of tris in this set
                for (whichSetTri=0; whichSetTri<triSetSizes[whichSet]; whichSetTri++) {
                    triToAdd = gameBoard[whichSet].triangles[whichSetTri]; // get tri to add
                    gameBoard[whichSet].glTriangles.push(triToAdd[0],triToAdd[1],triToAdd[2]); // put indices in set list
                } // end for triangles in set

                // send the triangle indices to webGL
                triangleBuffers.push(gl.createBuffer()); // init empty triangle index buffer
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(gameBoard[whichSet].glTriangles),gl.STATIC_DRAW); // data in

            } // end for each triangle set
        } // end if triangle file loaded
    } // end try 
    
    catch(e) {
        console.log(e);
    } // end catch
} // end load models

function loadEntities() {
    game = new Game([], [], [], []);
    frog = new Frog([0.75, 0])
}

// setup the webGL shaders
function setupShaders() {
    
    // define vertex shader in essl using es6 template strings
    var vShaderCode = `
        attribute vec3 aVertexPosition; // vertex position
        attribute vec3 aVertexNormal; // vertex normal
        
        uniform mat4 umMatrix; // the model matrix
        uniform mat4 upvmMatrix; // the project view model matrix
        
        varying vec3 vWorldPos; // interpolated world position of vertex
        varying vec3 vVertexNormal; // interpolated normal for frag shader

        void main(void) {
            
            // vertex position
            vec4 vWorldPos4 = umMatrix * vec4(aVertexPosition, 1.0);
            vWorldPos = vec3(vWorldPos4.x,vWorldPos4.y,vWorldPos4.z);
            gl_Position = upvmMatrix * vec4(aVertexPosition, 1.0);

            // vertex normal (assume no non-uniform scale)
            vec4 vWorldNormal4 = umMatrix * vec4(aVertexNormal, 0.0);
            vVertexNormal = normalize(vec3(vWorldNormal4.x,vWorldNormal4.y,vWorldNormal4.z)); 
        }
    `;
    
    // define fragment shader in essl using es6 template strings
    var fShaderCode = `
        precision mediump float; // set float to medium precision

        // eye location
        uniform vec3 uEyePosition; // the eye's position in world
        
        // light properties
        uniform vec3 uLightAmbient; // the light's ambient color
        uniform vec3 uLightDiffuse; // the light's diffuse color
        uniform vec3 uLightSpecular; // the light's specular color
        uniform vec3 uLightPosition; // the light's position
        
        // material properties
        uniform vec3 uAmbient; // the ambient reflectivity
        uniform vec3 uDiffuse; // the diffuse reflectivity
        uniform vec3 uSpecular; // the specular reflectivity
        uniform float uShininess; // the specular exponent
        
        // geometry properties
        varying vec3 vWorldPos; // world xyz of fragment
        varying vec3 vVertexNormal; // normal of fragment
            
        void main(void) {
        
            // ambient term
            vec3 ambient = uAmbient*uLightAmbient; 
            
            // diffuse term
            vec3 normal = normalize(vVertexNormal); 
            vec3 light = normalize(uLightPosition - vWorldPos);
            float lambert = max(0.0,dot(normal,light));
            vec3 diffuse = uDiffuse*uLightDiffuse*lambert; // diffuse term
            
            // specular term
            vec3 eye = normalize(uEyePosition - vWorldPos);
            vec3 halfVec = normalize(light+eye);
            float highlight = pow(max(0.0,dot(normal,halfVec)),uShininess);
            vec3 specular = uSpecular*uLightSpecular*highlight; // specular term
            
            // combine to output color
            vec3 colorOut = ambient + diffuse + specular; // no specular yet
            gl_FragColor = vec4(colorOut, 1.0); 
        }
    `;
    
    try {
        var fShader = gl.createShader(gl.FRAGMENT_SHADER); // create frag shader
        gl.shaderSource(fShader,fShaderCode); // attach code to shader
        gl.compileShader(fShader); // compile the code for gpu execution

        var vShader = gl.createShader(gl.VERTEX_SHADER); // create vertex shader
        gl.shaderSource(vShader,vShaderCode); // attach code to shader
        gl.compileShader(vShader); // compile the code for gpu execution
            
        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) { // bad frag shader compile
            throw "error during fragment shader compile: " + gl.getShaderInfoLog(fShader);  
            gl.deleteShader(fShader);
        } else if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) { // bad vertex shader compile
            throw "error during vertex shader compile: " + gl.getShaderInfoLog(vShader);  
            gl.deleteShader(vShader);
        } else { // no compile errors
            var shaderProgram = gl.createProgram(); // create the single shader program
            gl.attachShader(shaderProgram, fShader); // put frag shader in program
            gl.attachShader(shaderProgram, vShader); // put vertex shader in program
            gl.linkProgram(shaderProgram); // link program into gl context

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) { // bad program link
                throw "error during shader program linking: " + gl.getProgramInfoLog(shaderProgram);
            } else { // no shader program link errors
                gl.useProgram(shaderProgram); // activate shader program (frag and vert)
                
                // locate and enable vertex attributes
                vPosAttribLoc = gl.getAttribLocation(shaderProgram, "aVertexPosition"); // ptr to vertex pos attrib
                gl.enableVertexAttribArray(vPosAttribLoc); // connect attrib to array
                vNormAttribLoc = gl.getAttribLocation(shaderProgram, "aVertexNormal"); // ptr to vertex normal attrib
                gl.enableVertexAttribArray(vNormAttribLoc); // connect attrib to array
                
                // locate vertex uniforms
                mMatrixULoc = gl.getUniformLocation(shaderProgram, "umMatrix"); // ptr to mmat
                pvmMatrixULoc = gl.getUniformLocation(shaderProgram, "upvmMatrix"); // ptr to pvmmat
                
                // locate fragment uniforms
                var eyePositionULoc = gl.getUniformLocation(shaderProgram, "uEyePosition"); // ptr to eye position
                var lightAmbientULoc = gl.getUniformLocation(shaderProgram, "uLightAmbient"); // ptr to light ambient
                var lightDiffuseULoc = gl.getUniformLocation(shaderProgram, "uLightDiffuse"); // ptr to light diffuse
                var lightSpecularULoc = gl.getUniformLocation(shaderProgram, "uLightSpecular"); // ptr to light specular
                var lightPositionULoc = gl.getUniformLocation(shaderProgram, "uLightPosition"); // ptr to light position
                ambientULoc = gl.getUniformLocation(shaderProgram, "uAmbient"); // ptr to ambient
                diffuseULoc = gl.getUniformLocation(shaderProgram, "uDiffuse"); // ptr to diffuse
                specularULoc = gl.getUniformLocation(shaderProgram, "uSpecular"); // ptr to specular
                shininessULoc = gl.getUniformLocation(shaderProgram, "uShininess"); // ptr to shininess
                
                // pass global constants into fragment uniforms
                gl.uniform3fv(eyePositionULoc,Eye); // pass in the eye's position
                gl.uniform3fv(lightAmbientULoc,lightAmbient); // pass in the light's ambient emission
                gl.uniform3fv(lightDiffuseULoc,lightDiffuse); // pass in the light's diffuse emission
                gl.uniform3fv(lightSpecularULoc,lightSpecular); // pass in the light's specular emission
                gl.uniform3fv(lightPositionULoc,lightPosition); // pass in the light's position
            } // end if no shader program link errors
        } // end if no compile errors
    } // end try 
    
    catch(e) {
        console.log(e);
    } // end catch
} // end setup shaders

// render the loaded model
function renderModels() {

    // var hMatrix = mat4.create(); // handedness matrix
    var pMatrix = mat4.create(); // projection matrix
    var vMatrix = mat4.create(); // view matrix
    var mMatrix = mat4.create(); // model matrix
    var pvMatrix = mat4.create(); // hand * proj * view matrices
    var pvmMatrix = mat4.create(); // hand * proj * view * model matrices
    
    window.requestAnimationFrame(renderModels); // set up frame render callback
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // clear frame/depth buffers
    
    // set up projection and view
    // mat4.fromScaling(hMatrix,vec3.fromValues(-1,1,1)); // create handedness matrix
    mat4.perspective(pMatrix,0.5*Math.PI,1.625,0.05,10); // create projection matrix
    if (firstPerson) {
        var fpEye = vec3.fromValues((1.25 - frog.position[0]), 0.2, (0.15 + frog.position[1]));
        var fpAt = vec3.create();
        vec3.copy(fpAt, fpEye);
        fpAt[2] += 0.2;
        fpAt[1] -= 0.05;

        mat4.lookAt(vMatrix, fpEye, fpAt, Up);
    }
    else {
        mat4.lookAt(vMatrix,Eye,Center,Up); // create view matrix
    }
    mat4.multiply(pvMatrix,pvMatrix,pMatrix); // projection
    mat4.multiply(pvMatrix,pvMatrix,vMatrix); // projection * view

    // render each triangle set
    var currSet; // the tri set and its material properties
    for (var whichTriSet=0; whichTriSet<numTriangleSets; whichTriSet++) {
        currSet = gameBoard[whichTriSet];
        
        // make model transform, add to view project
        mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
        gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
        gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix
        
        // reflectivity: feed to the fragment shader
        gl.uniform3fv(ambientULoc,currSet.material.ambient); // pass in the ambient reflectivity
        gl.uniform3fv(diffuseULoc,currSet.material.diffuse); // pass in the diffuse reflectivity
        gl.uniform3fv(specularULoc,currSet.material.specular); // pass in the specular reflectivity
        gl.uniform1f(shininessULoc,currSet.material.n); // pass in the specular exponent
        
        // vertex buffer: activate and feed into vertex shader
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffers[whichTriSet]); // activate
        gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
        gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffers[whichTriSet]); // activate
        gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed

        // triangle buffer: activate and render
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,triangleBuffers[whichTriSet]); // activate
        gl.drawElements(gl.TRIANGLES,3*triSetSizes[whichTriSet],gl.UNSIGNED_SHORT,0); // render
        
    } // end for each triangle set

    // render the frog

    // make model transform, add to view project
    mat4.multiply(mMatrix, mat4.create(), mat4.fromTranslation(mat4.create(), vec3.fromValues(-frog.position[0], 0, frog.position[1])))
    mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
    gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
    gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix

    // reflectivity: feed to the fragment shader
    gl.uniform3fv(ambientULoc,frog.triangles.material.ambient); // pass in the ambient reflectivity
    gl.uniform3fv(diffuseULoc,frog.triangles.material.diffuse); // pass in the diffuse reflectivity
    gl.uniform3fv(specularULoc,frog.triangles.material.specular); // pass in the specular reflectivity
    gl.uniform1f(shininessULoc,frog.triangles.material.n); // pass in the specular exponent

    // vertex buffer: activate and feed into vertex shader

    gl.bindBuffer(gl.ARRAY_BUFFER,frog.vertexBuffer); // activate
    gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
    gl.bindBuffer(gl.ARRAY_BUFFER,frog.normalBuffer); // activate
    gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed

    // triangle buffer: activate and render
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,frog.triangleBuffer); // activate
    gl.drawElements(gl.TRIANGLES,3*frog.triangles.triangles.length,gl.UNSIGNED_SHORT,0); // render

    // render the cars
    for (var i = 0; i < game.cars.length; i++) {
        // make model transform, add to view project
        mat4.multiply(mMatrix, mat4.create(), mat4.fromTranslation(mat4.create(), vec3.fromValues(-game.cars[i].position[0], 0, game.cars[i].position[1])))
        mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
        gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
        gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix

        // reflectivity: feed to the fragment shader
        gl.uniform3fv(ambientULoc,game.cars[i].triangles.material.ambient); // pass in the ambient reflectivity
        gl.uniform3fv(diffuseULoc,game.cars[i].triangles.material.diffuse); // pass in the diffuse reflectivity
        gl.uniform3fv(specularULoc,game.cars[i].triangles.material.specular); // pass in the specular reflectivity
        gl.uniform1f(shininessULoc,game.cars[i].triangles.material.n); // pass in the specular exponent

        // vertex buffer: activate and feed into vertex shader

        gl.bindBuffer(gl.ARRAY_BUFFER,game.cars[i].vertexBuffer); // activate
        gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
        gl.bindBuffer(gl.ARRAY_BUFFER,game.cars[i].normalBuffer); // activate
        gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed

        // triangle buffer: activate and render
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,game.cars[i].triangleBuffer); // activate
        gl.drawElements(gl.TRIANGLES,3*game.cars[i].triangles.triangles.length,gl.UNSIGNED_SHORT,0); // render
    }

    // render the logs
    for (var i = 0; i < game.logs.length; i++) {
        // make model transform, add to view project
        mat4.multiply(mMatrix, mat4.create(), mat4.fromTranslation(mat4.create(), vec3.fromValues(-game.logs[i].position[0], 0, game.logs[i].position[1])))
        mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
        gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
        gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix

        // reflectivity: feed to the fragment shader
        gl.uniform3fv(ambientULoc,game.logs[i].triangles.material.ambient); // pass in the ambient reflectivity
        gl.uniform3fv(diffuseULoc,game.logs[i].triangles.material.diffuse); // pass in the diffuse reflectivity
        gl.uniform3fv(specularULoc,game.logs[i].triangles.material.specular); // pass in the specular reflectivity
        gl.uniform1f(shininessULoc,game.logs[i].triangles.material.n); // pass in the specular exponent

        // vertex buffer: activate and feed into vertex shader

        gl.bindBuffer(gl.ARRAY_BUFFER,game.logs[i].vertexBuffer); // activate
        gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
        gl.bindBuffer(gl.ARRAY_BUFFER,game.logs[i].normalBuffer); // activate
        gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed

        // triangle buffer: activate and render
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,game.logs[i].triangleBuffer); // activate
        gl.drawElements(gl.TRIANGLES,3*game.logs[i].triangles.triangles.length,gl.UNSIGNED_SHORT,0); // render
    }

    //render the turtles
    for (var i = 0; i < game.turtles.length; i++) {
        // make model transform, add to view project
        mat4.multiply(mMatrix, mat4.create(), mat4.fromTranslation(mat4.create(), vec3.fromValues(-game.turtles[i].position[0], 0, game.turtles[i].position[1])))
        mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
        gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
        gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix

        // reflectivity: feed to the fragment shader
        gl.uniform3fv(ambientULoc,game.turtles[i].triangles.material.ambient); // pass in the ambient reflectivity
        gl.uniform3fv(diffuseULoc,game.turtles[i].triangles.material.diffuse); // pass in the diffuse reflectivity
        gl.uniform3fv(specularULoc,game.turtles[i].triangles.material.specular); // pass in the specular reflectivity
        gl.uniform1f(shininessULoc,game.turtles[i].triangles.material.n); // pass in the specular exponent

        // vertex buffer: activate and feed into vertex shader

        gl.bindBuffer(gl.ARRAY_BUFFER,game.turtles[i].vertexBuffer); // activate
        gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
        gl.bindBuffer(gl.ARRAY_BUFFER,game.turtles[i].normalBuffer); // activate
        gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed

        // triangle buffer: activate and render
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,game.turtles[i].triangleBuffer); // activate
        gl.drawElements(gl.TRIANGLES,3*game.turtles[i].triangles.triangles.length,gl.UNSIGNED_SHORT,0); // render
    }

    updateCars();
    updateLogs();
    updateTurtles();

    if (checkSafety() === false) {
        frog.position = [0.75, 0];
    }

    if (gameLoop === 700) {
        frog.triangles.material.diffuse = [0.1, 0.6, 0.1];
    }

    gameLoop++;
} // end render model

function updateCars() {
    randoms = [Math.floor(Math.random() * 800),
        Math.floor(Math.random() * 800),
        Math.floor(Math.random() * 800),
        Math.floor(Math.random() * 800)];

    for (var i = 0; i < randoms.length; i++) {
        if (randoms[i] === 15) {
            // Spawn new car
            if (i === 0 || i === 1) {
                game.cars.push(new Car([-0.2, 0.1 + 0.1 * i]));
            }
            else {
                game.cars.push(new Car([1.6, 0.1 + 0.1 * i]));
            }
        }
    }

    // Move de-spawn cars at the left
    for (var j = 0; j < game.cars.length; j++) {
        // Close side of the road
        if (game.cars[j].position[1] < 0.25) {
            // Slow lane
            if (game.cars[j].position[1] < 0.15) {
                game.cars[j].position[0] += 0.002
            }
            // Fast lane
            else {
                game.cars[j].position[0] += 0.003
            }

            if (game.cars[j].position[0] > 1.4) {
                game.cars.splice(j, 1);
                j--
            }
        }
        // Far side of the road
        else {
            // Fast lane
            if (game.cars[j].position[1] < 0.35) {
                game.cars[j].position[0] -= 0.003
            }
            // Slow lane
            else {
                game.cars[j].position[0] -= 0.002
            }

            if (game.cars[j].position[0] < 0) {
                game.cars.splice(j, 1);
                j--;
            }
        }
    }
}

function updateLogs() {
    randoms = [Math.floor(Math.random() * 500),
        Math.floor(Math.random() * 500),
        Math.floor(Math.random() * 500)]

    for (var i = 0; i < randoms.length; i++) {
        if (randoms[i] === 15) {
            game.logs.push(new Log([-0.2, 0.6 + 0.2 * i]))
        }
    }

    // Move and de-spawn logs at the side of board
    for (var k = 0; k < game.logs.length; k++) {
        game.logs[k].position[0] += 0.002

        if (game.logs[k].position[0] > 1.4) {
            game.logs.splice(k, 1);
            k--;
        }

    }
}

function updateTurtles() {
    if (gameLoop % 300 === 0) {
        // Spawn new turtles
        game.turtles.push(new Turtle([1.6, 0.7]));
        game.turtles.push(new Turtle([1.6, 0.9]));
    }

    // Move and de-spawn turtles at the side of the board
    for (var k = 0; k < game.turtles.length; k++) {
        game.turtles[k].position[0] -= 0.002;

        if (game.turtles[k].diver === 1) {
            if (game.turtles[k].position[0] < 1.4 && game.turtles[k].diveState === 0) {
                game.turtles[k].triangles.material.diffuse = [0.5, 0.4, 0.86];
                game.turtles[k].diveState = 1;
            }
            else if (game.turtles[k].position[0] < 1.0 && game.turtles[k].diveState === 1) {
                game.turtles[k].triangles.material.diffuse = [0.1, 0.1, 0.9];
                game.turtles[k].diveState = 2;
            }
            else if (game.turtles[k].position[0] < 0.6 && game.turtles[k].diveState === 2) {
                game.turtles[k].triangles.material.diffuse = [0.95, 0.7, 0.7];
                game.turtles[k].diveState = 3;
            }
        }

        if (game.turtles[k].position[0] < 0) {
            game.turtles.splice(k, 1);
            k--;
        }
    }
}

function checkSafety() {
    for (var i = 0; i < gameBoard.length; i++) {
        if ((1.3 - frog.position[0] + - 0.05) < gameBoard[i].vertices[0][0] && (1.3 - frog.position[0] - 0.05) > gameBoard[i].vertices[1][0]) {
            if ((frog.position[1] + 0.25) > gameBoard[i].vertices[0][2] && (frog.position[1] + 0.25) < gameBoard[i].vertices[2][2]) {
                if (gameBoard[i].safe < 1) {
                    // Check if an entity makes it safe (log or turtle)
                    for (var k = 0; k < game.logs.length; k++) {
                        if (frog.position[0] + 0.05 > game.logs[k].position[0] && frog.position[0] + 0.05 < (game.logs[k].position[0] + game.logs[k].length)) {
                            if (frog.position[1] + 0.05 > game.logs[k].position[1] - 0.001 && frog.position[1] + 0.05 < (game.logs[k].position[1] + game.logs[k].width - 0.001) ) {
                                frog.position[0] += 0.001;
                                return true;
                            }
                        }
                    }
                    for (var k = 0; k < game.turtles.length; k++) {
                        if (frog.position[0] + 0.05 > game.turtles[k].position[0] && frog.position[0] + 0.05 < (game.turtles[k].position[0] + game.turtles[k].length)) {
                            if (frog.position[1] + 0.05 > game.turtles[k].position[1] && frog.position[1] + 0.05 < (game.turtles[k].position[1] + game.turtles[k].width)) {
                                if (game.turtles[k].diveState !== 2) {
                                    frog.position[0] -= 0.002;
                                    return true;
                                }
                            }
                        }
                    }

                    console.log("fell in water");
                    return false;
                }
                else if (gameBoard[i].goal === 1) {
                    gameBoard[i].material.diffuse = [255, 255, 0];
                    loadModels();
                    console.log("Goal!");
                    return false;
                }
            }
        }
    }

    // Check if an entity makes it unsafe (car)
    for (var i = 0; i < game.cars.length; i++) {
        if (frog.position[0] > game.cars[i].position[0] && frog.position[0] < (game.cars[i].position[0] + game.cars[i].length) ||
            (frog.position[0] + 0.1) > game.cars[i].position[0] + 0.01 && (frog.position[0] + 0.1) < (game.cars[i].position[0] + game.cars[i].length)) {
            if (frog.position[1] >= game.cars[i].position[1] - 0.001 && frog.position[1] <= (game.cars[i].position[1] + game.cars[i].width - 0.001) ||
                (frog.position[1] + 0.1) >= game.cars[i].position[1] + 0.001 && (frog.position[1] + 0.1) <= (game.cars[i].position[1] + game.cars[i].width + 0.001)) {
                console.log("hit by car");
                return false;
            }
        }
    }

    return true;
}

/* MAIN -- HERE is where execution begins after window load */

function main() {
  
  setupWebGL(); // set up the webGL environment
  loadModels(); // load in the models from tri file
  loadEntities(); // load the starting entities
  setupShaders(); // setup the webGL shaders
  renderModels(); // draw the triangles using webGL
  
} // end main
