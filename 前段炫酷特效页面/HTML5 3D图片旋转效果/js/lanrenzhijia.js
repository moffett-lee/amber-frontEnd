/* 代码整理：懒人之家 www.lanrenzhijia.com */
var canvas, ctx;
var aImages = [];
var points = [];
var triangles = [];
var textureWidth, textureHeight;
var lev = 3;
var angle = 0;

// scene vertices
var vertices = [
    new Point3D(-2,-1,2),
    new Point3D(2,-1,2),
    new Point3D(2,1,2),
    new Point3D(-2,1,2),
    new Point3D(-2,-1,-2),
    new Point3D(2,-1,-2),
    new Point3D(2,1,-2),
    new Point3D(-2,1,-2)
];
 /* 代码整理：懒人之家 www.lanrenzhijia.com */
// scene faces (6 faces)
var faces  = [[0,1,2,3],[1,5,6,2],[5,4,7,6],[4,0,3,7],[0,4,5,1],[3,2,6,7]];

function Point3D(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.rotateX = function(angle) {
        var rad, cosa, sina, y, z
        rad = angle * Math.PI / 180
        cosa = Math.cos(rad)
        sina = Math.sin(rad)
        y = this.y * cosa - this.z * sina
        z = this.y * sina + this.z * cosa
        return new Point3D(this.x, y, z)
    }
    this.rotateY = function(angle) {
        var rad, cosa, sina, x, z
        rad = angle * Math.PI / 180
        cosa = Math.cos(rad)
        sina = Math.sin(rad)
        z = this.z * cosa - this.x * sina
        x = this.z * sina + this.x * cosa
        return new Point3D(x,this.y, z)
    }
    this.rotateZ = function(angle) {
        var rad, cosa, sina, x, y
        rad = angle * Math.PI / 180
        cosa = Math.cos(rad)
        sina = Math.sin(rad)
        x = this.x * cosa - this.y * sina
        y = this.x * sina + this.y * cosa
        return new Point3D(x, y, this.z)
    }
    this.projection = function(viewWidth, viewHeight, fov, viewDistance) {
        var factor, x, y
        factor = fov / (viewDistance + this.z)
        x = this.x * factor + viewWidth / 2
        y = this.y * factor + viewHeight / 2
        return new Point3D(x, y, this.z)
    }
}
/* 代码整理：懒人之家 www.lanrenzhijia.com */
// array of photos
var aImgs = [
    'images/lanrenzhijia_01.jpg',
    'images/lanrenzhijia_02.jpg',
    'images/lanrenzhijia_03.jpg',
    'images/lanrenzhijia_04.jpg'
];
for (var i = 0; i < aImgs.length; i++) {
    var oImg = new Image();
    oImg.src = aImgs[i];
    aImages.push(oImg);

    oImg.onload = function () {
        textureWidth = oImg.width;
        textureHeight = oImg.height;
    }
}

