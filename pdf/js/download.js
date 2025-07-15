

//window.jsPDF = window.jspdf.jsPDF;

//// Convert HTML content to PDF
//function Convert_HTML_To_PDF() {
//    var doc = new jsPDF();
//	
//    // Source HTMLElement or a string containing HTML.
//    var elementHTML = document.querySelector("#contentToPrint");
//
//    doc.html(elementHTML, {
//        callback: function(doc) {
//            // Save the PDF
//            doc.save('document-html.pdf');
//        },
//        margin: [10, 10, 10, 10],
//        autoPaging: 'text',
//        x: 0,
//        y: 0,
//        width: 190, //target width in the PDF document
//        windowWidth: 675 //window width in CSS pixels
//    });
//}

//function Convert_HTML_To_PDF() {
//  window.html2canvas = html2canvas;
//  var doc = new jsPDF(
//    'l', 'pt', 'a4'
//  );
//  doc.html(document.querySelector("body"), {
//    callback: function(pdf) {
//      pdf.save("cv-a4.pdf");
//    }
//  });
//}

//function Convert_HTML_To_PDF() {
////    var doc = new jsPDF();
//const invoiceElement = document.getElementById("contentToPrint");
//
//html2pdf()
//
//  .set({ 
//    
////html2canvas: { scale: 2 }, jsPDF: { unit:"in", format: "letter", orientation: "portrait" },margin:       5, images:        { type: 'jpeg', quality: 0.98 }
//  enableLinks: true,
//    images: { type: 'jpeg', quality: 0.98 },
//     pagebreak: {avoid: 'tr'},
//    html2canvas: {
//      scale: 2,
//      useCORS: true,
//     // width: 310,
//      letterRendering: true,
//       
//    },
//    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compressPDF: true },
//       })
//
//  .from(invoiceElement)
//
//  .save("invoice.pdf");
//}
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
    TITLE:'LOAN FILE #00023',    
    LOAN_DATE_LABEL:'APPLICATION DATE: ',    
    LOAN_DATE:'18-09-2023',    
    LOAN_AMOUNT_LABEL: 'AMOUNT: ',    
    LOAN_AMOUNT: '5000000 FCFA',
    DURATION: '95 MONTHS',    
    DURATION_LABEL: 'DURATION: ',
    TODAY: mm + '/' + dd + '/' + yyyy,
    get EXPORT_NAME(){
      return  'LOAN_APPLICATION'+'_'+this.CLIENT_NAME+'_'+this.TODAY;
    } 
}


function Convert_HTML_To_PDF() {
var element=document.getElementById('contentToPrint');
 var opt = {
            margin: [200, 0, 30, 0], //top, left, buttom, right,
            filename: EXP.EXPORT_NAME,
            enableLinks: true,
            image: {type: 'jpeg',quality: 0.98},
            html2canvas: {dpi: 192, scale: 2, letterRendering: true,  useCORS: true},
             pagebreak: {avoid: 'tr'},
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait', compressPDF: true },
        };
        var worker = html2pdf();
            console.log(worker);
            worker.set(opt)
                  .from(element)
                  .toPdf()
                  .get('pdf')
                  .then(function (doc) {
                     var totalPages = doc.internal.getNumberOfPages();
    
//                 doc.text('This is the header text');
                console.log(totalPages);
                doc.setFontSize(11.55);
                   doc.addFileToVFS('SourceSansPro-Regular.ttf', fonted);
                   doc.addFont('SourceSansPro-Regular.ttf', 'SourceSansPro-Regular', 'normal');
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
        doc.text(EXP.TITLE, (EXP.START_WIDTH/1.5), EXP.HEADER_HEIGHT+120); 
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
}


function builld_page_header (doc){
 //   doc.setFillColor(255, 0, 0);
// setLineWidth(25);
//    doc.line(0, 30, 500, 500,'F');
//doc.setDrawColor(255, 0, 0);
//doc.rect(0, 0, 2, 30,'F');
    //doc.setFontSyle('SourceSansPro')
//    rgb(0, 135, 195)
//    font-size: 14px;
//  font-family: SourceSansPro;
//    #h2
//    font-size: 1.4em; 19.6px
//  font-weight: normal;
//    
//    color: #555555;
//    
//    #normal
//    rgb(119, 119, 119);
//font-family: SourceSansPro;
//font-size: 15.4px
//font-size: 1.1em;
//  color: #777777;
    
  //  doc.setFontSize
    
    
    
}



// html2pdf().from(element).set({
//   margin:       [1, 0, 0, 0], 
//   filename: 'samplepdf.pdf',
//   pageBreak: { mode: 'css', before:'#nextpage1'},
//   jsPDF: {orientation: 'landscape', unit: 'in', format: 'letter'}
//}).toPdf().get('pdf').then(function (pdf) {
//   var totalPages = pdf.internal.getNumberOfPages();
//   for (i = 1; i <= totalPages; i++) {
//     pdf.setPage(i);
//     pdf.setFontSize(10);
//     pdf.setTextColor(150);
//     pdf.text('This is the header text', (pdf.internal.pageSize.getWidth()/2.40), (pdf.internal.pageSize.getHeight()-8));      
//     pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth()/2.25), (pdf.internal.pageSize.getHeight() - 1));
//  }}).save();



