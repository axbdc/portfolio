# Gera um rich media HTML autónomo (imagens embutidas) a partir de uma especificação.
# Uso: from rmgen import build; build(spec, "saida.html")
import base64, io, json, os
from PIL import Image

def enc(path, crop=None, size=None, fmt=None, q=80, fill=None):
    im = Image.open(path)
    try:
        im.seek(0)
    except Exception:
        pass
    im = im.convert("RGBA")
    if crop:
        im = im.crop(crop)
    if size:
        im = im.resize(size, Image.LANCZOS)
    alpha = im.getchannel("A").getextrema()[0] < 250
    if fmt is None:
        fmt = "png" if alpha else "jpeg"
    buf = io.BytesIO()
    if fmt == "jpeg":
        bg = Image.new("RGB", im.size, fill or (0, 0, 0))
        bg.paste(im, (0, 0), im)
        bg.save(buf, "JPEG", quality=q, optimize=True, progressive=True)
    elif fmt == "webp":
        im.save(buf, "WEBP", quality=q, method=6)
    else:
        im = im.quantize(colors=256, method=Image.FASTOCTREE, dither=Image.FLOYDSTEINBERG) if alpha and im.size[0]*im.size[1] > 40000 else im
        im.save(buf, "PNG", optimize=True)
    mime = {"jpeg": "image/jpeg", "webp": "image/webp", "png": "image/png"}[fmt]
    return "data:%s;base64,%s" % (mime, base64.b64encode(buf.getvalue()).decode())

