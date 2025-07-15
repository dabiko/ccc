var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var EXP={

    START_WIDTH: 0,
    START_HEIGHT: 7,
    HEADER_HEIGHT:20,
    PAGES:0,
    COMPANY:'Community Credit Company',
    COM_ADDRESS_ONE:'Administrative Head Office',
    COM_ADDRESS_TWO:'Boulevard de la Liberté',
    COM_ADDRESS_THREE:'BP 2768 Douala',
    COM_PHONE:'(237) 233 42 83 86',
    COM_EMAIL:'contact@cccplc.net',
    COM_WEBSITE:'www.cccplc.net',
    PAGE_ORIENTATION:'P',
    CLIENT_HEADER:'LOAN APPLICANT: ',
    CLIENT_NAME:'MBAH DOE',
    CLIENT_PHONE:'(237) 000 000 000',
    CLIENT_ADDRESS:'SIC CACAO-BARRY TS',
    CLIENT_EMAIL:'camtest@gmail.com',
    CLIENT_ACCOUNT:'372132731',
    CLIENT_BRANCH:'01900',
    TITLE:'LOAN FILE #0000',    
    LOAN_DATE_LABEL:'APPLICATION DATE: ',    
    LOAN_DATE:'18-09-2023',    
    LOAN_AMOUNT_LABEL: 'AMOUNT: ',    
    LOAN_AMOUNT: '5000000 FCFA',
    DURATION: '95 MONTHS',    
    DURATION_LABEL: 'DURATION: ',
    TODAY: mm + '/' + dd + '/' + yyyy,
    LOAN_ID: '#00023',
    EXPORT_NM:'LOAN_APPLICATION',
    get EXPORT_NAME(){
      return  this.EXPORT_NM+'_'+this.CLIENT_NAME+'_'+this.TODAY;
    } 
}



