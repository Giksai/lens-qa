/**
 * Editable fields for entities (like portfolio or project) pages
 */

import { $, element, by, browser, protractor, ElementFinder } from 'protractor';
import Actions                                                from '../../utils/actions';
import DateRange                                              from '../components/date-range.po';

enum FieldTypes {
  SIMPLE_FIELD   = 'simple field',
  SIMPLE_SELECT  = 'simple select',
  COMPLEX_SELECT = 'complex select', // May have or not have e-mail. Behaves differently for Protractor
  DATE_RANGE     = 'date range'
}

type FieldElement = { type: FieldTypes; elem: ElementFinder };

class EditableEntityFields {
  // element with id is not interactable for Protractor in case of complex selects, so additional logic is needed
  private COMPLEX_SELECT_INTERACTABLE_INPUT_SELECTOR = '.selectize-input';

  /**
   * Fields getter is designed that way to allow more simple use in tests:
   * there is no need to look into this Page Object to see which getter to invoke,
   * just copy and paste field name and desired value into "setFieldValues" method
   */
  get fields(): {[fieldName: string]: FieldElement} {
    return {
      // ! add ONLY lower cased keys here (because app markup for user and for Protractor sometimes gives different cases)
      'ac rating'                          : {type: FieldTypes.SIMPLE_FIELD, elem: $('#ac_rating')},
      'asset manager'                      : {type: FieldTypes.COMPLEX_SELECT, elem: $('#asset_manager')},
      'axis azimuth'                       : {type: FieldTypes.SIMPLE_FIELD, elem: $('#pvwatts_axis_azimuth')},
      'assignee for autogenerated tickets' : {type: FieldTypes.COMPLEX_SELECT, elem: $('#default_assignee')},
      'assign to'                          : {type: FieldTypes.COMPLEX_SELECT, elem: $('#assigned_to')},
      'client'                             : {type: FieldTypes.SIMPLE_SELECT, elem: $('#client')},
      'compliance lead'                    : {type: FieldTypes.COMPLEX_SELECT, elem: $('#compliance_lead')},
      'dc rating'                          : {type: FieldTypes.SIMPLE_FIELD, elem: $('#dc_rating')},
      'description'                        : {type: FieldTypes.SIMPLE_FIELD, elem: $('#summary')},
      'due date'                           : {type: FieldTypes.SIMPLE_FIELD, elem: $('#task_due_date')},
      'date range'                         : {type: FieldTypes.DATE_RANGE, elem: $('#date')},
      'east range'                         : {type: FieldTypes.SIMPLE_FIELD, elem: $('#pvwatts_east_range')},
      'financial preparer'                 : {type: FieldTypes.COMPLEX_SELECT, elem: $('#financial_lead')},
      'financial reviewer'                 : {type: FieldTypes.COMPLEX_SELECT, elem: $('#financial_reviewer')},
      'gcr'                                : {type: FieldTypes.SIMPLE_FIELD, elem: $('#pvwatts_gcr')},
      'groups'                             : {type: FieldTypes.SIMPLE_FIELD, elem: $('#groups-selectized')}, // not exactly field, but works like field for protractor
      'installation type'                  : {type: FieldTypes.SIMPLE_SELECT, elem: $('#installation_type')},
      'losses'                             : {type: FieldTypes.SIMPLE_SELECT, elem: $('#pvwatts_losses')},
      'name'                               : {type: FieldTypes.SIMPLE_FIELD, elem: $('#name')},
      'parent portfolio'                   : {type: FieldTypes.SIMPLE_SELECT, elem: $('#parent_portfolio')},
      'portfolio'                          : {type: FieldTypes.SIMPLE_SELECT, elem: $('#portfolio')},
      'project'                            : {type: FieldTypes.COMPLEX_SELECT, elem: $('#project')},
      'title'                              : {type: FieldTypes.SIMPLE_FIELD, elem: $('#title')},
      'technical lead'                     : {type: FieldTypes.COMPLEX_SELECT, elem: $('#technical_lead')},
      'tracking mode'                      : {type: FieldTypes.SIMPLE_SELECT, elem: $('#pvwatts_tracking_mode')},
      'west range'                         : {type: FieldTypes.SIMPLE_FIELD, elem: $('#pvwatts_west_range')},
      'tilt'                               : {type: FieldTypes.SIMPLE_FIELD, elem: $('#pvwatts_tilt')},
      'azimuth'                            : {type: FieldTypes.SIMPLE_FIELD, elem: $('#pvwatts_azimuth')},
      'inverter efficiency'                : {type: FieldTypes.SIMPLE_FIELD, elem: $('#pvwatts_inv_eff')},
      'address 1'                          : {type: FieldTypes.SIMPLE_FIELD, elem: $('#address_1')},
      'city'                               : {type: FieldTypes.SIMPLE_FIELD, elem: $('#city')},
      'state region'                       : {type: FieldTypes.SIMPLE_SELECT, elem: $('#state_region')},
      'postal_code'                        : {type: FieldTypes.SIMPLE_FIELD, elem: $('#postal_code')},
      'country'                            : {type: FieldTypes.SIMPLE_SELECT, elem: $('#country')},
      'latitude'                           : {type: FieldTypes.SIMPLE_FIELD, elem: $('#latitude')},
      'longitude'                          : {type: FieldTypes.SIMPLE_FIELD, elem: $('#longitude')},
      'access info'                        : {type: FieldTypes.SIMPLE_FIELD, elem: $('#access_info')},
      'time zone'                          : {type: FieldTypes.SIMPLE_SELECT, elem: $('#time_zone')},
      'biller name'                        : {type: FieldTypes.SIMPLE_FIELD, elem: $('#biller_name')},
      'buyer name'                         : {type: FieldTypes.SIMPLE_FIELD, elem: $('#billing_name')},
      'invoice terms'                      : {type: FieldTypes.SIMPLE_FIELD, elem: $('#billing_invoice_term_days')},
      'billing country'                    : {type: FieldTypes.SIMPLE_FIELD, elem: $('#billing_country')},
      'billing street 1'                   : {type: FieldTypes.SIMPLE_FIELD, elem: $('#billing_street_1')},
      'billing city'                       : {type: FieldTypes.SIMPLE_FIELD, elem: $('#billing_city')},
      'billing state region'               : {type: FieldTypes.SIMPLE_SELECT, elem: $('#billing_state_region')},
      'postal code'                        : {type: FieldTypes.SIMPLE_FIELD, elem: $('#billing_postal_code')},
      'billing text'                       : {type: FieldTypes.SIMPLE_FIELD, elem: $('#billing_text')},
      'external link name'                 : {type: FieldTypes.SIMPLE_FIELD, elem: $('#external_link_name_0')},
      'external link username'             : {type: FieldTypes.SIMPLE_FIELD, elem: $('#external_link_username_0')},
      'external link password'             : {type: FieldTypes.SIMPLE_FIELD, elem: $('#external_link_password_0')},
      'external link url'                  : {type: FieldTypes.SIMPLE_FIELD, elem: $('#external_link_url_0')},
      'ntp'                                : {type: FieldTypes.SIMPLE_FIELD, elem: $('#ntp')},
      'cod'                                : {type: FieldTypes.SIMPLE_FIELD, elem: $('#cod')},
      'in service date'                    : {type: FieldTypes.SIMPLE_FIELD, elem: $('#in_service_date')},
      'mechanical completion'              : {type: FieldTypes.SIMPLE_FIELD, elem: $('#mechanical_completion')},
      'substantial completion'             : {type: FieldTypes.SIMPLE_FIELD, elem: $('#substantial_completion')},
      'final completion'                   : {type: FieldTypes.SIMPLE_FIELD, elem: $('#final_completion')},
      'ppa_term'                           : {type: FieldTypes.SIMPLE_FIELD, elem: $('#ppa_term')},
      'type'                               : {type: FieldTypes.SIMPLE_SELECT, elem: $('#type')},
      'dated'                              : {type: FieldTypes.SIMPLE_FIELD, elem: $('#dated')},
      'manufacturer'                       : {type: FieldTypes.SIMPLE_SELECT, elem: $('#manufacturer')},
      'asset type'                         : {type: FieldTypes.SIMPLE_SELECT, elem: $('#asset_type')},
      'confirm'                            : {type: FieldTypes.SIMPLE_FIELD, elem: $('#confirm')},
      'comments'                           : {type: FieldTypes.SIMPLE_FIELD, elem: $('#comments')},
      'group description'                  : {type: FieldTypes.SIMPLE_FIELD, elem: $('#description')},
      'data download template name'        : {type: FieldTypes.SIMPLE_FIELD, elem: $('input[name=name]')},
      'data download template description' : {type: FieldTypes.SIMPLE_FIELD, elem: $('textarea[name=description]')},
      'data download template time int'    : {type: FieldTypes.SIMPLE_SELECT, elem: $('.form-control.ng-pristine.ng-untouched.ng-valid.ng-valid-required')},
      'data download template default mode': {type: FieldTypes.SIMPLE_SELECT, elem: $('input[name=default_mode]')},

      // TODO - add remaining fields
    };
  }

