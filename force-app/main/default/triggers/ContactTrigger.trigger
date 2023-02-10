/**
 * @description       : 
 * @author            : Vamsi Mudaliar
 * @group             : 
 * @last modified on  : 02-07-2023
 * @last modified by  : Vamsi Mudaliar
**/
trigger ContactTrigger on Contact (after insert,after update) {
    // after context.
    if(trigger.isAfter){
        if(trigger.isInsert){
            ContactTriggerHandler.afterInsert(trigger.new,trigger.oldMap);
        }
        else if(trigger.isUpdate) {
            ContactTriggerHandler.afterUpdate(trigger.new,trigger.oldMap);
        }
    }
}