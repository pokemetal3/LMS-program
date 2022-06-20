

let calbtn =document.getElementById('cal');
let result = document.getElementById('result');




calbtn.addEventListener('click', ()=> {

//input 変数
let vc =  parseFloat(document.getElementById('vc').value);
let fvc = parseFloat(document.getElementById('fvc').value);
let fev1 = parseFloat(document.getElementById('fev1').value);
let height = parseFloat(document.getElementById('height').value);
let age = parseInt(document.getElementById('age').value);
let man = document.getElementById('man')

//
let s1vc, s1fvc, s1fev1, s1fev1p;
let s2vc, s2fvc, s2fev1, s2fev1p; 
let s2vclln, s2fvclln, s2fev1lln, s2fev1plln; //正常下限値(LLN)
 
//2001年　日本呼吸器学会
if (man.checked) {
s1vc = 0.045 * height -0.023 * age -2.258;
s1fvc = 0.042 * height -0.024 * age -1.785;
s1fev1 = 0.036 * height -0.028 * age -1.178;
s1fev1p= 0.028 * height -0.190 * age +89.313;
} else {

s1vc = 0.032 * height -0.018 * age -1.178;
s1fvc = 0.031 * height -0.019 * age -1.105;
s1fev1 = 0.022 * height -0.022 * age -0.005;
s1fev1p= -0.090 * height -0.249 * age +111.052;
}



// 2014年　日本呼吸器学会
if (age >= 17 && age <= 90) {



if (man.checked) {
    s2vc =Math.exp(-8.8317 + 2.1043 * Math.log(height) - 0.1382 * Math.log(age) + parseFloat( lsm[age - 17]["VCMM"]));
    s2fvc = Math.exp(-8.8877+ 2.1494 * Math.log(height) - 0.1891 * Math.log(age) + parseFloat( lsm[age - 17]["FVCMM"]));
    s2fev1 = Math.exp(-7.5722 + 1.9393 * Math.log(height) - 0.3068 * Math.log(age) + parseFloat( lsm[age - 17]["FEV1MM"]));
    s2fev1p= Math.exp(1.2578 -0.1948 * Math.log(height) - 0.1220 * Math.log(age) + parseFloat( lsm[age - 17]["pMM"]));

    s2vclln = Math.exp( Math.log(s2vc) + Math.log(1-1.645 * 0.3464 * Math.exp(-2.3730 + 0.0450* Math.log(age) + parseFloat( lsm[age - 17]["VCMS"])))/0.3464);
    s2fvclln = Math.exp( Math.log(s2fvc) + Math.log(1-1.645  * Math.exp(-2.8335 + 0.1726* Math.log(age) + parseFloat( lsm[age - 17]["FVCMS"]))));
    s2fev1lln = Math.exp( Math.log(s2fev1) + Math.log(1-1.645 * Math.exp(-3.044 + 0.2325* Math.log(age) + parseFloat( lsm[age - 17]["FEV1MS"]))));
    s2fev1plln = Math.exp( Math.log(s2fev1p) + Math.log(1-1.645 *(8.905 - 1.799* Math.log(age) + parseFloat( lsm[age - 17]["pML"]))  * Math.exp(-3.266 + 0.15* Math.log(age) + parseFloat( lsm[age - 17]["pMS"]))) / (8.905 - 1.799 * Math.log(age) + parseFloat( lsm[age - 17]["pML"])));

    } else {
    
    s2vc = Math.exp(-8.0707 + 1.9399 * Math.log(height) - 0.1678 * Math.log(age) + parseFloat( lsm[age - 17]["VCFM"]));
    s2fvc = Math.exp(-8.3268 + 2.0137 * Math.log(height) - 0.2029 * Math.log(age) + parseFloat( lsm[age - 17]["FVCFM"]));
    s2fev1 = Math.exp(-6.9428 + 1.8053 * Math.log(height) - 0.3401 * Math.log(age) + parseFloat( lsm[age - 17]["FEV1FM"]));
    s2fev1p= Math.exp(1.2854 - 0.1844 * Math.log(height) - 0.1425 * Math.log(age) + parseFloat( lsm[age - 17]["pFM"]));
    
    s2vclln = Math.exp( Math.log(s2vc) + Math.log(1-1.645 * 0.1268 * Math.exp(-2.7071 + 0.1447* Math.log(age) + parseFloat( lsm[age - 17]["VCFS"])))/0.1268);
    s2fvclln = Math.exp( Math.log(s2fvc) + Math.log(1-1.645  *0.6127* Math.exp(-2.8527 + 0.1881* Math.log(age) + parseFloat( lsm[age - 17]["FVCFS"])))/0.6127);
    s2fev1lln = Math.exp( Math.log(s2fev1) + Math.log(1-1.645 *0.7783 *  Math.exp(-3.1024 + 0.2537* Math.log(age) + parseFloat( lsm[age - 17]["FEV1FS"])))/0.7783);
    s2fev1plln = Math.exp( Math.log(s2fev1p) + Math.log(1-1.645 *(12.989 - 2.987* Math.log(age) + parseFloat( lsm[age - 17]["pFL"]))  * Math.exp(-3.1624 + 0.1068* Math.log(age) + parseFloat( lsm[age - 17]["pFS"]))) / (12.989 - 2.987 * Math.log(age) + parseFloat( lsm[age - 17]["pFL"])));


    }
}


/*
 * 任意の桁で四捨五入する関数
 * @param {number} value 四捨五入する数値
 * @param {number} base どの桁で四捨五入するか（100→小数第2位）
 * @return {number} 四捨五入した値
 */
function orgRound(value, base) {
    return Math.round(value * base) / base;
}


// 結果の表示


let b1 = `VC: ${orgRound(s2vc,100)} L, FVC: ${orgRound(s2fvc,100)} L, FEV1: ${orgRound(s2fev1,100)} L, FEV1%: ${orgRound(s2fev1p ,100)*100} % `;
let b2 = `VC: ${vc} L (${Math.round(vc * 100 /s2vc)}%), FVC ${fvc} L (${Math.round(fvc * 100 /s2fvc)}%), FEV1: ${fev1} L (${Math.round(fev1 * 100 /s2fev1)}%)`;

let b3 = `VC: ${orgRound(s1vc,100)} L, FVC: ${orgRound(s1fvc,100)} L, FEV1: ${orgRound(s1fev1,100)} L, FEV1%: ${orgRound(s1fev1p ,1)} %   `;
let b4 = `VC: ${vc} L (${Math.round(vc * 100 /s1vc)}%), FVC ${fvc} L (${Math.round(fvc * 100 /s1fvc)}%), FEV1: ${fev1} L (${Math.round(fev1 * 100 /s1fev1)}%)`;

let b5 = `VC: ${orgRound(s2vclln,100)} L, FVC: ${orgRound(s2fvclln,100)} L, FEV1: ${orgRound(s2fev1lln,100)} L, FEV1%: ${orgRound(s2fev1plln ,100)*100} % `;


/*
let bun1 = `肺活量基(VC) = ${orgRound(s1vc,100)} L (${Math.round(vc * 100 /s1vc)}%)`;
let bun2 = `肺活量準値(FVC) = ${orgRound(s1fvc,100)} L (${Math.round(fvc * 100 /s1fvc)}%)`;
let bun3 = `1秒量準値(FEV1) = ${orgRound(s1fev1,100)} L (${Math.round(fev1 * 100 /s1fev1)}%)`;


let bun4 = `肺活量基(VC) = ${orgRound(s2vc,100)} L (${Math.round(vc * 100 /s2vc)}%)`;
let bun5 = `肺活量準値(FVC) = ${orgRound(s2fvc,100)} L (${Math.round(fvc * 100 /s2fvc)}%)`;
let bun6 = `1秒量準値(FEV1) = ${orgRound(s2fev1,100)} L (${Math.round(fev1 * 100 /s2fev1)}%)`;

*/

result.innerHTML = "<span style = 'color:blue'> "+ "2014 呼吸機能正常基準値" + "</span>" + "<br>" + b1 + "<br>" + "今回 "+ b2+ "<br><br>" + "正常下限値(LLN)" +"<Br>" + b5
 + "<br><br><br>"+ "<span style = 'color:blue'> "+ "2001 呼吸機能正常基準値" + "</span>" + "<br>" + b3 + "<br>" + "今回 "+ b4;





// alert( bun1 + '\n' + bun2 + '\n'+ bun3 + '\n' + '2014' + '\n' + bun4+ '\n' + bun5 + '\n' + bun6);

})