  get isUnderManagementCheckbox(): ElementFinder {
    return element(by.cssContainingText('[class*="checkbox"]', 'Is the portfolio under management?'));
  }

  getFieldElement(fieldName: string): ElementFinder {
    return this.fields[fieldName.toLowerCase()].elem;
  }

  getFieldType(fieldName: string): string {
    return this.fields[fieldName.toLowerCase()].type;
  }

  /**
   * Checks "is under management" checkbox if it is not already checked
   */
  async enableUnderManagementCheckbox(): Promise<void> {
    const isCheckboxEnabled = (await this.isUnderManagementCheckbox.$('.icheckbox_square-grey').getAttribute('class')).includes('checked');
    if (!isCheckboxEnabled) {
      await this.isUnderManagementCheckbox.click();
    }
  }

  /**
   * Fills only data which can be filled without "under management" checkbox checked.
   * For now it's minimal implementation which supports only required fields.
   * Todo - extend this method to work with all fields.
   * Legacy method. TODO - Consider replacing it with more general ones.
   */
  async fillSimplePortfolioData({ name, client }: { name?: string; client?: string } = {}): Promise<void> {
    // conditions is needed for negative testing
    if (name) {
      await this.getFieldElement('name').sendKeys(name);
    }
    if (client) {
      await this.getFieldElement('client').sendKeys(client);
    }
  }

