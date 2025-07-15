
<!DOCTYPE html>
<?php

require_once('resources/loginity.php');
 auth_cuscheck();
_token();
$_SESSION['header']=1;

require_once('header.php');
?>


<section id="content">
<div class="content-wrap">
<div class="container clearfix">
<div class="row clearfix">
<div class="col-md-9">
<img src="images/icons/avatar.jpg" class="alignleft img-circle img-thumbnail notopmargin nobottommargin" alt="Avatar" style="max-width: 84px;">
<div class="heading-block noborder">
<h3> CCC PLC ONLINE </h3>
<span>Howdy ! <?php echo $_SESSION['ccc_cususername']; ?> Fill The Loan Application Form </span>
</div>
<div class="clear"></div>
<div class="row clearfix">
<div class="col-lg-12">

<div id="processTabs">
<ul class="process-steps bottommargin clearfix">
<li>
<a href="#ptab1" id="tab1" class="i-circled i-bordered i-alt divcenter">1</a>
<h5>PERSONAL INFORMATION</h5>
</li>
<li>
<a href="#ptab2" id="tab2" class="i-circled i-bordered i-alt divcenter">2</a>
<h5>SOCIAL STATUS</h5>
</li>
<li>
<a href="#ptab3" id="tab3" class="i-circled i-bordered i-alt divcenter">3</a>
<h5>LOAN DETAILS</h5>
</li>
<li>
<a href="#ptab4" id="tab4" class="i-circled i-bordered i-alt divcenter">4</a>
<h5>EMPLOYMENT</h5>
</li>
</ul>
<div>
    <form class="nobottommargin" id="template-contactform" name="template-contactform" enctype="multipart/form-data">
<div id="ptab1">
<p>Borrow Wisely and Repay Promptly</p>

       <div class="fancy-title topmargin title-dotted-border">
                 <h3> PERSONAL INFORMATION </h3>

             </div> 
    <div id="contact-form-overlay" class="clearfix bottommargin">
            
            <div class="col_full">

                <label for="template-contactform-name">Name<small>*</small></label>
                <input type="text" id="Name" name="Name" class="sm-form-control required" />

            </div>
            <div class="col_half">
                <label for="template-contactform-name"> Account Number <small>*</small></label>
                <input type="text" id="Account_Number" name="Account_Number" class="sm-form-control required" />
            </div>
             <div class="col_half col_last">
               
                <label for="inputState">  BRANCH </label>
                <select id="Branch"  name="Branch" class="form-control">
                    <option value="">CHOOSE ONE</option>
                      <option value="BAMENDA"> 00100: BAMENDA</option>
                      <option value="BATIBO"> 00200: BATIBO</option>
                       <option value="WARDA">00300: WARDA</option>
                       <option value="REPUBLIQUE">00400: REPUBLIQUE</option>
                       <option value="BUEA">00500: BUEA</option>
                       <option value="KUMBA">00600: KUMBA</option>
                       <option value="LIBERTE">00700: LIBERTE</option>
                       <option value="BONABERI">00800: BONABERI</option>
                       <option value="TIKO">00900: TIKO</option>
                       <option value="SAPHIR">01000: SAPHIR</option>
                       <option value="ACROPOLE">01100: ACROPOLE</option>   
                       <option value="BAFOUSSAM">01200: BAFOUSSAM</option>
