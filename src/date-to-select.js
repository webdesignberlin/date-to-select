//import moment from 'moment';
import generateMarkup from './generate-markup';
//import * as moment from 'moment';

export default class DateToSelect {
  /**
   * date picker instance
   * @param {HTMLElement} dateInput - Input Field
   */
  constructor(dateInput){
    this._elDateInput = dateInput;
    this.id = 'date-'+dateInput.id;
    this._elWrapper = {};
    this.enteredDate = {
      year: '',
      month: '',
      day: ''
    };
  }

  renderMarkup(){
    let elTarget = document.getElementById('birthDate');
    generateMarkup(elTarget);
    this._elWrapper = document.getElementById('date-birthDate');
  }

  getInputDate(){
    let dateToSelect = this;
    return dateToSelect._elDateInput.value;
  }

  /**
   * Set a day
   * @param {string} day - 01 - 31
   */
  setDay(day){
    let dateToSelect = this;
    let wrapper = dateToSelect._elWrapper.querySelector('.date-field--days');

    for(let option of wrapper.querySelectorAll('option')){
      option.removeAttribute('selected');
      option.selected = false;
      if(option.value === day){
        option.selected = true;
        option.setAttribute('selected','selected');
      }
    }

    //wrapper.querySelector('[value="' + day + '"]').selected = true;
  }

  /**
   * Set a month
   * @param {string} month - 01 - 12
   */
  setMonth(month){
    let dateToSelect = this;
    let wrapper = dateToSelect._elWrapper.querySelector('.date-field--months');

    for(let option of wrapper.querySelectorAll('option')){
      option.removeAttribute('selected');
      option.selected = false;
      if(option.value === month){
        option.selected = true;
        option.setAttribute('selected','selected');
      }
    }

    //wrapper.querySelector('[value="' + month + '"]').selected = true;
  }

  /**
   * Set a year
   * @param {string} year - 0000 - 9999
   */
  setYear(year){
    let dateToSelect = this;
    let wrapper = dateToSelect._elWrapper.querySelector('.date-field--years');

    for(let option of wrapper.querySelectorAll('option')){
      option.removeAttribute('selected');
      option.selected = false;
      if(option.value === year){
        option.selected = true;
        option.setAttribute('selected','selected');
      }
    }

    //wrapper.querySelector('[value="' + year + '"]').selected = true;

    dateToSelect.getDaysInMonth();
  }

  /**
   * Get selected Day
   * @returns {string} - Data Value of current Day. e.g. 31
   */
  getDay(){
    let dateToSelect = this;
    let activeDay = dateToSelect._elWrapper.querySelector('.date-field--days').value;

    if (activeDay.length > 0) {
      return activeDay;
    }
    return null;
  }

  /**
   * Get selected Month
   * @returns {string} - Data Value of selected Month. e.g 12
   */
  getMonth(){
    let dateToSelect = this;
    let activeMonth = dateToSelect._elWrapper.querySelector('.date-field--months').value;

    if (activeMonth.length > 0) {
      return activeMonth;
    }
    return null;
  }

  /**
   * Get selected Year
   * @returns {string} - Data Value of selected Year. e.g. 1984
   */
  getYear(){
    let dateToSelect = this;
    let activeYear = dateToSelect._elWrapper.querySelector('.date-field--years').value;

    if (activeYear.length > 0) {
      return activeYear;
    }
    return null;
  }


  /**
   * Get Days of selected Month/Year combination. e.g. 28.
   * Also creates custom Event to trigger template rebuild of days
   */
  getDaysInMonth(){
    let dateToSelect = this;
    let year = dateToSelect.getYear();
    let month = dateToSelect.getMonth();
    let day = dateToSelect.getDay();

    let updateDaysInMonth = new CustomEvent('updateDaysInMonth', {
      detail: {
        days: moment(year+'-'+month, 'YYYY-MM').daysInMonth(),
        activeDay: day
      }
    });

    if (month && year){
      document.dispatchEvent(updateDaysInMonth);
    }
  }

  validateDate(){
    let dateToSelect = this;
    let valueYears = dateToSelect._elWrapper.querySelector('.date-field--years').value;
    let valueMonths = dateToSelect._elWrapper.querySelector('.date-field--months').value;
    let valueDays = dateToSelect._elWrapper.querySelector('.date-field--days').value;
    let dateString = valueYears + '-' + valueMonths + '-' + valueDays;
    if(moment(dateString).isValid()){
      dateToSelect._elDateInput.value = dateString;
    } else {
      dateToSelect._elDateInput.value = '';
    }
  }

  /*handleDays(e){
    let dateToSelect = this;
    let wrapper = dateToSelect._elWrapper.querySelector('.date-field--days');
    console.log(e.detail.days, wrapper.options.length);
  }*/

  /**
   * Init Function
   * Also listen for re-render of day template
   */
  init(){
    let dateToSelect = this;
    dateToSelect.renderMarkup();
    //console.log(dateToSelect.getInputDate());
    //dateToSelect.setDay('11');
    //dateToSelect.setMonth('08');
    //dateToSelect.setYear('1984');

    let elYears = dateToSelect._elWrapper.querySelector('.date-field--years');
    let elMonths = dateToSelect._elWrapper.querySelector('.date-field--months');
    let elDays = dateToSelect._elWrapper.querySelector('.date-field--days');

    elYears.addEventListener('change', function () {
      dateToSelect.setYear(this.value);
      dateToSelect.getDaysInMonth();
      dateToSelect.validateDate();
    });
    elMonths.addEventListener('change', function () {
      dateToSelect.setMonth(this.value);
      dateToSelect.getDaysInMonth();
      dateToSelect.validateDate();
    });
    elDays.addEventListener('change', function () {
      dateToSelect.setDay(this.value);
      dateToSelect.validateDate();
    });

    /*document.addEventListener('updateDaysInMonth', function(e){
      dateToSelect.handleDays(e);
    });*/
  }

}