$(document).on("click", '#uni_key', function () {
      EXP.EXPORT_NM='LOAN_APPLICATION';
      
      var export_name= $('.naming_doc').parent().attr('id');
    console.log(1+'------step')
var element=document.getElementById('hidden_table');
 var opt = {
           backgroundColor:"#fff",
            margin: [200, 10, 60, 7], //top, left, buttom, right, window.devicePixelRatio
            filename: EXP.EXPORT_NAME,
            enableLinks: true,
            image: {type: 'jpeg',quality: 0.98},
            html2canvas: {dpi: 192, scale:3, y:0,x:0,scrollY:0,scrollX:0, windowWidth:800,letterRendering: true,  useCORS: true},
             pagebreak: {avoid: 'tr'},
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait', compressPDF: true, precision:32 },
        };
        var worker = html2pdf();
            console.log(worker);
            worker.set(opt)
                  .from(element)
                  .toPdf()
                  .get('pdf')
                  .then(function (doc) {
                     var totalPages = doc.internal.getNumberOfPages();
    console.log(2+'------step');
//                 doc.text('This is the header text');
                console.log(totalPages);
                doc.setFontSize(11.55);
                   doc.addFileToVFS('./pdf/SourceSansPro-Regular.ttf', fonted);
                   doc.addFont('./pdf/SourceSansPro-Regular.ttf', 'SourceSansPro-Regular', 'normal');
                doc.setFont('SourceSansPro-Regular');
                 console.log(doc.getFontList());
                doc.setTextColor(150);
                
   for (i = 1; i <= totalPages; i++) {
     doc.setPage(i);
        const elem = document.createElement('canvas');
       var ctx = elem.getContext("2d");
       var img = document.getElementById("scream");
       ctx.drawImage(img,0,0,90,84);
       doc.addImage(elem, 'PNG',5,15); 
       doc.setTextColor(85, 85, 85);
       doc.setFontSize(14.7);
       EXP.START_WIDTH=doc.internal.pageSize.getWidth();
      EXP.START_HEIGHT=doc.internal.pageSize.getHeight();
      // doc.setFont('SourceSansPro-Regular');
         console.log(3+'------step')
        doc.setTextColor(85, 85, 85);
       // doc.setTextColor(176, 196, 221);
        
        doc.text(EXP.COMPANY, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT); 
        doc.setTextColor(120,120,120);
        doc.setFontSize(9.7);
        doc.text(EXP.COM_ADDRESS_ONE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+15); 
        doc.setFontSize(7.7);
        doc.text(EXP.COM_ADDRESS_TWO, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+25); 
        doc.text(EXP.COM_ADDRESS_THREE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+35); 
        doc.text(EXP.COM_PHONE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+45); 
        doc.setTextColor(48, 76, 141);
        doc.text(EXP.COM_EMAIL, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+55); 
        doc.text(EXP.COM_WEBSITE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+66);
        doc.setDrawColor(160,160,160);
        doc.setLineWidth(0.1);
        doc.line(0, EXP.HEADER_HEIGHT+80 , 700,  EXP.HEADER_HEIGHT+80);
        doc.setFillColor(255, 102, 0);
        doc.rect(5, EXP.HEADER_HEIGHT+105, 5, 60,'F');
        doc.setFontSize(8.7);
        doc.setTextColor(152,152,152);
        doc.text(EXP.CLIENT_HEADER, (EXP.START_WIDTH/90), EXP.HEADER_HEIGHT+ 95); 
        doc.setFontSize(11.7);
        doc.setTextColor(120,120,120);
        doc.text(EXP.CLIENT_NAME, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+115); 
        doc.setFontSize(7.7);
        doc.text(EXP.CLIENT_ACCOUNT, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+125); 
        doc.text(EXP.CLIENT_BRANCH, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+135); 
        doc.text(EXP.CLIENT_PHONE, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+145); 
        doc.text(EXP.CLIENT_ADDRESS, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+155);
        doc.setTextColor(48, 76, 141);
        doc.text(EXP.CLIENT_EMAIL, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+165); 
        doc.setFontSize(18.7);
        // doc.setTextColor(48, 76, 141);
       doc.setTextColor(176, 196, 221);
        doc.text(EXP.TITLE+''+EXP.LOAN_ID, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+120); 
//        doc.setTextColor(120,120,120);
        
        doc.setTextColor(255, 102, 0);
        doc.setFontSize(12.7);
        doc.text(EXP.LOAN_AMOUNT_LABEL +''+EXP.LOAN_AMOUNT, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+140); 
        doc.setTextColor(152,152,152);
        doc.setFontSize(8.7);
        doc.text(EXP.LOAN_DATE_LABEL +''+EXP.LOAN_DATE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+150); 
        doc.text(EXP.DURATION_LABEL+''+EXP.DURATION, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+160); 

   
   
        // doc.setDrawColor(48, 76, 141);
   
        doc.text('Loan Page  ' + i + ' of ' + totalPages, (EXP.START_WIDTH/2.2), (EXP.START_HEIGHT - 50));
        doc.setDrawColor(176, 196, 221);
        doc.setLineWidth(0.1);
        doc.line(0, EXP.START_HEIGHT - 40 , 700,  EXP.START_HEIGHT - 40);
        doc.setFillColor(255, 102, 0);
        doc.setFont('courier');
       doc.setFontSize(6);
       doc.text('ARRETE MINEFI N°: 0008 MINEFI du 19 Jan 2017 DECISION COBAC N° D-2016/204  CERT. INCORPORATION N° NW/CO/28/98/2004 N° CONTRIBUABLE:M069800014223J', (EXP.START_WIDTH/38), (EXP.START_HEIGHT - 20)); 
       doc.text('-----------------------------  CCC PLC ONLINE '+EXP.TODAY+'-------------------------------', (EXP.START_WIDTH/5), (EXP.START_HEIGHT - 10)); 
      doc.setFont('SourceSansPro-Regular');
//      doc.setFont('SourceSansPro-Regular');
//       
//       doc.text('Page my name test this is for after ' + i + ' of ' + totalPages, (EXP.START_WIDTH/3.0), (EXP.START_HEIGHT - 20));
//     
//  doc.text('Page my name test my fonts at gmico limco ' + i + ' of ' + totalPages, (EXP.START_WIDTH/2.25), (EXP.START_HEIGHT - 10)); 
       
   }
                 }).save();  





    
    
    
      });