<!--                       <option value="HEAD OFFICE">01300: HEAD OFFICE</option>-->
                       <option value="KRIBI">01400: KRIBI</option>
                       <option value="MUYUKA">01500: MUYUKA</option>
                       <option value="LIMBE">01600: LIMBE</option>
                       <option value="BIYEMASSI">01700: BIYEMASSI</option>
                       <option value="BAMBILI">01800: NDOGPASSI</option>
                       <option value="BAMBILI">01900: BAMBILI</option>
                       <option value="NGAOUNDERE">00200: NGAOUNDERE </option>
         </select>
    </div>
 <div class="col_full">
                <label for="template-contactform-name">NUMERO IDENTIFIANT UNIQUE (NIU) <small>*</small></label>
                <input type="text" id="NIU" name="NIU" class="required  sm-form-control" />
            </div>
       <div class="col_full">
               
                <label for="inputState">  Identification Papers </label>
                <select id="Identification_Papers"  name="Identification_Papers" class="form-control">
                    <option value="">CHOOSE ONE</option>
                    <option value="National_Identity_Card"> National Identity Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                </select> 
            </div>
            <div class="col_one_third">
                <label for="template-contactform-email"> Identification Number <small>*</small></label>
                <input type="text" id="Identification_Number" name="Identification_Number" class="required code sm-form-control" />
            </div>
             <div class="col_one_third">
                <label for="template-contactform-name">AT  <small>*</small></label>
                <input type="text" id="Done_At" name="Done_At" class="required  sm-form-control" />
            </div>
             <div class="col_one_third col_last">
                <label for="template-contactform-name">ON  <small>*</small></label>
                <input type="date" id="Done_On" name="Done_On" class="required sm-form-control" />
            </div>
            </div>
    
             <div class="fancy-title topmargin title-dotted-border">
                 <h3> PERSONAL ADDRESS </h3>

             </div>
    
     <div id="contact-form-overlay" class="clearfix bottommargin">
            <div class="col_half">
                <label for="template-contactform-name">Mobile Number <small>*</small></label>
                <input type="number" id="mobile_phone" name="mobile_phone" class="required  sm-form-control" />
            </div>
            <div class="col_half col_last">
                <label for="template-contactform-email"> Email Address <small>*</small></label>
                <input type="email" id="email_address" name="email_address" class="required code sm-form-control" />
            </div>

                <div class="col_half">
                <label for="template-contactform-name"> Address <small>*</small></label>
                <input type="text" id="Customer_Address" name="Customer_Address" class="sm-form-control required" />
            </div>
                 <div class="col_half col_last">
                <label for="template-contactform-name">Town <small>*</small></label>
                <input type="text" id="Customer_Town" name="Customer_Town" class="sm-form-control required" />
            </div>
        
        
        </div>
              
             <div class="line"></div>
             <!--    <div id='err'></div>-->

    
