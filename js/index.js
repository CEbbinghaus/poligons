const degToRad = d => {
  return d * (Math.PI / 180);
}
let c = $("#c").get(0);
let ctx = c.getContext("2d");
class circle {
  constructor(x, y, r){
    this.x = x || 0;
    this.y = y || 0;
    this.r = r || 20;
  }
  draw(t){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2* Math.PI);
    ctx[t] ? ctx[t]() : ctx.fill();
  }
  drawLine(d){
    let r = degToRad(d);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    let x = this.x + this.r * Math.cos(r);
    let y = this.y + this.r * Math.sin(r);
    ctx.lineTo(x, y)
    ctx.stroke();
    return {x: x, y: y};
  }
} 
$(function(){
  c.width = innerWidth;
  c.height = innerHeight;
  let Cir = new circle(innerWidth / 2, innerHeight / 2, (innerWidth < innerHeight ? innerWidth : innerHeight) / 3);
  window.addEventListener("resize", () => {
    c.width = innerWidth;
    c.height = innerHeight;
    Cir.x = innerWidth / 2;
    Cir.y = innerHeight / 2;
    Cir.r = (innerWidth < innerHeight ? innerWidth : innerHeight) / 3
  })
  let a = 3;
  let o = 0;
  let ar = [];
  let tt = 360 / a;
  let t = tt;
  let auto = true;
  addEventListener("keydown", e => {
    if(t != tt)return;
    if(e.key == "a"){
      auto = !auto;
    }
    if (e.which == 38) {
      a++;
      tt = 360 / a
    }
    if (e.which == 40) {
      a--;
      tt = 360 / a
    }
    if(e.which == 37){
      o--;
    }
    if(e.which == 39){
      o++;
    }
  })
  addEventListener("mousewheel", e => {
    o += e.deltaY / 100;
  })
  setInterval(() => {
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    ar = [];
    for (let i = 0; i < (t > tt ? a : a + 1); i++){
        ar.push(Cir.drawLine(i * t + o));
    }
    let p = ar[ar.length - 1]
    ar.forEach(v => {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(v.x, v.y)
      ctx.stroke();
      p = v;
    })
    if(t > tt){
      t -= 1 / a;
      if(t <= tt)t = tt;
    }
    if(t < tt){
      t += 1 / a;
      if(t >= tt)t = tt;
    }
    if(auto){
      o++;
      if(o > 360){
        o = 2;
        a++;
        tt = 360 / a
        if(a > 100)a = 1;
      }
    }
  }, 25)
})