const DOT_SIZE = 50;
const canvas = document.getElementById("cnvs");
const ctx = canvas.getContext('2d');
const WIDTH = 500;
const HEIGHT = 800;
const shapes =
[
    function() {
        shape = 0;
        map[0][3] = 1;
        map[0][4] = 1;
        map[0][5] = 1;
        map[0][6] = 1;
    },
    function() {
        shape = 1;
        map[0][4] = 1;
        map[1][4] = 1;
        map[1][5] = 1;
        map[1][6] = 1;
    },
    function() {
        shape = 2;
        map[0][6] = 1;
        map[1][4] = 1;
        map[1][5] = 1;
        map[1][6] = 1;
    },
    function() {
        shape = 3;
        map[0][4] = 1;
        map[0][5] = 1;
        map[1][4] = 1;
        map[1][5] = 1;
    },
    function() {
        shape = 4;
        map[0][4] = 1;
        map[0][5] = 1;
        map[1][5] = 1;
        map[1][6] = 1;
    },
    function() {
        shape = 5;
        map[0][4] = 1;
        map[0][5] = 1;
        map[1][3] = 1;
        map[1][4] = 1;
    },
    function() {
        shape = 6;
        map[0][5] = 1;
        map[1][4] = 1;
        map[1][5] = 1;
        map[1][6] = 1;
    }
]

var shape = -1;
var x = 0;
var y = 0;
var map = [];
var back = [];
for(var i = 0; i < HEIGHT / DOT_SIZE; i++) {
    map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    back.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

shapes[4]();

function arrEqual(arr1, arr2) {
    if(arr1.length != arr2.length) return false;
    for(var i = 0; i < arr1.length; i++) {
        if(arr1[i]==arr2[i]) continue;
        else return false;
    }
    return true;
}
function reset() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeStyle = "black";
}
function display(color) {
    reset();
    ctx.fillStyle = "#000000";
    for(var i = 0; i < HEIGHT / DOT_SIZE; i++) {
        for(var j = 0; j < WIDTH / DOT_SIZE; j++) {
            if(map[i][j] == 1) ctx.fillRect(j * DOT_SIZE, i * DOT_SIZE, DOT_SIZE, DOT_SIZE); 
            else ctx.strokeRect(j * DOT_SIZE, i * DOT_SIZE, DOT_SIZE, DOT_SIZE);
            if(back[i][j] == 1) {
                ctx.fillStyle = "gray";
                ctx.fillRect(j * DOT_SIZE, i * DOT_SIZE, DOT_SIZE, DOT_SIZE); 
                ctx.fillStyle = "black";
            }
        }
    }
}
function gravity() {
    for(var i = (HEIGHT / DOT_SIZE) - 1; i >= 0; i--) {
        for(var j = (WIDTH / DOT_SIZE) - 1; j >= 0; j--) {
            if(map[i][j] == 1) {
                if(!(i + 1 < HEIGHT / DOT_SIZE) || back[i + 1][j] != 0) {
                    for(var k = 0; k < HEIGHT / DOT_SIZE; k++) {
                        for(var l = 0; l < WIDTH / DOT_SIZE; l++) {
                            if(map[k][l] == 1) {
                                back[k][l] = 1;
                                map[k][l] = 0;
                            }
                        }
                    }
                    shapes[Math.floor(Math.random() * 6)]();
                    return;
                }
            }
        }
    }
    for(var i = (HEIGHT / DOT_SIZE) - 1; i >= 0; i--) {
        for(var j = (WIDTH / DOT_SIZE) - 1; j >= 0; j--) {
            if(map[i][j] == 1) {
                if(i + 1 < HEIGHT / DOT_SIZE && back[i + 1][j] == 0) {
                    map[i + 1][j] = 1;
                    map[i][j] = 0;
                }
            }
        }
    }
}
function check() {
    var list = [];
    for(var i = (HEIGHT / DOT_SIZE) - 1; i >= 0; i--) {
        for(var j = 0; j < WIDTH / DOT_SIZE; j++) {
            if(back[i][j] != 1) break;
            else if(j + 1 == WIDTH / DOT_SIZE) list.push(i);
        }
    }
    for(var i = 0; i < list.length; i++) {
        back[list[i]] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        console.log(list);
    }
    for(;;) {
        var isEnd = true;
        for(var i = HEIGHT / DOT_SIZE - 1; i >=0; i--) {
            if(i + 1 != HEIGHT / DOT_SIZE && arrEqual(back[i + 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) && !arrEqual(back[i], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])) {
                back[i + 1] = back[i];
                back[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                isEnd = false;
            }
        }
        if(isEnd) break;
    }
}
function move(dir) { //0:left 1:up 2:right 3:down
    switch(dir) {
        case 0 :
            for(var i = 0; i < HEIGHT / DOT_SIZE; i++) {
                if(map[i][0] == 1) return;
            }
            for(var i = 0; i < HEIGHT / DOT_SIZE; i++) {
                for(var j = 0; j < WIDTH / DOT_SIZE; j++) {
                    if(map[i][j] == 1) {
                        if(back[i][j - 1] == 1) return;
                    }
                }
            }
            for(var i = 0; i < HEIGHT / DOT_SIZE; i++) {
                for(var j = 0; j < WIDTH / DOT_SIZE; j++) {
                    map[i][j - 1] = map[i][j];
                    map[i][j] = 0;
                }
            }
            break;
        case 2 :
            for(var i = 0; i < HEIGHT / DOT_SIZE; i++) {
                    if(map[i][WIDTH / DOT_SIZE - 1] == 1) return;
            }
            for(var i = 0; i < HEIGHT / DOT_SIZE; i++) {
                for(var j = 0; j < WIDTH / DOT_SIZE; j++) {
                    if(map[i][j] == 1) {
                        if(back[i][j + 1] == 1) return;
                    }
                }
            }
            for(var i = 0; i < HEIGHT / DOT_SIZE; i++) {
                for(var j = WIDTH / DOT_SIZE - 1; j >= 0; j--) {
                    map[i][j + 1] = map[i][j];
                    map[i][j] = 0;
                }
            }
            break;
        case 3 :
            gravity();
            break;
    }
    display();
}

var inter;
var downing = false;
window.onkeydown = function(key) {
    if(downing) return;
    downing = true;
    if(key.keyCode <= 40 && key.keyCode >= 37) {
        move(key.keyCode - 37);
        inter = setInterval(function() {
            move(key.keyCode - 37);
        }, 100);
    }
}
window.onkeyup = function(key) {
    downing = false;
    clearInterval(inter);
}

display();
ctx.fillStyle = "black";

setInterval(function() {
    gravity();
    display();
    check();
}, 500);