<a href="#" class="button button-3d nomargin fright tab-linker" rel="2">NEXT</a>  
</div>
<div id="ptab2">
     <div class="fancy-title topmargin title-dotted-border">
                 <h3> SOCIAL STATUS </h3>

             </div>


             <div id="contact-form-overlay" class="clearfix topmargin bottommargin">
            <div class="col_half">

                <label for="template-contactform-name">Marital Status <small>*</small></label>
             <select id="Marital_Status" name="Marital_Status" class="form-control">
           <option value="">CHOOSE ONE</option>
           <option value="SINGLE">SINGLE</option>
           <option value="MARRIED">MARRIED</option>
           <option value="WIDOWER">WIDOWER</option>
           <option value="DIVORCEE">DIVORCEE</option>
       </select>

            </div>
                 <div id="Spouse_details">
            <div class="col_half col_last">
                <label for="template-contactform-name">Marital Type <small>*</small></label>
                <select id="Marital_Type" name="Marital_Type"  disabled="true" class="form-control">
           <option value="">CHOOSE ONE</option>
           <option value="MONOGAMY">MONOGAMY</option>
           <option value="POLYGAMY">POLYGAMY</option>
       </select>
            </div>
                 
                  <div class="col_half">

                <label for="template-contactform-name">Name of Spouse(s) <small>*</small></label>
                <input type="text" id="Spouse_Name" disabled="true" name="Spouse_Name" class="sm-form-control required" />

            </div>
            
                 <div class="col_half col_last">
                <label for="template-contactform-name">  Spouse(s) Occupation <small>*</small></label>
                <input type="text" id="Spouse_Profession" name="Spouse_Profession" disabled="true" class="sm-form-control required" />
            </div>
                  <div class="col_half">
                <label for="template-contactform-name"> Spouse(s) Mobile Number <small>*</small></label>
                <input type="number" id="Spouse_mobile_phone" disabled="true" name="Spouse_mobile_phone" class="required  sm-form-control" />
            </div>
            <div class="col_half col_last">
                <label for="template-contactform-email"> Spouse(s) Email Address <small>*</small></label>
                <input type="email" id="Spouse_email_address" disabled="true" name="Spouse_email_address" class="required code sm-form-control" />
            </div>
                 
             </div>
             </div>
            
     
 <div class="fancy-title topmargin title-dotted-border">
                 <h3> CONTACT PERSON </h3>

             </div>


             <div id="contact-form-overlay" class="clearfix topmargin bottommargin">
            <div class="col_half">

                <label for="template-contactform-name">Name <small>*</small></label>
                <input type="text" id="Personal_Contact_Name" name="Personal_Contact_Name" class="sm-form-control required" />

            </div>
            <div class="col_half col_last">
                <label for="template-contactform-name">Relationship <small>*</small></label>
                <input type="text" id="Personal_Contact_Relationship" name="Personal_Contact_Relationship" class="sm-form-control required" />
            </div>
                 <div class="col_full">
                <label for="template-contactform-name"> Profession <small>*</small></label>
                <input type="text" id="Personal_Contact_Profession" name="Personal_Contact_Profession" class="sm-form-control required" />
            </div>
                  <div class="col_half">
                <label for="template-contactform-name">Mobile Number <small>*</small></label>
                <input type="text" id="Personal_Contact_mobile_phone" name="Personal_Contact_mobile_phone" class="required  sm-form-control" />
            </div>
            <div class="col_half col_last">
                <label for="template-contactform-email"> Email Address <small>*</small></label>
                <input type="email" id="Personal_Contact_email_address" name="Personal_Contact_email_address" class="required code sm-form-control" />
            </div>
             </div>
    
     <div class="fancy-title topmargin title-dotted-border">
                 <h3> OTHER INFORMATION </h3>

             </div>
     <div id="contact-form-overlay" class="clearfix bottommargin">
           
            <div class="col_half">
       <label for="inputState"> DO YOU HAVE ANY CHILDREN ? </label>
       <select id="Any_Children" name="Any_Children" class="form-control">
           <option value="">CHOOSE ONE</option>
           <option value="YES">YES</option>
           <option value="NO">NO</option>
       </select>
   </div>
            <div id="Children_details">
            <div class="col_half col_last">
                <label for="template-contactform-name"> Number Of Children <small>*</small></label>
                <input type="number" id="Children_Number" disabled="true" name="Children_Number" class="required insurance sm-form-control" />
            </div>
         
             
           <div class="col_full">
                <label for="template-contactform-name">Children(s) Mobile <small>*</small></label>
                <input type="number" id="children_mobile_phone" disabled="true" name="children_mobile_phone" class="required  sm-form-control" />
            </div>
         </div>
                <div class="col_full">
       <label for="inputState"> ARE YOU A MEMBER OF AN ASSOCIATION ? </label>
       <select id="Association_Member" name="Association_Member" class="form-control">
           <option value="">CHOOSE ONE</option>
           <option value="YES">YES</option>
           <option value="NO">NO</option>
       </select>
   </div>
         <div id='association_details'>