$(document).on("click", '#uni_key_accounts', function () {
      EXP.EXPORT_NM = 'ACCOUNT_OPENING';
      EXP.CLIENT_HEADER = 'ACCOUNT_HOLDER';
      EXP.TITLE = 'ACCOUNT FILE #00';
      EXP.LOAN_DATE_LABEL= 'OPENING_DATE: ';
      EXP.LOAN_AMOUNT_LABEL= 'ACCOUNT: ';
      EXP.DURATION_LABEL= 'EXISTING_ACCOUNT_NUM: ';
      var export_name= $('.naming_doc').parent().attr('id');
    console.log(1+'------step')
var element=document.getElementById('hidden_table');
 var opt = {
           backgroundColor:"#fff",
            margin: [200, 10, 60, 7], //top, left, buttom, right, window.devicePixelRatio
            filename: EXP.EXPORT_NAME,
            enableLinks: true,
            image: {type: 'jpeg',quality: 0.98},
            html2canvas: {dpi: 192, scale:3, y:0,x:0,scrollY:0,scrollX:0, windowWidth:800,letterRendering: true,  useCORS: true},
             pagebreak: {avoid: 'tr'},
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait', compressPDF: true, precision:32 },
        };
        var worker = html2pdf();
            console.log(worker);
            worker.set(opt)
                  .from(element)
                  .toPdf()
                  .get('pdf')
                  .then(function (doc) {
                     var totalPages = doc.internal.getNumberOfPages();
    console.log(2+'------step');
//                 doc.text('This is the header text');
                console.log(totalPages);
                doc.setFontSize(11.55);
                   doc.addFileToVFS('./pdf/SourceSansPro-Regular.ttf', fonted);
                   doc.addFont('./pdf/SourceSansPro-Regular.ttf', 'SourceSansPro-Regular', 'normal');
                doc.setFont('SourceSansPro-Regular');
                 console.log(doc.getFontList());
                doc.setTextColor(150);
                
   for (i = 1; i <= totalPages; i++) {
     doc.setPage(i);
        const elem = document.createElement('canvas');
       var ctx = elem.getContext("2d");
       var img = document.getElementById("scream");
       ctx.drawImage(img,0,0,90,84);
       doc.addImage(elem, 'PNG',5,15); 
       doc.setTextColor(85, 85, 85);
       doc.setFontSize(14.7);
       EXP.START_WIDTH=doc.internal.pageSize.getWidth();
      EXP.START_HEIGHT=doc.internal.pageSize.getHeight();
      // doc.setFont('SourceSansPro-Regular');
         console.log(3+'------step')
        doc.setTextColor(85, 85, 85);
       // doc.setTextColor(176, 196, 221);
        
        doc.text(EXP.COMPANY, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT); 
        doc.setTextColor(120,120,120);
        doc.setFontSize(9.7);
        doc.text(EXP.COM_ADDRESS_ONE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+15); 
        doc.setFontSize(7.7);
        doc.text(EXP.COM_ADDRESS_TWO, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+25); 
        doc.text(EXP.COM_ADDRESS_THREE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+35); 
        doc.text(EXP.COM_PHONE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+45); 
        doc.setTextColor(48, 76, 141);
        doc.text(EXP.COM_EMAIL, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+55); 
        doc.text(EXP.COM_WEBSITE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+66);
        doc.setDrawColor(160,160,160);
        doc.setLineWidth(0.1);
        doc.line(0, EXP.HEADER_HEIGHT+80 , 700,  EXP.HEADER_HEIGHT+80);
        doc.setFillColor(255, 102, 0);
        doc.rect(5, EXP.HEADER_HEIGHT+105, 5, 60,'F');
        doc.setFontSize(8.7);
        doc.setTextColor(152,152,152);
        doc.text(EXP.CLIENT_HEADER, (EXP.START_WIDTH/90), EXP.HEADER_HEIGHT+ 95); 
        doc.setFontSize(11.7);
        doc.setTextColor(120,120,120);
        doc.text(EXP.CLIENT_NAME, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+115); 
        doc.setFontSize(7.7);
        doc.text(EXP.CLIENT_ACCOUNT, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+125); 
        doc.text(EXP.CLIENT_BRANCH, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+135); 
        doc.text(EXP.CLIENT_PHONE, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+145); 
        doc.text(EXP.CLIENT_ADDRESS, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+155);
        doc.setTextColor(48, 76, 141);
        doc.text(EXP.CLIENT_EMAIL, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+165); 
        doc.setFontSize(18.7);
        // doc.setTextColor(48, 76, 141);
       doc.setTextColor(176, 196, 221);
        doc.text(EXP.TITLE+''+EXP.LOAN_ID, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+120); 
//        doc.setTextColor(120,120,120);
        
        doc.setTextColor(255, 102, 0);
        doc.setFontSize(12.7);
        doc.text(EXP.LOAN_AMOUNT_LABEL +''+EXP.LOAN_AMOUNT, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+140); 
        doc.setTextColor(152,152,152);
        doc.setFontSize(8.7);
        doc.text(EXP.LOAN_DATE_LABEL +''+EXP.LOAN_DATE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+155); 
        doc.text(EXP.DURATION_LABEL+''+EXP.DURATION, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+165); 

   
   
        // doc.setDrawColor(48, 76, 141);
   
        doc.text('Loan Page  ' + i + ' of ' + totalPages, (EXP.START_WIDTH/2.2), (EXP.START_HEIGHT - 50));
        doc.setDrawColor(176, 196, 221);
        doc.setLineWidth(0.1);
        doc.line(0, EXP.START_HEIGHT - 40 , 700,  EXP.START_HEIGHT - 40);
        doc.setFillColor(255, 102, 0);
        doc.setFont('courier');
       doc.setFontSize(6);
       doc.text('ARRETE MINEFI N°: 0008 MINEFI du 19 Jan 2017 DECISION COBAC N° D-2016/204  CERT. INCORPORATION N° NW/CO/28/98/2004 N° CONTRIBUABLE:M069800014223J', (EXP.START_WIDTH/38), (EXP.START_HEIGHT - 20)); 
       doc.text('-----------------------------  CCC PLC ONLINE '+EXP.TODAY+'-------------------------------', (EXP.START_WIDTH/5), (EXP.START_HEIGHT - 10)); 
      doc.setFont('SourceSansPro-Regular');
//      doc.setFont('SourceSansPro-Regular');
//       
//       doc.text('Page my name test this is for after ' + i + ' of ' + totalPages, (EXP.START_WIDTH/3.0), (EXP.START_HEIGHT - 20));
//     
//  doc.text('Page my name test my fonts at gmico limco ' + i + ' of ' + totalPages, (EXP.START_WIDTH/2.25), (EXP.START_HEIGHT - 10)); 
       
   }
                 }).save();  





    
    
    
      });



