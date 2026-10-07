function luminance(hex) {
  const c = hex.replace('#','').match(/.{2}/g).map(x => parseInt(x,16)/255).map(v => v <= .04045 ? v/12.92 : Math.pow((v+.055)/1.055,2.4));
  return .2126*c[0]+.7152*c[1]+.0722*c[2];
}
function ratio(a,b){ const [hi,lo]=[luminance(a),luminance(b)].sort((x,y)=>y-x); return (hi+.05)/(lo+.05); }
const pairs = [["#0F172A","#FFFFFF"],["#475569","#FFFFFF"],["#166534","#FFFFFF"],["#B91C1C","#FFFFFF"]];
for (const [fg,bg] of pairs) console.log(`${fg} em ${bg}: ${ratio(fg,bg).toFixed(2)}:1`);
console.log("Use o resultado como evidência; contraste não substitui teste de uso.");
