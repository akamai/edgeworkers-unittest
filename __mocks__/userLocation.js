const UserLocation = jest.fn().mockImplementation(() => {
    return {
        continent:"NA",
        country:"CA",
        region:"NS",
        city:"HALIFAX",
        zipCode:"B3H+B3J+B3K+B3L+B3M+B3N+B3P+B3R+B3S+B3T"
    };
});
  
export default UserLocation;