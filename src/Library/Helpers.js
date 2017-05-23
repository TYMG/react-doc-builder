var Helpers = {
  greetingName: function(input){
    if (input.known_as){
      return input.known_as
    } else {
      return input.name
    }
  },
  and: function(inputA, inputB){
    return inputA && inputB
  },
  text: function(input, text){
    return text
  },
  then: function(input, thenValue, elseValue){
    if (input){
      return thenValue
    } else {
      return elseValue
    }
  }
}

export default Helpers;