<div class="col_half"> <label for="template-contactform-name">ASSOCIATION NAME <small>*</small></label> <input type="text" id="Association_Name" name="Association_Name" class="required sm-form-control" disabled="true"/> </div>
<div class="col_half col_last"> <label for="template-contactform-name"> MEETING VENUE <small>*</small></label> <input type="text" id="Association_Venue" name="Association_Venue" class="required sm-form-control" disabled="true" /> </div>
<div class="col_half"> <label for="template-contactform-email"> NAME OF THE ASSOCIATION\'S PRESIDENT <small>*</small></label> <input type="text" id="Association_President" name="Association_President" class="required code sm-form-control" disabled="true" /> </div>
<div class="col_half col_last"><label for="template-contactform-name"> PRESIDENT CONTACT <small>*</small></label> <input type="number" id="President_Contact" name="President_Contact" class="required sm-form-control"  disabled="true" /></div>
         </div>
        <div class="clear"></div>
    </div>
    
    
<div class="line"></div>
<a href="#" class="button button-3d nomargin tab-linker" rel="1">PREVIOUS</a>
<a href="#" class="button button-3d nomargin fright tab-linker" rel="3"> NEXT</a>
</div>
<div id="ptab3">
   
  <div class="fancy-title topmargin title-dotted-border">
<h3>LOAN REQUEST </h3>

</div>   
    
       
     <div id="contact-form-overlay" class="clearfix topmargin bottommargin">
         

    
         
   <div class="col_one_third">
       <label for="inputState"> AMOUNT OF LOAN REQUESTED?</label>
  <input type="text" id="Amount_requested" name="Amount_requested" class="required code sm-form-control" />
   </div>
<!--   <div id="Existing_Account_Details"> </div>-->
   <div class="col_one_third">
       <label for="inputState"> PROPOSE DURATION (IN MONTHS) </label>
 <input type="number" id="Loan_duration" name="Loan_duration" class="required code sm-form-control" />
   </div>                   

    <div class="col_one_third col_last">

                <label for="template-contactform-name">CHOOSE YOUR LOAN TYPE (FROM LIST BELOW)<small>*</small></label>
             <select id="Loan_Type" name="Loan_Type" class="form-control">
           <option value="">CHOOSE ONE</option>
           <option value="LONG TERM">LONG TERM</option>
           <option value="SHORT TERM">SHORT TERM</option>
           <option value="CONTRACT FINANCING">CONTRACT FINANCING</option>
           <option value="BILL DISCOUNTING">BILL DISCOUNTING</option>
           <option value="REAL ESTATE">REAL ESTATE</option>
           <option value="SCHOOL">SCHOOL LOANS</option>
           <option value="EQUIPMENT">EQUIPMENT LOANS</option>
           <option value="AGRICULTURE">AGRICULTURE</option>
           <option value="ECHA">ECHA</option>
       </select>

            </div>
    
       <div class="col_full">
           <label for="template-contactform-email"> PURPOSE <small>*</small></label>
           <TEXTAREA type="text" id="Loan_purpose" name="Loan_purpose" class="required Loan_purpose sm-form-control"></TEXTAREA>
       </div>
       <div class="col_full"> <label for="template-contactform-email"><small> Bring along all justification to any of our closest branches </small></label></div>


       <div class="col_full">
           <label for="template-contactform-email"> PROPOSED SECURITY<small>*</small></label>
           <input type="text" id="Loan_security" name="Loan_security" class="required Loan_purpose sm-form-control"/>
       </div>
       <div class="col_full"> <label for="template-contactform-email"><small> To be authenticated before disbursement </small></label></div>
         <div class="col_half ">
                <label for="template-contactform-email"> Principal Means of Repayment <small>*</small></label>
                <input type="text" id="Principal_Payment_Means" name="Principal_Payment_Means" class="required code sm-form-control" />
            </div>
          <div class="col_half col_last ">
       <label for="inputState"> OTHER MEANS OF PAYMENT? </label>
       <select id="Other_Payment_Means" name="Other_Payment_Means" class="form-control">
           <option value="">CHOOSE ONE</option>
           <option value="YES">YES</option>
           <option value="NO">NO</option>
       </select>
   </div>
    
            <div id="other_repayment">
   <div class="col_half ">
                <label for="template-contactform-email">Other Means of Repayment <small>*</small></label>
                <input type="text" id="Secondary_Payment_Means" disabled="true" name="Secondary_Payment_Means" class="required code sm-form-control" />
            </div>
         
         <div class="col_half col_last">
                <label for="template-contactform-email"> SOURCE OF FUNDS <small>*</small></label>
                <input type="text" id="Source_Of_Funds" disabled="true" name="Source_Of_Funds" class="required code sm-form-control" />
            </div>
         </div>
            </div>
      <div class="fancy-title topmargin title-dotted-border">
