import {AppPage} from './app.po';
import {browser, element, by,  logging} from 'protractor';

describe('TC001 : Verify that user name and user image is displayed properly in header of main page', () => {
    let page: AppPage;

    beforeEach(() => {
       page = new AppPage();
    });

    it('should go to the webpage', () => {
      page.navigateTo();
    });

    it('should have Cobiro Image', () => {
      var cobiroImage = page.verifyElementExist('xpath','/html/body/header/img');
      expect(cobiroImage).toBe(true);
    });

    it('should have user image', () => {
      var headerProfile = page.verifyElementExist('className','header__profile');
      expect(headerProfile).toBe(true);
    });

    it('should have user name', () => {
      var sUserName = page.getElementText('className','header__name');
      expect(sUserName).toEqual('Morten');
    });
// End of Test case
});

describe('TC002 : Verify that the tree structure of Items are displayed in main page', () => {
    let page: AppPage;
    var ItemSearch = '';
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

describe('TC003 : Verify that links in left pane is displayed.', () => {
    let page: AppPage;

    beforeEach(() => {
       page = new AppPage();
    });

    it('should go to the webpage', () => {
      page.navigateTo();
    });

    it('should have navigation Image', () => {
      var headerProfile = page.verifyElementExist('className','nav__image');
      expect(headerProfile).toBe(true);
    });

    it('List of Left Pane Link ', () => {
      element.all(by.xpath('//nav/a')).each(function(element, index) {
        element.getText().then(function (text) {
          console.log(index + 1, text);
        });
      });
    });
// End of Test case
});

describe('TC004 : Verify that filtered list contain all matched items and their children', () => {
    let page: AppPage;
    var ItemSearch = 'Item 5';
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
