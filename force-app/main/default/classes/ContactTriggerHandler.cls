/**
 * @description       : 
 * @author            : Vamsi Mudaliar
 * @group             : 
 * @last modified on  : 02-07-2023
 * @last modified by  : Vamsi Mudaliar
**/
public with sharing class ContactTriggerHandler {

    public static void afterInsert(List<Contact> recordsList,Map<Id,Contact> oldMap){
        ContactTriggerHelper.createACRRecords(recordsList,oldMap);
    }
    public static void afterUpdate(List<Contact> recordsList,Map<Id,Contact> oldMap){
        ContactTriggerHelper.createACRRecords(recordsList,oldMap);
    }
    
}