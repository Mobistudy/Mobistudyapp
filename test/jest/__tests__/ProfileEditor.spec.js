import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import PROFILEEDITOR from '../../../src/components/ProfileEditor.vue'
import * as All from 'quasar'
const { Quasar } = All
import {  Notify } from 'quasar'
import Vuelidate from 'vuelidate'


const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

describe('Profile Editor', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components, plugins: [Notify] })
  localVue.use(Vuelidate)

  const editor = mount(PROFILEEDITOR, {
    localVue,
    propsData: {
      value: {
        name: 'Dario',
        surname: 'Salvi',
        dateOfBirth: '1978/01/01',
        country: 'gb',
        language: 'en',
        sex: 'male',
        diseases: [],
        medications: [],
        lifestyle: {
          smoker: false,
          active: true
        }
      },
      buttonCancel: 'cancel',
      buttonOk: 'next'
    },
    mocks: {
      // let's mock i18n, we don't need it for this test
      $t: () => {},
      $i18n: {
        t: () => {}
      }
    },
  })

  it('passes the sanity check and creates a wrapper', () => {
    expect(editor.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof editor.vm.selectLanguage).toBe('function')
  })

  it('sets the correct default data', () => {
    expect(editor.props('value').name).toBe('Dario')
    expect(editor.props('value').surname).toBe('Salvi')
    let qinputs = editor.findAll(components.QInput)
    // there should be 3 input fields (name, surname, DOB)
    expect(qinputs.length).toBe(3)
    expect(qinputs.at(0).isVisible()).toBe(true)
    expect(qinputs.at(1).isVisible()).toBe(true)
    expect(qinputs.at(2).isVisible()).toBe(true)
    expect(qinputs.at(0).vm.value).toBe('Dario')
    expect(qinputs.at(1).vm.value).toBe('Salvi')
    expect(qinputs.at(2).vm.value).toBe('1978/01/01')
  })

  it('if wrong data is input, no next button can be called', async () => {
    const inputs = editor.findAll('input')
    // set name to empty
    inputs.at(0).setValue('')

    const buttons = editor.findAll('button')
    // 2 buttons: cancel an next
    expect(buttons.length).toBe(2)
    buttons.at(1).trigger('click')
    await editor.vm.$nextTick()
    // button Positive is not called
    expect(editor.emitted().buttonCancel).toBeFalsy()
    expect(editor.emitted().buttonOK).toBeFalsy()
  })

  it('cancel button is always called', async () => {
    const inputs = editor.findAll('input')
    // set name to empty
    inputs.at(0).setValue('')

    const buttons = editor.findAll('button')
    expect(buttons.length).toBe(2)
    buttons.at(0).trigger('click')
    await editor.vm.$nextTick()
    // button Positive is not called
    expect(editor.emitted().buttonCancel).toBeTruthy()
    expect(editor.emitted().buttonOK).toBeFalsy()
  })

})