  /**
   * Works with complex select fields with blue element containing e-mail and role.
   * (It behaves differently from usual field and usual select).
   *  ! Note that multiSelect fields should be treated separately by another method, if it's necessary to add many values
   */
  async setComplexSelectFieldOption(fieldName: string, optionText: string): Promise<void> {
    const baseElement                     = await this.getFieldElement(fieldName);
    const complexSelectInput              = baseElement.$(this.COMPLEX_SELECT_INTERACTABLE_INPUT_SELECTOR);
    const isSelectComplexUnderCurrentUser = await Actions.isVisible(complexSelectInput);
    if (!isSelectComplexUnderCurrentUser) {
      return this.setSimpleFieldValue(fieldName, optionText);
    }
    await complexSelectInput.click();
    const multiSelectOption        = element(by.cssContainingText('.ui-select-choices-row-inner', optionText));
    const maxOptionPresenceTimeout = 2000;
    await browser.wait(
      protractor.ExpectedConditions.visibilityOf(multiSelectOption),
      maxOptionPresenceTimeout,
      `Complex Select Option "${optionText}" not found`
    );
    return multiSelectOption.click();
  }

  /**
   * Fills target fields with given data
   * @param {Object} dataObj - collections of key-value pairs, where keys are names of the field
   *                 For example { name: 'new name' } will set "name" field value to "new name"
   *                 If field name contain spaces, use it in quotes:
   *                 {'compliance lead': 'John Doe', 'technical lead': 'Jane Doe'} // case-insensitive to field names
   */
  async setFieldValues(dataObj: { [fieldName: string]: string }): Promise<void> {
    for (const targetFieldName of Object.keys(dataObj)) {
      const newFieldValue = dataObj[targetFieldName];
      if (this.getFieldType(targetFieldName) === FieldTypes.COMPLEX_SELECT) {
        await this.setComplexSelectFieldOption(targetFieldName, newFieldValue);
      } else if (this.getFieldType(targetFieldName) === FieldTypes.DATE_RANGE) {
        await this.setDateRange(targetFieldName, newFieldValue);
      } else {
        await this.setSimpleFieldValue(targetFieldName, newFieldValue);
      }
    }
  }

  /**
   * Works with simple fields and simple selects (without custom blue element inside it)
   */
  async setSimpleFieldValue(fieldName: string, newValue: string): Promise<void> {
    const fieldElement = this.getFieldElement(fieldName);
    if (this.getFieldType(fieldName) === FieldTypes.SIMPLE_FIELD
        || this.getFieldType(fieldName) === FieldTypes.DATE_RANGE) { // there is no need and no way to clear select
      await fieldElement.clear();
    }
    await fieldElement.sendKeys(newValue);
    if (fieldName.toLowerCase() === 'groups') { // TODO add new field type if this behaviour wouldn't be unique
      await fieldElement.sendKeys(protractor.Key.ENTER);
    }
  }

  /**
   * Sets date range in "Date Range" field and apllies changes
   * @param dateRange Date in format: month/day/year - month/day/year
   */
  async setDateRange(fieldName: string, dateRange: string): Promise<void> {
    await this.setSimpleFieldValue(fieldName, dateRange);
    await Actions.scrollTo(DateRange.applyBtn);
    await DateRange.applyBtn.click();
  }
}

export default new EditableEntityFields();