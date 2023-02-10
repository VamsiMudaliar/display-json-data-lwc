/**
 * @description       : 
 * @author            : Vamsi Mudaliar
 * @group             : 
 * @last modified on  : 02-09-2023
 * @last modified by  : Vamsi Mudaliar
**/
@isTest
public with sharing class ContactTriggerHelperTest {

    @TestSetup
    static void makeData(){
        Account acc = new Account(
            Name='Test Account 1'
        );
        insert acc;

        Account acc2 = new Account(
            Name='Test Account 2'  
        );
        insert acc2;
    }

    @IsTest
    static void createACRRecordsOnInsert(){
        List<Account> acc1 = [SELECT id FROM Account WHERE Name='Test Account 1' LIMIT 1];

        Test.startTest();
            try {
                Contact con = new Contact(
                    AccountId=acc1[0].Id,
                    LastName='Vamsi'
                );
                insert con;

                List<AccountContactRole> res = [SELECT Id,AccountId,ContactId FROM AccountContactRole WHERE AccountId=:acc1[0].Id AND ContactId=:con.Id WITH SECURITY_ENFORCED];
                System.assert(!res.isEmpty(),'ACR Record didnt get created');
            }
            catch(Exception ex) {
                    System.assert(false,'Exception Occured');
            }
        Test.stopTest();
        
    }
    @IsTest
    static void createACRRecordsOnUpdate(){
        List<Account> acc1 = [SELECT id FROM Account WHERE Name='Test Account 1' LIMIT 1];
        List<Account> acc2 = [SELECT id FROM Account WHERE Name='Test Account 2' LIMIT 1];

        Test.startTest();
            try {
                Contact con = new Contact(
                    LastName='Test contact',
                    AccountId = acc1[0].Id
                );
                insert con;
                
                con.AccountId = acc2[0].Id;
                update con;

                List<AccountContactRole> res1 = [SELECT Id,AccountId,ContactId FROM AccountContactRole WHERE AccountId=:acc2[0].Id AND ContactId=:con.Id WITH SECURITY_ENFORCED];

                System.assert(!res1.isEmpty(),'New AccountContact Role was not created on the new account');
            }
            catch(Exception ex) {
                System.assert(false,'Exception Occured');
            }
        Test.stopTest();
    }

}