import React from 'react';

const Input = React.forwardRef((props, ref) => {
    return(<input {...props} ref={ref}></input>);
});

export default Input;