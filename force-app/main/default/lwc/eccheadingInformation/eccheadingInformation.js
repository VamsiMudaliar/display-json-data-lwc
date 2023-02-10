import { LightningElement } from 'lwc';



export default class EccheadingInformation extends LightningElement {
    

    optionList = [
        {
            id:1,
            label:'Show Full Attributes',
            displayLabel:'Full Attributes',
            value:'fullAttributes',
            checked:"true"
        },
        {
            id:2,
            label:'Show Monthly Summary',
            displayLabel:'Monthly Summary',
            value:'monthlySummary',
            checked:"false"
        }
    ]
    selectedItem = this.optionList[0];

    selectHandler(event) {
        
        const ele = event.target.value;

        if(!ele) return;

        this.optionList = this.optionList.map(rec=>{
            if(rec.value===ele) {
                rec.checked = "true";
                this.selectedItem = {...rec};
            } else {
                rec.checked = "false";
            }
            return rec;
        })

        this.dispatchEvent(new CustomEvent('select',{
            detail :{
                value: this.selectedItem.value
            }
        }));
    }



}