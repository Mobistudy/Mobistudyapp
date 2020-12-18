export default {
  createPrerequisites (descriptions, images) {
    let prerequisites = []
    for (const [idx, description] of descriptions.entries()) {
      let prerequisite = {
        p: description.p,
        img: images[idx]
      }
      prerequisites.push(prerequisite)
    }
    console.log('Prerequisites:', prerequisites)
    return prerequisites
  },
  createInstructions (descriptions, images) {
    let instructions = []
    for (const [idx, description] of descriptions.entries()) {
      let instruction = {
        i: description.i,
        img: images[idx]
      }
      instructions.push(instruction)
    }
    console.log('Instructions:', instructions)
    return instructions
  }
}