<h3>SURETY DETAILS </h3>

</div> 
    
      <div id="contact-form-overlay" class="clearfix bottommargin">
             <div class="col_full"> <label for="template-contactform-email"><small> As surety, I understand that the amount suretied shall be deducted from my total savings, salary or any other account maintained in books of Community Credit Company (CCC) Plc, if the said loan is not fully repaid, I shall be jointly responsible in paying the loan granted to the grantee if the grantor elects to jointly recover any outstanding balance forcefully or otherwise which include debiting my account  </small></label></div>
            <div class="col_full">

                <label for="template-contactform-name">Surety Name<small>*</small></label>
                <input type="text" id="Surety_Name" name="Surety_Name" class="sm-form-control required" />

            </div>
       <div class="col_full">
               
                <label for="inputState">  Identification Papers </label>
                <select id="Surety_Identification_Papers"  name="Surety_Identification_Papers" class="form-control">
                    <option value="">CHOOSE ONE</option>
                    <option value="Surety_National_Identity_Card"> National Identity Card</option>
                    <option value="Surety_Passport">Passport</option>
                    <option value="Surety_Driving_License">Driving License</option>
                </select> 
            </div>
            <div class="col_one_third">
                <label for="template-contactform-email"> Identification Number <small>*</small></label>
                <input type="text" id="Surety_Identification_Number" name="Surety_Identification_Number" class="required code sm-form-control" />
            </div>
             <div class="col_one_third">
                <label for="template-contactform-name">AT  <small>*</small></label>
                <input type="text" id="Surety_Done_At" name="Surety_Done_At" class="required  sm-form-control" />
            </div>
             <div class="col_one_third col_last">
                <label for="template-contactform-name">ON  <small>*</small></label>
                <input type="date" id="Surety_Done_On" name="Surety_Done_On" class="required  sm-form-control" />
            </div>
           
                 <div class="col_full">
                <label for="template-contactform-name"> Surety's Profession <small>*</small></label>
                <input type="text" id="Surety_Contact_Profession" name="Surety_Contact_Profession" class="sm-form-control required" />
            </div>
                  <div class="col_half">
                <label for="template-contactform-name">Mobile Number <small>*</small></label>
                <input type="text" id="Surety_Contact_mobile_phone" name="Surety_Contact_mobile_phone" class="required  sm-form-control" />
            </div>
            <div class="col_half col_last">
                <label for="template-contactform-email"> Email Address <small>*</small></label>
                <input type="email" id="Surety_Contact_email_address" name="Surety_Contact_email_address" class="required code sm-form-control" />
            </div>
            </div>
    
    
    