$(document).on("click", '#uni_key_cv', function () {
      EXP.EXPORT_NM = 'JOB_APPLICATION';
      EXP.CLIENT_HEADER = 'JOB APPLICANT';
      EXP.TITLE = 'APPLICANT FILE #00';
      EXP.LOAN_DATE_LABEL= 'OPENING_DATE: ';
      EXP.LOAN_AMOUNT_LABEL= 'POSITION: ';
      EXP.DURATION_LABEL= 'EXPECTED_SALARY: ';
      var export_name= $('.naming_doc').parent().attr('id');
    console.log(1+'------step')
var element=document.getElementById('hidden_cover');
 var opt = {
           backgroundColor:"#fff",
            margin: [230, 20, 60, 7], //top, left, buttom, right, window.devicePixelRatio
            filename: EXP.EXPORT_NAME,
            enableLinks: true,
            image: {type: 'jpeg',quality: 0.98},
            html2canvas: {dpi: 192, scale:3, y:0,x:0,scrollY:0,scrollX:0, windowWidth:800,letterRendering: true,  useCORS: true},
             pagebreak: {avoid: 'tr'},
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait', compressPDF: true, precision:32 },
        };
        var worker = html2pdf();
            console.log(worker);
            worker.set(opt)
                  .from(element)
                  .toPdf()
                  .get('pdf')
                  .then(function (doc) {
                     var totalPages = doc.internal.getNumberOfPages();
    console.log(2+'------step');
//                 doc.text('This is the header text');
                console.log(totalPages);
                doc.setFontSize(11.55);
                   doc.addFileToVFS('./pdf/SourceSansPro-Regular.ttf', fonted);
                   doc.addFont('./pdf/SourceSansPro-Regular.ttf', 'SourceSansPro-Regular', 'normal');
                doc.setFont('SourceSansPro-Regular');
                 console.log(doc.getFontList());
                doc.setTextColor(150);
                
   for (i = 1; i <= totalPages; i++) {
     doc.setPage(i);
        const elem = document.createElement('canvas');
       var ctx = elem.getContext("2d");
       var img = document.getElementById("scream");
       ctx.drawImage(img,0,0,90,84);
       doc.addImage(elem, 'PNG',5,15); 
       doc.setTextColor(85, 85, 85);
       doc.setFontSize(14.7);
       EXP.START_WIDTH=doc.internal.pageSize.getWidth();
      EXP.START_HEIGHT=doc.internal.pageSize.getHeight();
      // doc.setFont('SourceSansPro-Regular');
         console.log(3+'------step')
        doc.setTextColor(85, 85, 85);
       // doc.setTextColor(176, 196, 221);
        
        doc.text(EXP.COMPANY, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT); 
        doc.setTextColor(120,120,120);
        doc.setFontSize(9.7);
        doc.text(EXP.COM_ADDRESS_ONE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+15); 
        doc.setFontSize(7.7);
        doc.text(EXP.COM_ADDRESS_TWO, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+25); 
        doc.text(EXP.COM_ADDRESS_THREE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+35); 
        doc.text(EXP.COM_PHONE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+45); 
        doc.setTextColor(48, 76, 141);
        doc.text(EXP.COM_EMAIL, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+55); 
        doc.text(EXP.COM_WEBSITE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+66);
        doc.setDrawColor(160,160,160);
        doc.setLineWidth(0.1);
        doc.line(0, EXP.HEADER_HEIGHT+80 , 700,  EXP.HEADER_HEIGHT+80);
        doc.setFillColor(255, 102, 0);
        doc.rect(5, EXP.HEADER_HEIGHT+105, 5, 60,'F');
        doc.setFontSize(8.7);
        doc.setTextColor(152,152,152);
        doc.text(EXP.CLIENT_HEADER, (EXP.START_WIDTH/90), EXP.HEADER_HEIGHT+ 95); 
        doc.setFontSize(11.7);
        doc.setTextColor(120,120,120);
        doc.text(EXP.CLIENT_NAME, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+115); 
        doc.setFontSize(7.7);
        doc.text(EXP.CLIENT_ACCOUNT, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+125); 
        doc.text(EXP.CLIENT_BRANCH, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+135); 
        doc.text(EXP.CLIENT_PHONE, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+145); 
        doc.setTextColor(48, 76, 141);
        doc.text(EXP.CLIENT_EMAIL, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+155); 
        doc.text(EXP.CLIENT_ADDRESS, (EXP.START_WIDTH/35), EXP.HEADER_HEIGHT+165);
        doc.setFontSize(18.7);
        // doc.setTextColor(48, 76, 141);
       doc.setTextColor(176, 196, 221);
        doc.text(EXP.TITLE+''+EXP.LOAN_ID, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+120); 
//        doc.setTextColor(120,120,120);
        
        doc.setTextColor(255, 102, 0);
        doc.setFontSize(12.7);
        doc.text(EXP.LOAN_AMOUNT_LABEL +''+EXP.LOAN_AMOUNT, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+140); 
        doc.setTextColor(152,152,152);
        doc.setFontSize(8.7);
        doc.text(EXP.LOAN_DATE_LABEL +''+EXP.LOAN_DATE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+155); 
        doc.text(EXP.DURATION_LABEL+''+EXP.DURATION, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+165); 

   
   
        // doc.setDrawColor(48, 76, 141);
   
        doc.text('CV_&_JOB_APPLICATION  ' + i + ' of ' + totalPages, (EXP.START_WIDTH/2.2), (EXP.START_HEIGHT - 50));
        doc.setDrawColor(176, 196, 221);
        doc.setLineWidth(0.1);
        doc.line(0, EXP.START_HEIGHT - 40 , 700,  EXP.START_HEIGHT - 40);
        doc.setFillColor(255, 102, 0);
        doc.setFont('courier');
       doc.setFontSize(6);
       doc.text('ARRETE MINEFI N°: 0008 MINEFI du 19 Jan 2017 DECISION COBAC N° D-2016/204  CERT. INCORPORATION N° NW/CO/28/98/2004 N° CONTRIBUABLE:M069800014223J', (EXP.START_WIDTH/38), (EXP.START_HEIGHT - 20)); 
       doc.text('-----------------------------  CCC PLC ONLINE '+EXP.TODAY+'-------------------------------', (EXP.START_WIDTH/5), (EXP.START_HEIGHT - 10)); 
      doc.setFont('SourceSansPro-Regular');
//      doc.setFont('SourceSansPro-Regular');
//       
//       doc.text('Page my name test this is for after ' + i + ' of ' + totalPages, (EXP.START_WIDTH/3.0), (EXP.START_HEIGHT - 20));
//     
//  doc.text('Page my name test my fonts at gmico limco ' + i + ' of ' + totalPages, (EXP.START_WIDTH/2.25), (EXP.START_HEIGHT - 10)); 
       
   }
                 }).save();  





    
    
    
      });




