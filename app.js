
var ref = firebase.database().ref();                           
ref.on("value", function(snapshot){
   //  console.log(JSON.stringify(snapshot.val(), null, 2));
});
// console.log(firebase);
// var ref = firebase.database().ref('NgoName');
// console.log(ref);
if(document.getElementById("NgoForm")){
document.getElementById("NgoForm").addEventListener("submit", function(event){
   alert("submitted successfully");
   event.preventDefault();
   var ngo = {
      name: document.getElementById("ngoname").value,
      email: document.getElementById("ngoemail").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      pinCode: document.getElementById("pincode").value,
      education: document.getElementById("cat1").checked,
      poverty:document.getElementById("cat2").checked,
      children:document.getElementById("cat3").checked,
      women:document.getElementById("cat4").checked,
      health: document.getElementById("cat5").checked,
      science: document.getElementById("cat6").checked,
      energy: document.getElementById("cat7").checked,
      ruralDevelopment: document.getElementById("cat8").checked,
      urbanDevelopment: document.getElementById("cat9").checked,
      tourism: document.getElementById("cat10").checked,
      drinkingWater: document.getElementById("cat11").checked,
      enivronment: document.getElementById("cat12").checked,
      vocationalTraining: document.getElementById("cat13").checked,
      microFinance: document.getElementById("cat14").checked,
      disasterManagement: document.getElementById("cat15").checked,
      artCulture: document.getElementById("cat16").checked
   }
   // console.log(ngo);
   // return(ngo);
    ref.push().set(ngo);
 });
}


 if(document.getElementById("issueForm")){
    document.getElementById("issueForm").addEventListener("submit", function(event){
   event.preventDefault();
   alert("submitted successfully");
   ref.on("value", function(snapshot){
      var ngoString = JSON.stringify(snapshot.val(), null, 2);
      var ngoList= JSON.parse(ngoString);
      var totalRecord =  snapshot.numChildren();
      // console.log(ngoList);
      // console.log(totalRecord);
      for(i=0;i<totalRecord;i++){
            for(j=1;j<=16;j++){
            var issueCatNo="icat"+j;
            if(document.getElementById(issueCatNo).checked){
            category=document.getElementById(issueCatNo).value;
            var ipin= document.getElementById("ipincode").value;
            var pin=Object.values(ngoList)[i].pinCode;
            if(Object.values(ngoList)[i][category] && pin.substring(0,4)==ipin.substring(0,4)){
            // console.log("one sending");
            var mail=Object.values(ngoList)[i].email;
            // console.log(mail);
            var file = document.getElementById("fileupload").files[0];
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function () {
               var dataUri = "data:" + file.type + ";base64," + btoa(reader.result);
               Email.send({
                   Host: "smtp.gmail.com",
                 Username: "sociotogether@gmail.com",
                   Password: "DFGHuiyt&459",
                   To: mail,
                   From: "sociotogether@gmail.com",
                   Subject: "New Task",
                   Body: document.getElementById("desc").value+"\n"+document.getElementById("address").value+"\n"+document.getElementById("icity").value+","+document.getElementById("istate").value+"-"+document.getElementById("ipincode").value,
                   Attachments : [
                     {
                        name : file.name,
                        data : dataUri
                     }]
               }).then(
               //   message => alert(message)
               );
           };
           reader.onerror = function() {
               console.log('there are some problems');
           };
           break;
            }
              
         }
         }
      }
      
   });
 });
}