window.onload = function(){
    // creating canvas objects
    canvas = document.getElementById('slideshow');
    ctx = canvas.getContext('2d');

    // prepare points
    for (var i = 0; i <= lev; i++) {
        for (var j = 0; j <= lev; j++) {
            var tx = (i * (textureWidth / lev));
            var ty = (j * (textureHeight / lev));
            points.push({
                tx: tx,
                ty: ty,
                nx: tx / textureWidth,
                ny: ty / textureHeight,
                ox: i,
                oy: j
            });
        }
    }

    // prepare triangles ----
    var levT = lev + 1;
    for (var i = 0; i < lev; i++) {
        for (var j = 0; j < lev; j++) {
            triangles.push({
                p0: points[j + i * levT],
                p1: points[j + i * levT + 1],
                p2: points[j + (i + 1) * levT],
                up: true
            });
            triangles.push({
                p0: points[j + (i + 1) * levT + 1],
                p1: points[j + (i + 1) * levT],
                p2: points[j + i * levT + 1],
                up: false
            });
        }
    }

    drawScene();
};
/* 代码整理：懒人之家 www.lanrenzhijia.com */
function drawScene() {
    // clear context
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // rotate scene
    var t = new Array();
    for (var iv = 0; iv < vertices.length; iv++) {
        var v = vertices[iv];
        var r = v.rotateY(angle);
        //var r = v.rotateX(angle).rotateY(angle);
        var prj = r.projection(ctx.canvas.width, ctx.canvas.height, 1000, 3);
        t.push(prj)
    }

    var avg_z = new Array();
    for (var i = 0; i < faces.length; i++) {
        var f = faces[i];
        avg_z[i] = {"ind":i, "z":(t[f[0]].z + t[f[1]].z + t[f[2]].z + t[f[3]].z) / 4.0};
    }
/* 代码整理：懒人之家 www.lanrenzhijia.com */
    // get around through all faces
    for (var i = 0; i < faces.length; i++) {
        var f = faces[avg_z[i].ind];

        if (t[f[3]].z+t[f[2]].z+t[f[1]].z+t[f[0]].z > -3) {
            ctx.save();

            // draw surfaces
            ctx.fillStyle = "rgb(160,180,160)";
            ctx.beginPath();
            ctx.moveTo(t[f[0]].x,t[f[0]].y);
            ctx.lineTo(t[f[1]].x,t[f[1]].y);
            ctx.lineTo(t[f[2]].x,t[f[2]].y);
            ctx.lineTo(t[f[3]].x,t[f[3]].y);
            ctx.closePath();
            ctx.fill();

            // draw stretched images
            if (i < 4) {
                var ip = points.length;
                while (--ip > -1) {
                    var p = points[ip];
                    var mx = t[f[0]].x + p.ny * (t[f[3]].x - t[f[0]].x);
                    var my = t[f[0]].y + p.ny * (t[f[3]].y - t[f[0]].y);
                    p.px = (mx + p.nx * (t[f[1]].x + p.ny * (t[f[2]].x - t[f[1]].x) - mx)) + p.ox;
                    p.py = (my + p.nx * (t[f[1]].y + p.ny * (t[f[2]].y - t[f[1]].y) - my)) + p.oy;
                }

                var n = triangles.length;
                while (--n > -1) {
                    var tri = triangles[n];
                    var p0 = tri.p0;
                    var p1 = tri.p1;
                    var p2 = tri.p2;

                    var xc = (p0.px + p1.px + p2.px) / 3;
                    var yc = (p0.py + p1.py + p2.py) / 3;

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo((1.05 * p0.px - xc * 0.05), (1.05 * p0.py - yc * 0.05));
                    ctx.lineTo((1.05 * p1.px - xc * 0.05), (1.05 * p1.py - yc * 0.05));
                    ctx.lineTo((1.05 * p2.px - xc * 0.05), (1.05 * p2.py - yc * 0.05));
                    ctx.closePath();
                    ctx.clip();

                    // transformation
                    var d = p0.tx * (p2.ty - p1.ty) - p1.tx * p2.ty + p2.tx * p1.ty + (p1.tx - p2.tx) * p0.ty;
                    ctx.transform(
                        -(p0.ty * (p2.px - p1.px) -  p1.ty * p2.px  + p2.ty *  p1.px + (p1.ty - p2.ty) * p0.px) / d, // m11
                         (p1.ty *  p2.py + p0.ty  * (p1.py - p2.py) - p2.ty *  p1.py + (p2.ty - p1.ty) * p0.py) / d, // m12
                         (p0.tx * (p2.px - p1.px) -  p1.tx * p2.px  + p2.tx *  p1.px + (p1.tx - p2.tx) * p0.px) / d, // m21
                        -(p1.tx *  p2.py + p0.tx  * (p1.py - p2.py) - p2.tx *  p1.py + (p2.tx - p1.tx) * p0.py) / d, // m22
                         (p0.tx * (p2.ty * p1.px  -  p1.ty * p2.px) + p0.ty * (p1.tx *  p2.px - p2.tx  * p1.px) + (p2.tx * p1.ty - p1.tx * p2.ty) * p0.px) / d, // dx
                         (p0.tx * (p2.ty * p1.py  -  p1.ty * p2.py) + p0.ty * (p1.tx *  p2.py - p2.tx  * p1.py) + (p2.tx * p1.ty - p1.tx * p2.ty) * p0.py) / d  // dy
                    );
                    ctx.drawImage(aImages[i], 0, 0);
                    ctx.restore();
                }
            }
        }
    }

    // shift angle and redraw scene
    angle += 0.3;
    setTimeout(drawScene, 40);
}
/* 代码整理：懒人之家 www.lanrenzhijia.com */