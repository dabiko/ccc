 var report_header={
          TITLE:         'CCC PLC REPORTS',
      SUBTITLE:         '*****NO SUB TITLE*****',
      EXTRA_TITLE:         '*****NO SUB TITLE*****',
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
      
                      },
       BRANCH_ZEROLESS:         {
          
                       100: 'BAMENDA',
                       200: 'BATIBO',
                       300: 'WARDA',
                       400: 'REPUBLIQUE',
                       500: 'BUEA',
                       600: 'KUMBA',
                       700: 'LIBERTE',
                       800: 'BONABERI',
                       900: 'TIKO',
                       1000: 'SAPHIR',
                       1100: 'ACROPOLE',   
                       1200: 'BAFOUSSAM',
                       1300: 'HEAD OFFICE',
                       1400: 'KRIBI',
                       1500: 'MUYUKA',
                       1600: 'LIMBE',
                       1700: 'BIYEMASSI',
                       1800: 'NDOGPASSI',
                       1900: 'BAMBILI',
                       999:'TOTAL',
          
                      },
}

var header_body={
   
    
}

var signature_footer={
    
    SIGNATURE: 'SIGNATURES',
    SIGNATORY_ONE: 'JOHN DOE',
    SIGNATORY_TWO: 'JOHN DOE',
    SIGNATORY_THREE: 'JOHN DOE',
    SIGNATORY_FOUR: 'JOHN DOE',
    
}

var report_footer={
  FOOTER_DATA :{}, 
}


var report_CONF={
    HEADER:{ 
    START: 0,
    STOP: 7,
    HEIGHT_LABEL_ONE_INFO:80,
    WIDTH_LABEL_ONE_INFO:200,
    PAGE_ORIENTATION:'P',
    HEIGHT_LABEL_TWO:80,
    HEIGHT_LABEL_ONE:80,
    WIDTH_LABEL_TWO:350,
    WIDTH_LABEL_ONE:70,
    HEIGHT_LABEL_TWO_INFO:80,
    WIDTH_LABEL_TWO_INFO:480,    
    TITLE_WIDTH:250,    
    SUB_TITLE_WIDTH:250,    
    SUB_TITLE_HEIGHT:60, 
    EXTRA_TITLE_WIDTH:250,    
    EXTRA_TITLE_HEIGHT:80, 
    TITLE_HEIGHT:40,  
    SUB_TITLE_SIZE:11,
    EXTRA_TITLE_SIZE:10,
    TITLE_SIZE:14,
    EXPORT_NAME:'ccc_plc_report'
           },
    
    FOOTER:{  
    START: 7,
    STOP: 14,
    HEIGHT_LABEL_ONE:80,
    WIDTH_LABEL_ONE:70,
    HEIGHT_LABEL_ONE_INFO:80,
    WIDTH_LABEL_ONE_INFO:200,
    HEIGHT_LABEL_TWO:80,
    WIDTH_LABEL_TWO:350,
    HEIGHT_LABEL_TWO_INFO:80,
    WIDTH_LABEL_TWO_INFO:480,
    FOOTER_SIZE:5,
    },
    
    
}


// this is used to specify reports for the amotization table
var definer = {
      BRANCH: '00000',
      NAME_OF_BENEFICIARY:        'JOHN DOE',
      ID_CARD_NO:           '000000000',
      CONTACT_ADDRESS:    'WORLD ST 0000',
      AMOUNT_GRANTED:         '00000000',
      DURATION_OF_LOAN:   '00 MONTHS',       // true = speed up export of large tables with hidden cells (hidden cells will be exported !)
      LOAN_PERIOD_FROM:            '00-00-0000',
      TO_:            '00-00-0000',
      EFFECTIVE_DATE_OF_LOAN:            '00-00-0000',
      ACCOUNT:         '3700000000-00',
      LOAN_CODE:         '000000',
      EMERGENCY:         'Y/N',
      INTEREST_RATE:         '00%',
      EMERGENCY:         'Y/N',
      CLIENT:         '000000',
      TOTAL_LOAN:         '000 000 000',
      TOTAL_INTEREST:         '000 000 000',
      LOAN_APPLICATION_FEE:         '000 000 000',
      HANDLING_CHARGES:         '000 000 000',
      TOTAL_VAT:         '000 000 000',
      GRAND_TOTAL:         '000 000 000',   
}


 