$(document).on("click", '#uni_key3', function () {
      
      var export_name= $('.naming_doc').parent().attr('id');

   var doc = new jsPDF();
 
//  doc.text(text, 14, 30);

  doc.autoTable({
//       styles : { halign : 'center'}, 
      styles: {font: "rotobo"},
      headStyles :{fillColor : [ 50, 80, 150 ]}, 
      alternateRowStyles: {fillColor : [ 213, 223, 247]}, 
      tableLineColor: [86, 103, 143], 
      tableLineWidth: 0.1,
      lindeWidth:5,
    startY: 35,
       halign: 'center',
                valign: 'middle',
      rowPageBreak: 'avoid',
    margin: { left: 8, right: 8, bottom: 35 },
     didDrawPage: function (datam) {
////    showHead: 'everyPage',
//        var img = new Image(); //this mount a variable to img
//    img.src = 'images/signaturePDF.png' //asign the src to the img variable
//    doc.addImage(img, 'png', 100, doc.autoTable.previous.finalY + lineHeight * 1.5 + offsetY, 20, 20)// use the method doc.autoTable.previous.finalY + lineHeight * 1.5 + offsetY to be able to position the images of the signature below the table at a safe distance from it
//    doc.text(90, doc.autoTable.previous.finalY + lineHeight * 5 + offsetY, "Juan Jose Urquiza") // later add the text below the signature
//    doc.text(89, doc.autoTable.previous.finalY + lineHeight * 6 + offsetY, "Gerente FinanceAR") //more text
         
      datam.settings.margin.top = 35;   
     let elem = document.createElement('canvas');
       let ctx = elem.getContext("2d");
         elem.height=100;
       var img = document.getElementById("scream");
    if (export_name=="Loan_application_situations"){
        var Namer =   $('#Name').val();
    } else{
           var Namer =  $('#Given_Names').val();
    }
  
    
    var subtitle=report_header.SUBTITLE+' '+Namer+'***';
      
var imgData=ctx.getImageData(500,500,590,584);
var data=imgData.data;
for(var i=0;i<data.length;i+=4){
    if(data[i+3]<255){
        data[i]=255;
        data[i+1]=255;
        data[i+2]=255;
        data[i+3]=255;
    }
}
ctx.putImageData(imgData,0,0);
     ctx.drawImage(img,0,0,90,84);
     doc.addImage(elem, 'PNG',5,5); 
    var pageSize = doc.internal.pageSize;
  doc.setFontSize(15);
  doc.text(report_header.TITLE,pageSize.width/3, 20);
     doc.setFontSize(11);
  doc.text(subtitle,pageSize.width/4, 25);
 
//  doc.setTextColor(100);
//
//  // jsPDF 1.4+ uses getWidth, <1.4 uses .width
//  
//  var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
//  var text = doc.splitTextToSize('customer signature', pageWidth - 35, {});    
//         
//         
//     doc.text(text, 14, doc.lastAutoTable.finalY + 10);

     // Footer
//    var str = "Page " + doc.internal.getNumberOfPages();

//    doc.setFontSize(12);  
       
//     let   autotableheight= doc.autoTableEndPosY() + 30;
         
         
      
         
         
         
       },      
         
       drawRow: (row, data) => {
            //-------------------------------
           //-------------------------------
            // Paint double lines bellow cell
            //-------------------------------
            let firstCell = row.cells[0];
            let secondCell = row.cells[1];
           
               let borderLineOffset = 1;
               const columnWidth = data.table.columns[3].width;
               data.doc.line(data.cursor.x - columnWidth, data.cursor.y + row.height - borderLineOffset / 2, data.cursor.x, data.cursor.y + row.height - borderLineOffset / 2);
               data.doc.line(data.cursor.x - columnWidth, data.cursor.y + row.height + borderLineOffset / 2, data.cursor.x, data.cursor.y + row.height + borderLineOffset / 2);
            
            //-------------------------------
            // Paint footer line
            //-------------------------------
         
                data.doc.line(data.cursor.x - data.table.width, data.cursor.y + row.height, data.cursor.x, data.cursor.y + row.height);
                data.doc.line(data.cursor.x - data.table.width, data.cursor.y + row.height, data.cursor.x, data.cursor.y + row.height);
            
        },
        drawHeaderRow: (head, data) => {
            //---------------------------------------
            // Write the line at the bottom of header
            //---------------------------------------
            data.doc.line(data.cursor.x, data.cursor.y + head.height, data.cursor.x + data.table.width, data.cursor.y + head.height);
        },
        
       
      html:"#hidden_table",   
         
         
  })
let x=1
var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
for(var i = 0; i < pageCount; i++) { 
  doc.setPage(i); 
  let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
  doc.setFontSize(12);
  doc.text(' CCC ONLINE page: ' + pageCurrent + '/' + pageCount, 10, doc.internal.pageSize.height - 10);
    
       
    if (x!=pageCount){
      console.log(pageCount+'this is the last position of t')
      var pageSize = doc.internal.pageSize;
    var pageHeight = pageSize.height? pageSize.height: pageSize.getHeight();
    doc.text('***Customer***',  38, pageHeight - 25);       
    doc.text('***Account Manager***',118, pageHeight - 25); 
        console.log(x);
        console.log(i+'iter');
        x++
        
    }
    else
        {
            console.log(x+'HEllo');
            console.log(i+'iter h');
            console.log(pageCount+'this is the last hello')
           let finalY = doc.lastAutoTable.finalY; // The y position on the page
             console.log(i+'this is the last position of t')
          doc.text(20, finalY+20, "Hello!") 
        }
}          
                
                
  doc.save(export_name+'.pdf');
      
      

  });
     

