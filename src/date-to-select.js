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
    wrapper.querySelector('[value="' + day + '"]').selected = true;
  }

  /**
   * Set a month
   * @param {string} month - 01 - 12
   */
  setMonth(month){
    let dateToSelect = this;
    let wrapper = dateToSelect._elWrapper.querySelector('.date-field--months');
    wrapper.querySelector('[value="' + month + '"]').selected = true;
  }

  /**
   * Set a year
   * @param {string} year - 0000 - 9999
   */
  setYear(year){
    let dateToSelect = this;
    let wrapper = dateToSelect._elWrapper.querySelector('.date-field--years');
    wrapper.querySelector('[value="' + year + '"]').selected = true;

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
    dateToSelect.setDay('11');
    dateToSelect.setMonth('08');
    dateToSelect.setYear('1984');

    let elYears = dateToSelect._elWrapper.querySelector('.date-field--years');
    let elMonths = dateToSelect._elWrapper.querySelector('.date-field--months');
    let elDays = dateToSelect._elWrapper.querySelector('.date-field--days');

    console.log(elYears);
    elYears.addEventListener('change', function () {
      dateToSelect.getDaysInMonth();
    });
    elMonths.addEventListener('change', function () {
      dateToSelect.getDaysInMonth();
    });

    /*document.addEventListener('updateDaysInMonth', function(e){
      dateToSelect.handleDays(e);
    });*/
  }

}
