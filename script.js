
// Comprehensive basic color dictionary. These are used by the search engine
// as exact matches, aliases, and building blocks for generated combinations.
const BASIC_COLORS = {
  "red":"#FF0000","crimson":"#DC143C","scarlet":"#FF2400","maroon":"#800000","burgundy":"#800020",
  "pink":"#FFC0CB","hot pink":"#FF69B4","rose":"#FF007F","salmon":"#FA8072","coral":"#FF7F50",
  "orange":"#FFA500","dark orange":"#FF8C00","tangerine":"#F28500","peach":"#FFE5B4","apricot":"#FBCEB1",
  "yellow":"#FFFF00","gold":"#FFD700","mustard":"#FFDB58","lemon":"#FFF44F","cream":"#FFFDD0",
  "green":"#008000","lime":"#00FF00","lime green":"#32CD32","olive":"#808000","mint":"#98FF98",
  "sage":"#9CAF88","emerald":"#50C878","forest green":"#228B22","teal":"#008080","aqua":"#00FFFF",
  "cyan":"#00FFFF","turquoise":"#40E0D0","sea green":"#2E8B57","dark green":"#006400",
  "blue":"#0000FF","navy":"#000080","sky blue":"#87CEEB","baby blue":"#89CFF0","royal blue":"#4169E1",
  "cobalt":"#0047AB","azure":"#007FFF","indigo":"#4B0082","denim":"#1560BD","steel blue":"#4682B4",
  "purple":"#800080","violet":"#EE82EE","lavender":"#E6E6FA","plum":"#DDA0DD","mauve":"#E0B0FF",
  "magenta":"#FF00FF","fuchsia":"#FF00FF","orchid":"#DA70D6","amethyst":"#9966CC",
  "brown":"#A52A2A","chocolate":"#7B3F00","coffee":"#6F4E37","tan":"#D2B48C","beige":"#F5F5DC",
  "khaki":"#F0E68C","rust":"#B7410E","terracotta":"#E2725B","copper":"#B87333",
  "black":"#000000","charcoal":"#36454F","gray":"#808080","grey":"#808080","slate":"#708090",
  "silver":"#C0C0C0","white":"#FFFFFF","ivory":"#FFFFF0","off white":"#FAF9F6",
  "navy blue":"#000080","light blue":"#ADD8E6","dark blue":"#00008B","light green":"#90EE90",
  "dark green":"#006400","light yellow":"#FFFFE0","dark yellow":"#B8860B","light pink":"#FFB6C1",
  "dark red":"#8B0000","light red":"#FF7F7F","dark purple":"#301934","light purple":"#CBC3E3",
  "light orange":"#FFD580","dark orange":"#FF8C00","light brown":"#C4A484","dark brown":"#5C4033",
  "midnight blue":"#191970","deep blue":"#003366","ocean blue":"#0077B6","electric blue":"#7DF9FF",
  "neon green":"#39FF14","neon pink":"#FF10F0","neon purple":"#BC13FE","neon yellow":"#DFFF00",
  "dusty rose":"#DCAE96","blush":"#DE5D83","wine":"#722F37","berry":"#8A2BE2",
  "forest":"#228B22","moss":"#8A9A5B","pine":"#01796F","jade":"#00A86B",
  "aqua blue":"#00B5E2","ice blue":"#D6F0FF","powder blue":"#B0E0E6","periwinkle":"#CCCCFF",
  "sand":"#C2B280","desert":"#C19A6B","clay":"#B66E41","stone":"#928E85",
  "golden":"#DAA520","amber":"#FFBF00","honey":"#EB9605","lemon yellow":"#FFF44F",
  "cherry":"#D2042D","ruby":"#E0115F","raspberry":"#E30B5D","candy pink":"#FFBCD9",
  "deep teal":"#005F5F","mint green":"#98FB98","seafoam":"#93E9BE","aqua green":"#00FFBF"
};

const COLOR_ALIASES = {
  "blu":"blue","navyblue":"navy blue","skyblue":"sky blue","lightblue":"light blue",
  "darkblue":"dark blue","royalblue":"royal blue","ocean":"ocean blue","greenish":"green",
  "yellowish":"yellow","reddish":"red","pinkish":"pink","purplish":"purple",
  "grey":"gray","offwhite":"off white","hotpink":"hot pink","limegreen":"lime green",
  "forestgreen":"forest green","darkgreen":"dark green","lightgreen":"light green",
  "darkred":"dark red","lightred":"light red","darkpurple":"dark purple","lightpurple":"light purple"
};

