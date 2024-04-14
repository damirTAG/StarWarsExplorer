// // ./utils/PlanetsBg.js
// class Planet {
//     constructor(canvas, imageUrl, x, y, speed) {
//         this.canvas = canvas;
//         this.ctx = canvas.getContext("2d");
//         this.image = new Image();
//         this.image.src = imageUrl;
//         this.x = x;
//         this.y = y;
//         this.speed = speed;
//         this.width = 50; // Adjust the width
//         this.height = 50; // Adjust the height
//     }

//     update() {
//         this.y += this.speed;
//         if (this.y > this.canvas.height) {
//             this.y = -100;
//             this.x = Math.random() * (this.canvas.width - this.width);
//         }
//         this.draw();
//     }

//     draw() {
//         this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//     }
// }

// export default Planet;
