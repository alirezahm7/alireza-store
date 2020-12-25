import React from 'react';
import Spiner from '../../spiner/spiner.component';

const WithSpiner = WrappedComponent =>({isLoading ,...otherprops}) =>{
  return isLoading ? <Spiner /> : <WrappedComponent {...otherprops} />;
};

export default WithSpiner;