TPL = r"""<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>__TITLE__</title>
__HEAD__
<style>
  html, body { margin: 0; background: #e4e2dd; font-family: Arial, Helvetica, sans-serif; }
  #telemovel { width: 360px; margin: 24px auto; padding: 64px 16px; background: #111; border-radius: 48px; box-shadow: 0 20px 50px rgba(0,0,0,.25); }
  #ecra { position: relative; width: 360px; height: 640px; overflow: hidden; background: __BG__; }
  #anuncio { position: absolute; left: __LEFT__px; top: __TOP__px; width: __W__px; height: __H__px; transform: scale(__SC__); transform-origin: 0 0; overflow: hidden; touch-action: pan-y; user-select: none; -webkit-user-select: none; }
  .cena { position: absolute; inset: 0; opacity: 0; visibility: hidden; transition: opacity .45s ease, transform .45s ease, visibility 0s .45s; }
  .cena.ativa { opacity: 1; visibility: visible; transition: opacity .45s ease, transform .45s ease, visibility 0s; z-index: 2; }
  .cena.de-direita { transform: translateX(60px); }
  .cena.de-esquerda { transform: translateX(-60px); }
  .cena.ativa.de-direita, .cena.ativa.de-esquerda { transform: none; }
  .cena > img { position: absolute; display: block; pointer-events: none; -webkit-user-drag: none; }
  .cena > div img { display: inline-block; vertical-align: middle; -webkit-user-drag: none; }
  .zona { position: absolute; cursor: pointer; z-index: 5; -webkit-tap-highlight-color: transparent; border-radius: 12px; }
  .zona:focus-visible { outline: 3px solid #fff; }
  .ativa .a-kb { animation: kb 9s ease-out both; }
  .ativa .a-sobe { animation: sobe .7s cubic-bezier(.2,.8,.2,1) both; }
  .ativa .a-desce { animation: desce .7s cubic-bezier(.2,.8,.2,1) both; }
  .ativa .a-fade { animation: fade .8s ease both; }
  .ativa .a-pop { animation: pop .6s cubic-bezier(.3,1.5,.5,1) both; }
  .ativa .a-esq { animation: esq .7s cubic-bezier(.2,.8,.2,1) both; }
  .ativa .a-dir { animation: dir .7s cubic-bezier(.2,.8,.2,1) both; }
  .ativa .a-pulsa { animation: pop .6s cubic-bezier(.3,1.5,.5,1) both, pulsa 1.4s ease-in-out 1.2s infinite; }
  .ativa .a-flutua { animation: fade .6s ease both, flutua 2.6s ease-in-out .6s infinite; }
  .ativa .a-roda { animation: fade .6s ease both, roda 14s linear infinite; }
  .ativa .a-mao { animation: mao 1.8s ease-in-out .8s infinite; opacity: 0; }
  .ativa .a-brilho { animation: brilho 2.4s ease-in-out 1s infinite; }
  @keyframes kb { from { transform: scale(1.12); } to { transform: scale(1); } }
  @keyframes sobe { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: none; } }
  @keyframes desce { from { opacity: 0; transform: translateY(-50px); } to { opacity: 1; transform: none; } }
  @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pop { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: none; } }
  @keyframes esq { from { opacity: 0; transform: translateX(-80px); } to { opacity: 1; transform: none; } }
  @keyframes dir { from { opacity: 0; transform: translateX(80px); } to { opacity: 1; transform: none; } }
  @keyframes pulsa { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
  @keyframes flutua { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
  @keyframes roda { to { transform: rotate(360deg); } }
  @keyframes mao { 0% { opacity: 0; transform: translate(0,0) scale(1); } 15% { opacity: 1; } 45% { transform: translate(var(--mx,0px), var(--my,0px)) scale(.92); } 70% { opacity: 1; } 100% { opacity: 0; transform: translate(var(--mx,0px), var(--my,0px)); } }
  @keyframes brilho { 0%,100% { filter: brightness(1); } 50% { filter: brightness(1.25); } }
  #fechar { position: absolute; z-index: 20; cursor: pointer; }
  #fechado { display: none; position: absolute; inset: 0; z-index: 30; color: #9a978f; font-size: 14px; text-align: center; padding-top: 290px; box-sizing: border-box; cursor: pointer; background: #111; }
  #fechado b { display: block; color: #fff; font-size: 16px; margin-bottom: 6px; }
  #pontos { position: absolute; left: 0; right: 0; bottom: 10px; display: flex; gap: 6px; justify-content: center; z-index: 25; pointer-events: none; }
  #pontos i { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.35); transition: background .3s, width .3s; }
  #pontos i.on { background: #fff; width: 16px; border-radius: 3px; }
</style>
</head>
<body>
<div id="telemovel"><div id="ecra">
  <div id="anuncio"></div>
  <div id="pontos"></div>
  <div id="fechado"><b>Anúncio fechado</b>Tocar para ver de novo</div>
</div></div>
<script>
var SPEC = __SPEC__;
(function () {
  var A = document.getElementById("anuncio"), cenas = {}, atual = null, timer = 0, ordem = [];
  SPEC.scenes.forEach(function (s) {
    var el = document.createElement("div");
    el.className = "cena"; el.style.background = s.bg || "transparent";
    (s.layers || []).forEach(function (l) {
      var img;
      if (l.html != null) { img = document.createElement("div"); img.innerHTML = l.html; img.style.position = "absolute"; if (l.css) img.style.cssText += l.css; if (l.id) img.id = l.id; }
      else { img = document.createElement("img"); img.src = SPEC.img[l.img]; img.alt = ""; }
      img.style.left = l.x + "px"; img.style.top = l.y + "px";
      img.style.width = l.w + "px"; img.style.height = l.h + "px";
      if (l.a) img.className += " a-" + l.a;
      if (l.cls) img.className += " " + l.cls;
      if (l.d) img.style.animationDelay = l.d + "ms";
      if (l.o) img.style.transformOrigin = l.o;
      if (l.mx != null) img.style.setProperty("--mx", l.mx + "px");
      if (l.my != null) img.style.setProperty("--my", l.my + "px");
      if (l.z) img.style.zIndex = l.z;
      el.appendChild(img);
    });
    (s.hot || []).forEach(function (h) {
      var z = document.createElement("a");
      z.className = "zona"; z.setAttribute("role", "button"); z.tabIndex = 0;
      z.setAttribute("aria-label", h.label || "Avançar");
      z.style.left = h.x + "px"; z.style.top = h.y + "px"; z.style.width = h.w + "px"; z.style.height = h.h + "px";
      if (h.url) { z.href = h.url; z.target = "_blank"; z.rel = "noopener"; }
      else z.addEventListener("click", function (e) { e.preventDefault(); ir(h.go, h.dir); });
      el.appendChild(z);
    });
    A.appendChild(el); cenas[s.id] = { el: el, s: s };
    if (s.dot) ordem.push(s.id);
  });
  var P = document.getElementById("pontos");
  ordem.forEach(function () { P.appendChild(document.createElement("i")); });
  function ir(id, dir) {
    if (!cenas[id] || id === atual) return;
    clearTimeout(timer);
    var novo = cenas[id];
    if (atual) { var v = cenas[atual].el; v.classList.remove("ativa", "de-direita", "de-esquerda"); }
    novo.el.classList.remove("de-direita", "de-esquerda");
    if (dir) novo.el.classList.add(dir > 0 ? "de-direita" : "de-esquerda");
    void novo.el.offsetWidth;
    novo.el.classList.add("ativa");
    atual = id;
    document.dispatchEvent(new CustomEvent("cena", { detail: id }));
    var k = ordem.indexOf(id);
    Array.prototype.forEach.call(P.children, function (d, i) { d.className = i === k ? "on" : ""; });
    P.style.display = k < 0 ? "none" : "flex";
    if (novo.s.auto) timer = setTimeout(function () { ir(novo.s.auto.go, novo.s.auto.dir); }, novo.s.auto.ms);
  }
  // arrastar para os lados
  var x0 = null, y0 = null;
  A.addEventListener("pointerdown", function (e) { x0 = e.clientX; y0 = e.clientY; });
  A.addEventListener("pointerup", function (e) {
    if (x0 == null) return;
    var dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    var s = cenas[atual].s;
    if (dx < 0 && s.next) ir(s.next, 1);
    if (dx > 0 && s.prev) ir(s.prev, -1);
  });
  // fechar
  if (SPEC.close) {
    var c = document.createElement("img");
    c.id = "fechar"; c.src = SPEC.img[SPEC.close.img]; c.alt = "Fechar";
    c.style.left = SPEC.close.x + "px"; c.style.top = SPEC.close.y + "px"; c.style.width = SPEC.close.w + "px"; c.style.height = SPEC.close.h + "px";
    c.addEventListener("click", function () { clearTimeout(timer); document.getElementById("fechado").style.display = "block"; });
    A.appendChild(c);
  }
  document.getElementById("fechado").addEventListener("click", function () {
    this.style.display = "none"; var a = atual; atual = null; cenas[a].el.classList.remove("ativa"); ir(SPEC.start);
  });
  window.RM = { ir: ir, atual: function () { return atual; } };
  ir(SPEC.start);
  if (SPEC.js) (new Function(SPEC.js))();
})();
</script>
</body>
</html>
"""

def build(spec, out, title="Rich media", bg="#000"):
    W, H = spec["W"], spec["H"]
    sc = 360.0 / W
    h = H * sc
    top = max(0, (640 - h) / 2) if h <= 640 else 0
    left = 0
    if h > 640:  # anúncio mais alto que o ecrã: encolhe pela altura
        sc = 640.0 / H
        left = (360 - W * sc) / 2
    html = (TPL.replace("__TITLE__", title).replace("__BG__", bg)
            .replace("__W__", str(W)).replace("__H__", str(H))
            .replace("__SC__", "%.5f" % sc).replace("__LEFT__", "%.1f" % left).replace("__TOP__", "%.1f" % top)
            .replace("__HEAD__", spec.get("head", "")).replace("__SPEC__", json.dumps(spec, separators=(",", ":"))))
    open(out, "w").write(html)
    return len(html)


FONT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")

def font(family, file, weight=400):
    data = open(os.path.join(FONT_DIR, file), "rb").read()
    return ("@font-face{font-family:'%s';font-weight:%d;font-style:normal;font-display:block;"
            "src:url(data:font/woff2;base64,%s) format('woff2')}" % (family, weight, base64.b64encode(data).decode()))
