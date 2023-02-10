import { LightningElement } from 'lwc';
// Static JSON imports and other utils import
import { 
    monthDiff,
    yearsJSONData,
    monthJSONData,
    lineItemJSONData
} from 'c/utils'; 

// constants.
const TABLE_COLUMNS = ['Product','Option','Attribute','Revenue Type',
                        'QTY','Unit Price','Start Month','Months',
                        'Revenue Recognition','Commited'];

export default class EcForecastData extends LightningElement {
    // variables.
    recordMap = {};

    yearToSummary = {};
    monthToSummary = {};

    showMonthlyData = false;

    tableColumns = TABLE_COLUMNS;

    // getters start.
    get showMonthlyData() {
        return this.showMonthlyData==false;
    }

    // for fetching lineItem fieldData.
    get fetchTableData() {
        if(!this.recordMap) return null;
        return Object.values(this.recordMap);
    }
    // for fetching years.
    get revenueYearsList() {
        if(!this.yearToSummary) return null;
        return Object.keys(this.yearToSummary);
    }
    // for fetching months
    get revenueMonthsList() {
        if(!this.monthToSummary) return null;
        return Object.keys(this.monthToSummary);
    }
    // for fetching Yearly Summary Data.
    get annualRenenueSummary() {
        if(!this.yearToSummary) return null;
        return Object.values(this.yearToSummary);
    }
    // fetching monthly Revenue. 
    get monthlyRevenueSummary() {
        if(!this.monthToSummary) return null;
        return Object.values(this.monthToSummary);
    }
    // getters end. 

    // lifecycle hooks - start
    connectedCallback() {
        
        this.loadLineItemData();
        this.loadYearsData();
        this.loadMonthsData();
    }
    // lifecycle hooks - end. 

    // methods - start

    //this method fetches and populates years in the recordMap object.
    loadYearsData() {

       let yearsData = yearsJSONData();
       console.log(typeof yearsData);
        if(!yearsData) {
            console.log('LOAD YEARS DATA ...');
            return;
        }
        const {yearsData:yearsList} = yearsData.responseData;
        const recordIdSet = new Set();

        yearsList.forEach(record=>{
            const {year,summaryAmount,lineData} = record;
            lineData.forEach(({recordId,amount})=>{

                if(!this.recordMap[recordId]["yearInfo"]) {
                    this.recordMap[recordId]["yearInfo"] = [];
                }
                this.recordMap[recordId]["yearInfo"].push(amount);
                recordIdSet.add(recordId);
            })
            this.yearToSummary={
                ...this.yearToSummary,
                [year]:summaryAmount
            };
        });
        // adding '-' when we dont have data for that year.
        this.fillInEmptyRecords(recordIdSet,'yearInfo');
    }

    //this method fetches and populates monthsData in the recordMap object.
    loadMonthsData() {

       let monthData = monthJSONData();//fetchJSON(monthsJsonData);
       // null checks for month Data.
       if(!monthData) {
           console.log('LOAD MONTHS DATA FAILED ...');
           return;
       }
       // helper function to calculate monthly summary Data.
       this.prepareMonthSummaryData(monthData.responseData);
       const {linesData,startYear:summaryYear,startMonth:summaryMonth} = monthData.responseData;
       const recordIdSet = new Set();

       linesData.forEach(({recordId,data,startYear,startMonth})=>{
            // initalising array.
            if(!this.recordMap[recordId]["monthInfo"]) {
                this.recordMap[recordId]["monthInfo"] = [];
            }
            recordIdSet.add(recordId);
            // start date compute checks accordingly.
            let diffInMonths = monthDiff(new Date(summaryYear,summaryMonth-1),new Date(startYear,startMonth-1));
            // adding '-' since our product start month is ahead of our summary month and year. 
            while(diffInMonths-->0) {
                data.unshift('-'); // adding  '-' in the begining.
            }
            // storing the product monthly prices in monthInfo key. 
            this.recordMap[recordId]["monthInfo"] = [...data];
       });
       this.fillInEmptyRecords(recordIdSet,'monthInfo');
    }

    //this method fetches and populates lineItemData in the recordMap object.
    loadLineItemData() {
        let lineItemData = lineItemJSONData(); //fetchJSON(lineItemJsonData);
        if(!lineItemData) {
            console.log('NO LINE ITEM DATA');
            return;
        }
        lineItemData.forEach(record=>{
            if(record.productFLIId) {
                // destructure contents from the object. 
                const { 
                    displayUnitPrice,displayQty,committed,
                    months,revenueType,startMonth,
                    revenueRecognitionName:revenueRegName,
                    productFLIId:recordId,
                    attributes:attr,
                    productItemName:productName,
                    optionItemName:optName
                } = record; 
                
                const startMonthDateObj = new Date(startMonth);

                // store it in an object with recordId as key, to uniquely identify.
                this.recordMap[recordId] = {
                    ...this.recordMap[recordId],
                    displayUnitPrice,
                    recordId,
                    displayQty,
                    committed,
                    months,
                    revenueType,
                    productName,
                    startMonth: startMonthDateObj.toLocaleDateString("en-US",{
                        year:'numeric',
                        month: 'long'
                    }),
                    revenueRecognitionName: (revenueRegName==null?'-':revenueRegName),
                    attributes:(attr===null?'-':attr),
                    optionItemName:(optName===null?'-':optName)
                }
            } 
        }); 
    }


    // helper method to fill Empty Cells with - these cells dont have data for that product - (year/month)
    fillInEmptyRecords(recordIdSet,type) {
        let rCount =(type=='yearInfo'?Object.keys(this.yearToSummary).length:Object.keys(this.monthToSummary).length);
    
        recordIdSet.forEach(recordId=>{
            let currRCount = this.recordMap[recordId][type].length;
            while(currRCount<rCount) {
                this.recordMap[recordId][type].push('-');
                currRCount++;
            }
        })
    }

    // Helper Method to creating Monthly Summary
    prepareMonthSummaryData({summaryAmount,startYear,startMonth}) {
        
       for(let i=0; i<summaryAmount.length; ++i) {
            let dt = new Date(startYear,startMonth-1);
            let dateString = dt.toLocaleDateString("en-US",{
                year:'numeric',
                month: 'long'
            });

            this.monthToSummary = {
                ...this.monthToSummary,
                [dateString]:summaryAmount[i]
            }

            // incrementing year / resetting month.
            if(++startMonth>12) {
                startYear++;
                startMonth=1;
            }
        }
    }
    tableViewHandler(event) {
        const {value} = event.detail;
        console.log('Got something in parent >> '+value);
        this.showMonthlyData = (value==='monthlySummary');
    }

    // methods - end. 

 






}