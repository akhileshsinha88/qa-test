import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    console.log('navigateTo> ' + browser.baseUrl);
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getElement(locator: string,locatorValue: string){
      //console.log('getElement> Locator: ' + locator + "; Locator value: " + locatorValue);
      try{
        if (locator == 'xpath') {
            if (element(by.xpath(locatorValue)).isPresent()){
              //console.log('xpath present: ' + locatorValue);
              return element(by.xpath(locatorValue));
            }
        }
        else if (locator =='className') {
            if (element(by.className(locatorValue)).isPresent()){
              //console.log('className present: ' + locatorValue);
              return element(by.className(locatorValue));
            }
        }
        else if (locator =='css') {
            if (element(by.css(locatorValue)).isPresent()){
              //console.log('css present: ' + locatorValue);
              return element(by.css(locatorValue));
            }
        }
      }
      catch (Error)
       {
        alert(Error.message);
       }
  }

  getElementText(locator: string,locatorValue: string){
     console.log('getElementText> '+ locator + ":-" + locatorValue);
     var objElement = this.getElement(locator, locatorValue);
     var sElemetText = objElement.getText();
     //console.log('getElementText> '+ locator + ":-" + locatorValue + sElemetText);
     return sElemetText;
  }

  verifyElementExist(locator: string,locatorValue: string) {
      console.log('verifyElementExist> '+ locator + ":-" + locatorValue);
      var objElement = this.getElement(locator, locatorValue);
      var blnElemetExist = objElement.isPresent();
      return blnElemetExist;
  }

  setInputText(locator: string,locatorValue: string,  sTextValue: string) {
        console.log('setInputText> '+ locator + ":-" + locatorValue + ' TextValue:-' + sTextValue);
        var objElement = this.getElement(locator, locatorValue);
        objElement.sendKeys(sTextValue);
  }
}
