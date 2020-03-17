import {AppPage} from './app.po';
import {browser, element, by,  logging} from 'protractor';

describe('TC009 : Verify that page containing information(Item ID, Item Title, Item Parent ID) of the item is displayed correctly when user click on individual button', () => {
    let page: AppPage;
    var searchItem = '';

    let homeItemDetails = new Map();

    var ItemNameNumber='',ItemName, sParentID = '',ItemNumber, allItems, selectedItemNameNumber;
    var selectedItemName, selectedItemText;
    beforeEach(() => {
       page = new AppPage();
    });

    it('should go to the webpage', () => {
      page.navigateTo();
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
