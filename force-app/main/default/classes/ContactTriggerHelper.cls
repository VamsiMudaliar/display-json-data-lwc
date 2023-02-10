/**
 * @description       : 
 * @author            : Vamsi Mudaliar
 * @group             : 
 * @last modified on  : 02-07-2023
 * @last modified by  : Vamsi Mudaliar
**/
public with sharing class ContactTriggerHelper {

    private static final String ROLE_NAME = 'Billing';

    /**
    * @description 
    * @author Vamsi Mudaliar | 02-06-2023 
    * @param newList 
    **/
    public static void createACRRecords(List<Contact> newList,Map<Id,Contact> oldMap) {
    
        Set<Id> accountIdSet = new Set<Id>();
        Map<Id,Id> accToFirstConRecMap = new Map<Id,Id>();
        List<AccountContactRole> acRoleRecordsList = new List<AccountContactRole>();

        for(Contact conRecord:newList) {
            if(conRecord.AccountId!=null || conRecord.AccountId!= oldMap.get(conRecord.Id).AccountId) {
                accountIdSet.add(conRecord.AccountId);
            }
        }

        // for getting the latest contact record sorting Contacts with descending so that record with least created date will be updated at last. 
        for(Contact con:[SELECT Id,AccountId FROM Contact WHERE AccountId IN :accountIdSet  WITH SECURITY_ENFORCED ORDER BY CreatedDate DESC]) {
            accToFirstConRecMap.put(con.AccountId,con.Id);
        }
        List<AccountContactRole> existingACRoleList = [SELECT Id, Role 
                                                    FROM AccountContactRole 
                                                    WHERE AccountId IN :accountIdSet AND Role=:ROLE_NAME WITH SECURITY_ENFORCED];
        if(!existingACRoleList.isEmpty()) {
            return;
        }
        for(Id accId : accToFirstConRecMap.keySet()) {

            acRoleRecordsList.add(new AccountContactRole(
                AccountId=accId,
                ContactId = accToFirstConRecMap.get(accId),
                Role = ROLE_NAME
            ));
        }
        if(!acRoleRecordsList.isEmpty()) {
            SObjectAccessDecision securityDecision = EC_DMLActionUtility.getAccessibleDataSObjectAccessDecision(acRoleRecordsList, 'insert');
            insert securityDecision.getRecords();    
        }
    }


}