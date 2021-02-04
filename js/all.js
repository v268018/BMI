//Dom 
let weight = document.querySelector('#weight');
let height = document.querySelector('#height');
let calculation = document.querySelector('.calculation');
let bmiList = document.querySelector('#bmiList'); 
let errorMessageH = document.querySelector('.error_MessageH');
let errorMessageW = document.querySelector('.error_MessageW');
let advice = document.querySelector('.advice');
let data = JSON.parse(localStorage.getItem('bmiData'))||[];//瀏覽器如果沒有紀錄就先建立一個陣列

//init 
const deletelistStr=` 
                    <li class="bmi_list-Style d-flex align-items-center        justify-content-center bg-white px-3 mb-3" id="alldelete">
                    
                    <p class="text_Xl font-weight-bold mb-0">全部刪除</p>
                    </li>
                    `;
init();
//event 
height.addEventListener('blur',checkValueH);//檢查使用者輸入
weight.addEventListener('blur',checkValueW);//檢查使用者輸入
calculation.addEventListener('click',result);//計算BMI
bmiList.addEventListener('click',deleteList);//刪除清單
//function
function init(){//讀取之前使用者紀錄(localStorage)
    let bmiListStr="";
    for (let i = 0; i < data.length; i++) {
        bmiListStr+= `
                  <li class="bmi_list-Style  d-flex justify-content-between align-items-center bg-white px-3 mb-3" style="border-left: 3px solid ${data[i].bmiColor};" data-num=${i}>
                        <p class="text_Xl font-weight-bold mb-0">${data[i].bmiStr}</p>
                        <p class="d-flex align-items-center mb-0 ">
                            <span class="text_S">Bmi</span>
                            <span class="text_Xl font-weight-bold ml-2">${data[i].bmi}</span>
                        </p> 
                        <p class="d-flex align-items-center mb-0 ">
                            <span class="text_S">weight</span>
                            <span class="text_Xl font-weight-bold ml-2">${data[i].weight}kg</span>
                        </p>
                        <p class="d-flex align-items-center mb-0 ">
                            <span class="text_S">height</span>
                            <span class="text_Xl font-weight-bold ml-2">${data[i].height}cm</span>
                        </p>
                        <p class="text_S mb-0 ">06-19-2017</p>
                    </li>
                 `
    };   
    if(data.length===0){
        bmiList.innerHTML= "尚未紀錄";
    }else{
        bmiList.innerHTML=bmiListStr+deletelistStr;
        const alldelete =document.querySelector('#alldelete');
        alldelete.addEventListener('click',function(){
            data.splice(0,data.length);
            back();
        })
    }
    
}
function checkValueH(e){//檢查是否使用者輸入是否錯誤(身高體重)
    let userValue = e.target.value;
    if(userValue === "" || userValue === "Nan"){
        errorMessageH.textContent="錯誤-重新輸入";
    }else{
        errorMessageH.textContent="";  
    }
}
function checkValueW(e){//檢查是否使用者輸入是否錯誤(身高體重)
    let userValue = e.target.value;
    if(userValue === "" || userValue === "Nan"){
        errorMessageW.textContent="錯誤-重新輸入";
    }else{
        errorMessageW.textContent="";  
    }
    
}
function result (e){ //紀錄BMI結果
    let weight = document.querySelector('#weight').value;
    let height = document.querySelector('#height').value;
    let date = getTime();
    if(e.target.nodeName ==="IMG" || e.target.nodeName ==="A"){ //返回上一個狀態
        back();
    }
    else if(height === "" || height === "Nan"){
        return;
    }else if(weight === "" || weight === "Nan"){
        return;
    }
   
    else if(e.target.textContent === "看結果"){
        let bmi = (weight/((height/ 100) * (height / 100))).toFixed(2);//取小數點兩位
        console.log(bmi);
        let bmiResult = {};
        if(bmi>=35){
            bmiResult.bmi=bmi;
            bmiResult.height=height;
            bmiResult.weight=weight;
            bmiResult.bmiColor="#FF1200";
            bmiResult.bmiStr="重度肥胖";
            bmiResult.date=date;
            data.push(bmiResult);
            console.log(data);
        }else if(30<=bmi && bmi<35){
            bmiResult.bmi=bmi;
            bmiResult.height=height;
            bmiResult.weight=weight;
            bmiResult.bmiColor="#FF6C03";
            bmiResult.bmiStr="中度肥胖";
            bmiResult.date=date;
            data.push(bmiResult);
            console.log(data);
        }else if(27<=bmi && bmi<30){
            bmiResult.bmi=bmi;
            bmiResult.height=height;
            bmiResult.weight=weight;
            bmiResult.bmiColor="#FF6C03";
            bmiResult.bmiStr="輕度肥胖";
            bmiResult.date=date;
            data.push(bmiResult);
            console.log(data);
        }else if(24<=bmi && bmi<27){
            bmiResult.bmi=bmi;
            bmiResult.height=height;
            bmiResult.weight=weight;
            bmiResult.bmiColor="#FF982D ";
            bmiResult.bmiStr="過重"+"\xa0\xa0\xa0";//加入空白字元讓格式整齊
            bmiResult.date=date;
            data.push(bmiResult);
            console.log(data);     	
        }else if(18.5<=bmi && bmi<24){
            bmiResult.bmi=bmi;
            bmiResult.height=height;
            bmiResult.weight=weight;
            bmiResult.bmiColor="#86D73F";
            bmiResult.bmiStr="理想"+"\xa0\xa0\xa0";//加入空白字元讓格式整齊
            bmiResult.date=date;
            data.push(bmiResult);
            console.log(data);
        }else if(bmi<18.5){
            bmiResult.bmi=bmi;
            bmiResult.height=height;
            bmiResult.weight=weight;
            bmiResult.bmiColor="#31BAF9";
            bmiResult.bmiStr="過輕"+"\xa0\xa0\xa0";//加入空白字元讓格式整齊
            bmiResult.date=date;
            data.push(bmiResult);
            console.log(data);
        };
        upList();
    }
};
function back(){ //回復到上一個 計算 btn狀態
    localStorage.setItem('bmiData',JSON.stringify(data));
    calculation.classList.remove('result_Btn','flex-column','position-relative');
    calculation.classList.add('btn_Style');
    calculation.setAttribute('style',"");//清空style回復原本css
    calculation.innerHTML=`<span class="text_XXl font-weight-bold">看結果</span>`;
    advice.textContent="";
    weight.value="";
    height.value="";
    if(data.length===0){
        bmiList.innerHTML= "尚未紀錄";
    }
}
function upList(e){ //上傳紀錄
    let bmiListStr ="";
    let btnStr ="";
    let root =document.documentElement;
    if(data.length==0){
      back();
    }
    else{
        for (let i = 0; i < data.length; i++) {
            advice.textContent=data[i].bmiStr; 
            root.style.setProperty('--primary',`${data[i].bmiColor}`);
            btnStr = `    
                        <a href="#" class="return_Btn d-flex  justify-content-center align-items-center position-absolute">
                            <img src="https://upload.cc/i1/2020/07/04/fAIxKk.png" alt="return">
                        </a>
                        <span class="text_XXXL font-weight-bold">${data[i].bmi}</span>
                        <span class="text_M font-weight-bold">BMI</span>
                    `
            bmiListStr+= `
                            <li class="bmi_list-Style  d-flex justify-content-between align-items-center bg-white px-3 mb-3" style="border-left: 3px solid ${data[i].bmiColor};" data-num=${i}>
                                    <p class="text_Xl font-weight-bold mb-0">${data[i].bmiStr}</p>
                                    <p class="d-flex align-items-center mb-0 ">
                                        <span class="text_S">Bmi</span>
                                        <span class="text_Xl font-weight-bold ml-2">${data[i].bmi}</span>
                                    </p> 
                                    <p class="d-flex align-items-center mb-0 ">
                                        <span class="text_S">weight</span>
                                        <span class="text_Xl font-weight-bold ml-2">${data[i].weight}kg</span>
                                    </p>
                                    <p class="d-flex align-items-center mb-0 ">
                                        <span class="text_S">height</span>
                                        <span class="text_Xl font-weight-bold ml-2">${data[i].height}cm</span>
                                    </p>
                                    <p class="text_S mb-0 ">${data[i].date}</p>
                                </li>
                        `
        };   
        localStorage.setItem('bmiData',JSON.stringify(data));//把計算好的結果放入瀏覽器做紀錄
        calculation.classList.remove('btn_Style');
        calculation.classList.add('result_Btn','flex-column','position-relative')
        bmiList.innerHTML = bmiListStr+deletelistStr;//絢染紀錄
        const alldelete =document.querySelector('#alldelete');
        alldelete.addEventListener('click',function(){
            data.splice(0,data.length);
            back();
        })
        calculation.innerHTML = btnStr;
        weight.value = "";
        height.value = "";   
    }    
}
function deleteList(e){  //刪除紀錄
    let listNum =  e.target.dataset.num; //讀取每一個li的data的 Dom
    if(e.target.nodeName==="UL"){
        return
    }else if(listNum==undefined){
        return;
    }else{
        data.splice(listNum,1);//刪除選取到的紀錄
        upList();//重新絢染紀錄
    }
}
function getTime(){
    let time = new Date();
    let year = time.getFullYear().toString();
    let mouth= time.getMonth().toString();
    let day= time.getDate().toString();
    let date = year +"-"+ (mouth+1) +"-"+ day;
    return  date;
}