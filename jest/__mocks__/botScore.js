const ResponseSegment = jest.fn().mockImplementation(() => {
  return {
    isHuman: jest.fn().mockImplementation(() => true),
    isCautiousResponse: jest.fn().mockImplementation(() => false),
    isStrictResponse: jest.fn().mockImplementation(() => false),
    isSafeguardResponse: jest.fn().mockImplementation(() => false),
    isAggressiveResponse: jest.fn().mockImplementation(() => false)
  };
});

const BotScore = jest.fn().mockImplementation(() => {
  return {
    responseSegment: new ResponseSegment()
  };
});

export default BotScore;