const MOOD_TERMS = {
  "calm":["sky blue","sage","mint","lavender"],
  "peaceful":["powder blue","sage","cream","lavender"],
  "luxury":["black","gold","ivory","burgundy"],
  "premium":["navy","gold","cream","charcoal"],
  "dark":["black","charcoal","navy","deep purple"],
  "minimal":["white","charcoal","gray","sage"],
  "nature":["forest green","sage","sand","terracotta"],
  "ocean":["navy","ocean blue","aqua","sand"],
  "sunset":["coral","orange","rose","purple"],
  "summer":["yellow","orange","coral","sky blue"],
  "winter":["navy","ice blue","silver","white"],
  "neon":["neon green","electric blue","neon pink","neon yellow"],
  "pastel":["baby blue","peach","lavender","mint"],
  "earthy":["terracotta","olive","sand","brown"],
  "professional":["navy","steel blue","white","charcoal"],
  "corporate":["navy","blue","white","gray"],
  "romantic":["rose","burgundy","blush","cream"],
  "coffee":["coffee","cream","tan","chocolate"],
  "gaming":["black","electric blue","neon purple","neon green"],
  "tech":["charcoal","cobalt","electric blue","ice blue"]
};

function normalizeQuery(q){
  return q.toLowerCase().trim().replace(/[#,:;|]/g," ").replace(/\s+/g," ");
}
function hexFromQuery(q){
  const raw=normalizeQuery(q);
  const hex=raw.match(/#?[0-9a-f]{6}\b/i);
  if(hex){
    const h=hex[0].startsWith("#")?hex[0]:"#"+hex[0];
    return h.toUpperCase();
  }
  if(BASIC_COLORS[raw]) return BASIC_COLORS[raw];
  if(COLOR_ALIASES[raw] && BASIC_COLORS[COLOR_ALIASES[raw]]) return BASIC_COLORS[COLOR_ALIASES[raw]];
  return null;
}
function colorTokens(q){
  const raw=normalizeQuery(q);
  const found=[];
  Object.keys(BASIC_COLORS).sort((a,b)=>b.length-a.length).forEach(name=>{
    if(new RegExp("\\b"+name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i").test(raw)) found.push(name);
  });
  return [...new Set(found)];
}
function paletteFromTokens(tokens,n){
  const colors=[];
  tokens.forEach(t=>{ if(BASIC_COLORS[t] && !colors.includes(BASIC_COLORS[t])) colors.push(BASIC_COLORS[t]); });
  if(colors.length>=n) return colors.slice(0,n);
  const moodKey=Object.keys(MOOD_TERMS).find(m=>normalizeQuery(qGlobal).includes(m));
  if(moodKey) MOOD_TERMS[moodKey].forEach(t=>{if(colors.length<n && !colors.includes(BASIC_COLORS[t]))colors.push(BASIC_COLORS[t])});
  const fallback=["#111827","#3B82F6","#A7F3D0","#F9FAFB"];
  fallback.forEach(c=>{if(colors.length<n&&!colors.includes(c))colors.push(c)});
  return colors.slice(0,n);
}
let qGlobal="";
function searchPalette(query,n){
  qGlobal=query;
  const q=normalizeQuery(query);
  const exactHex=hexFromQuery(q);
  const tokens=colorTokens(q);

  // Exact named color: always build a palette containing that exact color.
  if(exactHex){
    const exactName=Object.keys(BASIC_COLORS).find(k=>BASIC_COLORS[k]===exactHex) || "Custom color";
    let colors=[exactHex];
    const related=Object.keys(BASIC_COLORS).filter(k=>{
      const h=BASIC_COLORS[k];
      return h!==exactHex && !colors.includes(h);
    });
    related.forEach(k=>{
      if(colors.length<n && (
        (q.includes("dark") && ["black","charcoal","navy","deep purple"].includes(k)) ||
        (q.includes("light") && ["white","ivory","cream","silver"].includes(k)) ||
        (q.includes("pastel") && ["baby blue","peach","lavender","mint"].includes(k))
      )) colors.push(BASIC_COLORS[k]);
    });
    for(const p of all) if(colors.length<n) p.colors.forEach(c=>{if(colors.length<n&&!colors.includes(c))colors.push(c)});
    return {name: exactName[0].toUpperCase()+exactName.slice(1)+" Combination",colors:colors.slice(0,n)};
  }

  if(tokens.length){
    return {name:tokens.map(x=>x.replace(/\b\w/g,m=>m.toUpperCase())).join(" + "),colors:paletteFromTokens(tokens,n)};
  }

  // Exact palette-name matching before fuzzy matching.
  const exact=all.filter(p=>normalizeQuery(p.name)===q && p.colors.length===n);
  if(exact.length) return exact[0];

  // Phrase/mood matching: score by words, then fill from matching palettes.
  const words=q.split(" ").filter(Boolean);
  const scored=all.filter(p=>p.colors.length===n).map(p=>{
    const name=normalizeQuery(p.name);
    let score=0;
    words.forEach(w=>{if(name.includes(w))score+=3});
    return {p,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
  if(scored.length) return scored[0].p;

  // Mood-based generated palette.
  const mood=Object.keys(MOOD_TERMS).find(m=>q.includes(m));
  if(mood) return {name:mood.replace(/\b\w/g,m=>m.toUpperCase())+" Palette",colors:MOOD_TERMS[mood].slice(0,n).map(x=>BASIC_COLORS[x])};

  return null;
}

const palettes=[
["Midnight Ocean",["#071A2B","#0B5E75","#62D2E8"],"Primary / Accent / Highlight"],
["Luxury Noir",["#111111","#B88A44","#F4E8D0"],"Background / Accent / Text"],
["Forest Calm",["#183A2B","#4F7D57","#DCE8D2"],"Primary / Secondary / Background"],
["Royal Violet",["#21113D","#6C3FC4","#D8B4FE"],"Background / Primary / Accent"],
["Sunset Drive",["#32120B","#D94A2B","#FFB35C"],"Background / Primary / Highlight"],
["Arctic Blue",["#102A43","#2F80ED","#BDE7FF"],"Primary / Accent / Background"],
["Coffee House",["#24140F","#7B4B35","#E7C6A3"],"Background / Primary / Surface"],
["Sage Minimal",["#28352C","#718575","#E8EEE7"],"Text / Accent / Background"],
["Cyber Lime",["#10130C","#78FF36","#D8FFB8"],"Background / Accent / Highlight"],
["Berry Night",["#250D1D","#9D315E","#F3A7C1"],"Background / Primary / Accent"],
["Ocean Depth",["#031B24","#087E8B","#7AD9D2"],"Background / Primary / Accent"],
["Terracotta",["#321815","#B64B35","#F3C1A9"],"Text / Primary / Background"],
["Indigo Mist",["#141A38","#4655A5","#B9C2FF"],"Background / Primary / Accent"],
["Peach Cream",["#5A3025","#D9896B","#FFE4D6"],"Text / Primary / Background"],
["Emerald Gold",["#09271B","#198754","#E5B95C"],"Background / Primary / Accent"],
["Pink Punch",["#3A1029","#E83E8C","#FFD0E5"],"Background / Primary / Highlight"],
["Slate Pro",["#17212B","#526777","#DCE4EA"],"Text / Accent / Background"],
["Citrus Dark",["#20250A","#A8C928","#F2F5A0"],"Background / Primary / Accent"],
["Plum Cream",["#301A30","#80527C","#F1DDEB"],"Background / Primary / Surface"],
["Red Signal",["#250A0A","#C62828","#FFB4A9"],"Background / Primary / Accent"]
];

const extra2=[
["Ocean & Sand",["#0B3954","#FFB703"]],["Ink & Mint",["#111827","#6EE7B7"]],["Charcoal & Coral",["#202124","#FF6B6B"]],["Navy & Lemon",["#0F2747","#F5D547"]],["Wine & Rose",["#421B2E","#E8A0BF"]],["Pine & Cream",["#12372A","#F3E9D2"]],["Cobalt & Ice",["#123C73","#C8F1FF"]],["Black & Copper",["#101010","#C47F4B"]],["Moss & Peach",["#344E41","#F7C8B2"]],["Indigo & Lime",["#29256B","#B9F227"]],["Coffee & Blue",["#3A2618","#69B7D8"]],["Rust & Ivory",["#8A3324","#FFF4DF"]],["Deep Teal & Gold",["#063B3B","#D6AA4B"]],["Plum & Mint",["#3A2040","#9FE2BF"]],["Steel & Orange",["#263238","#FF8A3D"]],["Forest & Rose",["#193B2C","#E8A7B5"]],["Purple & Sand",["#4A2C59","#EBCB9B"]],["Blue & Peach",["#163A5F","#FFB08A"]],["Olive & Cream",["#4B4A20","#F4F0D2"]],["Maroon & Blush",["#551A2D","#F0B6C2"]]
];
const extra3=[
["Noir Ocean",["#07111A","#0A4B5A","#D7F9FF"]],["Royal Garden",["#24113D","#3C7A57","#D7E8C8"]],["Warm Studio",["#24130F","#A65337","#F3D1B8"]],["Soft Lavender",["#29263D","#7569A8","#E8E1FF"]],["Monsoon",["#10252B","#357C83","#C5E4DF"]],["Cherry Cola",["#2A0E12","#8F2638","#F3A3AD"]],["Golden Hour",["#33200C","#C9812D","#FFE2A7"]],["Denim Dust",["#17263D","#41658A","#CAD9EA"]],["Palm Shadow",["#102B22","#4B7A5A","#D6E5CE"]],["Neon Violet",["#190D2B","#8B45FF","#E0C7FF"]],["Clay & Sage",["#45271F","#7B9471","#E5DDC8"]],["Berry Cream",["#3A142A","#A84670","#FFE1EE"]],["Deep Space",["#080B18","#303B75","#AAB7FF"]],["Rainy City",["#1B2028","#586676","#D7E0E8"]],["Tropical Night",["#062B2B","#008C7A","#FFE18A"]],["Cocoa Mint",["#34231D","#658C79","#DCE8D7"]],["Electric Blue",["#071A3A","#176BFF","#B9D2FF"]],["Desert Rose",["#3C1E1D","#A65E56","#F0C2AE"]],["Royal Ink",["#17102E","#5531A6","#D9C7FF"]],["Meadow",["#173522","#6C9B54","#E5F0C9"]]
];
const extra4=[
["Aurora UI",["#0B132B","#1C77C3","#5BC0EB","#E8F1F2"]],["Royal Luxe",["#170B2B","#5B2C83","#D4AF37","#FFF4D6"]],["Forest Retreat",["#102A20","#2D6A4F","#95D5B2","#E9F5DB"]],["Sunset Noir",["#24100D","#8E2F23","#E76F51","#F4A261"]],["Ocean Glass",["#071E26","#0B7285","#52B69A","#D8F3DC"]],["Berry Velvet",["#240817","#6D214F","#B85C8E","#F7C5D8"]],["Minimal Stone",["#1D1D1B","#5E5E59","#B9B9AE","#F1F1EA"]],["Cyber Forest",["#07140E","#1E6F45","#78FF36","#D9FFB8"]],["Indigo Sunset",["#14122E","#3D348B","#F18701","#F7B267"]],["Coffee Gold",["#21150F","#634832","#B88A44","#F1DEC2"]],["Blueberry Ice",["#101C38","#3652A4","#7899FF","#E1E8FF"]],["Clay Garden",["#351815","#8C4636","#79966B","#E9DFC9"]],["Plum Mist",["#241326","#704A79","#B99AC0","#F0E5F2"]],["Tropical Pop",["#052F2F","#008C7A","#F4D35E","#EE964B"]],["Red & Gold",["#250909","#9B1C1C","#D4AF37","#FFF1C1"]],["Slate Mint",["#17242A","#3F5C66","#70C1B3","#E7F6F2"]],["Rosewood",["#2B1115","#71313C","#C56A6F","#F2C6C2"]],["Lemon Night",["#151805","#596A18","#C7D92E","#F4F7C5"]],["Deep Purple",["#160D26","#45218C","#8755E6","#DCCBFF"]],["Nordic Blue",["#10202D","#2D5266","#5E9AB3","#E8F4F7"]]
];

let all=[];
function addGeneratedCombinations(){
  const keys=Object.keys(BASIC_COLORS);
  const seen=new Set(all.map(p=>p.colors.join("|")));
  const target={2:90,3:90,4:90};
  [2,3,4].forEach(n=>{
    let made=0;
    // Deterministic combinations using spaced indexes, avoiding duplicate HEX sets.
    for(let i=0;i<keys.length && made<target[n];i++){
      const colors=[];
      for(let j=0;j<n;j++){
        const idx=(i*(j+2)+j*7+3)%keys.length;
        const c=BASIC_COLORS[keys[idx]];
        if(!colors.includes(c)) colors.push(c);
      }
      if(colors.length===n){
        const sig=colors.join("|");
        if(!seen.has(sig)){
          seen.add(sig);
          all.push({name:keys[i].replace(/\b\w/g,m=>m.toUpperCase())+" Mix",colors});
          made++;
        }
      }
    }
  });
}

extra2.forEach(x=>all.push({name:x[0],colors:x[1]}));
extra3.forEach(x=>all.push({name:x[0],colors:x[1]}));
extra4.forEach(x=>all.push({name:x[0],colors:x[1]}));
palettes.forEach(x=>all.push({name:x[0],colors:x[1]}));
addGeneratedCombinations();

let count=3, filter="all", current=null;

function colorForText(hex){
  const c=hex.replace("#",""); const r=parseInt(c.slice(0,2),16),g=parseInt(c.slice(2,4),16),b=parseInt(c.slice(4,6),16);
  return (r*299+g*587+b*114)>150000 ? "#171717" : "#fff";
}
function randomPalette(){
  let candidates=all.filter(p=>p.colors.length===count);
  if(!candidates.length) candidates=all;
  current=candidates[Math.floor(Math.random()*candidates.length)];
  renderCurrent();
}
function renderCurrent(){
  document.getElementById("paletteName").textContent=current.name;
  const p=document.getElementById("palette"); p.innerHTML="";
  current.colors.forEach((hex,i)=>{
    const s=document.createElement("div"); s.className="swatch"; s.style.background=hex;
    const info=document.createElement("div"); info.className="swatch-info";
    info.innerHTML=`<strong>${hex}</strong>${["Primary","Secondary","Accent","Background"][i]||"Color"}`;
    s.appendChild(info); s.title="Click to copy "+hex;
    s.onclick=()=>copy(hex);
    p.appendChild(s);
  });
  document.getElementById("usageText").textContent=current.colors.length===2?"Primary / Accent":current.colors.length===3?"Primary / Accent / Background":"Primary / Secondary / Accent / Background";
  document.getElementById("contrastText").textContent="Click any color to copy its HEX code";
}
function renderGallery(){
  const g=document.getElementById("gallery"); g.innerHTML="";
  let items=all.filter(p=>filter==="all"||p.colors.length===+filter);
  items.forEach(item=>{
    const card=document.createElement("div");card.className="combo";
    const mini=document.createElement("div");mini.className="mini-palette";
    item.colors.forEach(c=>{const x=document.createElement("div");x.className="mini-swatch";x.style.background=c;mini.appendChild(x)});
    const meta=document.createElement("div");meta.className="combo-meta";
    meta.innerHTML=`<strong>${item.name}</strong><span>${item.colors.length} colors</span>`;
    card.append(mini,meta); card.onclick=()=>{current=item;count=item.colors.length;syncButtons();renderCurrent();window.scrollTo({top:document.querySelector(".result-section").offsetTop-80,behavior:"smooth"})};
    g.appendChild(card);
  });
}
function syncButtons(){document.querySelectorAll(".segmented button").forEach(b=>b.classList.toggle("active",+b.dataset.count===count))}
async function copy(text){try{await navigator.clipboard.writeText(text);alert("Copied "+text)}catch(e){}}
document.getElementById("generateBtn").onclick=()=>{
  const q=document.getElementById("prompt").value;
  if(!q.trim()){randomPalette();renderCurrent();return}
  const result=searchPalette(q,count);
  if(result){current=result;renderCurrent()}
  else randomPalette();
};
document.getElementById("shuffleBtn").onclick=randomPalette;
document.getElementById("copyAllBtn").onclick=()=>current&&copy(current.colors.join(", "));
document.querySelectorAll(".segmented button").forEach(b=>b.onclick=()=>{count=+b.dataset.count;syncButtons();randomPalette()});
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderGallery()});
document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("dark");document.getElementById("themeBtn").textContent=document.body.classList.contains("dark")?"☀":"☾"};
document.getElementById("prompt").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("generateBtn").click()});
randomPalette();renderGallery();
