import { mount, createLocalVue } from '@vue/test-utils'
import PROFILEEDITOR from '../../../src/components/ProfileEditor.vue'
import * as All from 'quasar'
const { Quasar } = All
import { Notify } from 'quasar'
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
  // mock the notify plugin
  Notify.create = () => {
    return jest.fn()
  }
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
        weight: 82,
        height: 180,
        diseases: [],
        medications: [],
        studiesSuggestions: true
      },
      buttonCancel: 'cancel',
      buttonOk: 'next'
    },
    mocks: {
      // let's mock i18n, we don't need it for this test
      $t: () => { return 'xxx' },
      $i18n: {
        t: () => { return 'xxx' }
      }
    }
  })

  it('has a created hook', () => {
    expect(typeof editor.vm.selectLanguage).toBe('function')
  })

  it('sets the correct default data', () => {
    expect(editor.props('value').name).toBe('Dario')
    expect(editor.props('value').surname).toBe('Salvi')
    let qinputs = editor.findAllComponents(components.QInput)
    // there should be 5 input fields (name, surname, DOB, weight, hight)
    expect(qinputs.length).toBe(5)
    expect(qinputs.at(0).isVisible()).toBe(true)
    expect(qinputs.at(1).isVisible()).toBe(true)
    expect(qinputs.at(2).isVisible()).toBe(true)
    expect(qinputs.at(3).isVisible()).toBe(true)
    expect(qinputs.at(4).isVisible()).toBe(true)
    expect(qinputs.at(0).vm.value).toBe('Dario')
    expect(qinputs.at(1).vm.value).toBe('Salvi')
    expect(qinputs.at(2).vm.value).toBe('1978/01/01')
    expect(qinputs.at(3).vm.value).toBe(82)
    expect(qinputs.at(4).vm.value).toBe(180)

    let qtoggles = editor.findAllComponents(components.QToggle)
    expect(qtoggles.length).toBe(1) // one toggle only: studiesSuggestions
    expect(qtoggles.at(0).vm.value).toBe(true)
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