<div class="line"></div>
<a href="#" class="button button-3d nomargin tab-linker" rel="2">PREVIOUS</a>
<a href="#" class="button button-3d nomargin fright tab-linker" rel="4">NEXT</a>
</div>
<div id="ptab4">
<div class="fancy-title topmargin title-dotted-border">
                 <h3> EMPLOYMENT INFORMATION </h3>

             </div> 
    <div id="contact-form-overlay" class="clearfix bottommargin">
            
            <div class="col_full">
                <label for="template-contactform-name"> CURRENT EMPLOYER <small>*</small></label>
                <input type="text" id="Current_Employer" name="Current_Employer" class="required insurance sm-form-control" />
            </div>
           <div class="col_half ">
                <label for="template-contactform-name">EMPLOYMENT_DATE <small>*</small></label>
                <input type="date" id="Employment_Date" name="Employment_Date" class="required  sm-form-control" />
            </div>
             <div class="col_half col_last">
                <label for="template-contactform-name">MATRICULE <small>*</small></label>
                <input type="text" id="Matricule" name="Matricule" class="required  sm-form-control" />
            </div>
        <div class="clear"></div>
        <div class="fancy-title topmargin title-dotted-border">
                 <h6> EMPLOYER'S ADDRESS </h6>

             </div> 
        
       <div class="col_half">
                <label for="template-contactform-name">MOBILE NUMBER<small>*</small></label>
                <input type="number" id="Employer_Mobile_Phone" name="Employer_Mobile_Phone" class="required  sm-form-control" />
            </div>
            <div class="col_half col_last">
                <label for="template-contactform-email"> EMAIL ADDRESS <small>*</small></label>
                <input type="email" id="Employer_Email_Address" name="Employer_Email_Address" class="required code sm-form-control" />
            </div>
              <div class="col_one_third">
                <label for="template-contactform-email"> QUARTER/STREET <small>*</small></label>
                <input type="text" id="Employer_Street" name="Employer_Street" class="required code sm-form-control" />
            </div>
             <div class="col_one_third">
                <label for="template-contactform-name"> TOWN  <small>*</small></label>
                <input type="text" id="Employer_Town" name="Employer_Town" class="required  sm-form-control" />
            </div>
             <div class="col_one_third col_last">
                <label for="template-contactform-name"> REGION  <small>*</small></label>
                <input type="text" id="Employer_Region" name="Employer_Region" class="required  sm-form-control" />
            </div>
         <div class="clear"></div>
        <div class="fancy-title topmargin title-dotted-border">
                 <h6> INCOME DETAILS</h6>

             </div> 
             <div class="col_half">
                <label for="template-contactform-email"> AVERAGE MONTHLY SALARY <small>*</small></label>
                <input class="sm-form-control" type="number" id="Average_Monthly_Salary" name="Average_Monthly_Salary" class="required code sm-form-control" />
            </div>
       <div class="col_half col_last">
       <label for="inputState"> DO YOU HAVE OTHER SOURCES OF INCOME?</label>
       <select id="Other_Income_Sources" name="Other_Income_Sources" class="form-control">
           <option value="">CHOOSE ONE</option>
           <option value="YES">YES</option>
           <option value="NO">NO</option>
       </select>
   </div>
        <div class="col_full"><label for="template-contactform-email"> WHAT ARE YOUR OTHER SOURCES ? (IF ANY) <small>*</small></label> <textarea type="text" id="Other_Sources_Details" name="Other_Sources_Details"  class="required Other_Sources_Details sm-form-control" disabled="true"></textarea></div>
             <div class="col_full">
                <label for="template-contactform-email"> AVERAGE MONTHLY INCOME <small>*</small></label>
                <input type="number" id="Average_Monthly_Income" name="Average_Monthly_Income" class="required code sm-form-control" />
            </div>
         <div class="fancy-title topmargin title-dotted-border">
                 <h6>FIXED MONTHLY EXPENDITURES</h6>

             </div> 
        

                <div class="col_half">
                <label for="template-contactform-name"> MONTHLY RENTS <small>*</small></label>
                <input type="number" id="Rents" name="Rents" class="sm-form-control required" />
            </div>
                 <div class="col_half col_last">
                <label for="template-contactform-name">FEEDING <small>*</small></label>
                <input type="number" id="Feeding" name="Feeding" class="sm-form-control required" />
            </div>
        
               <div class="col_half ">
                <label for="template-contactform-name">TRANSPORTATION <small>*</small></label>
                <input type="number" id="Transportation" name="Transportation" class="required  sm-form-control" />
            </div>
             <div class="col_half col_last">
                <label for="template-contactform-name">BILLS <small>*</small></label>
                <input type="number" id="Utility_Bills" name="Utility_Bills" class="required  sm-form-control" />
            </div>
        
         <div class="col_one_fourth">
                <label for="template-contactform-email"> SOCIAL CONTRIBUTIONS <small>*</small></label>
                <input type="number" id="Social_Contributions" name="Social_Contributions" class="required code sm-form-control" />
            </div>
             <div class="col_one_fourth">
                <label for="template-contactform-name"> DONATIONS (FAMILY EXP)  <small>*</small></label>
                <input type="number" id="Donations" name="Donations" class="required  sm-form-control" />
            </div>
             <div class="col_one_fourth">
                <label for="template-contactform-name"> HEALTH  <small>*</small></label>
                <input type="number" id="Health" name="Health" class="required  sm-form-control" />
            </div>
             <div class="col_one_fourth col_last">
                <label for="template-contactform-name"> OTHERS  <small>*</small></label>
                <input type="number" id="Other_Expenses" name="Other_Expenses" class="required  sm-form-control" />
            </div>
        
         <div class="col_full">
                <label for="template-contactform-email"> ESTIMATED TOTAL MONTHLY EXPENDITURE (FCFA) <small>*</small></label>
                <input type="number" id="Average_Monthly_Expenditure" name="Average_Monthly_Expenditure" class="required code sm-form-control" />
            </div>
        
        
        
                <div class="col_full">
       <label for="inputState"> ANY ACCOUNT WITH OTHER BANKS ? </label>
       <select id="Account_Other_Banks" name="Account_Other_Banks" class="form-control">
           <option value="">CHOOSE ONE</option>
           <option value="YES">YES</option>
           <option value="NO">NO</option>
       </select>
   </div>
    
   <div class="col_full">
        <label for="inputState"> NAME OF BANKS ? </label>
        <textarea id="Name_Of_Banks" name="Name_Of_Banks" disabled="true" class="sm-form-control" ></textarea>
        </div>
                <div class="col_half">
       <label for="inputState"> ENGAGEMENT WITH OTHER FINANCIAL INSTITUTIONS ? </label>
       <select id="Engagement_Other_Banks" name="Engagement_Other_Banks" class="form-control">
           <option value="">CHOOSE ONE</option>
           <option value="YES">YES</option>
           <option value="NO">NO</option>
       </select>
   </div>
        <div class="col_half col_last">
                <label for="template-contactform-email"> ENGAGEMENT AMOUNT (FCFA) <small>*</small></label>
                <input type="number" id="Engagement_Amounts" name="Engagement_Amounts" class="required code sm-form-control" disabled="true" />
            </div>
        <div class="clear"></div>
 
          
