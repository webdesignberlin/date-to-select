/**
 * Created by Michael Gerstmann on 17.04.2017.
 */

/**
 * Generate Array of Years from startYear to Today
 * @param startYear
 * @returns {Array}
 */
function generateYears(startYear = 1984) {
  let currentYear = new Date().getFullYear(), years = [];

  while ( startYear <= currentYear ) {
    years.push(startYear++);
  }

  return years;
}

/**
 * Define template Options
 * @type {{years: Array, months: [*], days: *, foo: string}}
 */
let templateOptions = {
  years: generateYears(new Date().getFullYear() - 100),
  months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
  days: generateDays(31)
};

/**
 * Generates an Array of Days via days Object
 * @param {object} days
 * @returns {Array}
 */
function generateDays(days = {days: 31}){
  let daysOutput = [];
  for(let i = 1; i <= days; i++){
    if(i < 10){
      i = '0'+i;
    }
    daysOutput.push(i.toString());
  }
  return daysOutput;
}

/**
 * Wrapper Markup
 * @param content
 * @param targetId
 */
const tmplWrapper = (targetId, content) =>`
<div class="date" id="date-${targetId}">
${content}
</div>`;

/**
 * Month Markup
 * @param {object} months
 */
const tmplMonths = (months) => `
<select class="date-field date-field--months">
  ${months.map((month, i) =>
  `
  <option class="date-field__item" value="${month}">
    ${i+1}
  </option>
    `
).join('')} 
</select>
`;

/**
 * Year Markup
 * @param {object} years
 */
const tmplYears = (years) => `
<select class="date-field date-field--years">
  ${years.map((year, i) =>
  `
  <option class="date-field__item" value="${year}">
      ${year}
  </option>
    `
).join('')}
</select>
`;

/**
 * Print Active Class for Re-rendered Day Markup activeClass + currentDay must match
 * @param {string} activeClass - active Class e.g. 04
 * @param {string} currentDay
 * @returns {string}
 */
const printActiveDayClass = function(activeClass, currentDay){
  if (activeClass === currentDay){
    return 'date-field__item--active'
  }
  return ''
};

const tmplDays = (options) => `
<select class="date-field date-field--days">
  ${options.days.map((day, i) =>
  `
  <option class="date-field__item `+ printActiveDayClass(options.activeDay, day) +`" value="${day}">
      ${i+1}
  </option>
  `
).join('')} 
</select>
`;


/**
 * Render date Markup
 */
function dateMarkup(elTarget) {

  elTarget.insertAdjacentHTML('afterend', tmplWrapper(
    elTarget.id,
      tmplDays(templateOptions)+
      tmplMonths(templateOptions.months)+
      tmplYears(templateOptions.years)
    )
  );

}

generateDays();

export default function generateMarkup(elTarget){
  dateMarkup(elTarget);
  /**
   * Add Event listener which fired on Month Update in date picker
   */
  document.addEventListener('updateDaysInMonth', function(e){
    console.log('update days');
    let dayWrapper = document.querySelectorAll('.date-field--days');
    if(dayWrapper.length > 0){
      let mergedConfig = Object.assign({}, templateOptions, {
        days: generateDays(e.detail.days),
        activeDay: e.detail.activeDay
      });
      dayWrapper[0].outerHTML = tmplDays(mergedConfig);

      let updatedDays = new CustomEvent('updatedDays', {});
      document.dispatchEvent(updatedDays);

    }
  });
};
