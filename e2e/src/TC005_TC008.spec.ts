import {AppPage} from './app.po';
import {browser, element, by,  logging} from 'protractor';

describe('TC005 : Verify that no item is displayed if item searched is not available in list', () => {
    let page: AppPage;

    beforeEach(() => {
       page = new AppPage();
    });

    it('should go to the webpage', () => {
      page.navigateTo();
    });

    it('should set search Item in search Input', () => {
      page.setInputText('xpath','//input[@type="text"]', 'item 5');
    });


    it('verify List of Item is 0', () => {
      element.all(by.xpath('//li')).each(function(arr) {
        expect(arr.length).toEqual(0);
      });
    });

// End of Test case
});

describe('TC006 : Verify that all filtered items should have a call to action', () => {
    let page: AppPage;

    beforeEach(() => {
       page = new AppPage();
    });

    it('should go to the webpage', () => {
      page.navigateTo();
    });

    it('should set search Item in search Input', () => {
      page.setInputText('xpath','//input[@type="text"]', 'Item 5');
    });


    it('verify that all item in list should have button for call to action', () => {
      var allItems = element.all(by.xpath('//ul/li'));
      allItems.count().then(function(itemLength) {
        console.log('List of Items: ' + itemLength);
      });

      var allButtons = element.all(by.xpath('//ul/li/button'));
      allButtons.count().then(function(ItemListCnt) {
        console.log('List of Buttons: ' + ItemListCnt);
      });
      expect(allItems.count()).toEqual(allButtons.count());
    });

// End of Test case
});

describe('TC007 : Verify that parent item is not displayed when user search any item', () => {
    let page: AppPage;
    var ItemSearch = 'Item 2';
    var sSuffix;

    beforeEach(() => {
       page = new AppPage();
    });

    it('should go to the webpage', () => {
      page.navigateTo();
    });

    it('should set search Item in search Input', () => {
      page.setInputText('xpath','//input[@type="text"]', ItemSearch);
    });


    it('verify that all item in list should have button for call to action', () => {
      var ItemName, sParentID = '';
      var allItems = element.all(by.xpath('//ul/li'));

      allItems.count().then(function(ItemListCnt) {
        console.log('Total Items displayed: ', ItemListCnt)
        for(let itemNum=0;itemNum<ItemListCnt;itemNum++) {

          allItems.get(itemNum).getText().then(function(ItemText) {
            ItemName = ItemText.replace("Button", "");
            ItemName = ItemName.replace(/(?:\r\n|\r|\n)/g, "");
          });

          allItems.get(itemNum).getAttribute('class').then(function(ItemClass) {
            if(ItemClass == ''){
              console.log(ItemName, ' is Parent');
              sParentID = ItemName;
            }
            else if (ItemClass == 'indent-1'){
              if (ItemSearch!=''){
                if (ItemName.includes(ItemSearch)){
                  sSuffix = ' is item searched and is  Child Level 1 and have Parent: ' + sParentID;
                }
                else{
                  sSuffix = ' is Child Level 1 and have Parent: ' + sParentID;
                }
              }else{
                sSuffix = ' is Child Level 1 and have Parent: ' + sParentID;
              }
              console.log('>', ItemName, sSuffix);
              sParentID = ItemName;
            }
            else if (ItemClass == 'indent-2'){
            if (ItemSearch!=''){
              if (ItemName.includes(ItemSearch)){
                sSuffix = ' is item searched and is  Child Level 2 and have Parent: ' + sParentID;
              }
              else{
                sSuffix = ' is Child Level 2 and have Parent: ' + sParentID;
              }
            }else{
              sSuffix = ' is Child Level 2 and have Parent: ' + sParentID;
            }
            console.log('>>', ItemName, sSuffix);
            }
          });
        }
      });
    });

// End of Test case
});