<div class="col_full">
<a href="#" class="button button-3d nomargin tab-linker" rel="3">PREVIOUS</a>
<a href="#" class="button button-3d nomargin fright tab-linker"  type="button" name="submit" onclick="  loan_function(); " id="template-contactform-submit" > SUBMIT REQUEST <span id="loader"></span></a>    
</div>
        
        
        </div>
       <div id="contact-form-overlay" class="clearfix topmargin bottommargin">
         
          <p class="beautify">
              Thanks for trusting CCC PLC Online. Please Visit the  Branch you selected to complete the procedure come along side with the following documents<br/>
                 
              </p>
       
               <div class="fancy-title topmargin title-dotted-border">
                 <h6>REQUIRED FROM ALL</h6>

             </div> 
           <p  class="beautify">
                > A Hand Written Application (Starting Clearly the Purpose, Amount and Duration) <br/>
                > Location Plan<br/>
                > Tax Payers Card<br/>
                > A Hand Written Application (Starting Clearly the Purpose, Amount and Duration) <br/>
                > SMS Subscription Form For Applicant And Surety<br/>
               </p>
           <div class="fancy-title topmargin title-dotted-border">
                 <h6>REQUIRED FROM CIVIL SERVANTS</h6>

             </div> 
           <p class="beautify">
               > Certificate of Effective Work Presence <br/>
               > Two Recent Pay Slips<br/>
               > Certificate of Irrevocable Transfer of Funds at most 06 Months Old<br/>
               > Photocopie of Identification Papers for appplicant and surety<br/>
               </p>
           <div class="fancy-title topmargin title-dotted-border">
                 <h6>REQUIRED FROM COMPANY WORKERS</h6>

             </div> 
           <p class="beautify">
                > Emploment Contract of Applicant <br/>
               > Two Recent Pay Slips<br/>
               > Certificate of Irrevocable Transfer of Funds at most 06 Months Old<br/>
               > Photocopie of Identification Papers for appplicant and surety<br/>
               </p>
           <div class="fancy-title topmargin title-dotted-border">
                 <h6>REQUIRED FROM BUSINESSES</h6>

             </div> 
           <p class="beautify">
               >  A Hand Written Application onf the Company's Letter head, bearing the Company's Name and seal <br/>
                > Guarantee (to be perfected before disbursment) <br/>
               > Justitification of Purpose of Facility <br/>
              > Attestation of Location of the Company (Signed by Council of Taxation)<br/>
              > Business Plan and Budget of the Fiscal Year<br/>
              > Audited Financial Statements (Profit or Loss, Balance sheet and cash flow statement for past 3 fiscal year ) (where applicable)<br/>
               > Interim Financial Statement For The Current Year (If Available)<br/>
               > Adminstrative Documents (Articles of Association, Certificate of Incorporation, Business License)<br/>
              
                
            </p>
           <div id='table_builder'></div>
        </div>        
    
