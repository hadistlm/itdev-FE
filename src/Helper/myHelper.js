import React, { Component } from "react";
import SmsIcon from '@material-ui/icons/Sms';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailIcon from '@material-ui/icons/Mail';

const myHelper={
  test:()=>{
    return "test";
  },
  combineText:(basicText,startPos,endPos,insert)=>{
      let myText=basicText;    
      let txtPart_s=myText.substr(0,startPos);
      let txtPart_e=myText.substr(endPos);

      let res=txtPart_s.concat(insert, txtPart_e);  
      return res;
  },
  getMode:(mode="")=>{
    //console.log("myloc",window.location.pathname)
    let list=["sms","email","whatsapp","form"];  

    let path=window.location.pathname;
    let patharr=path.split("/");
    let cekSchedul="";
    
    let myResponse={
         icon:""
        ,mode:"Message"
        ,title:"Message"
        ,schedul:false  
    }
    

    if(patharr.indexOf("scheduler")>=0){
        cekSchedul=" Scheduler";      
        myResponse.schedul=true;
    }

    if(patharr.indexOf("sms")>=0){
        myResponse.icon=<SmsIcon className="ic_icon cl3 ic_row"/>;
        
        myResponse.mode="SMS";
        
        myResponse.title="SMS Broadcast"+cekSchedul;
        
    }
    else if(patharr.indexOf("email")>=0){
        myResponse.icon=<MailIcon className="ic_icon cl3 ic_row"/>;
        
        myResponse.mode="Email";
        
        myResponse.title="Email Broadcast"+cekSchedul;
        
    }
    else if(patharr.indexOf("whatsapp")>=0){
        myResponse.icon=<WhatsAppIcon className="ic_icon cl3 ic_row"/>;
        
        myResponse.mode="WhatsApp";
        
        myResponse.title="Whatsapp Broadcast"+cekSchedul;
        
    }

    if(myResponse[mode]!=undefined) return myResponse[mode]; 
    else if(list.indexOf(mode.toLowerCase()) ) return (patharr.indexOf(mode.toLowerCase())>=0?true:false);

    return {
      myIcon:this.myIcon,
      myMode:this.myMode,
      myTitle:this.myTitle,
      mySchedul:this.mySchedul
    }
  },
  filterItems:(data,keyword)=>{
	  let tmpItems = data;
	  console.log("myFilter test",keyword);
	  console.log("myFilter test",data);
	  return tmpItems.filter((item) => {
		  // return item;
		  let x=true;
		  for (var key in keyword) {
		  	let myS=keyword[key].toLowerCase();
		  	if(myS!="all")
		  	x=item[key].toLowerCase().indexOf(myS) > -1

		  	if(!x) return x;	
		  }

		  return x;

	  });
  },
  searchArray:(key,nameKey, myArray)=>{
    for (let i=0; i < myArray.length; i++) {
          if (myArray[i][key] === nameKey) {
              return i;
          }
    }
    return -1;
  },
  existArray:(key,nameKey, myArray)=>{
    for (let i=0; i < myArray.length; i++) {
          if (myArray[i][key] === nameKey) {
              return true;
          }
    }
    return false;
  },
  setZero:(number)=>
  {
    return (number < 10 ? '0' : '') + number;
  },
  csvToArray: (str, delimiter = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
  },
  arrayToCSV: (objArray) => {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
  }

}
 
export default myHelper;