/**
 * @description       : Utility Class to Determine type of DML Operation and Remove Inaccessible Fields.
 * @author            : Vamsi Mudaliar
 * @group             : 
 * @last modified on  : 02-06-2023
 * @last modified by  : Vamsi Mudaliar
**/
public with sharing class EC_DMLActionUtility {
         /**
     * @author           Vamsi Mudaliar
     * @param sObjList   List Of Sobjects
     * @param dmlAction  DML Operation Like Insert ,Update,delete
     * @return  `SObjectAccessDecision`
     */
    
    public static SObjectAccessDecision getAccessibleDataSObjectAccessDecision(List<sObject> sObjList, String dmlAction) {
        dmlAction = dmlAction.toLowerCase();
        SObjectAccessDecision securityDecision;

        switch on dmlAction {
            when 'query' {
                securityDecision = Security.stripInaccessible(AccessType.READABLE, sObjList);
            }
            when 'insert' {
                securityDecision = Security.stripInaccessible(AccessType.CREATABLE, sObjList);
            }
            when 'update' {
                securityDecision = Security.stripInaccessible(AccessType.UPDATABLE, sObjList);
            }
            when 'upsert' {
                securityDecision = Security.stripInaccessible(AccessType.UPSERTABLE, sObjList);
            }
        }
        return securityDecision;
    }
}