</div>
    </form>
</div>
</div>    
</div>
</div>
</div>
<div class="w-100 line d-block d-md-none"></div>
<?php
require_once 'profile_menu.php';

?>
</div>
</div>
</div>
</section>


<?php
require_once 'footer.php';

?>
<script src="js/components/bs-filestyle.js"></script>
<script src="js/customise/loanapply.js"></script>
<script src="resources/utilities.js"></script>

<script>
  document.getElementById("logoffner").addEventListener("click", logger_off);
   
    function logger_off(){
    
 $.ajax({
 
url: 'resources/logoff_cus.php',
type: "GET",
dataType: "html",
contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
processData: false,

    statusCode: {
        200: function () {
            console.log("200 - Success");
        },
        404: function(request, status, error) {
            console.log("404 - Not Found");
            console.log(error);
            location.href = "404";
        },
        503: function(request, status, error) {
            console.log("503 - Server Problem");
            console.log(error);
            location.href = "403";
        }
    },
    error: function (jqXHR, status, error) {
        var message= "Request: "+jqXHR+"Status: "+status+"Error Msg: "+error;
        swal("Error!", message, "error");
            console.log(jqXHR);
            console.log(status);
            console.log(error);
         jQuery("#preview_display").html('');
    }
  }).done( function(text)
  {
//   text = text.replace(/[^a-zA-Z0-9 ]/g, '');
//     var text= JSON.parse(data);
    if(text==0){
           console.log('Validated_logout..........');
               window.location='login';            

          }
            else{
                 console.log(text);            
  swal({
                            title: "LOGOUT Error ",
                            text:  text,
                             type: 'error',
                            showConfirmButton: true
                        });    
                              

  
     
            }
     
         jQuery("#loader").html('');
      });  
    
    
    
    
    }
     

    
    </script>






<script>
		$(function() {
			$( "#processTabs" ).tabs({ show: { effect: "fade", duration: 400 } });
			$( ".tab-linker" ).click(function() {
				$( "#processTabs" ).tabs("option", "active", $(this).attr('rel') - 1);
				return false;
			});
		});
	</script>