$(document).on("click", '#uni_key', function () {
      
      var export_name= $('.naming_doc').parent().attr('id');
    chartinfo.doc= new jsPDF(report_CONF.HEADER.PAGE_ORIENTATION,'pt','a4');        
      
$('#hidden_table').NormtableExport({fileName: export_name,
                        type: 'pdf',
                        jspdf: {format: 'a4',
                                orientation: report_CONF.HEADER.PAGE_ORIENTATION,
                                margins: {left:20, right:10, top:100, bottom:20},
                                
                                autotable: {tableExport: {
                                                fontSize: 7.5,
                                                doc:chartinfo.doc,
                            onAfterAutotable: footer_calc()   
                                                    }}
                               }
                       }); 
    

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


 var chart_holder;     
 var partner_checker=0;
 var ans;
var temp1;
var temp2;
var date1;
var date2;
var temp3;
var temp4;
var _remote_host='http://172.16.10.14:5000';

var tod = new Date();
var dd = String(tod.getDate()).padStart(2, '0');
var mm = String(tod.getMonth() + 1).padStart(2, '0'); 
var yyyy = tod.getFullYear();
tod = mm + '/' + dd + '/' + yyyy;

var chartinfo = {
    label: 'CCC PLC REPORT',
    title: 'REPORT CHART',
    I_D: '',
    doc: new jsPDF('p','pt','a4'),
    table_height: 0,
    dater: tod,
    remote_host:'http://172.16.10.14:5000',
    type:'bar',
    header_type:1,
     table_menu:'<th> LABEL </th><th>DATA 1 </th><th> DATA 2</th>',
    table_header:'',
    table_footer:'</tbody></table>',
    doc_margins: {left:68, right:52, top:160, bottom:160},
    multi_label:['A','B'],
    chart_data:{},
    open_label:['data1','data2','data3','data4','data5'],
    multi_colorer:['#33CEFF','#026D8F','#012E3C'],
    colorer: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#a9f5e6', '#E6B333', '#3366E6', '#f5b8ee', '#99FF99', '#f2f596', '#c7f5ca', '#c8a3e6', '#E6B3B3', '#770000', '#f26dc3', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#f7aa66', '#B366CC', '#66bdf7', '#B33300', '#66E64D', '#7e7ea6', '#E666FF', '#991AFF', '#4DB3FF', '#1AB399', '#E666B3', '#80f29e', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CC5C00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF', "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" , "#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0", "#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" , "#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" , "#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" , "#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" , "#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d", "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977", "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b", "#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf", "#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234", "#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158", "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647", "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3", "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec", "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7", "#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8", "#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16", "#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce", "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997", "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be", "#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba", "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043", "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56", "#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f", "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49", "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9", "#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4", "#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06", "#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a", "#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065", "#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35", "#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44", "#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67", "#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff", "#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6", "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca",
    //switching color gradient to almonst invisible 
    'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)'],
   monther: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"],
   full_monther: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
     get titlemaker () {
        return this.title;
    },
    set titlemaker (name) {
       
        this.title = name;
       
    },
    
    get labelmaker () {
        return this.label;
    },
    set labelmaker (name) {
       
        this.label = name;
       
    }, 
    get multi_labelmaker () {
        return this.multi_label;
    },
    set multi_labelmaker (lab) {
       
        this.multi_label = lab;
       
    },
     get multi_colormaker () {
        return this.multi_label;
    },
    set multi_colormaker (colors) {
       
        this.multi_colorer = colors;
       
    },
    get colormaker(){
        return this.colorer;
        
    },
     get Monthsmaker(){
        return this.monther;
        
    }, 
    get Full_Monthsmaker(){
        return this.full_monther;
        
    },
       get bottom_labeller(){
        return this.open_label;
        
    }, 
    set bottom_labeller(lab){
       this.open_label = lab;
        
    },
     set I_D_Maker(name) {
       
        this.I_D = name;
       
    },
    get I_D_Maker(){
        return this.I_D;
        
    },
    
 
    get doc_Maker(){
        return this.doc;
        
    },
     
      set height_t(ht) {
       
        this.table_height = ht;
       
    },
    get height_t(){
        return this.table_height;
        
    },
    
      set margins_t(ht) {
       
        this.doc_margins = ht;
       
    },
    get margins_t(){
        return this.doc_margins;
        
    },
    
    
}