function footer_calc(){
var pageCount = chartinfo.doc.internal.getNumberOfPages();
for(var i = 0; i < pageCount; i++) { 
 var width = chartinfo.doc.internal.pageSize.getWidth();
var height = chartinfo.doc.internal.pageSize.getHeight();

console.log("AT#1: width=" + width + ", height=" + height);
//chartinfo.doc.setPage(i); 
//chartinfo.doc.text(10,10, chartinfo.doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount);
}
}
        $(document).on("click", '#uni_key2', function () {
 
    $('#hidden_table').tableExport({type:'xls',escape:'false'});     

      
      
  });




//this function downloads the a div content into pdf

  $(document).on("click", '#down_key', function () {
      
if(checkinputdate("Please filled both date fields") === true){
 $('#preview_display').tableExport({type:'pdf',escape:'false'});   
}

//this function downloads the from hidden table
});



function universal_header(){
    
     
       const elem = document.createElement('canvas');
       var ctx = elem.getContext("2d");
       var img = document.getElementById("scream");
       ctx.drawImage(img,0,0,90,84);
       chartinfo.doc.addImage(elem, 'PNG',5,5);    
      
          chartinfo.doc.setFontStyle('bold');
          chartinfo.doc.setFontSize(report_CONF.HEADER.TITLE_SIZE);
          chartinfo.doc.text(report_CONF.HEADER.TITLE_WIDTH, report_CONF.HEADER.TITLE_HEIGHT, report_header.TITLE);
          chartinfo.doc.setFontSize(report_CONF.HEADER.SUB_TITLE_SIZE);
          chartinfo.doc.text(report_CONF.HEADER.SUB_TITLE_WIDTH, report_CONF.HEADER.SUB_TITLE_HEIGHT, report_header.SUBTITLE);
          chartinfo.doc.setFontSize(report_CONF.HEADER.EXTRA_TITLE_SIZE);
          chartinfo.doc.text(report_CONF.HEADER.EXTRA_TITLE_WIDTH, report_CONF.HEADER.EXTRA_TITLE_HEIGHT, report_header.EXTRA_TITLE);
    
}



var report_header={
          TITLE:         'CCC PLC REPORTS',
      SUBTITLE:         '*****NO SUB TITLE*****',
      EXTRA_TITLE:         '*****NO SUB TITLE*****',
     ID:'',
     TAB:'',
     CUSTOMER:'',
    STATUS:'',
      HEADER_DATA:{},
      
      BRANCHER:         {
          
                       00100: 'BAMENDA',
                       00200: 'BATIBO',
                       00300: 'WARDA',
                       00400: 'REPUBLIQUE',
                       00500: 'BUEA',
                       00600: 'KUMBA',
                       00700: 'LIBERTE',
                       00800: 'BONABERI',
                       00900: 'TIKO',
                       01000: 'SAPHIR',
                       01100: 'ACROPOLE',   
                       01200: 'BAFOUSSAM',
                       01300: 'HEAD OFFICE',
                       01400: 'KRIBI',
                       01500: 'MUYUKA',
                       01600: 'LIMBE',
                       01700: 'BIYEMASSI',
                       01800: 'NDOGPASSI',
                       01900: 'BAMBILI',
      
                      }
  

}