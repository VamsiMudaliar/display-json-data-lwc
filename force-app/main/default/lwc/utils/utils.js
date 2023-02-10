export function yearsJSONData() {
    return {"status":"success","responseData":{"yearsData":[
        {"year":"2019","summaryAmount":"$2,190.80","lineData":[{"recordId":"a2m2G000000AJKQQA4","amount":"$1,045.00"},
        {"recordId":"a2m2G000009H0fIQAS","amount":"$1,100.00"},{"recordId":"a2m2G000009H0fHQAS","amount":"$45.80"}]},
        {"year":"2020","summaryAmount":"$1,874.20","lineData":[{"recordId":"a2m2G000000AJKQQA4","amount":"$665.00"},{"recordId":"a2m2G000009H0fIQAS","amount":"$1,200.00"},{"recordId":"a2m2G000009H0fHQAS","amount":"$9.20"}]},
        {"year":"2021","summaryAmount":"$100.00","lineData":[{"recordId":"a2m2G000009H0fIQAS","amount":"$100.00"}]}]},"message":null}
}
export function monthJSONData() {
   return  {"status":"success","responseData":{"summaryAmount":["$195.00","$199.58","$199.58","$199.58","$199.58","$199.58","$199.58","$199.58","$199.58","$199.58","$199.58","$199.58","$199.62","$195.00","$195.00","$195.00","$195.00","$195.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00"],"startYear":2019,"startMonth":2,
   "linesData":[{"startYear":2019,"startMonth":2,"recordId":"a2m2G000000AJKQQA4","data":["$95.00","$95.00","$95.00","$95.00","$95.00","$95.00","$95.00","$95.00","$95.00","$95.00","$95.00","$95.00","$95.00","$95.00","$95.00","$95.00","$95.00","$95.00"]},
   {"startYear":2019,"startMonth":2,"recordId":"a2m2G000009H0fIQAS","data":["$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00","$100.00"]},
   {"startYear":2019,"startMonth":3,"recordId":"a2m2G000009H0fHQAS","data":["$4.58","$4.58","$4.58","$4.58","$4.58","$4.58","$4.58","$4.58","$4.58","$4.58","$4.58","$4.62"]}]},"message":null}
}

export function lineItemJSONData() {
    return [
        {"unitPrice":95,"startMonth":"2/1/2019","revenueType":"MRC","revenueRecognitionName":null,"revenueRecognitionId":null,"qty":1,"productItemName":"Captio User Delegation","productItemId":"a01A000001gmFXZIA2","productFLIId":"a2m2G000000AJKQQA4","priorMRR":null,"optionItemName":null,"optionItemId":null,"optionFLIId":null,"monthsVR":null,"monthsNRC":null,"monthsMRC":null,"months":18,"displayUnitPrice":"$95.00","displayQty":"1","displayPriorMRR":null,"committed":"No","attributesWithValues":null,"attributes":null},
        {"unitPrice":55,"startMonth":"3/1/2019","revenueType":"NRC","revenueRecognitionName":null,"revenueRecognitionId":null,"qty":1,"productItemName":"TNS Link","productItemId":"a01A000001utm3RIAQ","productFLIId":"a2m2G000009H0fHQAS","priorMRR":null,"optionItemName":null,"optionItemId":null,"optionFLIId":null,"monthsVR":null,"monthsNRC":null,"monthsMRC":null,"months":12,"displayUnitPrice":"$55.00","displayQty":"1","displayPriorMRR":null,"committed":"No","attributesWithValues":null,"attributes":null},
        {"unitPrice":100,"startMonth":"2/1/2019","revenueType":"MRC","revenueRecognitionName":null,"revenueRecognitionId":null,"qty":1,"productItemName":"TNS Link","productItemId":"a01A000001utm3RIAQ","productFLIId":"a2m2G000009H0fIQAS","priorMRR":null,"optionItemName":null,"optionItemId":null,"optionFLIId":null,"monthsVR":null,"monthsNRC":null,"monthsMRC":null,"months":24,"displayUnitPrice":"$100.00","displayQty":"1","displayPriorMRR":null,"committed":"No","attributesWithValues":null,"attributes":null}
    ]
}

export function monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() + 
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