describe('TC008 : Verify that page containing information(Item ID, Item Title, Item Parent ID) of the item is displayed correctly when user click on individual button', () => {
    let page: AppPage;
    var searchItem = 'Item 5';

    let homeItemDetails = new Map();

    var ItemNameNumber='',ItemName, sParentID = '',ItemNumber, allItems, selectedItemNameNumber;
    var selectedItemName, selectedItemText;
    beforeEach(() => {
       page = new AppPage();
    });

    it('should go to the webpage', () => {
      page.navigateTo();
      browser.sleep(3000);
    });

    it('display all Item Description', () => {
      allItems = element.all(by.xpath('//ul/li'));

      allItems.count().then(function(ItemListCnt) {
        console.log('Total Items displayed: ', ItemListCnt)
        for(let itemNum=0;itemNum<ItemListCnt;itemNum++) {

          allItems.get(itemNum).getText().then(function(ItemText) {
            ItemName = ItemText.replace("Button", "");
            ItemName = ItemName.replace(/(?:\r\n|\r|\n)/g, "");
          });

          allItems.get(itemNum).getAttribute('class').then(function(ItemClass) {
            ItemNameNumber = ItemName.split(" - ")[0];
            ItemNumber = ItemNameNumber.replace("Item ","").trim();
            if(ItemClass == ''){
              homeItemDetails.set(ItemNameNumber,sParentID)
              console.log('Item Details: Item ID: ',ItemNumber,';Item Title: ',ItemNameNumber,';Item Parent ID: ');
              sParentID = ItemNumber;
            }
            else if (ItemClass == 'indent-1'){
              homeItemDetails.set(ItemNameNumber,sParentID)
              console.log('Item Details: Item ID: ',ItemNumber,';Item Title: ',ItemNameNumber,';Item Parent ID: ',sParentID);
              sParentID = ItemNumber;
            }
            else if (ItemClass == 'indent-2'){
              homeItemDetails.set(ItemNameNumber,sParentID)
              console.log('Item Details: Item ID: ',ItemNumber,';Item Title: ',ItemNameNumber,';Item Parent ID: ',sParentID);
            }
          });
        }
      });
    });

    it('should set search Item in search Input', () => {
      page.setInputText('xpath','//input[@type="text"]', searchItem);
    });

    it('verify that information Page is displayed when click on Button', () => {

      var allButtons = element.all(by.xpath('//ul/li/button'));
      allButtons.count().then(function(ItemListCnt) {
        console.log('List of Buttons: ' + ItemListCnt);
        for(let i=0;i<ItemListCnt;i++) {

          allItems.get(i).getText().then(function(selectedItemText) {
            selectedItemName = selectedItemText.replace("Button", "");
            selectedItemName = selectedItemName.replace(/(?:\r\n|\r|\n)/g, "");
            selectedItemNameNumber = selectedItemName.split(" - ")[0];
            console.log(selectedItemNameNumber,'>>>>>>>>>>>>>')
          });
          var selctedItemparentID = homeItemDetails.get(selectedItemNameNumber);

          allButtons.get(i).click();
          browser.sleep(1000);

          var allItemsDtls = element.all(by.className('itemName'));
          allItemsDtls.count().then(function(ItemDtlsCnt) {
            console.log('>> Total Items Details displayed for', ItemName, ItemDtlsCnt)
            for(let itemDtlNum=0;itemDtlNum<ItemDtlsCnt;itemDtlNum++) {
              allItemsDtls.get(itemDtlNum).getText().then(function(ItemDtlText) {
                  if (ItemDtlText.includes('Item ID:')){
                    console.log('Expected: Item ID: '+ selectedItemNameNumber.replace("Item ","")+' --> Actual:'+ ItemDtlText);
                    expect('Item ID: '+ selectedItemNameNumber.replace("Item ","")).toEqual(ItemDtlText);
                  }
                  else if (ItemDtlText.includes('Item Title:')){
                    console.log('Expected: Item Title: '+ selectedItemNameNumber +' --> Actual:'+ ItemDtlText);
                    expect('Item Title: '+ selectedItemNameNumber).toEqual(ItemDtlText);
                  }
                  else if (ItemDtlText.includes('Item Parent ID:')){
                    console.log('Expected: Item Parent ID: '+ selctedItemparentID +' --> Actual:'+ ItemDtlText);
                    expect('Item Parent ID: '+ selctedItemparentID).toEqual(ItemDtlText);
                  }
              });
            }
          });
          browser.navigate().back();
          if(i<ItemListCnt ){
            if (searchItem!=''){page.setInputText('xpath','//input[@type="text"]', searchItem);}
          }
        }
      });
    });

// End of Test case
});
