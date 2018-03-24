import mocha from 'mocha'
import chai from 'chai'
import path from 'path'
const describe = mocha.describe
const expect = chai.expect
import FAAEndorsements from '../lib/faa-endorsements'
import _ from 'lodash'

describe('FAAEndorsements()',() => {
  it('is a function',() => {
    expect(FAAEndorsements).to.be.a('function')
  })

  it('returns an object',() => {
    expect(new FAAEndorsements()).to.be.a('object')
  })

  context('#endorsements',() => {
    it('returns an array',() => {
      let f = new FAAEndorsements()
      expect(f.endorsements).to.be.a('array')
    })
  })

  context('.getTemplate()',() => {
    it('finds a template Endorsement title',() => {
      let en = FAAEndorsements.Endorsements[0]
      let t = FAAEndorsements.getTemplate(en)
      expect(t).to.be.an('object')
      expect(t).to.include.keys('attributes')
      expect(t.attributes.title).to.eq(en)
    })

    it('fails gracefully if it did not find a template',() => {
      expect(FAAEndorsements.getTemplate()).to.be.an('undefined')
    })
  })

  context('.addEndorsement()',() => {
    it('adds an endorsement to the instance',() => {
      let f = new FAAEndorsements()
      f.addEndorsement(FAAEndorsements.Endorsements[0])
      expect(f.endorsements.length).to.be.gt(0)
    })

    it('updates the locals',() => {
      let f = new FAAEndorsements()
      f.addEndorsement(FAAEndorsements.Endorsements[0])
      expect(f.locals).to.be.an('object')
      expect(f.locals).to.include.keys(['date','student','instructor','aircraft'])
      expect(Object.keys(f.locals).length).to.be.gt(0)
    })
  })

  context('custom missing', () => {
    it('sets a custom missing string',() => {
      let f = new FAAEndorsements({ missing: 'foo' })
      f.addEndorsement(FAAEndorsements.Endorsements[0])
      expect(f.locals.date).to.eq('foo')
    })
  })

  it('adds endorsements from options',() => {
    let f = new FAAEndorsements({
      endorsements: [
        FAAEndorsements.Endorsements[0],
        FAAEndorsements.Endorsements[1],
      ]
    })
    expect(f.locals).to.include.keys(['date','student'])
  })

  context('when updating endorsements by setting endorsements list',() => {
    it('endorsements and endorsementTemplates should match',() => {
      let f = new FAAEndorsements()
      f.endorsements = [
        FAAEndorsements.Endorsements[0],
        FAAEndorsements.Endorsements[2],
        FAAEndorsements.Endorsements[3],
      ]
      let elist = f.endorsements
      let etlist = _.map(f.endorsementTemplates,en => en.attributes.title)
      expect(elist).to.eql(etlist)
    })

    it('locals should update and remove items that are no longer used')
  })
})
